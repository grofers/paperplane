'use strict';

let app = require('app');
let BrowserWindow = require('browser-window');

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({height:620, width: 810});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
