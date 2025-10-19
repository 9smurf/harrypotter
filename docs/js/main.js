/**
 * Main Entry Point
 * Global functions and event listeners
 */

// Global function references for HTML onclick handlers
function startJourney() {
    window.app.startJourney();
}

function checkAnswer() {
    window.app.checkAnswer();
}

function requestHint() {
    window.app.requestHint();
}

function downloadMemories() {
    window.app.downloadMemories();
}

function restartJourney() {
    window.app.restartJourney();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🪄 Magical Journey Initialized');
    
    // App is already initialized in app.js as window.app
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
});

/**
 * Setup keyboard event listeners
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keypress', (e) => {
        // Enter key submits answer in riddle screen
        if (e.key === 'Enter' && document.getElementById('riddleAnswer') === document.activeElement) {
            checkAnswer();
        }
    });
}

/**
 * Log any errors to console for debugging
 */
window.addEventListener('error', (e) => {
    console.error('⚠️ Magical Error:', e.message);
});

/**
 * Prevent right-click on videos (optional - protects content)
 */
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('#videoPlayer')) {
        e.preventDefault();
    }
});

console.log('⚡ Welcome to the Magical Journey ⚡');