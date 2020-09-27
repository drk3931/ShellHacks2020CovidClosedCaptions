const {
  desktopCapturer,
  remote
} = require('electron');
const {
  Menu
} = remote;
const {
  ipcRenderer
} = require('electron');

const leftpane =
document.getElementById('left-pane');
const captionText =
document.getElementById('captions');
const videoFeed = document.querySelector('video');
const translateSelect = document.getElementsByTagName('select');
const sourceButton = document.getElementById('sourceButton');
sourceButton.onclick = getSources;

translateSelect[0].onchange = function() {
    var index = this.selectedIndex;
    var inputText = this.children[index].innerHTML.trim();
    console.log(inputText);
}

setInterval(()=>{captions.innerHTML+='<br>New Item speech transcribed'},5000)

function appendText() {
  if(captions.innerHTML == 'Start by choosing a source.'){
    captions.innerHTML = "First sentence"
  } else {
    captionText.innerHTML += "Extra sentences";
  }

  leftpane.scrollTop = leftpane.scrollHeight;
}


const audioProcessor = remote.require('./AudioProcessor.js');

var streamBuffers = require('stream-buffers');



const io = require('socket.io-client');
let socket = null; 






async function setSource(src) {
  //sourceButton.innerHTML = src.name.substring(0,10);
  const constraints = {
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: src.id
      }
    }
  }
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoFeed.srcObject = stream;
  videoFeed.muted = true;
  videoFeed.play();





}

async function getSources() {

  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });


  const sourceOptionsMenu = Menu.buildFromTemplate(
    sources.map(source => {
      return {
        label: source.name,
        click: () => setSource(source)
      }
    })
  );

  sourceOptionsMenu.popup();

}
