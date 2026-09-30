const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { join } = require('node:path');
const app = {};
runInNewContext(readFileSync(join(__dirname, 'app.js'), 'utf8'), app);

test('Nur echte zukünftige lokale Termine sind gültig', () => {
  const now = new Date('2026-09-30T18:00:00');
  assert.equal(app.isFutureSlot('2026-09-30', '19:00', now), true);
  assert.equal(app.isFutureSlot('2026-09-30', '18:00', now), false);
  assert.equal(app.isFutureSlot('2026-09-29', '19:00', now), false);
  assert.equal(app.isFutureSlot('2026-09-31', '19:00', now), false);
  assert.equal(app.isFutureSlot('2027-02-29', '19:00', now), false);
  assert.equal(app.isFutureSlot('2028-02-29', '19:00', now), true);
  assert.equal(app.isFutureSlot('2026-10-01', '24:00', now), false);
  assert.equal(app.isFutureSlot('', '19:00', now), false);
  assert.equal(app.isFutureSlot('2026-10-01', '', now), false);
});

test('Die Antwort enthält genau Nancys gewählten Termin und Essen', () => {
  assert.equal(app.answerText('2026-10-02', '18:30', 'Sushi'),
    'Hey Jens, ja – wir haben ein Date! ♥\nFreitag, 2. Oktober 2026 · 18:30 Uhr\nSushi · Nancy & Jens\nIch freu mich auf dich!');
});
