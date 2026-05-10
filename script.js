let quotes = [];
let lastIndex = -1;

fetch('quotes.json')
  .then(res => res.json())
  .then(data => { quotes = data; });

function showQuote() {
  if (quotes.length === 0) return;

  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && index === lastIndex);
  lastIndex = index;

  const q = quotes[index];
  document.getElementById('quote-text').textContent = q.text;
  document.getElementById('quote-source').textContent = `— ${q.book}, ${q.author}`;

  const card = document.getElementById('quote-card');
  card.classList.remove('hidden');
  card.classList.remove('fadeIn');
  void card.offsetWidth;
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
