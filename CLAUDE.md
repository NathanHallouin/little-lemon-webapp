# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Little Lemon is a Mediterranean restaurant web application built with React Router 7, TypeScript, and modern web technologies. The app features a fully responsive design, comprehensive accessibility (WCAG 2.1 AA), PWA capabilities, and Redux-powered cart management.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks with React Router typegen
```

### Testing
```bash
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with Vitest UI
npm run test:coverage # Run tests with coverage report
npm run test:accessibility # Run accessibility-specific tests
```

### PWA Tools
```bash
npm run generate-icons # Generate PWA icons from public/logo.jpg
npm run validate-pwa   # Validate PWA configuration
```

## Architecture

### Tech Stack
- **React Router 7** with SSR enabled (react-router.config.ts)
- **React 19** with TypeScript
- **Redux Toolkit** for cart state management
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Formik + Yup** for form handling and validation
- **Vitest + Testing Library** for testing

### Key Files
- `app/root.tsx` - Main layout, meta tags, PWA configuration
- `app/routes.ts` - Route definitions
- `app/store/` - Redux store and cart slice
- `app/providers/` - Context providers (Redux, Loading)
- `vite.config.ts` - Build configuration with asset optimization
- `react-router.config.ts` - SSR configuration

### Directory Structure
```
app/
├── components/
│   ├── about/      # About page components
│   ├── cart/       # Cart functionality
│   ├── home/       # Home page components  
│   ├── menu/       # Menu display components
│   ├── root/       # Layout components (NavBar, Footer)
│   └── ui/         # Reusable UI components
├── data/           # Static data (menu items)
├── providers/      # React context providers
├── routes/         # Page components
├── store/          # Redux store configuration
└── utils/          # Utility functions (meta-config)
```

## State Management

### Redux Store Structure
- **cart**: Manages shopping cart items, quantities, and total
- Store configured in `app/store/index.ts`
- Cart operations: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- Typed hooks available in `app/store/hooks.ts`

### Cart Integration
- Cart state persists across navigation
- Real-time total calculation
- Optimistic updates for better UX
- CartIcon component shows item count

## Key Patterns

### Component Architecture
- All components are functional with TypeScript
- JSDoc documentation for complex functions
- Accessibility-first approach with proper ARIA attributes
- Consistent error handling and loading states

### Route Structure  
- File-based routing with React Router 7
- Each route in `app/routes/` directory
- Meta tags handled per route with fallback to global
- Dynamic title updates based on current route

### Testing Approach
- Vitest with jsdom environment
- React Testing Library for component testing
- Global mocks for browser APIs (matchMedia, ResizeObserver, IntersectionObserver)
- Coverage reports exclude config and build files

## PWA Configuration

The app is configured as a Progressive Web App:
- Manifest in `public/manifest.json`
- Icons generated automatically with `npm run generate-icons`
- Service worker ready (not implemented)
- Apple touch icons and meta tags configured
- Microsoft Edge browserconfig.xml

## Accessibility Standards

- WCAG 2.1 AA compliant
- Skip links for keyboard navigation
- Proper heading hierarchy
- High contrast color scheme
- Screen reader compatibility
- Focus management and indicators

## Build Configuration

### Vite Settings
- Asset optimization with custom file naming
- TailwindCSS plugin integration
- TypeScript path resolution
- Image assets organized in `assets/images/`

### Environment
- SSR enabled by default
- Can be disabled in `react-router.config.ts` for SPA mode
- Development server with hot reload
- Production builds optimized for performance