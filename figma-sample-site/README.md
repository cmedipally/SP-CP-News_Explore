# Figma MCP Sample Site

This sample site was created using design elements extracted from Figma via the Figma MCP (Model Context Protocol) server.

## 🎨 Design Source

- **Figma File**: MCP_Test
- **Node ID**: 1:27963
- **Design Type**: SharePoint-like browser interface
- **Components**: 138 Figma components used

## 📁 Project Structure

```
figma-sample-site/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling based on Figma design tokens
├── script.js       # Interactive JavaScript functionality
└── README.md       # This file
```

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. No build process or dependencies required!
3. Works offline - pure HTML/CSS/JS

## ✨ Features

### Browser Chrome
- macOS-style caption controls (red, yellow, green buttons)
- Tab bar with active tab display
- Address bar (omnibox) with lock icon
- Toolbar with navigation and action buttons

### Main Interface
- **Sidebar Navigation**: Quick access to different sections
- **Search Bar**: Site-wide search functionality
- **Hero Section**: "Start building" with input prompt
- **Option Cards**: Four main building options
  - Site
  - List
  - Document library
  - Agent
- **Featured Cards**: Highlighted recommendations
- **Data Table**: "Owned by me" section with sortable content
- **Tab Navigation**: Switch between different views

## 🎯 Interactive Elements

All buttons and interactive elements include:
- Hover effects
- Click animations with ripple effects
- Console logging for debugging
- Smooth transitions and animations
- Scroll-based fade-in animations

## 🎨 Design System

### Colors
- Primary: `#0078D4` (Microsoft Blue)
- Background: `#F3F2F1` (Neutral Gray)
- Surface: `#FFFFFF` (White)
- Text: `rgba(0, 0, 0, 0.86)` (Primary Text)
- Secondary Text: `rgba(0, 0, 0, 0.56)`

### Typography
- Font Family: Segoe UI Variable, Segoe UI, System UI
- Base Size: 14px
- Line Height: 20px

### Spacing & Layout
- Border Radius: 4px (small), 8px (medium), 10000px (circular)
- Shadows: Layered drop shadows for depth
- Grid: Responsive grid layout for cards

## 🔧 Customization

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #0078D4;
    --color-secondary: #00BCF2;
    /* ... more variables */
}
```

### Add New Components
Follow the existing HTML structure and use the same CSS classes for consistency.

### Extend Functionality
Add new event listeners in `script.js` following the existing patterns.

## 📱 Responsive Design

The site includes responsive breakpoints and flexible layouts:
- Grid auto-fit for cards
- Flexible sidebar
- Scalable typography
- Mobile-friendly touch targets

## 🔗 Figma MCP Integration

This site was generated using:
1. **Figma MCP Server**: Running on `http://127.0.0.1:3845/mcp`
2. **Design Context Extraction**: Retrieved component details, styles, and layout
3. **Code Generation**: Converted Figma design to HTML/CSS/JS

### MCP Server Setup
```bash
# Add Figma MCP server to Claude Code
claude mcp add --transport http figma http://127.0.0.1:3845/mcp
```

## 🎓 Learning Points

This project demonstrates:
- Design-to-code workflow using MCP
- Component-based HTML structure
- CSS custom properties (variables)
- Modern JavaScript (ES6+)
- Intersection Observer API
- Event delegation patterns
- CSS Grid and Flexbox layouts

## 📝 Notes

- Images use placeholder URLs - replace with actual assets
- Some features are demo placeholders (alerts, console logs)
- Designed for desktop-first experience
- Browser compatibility: Modern browsers (Chrome, Edge, Firefox, Safari)

## 🚧 Future Enhancements

- [ ] Add real data integration
- [ ] Implement search functionality
- [ ] Add filters and sorting
- [ ] Create responsive mobile layouts
- [ ] Add dark mode support
- [ ] Implement routing (SPA)
- [ ] Add authentication flow

## 📄 License

This is a sample/demo project created for testing Figma MCP integration.

---

**Created with Claude Code + Figma MCP Server**
Generated: 2026-01-27
