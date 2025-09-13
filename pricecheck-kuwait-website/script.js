// PriceCheck Kuwait Website JavaScript
// Handles analytics tracking, smooth scrolling, and interactive features

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        GA_MEASUREMENT_ID: 'GA_MEASUREMENT_ID', // Replace with actual GA ID
        APP_STORE_URL: '#', // Replace with actual App Store URL
        GOOGLE_PLAY_URL: '#', // Replace with actual Google Play URL
        CONTACT_EMAIL: 'contact@pricecheckkuwait.com'
    };

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    function initializeApp() {
        setupSmoothScrolling();
        setupNavbarScrollEffect();
        setupAnalytics();
        setupDownloadTracking();
        setupLazyLoading();
        setupAccessibility();
    }

    // Smooth scrolling for navigation links
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar scroll effect
    function setupNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Google Analytics setup
    function setupAnalytics() {
        // Initialize Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', CONFIG.GA_MEASUREMENT_ID, {
                page_title: document.title,
                page_location: window.location.href
            });
        }

        // Track page views
        trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // Download button tracking
    function setupDownloadTracking() {
        const downloadButtons = document.querySelectorAll('.download-button, .cta-button');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonType = this.classList.contains('app-store') ? 'app-store' : 'google-play';
                const buttonText = this.querySelector('img')?.alt || 'Download Button';
                
                trackEvent('download_click', {
                    button_type: buttonType,
                    button_text: buttonText,
                    page_section: this.closest('section')?.id || 'unknown'
                });
            });
        });
    }

    // Lazy loading for images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // Accessibility enhancements
    function setupAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #424242;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main landmark
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.id = 'main';
            hero.setAttribute('role', 'main');
        }

        // Enhance focus management
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #424242';
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }

    // Event tracking function
    function trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Console log for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Event tracked:', eventName, parameters);
        }
    }

    // Download tracking function (called from HTML)
    window.trackDownload = function(platform) {
        trackEvent('download_attempt', {
            platform: platform,
            timestamp: new Date().toISOString()
        });

        // Show coming soon message for now
        if (platform === 'app-store') {
            showNotification('Coming soon to the App Store!', 'info');
        } else if (platform === 'google-play') {
            showNotification('Coming soon to Google Play!', 'info');
        }
    };

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #424242;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Performance monitoring
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    
                    trackEvent('page_performance', {
                        load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        first_paint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
                    });
                }, 0);
            });
        }
    }

    // Initialize performance tracking
    trackPerformance();

    // Error tracking
    window.addEventListener('error', function(e) {
        trackEvent('javascript_error', {
            error_message: e.message,
            error_source: e.filename,
            error_line: e.lineno,
            error_column: e.colno
        });
    });

    // Unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', function(e) {
        trackEvent('unhandled_promise_rejection', {
            error_message: e.reason?.message || 'Unknown error',
            error_stack: e.reason?.stack || 'No stack trace'
        });
    });

    // Export functions for global access
    window.PriceCheckKuwait = {
        trackEvent: trackEvent,
        showNotification: showNotification,
        trackDownload: window.trackDownload
    };

})();
