/**
 * Enhanced Accordion Functionality for Historical Figures Website
 * Provides additional accessibility features beyond native HTML details/summary
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeAccordions();
        setupKeyboardNavigation();
        setupAnalytics();
    });
    
    /**
     * Initialize accordion functionality
     */
    function initializeAccordions() {
        const accordions = document.querySelectorAll('.biography-details');
        
        accordions.forEach(function(accordion) {
            const summary = accordion.querySelector('.biography-summary');
            
            // Add proper ARIA attributes
            summary.setAttribute('aria-expanded', accordion.open ? 'true' : 'false');
            
            // Listen for toggle events
            accordion.addEventListener('toggle', function() {
                const isOpen = accordion.open;
                summary.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                
                // Smooth scroll to opened accordion if needed
                if (isOpen && !isInViewport(accordion)) {
                    accordion.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
                
                // Optional: Close other accordions (uncomment for single-open behavior)
                // if (isOpen) {
                //     closeOtherAccordions(accordion);
                // }
            });
            
            // Handle click events for better cross-browser support
            summary.addEventListener('click', function(e) {
                // Let the native behavior handle the toggle
                // This is just for additional functionality
            });
        });
    }
    
    /**
     * Setup enhanced keyboard navigation
     */
    function setupKeyboardNavigation() {
        const summaries = document.querySelectorAll('.biography-summary');
        
        summaries.forEach(function(summary, index) {
            summary.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        // Native behavior will handle this, but ensure it works
                        break;
                        
                    case 'ArrowDown':
                        e.preventDefault();
                        focusNextAccordion(index);
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        focusPreviousAccordion(index);
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        focusFirstAccordion();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        focusLastAccordion();
                        break;
                }
            });
        });
    }
    
    /**
     * Setup basic analytics (page views, accordion opens)
     */
    function setupAnalytics() {
        const accordions = document.querySelectorAll('.biography-details');
        
        accordions.forEach(function(accordion) {
            accordion.addEventListener('toggle', function() {
                if (accordion.open) {
                    const name = accordion.querySelector('.biography-name').textContent;
                    
                    // Simple analytics - could be enhanced with Google Analytics, etc.
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'biography_opened', {
                            'biography_name': name
                        });
                    }
                    
                    // Console log for development
                    console.log('Biography opened:', name);
                }
            });
        });
    }
    
    /**
     * Close all other accordions except the current one
     */
    function closeOtherAccordions(currentAccordion) {
        const allAccordions = document.querySelectorAll('.biography-details');
        allAccordions.forEach(function(accordion) {
            if (accordion !== currentAccordion && accordion.open) {
                accordion.open = false;
                accordion.querySelector('.biography-summary').setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    /**
     * Focus management functions for keyboard navigation
     */
    function focusNextAccordion(currentIndex) {
        const summaries = document.querySelectorAll('.biography-summary');
        const nextIndex = (currentIndex + 1) % summaries.length;
        summaries[nextIndex].focus();
    }
    
    function focusPreviousAccordion(currentIndex) {
        const summaries = document.querySelectorAll('.biography-summary');
        const prevIndex = currentIndex === 0 ? summaries.length - 1 : currentIndex - 1;
        summaries[prevIndex].focus();
    }
    
    function focusFirstAccordion() {
        const summaries = document.querySelectorAll('.biography-summary');
        if (summaries.length > 0) {
            summaries[0].focus();
        }
    }
    
    function focusLastAccordion() {
        const summaries = document.querySelectorAll('.biography-summary');
        if (summaries.length > 0) {
            summaries[summaries.length - 1].focus();
        }
    }
    
    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Utility function to debounce events
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optional: Add search functionality (can be enhanced later)
    function initializeSearch() {
        // This could be implemented for future enhancement
        // Would allow filtering biographies by name, tags, or content
    }
    
})();
