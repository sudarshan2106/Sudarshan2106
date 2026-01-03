// Initialize EmailJS
(function () {
    // IMPORTANT: Replace these with your actual EmailJS keys
    // Sign up at https://www.emailjs.com/
    emailjs.init("9TPm6EXoIqIiD5CfB");
})();

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Typed.js Animation
const typed = new Typed('.typing-text', {
    strings: ['Developer', 'Designer', 'Freelancer', 'Innovator'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);

    if (newTheme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    gsap.to(follower, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3
    });
});

// Hover effects for cursor
const linkElements = document.querySelectorAll('a, button, .project-card, .skill-item');

linkElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
        follower.classList.add('cursor-active');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        follower.classList.remove('cursor-active');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Parallax
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 200
});

// Skills Progress Animation
gsap.utils.toArray('.progress').forEach(bar => {
    gsap.from(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
        },
        width: 0,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.5)';
        navbar.style.padding = '20px 0';
    }
});

// Contact Form Validation & EmailJS
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    // Replace these with your actual Service ID and Template ID
    const serviceID = 'service_phicwmp';
    const templateID = 'template_wyg49tn';

    emailjs.sendForm(serviceID, templateID, contactForm)
        .then(() => {
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#00ff00';
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        }, (err) => {
            btn.innerHTML = 'Failed! <i class="fas fa-times"></i>';
            btn.style.background = '#ff0000';
            console.error('EmailJS Error:', err);
            alert('Failed to send message. Please check your EmailJS configuration.');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
});
