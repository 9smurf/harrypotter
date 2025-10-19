/**
 * Main Application Logic
 * Handles screen navigation, video loading, password checking, and user interactions
 */

class MagicalJourneyApp {
    constructor() {
        this.currentChapter = 0;
        this.config = window.magicalConfig;
        this.effects = window.magicalEffects;
        this.player = null;
        this.fireworksInterval = null;
        this.unlocked = JSON.parse(localStorage.getItem('magicalUnlocked')) || [true, false, false];
    }

    /**
     * Show a specific screen and hide all others
     */
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // If showing video screen, populate nav
        if (screenId === 'videoScreen') {
            this.populateNavMenu();
        }
    }

    /**
     * Start the magical journey
     */
    startJourney() {
        this.showScreen('videoScreen');
        this.loadMemory(0);
    }

    /**
     * Load a specific video/memory
     */
    loadMemory(index) {
        if (!this.unlocked[index]) {
            return; // Prevent loading locked chapters
        }

        this.currentChapter = index;
        const chapterIndicator = document.getElementById('chapterIndicator');
        const memoryStatus = document.getElementById('memoryStatus');
        
        // Update chapter title
        chapterIndicator.textContent = this.config.getChapter(index);
        
        // Show loading status
        memoryStatus.style.display = 'flex';
        memoryStatus.innerHTML = '<div class="hourglass">⏳</div><span>The memory is still forming...</span>';
        
        // Load video
        const videoId = this.config.getVideo(index);

        if (this.player) {
            this.player.loadVideoById(videoId);
        } else {
            this.player = new YT.Player('videoPlayer', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': this.onPlayerReady.bind(this),
                    'onStateChange': this.onPlayerStateChange.bind(this)
                }
            });
        }

        // Update nav to reflect current chapter
        this.populateNavMenu();
    }

    /**
     * YouTube Player ready handler
     */
    onPlayerReady(event) {
        event.target.playVideo();
        const memoryStatus = document.getElementById('memoryStatus');
        memoryStatus.innerHTML = '<div class="hourglass">⏳</div><span>The memory reveals itself...</span>';
    }

    /**
     * YouTube Player state change handler
     */
    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            this.onVideoEnd();
        }
    }

    /**
     * Handle video end event
     */
    onVideoEnd() {
        const memoryStatus = document.getElementById('memoryStatus');
        
        if (this.currentChapter < this.config.getTotalVideos() - 1) {
            // More videos to go - show riddle
            memoryStatus.innerHTML = '<div class="hourglass">✓</div><span>Memory complete! Solve the riddle to continue...</span>';
            
            setTimeout(() => {
                this.showRiddle();
            }, 2000);
        } else {
            // Final video - go to celebration
            memoryStatus.innerHTML = '<div class="hourglass">✓</div><span>All memories revealed! Prepare for your reward...</span>';
            
            setTimeout(() => {
                this.showCelebration();
            }, 3000);
        }
    }

    /**
     * Show riddle screen with current riddle
     */
    showRiddle() {
        const riddleText = document.getElementById('riddleText');
        const riddleAnswer = document.getElementById('riddleAnswer');
        const spellResult = document.getElementById('spellResult');
        
        // Set riddle text
        riddleText.textContent = this.config.getRiddle(this.currentChapter);
        
        // Reset input and result
        riddleAnswer.value = '';
        spellResult.classList.remove('show', 'error', 'success');
        riddleAnswer.style.borderColor = '';
        
        // Show riddle screen
        this.showScreen('riddleScreen');
        
        // Focus on input
        setTimeout(() => riddleAnswer.focus(), 300);
    }

    /**
     * Check if the entered password is correct
     */
    checkAnswer() {
        const input = document.getElementById('riddleAnswer');
        const spellResult = document.getElementById('spellResult');
        const enteredAnswer = input.value.toLowerCase().trim();
        const correctAnswer = this.config.getPassword(this.currentChapter).toLowerCase();

        if (enteredAnswer === correctAnswer) {
            // Correct answer!
            spellResult.textContent = '✨ The spell works! The path opens before you... ✨';
            spellResult.classList.remove('error');
            spellResult.classList.add('success', 'show');
            
            input.style.borderColor = '#28a745';
            
            // Create magical effect
            this.effects.createSuccessSparkles();
            
            // Unlock next chapter
            const nextChapter = this.currentChapter + 1;
            if (nextChapter < this.config.getTotalVideos()) {
                this.unlocked[nextChapter] = true;
                localStorage.setItem('magicalUnlocked', JSON.stringify(this.unlocked));
            }
            
            // Move to next chapter
            setTimeout(() => {
                this.currentChapter = nextChapter;
                this.showScreen('videoScreen');
                this.loadMemory(this.currentChapter);
            }, 2000);
            
        } else {
            // Wrong answer
            spellResult.textContent = '⚠️ The spell fizzles... That\'s not quite right. Try again, young witch! ⚠️';
            spellResult.classList.remove('success');
            spellResult.classList.add('error', 'show');
            
            input.style.borderColor = '#dc3545';
            this.effects.shakeElement(input);
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    }

    /**
     * Show hint for current riddle
     */
    requestHint() {
        const hint = this.config.getHint(this.currentChapter);
        this.effects.createHintDialog(hint);
    }

    /**
     * Populate the navigation menu with unlocked chapters
     */
    populateNavMenu() {
        const menu = document.getElementById('videoNavMenu');
        menu.innerHTML = '';

        for (let i = 0; i < this.config.getTotalVideos(); i++) {
            const btn = document.createElement('button');
            btn.classList.add('nav-chapter');
            if (i === this.currentChapter) {
                btn.classList.add('active');
            }
            if (!this.unlocked[i]) {
                btn.disabled = true;
            }
            btn.textContent = this.config.getChapter(i).replace('Chapter ', '');
            btn.onclick = () => {
                if (this.unlocked[i]) {
                    this.loadMemory(i);
                }
            };
            menu.appendChild(btn);
        }
    }

    /**
     * Show celebration screen with fireworks
     */
    showCelebration() {
        this.showScreen('celebrationScreen');
        this.effects.createFireworks();
        this.effects.createGoldenSnitch();
        
        // Continue creating fireworks periodically
        this.fireworksInterval = setInterval(() => {
            this.effects.createFireworks();
        }, 4000);
    }

    /**
     * Download all memories as a text file
     */
    downloadMemories() {
        const memories = [];
        
        for (let i = 0; i < this.config.getTotalVideos(); i++) {
            memories.push(
                `${this.config.getChapter(i)}\n` +
                `Riddle: ${this.config.getRiddle(i) || 'N/A'}\n` +
                `Answer: ${this.config.getPassword(i) || 'N/A'}`
            );
        }

        const finalLetter = document.getElementById('finalLetter').innerText;

        const content = `
═══════════════════════════════════════════════════════
        🏰 MAGICAL DEBUT MEMORIES - KEEPSAKE 🏰
═══════════════════════════════════════════════════════

Dear [Her Name],

This parchment contains all the magical memories and riddles 
from your extraordinary 18th birthday treasure hunt.

${memories.join('\n\n---\n\n')}

═══════════════════════════════════════════════════════

${finalLetter}

═══════════════════════════════════════════════════════

These memories represent the magic we've created together.
May they remind you always of how deeply you are loved.

Preserved with love on: ${new Date().toLocaleDateString()}

⚡ Mischief Managed ⚡
        `;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Magical_Debut_Memories.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Restart the journey from the beginning
     */
    restartJourney() {
        // Clear fireworks interval
        if (this.fireworksInterval) {
            clearInterval(this.fireworksInterval);
        }
        
        this.currentChapter = 0;
        this.showScreen('welcomeScreen');
    }
}

// Create global app instance
window.app = new MagicalJourneyApp();