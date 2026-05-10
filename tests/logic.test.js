import { describe, it, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('honjamal 로직 검증 (TDD)', () => {
  let dom, window, document;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    window = dom.window;
    document = window.document;
    
    // Mock quotes data
    window.quotes = [{ text: "테스트 문구", book: "테스트 책", author: "테스트 저자" }];
    
    // script.js의 showQuote 함수를 직접 주입 (또는 로드)
    const scriptContent = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf-8');
    const scriptEl = document.createElement("script");
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  it('showQuote 함수를 호출하면 quote-card의 hidden 클래스가 제거되어야 한다', () => {
    const card = document.getElementById('quote-card');
    expect(card.classList.contains('hidden')).toBe(true);
    
    window.showQuote();
    
    expect(card.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('quote-text').textContent).toBe("테스트 문구");
  });
});
