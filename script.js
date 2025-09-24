// Theme functionality
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const isDark = savedTheme === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', isDark);
  }
}

  function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
    const isDark = nextTheme === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', isDark);
  }
}

// Navigation functionality
function initNavigation() {
  console.log('Setting up navigation...');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  console.log('Found nav links:', navLinks.length);
  console.log('Nav links:', navLinks);
  
  navLinks.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
      console.log('Main nav link clicked:', this.href);
      console.log('Screen width:', window.innerWidth);
      
      // Skip CTA button on mobile - let dedicated handler manage it
      if (this.getAttribute('href') === '#contact' && window.innerWidth < 900 && this.textContent.includes('Let\'s build')) {
        console.log('CTA button on mobile - skipping main nav handler');
        e.preventDefault();
        e.stopPropagation();
        // Manually trigger the CTA handler
        const target = document.getElementById('contact');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Find the h2 header within the target section
          const sectionHeader = target.querySelector('h2');
          if (sectionHeader) {
            sectionHeader.classList.add('section-highlight');
            sectionHeader.style.background = 'var(--primary)';
            sectionHeader.style.color = 'var(--primary-contrast)';
            sectionHeader.style.padding = '8px 16px';
            sectionHeader.style.borderRadius = '8px';
            sectionHeader.style.transition = 'all 0.3s ease';
            console.log('Mobile: Section highlight added to', sectionHeader.textContent);
            // Remove highlight after 5 seconds
            setTimeout(() => {
              if (sectionHeader) {
                sectionHeader.classList.remove('section-highlight');
                sectionHeader.style.background = '';
                sectionHeader.style.color = '';
                sectionHeader.style.padding = '';
                sectionHeader.style.borderRadius = '';
                sectionHeader.style.transition = '';
                console.log('Mobile: Section highlight removed from', sectionHeader.textContent);
              }
            }, 5000);
          }
        }
        return;
      }
      
      try {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        let target = document.getElementById(targetId);
        console.log('Main nav target:', target);
        
        if (target) {
          // Find the h2 header within the target section
          const sectionHeader = target.querySelector('h2');
          
          // Remove highlight from all section headers
          document.querySelectorAll('section h2').forEach(header => {
            header.classList.remove('section-highlight');
          });
          
          // Add highlight to target section header
          if (sectionHeader) {
            sectionHeader.classList.add('section-highlight');
          }
          
          // Simple scroll to target with smooth behavior
          console.log('Main nav scrolling to target:', target);
          console.log('Target offsetTop:', target.offsetTop);
          console.log('Current scroll position:', window.pageYOffset);
          
          // Use scrollIntoView - this is the most reliable method
          console.log('Using scrollIntoView...');
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Check if scroll actually happened
          setTimeout(() => {
            console.log('Scroll position after scroll:', window.pageYOffset);
          }, 500);
          
          // Close mobile menu if it's open (after scrolling starts)
          setTimeout(() => {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const siteNav = document.querySelector('.site-nav');
            if (mobileMenuToggle && siteNav) {
              mobileMenuToggle.setAttribute('aria-expanded', 'false');
              siteNav.classList.remove('active');
              document.body.style.overflow = '';
            }
          }, 100);
          
          // Remove highlight after animation
            setTimeout(() => {
            if (sectionHeader) {
              sectionHeader.classList.remove('section-highlight');
            }
          }, 2000);
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    });
  });
}

// Mobile navigation functionality
function initMobileNavigation() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const siteNav = document.querySelector('.site-nav');
  
  if (!mobileMenuToggle || !siteNav) {
    return;
  }
  
  function toggleMenu(show) {
    const isExpanded = show !== undefined ? show : mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    console.log('Toggle menu called, isExpanded:', isExpanded);
    console.log('Mobile menu close button exists:', !!mobileMenuClose);
    
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('active', !isExpanded);
    
    // Toggle button visibility using classes
    if (!isExpanded) {
      mobileMenuToggle.style.display = 'none';
      if (mobileMenuClose) {
        mobileMenuClose.style.display = 'block';
        mobileMenuClose.classList.add('show');
        console.log('Showing close button');
      }
    } else {
      mobileMenuToggle.style.display = 'block';
      if (mobileMenuClose) {
        mobileMenuClose.style.display = 'none';
        mobileMenuClose.classList.remove('show');
        console.log('Hiding close button');
      }
    }
    
    // Prevent body scroll when menu is open
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }
  
  mobileMenuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Mobile menu toggle clicked');
    toggleMenu();
  });
  
  // Close button functionality
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Close button clicked - closing menu');
      // Force close the menu
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('active');
      mobileMenuToggle.style.display = 'block';
      mobileMenuClose.style.display = 'none';
      mobileMenuClose.classList.remove('show');
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    });
  }
  
  // Handle mobile navigation links directly
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only handle internal navigation links (not external links like CV download)
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          // Find the h2 header within the target section
          const sectionHeader = target.querySelector('h2');
          
          // Remove highlight from all section headers
          document.querySelectorAll('section h2').forEach(header => {
            header.classList.remove('section-highlight');
          });
          
          // Add highlight to target section header
          if (sectionHeader) {
            sectionHeader.classList.add('section-highlight');
          }
          
          // Scroll to target with multiple methods for reliability
          const targetPosition = target.offsetTop - 80; // Account for fixed header
          
          // Method 1: Smooth scroll
          try {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } catch (e) {
            // Fallback to instant scroll
            window.scrollTo(0, targetPosition);
          }
          
          // Method 2: Force scroll as backup
          setTimeout(() => {
            document.documentElement.scrollTop = targetPosition;
            document.body.scrollTop = targetPosition;
          }, 50);
          
          // Method 3: CSS override for stubborn cases
          setTimeout(() => {
            document.documentElement.style.overflow = 'auto';
            document.documentElement.style.overflowY = 'auto';
            document.body.style.overflow = 'auto';
            document.body.style.overflowY = 'auto';
            document.documentElement.scrollTop = targetPosition;
            document.body.scrollTop = targetPosition;
          }, 100);
          
          // Close mobile menu after a short delay
          setTimeout(() => {
            console.log('Closing mobile menu after nav link click');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('active');
            mobileMenuToggle.style.display = 'block';
            if (mobileMenuClose) {
              mobileMenuClose.style.display = 'none';
              mobileMenuClose.classList.remove('show');
            }
            document.body.style.overflow = '';
            document.body.style.overflowY = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.overflowY = '';
          }, 100);
          
          // Remove highlight after animation
          setTimeout(() => {
            if (sectionHeader) {
              sectionHeader.classList.remove('section-highlight');
            }
          }, 3000);
        }
      }
    });
  });
  
  // Close menu when clicking outside (only if menu is open)
  document.addEventListener('click', function(e) {
    if (siteNav.classList.contains('active') && 
        !siteNav.contains(e.target) && 
        !mobileMenuToggle.contains(e.target) && 
        !mobileMenuClose.contains(e.target)) {
      toggleMenu(false);
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });
  
}

// Initialize year display
function initYearDisplay() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Handle the "Let's build something amazing" button
function initCTAButton() {
  const ctaButton = document.querySelector('a[href="#contact"]');
  console.log('CTA button found:', !!ctaButton);
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      console.log('DEDICATED CTA button clicked! Screen width:', window.innerWidth);
      console.log('CTA button text:', this.textContent);
      // Only handle on mobile
      if (window.innerWidth < 900) {
        console.log('DEDICATED Mobile CTA button handler triggered');
        e.preventDefault();
        e.stopPropagation();
        
        const target = document.getElementById('contact');
        console.log('Mobile CTA: Target element found:', !!target);
        if (target) {
          // Find the h2 header within the target section
          const sectionHeader = target.querySelector('h2');
          console.log('Mobile CTA: Section header found:', !!sectionHeader);
          console.log('Mobile CTA: Section header text:', sectionHeader ? sectionHeader.textContent : 'none');
          
          // Remove highlight from all section headers
          document.querySelectorAll('section h2').forEach(header => {
            header.classList.remove('section-highlight');
          });
          
          // Add highlight to target section header
          if (sectionHeader) {
            sectionHeader.classList.add('section-highlight');
            sectionHeader.style.background = 'var(--primary)';
            sectionHeader.style.color = 'var(--primary-contrast)';
            sectionHeader.style.padding = '8px 16px';
            sectionHeader.style.borderRadius = '8px';
            sectionHeader.style.transition = 'all 0.3s ease';
            console.log('Mobile: Section highlight added to', sectionHeader.textContent);
            console.log('Mobile: Section header element:', sectionHeader);
            console.log('Mobile: Section header classes:', sectionHeader.classList.toString());
          }
          
          // Mobile-optimized scroll
          const targetPosition = target.offsetTop - 80;
          
          try {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } catch (e) {
            window.scrollTo(0, targetPosition);
          }
          
          // Force scroll as backup
          setTimeout(() => {
            document.documentElement.scrollTop = targetPosition;
            document.body.scrollTop = targetPosition;
          }, 50);
          
          // Remove highlight after animation
          setTimeout(() => {
            if (sectionHeader) {
              sectionHeader.classList.remove('section-highlight');
              console.log('Mobile: Section highlight removed from', sectionHeader.textContent);
            }
          }, 5000);
        }
      }
    });
  }
}

// Projects carousel functionality
function initProjectsCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.getElementById('carouselIndicators');
  
  if (!track || !prevBtn || !nextBtn || !indicators) {
    console.log('Carousel elements not found');
    return;
  }
  
  const projects = track.querySelectorAll('.project');
  const totalProjects = projects.length;
  let currentIndex = 0;
  
  
  // Create indicators
  for (let i = 0; i < totalProjects; i++) {
    const indicator = document.createElement('button');
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-label', `Go to project ${i + 1}`);
    indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('Indicator clicked:', i);
      goToSlide(i);
    });
    indicators.appendChild(indicator);
  }
  
  function updateCarousel() {
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
      indicator.setAttribute('aria-selected', index === currentIndex);
    });
    
    // Buttons are always enabled for infinite loop
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalProjects - 1));
    updateCarousel();
  }
  
  function nextSlide() {
    console.log('nextSlide called, currentIndex:', currentIndex, 'totalProjects:', totalProjects);
    currentIndex = (currentIndex + 1) % totalProjects; // Loop back to 0 when reaching the end
    updateCarousel();
  }
  
  function prevSlide() {
    console.log('prevSlide called, currentIndex:', currentIndex);
    currentIndex = currentIndex === 0 ? totalProjects - 1 : currentIndex - 1; // Go to last slide when at 0
    updateCarousel();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    nextSlide();
  });
  
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log('Prev button clicked');
    prevSlide();
  });
  
  // Simple touch swipe support - just like arrow buttons
  let startX = 0;
  let startY = 0;

  function addSwipeListeners(element) {
    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = Math.abs(startY - endY);
      
      // Only trigger if horizontal movement is greater than vertical (prevents accidental swipes)
      if (Math.abs(diffX) > diffY && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe right - next slide (like right arrow)
          nextSlide();
        } else if (diffX < 0) {
          // Swipe left - previous slide (like left arrow)
          prevSlide();
        }
      }
      
      // Reset values
      startX = 0;
      startY = 0;
    }, { passive: true });
  }

  // Add swipe listeners to the track
  addSwipeListeners(track);

  // Add swipe listeners to each project card
  function addSwipeToProjects() {
    const projectCards = track.querySelectorAll('.project');
    projectCards.forEach((card) => {
      addSwipeListeners(card);
    });
  }
  
  // Keyboard navigation
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  });
  
  // Initialize
  updateCarousel();
  addSwipeToProjects();
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing...');
  
  // Initialize all functionality
  initTheme();
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  initYearDisplay();
  initNavigation();
  initMobileNavigation();
  initProjectsCarousel();
  initCTAButton();
  
  console.log('All initialization complete');
  
  // Test: Add a simple click handler to all links
  const allLinks = document.querySelectorAll('a');
  console.log('All links found:', allLinks.length);
  allLinks.forEach((link, index) => {
    console.log(`Link ${index}:`, link.href, link.textContent.trim());
  });
});

// Force page to start at top on load/refresh
window.addEventListener('load', function() {
  // Use setTimeout to ensure this runs after all other scripts
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
});

// Also ensure page starts at top on initial load
document.addEventListener('DOMContentLoaded', function() {
  // Use setTimeout to ensure this runs after all other scripts
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
});

// Force scroll to top immediately when page loads
setTimeout(() => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, 0);

// Cache buster: Wed Sep 24 10:10:00 CEST 2025

