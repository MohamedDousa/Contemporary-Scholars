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
            const centuryTitle = section.querySelector('.century-title').textContent;
            const scholarCards = section.querySelectorAll('.biography-card');
            
            scholarCards.forEach(card => {
                const nameElement = card.querySelector('.biography-name');
                const yearElement = card.querySelector('.biography-year');
                const shortDesc = card.querySelector('.biography-short');
                
                if (nameElement && yearElement) {
                    this.scholars.push({
                        element: card,
                        section: section,
                        name: nameElement.textContent.trim(),
                        year: yearElement.textContent.trim(),
                        century: centuryTitle,
                        shortDesc: shortDesc ? shortDesc.textContent.trim() : '',
                        searchText: this.createSearchText(nameElement.textContent, yearElement.textContent, centuryTitle)
                    });
                }
            });
        });
    }
    
    createSearchText(name, year, century) {
        // Create comprehensive search text including variations
        const searchText = [
            name,
            year,
            century,
            // Remove common prefixes for easier searching
            name.replace(/^Shaykh\s+/i, ''),
            // Extract just the number from year for numeric searches
            year.replace(/[^\d]/g, ''),
            // Add century range for searches like "1400"
            century.split('-')[0],
            century.split('-')[1]
        ].join(' ').toLowerCase();
        
        return searchText;
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
        
        if (query === '') {
            this.searchResults.innerHTML = `
                <p>Showing all ${this.scholars.length} scholars across ${this.centurySections.length} centuries</p>
            `;
            this.searchResults.className = 'search-results';
        } else {
            const visibleScholars = this.scholars.filter(scholar => 
                scholar.element.style.display !== 'none'
            );
            
            const visibleSections = this.centurySections.filter(section =>
                section.style.display !== 'none'
            );
            
            if (visibleScholars.length === 0) {
                this.searchResults.innerHTML = `
                    <p class="no-results">No scholars found matching "${query}". Try different search terms.</p>
                `;
                this.searchResults.className = 'search-results no-matches';
            } else {
                const pluralScholar = visibleScholars.length === 1 ? 'scholar' : 'scholars';
                const pluralCentury = visibleSections.length === 1 ? 'century' : 'centuries';
                
                this.searchResults.innerHTML = `
                    <p class="results-found">Found ${visibleScholars.length} ${pluralScholar} in ${visibleSections.length} ${pluralCentury} matching "${query}"</p>
                `;
                this.searchResults.className = 'search-results has-matches';
            }
        }
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.showAllScholars();
        this.updateResultsCount();
        this.searchInput.focus();
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScholarSearch();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScholarSearch();
    });
} else {
    new ScholarSearch();
}
