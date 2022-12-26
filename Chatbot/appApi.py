from flask import Flask,request
from collections import namedtuple
from brain import chat

app = Flask(__name__)

@app.route('/')
def home():
  return '<h1>Welcome to Empath.ai</h1>'

@app.route('/api')
def api():
  user_input = request.get_json()
  response = chat(user_input)
  json = {
    'input':user_input['request'],
    'response':response
  }
  return json

Response = namedtuple('Response','response accuracy')

if __name__ == "__main__":
  app.run()