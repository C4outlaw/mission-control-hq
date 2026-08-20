'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  Bot,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  Mic,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Send,
  Square,
  TerminalSquare,
  Volume2,
} from 'lucide-react';

const fallbackAgents = [
  {
    id: 'news-brief-agent',
    name: 'News Brief Agent',
    mode: 'local',
    purpose: 'Build concise daily briefings from national and local news sources.',
    activation: 'Fetch headlines now, summarize, and send outputs.',
  },
  {
    id: 'email-triage-agent',
    name: 'Email Triage Agent',
    mode: 'local',
    purpose: 'Prioritize urgent inbox items and draft replies.',
    activation: 'Run inbox triage and return urgent-first summary.',
  },
  {
    id: 'calendar-concierge-agent',
    name: 'Calendar Concierge Agent',
    mode: 'local',
    purpose: 'Generate daily schedule briefing with prep notes.',
    activation: 'Build today timeline and prep checklist.',
  },
  {
    id: 'social-ops-agent',
    name: 'Social Ops Agent',
    mode: 'local',
    purpose: 'Plan short-form content queues with hooks and CTAs.',
    activation: 'Generate today content queue.',
  },
  {
    id: 'revenue-agent',
    name: 'Revenue Agent',
    mode: 'local',
    purpose: 'Track offers, follow-ups, sales scripts, and KPIs.',
    activation: 'Return revenue actions and KPI focus.',
  },
  {
    id: 'web-build-agent',
    name: 'Web Build Agent',
    mode: 'local',
    purpose: 'Handle website updates, SEO improvements, and conversion fixes.',
    activation: 'List top web tasks and implementation order.',
  },
];

function shortTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function statusLabel(value) {
  if (value === true) return 'ready';
  if (value === false) return 'missing';
  return 'unknown';
}

function flattenIntegrations(data) {
  const i = data?.integrations || {};
  const social = i.social || {};
  return [
    ['Email source', i.emailSource],
    ['Calendar source', i.calendarSource],
    ['SMTP', i.smtp],
    ['Gmail OAuth', i.gmailOAuth],
    ['TikTok', social.tiktok],
    ['Instagram', social.instagram],
    ['Facebook', social.facebook],
    ['X', social.x],
    ['YouTube', social.youtube],
    ['LinkedIn', social.linkedin],
    ['Grok/xAI', social.grok],
  ];
}

export default function MissionControlClient() {
  const [agents, setAgents] = useState(fallbackAgents);
  const [agentStates, setAgentStates] = useState({});
  const [integrations, setIntegrations] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [log, setLog] = useState('Marvin Room standing by.');
  const [command, setCommand] = useState('');
  const [micState, setMicState] = useState('idle');
  const [micError, setMicError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [level, setLevel] = useState(0);
  const [lastTranscript, setLastTranscript] = useState('');
  const [booting, setBooting] = useState(true);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const meterRef = useRef(null);

  const activeCount = useMemo(
    () => Object.values(agentStates).filter((s) => s.status === 'ready' || s.status === 'running').length,
    [agentStates]
  );

  async function refresh() {
    setBooting(true);
    const [agentsRes, integrationsRes, cronRes] = await Promise.allSettled([
      fetch('/api/agents', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/integrations', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/cron', { cache: 'no-store' }).then((r) => r.json()),
    ]);

    if (agentsRes.status === 'fulfilled' && agentsRes.value?.ok && agentsRes.value.agents?.length) {
      setAgents(agentsRes.value.agents);
      setAgentStates((prev) => {
        const next = { ...prev };
        agentsRes.value.agents.forEach((agent) => {
          next[agent.id] ||= { status: 'ready', note: 'Ready', lastRun: null };
        });
        return next;
      });
    }

    if (integrationsRes.status === 'fulfilled' && integrationsRes.value?.ok) {
      setIntegrations(flattenIntegrations(integrationsRes.value));
    }

    if (cronRes.status === 'fulfilled' && cronRes.value?.ok) {
      setJobs(cronRes.value.jobs || []);
    }

    setBooting(false);
  }

  useEffect(() => {
    refresh();
    return () => stopStream();
  }, []);

  function appendLog(text) {
    setLog((current) => `${text}\n\n${current}`.trim());
  }

  async function runAgent(agent) {
    setAgentStates((prev) => ({ ...prev, [agent.id]: { status: 'running', note: 'Running', lastRun: shortTime() } }));

    try {
      const res = await fetch('/api/agent-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: agent.id }),
      });
      const data = await res.json();
      setAgentStates((prev) => ({
        ...prev,
        [agent.id]: {
          status: data.ok ? 'ready' : 'failed',
          note: data.ok ? 'Completed' : 'Failed',
          lastRun: shortTime(),
        },
      }));
      appendLog(data.text || `${agent.name} completed.`);
    } catch (error) {
      setAgentStates((prev) => ({
        ...prev,
        [agent.id]: { status: 'failed', note: error.message || 'Failed', lastRun: shortTime() },
      }));
      appendLog(`${agent.name} failed: ${error.message}`);
    }
  }

  async function runAllAgents() {
    for (const agent of agents) {
      await runAgent(agent);
    }
  }

  function stopStream() {
    if (meterRef.current) cancelAnimationFrame(meterRef.current);
    meterRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setLevel(0);
  }

  function startMeter(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.fftSize = 512;
    source.connect(analyser);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((sum, item) => sum + item, 0) / data.length;
      setLevel(Math.min(100, Math.round((avg / 128) * 100)));
      meterRef.current = requestAnimationFrame(tick);
    };
    tick();
  }

  async function startRecording() {
    setMicError('');
    setAudioUrl('');
    setLastTranscript('');

    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setMicError('This browser does not expose microphone recording.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;
      chunksRef.current = [];

      const preferredType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType: preferredType });
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data?.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        uploadRecording(blob);
        stopStream();
      };

      recorder.start();
      startMeter(stream);
      setMicState('recording');
      appendLog(`[${shortTime()}] Microphone recording started.`);
    } catch (error) {
      setMicState('idle');
      setMicError(error.message || 'Microphone permission failed.');
      stopStream();
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === 'recording') {
      setMicState('transcribing');
      recorderRef.current.stop();
    }
  }

  async function uploadRecording(blob) {
    const form = new FormData();
    form.append('audio', blob, `marvin-room-${Date.now()}.webm`);

    try {
      const res = await fetch('/api/transcribe', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Transcription failed');
      setLastTranscript(data.text || '');
      setCommand(data.text || '');
      setMicState('idle');
      appendLog(`[${shortTime()}] Voice transcript\n${data.text || '(empty)'}`);
    } catch (error) {
      setMicState('idle');
      setMicError(error.message || 'Transcription failed.');
      appendLog(`[${shortTime()}] Microphone captured audio, but transcription failed: ${error.message}`);
    }
  }

  async function speakCommand() {
    if (!command.trim()) return;
    const res = await fetch('/api/piper-speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: command }),
    }).then((r) => r.json()).catch(() => null);

    if (res?.ok && res.url) {
      new Audio(res.url).play();
      appendLog(`[${shortTime()}] Spoken response generated.`);
    } else {
      appendLog(`[${shortTime()}] Piper speak is not ready on this machine.`);
    }
  }

  function routeCommand() {
    const text = command.toLowerCase();
    const agent = agents.find((item) => text.includes(item.name.toLowerCase().replace(' agent', '')));
    if (agent) {
      runAgent(agent);
      return;
    }
    appendLog(`[${shortTime()}] Command captured\n${command || 'No command entered.'}`);
  }

  return (
    <main className="mc2-shell">
      <section className="mc2-topbar">
        <div>
          <p className="mc2-eyebrow">Myrie HQ</p>
          <h1>Marvin Room</h1>
        </div>
        <div className="mc2-status-row">
          <span className="mc2-status good"><CheckCircle2 size={15} /> {activeCount}/{agents.length} agents ready</span>
          <span className="mc2-status"><Radio size={15} /> local ops</span>
          <button className="mc2-icon-btn" onClick={refresh} aria-label="Refresh Marvin Room">
            {booting ? <Loader2 size={18} className="spin" /> : <RefreshCw size={18} />}
          </button>
        </div>
      </section>

      <section className="mc2-command">
        <div className="mc2-command-main">
          <div className="mc2-command-head">
            <span><Mic size={18} /> Voice Command</span>
            <strong>{micState === 'recording' ? 'Listening' : micState === 'transcribing' ? 'Transcribing' : 'Ready'}</strong>
          </div>
          <div className="mc2-meter" aria-hidden="true">
            <span style={{ width: `${level}%` }} />
          </div>
          <textarea
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="Speak or type the next Marvin Room command..."
          />
          {lastTranscript && <p className="mc2-transcript">Last transcript: {lastTranscript}</p>}
          {micError && <p className="mc2-error"><CircleAlert size={15} /> {micError}</p>}
          {audioUrl && <audio src={audioUrl} controls className="mc2-audio" />}
        </div>

        <div className="mc2-command-actions">
          <button className="mc2-primary" onClick={micState === 'recording' ? stopRecording : startRecording} disabled={micState === 'transcribing'}>
            {micState === 'recording' ? <Square size={18} /> : micState === 'transcribing' ? <Loader2 size={18} className="spin" /> : <Mic size={18} />}
            {micState === 'recording' ? 'Stop' : micState === 'transcribing' ? 'Working' : 'Record'}
          </button>
          <button onClick={routeCommand}><Send size={18} /> Route</button>
          <button onClick={speakCommand}><Volume2 size={18} /> Speak</button>
          <button onClick={runAllAgents}><Play size={18} /> Run All</button>
        </div>
      </section>

      <section className="mc2-grid">
        <div className="mc2-panel mc2-agents-panel">
          <div className="mc2-panel-head">
            <div>
              <p className="mc2-eyebrow">Operators</p>
              <h2>Agent Fleet</h2>
            </div>
            <Bot size={21} />
          </div>
          <div className="mc2-agent-grid">
            {agents.map((agent) => {
              const state = agentStates[agent.id] || { status: 'ready', note: 'Ready' };
              return (
                <article className={`mc2-agent ${state.status}`} key={agent.id}>
                  <div className="mc2-agent-title">
                    <span className="mc2-agent-dot" />
                    <h3>{agent.name}</h3>
                  </div>
                  <p>{agent.purpose}</p>
                  <div className="mc2-agent-meta">
                    <span>{agent.mode || 'local'}</span>
                    <span>{state.lastRun || 'not run'}</span>
                  </div>
                  <div className="mc2-agent-actions">
                    <button onClick={() => runAgent(agent)} disabled={state.status === 'running'}>
                      {state.status === 'running' ? <Loader2 size={15} className="spin" /> : <Activity size={15} />}
                      {state.status === 'running' ? 'Running' : 'Run'}
                    </button>
                    <span>{state.note}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="mc2-side">
          <div className="mc2-panel">
            <div className="mc2-panel-head">
              <div>
                <p className="mc2-eyebrow">Connections</p>
                <h2>Integrations</h2>
              </div>
              <TerminalSquare size={20} />
            </div>
            <div className="mc2-integration-list">
              {integrations.map(([name, ready]) => (
                <div key={name}>
                  <span>{name}</span>
                  <strong className={ready ? 'ok' : 'missing'}>{statusLabel(ready)}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mc2-panel">
            <div className="mc2-panel-head">
              <div>
                <p className="mc2-eyebrow">Schedule</p>
                <h2>Automations</h2>
              </div>
              <Clock3 size={20} />
            </div>
            <div className="mc2-job-list">
              {jobs.length ? jobs.slice(0, 5).map((job) => (
                <div key={`${job.name}-${job.schedule}`}>
                  <strong>{job.name}</strong>
                  <span>{job.schedule}</span>
                </div>
              )) : <p>No cron jobs reported by OpenClaw.</p>}
            </div>
          </div>
        </aside>
      </section>

      <section className="mc2-panel mc2-log-panel">
        <div className="mc2-panel-head">
          <div>
            <p className="mc2-eyebrow">Live Output</p>
            <h2>Command Log</h2>
          </div>
          <button className="mc2-icon-btn" onClick={() => setLog('Marvin Room log cleared.')} aria-label="Clear command log">
            <Pause size={18} />
          </button>
        </div>
        <pre>{log}</pre>
      </section>
    </main>
  );
}
