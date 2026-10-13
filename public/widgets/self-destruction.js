/**
 * Self-Destruction Countdown Widget
 * 
 * Embeddable widget that displays a countdown timer for container self-destruction.
 * 
 * Usage:
 *   <script src="https://your-portal-domain.com/widgets/self-destruction.js"></script>
 * 
 * Or with custom configuration:
 *   <script>
 *     window.SelfDestructionWidget = {
 *       apiUrl: 'https://your-portal-domain.com/api/self-destruction',
 *       position: 'top-left', // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
 *     };
 *   </script>
 *   <script src="https://your-portal-domain.com/widgets/self-destruction.js"></script>
 */
(function () {
    'use strict';

    // Configuration
    const config = window.SelfDestructionWidget || {};
    const apiUrl = config.apiUrl || '/api/self-destruction';
    const position = config.position || 'top-left';

    // Position mapping
    const positionStyles = {
        'top-left': { top: '1rem', left: '1rem' },
        'top-right': { top: '1rem', right: '1rem' },
        'bottom-left': { bottom: '1rem', left: '1rem' },
        'bottom-right': { bottom: '1rem', right: '1rem' }
    };

    // Widget state
    let selfDestructionSeconds = null;
    let remainingSeconds = null;
    let widgetElement = null;
    let countdownInterval = null;

    /**
     * Format seconds as MM:SS
     */
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Create and inject widget element
     */
    function createWidget() {
        if (widgetElement) {
            return;
        }

        widgetElement = document.createElement('div');
        widgetElement.id = 'self-destruction-widget';
        widgetElement.style.cssText = `
      position: fixed;
      z-index: 9999;
      background-color: #eab308;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      min-width: 250px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      ${Object.entries(positionStyles[position] || positionStyles['top-left'])
                .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
                .join(' ')}
    `;

        const titleDiv = document.createElement('div');
        titleDiv.style.cssText = 'font-weight: 600; font-size: 0.875rem; margin-bottom: 0.25rem;';
        titleDiv.textContent = 'Container Self-Destruction';

        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'self-destruction-countdown';
        countdownDiv.style.cssText = 'font-size: 1.125rem; font-weight: 700;';
        countdownDiv.textContent = 'Loading...';

        widgetElement.appendChild(titleDiv);
        widgetElement.appendChild(countdownDiv);
        document.body.appendChild(widgetElement);
    }

    /**
     * Update widget display
     */
    function updateWidget() {
        if (!widgetElement) {
            return;
        }

        const countdownDiv = document.getElementById('self-destruction-countdown');
        if (!countdownDiv) {
            return;
        }

        if (remainingSeconds === null) {
            countdownDiv.textContent = 'Loading...';
            return;
        }

        if (remainingSeconds > 0) {
            countdownDiv.textContent = `Self-destructing in ${formatTime(remainingSeconds)}`;
        } else {
            countdownDiv.textContent = 'Self-destruction imminent';
            widgetElement.style.backgroundColor = '#dc2626'; // red
        }
    }

    /**
     * Fetch self-destruction seconds from API
     */
    async function fetchSelfDestruction() {
        try {
            // Get the current page URL as referer
            const referer = window.location.href;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Referer': referer,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.warn('Failed to fetch self-destruction seconds:', response.status);
                return;
            }

            const data = await response.json();
            const seconds = data.seconds;

            if (seconds !== null && seconds > 0) {
                selfDestructionSeconds = seconds;
                remainingSeconds = seconds;
                updateWidget();
                startCountdown();
            } else {
                // Hide widget if no countdown
                if (widgetElement) {
                    widgetElement.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Failed to fetch self-destruction seconds:', error);
            // Hide widget on error
            if (widgetElement) {
                widgetElement.style.display = 'none';
            }
        }
    }

    /**
     * Start countdown timer
     */
    function startCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        if (remainingSeconds === null || remainingSeconds <= 0) {
            return;
        }

        countdownInterval = setInterval(() => {
            if (remainingSeconds <= 1) {
                clearInterval(countdownInterval);
                remainingSeconds = 0;
                updateWidget();
                return;
            }
            remainingSeconds--;
            updateWidget();
        }, 1000);
    }

    /**
     * Initialize widget
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                createWidget();
                fetchSelfDestruction();
            });
        } else {
            createWidget();
            fetchSelfDestruction();
        }
    }

    // Auto-initialize
    init();

    // Expose API for manual control (optional)
    window.SelfDestructionWidgetAPI = {
        refresh: fetchSelfDestruction,
        destroy: function () {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            if (widgetElement) {
                widgetElement.remove();
                widgetElement = null;
            }
        }
    };
})();

