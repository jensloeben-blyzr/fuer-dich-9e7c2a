function localDate(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function isFutureSlot(date, time, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return false;
  const slot = new Date(`${date}T${time}:00`);
  return Number.isFinite(slot.getTime()) && localDate(slot) === date &&
    slot.getHours() === Number(time.slice(0, 2)) && slot.getMinutes() === Number(time.slice(3)) && slot > now;
}

function planText(date, time, food) {
  const day = new Date(`${date}T12:00:00`).toLocaleDateString('de-DE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  return `${day} · ${time} Uhr\n${food} · Nancy & Jens`;
}

function answerText(date, time, food) {
  return `Hey Jens, ja – wir haben ein Date! ♥\n${planText(date, time, food)}\nIch freu mich auf dich!`;
}

function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 24; i++) {
    const heart = document.createElement('span');
    heart.className = 'confetti';
    heart.textContent = '♥';
    heart.setAttribute('aria-hidden', 'true');
    heart.style.cssText = `left:${Math.random() * 100}%;font-size:${10 + Math.random() * 17}px;animation-delay:${Math.random() * .6}s;`;
    document.body.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

function initInvitation() {
  const $ = selector => document.querySelector(selector);
  const date = $('#date');
  const time = $('#time');
  const food = () => $('input[name="food"]:checked')?.value;
  date.min = localDate();

  function show(step) {
    document.querySelectorAll('[data-step]').forEach(section => {
      section.hidden = section.dataset.step !== String(step);
    });
    const progress = Math.min(Number(step) || 1, 6);
    $('#counter').textContent = `${progress} / 6`;
    $('.progress').style.width = `${progress / 6 * 100}%`;
    $('.track').setAttribute('aria-valuenow', progress);
    $(`#title-${step}`).focus({ preventScroll: true });
    if (step === 5) $('#pickup').textContent = `Sei um ${time.value} Uhr ready. Ich hol dich ab.`;
    if (step === 6 || step === 7) {
      const plan = planText(date.value, time.value, food());
      $('#receipt-plan').textContent = plan;
      $('#final-plan').textContent = plan;
      $('#whatsapp').href = `https://wa.me/?text=${encodeURIComponent(answerText(date.value, time.value, food()))}`;
    }
    if (step === 2 || step === 7) celebrate();
  }

  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => show(Number(button.dataset.next)));
  });
  $('#date-form').addEventListener('submit', event => {
    event.preventDefault();
    const valid = isFutureSlot(date.value, time.value);
    $('#date-error').hidden = valid;
    if (valid) show(4);
    else date.focus();
  });
  document.querySelectorAll('input[name="food"]').forEach(input => {
    input.addEventListener('change', () => { $('#food-next').disabled = false; });
  });
  $('#confirm').addEventListener('click', () => {
    if (!isFutureSlot(date.value, time.value)) {
      show(3);
      $('#date-error').hidden = false;
      return;
    }
    $('#copy-status').textContent = '';
    $('#manual-copy').hidden = true;
    show(7);
  });
  setupShyButton($('#no'), $('#shy'), show);
  $('#copy').addEventListener('click', async () => {
    const text = answerText(date.value, time.value, food());
    try {
      await navigator.clipboard.writeText(text);
      $('#copy-status').textContent = 'Kopiert. Jetzt einfach an Jens schicken.';
    } catch {
      const fallback = $('#manual-copy');
      fallback.value = text;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      $('#copy-status').textContent = 'Bitte den markierten Text kopieren und an Jens schicken.';
    }
  });
}

function setupShyButton(button, hint, show) {
  let dodges = 0;
  function dodge() {
    if (dodges >= 3 || matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const area = button.parentElement;
    const positions = [[.78, 0], [.05, 1], [.70, .90]];
    const [x, y] = positions[dodges++];
    button.style.right = 'auto';
    button.style.left = `${Math.max(0, area.clientWidth - button.offsetWidth) * x}px`;
    button.style.top = `${Math.max(0, area.clientHeight - button.offsetHeight) * y}px`;
    hint.textContent = dodges === 3 ? 'Okay, okay. Ein Nein ist natürlich auch erlaubt.' : 'Huch … da ist er schon wieder weg.';
    return true;
  }
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') dodge();
  });
  button.addEventListener('click', event => {
    if (event.detail && !matchMedia('(hover: hover)').matches && dodge()) return;
    show('declined');
  });
}

if (typeof document !== 'undefined') initInvitation();
