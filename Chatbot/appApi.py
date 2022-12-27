from flask import Flask,request
from collections import namedtuple
from brain import chat
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})



@app.route('/')
def home():
  return '<h1>Welcome to Empath.ai</h1>'

@app.route('/api',methods = ['POST'])
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