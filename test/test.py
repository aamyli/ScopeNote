import diffbot

json_result = diffbot.article('https://www.britannica.com/story/why-is-the-mona-lisa-so-famous', token='d656578220cbf622d16575aba331d47d')
print(json_result['objects'][0]['text'])

