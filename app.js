/**
 * KALYA SALON MADIUN — INTERACTION & UI LOGIC
 * Features:
 * - Sticky Navbar background blur & transition on scroll
 * - Active navlink spy on scrolling sections
 * - Interactive Service Category Tab Filtering
 * - Masonry Gallery Category Filtering
 * - Mobile Navigation Drawer open/close & backdrop
 * - Interactive Booking Reservation Modal
 * - Smooth scroll behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const header = document.getElementById('mainHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  // 2. Navbar Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Nav Indicator Spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Hamburger Menu Toggle
  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeMobileMenu = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', window.closeMobileMenu);
  }

  // 4. Services Filter Tabs
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-item-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active button
      serviceTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-category');

      // Filter cards with smooth fade
      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCat === targetCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Gallery Filter Tabs
  const galleryTabs = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const targetCat = tab.getAttribute('data-gallery-cat');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-gallery-cat');
        if (targetCat === 'all' || itemCat === targetCat) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Booking Modal Handlers
  const bookingModal = document.getElementById('bookingModal');
  const modalServiceName = document.getElementById('modalServiceName');

  window.openBookingModal = (serviceName = 'Hair Design & Treatment') => {
    if (modalServiceName) {
      modalServiceName.textContent = serviceName;
    }
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on click outside dialog
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        window.closeBookingModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeBookingModal();
      window.closeMobileMenu();
    }
  });
});
