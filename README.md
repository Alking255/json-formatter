# JSON Formatter & Developer Tools Platform

A free, powerful, and privacy-focused JSON formatter and validator built with Next.js 16. Format, validate, beautify, and minify JSON instantly with an intuitive interface and advanced features.

![JSON Formatter](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- ✨ **Format & Beautify** - Instantly format JSON with proper indentation
- 🔍 **Validate & Debug** - Real-time validation with precise error detection
- 🌳 **Tree View** - Interactive expandable tree visualization
- ⚡ **Minify** - Compress JSON for production use
- 🌙 **Dark/Light Mode** - Eye-friendly themes with smooth transitions
- 💾 **History** - Automatic saving of recent JSON data
- 📥 **File Upload** - Drag and drop JSON files
- 📋 **Copy to Clipboard** - One-click copying
- 🔐 **Privacy First** - All processing happens in your browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/json-formatter.git

# Navigate to project directory
cd json-formatter

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Project Structure

```
web-tool/
├── app/
│   ├── components/       # React components
│   │   ├── JsonEditor.tsx
│   │   ├── Toolbar.tsx
│   │   ├── TreeView.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ErrorDisplay.tsx
│   ├── lib/             # Utility functions
│   │   ├── jsonUtils.ts # JSON processing
│   │   └── storage.ts   # Local storage management
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Main page
│   ├── globals.css      # Design system
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # Robots configuration
├── public/              # Static assets
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) + Custom CSS
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Storage**: LocalStorage API
- **Deployment**: [Vercel](https://vercel.com/)

## 📱 Features In Detail

### JSON Formatting
- Format with customizable indentation (2 or 4 spaces)
- Minify for production use
- Real-time syntax validation
- Error messages with line and column numbers

### Tree View
- Expandable/collapsible nodes
- Copy JSONPath for any node
- Type indicators (string, number, boolean, null, array, object)
- Syntax highlighting

### User Experience
- Dark and light mode with system preference detection
- Keyboard shortcuts (Tab for indentation)
- Responsive design for mobile and desktop
- File upload via drag & drop or file picker
- Download formatted JSON
- Copy to clipboard with one click

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com/)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/json-formatter)

### Environment Variables

No environment variables are required for basic functionality. For analytics:

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 SEO Optimization

- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Dynamic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Fast page load times (optimized for Core Web Vitals)

## 🎨 Customization

### Changing Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --accent-primary: #your-color;
  --accent-secondary: #your-secondary-color;
}
```

### Adding New Tools

Create a new page in `app/tools/[tool-name]/page.tsx` following the existing pattern.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for developers worldwide**
