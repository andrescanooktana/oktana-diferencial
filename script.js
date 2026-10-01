(() => {
'use strict';
const deck = document.querySelector('#deck');
const slides = [...document.querySelectorAll('.slide')];
const prev = document.querySelector('#prev'), next = document.querySelector('#next');
const jump = document.querySelector('#jump'), status = document.querySelector('#status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0, animation = 0, animating = false, scrollFrame = 0;
let lastWheel = -Infinity, lastDirection = 0, sum = 0, wheelMode = null, wheelIdle = 100;
const originalSnap = deck.style.scrollSnapType;
const pad = n => String(n).padStart(2, '0');
// Derive all visible slide numbers from document order to keep them aligned.
slides.forEach((slide, i) => {
 const label = slide.querySelector('.eyebrow');
 const name = label.textContent.replace(/^\d+\s*\/\s*/, '');
 label.textContent = `${pad(i + 1)} / ${name}`;
 slide.querySelector('.slide-bottom span:last-child').textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
 if (jump.options[i]) jump.options[i].textContent = `${pad(i + 1)} · ${name}`;
});
function update(i) {
 current = i; jump.value = String(i); prev.disabled = i === 0; next.disabled = i === slides.length - 1;
 document.querySelector('#progress-fill').style.width = `${(i + 1) / slides.length * 100}%`;
 status.textContent = `Diapositiva ${i + 1} de ${slides.length}: ${slides[i].querySelector('h1,h2').textContent}`;
}
function go(i) {
 i = Math.max(0, Math.min(slides.length - 1, i));
 cancelAnimationFrame(animation);
 const from = deck.scrollTop, target = slides[i].offsetTop;
 update(i);
 if (reduced.matches || Math.abs(from - target) < 1) {
  animating = false;
  deck.scrollTo({top:target, behavior:'instant'});
  deck.style.scrollSnapType = originalSnap;
  return;
 }
 // A new intentional gesture retargets the animation immediately. No timeout
 // discards inputs and there is no delayed queue of extra slide advances.
 animating = true; deck.style.scrollSnapType = 'none';
 const started = performance.now(), duration = 260;
 function step(now) {
  const t = Math.min(1, Math.max(0, (now - started) / duration));
  const ease = 1 - Math.pow(1 - t, 3);
  deck.scrollTo({top:from + (target - from) * ease, behavior:'instant'});
  if(t < 1) animation = requestAnimationFrame(step);
  else { animating = false; deck.style.scrollSnapType = originalSnap; }
 }
 animation = requestAnimationFrame(step);
}
prev.addEventListener('click', () => go(current - 1));
next.addEventListener('click', () => go(current + 1));
jump.addEventListener('change', () => go(Number(jump.value)));
document.addEventListener('keydown', e => {
 if(e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
 if(e.key === ' ' && /^(BUTTON|A)$/.test(e.target.tagName)) return;
 let target;
 if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)) target = current + (e.shiftKey && e.key === ' ' ? -1 : 1);
 if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)) target = current - 1;
 if(e.key === 'Home') target = 0;
 if(e.key === 'End') target = slides.length - 1;
 if(target !== undefined) { e.preventDefault(); if(!e.repeat) go(target); }
});
deck.addEventListener('wheel', e => {
 if(e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || !e.deltaY) return;
 e.preventDefault();
 const now = performance.now();
 const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? deck.clientHeight : 1);
 const direction = Math.sign(delta);
 // Wheel events have no universal gesture-end marker. Recognize short
 // mouse bursts and longer trackpad tails separately, without waiting
 // before responding to the first meaningful event.
 const fresh = now - lastWheel >= wheelIdle || direction !== lastDirection;
 if(fresh) {
  wheelMode = null; sum = 0;
  const notchedWheel = e.deltaMode !== 0 || (Number.isInteger(e.deltaY) && Math.abs(delta) >= 40);
  wheelIdle = notchedWheel ? 100 : 180;
 }
 lastWheel = now; lastDirection = direction;
 if(wheelMode === 'used') return;
 const slide = slides[current], top = slide.offsetTop;
 const bottom = Math.max(top, top + slide.offsetHeight - deck.clientHeight);
 if(wheelMode === null) {
  const canRead = !animating && (delta > 0 ? deck.scrollTop < bottom - 2 : deck.scrollTop > top + 2);
  wheelMode = canRead ? 'reading' : 'navigation';
 }
 if(wheelMode === 'reading') {
  deck.scrollTo({top:Math.max(top, Math.min(bottom, deck.scrollTop + delta)), behavior:'instant'});
  return;
 }
 sum += delta;
 if(Math.abs(sum) >= 8) { wheelMode = 'used'; go(current + direction); sum = 0; }
}, {passive:false});
deck.addEventListener('scroll', () => {
 cancelAnimationFrame(scrollFrame);
 scrollFrame = requestAnimationFrame(() => {
  if(animating) return;
  let nearest = 0, distance = Infinity;
  slides.forEach((s,i) => {
   const end = Math.max(s.offsetTop, s.offsetTop + s.offsetHeight - deck.clientHeight);
   const d = deck.scrollTop >= s.offsetTop && deck.scrollTop <= end ? 0 : Math.min(Math.abs(s.offsetTop - deck.scrollTop), Math.abs(end - deck.scrollTop));
   if(d < distance) {distance = d; nearest = i;}
  });
  if(nearest !== current) update(nearest);
 });
});
const full = document.querySelector('#fullscreen');
if(!document.fullscreenEnabled) full.hidden = true;
full.addEventListener('click', async () => {
 try {if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();}
 catch {status.textContent = 'Pantalla completa no disponible. Usa la opción de pantalla completa de tu navegador.';}
});
document.addEventListener('fullscreenchange', () => full.setAttribute('aria-label', document.fullscreenElement ? 'Salir de pantalla completa' : 'Activar pantalla completa'));
const hash = /^#slide-(\d+)$/.exec(location.hash);
update(0);
if(hash) requestAnimationFrame(() => go(Number(hash[1])-1));
})();
