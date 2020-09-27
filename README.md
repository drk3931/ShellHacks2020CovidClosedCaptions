# ShellHacks2020CovidClosedCaptions

Intallation Details: Python
python 3.7 is installed
pip install PyAudio-0.2.11-cp37-cp37m-win_amd64.whl



{'index': 0, 'structVersion': 2, 'name': 'Microsoft Sound Mapper - Input', 'hostApi': 0, 'maxInputChannels': 2, 'maxOutputChannels': 0, 'defaultLowInputLatency': 0.09, 'defaultLowOutputLatency': 0.09, 'defaultHighInputLatency': 0.18, 'defaultHighOutputLatency': 0.18, 'defaultSampleRate': 44100.0}
{'index': 1, 'structVersion': 2, 'name': 'Microphone Array (Realtek High ', 'hostApi': 0, 'maxInputChannels': 2, 'maxOutputChannels': 0, 'defaultLowInputLatency': 0.09, 'defaultLowOutputLatency': 0.09, 'defaultHighInputLatency': 0.18, 'defaultHighOutputLatency': 0.18, 'defaultSampleRate': 44100.0}
{'index': 2, 'structVersion': 2, 'name': 'Microsoft Sound Mapper - Output', 'hostApi': 0, 'maxInputChannels': 0, 'maxOutputChannels': 2, 'defaultLowInputLatency': 0.09, 'defaultLowOutputLatency': 0.09, 'defaultHighInputLatency': 0.18, 'defaultHighOutputLatency': 0.18, 'defaultSampleRate': 44100.0}
{'index': 3, 'structVersion': 2, 'name': 'Speaker/HP (Realtek High Defini', 'hostApi': 0, 'maxInputChannels': 0, 'maxOutputChannels': 2, 'defaultLowInputLatency': 0.09, 'defaultLowOutputLatency': 0.09, 'defaultHighInputLatency': 0.18, 'defaultHighOutputLatency': 0.18, 'defaultSampleRate': 44100.0}
{'index': 4, 'structVersion': 2, 'name': 'Speaker/HP (Realtek High Definition Audio)', 'hostApi': 1, 'maxInputChannels': 0, 'maxOutputChannels': 2, 'defaultLowInputLatency': 0.0, 'defaultLowOutputLatency': 0.003, 'defaultHighInputLatency': 0.0, 'defaultHighOutputLatency': 0.01, 'defaultSampleRate': 48000.0}  
{'index': 5, 'structVersion': 2, 'name': 'Microphone Array (Realtek High Definition Audio)', 'hostApi': 1, 'maxInputChannels': 2, 'maxOutputChannels': 0, 'defaultLowInputLatency': 0.003, 'defaultLowOutputLatency': 0.0, 'defaultHighInputLatency': 0.01, 'defaultHighOutputLatency': 0.0, 'defaultSampleRate': 48000.0}
{'index': 6, 'structVersion': 2, 'name': 'Microphone Array (Realtek HD Audio Mic Array input)', 'hostApi': 2, 'maxInputChannels': 2, 'maxOutputChannels': 0, 'defaultLowInputLatency': 0.01, 'defaultLowOutputLatency': 0.01, 'defaultHighInputLatency': 0.04, 'defaultHighOutputLatency': 0.04, 'defaultSampleRate': 44100.0}
{'index': 7, 'structVersion': 2, 'name': 'Speakers (Realtek HD Audio output)', 'hostApi': 2, 'maxInputChannels': 0, 'maxOutputChannels': 2, 'defaultLowInputLatency': 0.01, 'defaultLowOutputLatency': 0.01, 'defaultHighInputLatency': 0.04, 'defaultHighOutputLatency': 0.04, 'defaultSampleRate': 44100.0}
{'index': 8, 'structVersion': 2, 'name': 'Microphone (Realtek HD Audio Mic input)', 'hostApi': 2, 'maxInputChannels': 2, 'maxOutputChannels': 0, 'defaultLowInputLatency': 0.01, 'defaultLowOutputLatency': 0.01, 'defaultHighInputLatency': 0.04, 'defaultHighOutputLatency': 0.04, 'defaultSampleRate': 44100.0}    









Node Attempt:
you will need node-gyp setup to build native modules

run npm install 

Error Fixes:
https://stackoverflow.com/questions/46384591/node-was-compiled-against-a-different-node-js-version-using-node-module-versio

Converting .raw to .wav
ffmpeg -f s16le -ar 48.0k -ac 2 -i rawAudio.raw filename.wav