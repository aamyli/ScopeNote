import fitz
import sys
import urllib3
import requests

url = r'https://arxiv.org/pdf/1508.06576.pdf'
r = requests.get(url, stream=True)
with open('file.pdf', 'wb') as fd:
    for chunk in r.iter_content(5000):
        fd.write(chunk)

doc = fitz.open('demo.pdf')
pages = len(doc)

fout = open('demo_out.txt', 'w', encoding='utf-8')

for page in doc:
    text = page.getText()
    print(text)
    fout.write(text)

fout.close()