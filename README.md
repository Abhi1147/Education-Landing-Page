# Premier Schools Exhibition (PSE) Landing Page

A high-performance, WCAG 2.2 AA compliant, fully responsive front-end landing page built with **Semantic HTML5**, **Custom CSS3 (BEM Methodology)**, and **Vanilla JavaScript**.

---

## 🌟 Key Features & Specifications

### 1. Stack & Architecture
- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` markup.
- **Custom CSS3**: Built with custom CSS properties (tokens), CSS Flexbox/Grid, and strict **BEM** (Block Element Modifier) class naming conventions. No CSS frameworks (no Bootstrap, no TailwindCSS).
- **W3C Validated**: Clean code structure adhering to modern web standards.

### 2. WCAG 2.2 AA Accessibility Compliance
- **Skip-to-Content Link**: Focusable `<a class="skip-link" href="#main-content">` jump link for keyboard & screen reader users.
- **ARIA Landmark & Carousel Specs**: Implements `role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-selected`, `aria-controls`, and `aria-valuenow`.
- **Keyboard Navigation**: Full keyboard control for dual-axis sliders (Left/Right arrows for cities, Up/Down arrows for sub-slides), carousels, and forms.
- **High-Contrast Focus Indicators**: Visible outline ring (`:focus-visible`) for interactive controls.
- **Motion Sensitivity**: `@media (prefers-reduced-motion: reduce)` disables continuous tickers and smooth transitions for users with vestibular sensitivity.

### 3. Hero Section - Dual-Axis Slider Matrix
- **2D Slide Matrix System**: 
  - **Horizontal Axis (X)**: Main event cities/destinations (Gurgaon, New Delhi, Mumbai).
  - **Vertical Axis (Y)**: Highlight sub-panels (Counseling, Admissions, International Curricula).
- **Controls & Interaction**:
  - Play / Pause slideshow toggle button with dynamic ARIA state updates.
  - Touch Swipe gesture support (detects horizontal vs. vertical swipes).
  - Automatic pause on mouse hover (`mouseenter`/`mouseleave`) and keyboard focus (`focusin`/`focusout`).

### 4. Participating School Logos - Continuous Sling Animation
- **Dual Alternating Tickers**:
  - **Row 1**: Moves continuously Left-to-Right (`marquee-scroll-ltr`).
  - **Row 2**: Moves continuously Right-to-Left (`marquee-scroll-rtl`).
- **Interactive States**: Seamlessly pauses on mouse hover and keyboard focus (`:focus-within`).

### 5. Choose the School Section
- **Desktop Layout (≥ 768px)**: Clean 4-card responsive CSS Grid layout.
- **Mobile Layout (< 768px)**: Converts into an interactive touch swipe slider with pagination indicator dots.

### 6. Exhibition Highlights Section
- **Highlights Carousel**: Displays 3 to 6 key highlight cards.
- **Equal Heights**: Flex/Grid stretch ensures uniform card heights.
- **Full Navigation**: Touch swipe, prev/next circular arrows, auto-play, and indicator dots.

---

## 📁 Directory & File Structure
