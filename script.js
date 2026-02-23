
const cursor = document.querySelector(".gaming-cursor");
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

    ring.style.left = mouseX + "px";
    ring.style.top = mouseY + "px";
});

/* Hover grow effect */
const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
    });
});

// ===================================
// MATRIX RAIN BACKGROUND EFFECT
// ===================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const matrix = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff0055';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// TYPEWRITER EFFECT
// ===================================
const typewriter = document.getElementById('typewriter');
const texts = [
    'DOMINATE THE BATTLEFIELD',
    'BECOME A LEGEND',
    'UNLEASH YOUR POTENTIAL',
    'JOIN THE ELITE'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

setTimeout(type, 1000);

// ===================================
// HERO STATS COUNTER
// ===================================
const heroStats = document.querySelectorAll('.hero .stat-value');
let heroAnimated = false;

function animateHeroStats() {
    heroStats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target) {
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        }
    });
}

// Trigger on page load
setTimeout(() => {
    if (!heroAnimated) {
        animateHeroStats();
        heroAnimated = true;
    }
}, 500);

// ===================================
// TOURNAMENT COUNTDOWN TIMER
// ===================================
const countdown = document.getElementById('countdown');

if (countdown) {
    // Set tournament date (March 15, 2026)
    const tournamentDate = new Date('2026-03-15T18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = tournamentDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// TOURNAMENT STATS COUNTER
// ===================================
const tournamentStats = document.querySelectorAll('.tournament-stats .stat-number');
let tournamentStatsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !tournamentStatsAnimated) {
            tournamentStatsAnimated = true;
            
            tournamentStats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (target) {
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                }
            });
        }
    });
}, { threshold: 0.5 });

const tournamentSection = document.querySelector('.tournaments');
if (tournamentSection) {
    statsObserver.observe(tournamentSection);
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================
const testimonialsSlider = document.getElementById('testimonialsSlider');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonialsSlider) {
    const testimonialCards = testimonialsSlider.querySelectorAll('.testimonial-card');
    let currentSlide = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDots.appendChild(dot);
    });

    const dots = testimonialDots.querySelectorAll('.dot');

    function updateSlider() {
        testimonialsSlider.style.transform = 
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = 
            (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    }

    nextTestimonial.addEventListener('click', nextSlide);
    prevTestimonial.addEventListener('click', prevSlide);

    // Auto-play
    let autoplay = setInterval(nextSlide, 5000);

    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    testimonialsSlider.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
    });
}
// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        return emailRegex.test(email.trim());
    }
    
    function validateSelect(value) {
        return value !== '';
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Show error
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-msg');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }
    
    // Clear error
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }
    
    // Validate input
    function validateInput(input) {
        const value = input.value;
        let isValid = true;
        
        switch (input.id) {
            case 'name':
                if (!validateName(value)) {
                    showError(input, 'Gamer tag must be at least 2 characters');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    showError(input, 'Please enter a valid email');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
            case 'game':
            case 'rank':
                if (!validateSelect(value)) {
                    showError(input, 'Please make a selection');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
            case 'message':
                if (!validateMessage(value)) {
                    showError(input, 'Message must be at least 10 characters');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
        }
        
        return isValid;
    }
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value) {
                validateInput(input);
            }
        });
        
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                clearError(input);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            
            // Simulate submission
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                formSuccess.classList.add('show');
                contactForm.reset();
                
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 2000);
        }
    });
}

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// GAME CARDS PARALLAX TILT EFFECT
// ===================================
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// PLAYER CARDS HOVER EFFECT
// ===================================
const playerCards = document.querySelectorAll('.player-card');

playerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.player-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.player-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', optimizedScroll);
// ===============================
// SCROLL TO TOP
// ===============================

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Navigate testimonials with arrow keys
    if (testimonialsSlider && document.activeElement.closest('.testimonials-wrapper')) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial.click();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial.click();
        }
    }
    
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 0;
    background: #ff0055;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    z-index: 10000;
    font-weight: 700;
    letter-spacing: 2px;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero .fade-in-up');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 100);
    });
});

// ===================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ===================================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Optional: Add custom cursor for gaming feel
// Uncomment if desired
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #ff0055;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.1s;
    box-shadow: 0 0 10px rgba(255, 0, 85, 0.6);
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});
*/

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c██████╗ ██╗   ██╗████████╗███████╗    ██████╗  █████╗  ██████╗██╗  ██╗███████╗██╗      ██████╗ ██████╗ ', 'color: #ff0055; font-weight: bold;');
console.log('%c██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝██║     ██╔═══██╗██╔══██╗', 'color: #ff0055; font-weight: bold;');
console.log('%c██████╔╝ ╚████╔╝    ██║   █████╗      ██████╔╝███████║██║     ███████║█████╗  ██║     ██║   ██║██████╔╝', 'color: #ff0055; font-weight: bold;');
console.log('%c██╔══██╗  ╚██╔╝     ██║   ██╔══╝      ██╔══██╗██╔══██║██║     ██╔══██║██╔══╝  ██║     ██║   ██║██╔══██╗', 'color: #ff0055; font-weight: bold;');
console.log('%c██████╔╝   ██║      ██║   ███████╗    ██████╔╝██║  ██║╚██████╗██║  ██║███████╗███████╗╚██████╔╝██║  ██║', 'color: #ff0055; font-weight: bold;');
console.log('%c╚═════╝    ╚═╝      ╚═╝   ╚══════╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝', 'color: #ff0055; font-weight: bold;');
console.log('%cGAMING', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
console.log('%c→ Ready to dominate? Join us now!', 'color: #b400ff; font-size: 14px;');
console.log('%c→ Built with HTML5 | CSS3 | Vanilla JavaScript', 'color: #39ff14; font-size: 12px;');
