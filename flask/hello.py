from flask import Flask
from flask_cors import CORS
from services import get_keywords

app = Flask(__name__)
cors = CORS(app)
# Flask.
# @app.route("/")
# def hello():
#     return "Hello, World!"

@app.route("/")
def dummy():

    return "Hello"

# normal link
@app.route('/link/<path:url>')
def link(url):
    get_keywords(url)

    return 'hello'

# pdf
# @app.route('/pdf/<url>')
