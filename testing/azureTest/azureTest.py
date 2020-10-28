import requests
from pprint import pprint
import diffbot
import os

subscription_key = ""
endpoint = ""

keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"

url = 'https://www.cnn.com/2020/08/21/politics/peter-rafael-dzibinski-debbins-green-beret-russia/index.html'
urlNoNames = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
json_result = diffbot.article(url, token='d656578220cbf622d16575aba331d47d')

documents = {"documents": [
    {"id": "1", "language": "en",
        "text": "I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable."},
    {"id": "2", "language": "es",
        "text": "Si usted quiere comunicarse con Carlos, usted debe de llamarlo a su telefono movil. Carlos es muy responsable, pero necesita recibir una notificacion si hay algun problema."},
    {"id": "3", "language": "en",
        "text": "The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I've ever seen."}
]}

words = (json_result['objects'][0]['text'])

documents = {"documents": [
    {"id": "1", "language": "en",
        "text": words},
    {"id": "2", "language": "es",
        "text": "Si usted quiere comunicarse con Carlos, usted debe de llamarlo a su telefono movil. Carlos es muy responsable, pero necesita recibir una notificacion si hay algun problema."},
    {"id": "3", "language": "en",
        "text": "The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I've ever seen."}
]}

print(words)

headers = {"Ocp-Apim-Subscription-Key": subscription_key}
response = requests.post(keyphrase_url, headers=headers, json=documents)
key_phrases = response.json()
pprint(key_phrases)

