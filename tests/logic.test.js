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
    
    // fetch Mocking (테스트 환경에서 API 요청 우회)
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ text: "테스트 문구", book: "테스트 책", author: "신형철" }]),
      })
    );

    const scriptContent = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf-8');
    const scriptEl = document.createElement("script");
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  it('showQuote 호출 시 데이터가 정상적으로 화면에 렌더링되어야 한다', async () => {
    // fetch가 완료될 때까지 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const card = document.getElementById('quote-card');
    window.showQuote();
    
    expect(card.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('quote-source').textContent).toContain("신형철");
  });
});
