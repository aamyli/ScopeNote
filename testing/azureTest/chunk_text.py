from nltk import tokenize
import unicodedata

def clean(text):
    text = text.replace('\\n', "")
    text = unicodedata.normalize('NFKD', text)

    return text

def chunk(text):

    # tokenize into sentences
    s = tokenize.sent_tokenize(text)

    # limits
    item_limit = 1000
    doc_limit = 5000

    # holder variables
    phrases = []
    cur = ""

    # combine into phrases
    for sent in s:
        if len(cur) + len(sent) <= item_limit:
            cur = cur + " " + sent
        else:
            phrases.append([cur, len(cur)])
            cur = sent
    if cur != "":
        phrases.append([cur, len(cur)])

    # combine into documents
    documents = []
    cur = []
    curL = 0
    for phr in phrases:
        # print(phr[1]) # debug
        if curL + phr[1] < doc_limit:
            curL += phr[1]
            cur.append(phr[0])
        else:
            documents.append(cur)
            cur = []
            curL = 0
    if len(cur) > 0:
        documents.append(cur)

    # print(documents) # debug

    # make documents into json
    final_result = []
    doc = []
    cnt = 1
    for d in documents:
        for p in d:
            doc.append({
                "id": cnt,
                "language": "en",
                "text": p
            })
            cnt += 1
        final_result.append({"documents": doc})
        doc = []
        cnt = 1

    return final_result


# phrase = "The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I've ever seen."
phrase = '''Figure 1: Convolutional Neural Network (CNN). A given input image is represented as a set
of ﬁltered images at each processing stage in the CNN. While the number of different ﬁlters
increases along the processing hierarchy, the size of the ﬁltered images is reduced by some
downsampling mechanism (e.g. max-pooling) leading to a decrease in the total number of
units per layer of the network. Content Reconstructions. We can visualise the information
at different processing stages in the CNN by reconstructing the input image from only know-
ing the network’s responses in a particular layer. We reconstruct the input image from from
layers ‘conv1 1’ (a), ‘conv2 1’ (b), ‘conv3 1’ (c), ‘conv4 1’ (d) and ‘conv5 1’ (e) of the orig-
inal VGG-Network. We ﬁnd that reconstruction from lower layers is almost perfect (a,b,c). In
higher layers of the network, detailed pixel information is lost while the high-level content of the
image is preserved (d,e). Style Reconstructions. On top of the original CNN representations
we built a new feature space that captures the style of an input image. The style representation
computes correlations between the different features in different layers of the CNN. We recon-
struct the style of the input image from style representations built on different subsets of CNN
layers ( ‘conv1 1’ (a), ‘conv1 1’ and ‘conv2 1’ (b), ‘conv1 1’, ‘conv2 1’ and ‘conv3 1’ (c),
‘conv1 1’, ‘conv2 1’, ‘conv3 1’ and ‘conv4 1’ (d), ‘conv1 1’, ‘conv2 1’, ‘conv3 1’, ‘conv4 1’
and ‘conv5 1’ (e)). This creates images that match the style of a given image on an increasing
scale while discarding information of the global arrangement of the scene.'''
# print(chunk(phrase))
print(clean("ﬁlter"))
