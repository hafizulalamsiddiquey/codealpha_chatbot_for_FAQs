/**
 * FAQ Chatbot NLP Engine
 * CodeAlpha AI Internship - Task 2
 */

const STOPWORDS = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could", "should",
    "may", "might", "shall", "can", "need", "dare", "ought", "used",
    "i", "me", "my", "myself", "we", "our", "ours", "you", "your", "yours",
    "he", "his", "she", "her", "it", "its", "they", "them", "their", "theirs",
    "what", "which", "who", "whom", "this", "that", "these", "those",
    "am", "at", "by", "for", "with", "about", "against", "between", "into",
    "through", "during", "before", "after", "above", "below", "to", "from",
    "up", "down", "in", "out", "on", "off", "over", "under", "then", "once",
    "and", "but", "or", "nor", "so", "yet", "both", "either", "neither",
    "not", "no", "how", "when", "where", "why", "of", "s", "t", "don"
]);

// normalize text before tokenizing
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// simple stemming - remove common endings
function simpleStem(term) {
    if (term.length <= 4) return term;
    return term.replace(/(ing|ed|ly|es|s)$/, '').replace(/(ie|ei)$/, 'y');
}

// tokenize text into words
function tokenize(text) {
    return normalizeText(text)
        .split(' ')
        .map(simpleStem)
        .filter(word => word.length > 1 && !STOPWORDS.has(word));
}

// build vocabulary from documents
function buildVocabulary(documents) {
    const vocab = new Set();
    documents.forEach(doc => tokenize(doc).forEach(term => vocab.add(term)));
    return Array.from(vocab);
}

// count document frequencies
function buildDocFrequencies(documents) {
    const df = {};
    documents.forEach(doc => {
        const uniqueTokens = new Set(tokenize(doc));
        uniqueTokens.forEach(term => {
            df[term] = (df[term] || 0) + 1;
        });
    });
    return df;
}

// compute IDF for a term
function inverseDocumentFrequency(term, df, totalDocs) {
    const docCount = df[term] || 0;
    return Math.log((totalDocs + 1) / (docCount + 1)) + 1;
}

// compute TF-IDF vector for tokens
function computeTFIDFVector(tokens, vocab, df, totalDocs) {
    const termCounts = {};
    tokens.forEach(term => {
        if (!termCounts[term]) termCounts[term] = 0;
        termCounts[term] += 1;
    });

    const vector = {};
    vocab.forEach(term => {
        const count = termCounts[term] || 0;
        if (count > 0) {
            const tf = 1 + Math.log(count);
            vector[term] = tf * inverseDocumentFrequency(term, df, totalDocs);
        } else {
            vector[term] = 0;
        }
    });
    return vector;
}

// precompute all FAQ vectors at startup
const FAQ_QUESTIONS = FAQ_DATA.map(f => f.q);
const TOTAL_DOCS = FAQ_QUESTIONS.length;
const DOC_FREQUENCIES = buildDocFrequencies(FAQ_QUESTIONS);
const VOCAB = buildVocabulary(FAQ_QUESTIONS);
const FAQ_VECTORS = FAQ_DATA.map(faq => computeTFIDFVector(tokenize(faq.q), VOCAB, DOC_FREQUENCIES, TOTAL_DOCS));

// term frequency
function termFrequency(tokens, vocab) {
    const tf = {};
    vocab.forEach(w => tf[w] = 0);
    tokens.forEach(t => { if (tf[t] !== undefined) tf[t]++; });
    return tf;
}

// cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
    const keys = Object.keys(vecA);
    let dot = 0,
        magA = 0,
        magB = 0;
    keys.forEach(k => {
        const a = vecA[k] || 0;
        const b = vecB[k] || 0;
        dot += a * b;
        magA += a * a;
        magB += b * b;
    });
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// boost score if keywords match
function keywordBoost(query, faq) {
    const qLower = query.toLowerCase();
    if (!faq.keywords) return 0;
    const matches = faq.keywords.filter(kw => qLower.includes(kw));
    return matches.length * 0.15;
}

// find best matching FAQ for query
function findBestMatch(userQuery) {
    const queryTokens = tokenize(userQuery);
    const queryVec = computeTFIDFVector(queryTokens, VOCAB, DOC_FREQUENCIES, TOTAL_DOCS);

    let bestFAQ = null;
    let bestScore = 0;

    FAQ_VECTORS.forEach((faqVec, index) => {
        const faq = FAQ_DATA[index];
        let score = cosineSimilarity(queryVec, faqVec);
        score += keywordBoost(userQuery, faq);

        if (score > bestScore) {
            bestScore = score;
            bestFAQ = faq;
        }
    });

    return { faq: bestFAQ, score: Math.min(bestScore, 1.0) };
}

// determine confidence level
function confidenceLabel(score) {
    if (score >= 0.55) return { label: "High", cls: "conf-high" };
    if (score >= 0.25) return { label: "Medium", cls: "conf-medium" };
    return { label: "Low", cls: "conf-low" };
}

// get random FAQ suggestions
function getRandomSuggestions(count = 4) {
    const shuffled = [...FAQ_DATA].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(f => f.q);
}

// get suggestions from same category
function getSuggestionsForCategory(category, count = 3) {
    return FAQ_DATA
        .filter(f => f.category === category)
        .slice(0, count)
        .map(f => f.q);
}

// ============================================
// CHAT UI LOGIC
// ============================================

const chatContainer = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// scroll to bottom of chat
function scrollToBottom() {
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 60);
}

// create message element
function createMessage(role, content) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = role === 'bot' ? '🤖' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = content;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
}

// show typing indicator
function showTyping() {
    const el = document.createElement('div');
    el.className = 'message bot';
    el.id = 'typingIndicator';
    el.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
    chatContainer.appendChild(el);
    scrollToBottom();
}

// hide typing indicator
function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

// build suggestion chips
function buildSuggestions(questions) {
    if (!questions || questions.length === 0) return '';
    const chips = questions
        .map(q => `<button class="chip" onclick="askFromChip('${q.replace(/'/g, "\\'")}')">${q}</button>`)
        .join('');
    return `<div class="chips-row">${chips}</div>`;
}

// ask from chip button
function askFromChip(question) {
    userInput.value = question;
    handleSend();
}

// build bot response HTML
function buildBotResponse(faq, score) {
    const conf = confidenceLabel(score);
    return `
    <p>${faq.a}</p>
    <div class="response-meta">
      <span class="category-tag">${faq.category}</span>
      <span class="confidence ${conf.cls}">
        <span class="conf-dot"></span>
        Match: ${(score * 100).toFixed(0)}% - ${conf.label}
      </span>
    </div>
  `;
}

// handle send button
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;
    userInput.value = '';

    createMessage('user', `<p>${escapeHtml(text)}</p>`);

    showTyping();

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
        hideTyping();

        const { faq, score } = findBestMatch(text);

        if (!faq || score < 0.08) {
            const suggestions = getRandomSuggestions(4);
            const content = `
        <p>I didn't understand that. Try one of these:</p>
        ${buildSuggestions(suggestions)}
      `;
            createMessage('bot', content);
        } else {
            const content = buildBotResponse(faq, score);
            const related = getSuggestionsForCategory(faq.category, 3).filter(q => q !== faq.q);
            const relatedHtml = related.length > 0 ?
                `<div class="related-label">Related:</div>${buildSuggestions(related)}` :
                '';
            createMessage('bot', content + relatedHtml);
        }
    }, delay);
}

// escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// event listeners
sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// welcome message
window.addEventListener('DOMContentLoaded', () => {
    const suggestions = [
        "What is artificial intelligence?",
        "What is machine learning?",
        "What is NLP?",
        "How do I submit my internship tasks?"
    ];
    const welcomeHtml = `
    <p>Hi there! I'm the CodeAlpha FAQ Assistant.<br>
    Ask me anything about AI, ML, or the CodeAlpha internship.</p>
    <p style="margin-top:8px; color: var(--text-secondary); font-size:0.85rem;">Try one of these:</p>
    ${buildSuggestions(suggestions)}
  `;
    createMessage('bot', welcomeHtml);
});