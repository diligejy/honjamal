/**
 * honjamal - script.js
 * 
 * [Technical Decisions]
 * 1. Data Source: quotes.json is the ONLY source of truth.
 * 2. Fetching: Data is loaded asynchronously to allow easy updates via JSON file.
 */
let quotes = [];
let lastIndex = -1;

fetch('quotes.json?v=' + Date.now())
  .then(res => res.json())
  .then(data => {
    quotes = data;
  })
  .catch(err => {
    console.error("Failed to load quotes. Ensure you are running via a server (e.g., Live Server) or deployed on GitHub Pages.", err);
  });

function showQuote() {
  if (quotes.length === 0) return;

  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && index === lastIndex);
  lastIndex = index;

  const q = quotes[index];
  const quoteText = document.getElementById('quote-text');
  const quoteSource = document.getElementById('quote-source');
  
  if (quoteText) quoteText.textContent = q.text;
  if (quoteSource) {
    const parts = [];
    if (q.book) parts.push(q.book);
    if (q.author) parts.push(q.author);
    quoteSource.textContent = parts.join(', ');
  }

  const card = document.getElementById('quote-card');
  if (card) {
    card.classList.remove('hidden');
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (typeof gtag !== 'undefined') {
    gtag('event', 'quote_view', {
      quote_text: q.text.slice(0, 100),
      quote_source: q.book || q.author || 'unknown',
    });
  }
}

