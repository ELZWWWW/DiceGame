
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'Diceforge',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  // Check for updates once the app window is ready
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// Optional: auto-updater event logging
autoUpdater.on('checking-for-update', () => console.log('Checking for updates...'));
autoUpdater.on('update-available', () => console.log('A new update is available!'));
autoUpdater.on('update-not-available', () => console.log('App is up-to-date.'));
autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded; will install on restart.');
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
