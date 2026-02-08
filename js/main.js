/* ============================================
   GUARDSMAN® — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Scroll Fade-In ----------
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  // ---------- Shop Filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ---------- Booking Form: Conditional Dropdowns ----------
  const serviceSelect = document.getElementById('service');
  const alterationsGroup = document.getElementById('alterationsGroup');
  const suitsGroup = document.getElementById('suitsGroup');

  if (serviceSelect) {
    serviceSelect.addEventListener('change', function () {
      var val = this.value;

      // Hide both first
      if (alterationsGroup) alterationsGroup.classList.remove('show-field');
      if (suitsGroup) suitsGroup.classList.remove('show-field');

      // Show the relevant sub-dropdown
      if (val === 'Made to Measure Alterations' && alterationsGroup) {
        alterationsGroup.classList.add('show-field');
      }
      if (val === 'Made to Measure Suits' && suitsGroup) {
        suitsGroup.classList.add('show-field');
      }
    });
  }

  // ---------- Booking Form: Photo Upload (up to 3) ----------
  const photoInput = document.getElementById('photoInput');
  const photoUploadBtn = document.getElementById('photoUploadBtn');
  const photoPreviews = document.getElementById('photoPreviews');
  let selectedFiles = [];

  if (photoUploadBtn && photoInput) {
    photoUploadBtn.addEventListener('click', () => {
      if (selectedFiles.length >= 3) {
        alert('Maximum 3 photos allowed.');
        return;
      }
      photoInput.click();
    });

    photoInput.addEventListener('change', () => {
      const files = Array.from(photoInput.files);
      files.forEach(file => {
        if (selectedFiles.length >= 3) return;
        if (!file.type.startsWith('image/')) return;
        selectedFiles.push(file);
        renderPhotoPreviews();
      });
      // Reset native input so the same file can be re-selected
      photoInput.value = '';
      updateFileInput();
    });
  }

  function renderPhotoPreviews() {
    if (!photoPreviews) return;
    photoPreviews.innerHTML = '';
    selectedFiles.forEach((file, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'photo-preview';

      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = 'Photo ' + (idx + 1);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'photo-preview-remove';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        selectedFiles.splice(idx, 1);
        renderPhotoPreviews();
        updateFileInput();
      });

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      photoPreviews.appendChild(wrapper);
    });

    // Hide/show the add button
    if (photoUploadBtn) {
      photoUploadBtn.style.display = selectedFiles.length >= 3 ? 'none' : '';
    }
  }

  function updateFileInput() {
    // Rebuild a DataTransfer so the native input has the right files for form submission
    const dt = new DataTransfer();
    selectedFiles.forEach(f => dt.items.add(f));
    if (photoInput) photoInput.files = dt.files;
  }

  // ---------- Booking Form: Submit confirmation ----------
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', () => {
      const btn = bookingForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'SENDING...';
        btn.style.background = '#A07E2E';
        btn.style.borderColor = '#A07E2E';
      }
    });
  }

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.style.background = 'rgba(0, 0, 0, 0.97)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.92)';
    }
    lastScroll = currentScroll;
  });
});
