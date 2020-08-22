from string import digits
from string import punctuation

file = open("wordlist.txt", "r", encoding='utf-8')
words = file.read()

remove_digits = str.maketrans('','',digits)
new = words.translate(remove_digits)
final = new.translate(str.maketrans('','', punctuation))

final_file = open("finalList.txt","w", encoding = 'utf-8')
final_file.write(final)

arr = final.split(' ')
reverse = []
maxL = len(arr)
count = 0;
for elem in arr:
    reverse.append(arr[maxL-1-count])
    count+= 1

reverse_list = ' '.join([str(elem) for elem in reverse])

reverse_file = open("reverseList.txt","w", encoding = 'utf-8')
reverse_file.write(reverse_list)