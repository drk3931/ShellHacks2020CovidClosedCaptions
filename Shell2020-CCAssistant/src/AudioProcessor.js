const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

const io = require('socket.io').listen(3000);
const fs = require('fs');


const config = {
    encoding: 'OGG_OPUS',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
}

const audio = {
    content: null
}

async function main() {

    const fileName = 'temp.ogg';
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    audio.content = audioBytes;

    const [response] = await client.recognize({
        audio: audio,
        config: config
    })
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);

}


io.on('connection',(socket)=>{
    console.log("Connection made. ")
    audio.content = null; 

    socket.on('audio',(data)=>{
        console.log("RECIEVED AUDIO..");
        main().catch(err=>console.log(err))
    });

});

