// ==================== PROJECT DATA ====================
const projectsData = {
  'wavepay': {
    title: 'WavePay Platform',
    description: 'Enterprise payment processing platform handling high-volume transactions. Implemented webhook system for real-time payment notifications, automated invoice generation, and comprehensive payout APIs. Integrated with multiple payment gateways and banking systems.',
    tech: ['Java 17', 'Spring Boot', 'JPA', 'MySQL', 'Splunk', 'REST API'],
    features: [
      'Real-time webhook notifications',
      'Automated invoice generation',
      'Multi-gateway payment processing',
      'Comprehensive reporting dashboard',
      'Secure transaction handling'
    ]
  },
  'hb-accounting': {
    title: 'HB Accounting',
    description: 'Full-featured accounting system built on microservices architecture. Developed dynamic financial reporting APIs including P&L statements, balance sheets, and ledgers. Implemented real-time data synchronization and complex financial calculations.',
    tech: ['Java', 'Spring Boot', 'Go', 'MySQL', 'Microservices'],
    features: [
      'Dynamic P&L and Balance Sheet generation',
      'Real-time ledger updates',
      'Multi-currency support',
      'Automated reconciliation',
      'Audit trail and compliance'
    ]
  },
  'ehs-clinic': {
    title: 'EHS Health Clinic',
    description: 'Comprehensive healthcare management system handling patient records, billing, appointments, and medical workflows. Integrated with diagnostic equipment and pharmacy systems for seamless operations.',
    tech: ['Java 8', 'Spring Boot', 'JDBC', 'Angular', 'MySQL'],
    features: [
      'Patient management system',
      'Automated billing and invoicing',
      'Appointment scheduling',
      'Prescription management',
      'Insurance claim processing'
    ]
  }
};

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  
  // Create mobile menu if it doesn't exist
  let mobileMenu = document.querySelector('.nav-links.mobile');
  
  if (!mobileMenu) {
    mobileMenu = navLinks.cloneNode(true);
    mobileMenu.classList.add('mobile');
    navbar.querySelector('.container').appendChild(mobileMenu);
    
    // Add click handlers to mobile menu links
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  mobileMenu.classList.toggle('active');
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#" or starts with "#resume-download"
    if (href === '#' || href.startsWith('#resume-download')) {
      return;
    }
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== ACCORDION ====================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all items
    accordionItems.forEach(i => i.classList.remove('active'));
    
    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ==================== PROJECT MODAL ====================
const modal = document.getElementById('projectModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.dataset.project;
    const project = projectsData[projectKey];
    
    if (project) {
      // Populate modal
      document.getElementById('modalTitle').textContent = project.title;
      document.getElementById('modalDescription').textContent = project.description;
      
      // Tech tags
      const modalTech = document.getElementById('modalTech');
      modalTech.innerHTML = '';
      project.tech.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        modalTech.appendChild(tag);
      });
      
      // Features
      const modalFeatures = document.getElementById('modalFeatures');
      modalFeatures.innerHTML = '';
      project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
      });
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simple validation
  if (!name || !email || !message) {
    return;
  }
  
  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  setTimeout(() => {
    // Hide form
    contactForm.style.display = 'none';
    
    // Show success message
    formSuccess.style.display = 'flex';
    
    // Reset form
    contactForm.reset();
    
    // Reset button and show form again after 5 seconds
    setTimeout(() => {
      formSuccess.style.display = 'none';
      contactForm.style.display = 'block';
      submitButton.disabled = false;
      submitButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Send Message
      `;
    }, 5000);
  }, 1000);
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

// Add scroll-reveal class to elements
const revealElements = document.querySelectorAll(`
  .section-header,
  .about-text,
  .highlights-grid,
  .accordion-item,
  .project-card,
  .skill-category,
  .competencies-card,
  .resume-card,
  .contact-info,
  .contact-form-container
`);

revealElements.forEach(el => {
  el.classList.add('scroll-reveal');
  observer.observe(el);
});

// ==================== CURRENT YEAR ====================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ==================== FLOATING ANIMATIONS ====================
// Add stagger delays to hero elements
document.querySelectorAll('.hero-text > *').forEach((el, index) => {
  el.style.animationDelay = `${index * 0.1}s`;
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ==================== PREVENT FLASH ON LOAD ====================
window.addEventListener('load', () => {
  document.body.style.visibility = 'visible';
});

console.log('%c✨ Portfolio by Krishna Tiwari', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'color: #888; font-size: 12px;');
