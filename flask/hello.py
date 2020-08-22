from flask import Flask
import requests
from pprint import pprint
import diffbot
from nltk import tokenize
import unicodedata
from flask_cors import CORS, cross_origin
from services import get_keywords

app = Flask(__name__)
cors = CORS(app)
# Flask.
# @app.route("/")
# def hello():
#     return "Hello, World!"

@app.route("/")
@cross_origin
def dummy():

    return "Hello"

# normal link
@app.route("/vocab", methods=["GET"])
@cross_origin()
def link(url):
    get_keywords(url)

    return 'hello'

# pdf
# @app.route('/pdf/<url>')
