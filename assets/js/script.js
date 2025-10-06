'use strict';

window.addEventListener('DOMContentLoaded', () => {

  /**
   * Add event on multiple elements
   */
  const addEventOnElements = function (elements, eventType, callback) {
    if (!elements) return;
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  };

  /* ===========================
     SIDEBAR TOGGLE
  =========================== */
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
  }

  /* ===========================
     PORTFOLIO / BLOG MODAL SYSTEM
  =========================== */
  const modalContainer = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalText = document.getElementById('modal-text');
  const modalActions = document.getElementById('modal-actions');

  /**
   * Open modal with project/blog data
   */
  function openModal(title = '', img = '', text = '', pdf = '') {
    if (!modalContainer) return;

    modalTitle.textContent = title || '';
    modalImg.src = img || '';
    modalImg.style.display = img ? 'block' : 'none';
    modalText.innerHTML = text || '';

    // Add PDF button if PDF is provided
    let actionsHTML = '';
    if (pdf) {
      actionsHTML += `<a href="${pdf}" target="_blank" class="modal-btn primary">📄 View PDF Document</a>`;
    }
    
    // Add default action buttons
    actionsHTML += `
      <a href="#" class="modal-btn secondary" onclick="alert('GitHub link would go here')">💻 View Code</a>
      <a href="#" class="modal-btn secondary" onclick="alert('Demo link would go here')">🚀 Live Demo</a>
    `;
    
    if (modalActions) {
      modalActions.innerHTML = actionsHTML;
    }

    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   */
  function closeModal() {
    if (!modalContainer) return;
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Modal close event listeners
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && modalContainer.classList.contains('active')) {
      closeModal();
    }
  });

  /* ===========================
     PORTFOLIO ITEMS CLICK HANDLERS
  =========================== */
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = item.dataset.title || item.querySelector('.project-title')?.textContent || '';
      const img = item.dataset.img || '';
      const text = item.dataset.text || '';
      const pdf = item.dataset.pdf || '';
      
      openModal(title, img, text, pdf);
    });
  });

  /* ===========================
     BLOG ITEMS CLICK HANDLERS
  =========================== */
  document.querySelectorAll('.blog-post-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = item.dataset.title || item.querySelector('.blog-item-title')?.textContent || '';
      const img = item.dataset.img || '';
      const text = item.dataset.text || '';
      const pdf = item.dataset.pdf || '';
      
      openModal(title, img, text, pdf);
    });
  });

  /* ===========================
     CUSTOM SELECT (FILTER)
  =========================== */
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-selecct-value]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  if (select) {
    select.addEventListener('click', () => select.classList.toggle('active'));
  }

  /**
   * Filter function for portfolio items
   */
  const filterFunc = function (selectedValue = 'all') {
    selectedValue = selectedValue.toLowerCase();
    for (let i = 0; i < filterItems.length; i++) {
      const itemCategory = filterItems[i].dataset.category;
      if (selectedValue === 'all' || selectedValue === itemCategory) {
        filterItems[i].classList.add('active');
      } else {
        filterItems[i].classList.remove('active');
      }
    }
  };

  // Select item event listeners
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (select) select.classList.remove('active');
    });
  }

  // Initialize filter
  filterFunc('all');

  /* ===========================
     CONTACT FORM VALIDATION
  =========================== */
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  if (form && formBtn) {
    // Get all form inputs including those without data-form-input attribute
    const allInputs = form.querySelectorAll('input, textarea');
    
    const checkFormFilled = () => {
      let allFilled = true;
      for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].required && !allInputs[i].value.trim()) {
          allFilled = false;
          break;
        }
      }
      formBtn.disabled = !allFilled;
    };

    // Add event listeners to all form inputs
    allInputs.forEach(input => {
      input.addEventListener('input', checkFormFilled);
      input.addEventListener('blur', checkFormFilled);
    });
    
    // Initial check
    checkFormFilled();

    // Form submission
    form.addEventListener('submit', function(e) {
      // Let the form submit naturally to Formspree
      // You can add additional validation here if needed
      console.log('Form submitted');
    });
  }

  /* ===========================
     PAGE NAVIGATION
  =========================== */
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('article[data-page]');

  addEventOnElements(navLinks, 'click', function (e) {
    e.preventDefault();
    const targetPage = this.innerText.toLowerCase();

    // Update pages visibility
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    // Update nav links active state
    navLinks.forEach(link => {
      if (link.innerText.toLowerCase() === targetPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ===========================
     TESTIMONIALS MODAL (EXISTING)
  =========================== */
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer2 = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");


  // Modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer2) modalContainer2.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }

  // Add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      if (modalImg) modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      if (modalImg) modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  // Add click event to modal close elements
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  /* ===========================
     SMOOTH SCROLLING ANIMATIONS
  =========================== */
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe project items for animations
  document.querySelectorAll('.project-item, .blog-post-item, .timeline-item').forEach(item => {
    observer.observe(item);
  });

  /* ===========================
     UTILITY FUNCTIONS
  =========================== */

  /**
   * Debounce function for performance optimization
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Handle window resize events
   */
  const handleResize = debounce(() => {
    // Close modal on mobile orientation change
    if (window.innerWidth < 768 && modalContainer && modalContainer.classList.contains('active')) {
      // Optional: close modal on mobile resize
      // closeModal();
    }
  }, 250);

  window.addEventListener('resize', handleResize);

  /**
   * Prevent body scroll when modal is open
   */
  const preventBodyScroll = (prevent) => {
    if (prevent) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = getScrollbarWidth() + 'px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  /**
   * Get scrollbar width for modal padding compensation
   */
  function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  /* ===========================
     LOADING AND PERFORMANCE
  =========================== */

  /**
   * Lazy loading for images
   */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Initialize skill progress bars animation
   */
  const initSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    skillBars.forEach(bar => {
      const percent = bar.parentElement.previousElementSibling.querySelector('data')?.value || 0;
      if (percent) {
        setTimeout(() => {
          bar.style.width = percent + '%';
        }, 500);
      }
    });
  };

  // Initialize skill bars when Resume tab is clicked
  const resumeNavLink = document.querySelector('[data-nav-link]');
  if (resumeNavLink) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (link.textContent.toLowerCase() === 'resume') {
          setTimeout(initSkillBars, 300);
        }
      });
    });
  }

  /* ===========================
     ACCESSIBILITY IMPROVEMENTS
  =========================== */

  /**
   * Trap focus within modal
   */
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Apply focus trap to modal when opened
  if (modalContainer) {
    const originalOpenModal = openModal;
    openModal = function(...args) {
      originalOpenModal.apply(this, args);
      trapFocus(modalContainer);
      // Focus on close button
      setTimeout(() => {
        if (modalClose) modalClose.focus();
      }, 100);
    };
  }

  console.log('Portfolio JavaScript initialized successfully');

});