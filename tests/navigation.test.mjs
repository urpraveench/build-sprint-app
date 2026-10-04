import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('skip link moves keyboard focus to main and keeps reduced motion', () => {
  let handler, focused = false, scrolling, pushed;
  const attributes = new Map();
  const target = {hasAttribute: key => attributes.has(key), setAttribute: (key, value) => attributes.set(key, value), focus: options => { focused = options.preventScroll; }, scrollIntoView: options => { scrolling = options.behavior; }};
  const link = {getAttribute: () => '#main', addEventListener: (_, callback) => { handler = callback; }};
  runInNewContext(readFileSync(new URL('../script.js', import.meta.url), 'utf8'), {
    document: {querySelectorAll: () => [link], querySelector: selector => selector === '#main' ? target : null},
    window: {matchMedia: () => ({matches: true})},
    location: {hash: ''}, history: {pushState: (_, __, hash) => { pushed = hash; }},
  });
  handler({preventDefault() {}});
  assert.equal(focused, true);
  assert.equal(attributes.get('tabindex'), '-1');
  assert.equal(scrolling, 'auto');
  assert.equal(pushed, '#main');
});
