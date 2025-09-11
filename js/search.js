/**
 * Scholar Search Functionality
 * Provides real-time search and filtering for Islamic scholars
 */

class ScholarSearch {
    constructor() {
        this.searchInput = document.getElementById('scholar-search');
        this.clearButton = document.getElementById('clear-search');
        this.searchResults = document.getElementById('search-results');
        this.scholars = [];
        this.centurySections = [];
        
        this.init();
    }
    
    init() {
        if (!this.searchInput) return;
        
        // Collect all scholar data
        this.collectScholarData();
        
        // Bind events
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        this.clearButton.addEventListener('click', this.clearSearch.bind(this));
        
        // Initial state
        this.updateResultsCount();
    }
    
    collectScholarData() {
        // Get all century sections
        this.centurySections = Array.from(document.querySelectorAll('.century-section'));
        
        // Collect all scholars with their metadata
        this.scholars = [];
        
        this.centurySections.forEach(section => {
            // Get century title - prefer English for consistency, fallback to any title
            const centuryTitleEn = section.querySelector('.century-title')?.textContent || '';
            const scholarCards = section.querySelectorAll('.biography-card');
            
            scholarCards.forEach(card => {
                // Get both English and Arabic names
                const nameElementEn = card.querySelector('.biography-name.lang-en');
                const nameElementAr = card.querySelector('.biography-name.lang-ar');
                const yearElement = card.querySelector('.biography-year');
                
                // Get both English and Arabic descriptions
                const shortDescEn = card.querySelector('.biography-short.lang-en');
                const shortDescAr = card.querySelector('.biography-short.lang-ar');
                
                // Fallback to single name element if bilingual structure not present
                const fallbackName = card.querySelector('.biography-name');
                const fallbackDesc = card.querySelector('.biography-short');
                
                const nameEn = nameElementEn?.textContent?.trim() || fallbackName?.textContent?.trim() || '';
                const nameAr = nameElementAr?.textContent?.trim() || '';
                const year = yearElement?.textContent?.trim() || '';
                const descEn = shortDescEn?.textContent?.trim() || fallbackDesc?.textContent?.trim() || '';
                const descAr = shortDescAr?.textContent?.trim() || '';
                
                if ((nameEn || nameAr) && yearElement) {
                    this.scholars.push({
                        element: card,
                        section: section,
                        nameEn: nameEn,
                        nameAr: nameAr,
                        year: year,
                        century: centuryTitleEn,
                        shortDescEn: descEn,
                        shortDescAr: descAr,
                        searchText: this.createSearchText(nameEn, nameAr, year, centuryTitleEn, descEn, descAr)
                    });
                }
            });
        });
    }
    
    createSearchText(nameEn, nameAr, year, century, descEn, descAr) {
        // Create comprehensive search text including both languages
        const searchTerms = [];
        
        // Add English content
        if (nameEn) {
            searchTerms.push(nameEn);
            // Remove common prefixes for easier searching
            searchTerms.push(nameEn.replace(/^Shaykh\s+/i, ''));
            searchTerms.push(nameEn.replace(/^Dr\.\s+/i, ''));
            searchTerms.push(nameEn.replace(/^Abū\s+/i, ''));
        }
        
        // Add Arabic content
        if (nameAr) {
            searchTerms.push(nameAr);
            // Remove common Arabic prefixes
            searchTerms.push(nameAr.replace(/^الشيخ\s+/i, ''));
            searchTerms.push(nameAr.replace(/^الدكتور\s+/i, ''));
            searchTerms.push(nameAr.replace(/^أبو\s+/i, ''));
        }
        
        // Add year information
        if (year) {
            searchTerms.push(year);
            // Extract just the number from year for numeric searches
            const yearNumber = year.replace(/[^\d]/g, '');
            if (yearNumber) {
                searchTerms.push(yearNumber);
            }
        }
        
        // Add century information
        if (century) {
            searchTerms.push(century);
            // Add century range for searches like "1400"
            const centuryParts = century.split('-');
            centuryParts.forEach(part => {
                const cleanPart = part.replace(/[^\d]/g, '');
                if (cleanPart) {
                    searchTerms.push(cleanPart);
                }
            });
        }
        
        // Add descriptions
        if (descEn) searchTerms.push(descEn);
        if (descAr) searchTerms.push(descAr);
        
        // Join all terms and normalize
        return searchTerms
            .filter(term => term && term.length > 0)
            .join(' ')
            .toLowerCase()
            .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // Keep Arabic characters
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    handleKeydown(event) {
        // Clear search on Escape key
        if (event.key === 'Escape') {
            this.clearSearch();
        }
    }
    
    handleSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        
        if (query === '') {
            this.showAllScholars();
            this.updateResultsCount();
            return;
        }
        
        this.filterScholars(query);
        this.updateResultsCount(query);
    }
    
    filterScholars(query) {
        let visibleCount = 0;
        const queryTerms = query.split(/\s+/).filter(term => term.length > 0);
        
        // Hide all sections initially
        this.centurySections.forEach(section => {
            section.style.display = 'none';
        });
        
        this.scholars.forEach(scholar => {
            const matches = queryTerms.every(term => 
                scholar.searchText.includes(term)
            );
            
            if (matches) {
                scholar.element.style.display = 'block';
                scholar.section.style.display = 'block';
                visibleCount++;
            } else {
                scholar.element.style.display = 'none';
            }
        });
        
        // Hide sections with no visible scholars
        this.centurySections.forEach(section => {
            const visibleScholars = section.querySelectorAll('.biography-card[style*="block"]');
            if (visibleScholars.length === 0) {
                section.style.display = 'none';
            }
        });
        
        return visibleCount;
    }
    
    showAllScholars() {
        // Show all sections and scholars
        this.centurySections.forEach(section => {
            section.style.display = 'block';
        });
        
        this.scholars.forEach(scholar => {
            scholar.element.style.display = 'block';
        });
    }
    
    updateResultsCount(query = '') {
        if (!this.searchResults) return;
        
        // Get current language from language toggle if available
        const currentLang = window.languageToggle ? window.languageToggle.getCurrentLanguage() : 'en';
        
        if (query === '') {
            // No search query - showing all scholars
            const message = this.getShowAllMessage(currentLang);
            this.searchResults.innerHTML = `<p>${message}</p>`;
            this.searchResults.className = 'search-results';
        } else {
            const visibleScholars = this.scholars.filter(scholar => 
                scholar.element.style.display !== 'none'
            );
            
            const visibleSections = this.centurySections.filter(section =>
                section.style.display !== 'none'
            );
            
            if (visibleScholars.length === 0) {
                // No results found
                const message = this.getNoResultsMessage(currentLang, query);
                this.searchResults.innerHTML = `<p class="no-results">${message}</p>`;
                this.searchResults.className = 'search-results no-matches';
            } else {
                // Results found
                const message = this.getResultsFoundMessage(currentLang, visibleScholars.length, visibleSections.length, query);
                this.searchResults.innerHTML = `<p class="results-found">${message}</p>`;
                this.searchResults.className = 'search-results has-matches';
            }
        }
    }
    
    getShowAllMessage(lang) {
        const messages = {
            en: `Showing all ${this.scholars.length} scholars across ${this.centurySections.length} centuries`,
            ar: `عرض جميع ${this.scholars.length} عالم عبر ${this.centurySections.length} قرن`
        };
        return messages[lang] || messages.en;
    }
    
    getNoResultsMessage(lang, query) {
        const messages = {
            en: `No scholars found matching "${query}". Try different search terms.`,
            ar: `لم يتم العثور على علماء مطابقين لـ "${query}". جرب مصطلحات بحث مختلفة.`
        };
        return messages[lang] || messages.en;
    }
    
    getResultsFoundMessage(lang, scholarCount, sectionCount, query) {
        const messages = {
            en: {
                scholar: scholarCount === 1 ? 'scholar' : 'scholars',
                century: sectionCount === 1 ? 'century' : 'centuries',
                template: `Found ${scholarCount} {scholar} in ${sectionCount} {century} matching "${query}"`
            },
            ar: {
                scholar: 'عالم', // Arabic doesn't pluralize numbers the same way
                century: 'قرن',
                template: `تم العثور على ${scholarCount} {scholar} في ${sectionCount} {century} مطابق لـ "${query}"`
            }
        };
        
        const langData = messages[lang] || messages.en;
        return langData.template
            .replace('{scholar}', langData.scholar)
            .replace('{century}', langData.century);
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.showAllScholars();
        this.updateResultsCount();
        this.searchInput.focus();
    }
    
    // Method to refresh search results when language changes
    refreshForLanguageChange() {
        // Re-collect scholar data to get updated bilingual content
        this.collectScholarData();
        
        // Update results display with current query
        const currentQuery = this.searchInput.value.trim();
        if (currentQuery) {
            this.filterScholars(currentQuery.toLowerCase());
        }
        this.updateResultsCount(currentQuery);
    }
}

// Global reference for other scripts
let scholarSearch = null;

// Initialize search when DOM is loaded
function initializeSearch() {
    scholarSearch = new ScholarSearch();
    window.scholarSearch = scholarSearch; // Make globally available
    
    // Listen for language change events
    document.addEventListener('languageChanged', (event) => {
        if (scholarSearch) {
            scholarSearch.refreshForLanguageChange();
        }
    });
}

// Initialize based on DOM state
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}
