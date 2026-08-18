// ---- Theme toggle (default: dark) ----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mnavThemeToggle = document.getElementById('mnavThemeToggle');

function getTheme(){
  return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function setTheme(theme){
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) {}
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(!isDark));
}

function toggleTheme(){
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

setTheme(getTheme()); // sync aria-pressed with whatever the inline head script already applied
themeToggle.addEventListener('click', toggleTheme);
mnavThemeToggle.addEventListener('click', toggleTheme);

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile nav ----
const burger = document.getElementById('burger');
const mnav = document.getElementById('mnav');
burger.addEventListener('click', () => {
  const open = mnav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mnav.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// ---- Hero network animation ----
// A quiet drifting node graph, evoking a neural network without being literal.
const canvas = document.getElementById('net');
const ctx = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let nodes = [];
let w, h, dpr;

function resize(){
  const hero = canvas.parentElement;
  w = hero.clientWidth;
  h = hero.clientHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seedNodes();
}

function seedNodes(){
  const count = Math.max(14, Math.round((w * h) / 42000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.4 + 1
  }));
}

const LINK_DIST = 150;
const ACCENT = '52, 84, 209';
const INK = '20, 23, 31';

function step(){
  ctx.clearRect(0, 0, w, h);

  for (const n of nodes){
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i++){
    for (let j = i + 1; j < nodes.length; j++){
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DIST){
        const alpha = (1 - dist / LINK_DIST) * 0.35;
        ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const n of nodes){
    ctx.fillStyle = `rgba(${ACCENT}, 0.75)`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reduceMotion) requestAnimationFrame(step);
}

window.addEventListener('resize', resize);
resize();
step(); // draw at least one static frame even if motion is reduced
