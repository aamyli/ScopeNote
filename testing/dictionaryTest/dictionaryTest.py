import requests

word = 'hello'
url = "https://wordsapiv1.p.rapidapi.com/words/" + word + "/definitions"

headers = {
    'x-rapidapi-host': "wordsapiv1.p.rapidapi.com",
    'x-rapidapi-key': "26c6528ad6mshea36b2df94b4ab9p1a8fe5jsn750c57e0ead4"
    }

response = requests.request("GET", url, headers=headers)

print(response.text)