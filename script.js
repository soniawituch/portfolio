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
      
      // Check if this is the CTA button on mobile
      if (this.getAttribute('href') === '#contact' && window.innerWidth < 900) {
        console.log('CTA button on mobile - using mobile handler');
        // Let the mobile handler take care of this
        return;
      }
      
      // Check if this is the CTA button on desktop - skip it entirely
      if (this.getAttribute('href') === '#contact' && window.innerWidth >= 900) {
        console.log('CTA button on desktop - skipping main nav handler');
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
  
  // Handle the "Let's build something amazing" button on mobile
  const ctaButton = document.querySelector('a[href="#contact"]');
  console.log('CTA button found:', !!ctaButton);
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      console.log('CTA button clicked! Screen width:', window.innerWidth);
      // Check if we're on mobile (screen width < 900px)
      if (window.innerWidth < 900) {
        console.log('Mobile CTA button handler triggered');
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
          }
          
          // Scroll to target with mobile-optimized methods
          const targetPosition = target.offsetTop - 80;
          
          // Method 1: Smooth scroll
          try {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } catch (e) {
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
          
          // Remove highlight after animation
          setTimeout(() => {
            if (sectionHeader) {
              sectionHeader.classList.remove('section-highlight');
            }
          }, 3000);
        }
      }
    });
  }
}

// Initialize year display
function initYearDisplay() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
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
  
  console.log('All initialization complete');
  
  // Test: Add a simple click handler to all links
  const allLinks = document.querySelectorAll('a');
  console.log('All links found:', allLinks.length);
  allLinks.forEach((link, index) => {
    console.log(`Link ${index}:`, link.href, link.textContent.trim());
  });
});

// Force page to start at top on load
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

// Cache buster: Wed Sep 24 00:33:36 CEST 2025
