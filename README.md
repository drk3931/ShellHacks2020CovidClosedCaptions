# ShellHacks2020CovidClosedCaptions

Intallation Details: Python
python 3.7 is installed
pip install PyAudio-0.2.11-cp37-cp37m-win_amd64.whl



PyAudio-0.2.11-cp37-cp37m-win_amd64









Node Attempt:
you will need node-gyp setup to build native modules

run npm install 

Error Fixes:
https://stackoverflow.com/questions/46384591/node-was-compiled-against-a-different-node-js-version-using-node-module-versio

Converting .raw to .wav
ffmpeg -f s16le -ar 48.0k -ac 2 -i rawAudio.raw filename.wav