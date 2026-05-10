import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('honjamal 로직 검증 (TDD)', () => {
  let dom, window, document;

  beforeEach(async () => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    window = dom.window;
    document = window.document;
    
    // JSDOM 환경에 fetch API 주입 (핵심 해결책)
    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ text: "테스트 문구", book: "테스트 책", author: "신형철" }]),
      })
    );
    
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    const scriptContent = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf-8');
    const scriptEl = document.createElement("script");
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);

    // fetch가 완료되어 quotes 배열이 채워질 때까지 미세 대기
    await new Promise(resolve => setTimeout(resolve, 50));
  });

  it('fetch 성공 후 showQuote를 호출하면 화면에 신형철 작가가 표시되어야 한다', () => {
    const card = document.getElementById('quote-card');
    window.showQuote();
    
    expect(card.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('quote-source').textContent).toContain("신형철");
  });
});
