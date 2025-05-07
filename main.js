const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execFile, exec } = require('child_process');

let win;

// Exact path to Fortnite EXE (verify this exists)
const fortnitePath = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping_EAC_EOS.exe";

function createWindow() {
  win = new BrowserWindow({
    width: 350,
    height: 400,
    title: "Ventura Launcher",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

// Start Fortnite
ipcMain.on('start-fortnite', () => {
  execFile(fortnitePath, (error) => {
    if (error) {
      console.error(`Failed to launch Fortnite: ${error.message}`);
    } else {
      console.log("Fortnite launched successfully.");
    }
  });
});

// Stop Fortnite
ipcMain.on('stop-fortnite', () => {
  exec('taskkill /IM FortniteClient-Win64-Shipping_EAC_EOS.exe /F', (err) => {
    if (err) {
      console.error(`Failed to stop Fortnite: ${err.message}`);
    } else {
      console.log("Fortnite stopped.");
    }
  });
});

ipcMain.on('close-app', () => {
  app.quit();
});


// App ready
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
