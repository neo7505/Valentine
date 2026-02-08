let currentCard = 1;
const totalCards = 5;

// Receiver Email
const TARGET_EMAIL = "chitrankarramanandi86@gmai.com";

function sendEmail(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const msgBox = document.getElementById('feedback-msg');
    const message = document.getElementById('message').value;

    btn.innerText = "Opening Email...";
    
    // Construct Mailto Link
    const subject = encodeURIComponent("Proposal Response from Shraddha via Website");
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show feedback
    msgBox.innerText = "If email app didn't open, please email me manually!";
    msgBox.style.color = "#555";
    btn.innerText = "Send Love 💌";
}

// Import Confetti (using a simple CDN-less implementation or relying on external script)
// Adding external script for confetti dynamically
const confettiScript = document.createElement('script');
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.body.appendChild(confettiScript);

// Expose functions to global window scope for HTML onclick handlers
window.nextCard = nextCard;
window.handleYes = handleYes;
window.moveNoButton = moveNoButton;
window.sendEmail = sendEmail;
