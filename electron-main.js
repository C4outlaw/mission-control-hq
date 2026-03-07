const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

const isDev = !app.isPackaged;
const PORT = process.env.MISSION_CONTROL_PORT || 3002;
let serverProcess;

function startNextServer() {
  if (isDev) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
    serverProcess = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
      cwd: __dirname,
      env: { ...process.env, NODE_ENV: 'production' },
      stdio: 'inherit',
      windowsHide: true,
    });

    const timeout = setTimeout(() => resolve(), 8000);
    serverProcess.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#0b1220',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const url = `http://127.0.0.1:${PORT}`;
  win.loadURL(url);
}

app.whenReady().then(async () => {
  try {
    await startNextServer();
    createWindow();
  } catch (e) {
    console.error('Failed to start Mission Control app:', e);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    try { serverProcess.kill(); } catch {}
  }
  if (process.platform !== 'darwin') app.quit();
});
