# RIDAUTO MOTOR - DESIGN SYSTEM
## Professional Automotive Website Design System

### 🎨 DESIGN PHILOSOPHY
A modern, trustworthy, and accessible design system that reflects automotive industry standards while maintaining contemporary web aesthetics. Inspired by Apple's precision, YouPlanet's clarity, and automotive industry best practices.

---

## 🎯 BRAND ATTRIBUTES
- **Trustworthy**: 25+ years of experience in automotive sales
- **Professional**: Premium car dealership aesthetic
- **Accessible**: WCAG AA compliant, multilingual support
- **Modern**: Contemporary design with subtle animations
- **Automotive-focused**: Industry-specific iconography and terminology

---

## 🎨 COLOR SYSTEM

### **Primary Palette**
```scss
// Brand Colors
$ridauto-primary: #1a365d;      // Deep Blue - Trust, reliability
$ridauto-secondary: #e53e3e;    // Alert Red - VENDIDO, urgent CTAs
$ridauto-accent: #3182ce;       // Bright Blue - Links, highlights
$ridauto-success: #38a169;      // Green - Available vehicles, success
$ridauto-warning: #dd6b20;      // Orange - Featured, warnings
$ridauto-info: #3182ce;         // Info Blue - General information

// Neutral Palette
$gray-50: #f7fafc;              // Background tints
$gray-100: #edf2f7;             // Borders, subtle backgrounds
$gray-200: #e2e8f0;             // Disabled states
$gray-300: #cbd5e0;             // Placeholder text
$gray-400: #a0aec0;             // Icons, secondary elements
$gray-500: #718096;             // Secondary text
$gray-600: #4a5568;             // Primary text (light mode)
$gray-700: #2d3748;             // Headings
$gray-800: #1a202c;             // Dark headings
$gray-900: #171923;             // Maximum contrast text
```

### **Semantic Colors**
```scss
$success: $ridauto-success;     // Available vehicles, form success
$error: $ridauto-secondary;     // Form errors, sold vehicles
$warning: $ridauto-warning;     // Alerts, featured content
$info: $ridauto-info;          // General information, links
```

### **Usage Guidelines**
- **Primary Blue**: Main navigation, primary buttons, brand elements
- **Alert Red**: "VENDIDO" badges, error states, urgent actions
- **Success Green**: Available status, completed actions
- **Grays**: Text, backgrounds, borders (ensure 4.5:1 contrast minimum)

---

## ✍️ TYPOGRAPHY SYSTEM

### **Font Families**
```scss
// Primary Font - Body Text
$font-primary: 'Inter', system-ui, -apple-system, sans-serif;

// Secondary Font - Headings
$font-secondary: 'Poppins', $font-primary;

// Monospace - Technical specs, prices
$font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### **Type Scale**
```scss
// Font Sizes
$text-xs: 0.75rem;      // 12px - Captions, fine print
$text-sm: 0.875rem;     // 14px - Secondary text, metadata
$text-base: 1rem;       // 16px - Body text, form inputs
$text-lg: 1.125rem;     // 18px - Large body text
$text-xl: 1.25rem;      // 20px - Subheadings
$text-2xl: 1.5rem;      // 24px - Card titles
$text-3xl: 1.875rem;    // 30px - Section headings
$text-4xl: 2.25rem;     // 36px - Page headings
$text-5xl: 3rem;        // 48px - Hero headings
$text-6xl: 3.75rem;     // 60px - Display headings

// Line Heights
$leading-tight: 1.25;    // Headings, short text
$leading-normal: 1.5;    // Body text
$leading-relaxed: 1.625; // Long-form content

// Font Weights
$font-light: 300;
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
$font-extrabold: 800;
```

### **Typography Hierarchy**
```scss
// Heading Styles
.heading-1 {
  font-family: $font-secondary;
  font-size: $text-5xl;
  font-weight: $font-bold;
  line-height: $leading-tight;
  color: $gray-900;
}

.heading-2 {
  font-family: $font-secondary;
  font-size: $text-4xl;
  font-weight: $font-semibold;
  line-height: $leading-tight;
  color: $gray-800;
}

.heading-3 {
  font-family: $font-secondary;
  font-size: $text-3xl;
  font-weight: $font-semibold;
  line-height: $leading-tight;
  color: $gray-700;
}

// Body Text
.body-large {
  font-family: $font-primary;
  font-size: $text-lg;
  font-weight: $font-normal;
  line-height: $leading-normal;
  color: $gray-600;
}

.body-regular {
  font-family: $font-primary;
  font-size: $text-base;
  font-weight: $font-normal;
  line-height: $leading-normal;
  color: $gray-600;
}

.body-small {
  font-family: $font-primary;
  font-size: $text-sm;
  font-weight: $font-normal;
  line-height: $leading-normal;
  color: $gray-500;
}
```

---

## 📏 SPACING SYSTEM

### **Spacing Scale**
```scss
// Base unit: 4px (0.25rem)
$space-0: 0;
$space-1: 0.25rem;      // 4px
$space-2: 0.5rem;       // 8px
$space-3: 0.75rem;      // 12px
$space-4: 1rem;         // 16px
$space-5: 1.25rem;      // 20px
$space-6: 1.5rem;       // 24px
$space-8: 2rem;         // 32px
$space-10: 2.5rem;      // 40px
$space-12: 3rem;        // 48px
$space-16: 4rem;        // 64px
$space-20: 5rem;        // 80px
$space-24: 6rem;        // 96px
$space-32: 8rem;        // 128px
```

### **Layout Spacing Guidelines**
- **Component padding**: $space-4 to $space-6
- **Section margins**: $space-12 to $space-20
- **Grid gaps**: $space-6 to $space-8
- **Button padding**: $space-3 vertical, $space-6 horizontal

---

## 🎯 COMPONENT LIBRARY

### **Buttons**
```scss
// Primary Button
.btn-primary {
  background: $ridauto-primary;
  color: white;
  padding: $space-3 $space-6;
  border-radius: 0.5rem;
  border: none;
  font-weight: $font-medium;
  font-size: $text-base;
  transition: all 0.3s ease;
  min-height: 44px; // Accessibility
  
  &:hover {
    background: darken($ridauto-primary, 10%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: $gray-300;
    cursor: not-allowed;
  }
}

// Secondary Button
.btn-secondary {
  background: white;
  color: $ridauto-primary;
  border: 2px solid $ridauto-primary;
  // ... similar properties
}

// VENDIDO Badge
.badge-vendido {
  background: $ridauto-secondary;
  color: white;
  padding: $space-1 $space-3;
  border-radius: 0.25rem;
  font-size: $text-sm;
  font-weight: $font-semibold;
  text-transform: uppercase;
  position: absolute;
  top: $space-2;
  left: $space-2;
  z-index: 10;
}
```

### **Vehicle Cards**
```scss
.vehicle-card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid $gray-200;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: $ridauto-accent;
  }
  
  .card-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .card-content {
    padding: $space-4;
    
    .vehicle-meta {
      display: flex;
      gap: $space-3;
      color: $gray-500;
      font-size: $text-sm;
      margin-bottom: $space-2;
    }
    
    .vehicle-title {
      font-size: $text-xl;
      font-weight: $font-semibold;
      color: $gray-900;
      margin-bottom: $space-2;
    }
    
    .vehicle-price {
      font-size: $text-2xl;
      font-weight: $font-bold;
      color: $ridauto-primary;
    }
  }
}
```

### **Forms**
```scss
.form-group {
  margin-bottom: $space-6;
  
  label {
    display: block;
    margin-bottom: $space-2;
    font-weight: $font-medium;
    color: $gray-700;
    font-size: $text-sm;
  }
  
  input, select, textarea {
    width: 100%;
    padding: $space-3;
    border: 2px solid $gray-200;
    border-radius: 0.5rem;
    font-size: $text-base;
    min-height: 44px; // Accessibility
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: $ridauto-accent;
      box-shadow: 0 0 0 3px rgba($ridauto-accent, 0.1);
    }
    
    &::placeholder {
      color: $gray-400;
    }
    
    &:invalid {
      border-color: $ridauto-secondary;
    }
  }
  
  .error-message {
    color: $ridauto-secondary;
    font-size: $text-sm;
    margin-top: $space-1;
  }
}
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints**
```scss
$breakpoint-sm: 640px;   // Mobile landscape
$breakpoint-md: 768px;   // Tablet portrait
$breakpoint-lg: 1024px;  // Tablet landscape / Small desktop
$breakpoint-xl: 1280px;  // Desktop
$breakpoint-2xl: 1536px; // Large desktop
```

### **Grid System**
```scss
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $space-4;
  
  @media (min-width: $breakpoint-sm) {
    padding: 0 $space-6;
  }
  
  @media (min-width: $breakpoint-lg) {
    padding: 0 $space-8;
  }
}

// Vehicle Grid
.vehicle-grid {
  display: grid;
  gap: $space-6;
  grid-template-columns: 1fr;
  
  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: $breakpoint-xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🎬 ANIMATION & TRANSITIONS

### **Animation Principles**
- **Duration**: 300ms for most interactions, 150ms for micro-interactions
- **Easing**: ease-in-out for natural movement
- **Transform**: Prefer transform over changing layout properties
- **Reduced Motion**: Respect prefers-reduced-motion media query

### **Animation Library**
```scss
// Transition Variables
$transition-fast: 150ms ease-in-out;
$transition-normal: 300ms ease-in-out;
$transition-slow: 500ms ease-in-out;

// Hover Effects
.hover-lift {
  transition: transform $transition-normal;
  
  &:hover {
    transform: translateY(-4px);
  }
}

.hover-scale {
  transition: transform $transition-normal;
  
  &:hover {
    transform: scale(1.05);
  }
}

// Loading Animations
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-pulse {
  animation: pulse 2s infinite;
}

// Typewriter Effect
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { opacity: 0; }
}

.typewriter {
  overflow: hidden;
  border-right: 2px solid $ridauto-primary;
  white-space: nowrap;
  animation: 
    typewriter 3s steps(30) infinite,
    blink 1s infinite;
}
```

---

## ♿ ACCESSIBILITY GUIDELINES

### **Color Contrast**
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI elements**: Minimum 3:1 contrast ratio for borders, focus indicators

### **Focus Management**
```scss
// Focus Styles
.focus-visible {
  outline: 2px solid $ridauto-accent;
  outline-offset: 2px;
}

// Skip Links
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: $ridauto-primary;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  
  &:focus {
    top: 6px;
  }
}
```

### **Semantic HTML**
- Use proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Alt text for all images
- ARIA labels for complex interactions
- Semantic landmarks (nav, main, aside, footer)

---

## 🌐 INTERNATIONALIZATION

### **Language Support**
- **Primary**: Spanish (ES)
- **Secondary**: English (EN)
- **Future**: Catalan, French (expandable)

### **Text Direction**
- LTR (Left-to-Right) for all supported languages
- RTL support consideration for future expansion

### **Cultural Considerations**
- Price formatting: European format (€ symbol)
- Date format: DD/MM/YYYY
- Phone number format: +34 XXX XXX XXX

---

## 🖼️ IMAGERY GUIDELINES

### **Photography Style**
- **High quality**: Minimum 1920px width for hero images
- **Consistent lighting**: Professional automotive photography
- **Color correction**: Consistent color temperature
- **Backgrounds**: Clean, uncluttered environments

### **Image Specifications**
```scss
// Vehicle Images
$image-vehicle-card: 400px × 300px;     // 4:3 aspect ratio
$image-vehicle-hero: 800px × 450px;     // 16:9 aspect ratio
$image-vehicle-detail: 1200px × 675px;  // 16:9 aspect ratio
$image-vehicle-thumb: 150px × 100px;    // 3:2 aspect ratio

// File Formats
// Primary: WebP with JPEG fallback
// Quality: 85% for regular images, 95% for hero images
// Lazy loading: All images below the fold
```

---

## 📊 PERFORMANCE TARGETS

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Lighthouse Scores**
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

---

## ✅ IMPLEMENTATION CHECKLIST

### **Base Setup**
- [ ] Install and configure design tokens
- [ ] Set up responsive grid system
- [ ] Implement color system
- [ ] Configure typography styles
- [ ] Create component library

### **Components**
- [ ] Button variants and states
- [ ] Vehicle card component
- [ ] Form components with validation
- [ ] Navigation components
- [ ] Modal/dialog components
- [ ] Loading states and skeletons

### **Accessibility**
- [ ] Color contrast verification
- [ ] Focus management implementation
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] ARIA implementation

### **Performance**
- [ ] Image optimization pipeline
- [ ] CSS/JS minification
- [ ] Lazy loading implementation
- [ ] Service worker setup
- [ ] CDN configuration

---

**Design System Version**: 1.0  
**Created**: January 2025  
**Framework**: Tailwind CSS with custom tokens  
**Accessibility Standard**: WCAG 2.1 AA  
**Browser Support**: Modern browsers (ES2020+)