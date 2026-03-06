#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CARDS_DIR = path.join(__dirname, 'cards');
const HTML_FILE = path.join(__dirname, 'index.html');

function parseMd(content) {
  const card = { title: {}, question: {}, answer: {}, why: {}, examples: {}, tags: [] };
  const lines = content.split('\n');
  let section = null;
  let buf = [];

  function flush() {
    if (!section) return;
    const text = buf.join('\n').trim();
    if (!text) return;

    switch (section) {
      case 'title_en': card.title.en = text; break;
      case 'title_mm': card.title.mm = text; break;
      case 'question': card.question.en = text; break;
      case 'question_mm': card.question.mm = text; break;
      case 'answer': card.answer.en = text; break;
      case 'answer_mm': card.answer.mm = text; break;
      case 'why': card.why.en = text; break;
      case 'why_mm': card.why.mm = text; break;
      case 'example':
        card.examples.en = text.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2));
        break;
      case 'example_mm':
        card.examples.mm = text.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2));
        break;
      case 'tags':
        card.tags = text.split(',').map(t => t.trim()).filter(Boolean);
        break;
    }
    buf = [];
  }

  let titleCount = 0;

  for (const line of lines) {
    if (/^# /.test(line) && !/^## /.test(line)) {
      flush();
      titleCount++;
      section = titleCount === 1 ? 'title_en' : 'title_mm';
      buf.push(line.replace(/^# /, ''));
      continue;
    }

    const h2 = line.match(/^## (\w+)$/);
    if (h2) {
      flush();
      const key = h2[1].toLowerCase();
      const map = {
        question: 'question', question_mm: 'question_mm',
        answer: 'answer', answer_mm: 'answer_mm',
        why: 'why', why_mm: 'why_mm',
        example: 'example', example_mm: 'example_mm',
        tags: 'tags'
      };
      section = map[key] || null;
      continue;
    }

    if (section) buf.push(line);
  }
  flush();

  return card;
}

// Read and parse all md files
const files = fs.readdirSync(CARDS_DIR)
  .filter(f => f.endsWith('.md'))
  .sort();

const cards = files.map(f => {
  const content = fs.readFileSync(path.join(CARDS_DIR, f), 'utf-8');
  return parseMd(content);
}).filter(c => c.title.en);

// Inject into index.html between markers
let html = fs.readFileSync(HTML_FILE, 'utf-8');
const startMarker = '<!-- CARDS-DATA-START -->';
const endMarker = '<!-- CARDS-DATA-END -->';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find CARDS-DATA markers in index.html');
  process.exit(1);
}

const injection = `${startMarker}\n  <script>\nconst cardFiles = ${JSON.stringify(cards, null, 2)};\n  </script>\n  ${endMarker}`;
html = html.slice(0, startIdx) + injection + html.slice(endIdx + endMarker.length);

fs.writeFileSync(HTML_FILE, html, 'utf-8');
console.log(`Built ${cards.length} cards → index.html`);
