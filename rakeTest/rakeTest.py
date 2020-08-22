import operator
from rake_nltk import Rake
import diffbot

r = Rake()

url = 'https://www.cnn.com/2020/08/21/politics/peter-rafael-dzibinski-debbins-green-beret-russia/index.html'
urlNoNames = 'https://www.britannica.com/science/influenza'
json_result = diffbot.article(urlNoNames, token='d656578220cbf622d16575aba331d47d')

words = (json_result['objects'][0]['text'])
r.extract_keywords_from_text(words)

print(r.get_ranked_phrases_with_scores())


