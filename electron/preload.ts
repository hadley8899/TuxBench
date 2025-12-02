import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('tuxbenchApi', {
  checkMangoHud: () => ipcRenderer.invoke('mangohud:check'),
});
