from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

@app.route('/classify', methods=['POST'])
def classify_text():
    text = request.json['text']
    result = classifier(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
