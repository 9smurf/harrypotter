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
            'dQw4w9WgXcQ', // Video 3: Fun/bloopers video
            'dQw4w9WgXcQ'  // Video 4: Finale compilation
        ];

        // ========== PASSWORD CONFIGURATION ==========
        // Customize these with your personal trivia answers
        this.passwords = [
            'genbio',      // Password 1: First chat natin, saan tayo may quiz
            'tiktok',        // Password 2: Where did I confess to you the first time
            'pizza',         // Password 3: Her favorite food
            'forever'        // Password 4: Meaningful word/phrase
        ];

        // ========== RIDDLES CONFIGURATION ==========
        // These are the riddles that appear after each video
        this.riddles = [
            "Before the first deep convo appeared,\nI asked about this question weird; \nToo sudden to even think aloud, \ndo you remember what subject we had a quiz on about?",
            
            "This is the place were secrets were told,\and it led for everything to unfold;\nOur streak stays in this place,\nIf only you saw the smile on my face.",
            
            "From Italy's boot comes this delight so fine,\nWith cheese and sauce, it pairs perfectly with wine.\nCrispy crust below, toppings spread on high,\nThis comfort food makes your taste buds fly.",
            
            "A promise made beneath the starlit sky,\nA word that means until the day I die.\nIt speaks of love that time cannot sever,\nIn one magical word: Always and ______"
        ];

        // ========== HINTS CONFIGURATION ==========
        // These hints appear when the "Seek Guidance" button is clicked
        this.hints = [
            'In our first chat, what subject did I ask you if we had a quiz?',
            'What app did I use to confess to you?',
            'That circular, cheesy delight from Italy that you crave every weekend! 🍕',
            'It rhymes with "however" and starts with "F"... My promise to you ♾️'
        ];

        // ========== CHAPTER TITLES ==========
        // These appear at the top of each video screen
        this.chapters = [
            'Chapter I: The Memory of Our Beginning',
            'Chapter II: The Collection of Our Joys',
            'Chapter III: The Chronicles of Our Laughter',
            'Chapter IV: The Prophecy of Our Future'
        ];

        // ========== VIDEO TIMING CONFIGURATION ==========
        // Adjust these based on your actual video lengths (in milliseconds)
        // 1000ms = 1 second, so 30000ms = 30 seconds
        this.videoLengths = [
            250000,  // Video 1 length in milliseconds (30 seconds)
            480000,  // Video 2 length in milliseconds
            30000,  // Video 3 length in milliseconds
            30000   // Video 4 length in milliseconds
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
     * Get video length by index
     */
    getVideoLength(index) {
        return this.videoLengths[index];
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