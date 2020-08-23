import json

import fitz
import requests
from pprint import pprint
import diffbot
from nltk import tokenize
import unicodedata
from rake_nltk import Rake
from rake_nltk import Metric


def wordCount(dictionary, arr):
    for elem in arr:
        str = elem.lower()
        if str in dictionary:
            dictionary[str] += 1
        else:
            dictionary[str] = 1


# remove ligatures, new lines
def clean(text):
    text = text.replace('\\n', "")
    text = unicodedata.normalize('NFKD', text)

    return text


# put text into chunks to fit api requirements
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


def sortOrder(dict):
    sorted_x = sorted(dict.items(), key=lambda kv: kv[1], reverse=True)
    return sorted_x


def bestKeys(list, keys, words = 15):

    arr = []
    for i in range (words):
        for x in range (len(keys)):
            if list[i][0] in keys[x][0] and len(keys[x][0].split(' '))<4:
                arr.append(keys[x][0])
                keys.pop(x)
                break
    return arr


def bankKeys(dict, key):

    str = key.lower()
    if str in dict:
        dict[str] += 1
    else:
        dict[str] = 1


# generate key words and return the text that was already found for summary
def gen_keywords(url, dict, bank):

    # set up stuff
    subscription_key = "cdc7974745364f92b1f5e0b9fcd41cef"
    endpoint = "https://jimwu.cognitiveservices.azure.com/"
    keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}

    # if url
    json_result = diffbot.article(url, token='d656578220cbf622d16575aba331d47d')
    text = json_result['objects'][0]['text']
    cleaned_text = clean(text)
    documents = chunk(cleaned_text)

    key_phrases = []
    # go through the different ones
    for batch in documents:

        # catch case where the batch is empty
        if not batch['documents']:
            break

        # make request to Azure API
        response = requests.post(keyphrase_url, headers=headers, json=batch)
        # use response
        doc_list = response.json()['documents']
        for doc in doc_list:
            key_phrases += (doc['keyPhrases'])
            for key in doc['keyPhrases']:
                bankKeys(bank, key)
                arr = key.split(' ')
                wordCount(dict, arr)

    return cleaned_text
    # if pdf --- needs to be implemented

def gen_keywords_pdf(url, dict, bank):
    # set up stuff
    subscription_key = "cdc7974745364f92b1f5e0b9fcd41cef"
    endpoint = "https://jimwu.cognitiveservices.azure.com/"
    keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}

    r = requests.get(url, stream=True)
    with open('file.pdf', 'wb') as fd:
        for c in r.iter_content(5000):
            fd.write(c)

    doc = fitz.open('file.pdf')
    pages = len(doc)
    text = ""
    for page in doc:
        t = page.getText()
        # print(text)
        text += t

    cleaned_text = clean(text)
    documents = chunk(cleaned_text)

    key_phrases = []
    # go through the different ones
    for batch in documents:

        # catch case where the batch is empty
        if not batch['documents']:
            break

        # make request to Azure API
        response = requests.post(keyphrase_url, headers=headers, json=batch)
        # use response
        doc_list = response.json()['documents']
        for doc in doc_list:
            key_phrases += (doc['keyPhrases'])
            for key in doc['keyPhrases']:
                bankKeys(bank, key)
                arr = key.split(' ')
                wordCount(dict, arr)

    return cleaned_text

def get_keywords(url, words = 15):

    # set up variables to use
    dict = {}
    bank = {}
    if url[-4:] == '.pdf':
        text = gen_keywords_pdf(url, dict, bank)
    else:
        text = gen_keywords(url, dict, bank)
    sortedWords = sortOrder(dict)
    sortedBank = sortOrder(bank)
    bestK = bestKeys(sortedWords, sortedBank, words)

    # return best keys and the text for summary
    return bestK, text


# make it so it follow sthe wikipedia normal standard
def wikipedia_string(text):
    return text.replace(' ', '_')


# get definitions of words using rapidapi
def get_definition(word):
    url = "https://wordsapiv1.p.rapidapi.com/words/" + word + "/definitions"
    headers = {
        'x-rapidapi-host': "wordsapiv1.p.rapidapi.com",
        'x-rapidapi-key': "26c6528ad6mshea36b2df94b4ab9p1a8fe5jsn750c57e0ead4"
    }
    response = requests.request("GET", url, headers=headers)
    status = response.status_code
    # success!
    if status == 200:
        final = json.loads(response.text)
        # only take first one
        if not final['definitions']:
            status = 0
        else:
            word_def = final['definitions'][0]['definition']

    if status != 200:
        wps = wikipedia_string(word)
        word_def = 'Word is not found. Try https://en.wikipedia.org/wiki/' + wps + '. Add your own definition!'

    return word_def

def get_summary(text, phrases=7):

    # find common words to exclude
    f = open('finalList.txt', 'r', encoding='utf-8')
    words = f.read()
    f.close()

    stop = words.split('\n')
    r = Rake(ranking_metric=Metric.WORD_FREQUENCY)

    r.extract_keywords_from_text(text)
    result = r.get_ranked_phrases_with_scores()

    count = 0
    summary = []

    while count < phrases and count < len(result):
        summary.append(result[count][1])
        count += 1

    return summary


def get_keylist(url):
    # get keywords
    best_keys, text = get_keywords(url)

    # make summary
    summary = get_summary(text)
    vocab = []

    for k in best_keys:
        word_def = get_definition(k)
        # make word object
        vocab.append({
            'word': k,
            'definition': word_def,
            'note': 'Add notes here to better your understanding!',
        })

    json_objs = {'vocab': vocab, 'summary': summary}

    pprint(json_objs) # debug

    return json_objs