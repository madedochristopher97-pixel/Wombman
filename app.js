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

  // 3. Product Collection Switcher (Steam Blend vs Salt Bath)
  const productToggleBtns = document.querySelectorAll('.product-toggle-btn');
  const productPanels = document.querySelectorAll('.product-panel');

  if (productToggleBtns.length > 0) {
    productToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetProductId = btn.getAttribute('data-product');

        productToggleBtns.forEach(b => b.classList.remove('active'));
        productPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetProductId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 4. Product Galleries (Scoped per Product)
  const galleries = document.querySelectorAll('.product-gallery');
  galleries.forEach(gallery => {
    const mainImg = gallery.querySelector('.main-product-img');
    const thumbBtns = gallery.querySelectorAll('.thumb-btn');

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
  });

  // 5. Ritual Tabs (Scoped per Product Component)
  const tabContainers = document.querySelectorAll('.ritual-tabs');
  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanes = container.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = container.querySelector(`#${targetTab}`);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  });

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

  // 5b. Ingredients Carousel Navigation
  const ingredientsCarousel = document.getElementById('ingredients-carousel');
  const ingredientsTrack = document.getElementById('ingredients-track');
  const ingredientCards = document.querySelectorAll('.ingredient-card');
  const prevIngredientBtn = document.getElementById('prev-ingredient');
  const nextIngredientBtn = document.getElementById('next-ingredient');
  const ingredientDotsContainer = document.getElementById('ingredient-dots');

  if (ingredientsCarousel && ingredientsTrack && ingredientCards.length > 0) {
    let currentIdx = 0;

    // Create pagination dots dynamically
    ingredientCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToCard(idx));
      if (ingredientDotsContainer) ingredientDotsContainer.appendChild(dot);
    });

    const ingredientDots = ingredientDotsContainer ? ingredientDotsContainer.querySelectorAll('.dot') : [];

    function updateActiveDot(index) {
      currentIdx = Math.max(0, Math.min(index, ingredientCards.length - 1));
      ingredientDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
      });
      ingredientCards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIdx);
      });
    }

    function scrollToCard(index) {
      if (index < 0) index = ingredientCards.length - 1;
      if (index >= ingredientCards.length) index = 0;

      const targetCard = ingredientCards[index];
      if (targetCard) {
        const cardLeft = targetCard.offsetLeft - ingredientsTrack.offsetLeft;
        ingredientsCarousel.scrollTo({
          left: cardLeft,
          behavior: 'smooth'
        });
        updateActiveDot(index);
      }
    }

    if (nextIngredientBtn) {
      nextIngredientBtn.addEventListener('click', () => scrollToCard(currentIdx + 1));
    }
    if (prevIngredientBtn) {
      prevIngredientBtn.addEventListener('click', () => scrollToCard(currentIdx - 1));
    }

    // Sync active dot on manual scroll / swipe
    let scrollTimeout;
    ingredientsCarousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPos = ingredientsCarousel.scrollLeft;
        const cardWidth = ingredientCards[0].offsetWidth + 20; // card width + gap
        const newIndex = Math.round(scrollPos / cardWidth);
        if (newIndex !== currentIdx && newIndex >= 0 && newIndex < ingredientCards.length) {
          updateActiveDot(newIndex);
        }
      }, 50);
    }, { passive: true });
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
        alert(`Thank you for subscribing to WOMB-man Botanical Journal with ${input.value}!`);
        input.value = '';
      }
    });
  }

  // 8. Download Steaming Guide (PDF / Printable View)
  const downloadGuideBtn = document.getElementById('download-guide-btn');
  if (downloadGuideBtn) {
    downloadGuideBtn.addEventListener('click', () => {
      const printWindow = window.open('', '_blank');
      const guideHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WOMB-man Sacred Steaming Guide (PDF)</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #2C1418;
      background: #FFFFFF;
      line-height: 1.6;
      padding: 24px;
      max-width: 680px;
      margin: 0 auto;
    }
    .guide-header {
      text-align: center;
      border-bottom: 2px solid #7B323B;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .guide-logo {
      font-size: 30px;
      font-weight: 700;
      color: #7B323B;
      letter-spacing: 3px;
      margin: 0;
    }
    .guide-tagline {
      font-size: 14px;
      color: #E06B4A;
      margin: 6px 0 0 0;
      font-style: italic;
    }
    .guide-title {
      font-size: 18px;
      font-weight: 700;
      color: #7B323B;
      border-bottom: 1px solid #EFEFD7;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 14px;
    }
    .step-list {
      padding-left: 20px;
      margin: 0 0 16px 0;
    }
    .step-list li {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .step-list strong {
      color: #2C1418;
    }
    .info-card {
      background: #FDFCF7;
      border: 1px solid #EFEFD7;
      border-left: 4px solid #E06B4A;
      border-radius: 6px;
      padding: 14px 18px;
      margin: 18px 0;
      font-size: 13px;
      line-height: 1.6;
    }
    .ingredients-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      font-size: 13px;
      margin-top: 10px;
    }
    .guide-footer {
      text-align: center;
      margin-top: 36px;
      padding-top: 16px;
      border-top: 1px solid #EFEFD7;
      font-size: 12px;
      color: #7B323B;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="guide-header">
    <h1 class="guide-logo">WOMB-MAN</h1>
    <p class="guide-tagline">Release. Cleanse. Restore. 🌹</p>
  </div>

  <h2 class="guide-title">🌿 Sacred Steaming Ritual Guide</h2>
  <ol class="step-list">
    <li><strong>1. Boil Filtered Water:</strong> Bring 4–6 cups of clean filtered water to a gentle boil.</li>
    <li><strong>2. Steep the Herbs:</strong> Add a <em>small handful</em> of WOMB-man Botanical Blend, cover with a lid, and steep for 10 minutes.</li>
    <li><strong>3. Prepare Your Space:</strong> Place vessel securely beneath a perforated steam stool or seat. Check that steam is warm and comforting, never burning.</li>
    <li><strong>4. Settle into the Ritual:</strong> Wrap a warm blanket around your waist to create a cozy tent. Relax and breathe deeply over the steam for 15–20 minutes.</li>
    <li><strong>5. Rest &amp; Reconnect:</strong> Wrap yourself in warm clothing, hydrate with warm herbal tea, and rest peacefully for 15 minutes.</li>
  </ol>

  <div class="info-card">
    <strong>✨ Best Timing &amp; Intentional Care:</strong><br>
    • Ideal 3–5 days prior to cycle onset, or after menstruation concludes.<br>
    • <em>Precaution:</em> Avoid steaming during active menstruation or pregnancy.
  </div>

  <h2 class="guide-title">🌺 Handcrafted Botanical Ingredients</h2>
  <div class="ingredients-grid">
    <div>• <strong>Rosemary:</strong> Pelvic circulation &amp; warmth</div>
    <div>• <strong>Hibiscus:</strong> Antioxidant vitality</div>
    <div>• <strong>Rose Petals:</strong> Emotional softening &amp; balance</div>
    <div>• <strong>Chamomile:</strong> Nervous system calming</div>
    <div>• <strong>Bay Leaves:</strong> Clearing &amp; botanical ease</div>
  </div>

  <div class="guide-footer">
    <p><strong>WOMB-man Kenya</strong> • Branches in Nairobi &amp; Kilifi<br>
    WhatsApp: 0769 161 878 • Instagram: @_.wombman • hello@wombman.com</p>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  <\/script>
</body>
</html>`;

      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(guideHtml);
        printWindow.document.close();
      } else {
        window.print();
      }
    });
  }
});
