import diffbot

json_result = diffbot.article('http://www.topsprogram.ca/reading-like-writers/', token='d656578220cbf622d16575aba331d47d')

print(json_result['objects'])
print(json_result['objects'][0]['text'])


