const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startFortnite: () => ipcRenderer.send('start-fortnite'),
  stopFortnite: () => ipcRenderer.send('stop-fortnite'),
  closeApp: () => ipcRenderer.send('close-app'),
});
