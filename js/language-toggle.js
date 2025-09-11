/**
 * Language Toggle Functionality
 * Handles switching between English and Arabic content
 * Manages RTL/LTR layout and user preferences
 */

class LanguageToggle {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.translations = {
            en: {
                searchPlaceholder: "Search by name, year (e.g., 1420H), or century...",
                searchHelp: "Search examples: \"Ibn Baaz\", \"1420H\", \"1400-1500\", or \"Uthaymeen\"",
                resultsFound: "scholars found",
                noResults: "No scholars found matching your search.",
                showingAll: "Showing all scholars"
            },
            ar: {
                searchPlaceholder: "البحث بالاسم، السنة (مثل: 1420هـ)، أو القرن...",
                searchHelp: "أمثلة البحث: \"ابن باز\"، \"1420هـ\"، \"1400-1500\"، أو \"العثيمين\"",
                resultsFound: "عالم موجود",
                noResults: "لم يتم العثور على علماء مطابقين لبحثك.",
                showingAll: "عرض جميع العلماء"
            }
        };
        this.init();
    }

    init() {
        this.createToggleButton();
        this.setupEventListeners();
        this.setLanguage(this.currentLang);
        this.updateSearchInterface();
    }

    createToggleButton() {
        const toggleHTML = `
            <div class="language-toggle">
                <div class="language-switch">
                    <button class="language-option" data-lang="en" aria-label="Switch to English">
                        English
                    </button>
                    <button class="language-option" data-lang="ar" aria-label="التبديل إلى العربية">
                        العربية
                    </button>
                </div>
            </div>
        `;
        
        // Find the best insertion point
        const searchSection = document.querySelector('.search-section');
        const mainContent = document.querySelector('.main-content .container');
        const scholarHeader = document.querySelector('.scholar-header');
        
        let insertPoint = null;
        
        if (searchSection) {
            // Main page - insert after search section
            insertPoint = searchSection;
        } else if (scholarHeader) {
            // Biography page - insert after scholar header
            insertPoint = scholarHeader;
        } else if (mainContent) {
            // Fallback - insert at beginning of main content
            insertPoint = mainContent.firstElementChild;
        }
        
        if (insertPoint) {
            insertPoint.insertAdjacentHTML('afterend', toggleHTML);
        } else {
            console.warn('Could not find suitable insertion point for language toggle');
        }
    }

    setupEventListeners() {
        // Handle toggle button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.language-option')) {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('.language-option')) {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const buttons = document.querySelectorAll('.language-option');
                    const currentIndex = Array.from(buttons).indexOf(e.target);
                    const nextIndex = e.key === 'ArrowRight' ? 
                        (currentIndex + 1) % buttons.length : 
                        (currentIndex - 1 + buttons.length) % buttons.length;
                    buttons[nextIndex].focus();
                }
            }
        });

        // Handle page visibility change to maintain language state
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.setLanguage(this.currentLang);
            }
        });
    }

    setLanguage(lang) {
        if (!['en', 'ar'].includes(lang)) {
            console.warn(`Invalid language: ${lang}. Defaulting to English.`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);

        // Update active button state
        this.updateToggleButtons(lang);
        
        // Update document attributes
        this.updateDocumentAttributes(lang);
        
        // Show/hide language content
        this.toggleLanguageContent(lang);
        
        // Update interface text
        this.updateInterfaceText(lang);
        
        // Trigger custom event for other components
        this.dispatchLanguageChangeEvent(lang);
        
        // Analytics tracking (if available)
        this.trackLanguageChange(lang);
    }

    updateToggleButtons(lang) {
        const buttons = document.querySelectorAll('.language-option');
        buttons.forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    updateDocumentAttributes(lang) {
        const html = document.documentElement;
        
        // Set language and direction
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update body class for styling hooks
        document.body.classList.toggle('lang-arabic', lang === 'ar');
        document.body.classList.toggle('lang-english', lang === 'en');
    }

    toggleLanguageContent(lang) {
        // Hide all language content first
        document.querySelectorAll('.lang-content').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Show content for selected language
        document.querySelectorAll(`.lang-${lang}`).forEach(el => {
            el.classList.remove('hidden');
        });
        
        // Handle content-specific classes
        document.querySelectorAll('.content-arabic, .content-english').forEach(el => {
            el.style.display = 'none';
        });
        
        const activeContentClass = lang === 'ar' ? '.content-arabic' : '.content-english';
        document.querySelectorAll(activeContentClass).forEach(el => {
            el.style.display = 'block';
        });
    }

    updateInterfaceText(lang) {
        const t = this.translations[lang];
        
        // Update search placeholder
        const searchInput = document.getElementById('scholar-search');
        if (searchInput) {
            searchInput.placeholder = t.searchPlaceholder;
        }
        
        // Update search help text
        const searchHelp = document.querySelector('.search-help p');
        if (searchHelp) {
            searchHelp.textContent = t.searchHelp;
        }
        
        // Update search results text if visible
        this.updateSearchResultsText(lang);
    }

    updateSearchResultsText(lang) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults || !searchResults.textContent.trim()) return;
        
        const t = this.translations[lang];
        const currentText = searchResults.textContent;
        
        // Update results count text
        if (currentText.includes('scholars found') || currentText.includes('عالم موجود')) {
            const numbers = currentText.match(/\d+/g);
            if (numbers && numbers.length > 0) {
                const count = numbers[0];
                searchResults.innerHTML = `<span class="results-found">${count} ${t.resultsFound}</span>`;
            }
        }
        
        // Update "no results" message
        if (currentText.includes('No scholars found') || currentText.includes('لم يتم العثور')) {
            searchResults.innerHTML = `<span class="no-results">${t.noResults}</span>`;
        }
        
        // Update "showing all" message
        if (currentText.includes('Showing all') || currentText.includes('عرض جميع')) {
            searchResults.innerHTML = `<span class="results-found">${t.showingAll}</span>`;
        }
    }

    updateSearchInterface() {
        // Update the search component to work with language changes
        const searchComponent = window.scholarSearch;
        if (searchComponent && typeof searchComponent.updateResultsCount === 'function') {
            // Re-run search results update to reflect new language
            const searchInput = document.getElementById('scholar-search');
            if (searchInput && searchInput.value.trim()) {
                searchComponent.handleSearch({ target: searchInput });
            } else {
                searchComponent.updateResultsCount('');
            }
        }
    }

    dispatchLanguageChangeEvent(lang) {
        const event = new CustomEvent('languageChanged', {
            detail: { language: lang, isRTL: lang === 'ar' },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    trackLanguageChange(lang) {
        // Analytics tracking (if Google Analytics or similar is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_change', {
                'language': lang,
                'page_title': document.title
            });
        }
        
        // Console logging for development
        console.log(`Language changed to: ${lang === 'ar' ? 'Arabic' : 'English'}`);
    }

    // Public method to get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Public method to check if current language is RTL
    isRTL() {
        return this.currentLang === 'ar';
    }

    // Method to handle dynamic content updates
    updateDynamicContent(element, englishText, arabicText) {
        if (!element) return;
        
        // Create language-specific spans if they don't exist
        let englishSpan = element.querySelector('.lang-en');
        let arabicSpan = element.querySelector('.lang-ar');
        
        if (!englishSpan) {
            englishSpan = document.createElement('span');
            englishSpan.className = 'lang-content lang-en';
            element.appendChild(englishSpan);
        }
        
        if (!arabicSpan) {
            arabicSpan = document.createElement('span');
            arabicSpan.className = 'lang-content lang-ar content-arabic';
            element.appendChild(arabicSpan);
        }
        
        englishSpan.textContent = englishText;
        arabicSpan.textContent = arabicText;
        
        // Apply current language visibility
        this.toggleLanguageContent(this.currentLang);
    }
}

// Initialize language toggle when DOM is ready
let languageToggle = null;

document.addEventListener('DOMContentLoaded', () => {
    languageToggle = new LanguageToggle();
    
    // Make it globally available for other scripts
    window.languageToggle = languageToggle;
});

// Handle dynamic imports and page navigation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!languageToggle) {
            languageToggle = new LanguageToggle();
            window.languageToggle = languageToggle;
        }
    });
} else {
    // DOM is already loaded
    if (!languageToggle) {
        languageToggle = new LanguageToggle();
        window.languageToggle = languageToggle;
    }
}
