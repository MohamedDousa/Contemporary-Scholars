/**
 * Biography Links Functionality
 * Handles clickable scholar names and navigation to individual biography pages
 */

class BiographyLinks {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScholarLinks();
        this.setupLinkHandlers();
    }
    
    /**
     * Convert scholar name to URL-friendly filename
     */
    createSlug(name) {
        return name
            .toLowerCase()
            // Remove "Shaykh" prefix
            .replace(/^shaykh\s+/i, '')
            // Replace Arabic characters and special characters
            .replace(/[']/g, '')
            .replace(/[^\w\s-]/g, '')
            // Replace spaces and multiple hyphens with single hyphen
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '');
    }
    
    /**
     * Setup clickable links for all scholar names
     */
    setupScholarLinks() {
        // Only create links from English names to avoid Arabic slug issues
        const scholarNames = document.querySelectorAll('.biography-name.lang-en, .biography-name:not(.lang-ar)');
        
        scholarNames.forEach(nameElement => {
            const scholarName = nameElement.textContent.trim();
            const slug = this.createSlug(scholarName);
            const biographyUrl = `biographies/${slug}.html`;
            
            // Find the corresponding Arabic name element if it exists
            const card = nameElement.closest('.biography-card');
            const arabicNameElement = card?.querySelector('.biography-name.lang-ar');
            
            // Wrap the English text content in a link
            nameElement.innerHTML = `<a href="${biographyUrl}" class="scholar-name-link" onclick="event.stopPropagation()">${scholarName}</a>`;
            
            // Also wrap the Arabic name with the same link if it exists
            if (arabicNameElement) {
                const arabicName = arabicNameElement.textContent.trim();
                arabicNameElement.innerHTML = `<a href="${biographyUrl}" class="scholar-name-link" onclick="event.stopPropagation()">${arabicName}</a>`;
            }
        });
    }
    
    /**
     * Setup event handlers for link interactions
     */
    setupLinkHandlers() {
        // Add click handlers to prevent dropdown toggle when clicking name links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('scholar-name-link')) {
                e.stopPropagation();
                
                // Check if the biography page exists, if not show a placeholder message
                this.handleBiographyNavigation(e.target.href, e.target.textContent);
            }
        });
    }
    
    /**
     * Handle navigation to biography pages
     */
    handleBiographyNavigation(url, scholarName) {
        // For now, we'll check if the page exists and handle accordingly
        // In a production environment, you might want to generate pages dynamically
        // or show a "coming soon" message for pages that don't exist yet
        
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Page exists, navigate normally
                    window.location.href = url;
                } else {
                    // Page doesn't exist, show message or create placeholder
                    this.showComingSoonMessage(scholarName);
                }
            })
            .catch(() => {
                // Network error or page doesn't exist
                this.showComingSoonMessage(scholarName);
            });
    }
    
    /**
     * Show coming soon message for scholars without detailed pages yet
     */
    showComingSoonMessage(scholarName) {
        // Create a simple modal or alert for now
        // In production, you might want a more sophisticated approach
        const message = `Detailed biography for ${scholarName} is coming soon. Please check back later for more comprehensive information about this distinguished scholar.`;
        
        if (confirm(message + '\n\nWould you like to return to the main page?')) {
            // User can stay on current page or navigate elsewhere
        }
    }
    
    /**
     * Generate a list of all scholars for development purposes
     */
    generateScholarList() {
        const scholars = [];
        const scholarNames = document.querySelectorAll('.biography-name');
        
        scholarNames.forEach(nameElement => {
            const scholarName = nameElement.textContent.trim();
            const slug = this.createSlug(scholarName);
            const yearElement = nameElement.closest('.biography-card').querySelector('.biography-year');
            const year = yearElement ? yearElement.textContent.trim() : '';
            
            scholars.push({
                name: scholarName,
                slug: slug,
                year: year,
                filename: `${slug}.html`
            });
        });
        
        return scholars;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BiographyLinks();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BiographyLinks;
}
