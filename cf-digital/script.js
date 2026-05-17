// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== HERO REVEALS (immediate) =====
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
  }, 80);
});

// ===== CARD TILT =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -3;
    const rotY = ((x - cx) / cx) * 3;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SMOOTH ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ===== PARALLAX: rays follow mouse softly =====
document.addEventListener('mousemove', e => {
  const rx = (e.clientX / window.innerWidth - 0.5) * 15;
  const ry = (e.clientY / window.innerHeight - 0.5) * 15;
  const rays = document.querySelector('.hero-rays');
  if (rays) {
    rays.style.transform = `rotate(${rx * 0.5}deg) translate(${rx * 0.3}px, ${ry * 0.3}px)`;
  }
});

// ===== BARS ANIMATE ON SCROLL =====
const barsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar').forEach((bar, i) => {
        bar.style.transition = `height 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
      });
    }
  });
}, { threshold: 0.5 });

const chartEl = document.querySelector('.db-chart');
if (chartEl) barsObserver.observe(chartEl);

// ===== PROCESS STEPS ANIMATE =====
const processObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.process-step').forEach((step, i) => {
        setTimeout(() => step.style.opacity = '1', i * 180);
      });
    }
  });
}, { threshold: 0.3 });

const processCard = document.querySelector('.process-card');
if (processCard) {
  processCard.querySelectorAll('.process-step').forEach(s => s.style.opacity = '0');
  processObserver.observe(processCard);
}
