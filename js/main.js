// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Create Lenis instance
let lenis;

// Initialize smooth scrolling
function initSmoothScrolling() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Start the animation frame loop
    requestAnimationFrame(raf);

    // Bind Lenis scroll events with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    // Add scroll listener for debugging
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        console.log({ scroll, limit, velocity, direction, progress });
    });

    // Set up GSAP ScrollTrigger default config
    ScrollTrigger.defaults({
        scroller: document.documentElement
    });

    // Update ScrollTrigger on Lenis scroll
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Stop Lenis scroll while GSAP is scrolling
    gsap.ticker.lagSmoothing(0);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling
    initSmoothScrolling();

    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.hero-content', 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.5
        }
    );

    // Parallax effect for hero background
    gsap.to('.hero-background', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true
        }
    });

    // Staggered text animations
    const heroElements = gsap.utils.toArray('.hero-content > *');
    heroElements.forEach((element, index) => {
        const speed = element.dataset.speed || 1;
        
        gsap.to(element, {
            y: `-${30 * speed}`,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
                invalidateOnRefresh: true
            }
        });
    });

    // Mobile Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            console.log('Burger menu clicked'); // Debug log
            burgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    } else {
        console.error('Burger menu or main nav elements not found'); // Debug log
    }
});

// Cart functionality
let cart = [];

function updateCartIcon() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        
        gsap.from(cartCount, {
            scale: 1.5,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('RON ', ''));
        
        cart.push({
            id: productId,
            name: productName,
            price: productPrice
        });
        
        updateCartIcon();
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'add-to-cart-message';
        message.textContent = 'Produs adăugat în coș!';
        document.body.appendChild(message);
        
        const messageTl = gsap.timeline();
        
        messageTl
            .fromTo(message, 
                { 
                    y: 50, 
                    opacity: 0,
                    scale: 0.8
                },
                { 
                    y: 0, 
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out'
                }
            )
            .to(message, {
                y: -50,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
                delay: 1.5,
                onComplete: () => message.remove()
            });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -70,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});
