from flask import Flask, request, jsonify
from transformers import pipeline, Conversation
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/chat/*": {"origins": "*"}})

# Load the emotion classifier model
classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

# Load the chatbot model
chatbot = pipeline(
    task="conversational",
    model="facebook/blenderbot-400M-distill"
)
conversation = Conversation()

@app.route('/chat', methods=['POST'])
def chat():
    # Get input text from request
    input_text = request.json['input_text']

    # Predict the emotion of the input text
    emotion_predictions = classifier(input_text)

    # Add the input text to the conversation
    conversation.add_user_input(input_text)

    # Generate a response from the chatbot
    chatbot_response = chatbot(conversation)

    # Get the chatbot's response from the conversation
    chatbot_output = chatbot_response.generated_responses[-1]
    print(type(chatbot_output))

    # Add the chatbot's response to the conversation
    conversation.append_response(chatbot_output)

    # Construct and return the JSON response
    response = {
        "emotion_predictions": emotion_predictions,
        "response": chatbot_output,
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
