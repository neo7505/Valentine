document.addEventListener('DOMContentLoaded', () => {
    let currentCard = 1;
    const totalCards = 9;

    // EmailJS Configuration
    // REPLACE THESE WITH YOUR ACTUAL KEYS IF NOT ALREADY DONE IN HTML OR HERE
    const SERVICE_ID = "service_3nskfn7";
    const TEMPLATE_ID = "template_r8uhvgh"; // Need to replace
    // Public Key is initialized in HTML head

    // Navigation Function
    function showCard(cardIndex) {
        // Hide all cards by removing active/prev classes
        // But to keep the "stack" feel, we might want to keep previous ones "prev"
        
        // Reset state
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
            card.classList.remove('prev');
        });

        // Loop through all previous cards to set them to "exit" state
        for (let i = 1; i < cardIndex; i++) {
            const prevCard = document.getElementById(`card-${i}`);
            if (prevCard) prevCard.classList.add('prev');
        }

        // Activate current card
        const activeCard = document.getElementById(`card-${cardIndex}`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        currentCard = cardIndex;
    }

    // Attach Click Handlers to "Next" buttons
    document.querySelectorAll('[data-next-card]').forEach(button => {
        button.addEventListener('click', (e) => {
            const nextIndex = parseInt(e.target.getAttribute('data-next-card'));
            showCard(nextIndex);
        });
    });

    // YES Button Handler
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#e88d8d', '#ffffff', '#ffeb3b']
            });
            // Go to final card (9)
            showCard(9);
        });
    }

    // NO Button Handler
    const noBtn = document.getElementById('no-btn');
    function moveNoButton() {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    if (noBtn) {
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    // Email Form Handler
    const form = document.getElementById('message-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const btn = event.target.querySelector('button');
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
                    document.getElementById('message').value = "";
                }, (error) => {
                    console.error('FAILED...', error);
                    btn.innerText = "Try Again";
                    btn.disabled = false;
                    msgBox.innerText = "Failed to send. But I love you anyway!";
                    msgBox.style.color = "red";
                });
        });
    }

    // Confetti Script Injection
    const confettiScript = document.createElement('script');
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.body.appendChild(confettiScript);
});
