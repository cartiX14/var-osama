// ===========================
// Année dynamique dans le footer
// ===========================
const updateYear = () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
};

// ===========================
// Smooth scroll amélioré
// ===========================
const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorer les liens vides ou "#"
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Améliorer l'accessibilité en donnant le focus à la section
        target.setAttribute('tabindex', '-1');
        target.focus();
        
        // Mettre à jour l'URL sans recharger la page
        history.pushState(null, null, href);
      }
    });
  });
};

// ===========================
// Animation au scroll (Intersection Observer)
// ===========================
const initScrollAnimations = () => {
  const sections = document.querySelectorAll('section');
  
  // Vérifier le support de Intersection Observer
  if (!('IntersectionObserver' in window)) {
    return; // Graceful degradation
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
};

// ===========================
// Initialisation au chargement
// ===========================
const init = () => {
  try {
    updateYear();
    initSmoothScroll();
    initScrollAnimations();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
  }
};

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
