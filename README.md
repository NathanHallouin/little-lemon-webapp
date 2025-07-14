# Little Lemon Restaurant Web Application

A modern, accessible web application for the Little Lemon Mediterranean restaurant in Orléans, France. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

- **Fully Accessible**: WCAG 2.1 AA compliant with comprehensive ARIA attributes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **Redux State Management**: Centralized cart and application state
- **Form Validation**: Robust form handling with Yup validation
- **SEO Optimized**: Complete meta tags and social media optimization
- **Performance Optimized**: Lazy loading, code splitting, and efficient rendering

## 🏗️ Architecture

### Core Technologies
- **React 19** with TypeScript
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Formik & Yup** for form handling
- **Vite** for build tooling

### Project Structure
```
app/
├── components/          # Reusable UI components
│   ├── about/          # About page components
│   ├── cart/           # Shopping cart components
│   ├── home/           # Home page components
│   ├── menu/           # Menu page components
│   ├── root/           # Layout components
│   └── ui/             # Accessible UI components
├── data/               # Static data and utilities
├── providers/          # Context providers
├── routes/             # Page components
├── store/              # Redux store configuration
└── root.tsx           # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd little-lemon-webapp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#495e57` (Forest Green)
- **Secondary Yellow**: `#f4ce14` (Sunshine Yellow)
- **Accent Orange**: `#ee9972` (Peach)
- **Neutral Gray**: `#edefee` (Light Gray)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Responsive**: Fluid typography scaling
- **Accessible**: High contrast ratios

## ♿ Accessibility Features

### ARIA Implementation
- Complete ARIA labels and descriptions
- Proper heading hierarchy
- Focus management and keyboard navigation
- Screen reader compatibility

### WCAG Compliance
- **Level AA** compliance
- Color contrast ratios meet standards
- Alternative text for all images
- Form labels and error messaging

### Keyboard Navigation
- Tab order optimization
- Focus indicators
- Skip links for main content
- Keyboard shortcuts for common actions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Touch-friendly interactions
- Optimized images and assets
- Flexible grid layouts

## 🛒 Shopping Cart

### Features
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state
- Checkout integration ready

### State Management
- Redux Toolkit for cart operations
- Optimistic updates
- Error handling
- Loading states

## 📝 Form Handling

### Reservation System
- Multi-step form validation
- Real-time error feedback
- Accessibility compliance
- Success/error states

### Validation
- Client-side validation with Yup
- Server-side validation ready
- Custom error messages
- Field-level validation

## 🧪 Testing

### Test Setup
- Vitest for unit testing
- React Testing Library
- Accessibility testing
- Component testing

### Running Tests
```bash
npm run test         # Run all tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## 🚀 Deployment

### Build Process
```bash
npm run build        # Create production build
npm run preview      # Preview production build
```

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 📚 Documentation

### Code Documentation
- **JSDoc Comments**: Comprehensive documentation for all complex functions
- **TypeScript Types**: Full type safety and documentation
- **Component Props**: Detailed prop interfaces
- **Function Parameters**: Clear parameter documentation

### Key Components

#### AccessibleButton
```typescript
/**
 * Accessible button component with comprehensive accessibility features
 * @param children - Button content
 * @param onClick - Click handler function
 * @param type - Button type (button, submit, reset)
 * @param disabled - Whether the button is disabled
 * @param loading - Whether the button is in loading state
 * @param variant - Button style variant
 * @param size - Button size
 * @returns Accessible button component with proper ARIA attributes
 */
```

#### Cart Management
```typescript
/**
 * Redux slice for cart management with add, remove, update, and clear operations
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds an item to the cart or increases quantity if already exists
     * @param state - Current cart state
     * @param action - Payload containing item details (without quantity)
     */
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      // Implementation
    }
  }
});
```

## 🤝 Contributing

### Development Guidelines
1. **Accessibility First**: All components must be accessible
2. **TypeScript**: Strict typing required
3. **Documentation**: JSDoc comments for complex functions
4. **Testing**: Unit tests for new features
5. **Code Style**: ESLint and Prettier configuration

### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and approval

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Mediterranean restaurant aesthetics
- **Accessibility**: WCAG guidelines and best practices
- **Performance**: Modern web performance optimization
- **User Experience**: Intuitive and delightful interactions

---

**Little Lemon Restaurant** - Bringing Mediterranean flavors to Orléans since 2003
