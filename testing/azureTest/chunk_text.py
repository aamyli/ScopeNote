from nltk import tokenize

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
        print(phr[1]) # debug
        if curL + phr[1] < doc_limit:
            curL += phr[1]
            cur.append(phr[0])
        else:
            documents.append(cur)
            cur = []
            curL = 0
    if len(cur) > 0:
        documents.append(cur)

    print(documents) # debug

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
        cnt = 1

    return final_result


# phrase = "The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I've ever seen."
phrase = '''
        In ﬁne art, especially painting, humans have mastered the skill to create unique
visual experiences through composing a complex interplay between the con-
tent and style of an image. Thus far the algorithmic basis of this process is
unknown and there exists no artiﬁcial system with similar capabilities. How-
ever, in other key areas of visual perception such as object and face recognition
near-human performance was recently demonstrated by a class of biologically
inspired vision models called Deep Neural Networks.1,2 Here we introduce an
artiﬁcial system based on a Deep Neural Network that creates artistic images
of high perceptual quality. The system uses neural representations to sepa-
rate and recombine content and style of arbitrary images, providing a neural
algorithm for the creation of artistic images. Moreover, in light of the strik-
ing similarities between performance-optimised artiﬁcial neural networks and
biological vision,3–7 our work offers a path forward to an algorithmic under-
standing of how humans create and perceive artistic imagery.
1
arXiv:1508.06576v2  [cs.CV]  2 Sep 2015
The class of Deep Neural Networks that are most powerful in image processing tasks are
called Convolutional Neural Networks. Convolutional Neural Networks consist of layers of
small computational units that process visual information hierarchically in a feed-forward man-
ner (Fig 1). Each layer of units can be understood as a collection of image ﬁlters, each of which
extracts a certain feature from the input image. Thus, the output of a given layer consists of
so-called feature maps: differently ﬁltered versions of the input image.
When Convolutional Neural Networks are trained on object recognition, they develop a
representation of the image that makes object information increasingly explicit along the pro-
cessing hierarchy.8 Therefore, along the processing hierarchy of the network, the input image
is transformed into representations that increasingly care about the actual content of the im-
age compared to its detailed pixel values. We can directly visualise the information each layer
contains about the input image by reconstructing the image only from the feature maps in that
layer9 (Fig 1, content reconstructions, see Methods for details on how to reconstruct the im-
age). Higher layers in the network capture the high-level content in terms of objects and their
arrangement in the input image but do not constrain the exact pixel values of the reconstruc-
tion. (Fig 1, content reconstructions d,e). In contrast, reconstructions from the lower layers
simply reproduce the exact pixel values of the original image (Fig 1, content reconstructions
a,b,c). We therefore refer to the feature responses in higher layers of the network as the content
representation.
To obtain a representation of the style of an input image, we use a feature space originally
designed to capture texture information.8 This feature space is built on top of the ﬁlter responses
in each layer of the network. It consists of the correlations between the different ﬁlter responses
over the spatial extent of the feature maps (see Methods for details). By including the feature
correlations of multiple layers, we obtain a stationary, multi-scale representation of the input
image, which captures its texture information but not the global arrangement.
2
Figure 1: Convolutional Neural Network (CNN). A given input image is represented as a set
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
scale while discarding information of the global arrangement of the scene.
3
Again, we can visualise the information captured by these style feature spaces built on
different layers of the network by constructing an image that matches the style representation
of a given input image (Fig 1, style reconstructions).10,11 Indeed reconstructions from the style
features produce texturised versions of the input image that capture its general appearance in
terms of colour and localised structures. Moreover, the size and complexity of local image
structures from the input image increases along the hierarchy, a result that can be explained
by the increasing receptive ﬁeld sizes and feature complexity. We refer to this multi-scale
representation as style representation.
The key ﬁnding of this paper is that the representations of content and style in the Convo-
lutional Neural Network are separable. That is, we can manipulate both representations inde-
pendently to produce new, perceptually meaningful images. To demonstrate this ﬁnding, we
generate images that mix the content and style representation from two different source images.
In particular, we match the content representation of a photograph depicting the “Neckarfront”
in T¨ubingen, Germany and the style representations of several well-known artworks taken from
different periods of art (Fig 2).
The images are synthesised by ﬁnding an image that simultaneously matches the content
representation of the photograph and the style representation of the respective piece of art (see
Methods for details). While the global arrangement of the original photograph is preserved,
the colours and local structures that compose the global scenery are provided by the artwork.
Effectively, this renders the photograph in the style of the artwork, such that the appearance of
the synthesised image resembles the work of art, even though it shows the same content as the
photograph.
As outlined above, the style representation is a multi-scale representation that includes mul-
tiple layers of the neural network. In the images we have shown in Fig 2, the style representation
included layers from the whole network hierarchy. Style can also be deﬁned more locally by  
        '''
print(chunk(phrase))
# print(chunk(phrase))
