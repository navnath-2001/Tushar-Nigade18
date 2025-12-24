// ===================================
// Animated Resume Dashboard - Main JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Initialize all features
    // ===================================
    initParticles();
    initSkillBars();
    initCounters();
    initScrollAnimations();
    initSmoothScroll();
    
    console.log('Resume Dashboard Loaded Successfully!');
});

// ===================================
// Animated Background Particles
// ===================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Apply styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 212, 255, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add particle animation keyframes dynamically
if (!document.getElementById('particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(20px, -30px) scale(1.2);
                opacity: 0.6;
            }
            50% {
                transform: translate(-15px, -60px) scale(0.8);
                opacity: 0.4;
            }
            75% {
                transform: translate(30px, -40px) scale(1.1);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Skill Bars Animation
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress') + '%';
                
                // Animate width
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// Counter Animation for Metrics
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.profile-card, .timeline-item, .skill-item, .soft-skill-item, ' +
        '.cert-card, .metric-card, .achievement-card, .value-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation to prevent re-triggering
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// ===================================
// Smooth Scroll for Navigation
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Parallax Effect on Scroll
// ===================================
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hero section parallax
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    // Update scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        // Scrolling up
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop;
    
    // Hide scroll indicator after scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
    } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
    }
});

// ===================================
// Enhanced Hover Effects
// ===================================
document.addEventListener('mousemove', function(e) {
    // Card tilt effect on mouse move
    const cards = document.querySelectorAll('.profile-card, .achievement-card, .value-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }
    });
});

// Reset card transforms when mouse leaves
document.querySelectorAll('.profile-card, .achievement-card, .value-card').forEach(card => {
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===================================
// Timeline Animation on Scroll
// ===================================
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline::before');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => observer.observe(item));
}

// Initialize timeline animation
animateTimeline();

// ===================================
// Dynamic Text Animation (Optional)
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// Loading Screen (Optional)
// ===================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any post-load animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'scale(1)';
        }
    }, 100);
});

// ===================================
// Skills Data (for potential dynamic rendering)
// ===================================
const skillsData = {
    technical: [
        { name: 'QGIS', level: 90, icon: 'fa-map-marked-alt' },
        { name: 'ArcGIS', level: 85, icon: 'fa-globe-americas' },
        { name: 'ERDAS Imagine', level: 80, icon: 'fa-satellite' },
        { name: 'PostGIS', level: 75, icon: 'fa-database' },
        { name: 'Google Earth Engine', level: 82, icon: 'fa-cloud' },
        { name: 'AutoCAD', level: 78, icon: 'fa-drafting-compass' }
    ],
    programming: [
        { name: 'Python', level: 85, icon: 'fab fa-python' },
        { name: 'PostgreSQL', level: 80, icon: 'fa-database' },
        { name: 'HTML', level: 88, icon: 'fab fa-html5' },
        { name: 'C++', level: 75, icon: 'fa-code' },
        { name: 'DBMS', level: 82, icon: 'fa-server' }
    ],
    soft: [
        { name: 'Teamwork', icon: 'fa-users-cog' },
        { name: 'Project Management', icon: 'fa-tasks' },
        { name: 'Learning Agility', icon: 'fa-brain' },
        { name: 'Communication', icon: 'fa-comments' },
        { name: 'Time Management', icon: 'fa-clock' },
        { name: 'Problem Solving', icon: 'fa-lightbulb' },
        { name: 'Data Analysis', icon: 'fa-chart-line' }
    ]
};

// ===================================
// Print Functionality
// ===================================
function printResume() {
    window.print();
}

// Add keyboard shortcut for print (Ctrl+P)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printResume();
    }
});

// ===================================
// Accessibility Improvements
// ===================================
// Add keyboard navigation support
document.querySelectorAll('.contact-item, .cta-button, .social-icon').forEach(element => {
    element.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
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

// Use debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll handling can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ===================================
// Interactive Elements Feedback
// ===================================
// Add ripple effect on button clicks
document.querySelectorAll('.cta-button, .contact-item').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes rippleEffect {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Console Art (Fun touch!)
// ===================================
console.log('%c🗺️ Tushar Nigade - GIS Analyst', 
    'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cProfessional Resume Dashboard', 
    'font-size: 14px; color: #00a86b;');
console.log('%cGeospatial Analysis | Spatial Data Expert | Geoinformatics', 
    'font-size: 12px; color: #7a8a9e;');
console.log('%c💼 Open to opportunities | Let\'s connect!', 
    'font-size: 12px; color: #0066cc; font-weight: bold;');
console.log('%c📧 tusharnigade18@gmail.com', 
    'font-size: 11px; color: #b8c5d6;');
console.log('%c🔗 linkedin.com/in/tushar-nigade18', 
    'font-size: 11px; color: #b8c5d6;');

// ===================================
// Export for potential use
// ===================================
window.ResumeApp = {
    skillsData,
    animateCounter,
    typeWriter,
    printResume
};
