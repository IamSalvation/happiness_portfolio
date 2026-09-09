// ============================================
// PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) navLinks.classList.remove('show');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// TYPEWRITER - Style 3: Static Prefix + Static Suffix + Rewriting Middle
// ============================================
const typewriterElement = document.getElementById('typingText');
const phrases = [
    'healthcare providers',
    'streamline operations',
    'manage EHR systems',
    'coordinate patient care',
    'ensure HIPAA compliance',
    'deliver patient-centered support'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriterEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            typewriterTimeout = setTimeout(() => {
                isDeleting = true;
                typeWriterEffect();
            }, 2000);
            return;
        }
        typewriterTimeout = setTimeout(typeWriterEffect, 80);
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typewriterTimeout = setTimeout(typeWriterEffect, 400);
            return;
        }
        typewriterTimeout = setTimeout(typeWriterEffect, 40);
    }
}

setTimeout(typeWriterEffect, 800);

// ============================================
// GLOW TRAIL
// ============================================
const glowTrail = document.getElementById('glowTrail');
let glowTimeout;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    glowTrail.style.left = e.clientX + 'px';
    glowTrail.style.top = e.clientY + 'px';
    glowTrail.classList.add('active');

    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(() => {
        glowTrail.classList.remove('active');
    }, 3000);
});

document.addEventListener('mouseleave', () => {
    glowTrail.classList.remove('active');
});

// ============================================
// CUSTOM CURSOR
// ============================================
const customCursor = document.getElementById('customCursor');
let cursorTimeout;

if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        customCursor.classList.add('active');

        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            customCursor.classList.remove('active');
        }, 2000);
    });

    document.addEventListener('mouseleave', () => {
        customCursor.classList.remove('active');
    });

    document.querySelectorAll('a, .btn, .service-new, .testimonial-flip-card, .tilt-card, .work-card')
        .forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
            });
        });
}

// ============================================
// ECG / HEARTBEAT CANVAS ANIMATION
// ============================================
function initECG() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = Math.min(60, window.innerHeight * 0.06);
    let time = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = Math.min(60, window.innerHeight * 0.06);
    }

    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = '#3ECCC7';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(11, 188, 182, 0.15)';

        const startY = height / 2;
        ctx.moveTo(0, startY);

        for (let i = 0; i < width; i += 1.5) {
            const t = (i / width) * 20 + time;
            let y = startY;

            const phase = t % (2 * Math.PI);
            if (phase < 0.2) {
                y -= 8 * Math.sin(phase * 30);
            } else if (phase < 0.35) {
                const qrs = (phase - 0.2) / 0.15;
                y -= 25 * Math.sin(qrs * Math.PI);
            } else if (phase < 0.6) {
                const tw = (phase - 0.35) / 0.25;
                y -= 12 * Math.sin(tw * Math.PI);
            } else {
                y -= 2 * Math.sin(phase * 2);
            }

            y += (Math.random() - 0.5) * 1.5;
            ctx.lineTo(i, y);
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
        time += 0.03;
        requestAnimationFrame(draw);
    }

    draw();
}

// ============================================
// FLOATING MEDICAL ICONS (Rising from bottom)
// ============================================
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    if (window.innerWidth < 768) return;

    const icons = [
        'fa-calendar-check', 'fa-file-medical', 'fa-user-md',
        'fa-check-shield', 'fa-phone-medical', 'fa-clipboard-list',
        'fa-notes-medical', 'fa-calendar-alt'
    ];

    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 14 + 10;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 12;
        const drift = (Math.random() - 0.5) * 250;
        const opacity = Math.random() * 0.15 + 0.05;
        const color = ['#0BBCB6', '#3ECCC7', '#FFFFFF'][Math.floor(Math.random() * 3)];

        particle.innerHTML = `<i class="fas ${icon}" style="color:${color};font-size:${size}px;"></i>`;
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            --duration: ${duration}s;
            --delay: ${delay}s;
            --drift: ${drift}px;
            --opacity: ${opacity};
            animation-delay: ${delay}s;
        `;

        container.appendChild(particle);
    }
}

// ============================================
// 3D TILT
// ============================================
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.setProperty('--rotateX', rotateX + 'deg');
        card.style.setProperty('--rotateY', rotateY + 'deg');
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
    });
});

// ============================================
// BUTTON RIPPLE
// ============================================
document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: width 0.6s ease, height 0.6s ease;
        `;
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
        }, 10);
        setTimeout(() => {
            ripple.remove();
        }, 700);
    });
});

// ============================================
// ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// STATS COUNTER (Hero stats)
// ============================================
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                entry.target.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target + suffix;
                }
            }
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// TRUST BADGE COUNTERS
// ============================================
const trustNumbers = document.querySelectorAll('.trust-number');

const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            const suffix = entry.target.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateTrustNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                entry.target.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateTrustNumber);
                } else {
                    entry.target.textContent = target + suffix;
                }
            }
            requestAnimationFrame(updateTrustNumber);
            trustObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

trustNumbers.forEach(num => {
    trustObserver.observe(num);
});

// ============================================
// WORK SAMPLES CAROUSEL - CONTINUOUS SCROLLING (SPEED MATCHED TO AISOSA)
// ============================================
document.addEventListener('DOMContentLoaded', () => {

    const workTrack = document.getElementById('workTrack');
    const workPrev = document.getElementById('workPrev');
    const workNext = document.getElementById('workNext');

    if (!workTrack) return;

    // Duplicate all cards for seamless infinite scrolling
    const originalCards = Array.from(
        workTrack.querySelectorAll('.work-card')
    );

    originalCards.forEach(card => {
        workTrack.appendChild(card.cloneNode(true));
    });

    // Calculate the width of the original set
    let originalWidth = 0;

    function calculateWidth() {
        const cards = workTrack.querySelectorAll('.work-card');
        const half = cards.length / 2;

        originalWidth = 0;

        for (let i = 0; i < half; i++) {
            originalWidth += cards[i].offsetWidth;

            if (i < half - 1) {
                originalWidth += 24; // gap
            }
        }
    }

    calculateWidth();

    // Continuous animation - duration: 40 matches Aisosa's speed
    let animation = gsap.to(workTrack, {
        x: -originalWidth,
        duration: 80,  // ✅ Matches Aisosa's speed exactly
        ease: "none",
        repeat: -1
    });

    // Pause when hovering
    const wrapper = workTrack.closest('.work-carousel-wrapper');

    if (wrapper) {

        wrapper.addEventListener('mouseenter', () => {
            animation.pause();
        });

        wrapper.addEventListener('mouseleave', () => {
            animation.resume();
        });
    }

    // NEXT BUTTON
    if (workNext) {

        workNext.addEventListener('click', () => {

            animation.pause();

            gsap.to(workTrack, {
                x: `-=${workTrack.querySelector('.work-card').offsetWidth + 24}`,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    animation.resume();
                }
            });

        });
    }

    // PREVIOUS BUTTON
    if (workPrev) {

        workPrev.addEventListener('click', () => {

            animation.pause();

            gsap.to(workTrack, {
                x: `+=${workTrack.querySelector('.work-card').offsetWidth + 24}`,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    animation.resume();
                }
            });

        });
    }

    // Recalculate on resize
    window.addEventListener('resize', () => {

        animation.kill();

        calculateWidth();

        gsap.set(workTrack, { x: 0 });

        animation = gsap.to(workTrack, {
            x: -originalWidth,
            duration: 40,  // ✅ Matches Aisosa's speed exactly
            ease: "none",
            repeat: -1
        });

    });

});

// ============================================
// TESTIMONIALS FLIP CARD CAROUSEL
// ============================================
(function initFlipCarousel() {
    const track = document.getElementById('testimonialTrack');
    const cards = track ? track.querySelectorAll('.testimonial-flip-card') : [];
    const totalCards = cards.length;
    const dotsContainer = document.getElementById('flipDots');
    let currentIndex = 0;
    let itemsPerView = 1;
    let autoSlideInterval;
    let isTransitioning = false;

    function getItemsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    // Flip card on click
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.flip-carousel-btn')) return;
            this.classList.toggle('flipped');
        });
    });

    function createDots() {
        if (!dotsContainer) return;
        const totalDots = Math.ceil(totalCards / getItemsPerView());
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', function () {
                goToSlide(i * getItemsPerView());
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        if (!track) return;
        if (isTransitioning) return;
        isTransitioning = true;

        itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, totalCards - itemsPerView);
        currentIndex = Math.min(index, maxIndex);
        if (currentIndex < 0) currentIndex = 0;

        const gap = 30;
        const cardWidth = cards[0] ? cards[0].offsetWidth : 300;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        const activeDotIndex = Math.floor(currentIndex / itemsPerView);
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === activeDotIndex);
        });

        setTimeout(function () {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, totalCards - itemsPerView);
        if (currentIndex + itemsPerView >= maxIndex) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + itemsPerView);
        }
    }

    function prevSlide() {
        itemsPerView = getItemsPerView();
        if (currentIndex - itemsPerView < 0) {
            const maxIndex = Math.max(0, totalCards - itemsPerView);
            goToSlide(maxIndex);
        } else {
            goToSlide(currentIndex - itemsPerView);
        }
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }

    if (track && cards.length > 0) {
        createDots();
        setTimeout(function () {
            goToSlide(0);
        }, 100);
        startAutoSlide();

        const prevBtn = document.getElementById('flipPrev');
        const nextBtn = document.getElementById('flipNext');
        if (prevBtn) prevBtn.addEventListener('click', function () {
            prevSlide();
            resetAutoSlide();
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
            nextSlide();
            resetAutoSlide();
        });

        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                createDots();
                goToSlide(currentIndex);
                resetAutoSlide();
            }, 300);
        });

        const container = document.querySelector('.testimonial-flip-container');
        if (container) {
            container.addEventListener('mouseenter', function () {
                clearInterval(autoSlideInterval);
            });
            container.addEventListener('mouseleave', function () {
                startAutoSlide();
            });
        }
    }
})();

// ============================================
// FLOATING BUTTONS - BACK TO TOP & SCHEDULE
// ============================================
const backToTopBtn = document.getElementById('backToTop');
const scheduleBtn = document.getElementById('scheduleBtn');

// Show/hide both buttons on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
        scheduleBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
        scheduleBtn.classList.remove('visible');
    }
});

// Back to Top - smooth scroll to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Schedule Button - open Calendly in new tab
scheduleBtn.addEventListener('click', () => {
    window.open('https://calendly.com/yakubuhappiness492', '_blank');
});

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        const btn = this.querySelector('.btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setTimeout(initECG, 500);

    let particleTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(particleTimeout);
        particleTimeout = setTimeout(function () {
            const container = document.getElementById('particlesContainer');
            if (container) container.innerHTML = '';
            createParticles();
        }, 500);
    });
});

// ============================================
// CONSOLE
// ============================================
console.log('💚 Happiness Yakubu · HIPAA Certified Medical Virtual Assistant');
console.log('✅ Features: Inter + Lora fonts, Teal color palette, Style 3 Typewriter, Continuous Carousel, Flip Card Testimonials');
console.log('📊 Stats: 1+ Year MVA Experience · 4 Certifications · 25% Booking Increase');
console.log('🎨 Colors: Teal #0BBCB6 · Dark Hero Background with Subtle Moving Gradient');
console.log('📞 Contact: yakubuhappiness492@gmail.com | +234 913 797 9812');
console.log('🔗 LinkedIn: linkedin.com/in/happiness-yakubu-70aaa630a');
console.log('📋 Services: Patient Scheduling, EHR Management, Insurance Verification, Prior Authorization');
console.log('💬 Testimonials: 7 flip cards tailored from her experience');
console.log('📝 Formspree: Connected & ready');
console.log('✨ Typewriter Style 3: Static prefix + Static suffix + Rewriting middle');
console.log('🔄 Tools Marquee: Continuous scrolling with pause on hover');
console.log('🩺 ECG + Rising Icons: Administrative healthcare icons');
console.log('📸 Work Samples: 12 items with 4:3 aspect ratio (like Aisosa)');
console.log('📌 Floating Buttons: Back to Top (right) + Schedule (left)');
console.log('🔄 Work Carousel: Fixed continuous scrolling with seamless loop');
console.log('⏱️ Work Carousel Speed: 40 seconds (exactly matches Aisosa)');