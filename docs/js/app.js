/**
 * Main Application Logic
 * Handles screen navigation, video loading, password checking, and user interactions
 */

class MagicalJourneyApp {
    constructor() {
        this.currentChapter = 0;
        this.config = window.magicalConfig;
        this.effects = window.magicalEffects;
        this.videoReady = false;
        this.videoEndTimeout = null;
        this.fireworksInterval = null;
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
        this.currentChapter = index;
        const videoPlayer = document.getElementById('videoPlayer');
        const chapterIndicator = document.getElementById('chapterIndicator');
        const memoryStatus = document.getElementById('memoryStatus');
        
        // Update chapter title
        chapterIndicator.textContent = this.config.getChapter(index);
        
        // Show loading status
        memoryStatus.style.display = 'flex';
        memoryStatus.innerHTML = '<div class="hourglass">⏳</div><span>The memory is still forming...</span>';
        
        // Load video
        const videoId = this.config.getVideo(index);
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
        
        this.videoReady = false;
        
        // Simulate video loading
        setTimeout(() => {
            memoryStatus.innerHTML = '<div class="hourglass">⏳</div><span>The memory reveals itself...</span>';
            this.videoReady = true;
            
            // Start video end detection
            this.startVideoEndDetection(index);
        }, 2000);
    }

    /**
     * Detect when video ends based on configured duration
     */
    startVideoEndDetection(index) {
        // Clear any existing timeout
        if (this.videoEndTimeout) {
            clearTimeout(this.videoEndTimeout);
        }
        
        // Get video length from config
        const videoLength = this.config.getVideoLength(index);
        
        // Set timeout for when video should end
        this.videoEndTimeout = setTimeout(() => {
            this.onVideoEnd();
        }, videoLength);
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
            
            // Move to next chapter
            setTimeout(() => {
                this.currentChapter++;
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
                `Riddle: ${this.config.getRiddle(i)}\n` +
                `Answer: ${this.config.getPassword(i)}`
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
        
        // Clear video timeout
        if (this.videoEndTimeout) {
            clearTimeout(this.videoEndTimeout);
        }
        
        this.currentChapter = 0;
        this.showScreen('welcomeScreen');
    }
}

// Create global app instance
window.app = new MagicalJourneyApp();