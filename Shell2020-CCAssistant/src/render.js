
const { desktopCapturer, remote } = require('electron');
const { Menu,dialog } = remote;
const { ipcRenderer } = require('electron');

const {Recorder} = require('recorder-js');

const {writeFile} = require('fs');

const videoFeed = document.querySelector('video');
const translateButton = document.getElementById('translateButton');
const sourceButton = document.getElementById('sourceButton');
sourceButton.onclick = getSources;


const audioProcessor = remote.require('./AudioProcessor.js');

var streamBuffers = require('stream-buffers');



const io = require('socket.io-client');
let socket = null; 






async function setSource(src) {
    //sourceButton.innerHTML = src.name.substring(0,10);
    const constraints = {
        audio: true
    }



    socket = io.connect('http://localhost:3000');
    navigator.mediaDevices.getUserMedia(constraints).then(onStreaming)


}

function onStreaming(stream) {



    let chunks = [];
    let options = {
        audioBitsPerSecond: 16000,
        mimeType: "audio/webm;codecs=opus"
    }

    let wavRec = new Recorder(stream);

    recorder.record();

    setTimeout(()=>{
        recorder.stop();
    },5000)



    /*
    let recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        chunks.push(e.data)
        console.log(e.data);
    }

    recorder.onstop = async (e) => {
        console.log("Stopping and sending audio");
        const blob = new Blob(chunks, options);
        const buffer = Buffer.from(await blob.arrayBuffer());

       
        writeFile('temp.ogg',buffer,()=>{
            socket.emit('audio', buffer)
        });
           

    }
    */

  


    recorder.start(5000);

    setTimeout(()=>{
        recorder.stop();
    },5000)


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


