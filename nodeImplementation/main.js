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


var audioStream = null;
var filestream = null;

app.whenReady().then(createWindow).then((res) => {

  //console.log(portAudio.getDevices());

  audioStream = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 48000,
      deviceId: 4,
      closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

  filestream = fs.createWriteStream('rawAudio.raw');

  //Start streaming
  audioStream.pipe(filestream);
  audioStream.start();


});




app.on('before-quit', async () => {
  try {
    if (audioStream !== null) {
      console.log("Closing.")
      audioStream.quit();
      filestream.end();

    }
  } catch (err) {
    console.error(err);
  }
});