import fitz
import sys

doc = fitz.open('2008.09077.pdf')
pages = len(doc)

fout = open('demo_out.txt', 'w', encoding='utf-8')

for page in doc:
    text = page.getText()
    print(text)
    fout.write(text)

fout.close()