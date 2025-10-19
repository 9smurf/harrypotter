/**
 * Configuration File
 * Contains all video IDs, passwords, riddles, and customizable content
 */

class MagicalConfig {
    constructor() {
        // ========== VIDEO CONFIGURATION ==========
        // Replace these with your actual YouTube video IDs
        this.videos = [
            'U8FwUdq8KBw', // Video 1: Day-in-the-life vlog
            'oGfgxbumEEE', // Video 2: Highlight reel
            '45nIq1SFNaQ'  // Video 3: Fun/bloopers video
        ];

        // ========== PASSWORD CONFIGURATION ==========
        // Customize these with your personal trivia answers
        this.passwords = [
            'genbio',      // Password 1: First chat natin, saan tayo may quiz
            'tiktok',
            'carbonara'       // Password 2: Where did I confess to you the first time
        ];

        // ========== RIDDLES CONFIGURATION ==========
        // These are the riddles that appear after each video
        this.riddles = [
            "Before the first deep convo appeared,\nI asked about this question weird; \nToo sudden to even think aloud, \ndo you remember what subject we had a quiz on about?",
            
            "This is the place were secrets were told,\and it led for everything to unfold;\nOur streak stays in this place,\nIf only you saw the smile on my face.",

            "In a world filled with everything yummy, I think I am more than good; If I am not spaghetti, what is this food?"
        ];

        // ========== HINTS CONFIGURATION ==========
        // These hints appear when the "Seek Guidance" button is clicked
        this.hints = [
            'In our first chat, what subject did I ask you if we had a quiz?',
            'What app did I use to confess to you?',
            'This is your favorite food baby'
        ];

        // ========== CHAPTER TITLES ==========
        // These appear at the top of each video screen
        this.chapters = [
            'Chapter I: The Memory of Our Beginning',
            'Chapter II: The Collection of Our Joys',
            'Chapter III: The Chronicles of Our Laughter'
        ];
    }

    /**
     * Get video ID by index
     */
    getVideo(index) {
        return this.videos[index];
    }

    /**
     * Get password by index
     */
    getPassword(index) {
        return this.passwords[index];
    }

    /**
     * Get riddle by index
     */
    getRiddle(index) {
        return this.riddles[index];
    }

    /**
     * Get hint by index
     */
    getHint(index) {
        return this.hints[index];
    }

    /**
     * Get chapter title by index
     */
    getChapter(index) {
        return this.chapters[index];
    }

    /**
     * Get total number of videos
     */
    getTotalVideos() {
        return this.videos.length;
    }
}

// Create global config instance
window.magicalConfig = new MagicalConfig();