import requests
from pprint import pprint
import diffbot
from nltk import tokenize
import unicodedata

def wordCount(dictionary, arr):
    for elem in arr:
        str = elem.lower()
        if str in dictionary:
            dictionary[str] += 1
        else:
            dictionary[str] = 1

def clean(text):
    text = text.replace('\\n', "")
    text = unicodedata.normalize('NFKD', text)

    return text

def chunk(text):

    # tokenize into sentences
    s = tokenize.sent_tokenize(text)

    # limits
    item_limit = 1000
    doc_limit = 5000

    # holder variables
    phrases = []
    cur = ""

    # combine into phrases
    for sent in s:
        if len(cur) + len(sent) <= item_limit:
            cur = cur + " " + sent
        else:
            phrases.append([cur, len(cur)])
            cur = sent
    if cur != "":
        phrases.append([cur, len(cur)])

    # combine into documents
    documents = []
    cur = []
    curL = 0
    for phr in phrases:
        # print(phr[1]) # debug
        if curL + phr[1] < doc_limit:
            curL += phr[1]
            cur.append(phr[0])
        else:
            documents.append(cur)
            cur = []
            curL = 0
    if len(cur) > 0:
        documents.append(cur)

    # print(documents) # debug

    # make documents into json
    final_result = []
    doc = []
    cnt = 1
    for d in documents:
        for p in d:
            doc.append({
                "id": cnt,
                "language": "en",
                "text": p
            })
            cnt += 1
        final_result.append({"documents": doc})
        doc = []
        cnt = 1

    return final_result

def get_keywords(url, dict):
    subscription_key = "80ebba8cc9bf43fab4ef65f8891e8737"
    endpoint = "https://justin.cognitiveservices.azure.com/"
    keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}

    # if url
    json_result = diffbot.article(url, token='d656578220cbf622d16575aba331d47d')
    text = json_result['objects'][0]['text']
    documents = chunk(clean(text))

    key_phrases = []
    count = 1
    for batch in documents:
        print(count)
        count += 1

        # empty lists should not be used
        if not batch['documents']:
            break

        response = requests.post(keyphrase_url, headers=headers, json=batch)

        doc_list = response.json()['documents']
        for doc in doc_list:
            key_phrases += (doc['keyPhrases'])
            for str in doc['keyPhrases']:
                arr = str.split(' ')
                wordCount(dict, arr)

<<<<<<< HEAD
=======
    print(key_phrases)
    #print(dict)

>>>>>>> c92f1494a83da717d5295bf7d4dcb72846f40f3d
    # if pdf --- needs to be implemented

def sortDict(dict):
    sorted_x = sorted(dict.items(), key=lambda kv: kv[1], reverse=True)
    return sorted_x

def bestKeys(list, keys):


url = 'https://plato.stanford.edu/entries/medicine/'
# urlNoNames = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
urlTransfomer = 'https://jalammar.github.io/illustrated-transformer/'
#
# get_keywords('https://www.sciencedirect.com/science/article/pii/S0049384820301407')
get_keywords('https://en.wikipedia.org/wiki/John_Oliver')

