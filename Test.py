import speech_recognition as sr
r = sr.Recognizer()

file = sr.AudioFile('output.wav')
with file as source:
    audio = r.record(source)
    try:
        text = r.recognize_google(audio)
        print(text)
    except sr.UnknownValueError as e:
        print("Could not understand output")

for index, name in enumerate(sr.Microphone.list_microphone_names()):
    print("Microphone with name \"{1}\" found for `Microphone(device_index={0})`".format(index, name))


'''
mic = sr.Microphone(device_index=1)
with mic as source:
    audio = r.listen(source)
    print(r.recognize_google(audio))
'''
