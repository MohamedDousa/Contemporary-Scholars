# Contemporary Scholars

A memorial website showcasing contemporary Islamic scholars who have passed away, organized by Islamic Hijri centuries with detailed biographies. Built with accessibility, performance, and maintainability in mind.

## 🌟 Features

- **🔍 Real-time Search**: Instant filtering by scholar name, death year, or century
- **📅 Hijri Calendar Organization**: Scholars organized by Islamic centuries (0-1500 AH)
- **♿ Accessible Design**: Full keyboard navigation, screen reader support, and WCAG 2.1 compliance
- **📱 Responsive Layout**: Mobile-first design that works on all devices
- **🎛️ Native HTML Accordions**: Uses `<details>` and `<summary>` for optimal accessibility
- **🎨 Clean Typography**: Readable fonts and proper contrast ratios
- **⚡ Performance Optimized**: Minimal JavaScript, efficient CSS, fast loading

## 🏗️ Project Structure

```
historical-figures/
├── index.html              # Main HTML file with scholar entries
├── css/
│   ├── reset.css           # CSS reset for consistency
│   ├── theme.css           # CSS custom properties and color scheme
│   └── styles.css          # Main stylesheet with search styles
├── js/
│   ├── accordion.js        # Enhanced accordion functionality
│   └── search.js           # Real-time search functionality
├── data/
│   └── biographies.json    # Biography data (legacy structure)
└── README.md               # This file
```

## 🚀 Getting Started

### Local Development
1. **Clone or download** this repository
2. **Open `index.html`** in a web browser
3. **That's it!** No build process or server required

For best experience:
- Use a local server (like Live Server in VS Code)
- Test the search functionality with different queries
- Try searching by name, year (e.g., "1420H"), or century

### GitHub Pages Deployment
1. **Upload to GitHub repository**
2. **Enable GitHub Pages** in repository settings
3. **Set source** to main branch
4. **Access via**: `https://yourusername.github.io/repository-name`

## 🔍 Using the Search Function

The search supports multiple query types:

- **By Name**: `"Baaz"` → finds Shaykh Ibn Baaz
- **By Year**: `"1420H"` → finds all scholars who died in 1420H
- **By Century**: `"1400"` → shows all 15th century AH scholars
- **Multiple Terms**: `"Muhammad 1420"` → finds scholars named Muhammad who died in 1420H
- **Partial Names**: `"Uthaymeen"` → finds the full scholar name

**Keyboard Shortcuts**:
- **Escape** → Clear search
- **Tab** → Navigate through interface

## ➕ Adding New Scholars

### Method 1: Direct HTML Edit
1. Find the appropriate century section in `index.html`
2. Copy an existing scholar card structure
3. Update with new scholar information

### Scholar Card Template
```html
<article class="biography-card" role="listitem">
    <details class="biography-details">
        <summary class="biography-summary" role="button" aria-expanded="false">
            <h3 class="biography-name">Shaykh [Name]</h3>
            <p class="biography-short">Islamic Scholar</p>
            <span class="biography-year" aria-label="Year of death">[Year]H</span>
        </summary>
        <div class="biography-content">
            <p class="biography-full">
                Biography details to be added later.
            </p>
            <div class="biography-tags">
                <span class="biography-tag">Islamic Studies</span>
                <span class="biography-tag">Scholar</span>
            </div>
        </div>
    </details>
</article>
```

### Method 2: Century Organization
- **1400-1500 AH**: For scholars who died between 1400-1499H
- **1300-1400 AH**: For scholars who died between 1300-1399H
- **Add new centuries** as needed following the same pattern

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of headings, landmarks, and ARIA labels
- **Keyboard Navigation**: 
  - Tab through all interactive elements
  - Enter/Space to open/close accordions
  - Search with keyboard shortcuts
- **Screen Reader Support**: Descriptive labels and live regions for search results
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast Support**: Adapts to system high contrast settings
- **Reduced Motion**: Respects user's motion preferences

## 🎨 Customization

### Colors and Theming
Edit `css/theme.css` to change:
- Color scheme (including search result colors)
- Typography settings
- Spacing values
- Status colors (success, warning, error)

### Search Styling
Edit the search-related CSS in `css/styles.css`:
- Search input appearance
- Results display styling
- Mobile responsive behavior

### Layout Changes
- Modify century section layouts
- Adjust card designs
- Update responsive breakpoints

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 10.1+, Edge 79+
- **Mobile**: iOS Safari 10.3+, Chrome Mobile 60+
- **Search Features**: Works in all modern browsers with JavaScript enabled
- **Accessibility**: Compatible with all major screen readers

## ⚡ Performance

- **Minimal Dependencies**: No external libraries required
- **Optimized CSS**: Modern CSS with efficient search styles
- **Lightweight JavaScript**: ~8KB total (accordion + search)
- **Fast Search**: Real-time filtering with smooth performance
- **Mobile Optimized**: Touch-friendly interface

## 🔮 Future Enhancements

### Phase 1 - Content Enhancement ✅
- [x] Real-time search functionality
- [x] Hijri calendar organization
- [x] Mobile responsive design
- [ ] Complete biographical details for all scholars
- [ ] Add more scholars from different centuries

### Phase 2 - User Experience
- [ ] Dark mode toggle
- [ ] Advanced search filters (by region, field of study)
- [ ] Bookmark/favorites system
- [ ] Share individual scholar profiles

### Phase 3 - Content Features
- [ ] Timeline view option
- [ ] Related scholars suggestions
- [ ] External links and authentic sources
- [ ] Audio pronunciation guides for Arabic names

### Phase 4 - Advanced Features
- [ ] Multi-language support (Arabic, English)
- [ ] Progressive Web App (PWA)
- [ ] Offline functionality
- [ ] Print-friendly layouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-scholar`)
3. Add new scholars or improve functionality
4. Test accessibility and search functionality
5. Submit a pull request

**Guidelines**:
- Ensure all biographical information is accurate and respectful
- Maintain proper Hijri date formatting
- Test search functionality with new additions
- Follow existing code style and structure

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🚀 Quick Deploy to GitHub Pages

1. **Create GitHub repository**
2. **Upload all files** (maintain folder structure)
3. **Go to Settings** → Pages
4. **Select source**: Deploy from a branch → main
5. **Your site will be live** at: `https://yourusername.github.io/repository-name`

**Note**: This website is a respectful memorial tribute to Islamic scholars. Please ensure all information is accurate and presented with proper Islamic etiquette.
