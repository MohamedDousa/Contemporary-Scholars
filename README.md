# Contemporary Icons We've Lost

A memorial website showcasing contemporary figures who have passed away, organized by decade with detailed biographies. Built with accessibility, performance, and maintainability in mind.

## Features

- **Accessible Design**: Full keyboard navigation, screen reader support, and WCAG 2.1 compliance
- **Responsive Layout**: Mobile-first design that works on all devices
- **Native HTML Accordions**: Uses `<details>` and `<summary>` for optimal accessibility
- **Clean Typography**: Readable fonts and proper contrast ratios
- **Easy Maintenance**: Simple JSON-based data structure for adding new biographies
- **Performance Optimized**: Minimal JavaScript, efficient CSS, fast loading

## Project Structure

```
historical-figures/
├── index.html              # Main HTML file
├── css/
│   ├── reset.css           # CSS reset for consistency
│   ├── theme.css           # CSS custom properties (variables)
│   └── styles.css          # Main stylesheet
├── js/
│   └── accordion.js        # Enhanced accordion functionality
├── data/
│   └── biographies.json    # Biography data
└── README.md               # This file
```

## Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in a web browser
3. **That's it!** No build process or server required

For development:
- Use a local server (like Live Server in VS Code) for the best experience
- Edit `data/biographies.json` to add new biographies
- Modify CSS custom properties in `theme.css` to change the design

## Adding New Biographies

### Method 1: Edit JSON File
1. Open `data/biographies.json`
2. Add a new object to the `figures` array:

```json
{
  "name": "Full Name",
  "yearOfDeath": 2023,
  "shortBio": "Brief one-line description",
  "fullBio": "Extended biography text with full details...",
  "tags": ["category1", "category2", "category3"]
}
```

3. Update the HTML file to include the new biography in the appropriate decade section

### Method 2: Direct HTML Edit
1. Find the appropriate decade section in `index.html`
2. Copy an existing biography card structure
3. Update the content with new information

### Biography Card Template
```html
<article class="biography-card" role="listitem">
    <details class="biography-details">
        <summary class="biography-summary" role="button" aria-expanded="false">
            <h3 class="biography-name">Name Here</h3>
            <p class="biography-short">Short description</p>
            <span class="biography-year" aria-label="Year of death">YYYY</span>
        </summary>
        <div class="biography-content">
            <p class="biography-full">
                Full biography text here...
            </p>
            <div class="biography-tags">
                <span class="biography-tag">Tag 1</span>
                <span class="biography-tag">Tag 2</span>
            </div>
        </div>
    </details>
</article>
```

## Accessibility Features

- **Semantic HTML**: Proper use of headings, landmarks, and ARIA labels
- **Keyboard Navigation**: 
  - Tab through all interactive elements
  - Enter/Space to open/close accordions
  - Arrow keys to navigate between accordions
  - Home/End to jump to first/last accordion
- **Screen Reader Support**: Descriptive labels and proper markup
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast Support**: Adapts to system high contrast settings
- **Reduced Motion**: Respects user's motion preferences

## Customization

### Colors and Theming
Edit `css/theme.css` to change:
- Color scheme
- Typography settings
- Spacing values
- Border radius and shadows

### Layout Changes
Edit `css/styles.css` to modify:
- Grid layouts
- Card designs
- Responsive breakpoints
- Animations

### Adding New Decades
1. Create a new decade section in `index.html`
2. Follow the existing pattern with proper heading hierarchy
3. Add biography cards as needed

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 10.1+, Edge 79+
- **Mobile**: iOS Safari 10.3+, Chrome Mobile 60+
- **Accessibility**: Works with all major screen readers

## Performance

- **Minimal Dependencies**: No external libraries required
- **Optimized CSS**: Uses modern CSS features efficiently
- **Small JavaScript**: Only ~5KB of optional enhancement code
- **Fast Loading**: Typically loads in under 1 second

## Future Enhancements

### Phase 1 - Data Management
- [ ] Convert to static site generator (11ty, Jekyll, etc.)
- [ ] Add admin interface for managing biographies
- [ ] Implement search functionality
- [ ] Add filtering by tags/categories

### Phase 2 - User Experience
- [ ] Dark mode toggle
- [ ] Font size controls
- [ ] Bookmark/favorites system
- [ ] Share individual biographies

### Phase 3 - Content Enhancement
- [ ] Timeline view option
- [ ] Related figures suggestions
- [ ] External links and sources
- [ ] Audio pronunciation guides

### Phase 4 - Advanced Features
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Offline functionality
- [ ] Analytics and insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test for accessibility and responsiveness
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with modern web standards and accessibility best practices
- Inspired by the need to remember and honor influential figures
- Designed for longevity and ease of maintenance

---

**Note**: This website is a memorial tribute. Please ensure all biographical information is accurate and respectful.
