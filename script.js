// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').className = 
      navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').className = 'fas fa-bars';
    });
  });
  
  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize Swiper
  const swiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
  
  // Animate progress bars on scroll
  const progressBars = document.querySelectorAll('.progress');
  
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  };
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate progress bars when skills section is visible
        if (entry.target.id === 'skills') {
          setTimeout(animateProgressBars, 300);
        }
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Contact Form Submission with Formspree (AJAX version)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  async function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    try {
      const formData = new FormData(event.target);
      const response = await fetch(event.target.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.className = 'form-status success';
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.backgroundColor = '#16a34a';
        contactForm.reset();
        
        // Reset button after 4 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          formStatus.textContent = '';
        }, 4000);
        
      } else {
        // Formspree returned an error
        const data = await response.json();
        if (data.errors) {
          formStatus.textContent = data.errors.map(error => error.message).join(", ");
          formStatus.className = 'form-status error';
        } else {
          formStatus.textContent = "Oops! There was a problem submitting your form.";
          formStatus.className = 'form-status error';
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      // Network error
      formStatus.textContent = "Network error. Please try again or email me directly.";
      formStatus.className = 'form-status error';
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
  
  contactForm.addEventListener('submit', handleSubmit);
}
  
  // Scroll-based header shadow
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
      nav.style.boxShadow = 'var(--shadow)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
  
  // Initialize scroll position
  window.dispatchEvent(new Event('scroll'));
  
  // Add current year to footer
  document.querySelector('.footer-text').innerHTML = 
    document.querySelector('.footer-text').innerHTML.replace('2026', new Date().getFullYear());
});
//  DOMContentLoaded event handler
const loadingScreen = document.getElementById('loadingScreen');
if (loadingScreen) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  });
}