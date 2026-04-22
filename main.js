import './style.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Init Lucide Icons ---
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- 2. Loader ---
  const loader = document.getElementById('loader');
  
  // Animate loader text out
  gsap.to('.loader-text', {
    backgroundPosition: '200% center',
    duration: 2,
    ease: 'power2.inOut',
    repeat: -1
  });

  window.addEventListener('load', () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        initHeroAnimations();
      }
    });
  });

  // Fallback if load event doesn't fire soon enough
  setTimeout(() => {
    if(loader.style.display !== 'none') {
      gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => { loader.style.display = 'none'; initHeroAnimations(); }});
    }
  }, 3000);

  // --- 3. Custom Cursor ---
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');
  
  if (cursor && cursorFollower) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorFollower, { xPercent: -50, yPercent: -50 });

    let xMouse = 0, yMouse = 0;
    
    window.addEventListener('mousemove', (e) => {
      xMouse = e.clientX;
      yMouse = e.clientY;
      
      gsap.to(cursor, {
        duration: 0.1,
        x: xMouse,
        y: yMouse
      });
      
      gsap.to(cursorFollower, {
        duration: 0.5,
        x: xMouse,
        y: yMouse,
        ease: 'power3.out'
      });
    });

    // Hover effect on interactable elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .cursor-pointer, .partner-slider h3');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // --- 4. Navigation & Mobile Menu ---
  const header = document.getElementById('header');
  const glassNav = document.querySelector('.glass-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      glassNav.classList.add('bg-white/80', 'dark:bg-[#0A1F44]/80');
      glassNav.classList.remove('mt-4', 'w-[95%]');
      glassNav.classList.add('w-full', 'rounded-none');
      
      gsap.to(backToTop, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    } else {
      glassNav.classList.remove('bg-white/80', 'dark:bg-[#0A1F44]/80');
      glassNav.classList.add('mt-4', 'w-[95%]');
      glassNav.classList.remove('w-full', 'rounded-none');
      
      gsap.to(backToTop, { scale: 0, duration: 0.3, ease: 'back.in(1.7)' });
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggleMenu = () => {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    if (isClosed) {
      mobileMenu.classList.remove('translate-x-full');
      gsap.fromTo(mobileLinks, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      mobileMenu.classList.add('translate-x-full');
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // --- 5. Hero Animations ---
  function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-badge', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-title span',
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'power4.out' },
      "-=0.4"
    )
    .fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo('.hero-ctas a',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
      "-=0.4"
    )
    .fromTo('.hero-scroll',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.2"
    );

    // Simple Particles
    createParticles();
  }

  function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('absolute', 'rounded-full', 'bg-white');
      
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      container.appendChild(particle);
      
      gsap.to(particle, {
        y: `-${Math.random() * 100 + 50}px`,
        x: `${(Math.random() - 0.5) * 50}px`,
        opacity: 0,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 5
      });
    }
  }

  // --- 6. Scroll Animations ---
  
  // Stagger Reveal
  const revealElements = document.querySelectorAll('.stagger-reveal');
  revealElements.forEach(el => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Section Headers Reveal
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(h => {
    gsap.fromTo(h.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: h,
          start: 'top 85%'
        }
      }
    );
  });

  // Parallax Images
  const pImages = document.querySelectorAll('.img-parallax');
  pImages.forEach(img => {
    gsap.to(img, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Cards Premium Stagger
  const cards = document.querySelectorAll('.premium-card');
  if (cards.length > 0) {
    gsap.fromTo(cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '#missions',
          start: 'top 70%'
        }
      }
    );
  }

  // Activity Cards
  const activityCards = document.querySelectorAll('.activity-card');
  if (activityCards.length > 0) {
    gsap.fromTo(activityCards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#activites',
          start: 'top 70%'
        }
      }
    );
  }

  // --- 7. Timeline Animation ---
  const timelineProgress = document.querySelector('.timeline-progress');
  if (timelineProgress) {
    gsap.to(timelineProgress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-line',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    });
  }

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    const isLeft = index % 2 === 0; // Check if it's supposed to animate from left or right (on desktop)
    const dot = item.querySelector('.timeline-dot');
    
    gsap.fromTo(item,
      { opacity: 0, x: isLeft ? 50 : -50, y: 30 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        }
      }
    );

    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, backgroundColor: 'white' },
        {
          scale: 1,
          backgroundColor: '#0B8F4D',
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // --- 8. Counters ---
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    ScrollTrigger.create({
      trigger: '#counter-container',
      start: 'top 80%',
      onEnter: () => {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: 'power3.out',
            onUpdate: function() {
              counter.innerHTML = Math.ceil(this.targets()[0].innerText);
            }
          });
        });
      },
      once: true
    });
  }
});
