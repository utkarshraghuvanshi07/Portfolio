document.getElementById('year').textContent = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   HERO — typewriter intro + staged entrance
--------------------------------------------------------- */
const typeTarget = document.getElementById('typewriter');
const phrase = "console.log('Hi, I'm Utkarsh — welcome.')";

/* Intro entrance timeline. The typewriter itself is driven by a manual
   rAF stepper below for reliable char-by-char control without extra plugins. */
const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
introTl
  .from('.nav', { y: -30, opacity: 0, duration: 0.6 })
  .from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')
  .from('.hero__sub', { y: 16, opacity: 0, duration: 0.5 }, '+=0.1')
  .from('.hero__cta .btn', { y: 16, opacity: 0, duration: 0.45, stagger: 0.1 }, '-=0.25')
  .from('.hero__stack span', { y: 10, opacity: 0, duration: 0.35, stagger: 0.06 }, '-=0.2')
  .from('.code-window', { x: 40, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.9');

(function typewriter(){
  if (reduceMotion){ typeTarget.textContent = phrase; return; }
  let i = 0;
  const step = () => {
    typeTarget.textContent = phrase.slice(0, i);
    i++;
    if (i <= phrase.length) requestAnimationFrame(() => setTimeout(step, 28));
  };
  step();
})();

/* ---------------------------------------------------------
   SECTION HEADS — reveal on scroll
--------------------------------------------------------- */
gsap.utils.toArray('.section__head').forEach((head) => {
  gsap.from(head, {
    scrollTrigger: { trigger: head, start: 'top 85%' },
    y: 24, opacity: 0, duration: 0.7, ease: 'power2.out'
  });
});

/* ---------------------------------------------------------
   ABOUT — facts stagger in
--------------------------------------------------------- */
gsap.from('.about__lead, .about__grid p:not(.about__lead)', {
  scrollTrigger: { trigger: '#about', start: 'top 75%' },
  y: 20, opacity: 0, duration: 0.6, stagger: 0.15
});
gsap.from('.fact', {
  scrollTrigger: { trigger: '.about__facts', start: 'top 85%' },
  y: 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
});

/* ---------------------------------------------------------
   SKILLS — bars fill to their data-width on scroll
--------------------------------------------------------- */
gsap.utils.toArray('.skill-group').forEach((group, gi) => {
  gsap.from(group, {
    scrollTrigger: { trigger: group, start: 'top 85%' },
    y: 24, opacity: 0, duration: 0.6, delay: gi * 0.05
  });
});

gsap.utils.toArray('.bars__fill').forEach((fill) => {
  const target = fill.style.getPropertyValue('--w');
  gsap.fromTo(fill, { width: '0%' }, {
    width: target,
    duration: 1.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: fill, start: 'top 90%' }
  });
});

gsap.from('.chips span', {
  scrollTrigger: { trigger: '.chips', start: 'top 90%' },
  y: 12, opacity: 0, duration: 0.4, stagger: 0.05
});

/* ---------------------------------------------------------
   PROJECTS — staggered card entrance + tilt on hover
--------------------------------------------------------- */
gsap.from('.project-card', {
  scrollTrigger: { trigger: '#projects-grid', start: 'top 82%' },
  y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

if (!reduceMotion && window.matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.project-card').forEach((card) => {
    const strength = 10;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateX: -py * strength,
        rotateY: px * strength,
        transformPerspective: 600,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    });
  });
}

/* ---------------------------------------------------------
   TIMELINE — draw the connecting line as you scroll, then
   pop in each dot + item as the line reaches it
--------------------------------------------------------- */
const timelineLine = document.querySelector('.timeline__line line');
if (timelineLine){
  const len = timelineLine.getTotalLength ? timelineLine.getTotalLength() : 100;
  timelineLine.classList.add('drawn');
  gsap.set(timelineLine, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(timelineLine, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6
    }
  });
}

gsap.utils.toArray('.timeline__item').forEach((item) => {
  const dot = item.querySelector('.timeline__dot');
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top 80%' },
    x: -24, opacity: 0, duration: 0.6, ease: 'power2.out'
  });
  gsap.fromTo(dot, { scale: 0 }, {
    scale: 1, duration: 0.4, ease: 'back.out(3)',
    scrollTrigger: { trigger: item, start: 'top 78%' }
  });
});

/* ---------------------------------------------------------
   EDUCATION cards
--------------------------------------------------------- */
gsap.from('.edu-card', {
  scrollTrigger: { trigger: '.edu__grid', start: 'top 85%' },
  y: 30, opacity: 0, duration: 0.6, stagger: 0.12
});

/* ---------------------------------------------------------
   CONTACT
--------------------------------------------------------- */
gsap.from('.contact__lead, .contact__email, .contact__phone', {
  scrollTrigger: { trigger: '#contact', start: 'top 78%' },
  y: 20, opacity: 0, duration: 0.6, stagger: 0.12
});
gsap.from('.contact__links a', {
  scrollTrigger: { trigger: '.contact__links', start: 'top 85%' },
  x: 20, opacity: 0, duration: 0.4, stagger: 0.08
});

/* ---------------------------------------------------------
   Simple mobile nav toggle
--------------------------------------------------------- */
const burger = document.getElementById('burger');
if (burger){
  burger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}
