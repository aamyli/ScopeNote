from flask import Flask, jsonify
import flask
import requests
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse
from services import get_keylist
import json

app = Flask(__name__)
app.debug = True
api = Api(app)
cors = CORS(app)
# Flask.
# @app.route("/")
# def hello():
#     return "Hello, World!"

state = {
    "vocab":{
        "store": [
            { "id": 1, "word": "hello", "definition": "this is the definition", "note": "extra notes"},
            { "id": 2, "word": "word2", "definition": "this is the definition!", "note": "xx"}
        ],
        "row": {
            "word": "Add Word",
            "definition": "Add Definition",
            "note": "Add Notes"
        }
    },
    "summary": {
        "store": [
            { "id": 1, "point": "p1"},
            { "id": 2, "point": "p2"}
        ],
        "row": {
            "point": "Add point here"
        }
    }
}

parser = reqparse.RequestParser()
parser.add_argument('store')

class Link(Resource):
    def get(self, url):
        return get_keylist(url)

class VocabList(Resource):
    def get(self):
        return jsonify(state['vocab'])
    def put(self):
        # args = parser.parse_args()
        # print(args['store'])
        # print(type(json.dumps(args['store'])))
        # state['vocab']['store'] = eval(args['store'])
        json_data = flask.request.json
        a_value = json_data['store']
        state['vocab']['store'] = a_value
        print('vocab updated')

class SummaryList(Resource):
    def get(self):
        return jsonify(state['summary'])
    def put(self):
        json_data = flask.request.json
        a_value = json_data['store']
        state['summary']['store'] = a_value
        print('summary updated')

# @app.route("/")
# @cross_origin()
# def dummy():
#
#     return "Hello"
#
# # normal link
# @app.route("/link/<path:url>")
# @cross_origin()
# def link(url):
#     print('aloha')
#     return get_keylist(url)

api.add_resource(Link, '/link/<path:url>')
api.add_resource(VocabList, '/vocab')
api.add_resource(SummaryList, '/summary')

# @app.route('/vocab')
# @cross_origin()
# def give_vocab():
#     return
# pdf
# @app.route('/pdf/<url>')
