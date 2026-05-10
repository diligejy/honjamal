import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

function getCssVariable(cssContent, variableName) {
  const match = cssContent.match(new RegExp(`${variableName}:\\s*([^;]+)`));
  return match ? match[1].trim().toUpperCase() : null;
}

function getContrastRatio(hex1, hex2) {
  const getRGB = (hex) => {
    let r, g, b;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16) / 255;
      g = parseInt(hex[2] + hex[2], 16) / 255;
      b = parseInt(hex[3] + hex[3], 16) / 255;
    } else {
      r = parseInt(hex.slice(1, 3), 16) / 255;
      g = parseInt(hex.slice(3, 5), 16) / 255;
      b = parseInt(hex.slice(5, 7), 16) / 255;
    }
    return [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  };
  const getLuminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const l1 = getLuminance(getRGB(hex1));
  const l2 = getLuminance(getRGB(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

describe('honjamal 디자인 명세 검증 (TDD)', () => {
  let css;
  beforeEach(() => {
    css = fs.readFileSync(path.resolve(process.cwd(), 'style.css'), 'utf-8');
  });

  it('보조 텍스트 컬러(--text-muted)는 배경색 대비 4.5:1 이상의 대비비를 가져야 한다', () => {
    const bg = getCssVariable(css, '--bg') || '#F7F4EF';
    const textMuted = getCssVariable(css, '--text-muted');
    const ratio = getContrastRatio(bg, textMuted);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('문장의 행간(blockquote line-height)은 가독성 최적 범위(1.5~1.7)여야 한다', () => {
    const match = css.match(/blockquote\s*{[\s\S]*?line-height:\s*([\d.]+)/);
    const lineHeight = match ? parseFloat(match[1]) : 0;
    expect(lineHeight).toBeGreaterThanOrEqual(1.5);
    expect(lineHeight).toBeLessThanOrEqual(1.7);
  });

  it('애니메이션 지속 시간은 심리적 안정감을 위해 0.8s 이상이어야 한다', () => {
    const match = css.match(/\.quote-card\s*{[\s\S]*?animation:\s*fadeIn\s*([\d.]+)s/);
    const duration = match ? parseFloat(match[1]) : 0;
    console.log(`[Animation Check] Current Duration: ${duration}s (Target: >= 0.8s)`);
    expect(duration).toBeGreaterThanOrEqual(0.8);
  });

  it('애니메이션에는 부드러운 발견을 위한 흐림(blur) 효과가 포함되어야 한다', () => {
    const hasBlur = css.includes('filter: blur') || css.includes('blur(');
    expect(hasBlur).toBe(true);
  });
});
