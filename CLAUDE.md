# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Create React App project for metta-fact.org - a retro-styled website that collects and displays "Metta facts" (submissions about Metta). The site features a 1980s terminal/CRT aesthetic with green-on-black styling, scanlines, and vintage effects.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Build for production (outputs to build/)
npm run build
```

## Tech Stack

- React 19.2.1
- Tailwind CSS (configured with PostCSS and Autoprefixer)
- lucide-react for icons
- Tally.so embedded form for submissions
- Create React App tooling (react-scripts)

## Architecture

### Component Structure

The app has a simple single-page architecture:

- [src/App.js](src/App.js) - Minimal root component that renders MetaFactSubmission
- [src/MetaFactSubmission.jsx](src/MetaFactSubmission.jsx) - Main component containing all functionality:
  - Screenshot carousel with manual/auto navigation
  - Typewriter effect for tagline animation
  - Tally.so iframe embed for form submissions
  - Retro CRT styling with custom CSS animations

### Styling Approach

The project uses a hybrid styling approach:

- Tailwind utility classes for layout and spacing
- Inline `<style>` tag in MetaFactSubmission component for retro effects:
  - `.scanlines` - CRT scanline overlay
  - `.crt` - Green glow text-shadow
  - `.retro-border` - Glowing green borders
  - `.retro-button` - Buttons with hover effects
  - `.retro-input` - Form input styling
  - `.blink` - Cursor blinking animation

Custom retro aesthetic is critical to the design - maintain monospace fonts, green-on-black color scheme, and terminal feel.

### Data Flow

- Screenshots array is hardcoded in MetaFactSubmission component with Imgur URLs
- Form submissions handled entirely by Tally.so embed (iframe at embed ID: RGWX64)
- No backend or API - purely client-side React app

### Effects and Animations

Three main useEffect hooks manage animations:

1. Typewriter effect - Cycles the tagline text character-by-character, resets after 10s
2. Screenshot auto-rotation - Changes every 20 seconds
3. Tally.so script injection - Loads external form embed script

## Configuration Files

- [tailwind.config.js](tailwind.config.js) - Scans src/**/*.{js,jsx,ts,tsx} for classes
- [postcss.config.js](postcss.config.js) - Runs Tailwind and Autoprefixer
- [public/manifest.json](public/manifest.json) - PWA manifest for metta-fact.org
- [public/index.html](public/index.html) - HTML template with meta tags

## Important Notes

- The Tally.so form embed ID is `RGWX64` - changing this breaks form submissions
- Screenshot carousel relies on specific Imgur URLs - verify links if images break
- All retro styling effects are in inline styles within MetaFactSubmission component
- The typewriter text quote is `"In the pulp with my tinky winkies!"` - this is intentional
