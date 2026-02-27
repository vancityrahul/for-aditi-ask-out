/* ===========================
   JavaScript — The Magic
   =========================== */

// ─── Floating Hearts ───
(function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['💖', '💕', '💗', '💓', '💘', '💝', '✨', '🌸', '💜'];
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        container.appendChild(heart);
    }
})();

// ─── Scroll-triggered Fade-ins ───
(function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// ─── The CHAOTIC Runaway "No" Button ───
(function initButtons() {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const noCounter = document.getElementById('noCounter');
    const questionSection = document.getElementById('question');
    const celebrationSection = document.getElementById('celebration');

    let noAttempts = 0;
    let isFreeroaming = false;

    const snarkyMessages = [
        "Nice try! The button has commitment issues. 😏",
        "Haha, you really thought? Try again. 😂",
        "The button said 'nope' to your 'nope.' 🙅",
        "Error 404: Rejection not found. 🤷",
        "That button has more dodge skills than Neo. 🕶️",
        "It's literally running away from you now. LOOK AT IT GO! 🏃💨",
        "I can do this all day. Can you? ⚡",
        "The button is doing parkour across the website rn 🤸",
        "It's getting smaller... and angrier... 😤",
        "You're chasing a button across a website. Just say Yes. 💖",
        "It's literally dissolving. This is your fault. 👀",
        "The button is filing a restraining order against your cursor. 📜",
        "BREAKING NEWS: Local button refuses to be clicked. More at 11. 📺",
        "It's fading from existence... like your chance to say No. 👻",
        "☠️ R.I.P. No Button — it lived fast, dodged hard, and died free."
    ];

    // Inject dynamic styles for the No button chaos
    const chaosStyle = document.createElement('style');
    chaosStyle.textContent = `
        .btn-no-freeroam {
            position: fixed !important;
            z-index: 9995 !important;
            transition: left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                        top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                        transform 0.3s ease,
                        opacity 0.5s ease !important;
            pointer-events: auto;
        }
        .btn-no-glow {
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.6),
                        0 0 30px rgba(255, 77, 141, 0.4),
                        0 0 60px rgba(168, 85, 247, 0.2) !important;
            animation: noButtonPulse 0.5s ease infinite alternate !important;
        }
        @keyframes noButtonPulse {
            from { box-shadow: 0 0 15px rgba(168,85,247,0.6), 0 0 30px rgba(255,77,141,0.4); }
            to { box-shadow: 0 0 25px rgba(255,77,141,0.8), 0 0 50px rgba(168,85,247,0.5); }
        }
        @keyframes noButtonSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes trailFade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.2) translateY(-40px); }
        }
        @keyframes particleExplode {
            0% { opacity: 1; transform: translate(0,0) scale(1); }
            100% { opacity: 0; transform: translate(var(--px), var(--py)) scale(0); }
        }
    `;
    document.head.appendChild(chaosStyle);

    // Leave an emoji trail at the button's previous position
    function leaveTrail(x, y) {
        const trails = ['💔', '😱', '🏃', '💨', '❌', '🚫', '👋'];
        const trail = document.createElement('span');
        trail.textContent = trails[Math.floor(Math.random() * trails.length)];
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9990';
        trail.style.animation = 'trailFade 1.2s ease forwards';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1300);
    }

    // Explode the button into particles
    function explodeButton() {
        const rect = btnNo.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const colors = ['#ff4d8d', '#a855f7', '#6366f1', '#f43f5e', '#fbbf24'];
        const emojis = ['💔', '😢', '👻', '💀', '✖️', '🚫'];

        // Particles
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 40;
            const dist = 80 + Math.random() * 200;
            particle.style.cssText = `
                position: fixed; left: ${cx}px; top: ${cy}px;
                width: ${4 + Math.random() * 8}px; height: ${4 + Math.random() * 8}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none; z-index: 9999;
                --px: ${Math.cos(angle) * dist}px; --py: ${Math.sin(angle) * dist}px;
                animation: particleExplode 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1100);
        }

        // Emoji burst
        for (let i = 0; i < 12; i++) {
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = (Math.PI * 2 * i) / 12;
            const dist = 60 + Math.random() * 120;
            emoji.style.cssText = `
                position: fixed; left: ${cx}px; top: ${cy}px;
                font-size: ${1 + Math.random()}rem;
                pointer-events: none; z-index: 9999;
                --px: ${Math.cos(angle) * dist}px; --py: ${Math.sin(angle) * dist}px;
                animation: particleExplode 1.2s ease forwards;
            `;
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 1300);
        }
    }

    // Teleport button to a random spot on the viewport
    function teleportButton() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const btnW = btnNo.offsetWidth || 150;
        const btnH = btnNo.offsetHeight || 60;
        const pad = 20;

        const oldRect = btnNo.getBoundingClientRect();
        leaveTrail(oldRect.left + oldRect.width / 2, oldRect.top + oldRect.height / 2);

        const newX = pad + Math.random() * (vw - btnW - pad * 2);
        const newY = pad + Math.random() * (vh - btnH - pad * 2);

        btnNo.style.left = newX + 'px';
        btnNo.style.top = newY + 'px';
    }

    // Main dodge function
    function dodgeButton() {
        noAttempts++;

        const msgIndex = Math.min(noAttempts - 1, snarkyMessages.length - 1);
        noCounter.textContent = snarkyMessages[msgIndex];

        // Phase 1 (attempts 1-3): Dodge within the wrapper area
        if (noAttempts <= 3) {
            const wrapper = btnNo.closest('.buttons-wrapper');
            const wrapperRect = wrapper.getBoundingClientRect();
            const maxX = wrapperRect.width / 2 - 100;
            const maxY = 150;
            btnNo.style.position = 'relative';
            btnNo.style.left = (Math.random() * maxX * 2 - maxX) + 'px';
            btnNo.style.top = (Math.random() * maxY * 2 - maxY) + 'px';
            btnNo.style.transition = 'left 0.25s ease, top 0.25s ease';
        }

        // Phase 2 (attempts 4-5): Break free — start freeroaming across viewport
        if (noAttempts === 4) {
            isFreeroaming = true;
            btnNo.classList.add('btn-no-freeroam', 'btn-no-glow');
            noCounter.textContent = "⚠️ THE BUTTON HAS ESCAPED ITS CONTAINER. I REPEAT — IT'S LOOSE. ⚠️";
        }

        if (isFreeroaming) {
            teleportButton();
        }

        // Phase 3 (attempts 5+): Start spinning and shrinking
        if (noAttempts >= 5) {
            const spinSpeed = Math.max(0.2, 1 - (noAttempts - 5) * 0.1);
            btnNo.style.animation = `noButtonPulse 0.5s ease infinite alternate, noButtonSpin ${spinSpeed}s linear infinite`;
        }

        // Grow the Yes button as No gets more desperate
        if (noAttempts >= 3) {
            const scale = 1 + (noAttempts * 0.07);
            btnYes.style.transform = `scale(${Math.min(scale, 1.8)})`;
            btnYes.style.transition = 'transform 0.3s ease';
        }

        // Phase 4 (attempts 7+): Shrink the No button
        if (noAttempts >= 7) {
            const shrink = 1 - ((noAttempts - 6) * 0.12);
            const finalScale = Math.max(shrink, 0.25);
            btnNo.style.transform = `scale(${finalScale})`;
        }

        // Phase 5 (attempts 9+): Start fading
        if (noAttempts >= 9) {
            btnNo.style.opacity = `${Math.max(1 - (noAttempts - 8) * 0.2, 0.15)}`;
        }

        // Phase 6 (attempt 12): EXPLODE and disappear forever
        if (noAttempts >= 12) {
            explodeButton();
            btnNo.style.display = 'none';
            noCounter.innerHTML = `<span style="font-size:1.1rem">💥 The "No" button has been <strong>obliterated from existence</strong>. 💥<br>
                <span style="font-size:0.9rem; opacity:0.7">There is only one option now. You know what to do. 💖</span></span>`;
            return;
        }
    }

    // Event listeners — dodge on hover AND click
    btnNo.addEventListener('mouseenter', dodgeButton);
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        dodgeButton();
    });
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeButton();
    });

    // "Yes" button celebration
    btnYes.addEventListener('click', () => {
        // Remove the rogue No button if it's still floating around
        if (btnNo) btnNo.style.display = 'none';

        // 🔔 SEND PUSH NOTIFICATION — Aditi said YES!
        // Subscribe to this topic on your phone via ntfy.sh app
        fetch('https://ntfy.sh/aditi-said-yes-rahul-2026', {
            method: 'POST',
            headers: { 'Title': '💖 ADITI SAID YES! 💖', 'Priority': '5', 'Tags': 'heart_eyes,tada,sparkles' },
            body: '🎉 SHE CLICKED YES! Dil dooba and she said YES! Time to celebrate! 🥳💃🕺'
        }).catch(() => { }); // Silent fail — don't ruin the celebration

        // Hide question section
        questionSection.style.display = 'none';

        // Show celebration
        celebrationSection.classList.remove('hidden');
        celebrationSection.scrollIntoView({ behavior: 'smooth' });

        // Launch confetti hearts
        launchCelebrationHearts();

        // Play a little confetti burst
        createConfettiBurst();
    });
})();

// ─── Celebration Hearts Explosion ───
function launchCelebrationHearts() {
    const container = document.getElementById('celebrationHearts');
    const hearts = ['💖', '💕', '💗', '💓', '💘', '🎉', '🥳', '✨', '💝', '🌹'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
            heart.style.opacity = '0';
            heart.style.animation = `celebHeart ${2 + Math.random() * 3}s ease forwards`;
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            container.appendChild(heart);

            // Cleanup
            setTimeout(() => heart.remove(), 5000);
        }, i * 80);
    }

    // Add the keyframe dynamically
    if (!document.getElementById('celebHeartStyle')) {
        const style = document.createElement('style');
        style.id = 'celebHeartStyle';
        style.textContent = `
            @keyframes celebHeart {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                30% { opacity: 1; transform: scale(1.2) rotate(15deg); }
                100% { opacity: 0; transform: scale(0.5) translateY(-100px) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ─── Confetti Burst ───
function createConfettiBurst() {
    const colors = ['#ff4d8d', '#a855f7', '#fbbf24', '#f43f5e', '#6366f1', '#ec4899'];
    const body = document.body;

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = (5 + Math.random() * 10) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.opacity = '1';

        const angle = (Math.PI * 2 * i) / 80;
        const velocity = 200 + Math.random() * 400;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 200;

        confetti.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        body.appendChild(confetti);

        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        });

        setTimeout(() => confetti.remove(), 2000);
    }
}

// ─── Parallax Hearts on Scroll ───
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const container = document.getElementById('heartsContainer');
    container.style.transform = `translateY(${scrollY * 0.1}px)`;
});

// ─── Cursor Trail (subtle sparkle) ───
(function initCursorTrail() {
    const sparkles = ['✨', '💖', '⭐'];
    let lastSparkle = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 120) return; // throttle
        lastSparkle = now;

        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9998';
        sparkle.style.fontSize = '0.7rem';
        sparkle.style.opacity = '1';
        sparkle.style.transition = 'all 0.8s ease';
        sparkle.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = `translate(-50%, -50%) translateY(-30px) scale(0.3)`;
        });

        setTimeout(() => sparkle.remove(), 900);
    });
})();
