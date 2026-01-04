// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ===== Firebase Configuration =====
    const firebaseConfig = {
        apiKey: "AIzaSyAXpr2DkpL3yxW8_mPcYCtVWR5k5DOHMsw",
        authDomain: "my-portfolio-counter-863d7.firebaseapp.com",
        databaseURL: "https://my-portfolio-counter-863d7-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "my-portfolio-counter-863d7",
        storageBucket: "my-portfolio-counter-863d7.firebasestorage.app",
        messagingSenderId: "801274790374",
        appId: "1:801274790374:web:56a6c283c005f6e9e99627"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // ===== Visitor Counter =====
    const visitorCounter = document.getElementById('visitorCount');
    if (visitorCounter) {
        const counterRef = database.ref('visitorCount');

        // Get the current count from Firebase
        counterRef.transaction((currentCount) => {
            // If there's no count in the database, start from 1
            return (currentCount || 0) + 1;
        }, (error, committed, snapshot) => {
            if (error) {
                console.error('Transaction failed: ', error);
                return;
            }

            if (committed) {
                const count = snapshot.val();
                // Animate the counter
                const target = count;
                const duration = 2000; // 2 seconds
                const step = Math.max(1, Math.ceil(target / (duration / 16))); // 60fps, minimum step of 1

                let current = 0;
                const counterText = visitorCounter.querySelector('span');
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    // Update only the number part
                    counterText.textContent = current.toLocaleString('fr-FR');

                    if (current >= target) {
                        clearInterval(timer);
                    }
                }, 16);
            }
        });
    }

    // ===== Preloader =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Animate Elements on Scroll =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // ===== Typing Effect =====
    const typedTextSpan = document.querySelector('.animated-text .text');
    if (typedTextSpan) {
        const textArray = [
            "مصمم جرافيك",
            "مطور تطبيقات",
            "مصمم واجهات",
            "أبرمج تطبيقات ومواقع",
            "أصمم هويات بصرية",
            "أصمم واجهات UI/UX",
            "أصمم محتوى سوشيال ميديا"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = textArray[textArrayIndex];

            if (isDeleting) {
                typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, newTextDelay);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(type, isDeleting ? erasingDelay : typingDelay);
            }
        }

        // Start typing effect after a delay
        setTimeout(type, 1000);
    }

    // ===== Skills Tabs =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // ===== Portfolio Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const formMessage = document.getElementById('form-message');

            // Simple validation
            let isValid = true;

            if (name.value.trim() === '') {
                showError(name, 'الرجاء إدخال الاسم');
                isValid = false;
            } else {
                showSuccess(name);
            }

            if (email.value.trim() === '') {
                showError(email, 'الرجاء إدخال البريد الإلكتروني');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'البريد الإلكتروني غير صالح');
                isValid = false;
            } else {
                showSuccess(email);
            }

            if (subject.value.trim() === '') {
                showError(subject, 'الرجاء إدخال موضوع الرسالة');
                isValid = false;
            } else {
                showSuccess(subject);
            }

            if (message.value.trim() === '') {
                showError(message, 'الرجاء إدخال نص الرسالة');
                isValid = false;
            } else {
                showSuccess(message);
            }

            // If form is valid, submit it (you can replace this with your actual form submission logic)
            if (isValid) {
                // Show success message
                formMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                formMessage.className = 'form-message success';

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }
        });

        // Helper function to show error
        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.className = 'form-group error';
            const errorMsg = formGroup.querySelector('.error-message') || document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.textContent = message;
            formGroup.appendChild(errorMsg);
        }

        // Helper function to show success
        function showSuccess(input) {
            const formGroup = input.parentElement;
            formGroup.className = 'form-group success';
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }

        // Email validation
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                if (this.value.trim() !== '') {
                    showSuccess(this);
                }
            });
        });
    }

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }

    // Start counter when element is in viewport
    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    };

    // Create Intersection Observer
    const counterObserver = new IntersectionObserver(startCounter, {
        threshold: 0.5
    });

    // Observe all counter elements
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== Cursor Effect =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Move cursor
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
            cursorFollower.style.transform = `translate3d(${posX - 10}px, ${posY - 10}px, 0)`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor hover effects
        const hoverElements = ['a', 'button', 'input', 'textarea', '.btn', '.portfolio-item', '.skill-item'];

        hoverElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('cursor-hover');
                    cursorFollower.classList.add('cursor-follower-hover');
                });

                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-hover');
                    cursorFollower.classList.remove('cursor-follower-hover');
                });
            });
        });
    }

    // ===== Scroll Reveal Animation =====
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 500,
        delay: 100,
        reset: false
    });

    // Reveal elements
    sr.reveal('.section-header', { origin: 'top' });
    sr.reveal('.hero-text', { origin: 'right', delay: 200 });
    sr.reveal('.hero-image', { origin: 'left', delay: 300 });
    sr.reveal('.about-content', { interval: 100 });
    sr.reveal('.skill-item', { interval: 75 });
    sr.reveal('.portfolio-item', { interval: 100 });
    sr.reveal('.contact-info', { origin: 'left' });
    sr.reveal('.contact-form', { origin: 'right', delay: 100 });

    // ===== Add animation class on scroll =====
    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    });
});

// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Run on initial load
    updateActiveLink();

    // Run on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust offset if you have a fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


document.addEventListener("DOMContentLoaded", () => {
    const lazyBackgrounds = document.querySelectorAll("[data-bg]");
    lazyBackgrounds.forEach(el => {
        const img = new Image();
        img.src = el.dataset.bg;
        img.onload = () => el.classList.add("loaded");
    });
});



