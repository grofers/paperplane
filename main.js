'use strict';

let app = require('app');
let BrowserWindow = require('browser-window');

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({ frame: false, transparent: true });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
