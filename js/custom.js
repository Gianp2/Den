// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // AOS Initialization - Configuración mejorada
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Hero Swiper - Configuración mejorada
    setTimeout(() => {
        const heroSwiper = new Swiper('.heroSwiper', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function() {
                    console.log('Swiper inicializado correctamente');
                    // Forzar visibilidad después de inicialización
                    setTimeout(() => {
                        document.querySelector('.hero-section').style.opacity = '1';
                        const slides = document.querySelectorAll('.hero-slide');
                        slides.forEach(slide => {
                            slide.style.opacity = '1';
                            slide.style.visibility = 'visible';
                        });
                    }, 100);
                },
                slideChange: function() {
                    AOS.refresh();
                }
            }
        });

        // Verificar que el swiper esté funcionando
        if (heroSwiper) {
            console.log('Hero Swiper funcionando');
        }
    }, 500);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Product Card Hover Effects - Con delay de animación
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Gallery Lightbox - Configuración mejorada
    Fancybox.bind("[data-fancybox]", {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: ["zoomIn", "zoomOut", "toggle1to1", "close"],
            },
        },
        Images: {
            initialSize: "fit",
        },
    });

    // Contact Form - Funcionalidad mejorada
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                this.innerHTML = `
                    <div class="alert alert-success text-center" role="alert">
                        <i class="fas fa-check-circle me-3"></i>
                        ¡Mensaje enviado exitosamente! 
                        <br><small>Te contactaremos en breve 💕</small>
                    </div>
                `;
                
                setTimeout(() => {
                    location.reload();
                }, 3500);
            }
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid', 'is-valid');
            });
        });
    }

    // Counter Animation for Stats - Mejorada
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 60;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for Stats - Configuración mejorada
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Image Loading Animation
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                imageObserver.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// PARALLAX SUAVIZADO - Completo
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroContent = document.querySelectorAll('.hero-content');
    const heroImages = document.querySelectorAll('.hero-img');
    const decorations = document.querySelectorAll('.decoration-element');
    const pagination = document.querySelector('.hero-pagination');
    const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');

    // Background parallax (más lento)
    if (heroBg) {
        const rate = scrolled * -0.4;
        heroBg.style.transform = `translateY(${rate}px) scale(${1 + (scrolled * 0.0002)})`;
    }

    // Slides parallax
    heroSlides.forEach(slide => {
        const rate = scrolled * -0.25;
        slide.style.transform = `translateY(${rate}px)`;
    });

    // Content parallax (más sutil)
    heroContent.forEach(content => {
        const rate = scrolled * -0.08;
        content.style.transform = `translateY(${rate}px)`;
    });

    // Images parallax (sutil)
    heroImages.forEach(img => {
        const rate = scrolled * -0.15;
        img.style.transform = `translateY(${rate}px)`;
    });

    // Decorations parallax con diferentes velocidades
    decorations.forEach((dec, index) => {
        const rates = [0.08, -0.12, 0.06, -0.1];
        const rate = scrolled * rates[index % rates.length];
        dec.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.005}deg)`;
    });

    // Pagination parallax
    if (pagination) {
        const rate = scrolled * -0.04;
        pagination.style.transform = `translateY(${rate}px)`;
    }

    // Navigation buttons parallax
    navButtons.forEach(button => {
        const rate = scrolled * -0.06;
        button.style.transform = `translateY(${rate}px)`;
    });

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Navbar Scroll Effect y Back to Top - Mejorado
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.parentElement.classList.add('scrolled');
    } else {
        navbar.parentElement.classList.remove('scrolled');
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Parallax effect
    requestTick();
    
    // Active nav link
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Función para el botón volver arriba - Mejorada
function scrollToTop() {
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    const scrollInterval = setInterval(() => {
        if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Mejora para el botón volver arriba
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });
    }
});

// Initialize AOS after short delay
setTimeout(() => {
    AOS.refresh();
}, 1000);

// CORREGIDO: Preloader con múltiples safeguards
// Método 1: Al cargar completamente
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 600);
        }
    }, 1800);
});

// Método 2: Al DOM Ready con timeout fijo
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar preloader después de 2 segundos máximo
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    }, 2000);
});

// Método 3: Ocultar preloader también cuando se cargue completamente
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }
});

// Método 4: Si el preloader sigue atascado, fuerza su eliminación después de 5 segundos
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
    }
}, 5000);

// Window Resize Handler
window.addEventListener('resize', function() {
    AOS.refresh();
    // Re-inicializar swiper si es necesario
    if (typeof heroSwiper !== 'undefined') {
        heroSwiper.update();
    }
});

// Performance Optimization: Debounce para resize y scroll
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

// Aplicar debounce al scroll si es necesario
const debouncedScroll = debounce(() => {
    requestTick();
}, 10);

window.addEventListener('scroll', debouncedScroll);