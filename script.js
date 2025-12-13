// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Reveal on Scroll Animation =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

// Add reveal class to sections and observe them
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== Staggered Animation for Grid Items =====
document.querySelectorAll('.features-grid, .testimonials-grid, .pricing-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.reveal');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ===== Phone Screen Animation =====
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isK = finalValue.includes('K');
        
        let numericValue;
        if (isK) {
            numericValue = parseFloat(finalValue.replace('K', '')) * 1000;
        } else if (isPercentage) {
            numericValue = parseFloat(finalValue);
        } else {
            numericValue = parseInt(finalValue.replace(/,/g, ''));
        }
        
        // Don't animate if not a number
        if (isNaN(numericValue)) return;
        
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        const stepDuration = duration / steps;
        
        const animate = () => {
            current += increment;
            if (current >= numericValue) {
                stat.textContent = finalValue;
                return;
            }
            
            if (isK) {
                stat.textContent = (current / 1000).toFixed(1) + 'K';
            } else if (isPercentage) {
                stat.textContent = current.toFixed(1) + '%';
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
            
            requestAnimationFrame(() => setTimeout(animate, stepDuration));
        };
        
        animate();
    });
};

// Run stats animation when phone comes into view
const phoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            phoneObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneObserver.observe(phoneMockup);
}

// ===== Chart Bars Animation =====
const animateBars = () => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        bar.style.transition = `transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
        }, 100);
    });
};

// Run bar animation when chart comes into view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateBars();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const chartPreview = document.querySelector('.chart-preview');
if (chartPreview) {
    chartObserver.observe(chartPreview);
}

// ===== Parallax Effect for Orbs =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const orbs = document.querySelectorAll('.orb');
            
            orbs.forEach((orb, index) => {
                const speed = 0.05 + (index * 0.02);
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Mouse Glow Effect =====
const createGlowEffect = () => {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(91, 196, 241, 0.12) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    const animateGlow = () => {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    };
    
    animateGlow();
};

// Only enable glow on desktop
if (window.matchMedia('(min-width: 1024px)').matches) {
    createGlowEffect();
}

// ===== Button Ripple Effect =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    document.body.classList.add('loaded');
});

