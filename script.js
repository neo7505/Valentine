let currentCard = 1;
const totalCards = 9;

// EmailJS Configuration
// REPLACE THESE WITH YOUR ACTUAL KEYS IF NOT ALREADY DONE IN HTML OR HERE
const SERVICE_ID = "service_3nskfn7";
const TEMPLATE_ID = "template_r8uhvgh"; // Need to replace
// Public Key is initialized in HTML head

function showCard(cardIndex) {
    // Hide all cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.classList.remove('prev');
    });

    // Mark previous cards as 'prev' for exit animation
    for (let i = 1; i < cardIndex; i++) {
        const prevCard = document.getElementById(`card-${i}`);
        if (prevCard) prevCard.classList.add('prev');
    }

    // Show current card
    const activeCard = document.getElementById(`card-${cardIndex}`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
    
    currentCard = cardIndex;
}

function nextCard(cardIndex) {
    showCard(cardIndex);
}

function handleYes() {
    // Confetti effect!
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e88d8d', '#ffffff', '#ffeb3b']
    });
    
    // Go to next card (celebration/form)
    nextCard(9);
}

function moveNoButton() {
    const btn = document.getElementById('no-btn');
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100; // -100 to 100
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

// Add touch/click support for moving button on mobile
document.getElementById('no-btn').addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

document.getElementById('no-btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function sendEmail(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    const msgBox = document.getElementById('feedback-msg');
    const message = document.getElementById('message').value;

    btn.innerText = "Sending...";
    btn.disabled = true;

    // Parameters must match your EmailJS Template variables (e.g., {{message}}, {{from_name}})
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
            document.getElementById('message').value = "";
        }, (error) => {
            console.error('FAILED...', error);
            btn.innerText = "Try Again";
            btn.disabled = false;
            msgBox.innerText = "Failed to send (Check keys). But I love you anyway!";
            msgBox.style.color = "red";
        });
}

// Import Confetti (using a simple CDN-less implementation or relying on external script)
// Adding external script for confetti dynamically
const confettiScript = document.createElement('script');
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.body.appendChild(confettiScript);
