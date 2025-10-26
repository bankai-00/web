document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    const navLinks = document.getElementById('site-nav-links');

    // Scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all elements with reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
        observer.observe(element);
    });

    function openMenu(){
        nav.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        // focus first link for keyboard users
        const first = navLinks.querySelector('a');
        if(first) first.focus();
    }

    function closeMenu(){
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }

    menuToggle.addEventListener('click', (e) => {
        // ripple effect: expand pseudo-element by toggling width/height via inline styles
        const rect = menuToggle.getBoundingClientRect();
        const ripple = menuToggle; // using ::after in CSS, just toggle quickly
        // trigger CSS animation by toggling a class
        menuToggle.classList.remove('ripple-active');
        // force reflow
        void menuToggle.offsetWidth;
        menuToggle.classList.add('ripple-active');

        if(nav.classList.contains('open')){
            closeMenu();
        } else {
            openMenu();
        }
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')){
            closeMenu();
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600 && nav.classList.contains('open')) {
            closeMenu();
        }
    });
});
