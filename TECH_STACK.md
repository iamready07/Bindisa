# Bindisa Agritech - Complete Technology Stack Documentation

## 🌾 Project Overview

**Bindisa Agritech Pvt. Ltd.** - Agricultural Technology Startup Website

- **Company**: Bindisa Agritech Pvt. Ltd.
- **Location**: Gaya, Bihar, India
- **Incorporation**: February 17, 2025
- **CIN**: U46539BR2025PTC073688
- **Live Website**: https://84d5e124c4bf443a9959862558e52ffe-ae9b4ca0132849758c8f0e94f.fly.dev/

## 🛠️ Core Technology Stack

### Frontend Framework

```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "buildTool": "Vite",
  "routing": "React Router 6"
}
```

### Styling & Design

```json
{
  "cssFramework": "TailwindCSS 3",
  "componentLibrary": "shadcn/ui",
  "iconLibrary": "Lucide React",
  "designSystem": "Custom Agricultural Theme"
}
```

### Color Palette

```css
:root {
  --agri-primary: #16a34a; /* Forest Green */
  --agri-secondary: #92400e; /* Soil Brown */
  --agri-accent: #fde68a; /* Golden Yellow */
  --agri-light: #f7fafc; /* Light Gray */
  --agri-dark: #1a1a1a; /* Dark Gray */
}
```

## 📦 Dependencies

### Core Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "typescript": "^5.0.0"
}
```

### UI & Styling

```json
{
  "tailwindcss": "^3.0.0",
  "@radix-ui/react-dropdown-menu": "^2.0.0",
  "@radix-ui/react-slot": "^1.0.0",
  "lucide-react": "^0.263.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0"
}
```

### Development Tools

```json
{
  "vite": "^4.0.0",
  "vitest": "^0.34.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

## 🏗️ Project Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── Hero.tsx         # Hero section component
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── About.tsx        # Company information
│   ├── Team.tsx         # Team showcase
│   ├── Technology.tsx   # Technology overview
│   ├── SoilAnalysis.tsx # Interactive soil tool
│   ├── Chatbot.tsx      # AI assistant
│   └── Contact.tsx      # Contact form
├── contexts/            # React contexts
│   ├── LanguageContext.tsx  # Internationalization
│   └── AuthContext.tsx     # Authentication
├── data/                # Static data
│   ├── teamMembers.ts   # Team information
│   ├── achievements.ts  # Company milestones
│   └── testimonials.ts  # Success stories
├── App.tsx              # Main app component
└── main.tsx            # Entry point
```

## 🌍 Features Implemented

### 1. Multilingual Support

- **Languages**: English, Hindi, Marathi
- **Implementation**: React Context + localStorage
- **Translation Keys**: 100+ keys covering all content

### 2. Interactive Tools

- **Soil Analysis Tool**: Real-time parameter analysis
- **AI Chatbot**: Multilingual agricultural assistant
- **Authentication**: Login/Register system

### 3. Responsive Design

- **Mobile-First**: TailwindCSS responsive utilities
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Components**: Adaptive navigation, flexible layouts

### 4. Performance Optimizations

- **Image Optimization**: Builder.io CDN with srcSet
- **Lazy Loading**: React.lazy for code splitting
- **Bundle Optimization**: Vite tree-shaking

## 🎨 Design System

### Typography

```css
.font-heading {
  font-family: "Inter", sans-serif;
  font-weight: 700;
}

.font-body {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}
```

### Custom Components

```css
.btn-agri-primary {
  @apply bg-agri-primary text-white hover:bg-green-700 transition-colors;
}

.card-agri {
  @apply bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow;
}

.agri-gradient {
  @apply bg-gradient-to-r from-agri-primary to-green-600;
}
```

## 🔧 Development Setup

### Prerequisites

```bash
Node.js >= 18.0.0
npm or yarn or pnpm
```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd bindisa-agritech

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "test": "vitest"
}
```

## 🚀 Deployment

### Platform: Fly.io

- **Live URL**: https://84d5e124c4bf443a9959862558e52ffe-ae9b4ca0132849758c8f0e94f.fly.dev/
- **CDN**: Builder.io for optimized images
- **Static Assets**: Hosted on Fly.io

### Build Configuration

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

## 📱 Pages & Functionality

### Main Pages (12 total)

1. **Home** (`/`) - Landing page with hero section
2. **About** (`/about`) - Company story and mission
3. **Team** (`/team`) - Team members with filtering
4. **Technology** (`/technology`) - Tech stack overview
5. **Success Stories** (`/success-stories`) - Farmer testimonials
6. **Soil Analysis** (`/soil-analysis`) - Interactive tool
7. **Chatbot** (`/chatbot`) - AI assistant
8. **Contact** (`/contact`) - Contact form + map
9. **Login** (`/login`) - Authentication
10. **Register** (`/register`) - User registration
11. **Location** (`/location`) - Bihar operations
12. **Achievements** (`/achievements`) - Awards timeline

### Interactive Features

- **Real-time Soil Analysis**: pH, NPK, moisture testing
- **Multilingual AI Chat**: Context-aware responses
- **Team Filtering**: By department (Leadership, Tech, Finance, Research, Operations)
- **Success Story Filtering**: By crop type and impact metrics
- **Google Maps Integration**: Company location in Gaya, Bihar

## 🔍 SEO & Accessibility

### SEO Features

- **Semantic HTML**: Proper heading structure
- **Meta Tags**: Title, description for each page
- **Open Graph**: Social media sharing
- **Sitemap**: Auto-generated sitemap

### Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliant
- **Responsive Images**: Alt text and proper sizing

## 📊 Analytics & Monitoring

### Performance Metrics

- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized loading times
- **Bundle Size**: Minimized with tree-shaking
- **Image Optimization**: WebP format support

## 🔐 Security Features

### Authentication

- **Form Validation**: Real-time error handling
- **Password Security**: Strength indicators
- **Session Management**: Secure token handling
- **Demo Credentials**: For testing purposes

## 📞 Contact & Support

### Company Information

- **Phone**: +91 9631157174
- **Email**: contact@bindisaagritech.com
- **Address**: Gaya, Bihar, India - 823001
- **Government Recognition**: Letter from Hon'ble Minister Shri Jitan Ram Manjhi

---

## 📚 How to Search on Google

**Keywords to find this website:**

- "Bindisa Agritech Pvt Ltd"
- "Bihar agricultural technology startup"
- "Gaya agritech company"
- "Indian agriculture AI startup"
- "Soil analysis tool India"
- "Agricultural technology Bihar"

**Direct URL**: https://84d5e124c4bf443a9959862558e52ffe-ae9b4ca0132849758c8f0e94f.fly.dev/

---

_This documentation serves as a comprehensive guide for developers, investors, and stakeholders to understand the technical foundation of Bindisa Agritech's digital presence._
