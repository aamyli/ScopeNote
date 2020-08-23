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


def get_keywords(url, dict, bank):
    subscription_key = "cdc7974745364f92b1f5e0b9fcd41cef"
    endpoint = "https://jimwu.cognitiveservices.azure.com/"
    keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"

    # if url
    json_result = diffbot.article(url, token='d656578220cbf622d16575aba331d47d')
    text = json_result['objects'][0]['text']
    documents = chunk(clean(text))

    key_phrases = []
    count = 1
    for batch in documents:
        #print(count)
        count += 1

        headers = {"Ocp-Apim-Subscription-Key": subscription_key}
        if not batch['documents']:
            break
        response = requests.post(keyphrase_url, headers=headers, json=batch)
        doc_list = response.json()['documents']
        for doc in doc_list:
            key_phrases += (doc['keyPhrases'])
            for key in doc['keyPhrases']:
                bankKeys(bank, key)
                arr = key.split(' ')
                wordCount(dict, arr)

    #print(key_phrases)
    #print(dict)

    # if pdf --- needs to be implemented


def get_list(url, words = 15):

    dict = {}
    bank = {}
    get_keywords(url, dict, bank)
    sortedWords = sortOrder(dict)
    sortedBank = sortOrder(bank)
    bestK = bestKeys(sortedWords, sortedBank, words)
    print(bestK)

    return bestK





#url = 'https://plato.stanford.edu/entries/medicine/'
# urlNoNames = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
# urlTransfomer = 'https://jalammar.github.io/illustrated-transformer/'
#
url = 'https://en.wikipedia.org/wiki/John_Oliver'

#get_keywords(url)


