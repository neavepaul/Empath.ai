import numpy
import tflearn
import random
import json
import pickle
from ExFuncUtils import joke
from nlpUtils import bag_of_words
from tensorflow.python.framework import ops


with open("intents.json") as file:
    data = json.load(file)

try:
    with open("assets/data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except:
    print("Have you tried running the data loader?")
    exit()

ops.reset_default_graph()
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("assets/model.tflearn")
    print("MODEL LOADED AND READY TO GO")
except:
    print("Have you tried training the model?")
    exit()


def chat(inp):
    print("Start talking with the bot (type quit to stop)!")
    inp = inp['request']
    if inp.lower() == "quit":
        return

    results = model.predict([bag_of_words(inp, words)])[0]
    results_index = numpy.argmax(results)

    if results[results_index] > 0.7:
        label = labels[results_index]
        
        if label == "smalltalk.agent.jokes":
            joke()
        else:
            for tg in data["intents"]:
                if tg['tag'] == label:
                    responses = tg['responses']

            return(random.choice(responses))
    else:
        return(random.choice(data["intents"][0]["responses"]))

