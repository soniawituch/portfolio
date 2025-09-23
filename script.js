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
      if (this.getAttribute('href') === '#contact' && window.innerWidth < 900) {
        console.log('CTA button on mobile - skipping main nav handler');
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
  const siteNav = document.querySelector('.site-nav');
  
  if (!mobileMenuToggle || !siteNav) {
    return;
  }
  
  mobileMenuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('active');
    
    
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
  });
  
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
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('active');
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
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!siteNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('active');
      document.body.style.overflow = '';
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
      // Only handle on mobile
      if (window.innerWidth < 900) {
        console.log('DEDICATED Mobile CTA button handler triggered');
        e.preventDefault();
        e.stopPropagation();
        
        const target = document.getElementById('contact');
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
            console.log('Mobile: Section highlight added to', sectionHeader.textContent);
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
          }, 3000);
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
    indicator.addEventListener('click', () => goToSlide(i));
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
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalProjects - 1;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalProjects - 1));
    updateCarousel();
  }
  
  function nextSlide() {
    if (currentIndex < totalProjects - 1) {
      currentIndex++;
      updateCarousel();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let currentX = 0;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;
    isDragging = true;
    track.style.transition = 'none';
  }, { passive: true });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    const translateX = -currentIndex * 100 + (diffX / track.offsetWidth) * 100;
    
    // Apply the drag effect
    track.style.transform = `translateX(${translateX}%)`;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Restore transition
    track.style.transition = 'transform 0.3s ease';
    
    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      // Snap back to current position
      updateCarousel();
    }
  }, { passive: true });
  
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

// Cache buster: Wed Sep 24 00:33:36 CEST 2025
