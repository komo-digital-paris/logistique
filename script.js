// ===== All Pages dropdown =====
(function () {
  const btn = document.getElementById('allPagesBtn');
  const menu = document.getElementById('allPagesMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      btn.classList.remove('open');
      menu.classList.remove('open');
    }
  });
})();

// ===== Industries tab switcher =====
(function () {
  const items = document.querySelectorAll('.ind-item');
  const panels = document.querySelectorAll('.tab-panel');
  if (!items.length) return;
  const switchTo = (idx) => {
    items.forEach(x => x.classList.toggle('active', x.dataset.tab === idx));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === idx));
  };
  items.forEach(t => {
    t.addEventListener('mouseenter', () => switchTo(t.dataset.tab));
    t.addEventListener('click', () => switchTo(t.dataset.tab));
  });
})();

// ===== Testimonials slider =====
(function () {
  const track = document.getElementById('tstTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testi-card');
  const prev = document.getElementById('tstPrev');
  const next = document.getElementById('tstNext');
  let index = 0;

  const visibleCount = () => window.innerWidth < 960 ? 1 : 2;

  function update() {
    const vc = visibleCount();
    const maxIndex = Math.max(0, cards.length - vc);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
    const card = cards[0];
    if (!card) return;
    const gap = 24;
    const cardW = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * cardW}px)`;
  }

  prev.addEventListener('click', () => { index--; update(); });
  next.addEventListener('click', () => {
    const vc = visibleCount();
    const maxIndex = Math.max(0, cards.length - vc);
    index = index + 1 > maxIndex ? 0 : index + 1;
    update();
  });

  window.addEventListener('resize', update);
  update();

  let auto = setInterval(() => next.click(), 7000);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => { auto = setInterval(() => next.click(), 7000); });
})();

// ===== Pause buttons for bg videos =====
(function () {
  document.querySelectorAll('.pause-btn').forEach(btn => {
    const wrapper = btn.closest('section')?.querySelector('.bg-wrapper');
    const video = wrapper?.querySelector('video');
    if (!video) return;
    btn.addEventListener('click', () => {
      if (video.paused) { video.play(); btn.classList.remove('playing'); }
      else { video.pause(); btn.classList.add('playing'); }
    });
  });
})();
