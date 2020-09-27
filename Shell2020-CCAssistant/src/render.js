
const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;
const { ipcRenderer } = require('electron');


const videoFeed = document.querySelector('video');
const translateButton = document.getElementById('translateButton');
const sourceButton = document.getElementById('sourceButton');
sourceButton.onclick = getSources;


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
                chromeMediaSourceId: src.id
            }
        }
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoFeed.srcObject = stream;
    videoFeed.muted = true;
    videoFeed.play();


    myWindow.webContents.send('my-cool-log-event', 'Yay');

   
    
    
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


