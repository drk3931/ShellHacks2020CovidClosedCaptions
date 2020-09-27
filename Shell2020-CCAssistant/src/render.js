
const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;
const { ipcRenderer } = require('electron');


const videoFeed = document.querySelector('video');
const translateButton = document.getElementById('translateButton');
const sourceButton = document.getElementById('sourceButton');
sourceButton.onclick = getSources;


const audioProcessor = remote.require('./AudioProcessor.js');


const io = require('socket.io-client');
let socket = null; 






async function setSource(src) {
    //sourceButton.innerHTML = src.name.substring(0,10);
    const constraints = {
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: src.id,
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: src.id,
            }
        }
    }



    socket = io.connect('http://localhost:3000');
    const stream = await navigator.mediaDevices.getUserMedia(constraints).then(onStreaming)


}

function onStreaming(stream) {



    let chunks = [];
    let options = {
        audioBitsPerSecond: 16000,
        mimeType: "video/x-matroska;codecs=avc1,opus"
    }



    let recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        chunks.push(e.data)
        //console.log(e.data);
    }

    recorder.onstop = (e) => {
        console.log("Stopping and sending audio");
        const blob = new Blob(chunks, options)
        socket.emit('audio', blob)
    }

  


    recorder.start(5000);

    setTimeout(()=>{
        recorder.stop();
    },5001)


}


async function getSources() {

    const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });


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


