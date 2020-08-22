import diffbot

url = 'https://globalnews.ca/news/7291374/after-cerb-exhausted-ei-benefits/'
json_result = diffbot.article(url, token='d656578220cbf622d16575aba331d47d')

print(json_result['objects'][0]['text'])


