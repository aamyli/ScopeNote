import fitz
import sys

doc = fitz.open('http://www.ecie.com.ar/images/paginas/COVID-19/4MMWR-Severe_Outcomes_Among_Patients_with_Coronavirus_Disease_2019_COVID-19-United_States_February_12-March_16_2020.pdf')
pages = len(doc)

fout = open('demo_out.txt', 'w', encoding='utf-8')

for page in doc:
    text = page.getText()
    # print(text)
    fout.write(text)

fout.close()