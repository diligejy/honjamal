import { describe, it, expect, vi, beforeEach } from 'vitest';
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
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    
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
    // 내용이 비어있지 않은지만 확인 (실제 데이터가 사용되므로)
    expect(document.getElementById('quote-text').textContent.length).toBeGreaterThan(0);
  });
});
