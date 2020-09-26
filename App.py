import pyaudio
import wave
import speech_recognition as sr
from threading import Thread
from queue import Queue


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


    





recorded_frames = []

def saveToFile():
    wf = wave.open("output.wav", 'wb')
    wf.setnchannels(channelcount)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(rate)
    wf.writeframes(b''.join(recorded_frames))
    wf.close()


def sendDataToGoogle(stream):
    try: 
        with sr.AudioFile(stream) as source:
            audio = r.record(source)
            text = r.recognize_google(audio) 
            print(text)
    except sr.UnknownValueError: 
        print("Speech Recognizer could not understand")  

def processStream(streamHandle):
    sendDataToGoogle(stream)

    #we will record for 5 seconds and see what google says
    RECORD_SECONDS = 5
    chunk = 1024
    for i in range(0, int(rate / chunk * RECORD_SECONDS)):
        data = stream.read(chunk)
        recorded_frames.append(data)
        print(i)
        #sendDataToGoogle(data)
    stream.stop_stream()
    stream.close()
    p.terminate()
    





processStream(stream)




           

'''





'''