import operator
from rake_nltk import Rake
from rake_nltk import Metric
import diffbot

f = open('finalList.txt', 'r', encoding='utf-8')
words = f.read()
f.close()

stop = words.split('\n')

r = Rake(ranking_metric=Metric.WORD_FREQUENCY)

url = 'https://www.cnn.com/2020/08/21/politics/peter-rafael-dzibinski-debbins-green-beret-russia/index.html'
urlNoNames = 'https://www.britannica.com/science/influenza'
json_result = diffbot.article(urlNoNames, token='d656578220cbf622d16575aba331d47d')

words = (json_result['objects'][0]['text'])
r.extract_keywords_from_text(words)

result = r.get_ranked_phrases_with_scores()

print(result)


