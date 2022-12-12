from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
from nlpUtils import bag_of_words
import random
import json
import pickle
from ExFuncUtils import joke


with open("intents.json") as file:
    data = json.load(file)

try:
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except:
    print(Exception("Have you tried running the data loader?"))

try:
    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
    net = tflearn.regression(net)
    model = tflearn.DNN(net)

    model.load("model.tflearn")
    print("MODEL LOADED AND READY TO GO")
except:
    print(Exception("Have you tried training the model?"))


def chat():
    print("Start talking with the bot (type quit to stop)!")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break

        results = model.predict([bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)

        if results[results_index] > 0.7:
            tag = labels[results_index]
            
            if tag == "jokes":
                joke()
            else:
                for tg in data["intents"]:
                    if tg['tag'] == tag:
                        responses = tg['responses']

                print(random.choice(responses))
        else:
            print("I'm sorry! I don't quite understand you... I'm still learning.")
chat()