from flask import Flask
import requests
from flask_cors import CORS, cross_origin
from services import get_keylist

app = Flask(__name__)
cors = CORS(app)
# Flask.
# @app.route("/")
# def hello():
#     return "Hello, World!"

@app.route("/")
@cross_origin()
def dummy():

    return "Hello"

# normal link
@app.route("/link/<path:url>")
@cross_origin()
def link(url):
    print('aloha')
    get_keylist(url)
    return 'hello'

# pdf
# @app.route('/pdf/<url>')
