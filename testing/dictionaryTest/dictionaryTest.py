import requests
import json

word = 'app'
url = "https://wordsapiv1.p.rapidapi.com/words/" + word + "/definitions"

headers = {
    'x-rapidapi-host': "wordsapiv1.p.rapidapi.com",
    'x-rapidapi-key': "26c6528ad6mshea36b2df94b4ab9p1a8fe5jsn750c57e0ead4"
    }

response = requests.request("GET", url, headers=headers)
print(response.status_code)
final = json.loads(response.text)
print(final)

print(final['definitions'][0]['definition'])