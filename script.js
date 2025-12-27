
// بطاقة الصفحات
const cardTabs = document.querySelectorAll('.card-tab');
const cardPages = document.querySelectorAll('.card-page');

function setActivePage(pageId) {
    cardTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.page === pageId);
    });
    cardPages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });
}

cardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        setActivePage(tab.dataset.page);
    });
});

document.querySelectorAll('[data-page]').forEach(trigger => {
    trigger.addEventListener('click', event => {
        event.preventDefault();
        const pageId = trigger.getAttribute('data-page');
        if (pageId) {
            setActivePage(pageId);
        }
    });
});

// Typing effect
const typedTextSpan = document.getElementById('typed-text');
const textArray = ["مصمم جرافيك", "مطور تطبيقات", "مصمم واجهات"];
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

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typedTextSpan) {
        setTimeout(type, newTextDelay);
    }
});
