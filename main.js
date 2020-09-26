const { app, BrowserWindow } = require('electron')
const portAudio = require('naudiodon');
var fs = require('fs');




function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow).then((res) => {


  // Create an instance of AudioIO with inOptions (defaults are as below), which will return a ReadableStream
  var ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: 2, 
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

  // Create a write stream to write out to a raw audio file
  var ws = fs.createWriteStream('rawAudio.raw');

  //Start streaming
  ai.pipe(ws);
  ai.start();

});