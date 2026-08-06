/**
 * WOMBMAN BOTANICAL WELLNESS - INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Product Spotlight Thumbnail Gallery
  const mainImg = document.getElementById('main-product-img');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  if (mainImg && thumbBtns.length > 0) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newSrc = btn.getAttribute('data-img');
        if (newSrc && mainImg.src !== newSrc) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 150);

          thumbBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  }

  // 4. Ritual Tabs (Product Spotlight)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = document.getElementById(targetTab);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // 5. Testimonial Carousel
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (testimonials.length > 0) {
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showTestimonial(idx));
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
      testimonials.forEach((card, i) => {
        card.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
      });

      currentIndex = (index + testimonials.length) % testimonials.length;
      testimonials[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => showTestimonial(currentIndex + 1));
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showTestimonial(currentIndex - 1));
    }

    // Auto rotate every 6 seconds
    let interval = setInterval(() => showTestimonial(currentIndex + 1), 6000);

    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(interval));
      carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => showTestimonial(currentIndex + 1), 6000);
      });
    }
  }

  // 6. FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other active items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Newsletter Form Handling
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        alert(`Thank you for subscribing to Wombman Botanical Journal with ${input.value}!`);
        input.value = '';
      }
    });
  }
});
