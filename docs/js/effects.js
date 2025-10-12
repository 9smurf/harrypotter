/**
 * Visual Effects Manager
 * Handles all magical animations, background effects, and visual feedback
 */

class MagicalEffects {
    constructor() {
        this.init();
    }

    /**
     * Initialize all background effects
     */
    init() {
        this.createStars();
        this.createFloatingElements();
        this.createParticles();
        this.startMagicalAnimations();
    }

    /**
     * Create twinkling stars in the background
     */
    createStars() {
        const starsContainer = document.getElementById('stars');
        const numberOfStars = 60;

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 4 + 2 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    /**
     * Create floating magical elements (wands, owls, etc.)
     */
    createFloatingElements() {
        const elements = ['⚡', '🔮', '🌟', '✨', '🦉', '📜', '🪄'];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
                element.style.left = Math.random() * 100 + '%';
                element.style.animationDuration = (Math.random() * 4 + 8) + 's';
                element.style.fontSize = (Math.random() * 10 + 15) + 'px';
                document.getElementById('floatingElements').appendChild(element);

                setTimeout(() => element.remove(), 12000);
            }
        }, 2000);
    }

    /**
     * Create golden particles
     */
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const numberOfParticles = 30;

        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Start periodic sparkle animations
     */
    startMagicalAnimations() {
        setInterval(() => {
            this.createSparkle();
        }, 3000);
    }

    /**
     * Create a random sparkle on screen
     */
    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '24px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }

    /**
     * Create fireworks for celebration screen
     */
    createFireworks() {
        const container = document.getElementById('magicalFireworks');
        const colors = ['#d4af37', '#ff6b6b', '#4ecdc4', '#a29bfe', '#fd79a8', '#55efc4'];
        const numberOfFireworks = 20;
        
        for (let i = 0; i < numberOfFireworks; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'magical-firework';
                firework.style.left = Math.random() * 100 + '%';
                firework.style.top = Math.random() * 60 + '%';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                firework.style.width = Math.random() * 10 + 5 + 'px';
                firework.style.height = firework.style.width;
                firework.style.animationDelay = (Math.random() * 0.5) + 's';
                container.appendChild(firework);

                setTimeout(() => firework.remove(), 3000);
            }, i * 300);
        }
    }

    /**
     * Create golden snitch animation
     */
    createGoldenSnitch() {
        const container = document.getElementById('goldenSnitch');
        container.innerHTML = '🏆';
    }

    /**
     * Create success sparkles explosion
     */
    createSuccessSparkles() {
        const numberOfSparkles = 15;
        
        for (let i = 0; i < numberOfSparkles; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: explode 1s ease-out forwards;
                `;
                
                const angle = (360 / numberOfSparkles) * i;
                const distance = 150;
                sparkle.style.setProperty('--angle', angle + 'deg');
                sparkle.style.setProperty('--distance', distance + 'px');
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 50);
        }
    }

    /**
     * Create custom magical hint dialog
     */
    createHintDialog(hintText) {
        const hintBox = document.createElement('div');
        hintBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(244, 228, 188, 0.98);
            color: var(--dark-magic);
            padding: 40px;
            border-radius: 20px;
            border: 4px solid var(--hogwarts-gold);
            max-width: 500px;
            z-index: 1000;
            text-align: center;
            box-shadow: 0 0 50px rgba(212, 175, 55, 0.6);
            animation: fadeInMagical 0.5s ease-out;
        `;
        
        hintBox.innerHTML = `
            <h3 style="font-family: 'Cinzel', serif; color: var(--magical-purple); margin-bottom: 20px; font-size: 1.5em;">
                🔮 The Oracle Speaks 🔮
            </h3>
            <p style="font-size: 1.1em; line-height: 1.6; margin-bottom: 30px;">
                ${hintText}
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: linear-gradient(45deg, var(--hogwarts-gold), #b8860b);
                color: var(--dark-magic);
                border: none;
                padding: 12px 30px;
                border-radius: 30px;
                font-size: 1em;
                font-weight: 600;
                font-family: 'Cinzel', serif;
                cursor: pointer;
            ">
                I Understand
            </button>
        `;
        
        document.body.appendChild(hintBox);
    }

    /**
     * Shake animation for wrong answers
     */
    shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
}

// Create global effects instance
window.magicalEffects = new MagicalEffects();