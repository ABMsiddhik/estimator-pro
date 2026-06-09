
AOS.init({ duration: 700, once: true, offset: 80 });

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function switchTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.screen-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function animateCounter(el, target) {
  let start = 0;
  const isLarge = target >= 10000;
  const duration = 2000;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(ease * target);
    if (isLarge) {
      el.textContent = (val >= 1000000 ? (val/1000000).toFixed(1) + 'M+' : (val/1000).toFixed(0) + 'K+');
    } else if (target <= 2) {
      el.textContent = val + ' min';
    } else if (target >= 90) {
      el.textContent = val + '%';
    } else {
      el.textContent = val + '+';
    }
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter-val[data-target]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, +entry.target.dataset.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => observer.observe(c));

function handleSubmit() {
  const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
  let name = '', phone = '', biz = '';
  inputs.forEach((el, i) => { if(i===0)name=el.value; if(i===1)phone=el.value; if(i===2)biz=el.value; });
  const msg = encodeURIComponent(`Hi EstimatePro! I'd like a free demo.\nName: ${name||'Guest'}\nBusiness: ${biz||'Not specified'}\nPhone: ${phone||'Not provided'}`);
  window.open(`https://wa.me/918012626111?text=${msg}`, '_blank');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
