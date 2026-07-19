/**
 * FAQ Chatbot - Knowledge Base
 * CodeAlpha AI Internship - Task 2
 * 
 * 31 FAQs about AI, ML, NLP, Deep Learning, CV, Tools, and CodeAlpha
 */

const FAQ_DATA = [
    // AI Basics
    {
        category: "AI Basics",
        q: "What is artificial intelligence?",
        a: "Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems. These processes include learning (acquiring information and rules), reasoning (using rules to reach conclusions), and self-correction. AI powers technologies like chatbots, recommendation systems, and image recognition.",
        keywords: ["artificial intelligence", "ai", "definition", "what is"]
    },
    {
        category: "AI Basics",
        q: "What is machine learning?",
        a: "Machine Learning (ML) is a subset of AI that enables systems to learn from data and improve performance without being explicitly programmed. Instead of following hard-coded rules, ML algorithms identify patterns in data and make decisions with minimal human intervention.",
        keywords: ["machine learning", "ml", "learn", "data", "algorithm"]
    },
    {
        category: "AI Basics",
        q: "What is deep learning?",
        a: "Deep Learning is a subset of machine learning that uses artificial neural networks with multiple layers (hence 'deep'). It automatically learns complex features from raw data and excels at tasks like image classification, speech recognition, and natural language processing.",
        keywords: ["deep learning", "neural", "layers", "features"]
    },
    {
        category: "AI Basics",
        q: "What is a neural network?",
        a: "A neural network is a computational model inspired by the biological neurons in the human brain. It consists of interconnected nodes (neurons) organized in layers — input, hidden, and output. Data passes through these layers, and the network adjusts its weights during training to improve predictions.",
        keywords: ["neural network", "neurons", "layers", "brain", "nodes"]
    },
    {
        category: "AI Basics",
        q: "What is the difference between AI and machine learning?",
        a: "AI is the broad concept of machines simulating human intelligence. Machine Learning is a specific technique to achieve AI — it enables machines to learn from data. All ML is AI, but not all AI uses ML. For example, rule-based systems are AI but not ML.",
        keywords: ["difference", "ai vs ml", "artificial intelligence vs machine learning"]
    },

    // NLP & Text Processing
    {
        category: "NLP",
        q: "What is natural language processing?",
        a: "Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and generate human language. It involves tasks like tokenization, sentiment analysis, named entity recognition, translation, and building chatbots.",
        keywords: ["nlp", "natural language", "text", "language processing"]
    },
    {
        category: "NLP",
        q: "What is tokenization in NLP?",
        a: "Tokenization is the process of splitting text into smaller units called tokens, which can be words, subwords, or characters. It is a fundamental preprocessing step in NLP pipelines before text can be analyzed or fed into a model.",
        keywords: ["tokenization", "tokens", "split", "preprocess", "text"]
    },
    {
        category: "NLP",
        q: "What is cosine similarity?",
        a: "Cosine similarity measures the similarity between two vectors by calculating the cosine of the angle between them. A value of 1 means identical direction (very similar), 0 means perpendicular (unrelated). In NLP, it is used to compare text documents, find similar questions, or match user queries to FAQ answers.",
        keywords: ["cosine similarity", "similarity", "vectors", "match", "compare"]
    },
    {
        category: "NLP",
        q: "What is TF-IDF?",
        a: "TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical statistic used in NLP to reflect how important a word is to a document in a collection. TF measures how often a word appears; IDF penalizes words that appear in many documents. It is used in search engines and text matching.",
        keywords: ["tfidf", "tf-idf", "term frequency", "text matching", "search"]
    },
    {
        category: "NLP",
        q: "What is sentiment analysis?",
        a: "Sentiment analysis (or opinion mining) is an NLP technique used to identify and extract subjective information from text — primarily whether the sentiment is positive, negative, or neutral. It is widely used for analyzing customer reviews and social media posts.",
        keywords: ["sentiment", "opinion", "positive", "negative", "emotion", "review"]
    },

    // Deep Learning
    {
        category: "Deep Learning",
        q: "What is an LSTM?",
        a: "LSTM (Long Short-Term Memory) is a special type of Recurrent Neural Network (RNN) designed to learn long-term dependencies in sequential data. It uses memory cells and gates (input, forget, output) to control the flow of information, making it ideal for tasks like text generation, music generation, and time-series forecasting.",
        keywords: ["lstm", "long short term memory", "rnn", "sequence", "memory"]
    },
    {
        category: "Deep Learning",
        q: "What is a GAN?",
        a: "A GAN (Generative Adversarial Network) consists of two neural networks — a Generator (creates fake data) and a Discriminator (tries to distinguish real from fake). They compete against each other, and through this adversarial training, the generator learns to produce highly realistic synthetic data like images, music, or videos.",
        keywords: ["gan", "generative adversarial", "generator", "discriminator", "synthetic", "generate"]
    },
    {
        category: "Deep Learning",
        q: "What is a convolutional neural network?",
        a: "A CNN (Convolutional Neural Network) is a deep learning architecture designed for processing grid-like data such as images. It uses convolutional layers to automatically detect features like edges, textures, and shapes, making it the standard approach for image classification and object detection.",
        keywords: ["cnn", "convolutional", "image", "vision", "classification"]
    },
    {
        category: "Deep Learning",
        q: "What is a transformer model?",
        a: "A Transformer is a deep learning architecture introduced in the paper 'Attention Is All You Need' (2017). It uses a self-attention mechanism to process entire sequences simultaneously, making it highly efficient. Transformers are the foundation of modern NLP models like BERT, GPT, and T5.",
        keywords: ["transformer", "attention", "bert", "gpt", "sequence"]
    },

    // Computer Vision
    {
        category: "Computer Vision",
        q: "What is computer vision?",
        a: "Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world, such as images and videos. Tasks include image classification, object detection, image segmentation, facial recognition, and optical character recognition (OCR).",
        keywords: ["computer vision", "image", "visual", "recognition", "video"]
    },
    {
        category: "Computer Vision",
        q: "What is object detection?",
        a: "Object detection is a computer vision task where the model identifies and locates specific objects within an image or video frame. Unlike classification, it also provides the location via bounding boxes around each detected object along with a class label and confidence score.",
        keywords: ["object detection", "bounding box", "locate", "detect", "identify"]
    },
    {
        category: "Computer Vision",
        q: "What is YOLO?",
        a: "YOLO (You Only Look Once) is a real-time object detection algorithm known for its remarkable speed and accuracy. Unlike traditional detection methods that scan an image multiple times, YOLO processes the entire image in a single forward pass through the network, making it highly efficient for real-time applications.",
        keywords: ["yolo", "you only look once", "real time", "fast", "detection"]
    },
    {
        category: "Computer Vision",
        q: "What is OpenCV?",
        a: "OpenCV (Open Source Computer Vision Library) is an open-source library containing hundreds of computer vision algorithms. It supports operations like reading webcam input, image manipulation, video processing, object tracking, and integrating with deep learning models. It is widely used with Python.",
        keywords: ["opencv", "open cv", "webcam", "video", "image processing"]
    },

    // Tools & Frameworks
    {
        category: "Tools",
        q: "What is Python used for in AI?",
        a: "Python is the most popular language for AI and machine learning due to its simple syntax and an extensive ecosystem of libraries including TensorFlow, PyTorch, Scikit-learn, Keras, NumPy, Pandas, OpenCV, and NLTK. Most AI research code and tutorials are written in Python.",
        keywords: ["python", "programming", "language", "libraries"]
    },
    {
        category: "Tools",
        q: "What is TensorFlow?",
        a: "TensorFlow is an open-source machine learning framework developed by Google Brain. It provides tools for building and training deep learning models at scale. TensorFlow supports deployment on CPUs, GPUs, and TPUs, and is used in both research and production.",
        keywords: ["tensorflow", "google", "framework", "deep learning", "model"]
    },
    {
        category: "Tools",
        q: "What is PyTorch?",
        a: "PyTorch is an open-source deep learning framework developed by Facebook AI Research (FAIR). It is particularly popular in academic research due to its dynamic computation graph (eager execution), which makes debugging easier and allows for more flexible model architectures.",
        keywords: ["pytorch", "facebook", "torch", "research", "framework"]
    },
    {
        category: "Tools",
        q: "What is Scikit-learn?",
        a: "Scikit-learn is a free machine learning library for Python. It provides simple and efficient tools for data preprocessing, classification, regression, clustering, model selection, and evaluation. It is built on NumPy, SciPy, and matplotlib and is ideal for traditional ML tasks.",
        keywords: ["scikit-learn", "sklearn", "traditional ml", "classification", "clustering"]
    },
    {
        category: "Tools",
        q: "What is NLTK?",
        a: "NLTK (Natural Language Toolkit) is a leading Python platform for working with human language data. It provides tools for tokenization, stemming, lemmatization, parsing, and semantic reasoning, along with access to a large collection of text corpora and lexical resources.",
        keywords: ["nltk", "natural language toolkit", "text", "tokenize", "stem"]
    },

    // ML Concepts
    {
        category: "ML Concepts",
        q: "What is overfitting in machine learning?",
        a: "Overfitting occurs when a model learns the training data too well — including its noise and random fluctuations — and fails to generalize to new, unseen data. It leads to high training accuracy but poor test accuracy. Solutions include dropout, regularization (L1/L2), cross-validation, and using more training data.",
        keywords: ["overfitting", "generalize", "training", "accuracy", "regularization"]
    },
    {
        category: "ML Concepts",
        q: "What is data preprocessing?",
        a: "Data preprocessing is the step of transforming raw data into a clean format suitable for training ML models. It includes handling missing values, removing duplicates, normalization/standardization, encoding categorical variables, and text cleaning (tokenization, stopword removal) for NLP tasks.",
        keywords: ["preprocessing", "clean", "data", "normalize", "prepare"]
    },
    {
        category: "ML Concepts",
        q: "What is supervised learning?",
        a: "Supervised learning is a type of ML where the model is trained on labeled data — each input has a corresponding correct output. The model learns to map inputs to outputs. Common examples include classification (spam detection) and regression (house price prediction).",
        keywords: ["supervised", "labeled", "classification", "regression", "output"]
    },
    {
        category: "ML Concepts",
        q: "What is unsupervised learning?",
        a: "Unsupervised learning is a type of ML where the model is trained on unlabeled data and must find patterns or structures on its own. Common techniques include clustering (K-Means, DBSCAN) and dimensionality reduction (PCA, t-SNE).",
        keywords: ["unsupervised", "unlabeled", "clustering", "patterns", "pca"]
    },
    {
        category: "ML Concepts",
        q: "What is reinforcement learning?",
        a: "Reinforcement Learning (RL) is a type of ML where an agent learns by interacting with an environment. The agent takes actions and receives rewards (positive) or penalties (negative). Over time, it learns a policy that maximizes cumulative reward. It is used in game AI, robotics, and autonomous systems.",
        keywords: ["reinforcement", "reward", "agent", "policy", "environment"]
    },

    // CodeAlpha
    {
        category: "CodeAlpha",
        q: "What is CodeAlpha?",
        a: "CodeAlpha is a leading software development company dedicated to driving innovation across emerging technologies. They offer internship programs in Artificial Intelligence, Web Development, Cybersecurity, and more — providing students with real-world, hands-on experience.",
        keywords: ["codealpha", "company", "organization", "internship provider"]
    },
    {
        category: "CodeAlpha",
        q: "How do I submit my internship tasks?",
        a: "To submit your internship tasks: (1) Upload your complete source code to GitHub in a repository named 'CodeAlpha_ProjectName'. (2) Post a LinkedIn video explaining your project with the GitHub link, tagging @CodeAlpha. (3) Submit using the official form shared in your WhatsApp group. You must complete at least 2–3 tasks to receive a certificate.",
        keywords: ["submit", "submission", "how to", "github", "linkedin", "form"]
    },
    {
        category: "CodeAlpha",
        q: "What certificate will I get from CodeAlpha?",
        a: "Upon successfully completing at least 2–3 tasks, you will receive: an Internship Completion Certificate (QR Verified), a Unique ID Certificate, and possibly a Letter of Recommendation based on your performance. Submitting only 1 task will be considered incomplete and no certificate will be issued.",
        keywords: ["certificate", "completion", "qr", "letter of recommendation", "perks"]
    }
];