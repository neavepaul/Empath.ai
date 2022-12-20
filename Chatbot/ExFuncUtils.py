import requests

import os
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv('API_KEY')


def joke():
    url = "https://dad-jokes.p.rapidapi.com/random/joke"

    headers = {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)
    jsonv = response.json()
    print(jsonv["body"][0]["setup"]+"... "+jsonv["body"][0]["punchline"])
