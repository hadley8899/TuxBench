import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type MangoHudModule = typeof import('./mangohud.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const mangohudSpecifier = existsSync(path.join(__dirname, 'mangohud.ts')) ? './mangohud.ts' : './mangohud.js';
const preloadSpecifier = isDev ? 'preload.ts' : 'preload.js';
let mangohudModulePromise: Promise<MangoHudModule> | null = null;

const loadMangoHudModule = () => {
  if (!mangohudModulePromise) {
    mangohudModulePromise = import(mangohudSpecifier);
  }

  return mangohudModulePromise;
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, preloadSpecifier),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(() => {
  ipcMain.handle('mangohud:check', async () => {
    const { checkMangoHudAvailability } = await loadMangoHudModule();
    return checkMangoHudAvailability();
  });
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
