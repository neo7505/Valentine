// ================================
// Proposal Website Script
// Works with Vite + Vercel
// ================================

// State
let currentCard = 1;
const totalCards = 9;

// EmailJS Config
const SERVICE_ID = "service_3nskfn7";
const TEMPLATE_ID = "template_relfig9";

// --------------------
// Card Navigation
// --------------------
function showCard(cardIndex) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.classList.remove('prev');
    });

    for (let i = 1; i < cardIndex; i++) {
        const prev = document.getElementById(`card-${i}`);
        if (prev) prev.classList.add('prev');
    }

    const active = document.getElementById(`card-${cardIndex}`);
    if (active) active.classList.add('active');

    currentCard = cardIndex;
}

// --------------------
// Attach Events AFTER DOM Ready
// --------------------
function initProposalSite() {

    // NEXT buttons
    document.querySelectorAll('[data-next-card]').forEach(btn => {
        btn.addEventListener('click', () => {
            const next = parseInt(btn.dataset.nextCard);
            showCard(next);
        });
    });

    // YES button
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (window.confetti) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#e88d8d', '#ffffff', '#ffeb3b']
                });
            }
            showCard(9);
        });
    }

    // NO button (runaway 😄)
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        const moveNoButton = () => {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        };

        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', e => {
            e.preventDefault();
            moveNoButton();
        });
        noBtn.addEventListener('touchstart', e => {
            e.preventDefault();
            moveNoButton();
        });
    }

    // --------------------
    // Email Form
    // --------------------
    const form = document.getElementById('message-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const btn = form.querySelector('button');
            const msgBox = document.getElementById('feedback-msg');
            const message = document.getElementById('message').value;

            btn.innerText = "Sending...";
            btn.disabled = true;

            const params = {
                from_name: "Shraddha",
                message: message,
                reply_to: "Shraddha"
            };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
                .then(() => {
                    btn.innerText = "Sent! ❤️";
                    msgBox.innerText = "Message sent successfully!";
                    msgBox.style.color = "green";
                    form.reset();
                })
                .catch(error => {
                    console.error(error);
                    btn.innerText = "Try Again";
                    btn.disabled = false;
                    msgBox.innerText = "Failed to send. But I love you anyway!";
                    msgBox.style.color = "red";
                });
        });
    }

    // --- Floating Hearts Generator ---
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = Math.random() > 0.6 ? '❤️' : (Math.random() > 0.5 ? '✨' : '🌸'); 
        
        // Use percentage for horizontal position relative to container
        heart.style.left = Math.random() * 100 + '%';
        
        // Random Size (keep rem for consistency)
        const size = Math.random() * 1.5 + 0.5;
        heart.style.fontSize = size + 'rem';
        
        const duration = Math.random() * 5 + 10;
        heart.style.animationDuration = duration + 's';
        
        const cardContainer = document.querySelector('.card-container');
        if (cardContainer) {
            cardContainer.appendChild(heart);
        }

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Spawn hearts every 800ms
    setInterval(createFloatingHeart, 800);
}

// --------------------
// Confetti Script Load
// --------------------
const confettiScript = document.createElement('script');
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.body.appendChild(confettiScript);

// --------------------
// Init safely for Vite
// --------------------
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProposalSite);
} else {
    initProposalSite();
}
