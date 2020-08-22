from string import digits
from string import punctuation

file = open("words.txt", "r", encoding='utf-8')
words = file.read()

remove_digits = str.maketrans('','',digits)
new = words.translate(remove_digits)
final = new.translate(str.maketrans('','', punctuation))

final_file = open("finalList.txt","w", encoding = 'utf-8')
final_file.write(final)