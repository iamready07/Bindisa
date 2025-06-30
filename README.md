# 🌾 Bindisa Agritech - Complete Frontend Setup

## 📋 Quick Setup Instructions for VS Code

Follow these steps to run the complete Bindisa Agritech website on your local machine:

### 1. Prerequisites

Make sure you have these installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** - [Download here](https://git-scm.com/)

### 2. Create New Project Folder

```bash
# Create a new folder for your project
mkdir bindisa-agritech-website
cd bindisa-agritech-website
```

### 3. Copy All Files

Copy all the files from this project into your new folder. Your folder structure should look like this:

```
bindisa-agritech-website/
├── public/
│   └── bindisa-agritech-logo.png
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 4. Install Dependencies

Open terminal in VS Code and run:

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open in Browser

The website will automatically open at: `http://localhost:3000`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## 🔧 VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Prettier - Code formatter**

## 🌟 Features Included

✅ **12 Complete Pages**
✅ **3 Languages** (English, Hindi, Marathi)
✅ **Interactive Soil Analysis Tool**
✅ **AI Chatbot**
✅ **Authentication System**
✅ **Team Management**
✅ **Mobile Responsive Design**
✅ **Company Contact Form**
✅ **Google Maps Integration**

## 🎨 Color Scheme

The website uses a custom agricultural color palette:

- **Primary Green**: `#16a34a`
- **Secondary Brown**: `#92400e`
- **Accent Yellow**: `#fde68a`

## 📱 Responsive Design

The website is fully responsive and works on:

- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🌍 Multilingual Support

The website supports three languages:

- **English** (en)
- **हिंदी** (hi)
- **मराठी** (mr)

## 🔐 Demo Login Credentials

For testing the authentication system:

- **Email**: `demo@bindisaagritech.com`
- **Password**: `demo123`

## 📞 Contact Information

- **Company**: Bindisa Agritech Pvt. Ltd.
- **Location**: Gaya, Bihar, India
- **Phone**: +91 9631157174
- **CIN**: U46539BR2025PTC073688

## 🚀 Deployment

The live website is hosted at:
**https://84d5e124c4bf443a9959862558e52ffe-ae9b4ca0132849758c8f0e94f.fly.dev/**

## 🔧 Troubleshooting

If you encounter any issues:

1. **Node.js version**: Make sure you have Node.js 18+
2. **Clear cache**: Delete `node_modules` and `package-lock.json`, then run `npm install`
3. **Port conflict**: If port 3000 is busy, the dev server will use the next available port
4. **TypeScript errors**: Run `npm run build` to check for any TypeScript issues

## 📚 Technology Stack

- **React 18** + **TypeScript**
- **TailwindCSS** for styling
- **Vite** for fast development
- **shadcn/ui** for components
- **Lucide React** for icons
- **React Router** for navigation

---

**Happy Coding! 🚀**

_Built with ❤️ for modern agriculture in India_
