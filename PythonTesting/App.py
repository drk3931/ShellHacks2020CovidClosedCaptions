import pyaudio
import wave
import speech_recognition as sr
from threading import Thread
from queue import Queue
import asyncio
import websockets


r = sr.Recognizer()
audio_queue = Queue()
p = pyaudio.PyAudio()

for i in range(p.get_device_count()):
    print(p.get_device_info_by_index(i))

selected = int(input("Please enter the ID of the Output"))

device_info = p.get_device_info_by_index(selected)
channelcount = device_info["maxInputChannels"] if (device_info["maxOutputChannels"] < device_info["maxInputChannels"]) else device_info["maxOutputChannels"]
frameCount = 512

#num audio samples collected in a second
rate = int(device_info["defaultSampleRate"])


stream = p.open(format = pyaudio.paInt16,
                channels = channelcount,
                rate = rate,
                input = True,
                frames_per_buffer = frameCount,
                input_device_index = device_info["index"],
                as_loopback = True)


def sendToGoogleImproved(stream):
    recorded_frames = []

textOutput = []

def sendToGoogle(stream):
    recorded_frames = []
    chunk = 1024
    global rate
    global channelcount
    record_seconds = 10
    for i in range(0, int(rate / chunk * record_seconds)):
        data = stream.read(chunk)
        recorded_frames.append(data) 
    wf = wave.open("output.wav", 'wb')
    wf.setnchannels(channelcount)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(rate)
    wf.writeframes(b''.join(recorded_frames))
    wf.close() 
    file = sr.AudioFile('output.wav')
    with file as source:
        audio = r.record(source)
    try:
        print(text)
        text = r.recognize_google(audio)
        return text
    except sr.UnknownValueError as e:
        return ""

async def processStream(websocket,path):
    global streamHandle
    while True:
        text = sendToGoogle(streamHandle)
        await websocket.send(text)
    
    
start_server = websockets.serve(processStream, 'localhost', 3001)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()







           

'''


    stream.stop_stream()
    stream.close()


'''