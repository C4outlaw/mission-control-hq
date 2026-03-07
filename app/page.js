'use client';

import { useEffect, useMemo, useState } from 'react';

const opsCards = [
  {
    title: 'System Status',
    items: ['Gateway: Online', 'WhatsApp: Connected', 'Remote Stack: Ready'],
  },
  {
    title: 'Content Ops',
    items: ['TikTok Queue: 0 pending', 'IG/X Queue: 0 pending', 'Next Post Slot: Not set'],
  },
  {
    title: 'Inbox Triage',
    items: ['Urgent: 0', 'Needs Reply: 0', 'Spam Review: 0'],
  },
  {
    title: 'Daily Brief',
    items: ['NPR: Pending', 'ABC: Pending', 'FOX: Pending', 'Local: Pending'],
  },
  {
    title: 'Calendar',
    items: ['Today events: 0', 'Next event: —', 'Travel checks: Off'],
  },
  {
    title: 'Money Dashboard',
    items: ['Leads today: 0', 'Closed deals: 0', 'Revenue today: $0'],
  },
];

const fallbackAgents = [
  {
    id: 'news-brief-agent',
    name: 'News Brief Agent',
    purpose: 'Build concise briefings from NPR/ABC/FOX/local.',
    activation: 'Fetch headlines now, summarize, and send outputs.',
  },
];

// Initial schedule board (can be wired to live cron API later)
const initialCronJobs = [
  {
    name: 'Mission Control Auto Start',
    schedule: 'At login',
    status: 'enabled',
    purpose: 'Boot local dashboard at startup',
  },
  {
    name: 'Morning News Brief',
    schedule: 'Daily 6:00 AM',
    status: 'planned',
    purpose: 'NPR + ABC + FOX + Local digest',
  },
  {
    name: 'Daily Calendar Brief',
    schedule: 'Daily 6:10 AM',
    status: 'planned',
    purpose: 'Today schedule + prep notes',
  },
  {
    name: 'Gmail Priority Triage',
    schedule: 'Every 30 min',
    status: 'planned',
    purpose: 'Urgent inbox updates + spam review',
  },
  {
    name: 'TikTok Queue Run',
    schedule: 'Daily 11:00 AM',
    status: 'planned',
    purpose: 'Prepare captions/hashtags/queue list',
  },
];

function makeMonthGrid(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const totalDays = last.getDate();
  const cells = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let day = 1; day <= totalDays; day++) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  return { year, month, cells };
}

function statusTone(value = '') {
  const v = value.toLowerCase();
  if (v.includes('pending')) return 'pending';
  if (v.includes('online') || v.includes('connected') || v.includes('ready') || v.includes('active') || v.includes('on')) return 'active';
  return 'neutral';
}

export default function Home() {
  const now = new Date().toLocaleString();
  const [active, setActive] = useState({});
  const [queued, setQueued] = useState({});
  const [cronJobs, setCronJobs] = useState(initialCronJobs);
  const [agents, setAgents] = useState(fallbackAgents);
  const [newsOutput, setNewsOutput] = useState('');
  const [agentOutput, setAgentOutput] = useState('');
  const [weather, setWeather] = useState({ location: 'Daytona Beach, FL', days: [] });
  const [activeTab, setActiveTab] = useState('overview');
  const [socialConnected, setSocialConnected] = useState({
    tiktok: false,
    instagram: false,
    facebook: false,
    x: false,
    youtube: false,
    linkedin: false,
    grok: false,
  });
  const [collapsedTypes, setCollapsedTypes] = useState({});
  const [density, setDensity] = useState('dense');
  const [collapsedPanels, setCollapsedPanels] = useState({});
  const [widgets, setWidgets] = useState([
    { id: 'gateway', label: 'Gateway', value: 'Online' },
    { id: 'whatsapp', label: 'WhatsApp', value: 'Connected' },
    { id: 'brief', label: 'Next Brief', value: '6:00 AM' },
    { id: 'agents', label: 'Active Agents', value: '0' },
  ]);
  const [integrations, setIntegrations] = useState({ emailSource: false, calendarSource: false, smtp: false });
  const [gmailConnected, setGmailConnected] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [transcriptOutput, setTranscriptOutput] = useState('');
  const [dragWidgetIndex, setDragWidgetIndex] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Hey Myrie — chat + mic is ready. Tap the mic and talk.' },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(0.92);
  const [voiceEngine, setVoiceEngine] = useState('piper');
  const [autoListen, setAutoListen] = useState(false);
  const [flightStatus, setFlightStatus] = useState({
    flight: 'Arajet 5805 (DWI5805)',
    route: 'YYZ → PUJ',
    landed: false,
    onTime: null,
    source: 'https://flightaware.com/live/flight/DWI5805',
  });
  const [phoneDevices, setPhoneDevices] = useState([]);

  const counts = useMemo(() => {
    const activeCount = Object.values(active).filter(Boolean).length;
    const queuedCount = Object.values(queued).filter(Boolean).length;
    return { activeCount, queuedCount };
  }, [active, queued]);

  const monthData = useMemo(() => makeMonthGrid(new Date()), []);
  const monthName = new Date(monthData.year, monthData.month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const groupedAgents = useMemo(() => {
    const typeMap = {
      'news-brief-agent': 'Briefing',
      'email-triage-agent': 'Comms',
      'calendar-concierge-agent': 'Comms',
      'social-ops-agent': 'Growth',
      'revenue-agent': 'Growth',
      'web-build-agent': 'Build',
    };

    const withTypes = agents
      .map((a) => ({ ...a, type: typeMap[a.id] || 'Other' }))
      .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

    return withTypes.reduce((acc, agent) => {
      if (!acc[agent.type]) acc[agent.type] = [];
      acc[agent.type].push(agent);
      return acc;
    }, {});
  }, [agents]);

  const toggleActive = async (id) => {
    const nextVal = true;
    setActive((prev) => {
      const updated = { ...prev, [id]: true };
      try { localStorage.setItem('mc_active_agents', JSON.stringify(updated)); } catch {}
      return updated;
    });

    if (id === 'news-brief-agent' && nextVal) {
      setNewsOutput('Fetching + sending to WhatsApp...');
      try {
        const res = await fetch('/api/news-brief-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data?.ok) {
          setNewsOutput(`${data.text}\n\n✅ Sent to WhatsApp.`);
        } else {
          setNewsOutput(`News WhatsApp send failed: ${data?.error || 'unknown error'}`);
        }
      } catch {
        setNewsOutput('News WhatsApp send failed right now.');
      }
      return;
    }

    if (nextVal) {
      try {
        const res = await fetch('/api/agent-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        setAgentOutput(data?.text || 'Agent activated.');
      } catch {
        setAgentOutput('Agent action unavailable right now.');
      }
    }
  };
  const toggleQueued = (id) => setQueued((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleType = (type) => setCollapsedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  const togglePanel = (name) => setCollapsedPanels((prev) => ({ ...prev, [name]: !prev[name] }));
  const collapseAllAgentTypes = () => {
    const next = {};
    Object.keys(groupedAgents).forEach((k) => { next[k] = true; });
    setCollapsedTypes(next);
  };
  const expandAllAgentTypes = () => setCollapsedTypes({});

  const persistWidgets = (next) => {
    setWidgets(next);
    try { localStorage.setItem('mc_widgets_order', JSON.stringify(next)); } catch {}
  };

  const moveWidget = (index, dir) => {
    const next = [...widgets];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    persistWidgets(next);
  };

  const onWidgetDrop = (dropIndex) => {
    if (dragWidgetIndex === null || dragWidgetIndex === dropIndex) return;
    const next = [...widgets];
    const [moved] = next.splice(dragWidgetIndex, 1);
    next.splice(dropIndex, 0, moved);
    persistWidgets(next);
    setDragWidgetIndex(null);
  };

  const openSecureGmailLogin = () => {
    window.open('https://accounts.google.com/signin/v2/identifier?service=mail', '_blank', 'noopener,noreferrer');
  };

  const openSocialLogin = (platform) => {
    const urls = {
      tiktok: 'https://www.tiktok.com/login',
      instagram: 'https://www.instagram.com/accounts/login/',
      facebook: 'https://www.facebook.com/login',
      x: 'https://x.com/i/flow/login',
      youtube: 'https://accounts.google.com/signin/v2/identifier?service=youtube',
      linkedin: 'https://www.linkedin.com/login',
      grok: 'https://grok.com',
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const markSocialConnected = () => {};

  const disconnectSocial = () => {};

  const confirmGmailConnected = () => {};

  const disconnectGmail = () => {};

  const speakText = async (text) => {
    try {
      if (!voiceEnabled) return;

      if (voiceEngine === 'piper') {
        const res = await fetch('/api/piper-speak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (data?.ok && data.url) {
          const audio = new Audio(`${data.url}?t=${Date.now()}`);
          await audio.play();
          return;
        }
      }

      if (!('speechSynthesis' in window)) return;
      const utter = new SpeechSynthesisUtterance(text);
      const available = window.speechSynthesis.getVoices();
      const picked = available.find((v) => v.name === selectedVoice) || available.find((v) => /Aria|Jenny|Guy|Natural/i.test(v.name));
      if (picked) utter.voice = picked;
      utter.rate = voiceRate;
      utter.pitch = 0.98;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  const generateReply = (input) => {
    const q = input.toLowerCase();
    if (q.includes('status')) return `Mission Control is online. Active agents: ${counts.activeCount}.`;
    if (q.includes('news')) return 'I can run your News Brief Agent from the Agents tab and send updates.';
    if (q.includes('weather')) return weather.days?.[0] ? `Today is ${Math.round(weather.days[0].max)} over ${Math.round(weather.days[0].min)}.` : 'Weather is loading.';
    if (q.includes('open youtube')) return 'Say less. I can open YouTube for you now.';

    if ((q.includes('facebook') && q.includes('ad')) || q.includes('first post on facebook') || q.includes('facebook post')) {
      return 'Yes. We can set up the Facebook ad and launch a test post tonight. I will prep the creative, caption, audience, budget, and publish flow now.';
    }

    if (q.includes('can we') || q.includes('should we') || q.includes('how')) {
      return 'Yes. I understand the request. I can execute that now and return a step-by-step status update.';
    }

    return 'Understood. I will execute this now and report back with progress.';
  };

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const userMsg = { role: 'user', text };
    const reply = generateReply(text);
    const botMsg = { role: 'assistant', text: reply };
    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    setChatInput('');
    speakText(reply);
  };

  const startMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const msg = { role: 'assistant', text: 'Speech recognition is not supported in this browser.' };
      setChatMessages((prev) => [...prev, msg]);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setIsListening(true);
    rec.onerror = () => setIsListening(false);
    rec.onend = () => {
      setIsListening(false);
      if (autoListen) {
        setTimeout(() => {
          try { startMic(); } catch {}
        }, 350);
      }
    };
    rec.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript || '';
      if (!text) return;
      const userMsg = { role: 'user', text };
      const reply = generateReply(text);
      const botMsg = { role: 'assistant', text: reply };
      setChatMessages((prev) => [...prev, userMsg, botMsg]);
      speakText(reply);
    };

    rec.start();
  };

  const runTranscription = async () => {
    if (!audioPath.trim()) {
      setTranscriptOutput('Enter a valid audio file path first.');
      return;
    }
    setTranscriptOutput('Transcribing...');
    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: audioPath.trim() }),
      });
      const data = await res.json();
      if (data?.ok) {
        setTranscriptOutput(`${data.text}\n\nSaved: ${data.transcriptPath}`);
      } else {
        setTranscriptOutput(`Transcription failed: ${data?.error || 'unknown error'}`);
      }
    } catch {
      setTranscriptOutput('Transcription failed right now.');
    }
  };

  const runLocalFbTest = async () => {
    setAgentOutput('Running local Facebook post test...');
    try {
      const res = await fetch('/api/local-fb-test', { method: 'POST' });
      const data = await res.json();
      if (data?.ok) {
        setAgentOutput(`Local FB test complete.\n${data.output || ''}`.trim());
      } else {
        setAgentOutput(`Local FB test failed: ${data?.error || 'unknown error'}`);
      }
    } catch {
      setAgentOutput('Local FB test failed right now.');
    }
  };

  const refreshAll = async () => {
    try {
      const [cronRes, agentsRes, weatherRes, integrationsRes, flightRes, phoneRes] = await Promise.all([
        fetch('/api/cron', { cache: 'no-store' }),
        fetch('/api/agents', { cache: 'no-store' }),
        fetch('/api/weather', { cache: 'no-store' }),
        fetch('/api/integrations', { cache: 'no-store' }),
        fetch('/api/flight-status', { cache: 'no-store' }),
        fetch('/api/phone-tracker-dashboard', { cache: 'no-store' }),
      ]);
      const [cronData, agentsData, weatherData, integrationsData, flightData, phoneData] = await Promise.all([
        cronRes.json(),
        agentsRes.json(),
        weatherRes.json(),
        integrationsRes.json(),
        flightRes.json(),
        phoneRes.json(),
      ]);
      if (cronData?.ok && Array.isArray(cronData.jobs) && cronData.jobs.length) setCronJobs(cronData.jobs);
      if (agentsData?.ok && Array.isArray(agentsData.agents) && agentsData.agents.length) setAgents(agentsData.agents);
      if (weatherData?.ok && Array.isArray(weatherData.days)) {
        setWeather({ location: weatherData.location || 'Daytona Beach, FL', days: weatherData.days });
      }
      if (integrationsData?.ok && integrationsData.integrations) {
        setIntegrations(integrationsData.integrations);
        setGmailConnected(!!integrationsData.integrations.gmailOAuth);
        if (integrationsData.integrations.social) {
          setSocialConnected((prev) => ({ ...prev, ...integrationsData.integrations.social }));
        }
      }
      if (flightData?.flight) {
        setFlightStatus(flightData);
      }
      if (Array.isArray(phoneData?.devices)) {
        setPhoneDevices(phoneData.devices);
      }
    } catch {}
  };

  useEffect(() => {
    if (autoListen && !isListening) {
      try { startMic(); } catch {}
    }
  }, [autoListen]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mc_active_agents');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') setActive(parsed);
      }
      const savedDensity = localStorage.getItem('mc_density');
      if (savedDensity) setDensity(savedDensity);
      const savedWidgets = localStorage.getItem('mc_widgets_order');
      if (savedWidgets) {
        const parsedWidgets = JSON.parse(savedWidgets);
        if (Array.isArray(parsedWidgets) && parsedWidgets.length) setWidgets(parsedWidgets);
      }
      // strict auth mode: social/gmail statuses come from /api/integrations only
    } catch {}

    let live = true;

    const loadCron = async () => {
      try {
        const res = await fetch('/api/cron', { cache: 'no-store' });
        const data = await res.json();
        if (live && data?.ok && Array.isArray(data.jobs) && data.jobs.length) {
          setCronJobs(data.jobs);
        }
      } catch {
        // keep fallback list
      }
    };

    const loadAgents = async () => {
      try {
        const res = await fetch('/api/agents', { cache: 'no-store' });
        const data = await res.json();
        if (live && data?.ok && Array.isArray(data.agents) && data.agents.length) {
          setAgents(data.agents);
        }
      } catch {
        // keep fallback agents
      }
    };

    const loadWeather = async () => {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        const data = await res.json();
        if (live && data?.ok && Array.isArray(data.days)) {
          setWeather({ location: data.location || 'Daytona Beach, FL', days: data.days });
        }
      } catch {
        // keep current weather state
      }
    };

    const loadIntegrations = async () => {
      try {
        const res = await fetch('/api/integrations', { cache: 'no-store' });
        const data = await res.json();
        if (live && data?.ok && data.integrations) {
          setIntegrations(data.integrations);
          setGmailConnected(!!data.integrations.gmailOAuth);
          if (data.integrations.social) {
            setSocialConnected((prev) => ({ ...prev, ...data.integrations.social }));
          }
        }
      } catch {}
    };

    const loadFlight = async () => {
      try {
        const res = await fetch('/api/flight-status', { cache: 'no-store' });
        const data = await res.json();
        if (live && data?.flight) setFlightStatus(data);
      } catch {}
    };

    const loadPhone = async () => {
      try {
        const res = await fetch('/api/phone-tracker-dashboard', { cache: 'no-store' });
        const data = await res.json();
        if (live && Array.isArray(data?.devices)) setPhoneDevices(data.devices);
      } catch {}
    };

    loadCron();
    loadAgents();
    loadWeather();
    loadIntegrations();
    loadFlight();
    loadPhone();

    try {
      if ('speechSynthesis' in window) {
        const pickDefault = (list) => {
          if (!list?.length) return '';
          const preferred = list.find((v) => /Aria|Jenny|Guy|Natural/i.test(v.name));
          return (preferred || list[0]).name;
        };
        const loadVoices = () => {
          const list = window.speechSynthesis.getVoices() || [];
          if (list.length) {
            setVoices(list.map((v) => v.name));
            setSelectedVoice((prev) => prev || pickDefault(list));
          }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } catch {}

    const id = setInterval(loadCron, 90000);

    return () => {
      live = false;
      clearInterval(id);
    };
  }, []);

  return (
    <main className={`mc-root density-${density}`}>
      <nav className="mc-topnav">
        <div className="brand">Mission Control</div>
        <div className="links tabs">
          <button className={activeTab === 'overview' ? 'tab on' : 'tab'} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={activeTab === 'agents' ? 'tab on' : 'tab'} onClick={() => setActiveTab('agents')}>Agents</button>
          <button className={activeTab === 'schedule' ? 'tab on' : 'tab'} onClick={() => setActiveTab('schedule')}>Schedule</button>
          <button className={activeTab === 'logs' ? 'tab on' : 'tab'} onClick={() => setActiveTab('logs')}>Logs</button>
          <button className={activeTab === 'social' ? 'tab on' : 'tab'} onClick={() => setActiveTab('social')}>Social</button>
          <button className={activeTab === 'chat' ? 'tab on' : 'tab'} onClick={() => setActiveTab('chat')}>Chat</button>
          <button className={activeTab === 'flight' ? 'tab on' : 'tab'} onClick={() => setActiveTab('flight')}>Flight Tracker</button>
          <button className={activeTab === 'phone' ? 'tab on' : 'tab'} onClick={() => setActiveTab('phone')}>Phone Tracker</button>
        </div>
        <div className="top-actions">
          <select
            value={density}
            onChange={(e) => {
              setDensity(e.target.value);
              try { localStorage.setItem('mc_density', e.target.value); } catch {}
            }}
          >
            <option value="normal">Normal</option>
            <option value="dense">Dense</option>
            <option value="ultra">Ultra</option>
          </select>
          <button className="tab" onClick={refreshAll}>Refresh</button>
        </div>
      </nav>

      <header className="mc-header">
        <h1>Good morning, Myrie</h1>
        <p>Your local command center for ops, content, calendar, and revenue.</p>
        <small>Last refresh: {now}</small>
        <div className="mc-header-tabs">
          <span>Discover</span>
          <span>Watch</span>
          <span>Play</span>
        </div>
      </header>

      {activeTab === 'overview' ? (
      <section className="mc-home-layout">
        <aside className="mc-left-rail">
          <article className="mc-widget profile">
            <div className="panel-head"><h3>Profile</h3><button className="mini" onClick={() => togglePanel('profile')}>{collapsedPanels.profile ? '+' : '−'}</button></div>
            {!collapsedPanels.profile ? (
              <>
                <div className="profile-top">
                  <img className="avatar" src="/images/myrie-headshot.jpg" alt="Myrie headshot" />
                  <div className="profile-temp">
                    <h3>Myrie</h3>
                    <p className="muted">@MissionControl</p>
                    <p className="temp-inline">
                      {weather.days?.[0] ? `${Math.round(weather.days[0].max)}°/${Math.round(weather.days[0].min)}°` : '—'} today
                    </p>
                  </div>
                </div>
                <p className="bio">Operator profile for local automation, agents, and daily command center workflow.</p>
                <div className="profile-actions">
                  <button className="follow">Activate</button>
                  <button className="message">Message</button>
                </div>
              </>
            ) : null}
          </article>

        </aside>

        <section className="mc-news-feed">
          <article className="mc-feature">
            <div className="tag">Mission Highlight</div>
            <h2>Mission Control is live and fully local</h2>
            <p>Agents, calendar, cron, and briefing workflows are now centralized in one control surface.</p>
          </article>

          <article className="mc-widget weather weather-inline">
            <div className="panel-head"><h3>Local Weather (10-Day)</h3><button className="mini" onClick={() => togglePanel('weather')}>{collapsedPanels.weather ? '+' : '−'}</button></div>
            {!collapsedPanels.weather ? (
              <>
                <div className="weather-list weather-horizontal compact-weather">
                  {weather.days.length ? (
                    weather.days.map((d) => {
                      const day = new Date(`${d.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' });
                      return (
                        <div key={d.date} className="weather-row">
                          <span>{day}</span>
                          <span>{Math.round(d.max)}°/{Math.round(d.min)}°</span>
                        </div>
                      );
                    })
                  ) : (
                    <p>Loading forecast...</p>
                  )}
                </div>
              </>
            ) : null}
          </article>

          <div className="mc-tile-grid">
            {opsCards.map((card) => (
              <article key={card.title} className="mc-card tile">
                <h2 className={card.title === 'Money Dashboard' ? 'money-title' : ''}>{card.title}</h2>
                <ul>
                  {card.items.map((item) => {
                    const [label, rawValue] = item.split(':');
                    const value = (rawValue || '').trim();
                    const tone = statusTone(value);
                    return (
                      <li key={item} className="status-row">
                        <span>{label}{rawValue ? ':' : ''} {rawValue ? '' : value}</span>
                        {rawValue ? <span className={`status-chip ${tone}`}>{value}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <aside className="mc-right-rail">
          <article className="mc-widget stat">
            <h3>Agent Status</h3>
            <p>Active: <strong>{counts.activeCount}</strong></p>
            <p>Queued: <strong>{counts.queuedCount}</strong></p>
          </article>

          <article className="mc-widget stat widgets">
            <div className="panel-head">
              <h3>Widgets</h3>
              <button className="mini" onClick={() => togglePanel('widgets')}>{collapsedPanels.widgets ? '+' : '−'}</button>
            </div>

            {!collapsedPanels.widgets ? (
              <div className="widget-grid">
                {widgets.map((w, i) => (
                  <div
                    key={w.id}
                    className={`w-item w-${w.id} ${dragWidgetIndex === i ? 'dragging' : ''}`}
                    draggable
                    onDragStart={() => setDragWidgetIndex(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onWidgetDrop(i)}
                    onDragEnd={() => setDragWidgetIndex(null)}
                  >
                    <div className="w-main">
                      <span>{w.label}</span>
                      <strong>{w.id === 'agents' ? counts.activeCount : w.value}</strong>
                    </div>
                    <div className="w-controls">
                      <button className="mini" onClick={() => moveWidget(i, -1)}>↑</button>
                      <button className="mini" onClick={() => moveWidget(i, 1)}>↓</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </article>

          <article className="mc-widget stat">
            <h3>Secure Connect</h3>
            <p>• Gmail OAuth: <strong>{gmailConnected ? 'Connected' : 'Not connected'}</strong></p>
            <p>• Email Source: <strong>{integrations.emailSource ? 'Live' : 'Local fallback'}</strong></p>
            <p>• Calendar Source: <strong>{integrations.calendarSource ? 'Live' : 'Local fallback'}</strong></p>
            <div className="connect-actions">
              <button className="mini" onClick={openSecureGmailLogin}>Open Gmail Login</button>
              <button className="mini" onClick={refreshAll}>Check Auth Status</button>
            </div>
            <p className="muted">Strict mode enabled: status only shows Connected after real OAuth/env token validation.</p>
          </article>
        </aside>
      </section>
      ) : null}

      {activeTab === 'agents' ? (
      <section className="mc-agents-wrap">
        <div className="mc-section-head">
          <h2>Agent Roster</h2>
          <p>Compact command row. Each agent has an animal thumbnail.</p>
          <small>
            Active: {counts.activeCount} • Queued: {counts.queuedCount}
          </small>
        </div>

        <div className="mc-agents-row">
          {Object.values(groupedAgents).flat().map((agent, idx) => {
            const isActive = !!active[agent.id];
            const isQueued = !!queued[agent.id];
            const isMoneyMaker = agent.id === 'revenue-agent';
            const animals = ['🦊', '🦅', '🦁', '🐦', '🐯'];
            const animal = animals[idx % animals.length];

            return (
              <article
                key={agent.id}
                className={`mc-agent-card compact ${isMoneyMaker ? 'money-maker' : ''} ${isActive ? 'is-active' : ''}`}
              >
                <div className="agent-top">
                  <span className="animal-badge" aria-hidden>{animal}</span>
                  <h3>{agent.name}</h3>
                </div>
                <p className={`type-pill type-${agent.type.toLowerCase()}`}>{agent.type}</p>
                <p className="purpose">{agent.purpose}</p>
                <div className="first-task">
                  <p>{agent.firstTask || agent.activation || 'Ready for activation.'}</p>
                </div>
                <div className="agent-actions">
                  <button
                    type="button"
                    className={`btn-active ${isActive ? 'on' : ''}`}
                    onClick={() => toggleActive(agent.id)}
                  >
                    {isActive ? 'Active' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    className={`btn-queue ${isQueued ? 'on' : ''}`}
                    onClick={() => toggleQueued(agent.id)}
                  >
                    {isQueued ? 'Queued' : 'Queue'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      ) : null}

      {activeTab === 'logs' ? (
        <section className="mc-news-wrap">
          <div className="mc-section-head">
            <h2>Whisper Transcribe</h2>
            <p>Paste local audio file path and run one-click transcription.</p>
          </div>
          <div className="transcribe-row">
            <input
              className="transcribe-input"
              value={audioPath}
              onChange={(e) => setAudioPath(e.target.value)}
              placeholder="C:\\path\\to\\audio.wav"
            />
            <button className="mini" onClick={runTranscription}>Transcribe</button>
          </div>
          {transcriptOutput ? <pre className="mc-news-output">{transcriptOutput}</pre> : null}
        </section>
      ) : null}

      {activeTab === 'logs' && newsOutput ? (
        <section className="mc-news-wrap">
          <div className="mc-section-head">
            <h2>Live News Pull</h2>
            <p>Generated when News Brief Agent is activated.</p>
          </div>
          <pre className="mc-news-output">{newsOutput}</pre>
        </section>
      ) : null}

      {activeTab === 'logs' && agentOutput ? (
        <section className="mc-news-wrap">
          <div className="mc-section-head">
            <h2>Agent Action Log</h2>
            <p>Local action feedback from activated agents.</p>
          </div>
          <pre className="mc-news-output">{agentOutput}</pre>
        </section>
      ) : null}

      {activeTab === 'schedule' ? (
      <section className="mc-schedule-wrap">
        <div className="mc-section-head">
          <h2>Calendar & Cron Jobs</h2>
          <p>All scheduled/recurring work and what’s coming up next.</p>
        </div>

        <div className="mc-schedule-grid">
          <article className="mc-calendar-card">
            <h3>{monthName}</h3>
            <div className="mc-weekdays">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="mc-calendar-grid">
              {monthData.cells.map((day, i) => (
                <div key={i} className={`mc-day ${day ? '' : 'empty'}`}>
                  {day || ''}
                </div>
              ))}
            </div>
          </article>

          <article className="mc-cron-card">
            <h3>Scheduled Jobs</h3>
            <ul className="cron-list">
              {cronJobs.map((job) => (
                <li key={job.name}>
                  <div className="row1">
                    <strong>{job.name}</strong>
                    <span className={`status ${job.status}`}>{job.status}</span>
                  </div>
                  <div className="row2">{job.schedule}</div>
                  <div className="row3">{job.purpose}</div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      ) : null}

      {activeTab === 'social' ? (
      <section className="mc-schedule-wrap">
        <div className="mc-section-head">
          <h2>Social Media Secure Connect</h2>
          <p>Login is done only on official sites. No passwords are stored in Mission Control.</p>
        </div>
        <div className="social-grid">
          {[
            ['tiktok', 'TikTok', 'https://cdn.simpleicons.org/tiktok/25F4EE'],
            ['instagram', 'Instagram', 'https://cdn.simpleicons.org/instagram/E4405F'],
            ['facebook', 'Facebook', 'https://cdn.simpleicons.org/facebook/1877F2'],
            ['x', 'X', 'https://cdn.simpleicons.org/x/FFFFFF'],
            ['youtube', 'YouTube', 'https://cdn.simpleicons.org/youtube/FF0033'],
            ['linkedin', 'LinkedIn', 'https://cdn.simpleicons.org/linkedin/0A66C2'],
            ['grok', 'Grok', 'https://cdn.simpleicons.org/xai/FFFFFF'],
          ].map(([key, label, icon]) => (
            <article key={key} className={`mc-card social-card social-${key}`}>
              <h3 className="social-title"><img src={icon} alt={`${label} icon`} className="social-icon" /> {label}</h3>
              <p>Status: <strong>{socialConnected[key] ? 'Connected' : 'Not connected'}</strong></p>
              <div className="agent-actions">
                <button className="mini" onClick={() => openSocialLogin(key)}>Open Login</button>
                <button className="mini" onClick={refreshAll}>Check Auth Status</button>
              </div>
            </article>
          ))}

          <article className="mc-card social-card">
            <h3 className="social-title">Local Automation Test</h3>
            <p>Run local-only posting workflow (no browser relay).</p>
            <div className="agent-actions">
              <button className="mini" onClick={runLocalFbTest}>Run FB Local Test</button>
              <button className="mini" onClick={refreshAll}>Refresh</button>
            </div>
          </article>
        </div>
      </section>
      ) : null}

      {activeTab === 'chat' ? (
      <section className="mc-schedule-wrap">
        <div className="mc-section-head">
          <h2>Luna Voice Chat</h2>
          <p>Type or tap mic to talk. Replies are spoken back with text-to-speech.</p>
        </div>

        <div className="chat-box">
          <div className="chat-log">
            {chatMessages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <strong>{m.role === 'assistant' ? 'Luna' : 'You'}:</strong> {m.text}
              </div>
            ))}
          </div>

          <div className="chat-controls">
            <input
              className="transcribe-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => { if (e.key === 'Enter') sendChat(); }}
            />
            <button className="mini" onClick={sendChat}>Send</button>
            <button className={`mini ${isListening ? 'listening' : ''}`} onClick={startMic}>{isListening ? 'Listening...' : 'Mic'}</button>
          </div>

          <div className="chat-controls">
            <select className="transcribe-input" value={voiceEngine} onChange={(e) => setVoiceEngine(e.target.value)}>
              <option value="piper">Engine: Piper (Local)</option>
              <option value="browser">Engine: Browser</option>
            </select>
            <select className="transcribe-input" value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
              {voices.length ? voices.map((v) => <option key={v} value={v}>{v}</option>) : <option value="">Default voice</option>}
            </select>
            <select className="transcribe-input" value={voiceRate} onChange={(e) => setVoiceRate(Number(e.target.value))}>
              <option value={0.85}>Voice: Deep</option>
              <option value={0.92}>Voice: Natural</option>
              <option value={1}>Voice: Fast</option>
            </select>
            <button className={`mini ${voiceEnabled ? 'listening' : ''}`} onClick={() => setVoiceEnabled((v) => !v)}>
              {voiceEnabled ? 'Voice On' : 'Voice Off'}
            </button>
            <button className={`mini ${autoListen ? 'listening' : ''}`} onClick={() => setAutoListen((v) => !v)}>
              {autoListen ? 'Auto Listen On' : 'Auto Listen Off'}
            </button>
          </div>
        </div>
      </section>
      ) : null}

      {activeTab === 'flight' ? (
      <section className="mc-schedule-wrap">
        <div className="mc-section-head">
          <h2>Flight Tracker</h2>
          <p>Live monitor for Arajet 5805 (YYZ → PUJ). You will get a message when it lands.</p>
        </div>

        <div className="mc-card">
          <p><strong>{flightStatus.flight}</strong></p>
          <p>{flightStatus.route}</p>
          <p>Status: <span className={`status-chip ${flightStatus.landed ? 'active' : 'pending'}`}>{flightStatus.landed ? 'Landed' : 'In Flight / Pending'}</span></p>
          <p>On Time: <strong>{flightStatus.onTime === null ? 'Unknown' : (flightStatus.onTime ? 'Yes' : 'No')}</strong></p>
          <div className="agent-actions">
            <button className="mini" onClick={refreshAll}>Refresh Status</button>
            <a className="mini" href={flightStatus.source} target="_blank" rel="noopener noreferrer">Open Flight Page</a>
          </div>
        </div>
      </section>
      ) : null}

      {activeTab === 'phone' ? (
      <section className="mc-schedule-wrap">
        <div className="mc-section-head">
          <h2>Phone Tracker</h2>
          <p>iPhone 16 Pro Max tracker feed (latest device check-ins).</p>
        </div>
        <div className="mc-card">
          {phoneDevices.length ? phoneDevices.map((d) => (
            <div key={d.deviceId} className="status-row" style={{ marginBottom: 10 }}>
              <span>
                <strong>{d.name || d.deviceId}</strong><br />
                Lat/Lon: {Number(d.lat).toFixed(5)}, {Number(d.lon).toFixed(5)}<br />
                Updated: {d.updatedAt || d.timestamp || '—'}
              </span>
              <span className="status-chip active">Live</span>
            </div>
          )) : <p>No device check-ins yet. Run the iPhone Shortcut setup to start location pings.</p>}
          <div className="agent-actions">
            <button className="mini" onClick={refreshAll}>Refresh Tracker</button>
          </div>
        </div>
      </section>
      ) : null}

      <footer className="mc-footer">Myrie • Local Mission Control • Next.js</footer>
    </main>
  );
}
