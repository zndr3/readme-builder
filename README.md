# 📖 README Builder

A **visual drag-and-drop editor** for creating professional GitHub READMEs without writing markdown. Build beautiful, structured documentation with an intuitive UI and export clean markdown code instantly.

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?style=flat-square&logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **🎨 Visual Drag-and-Drop Editor** - Arrange sections intuitively with smooth DnD interactions
- **📋 15+ Section Templates** - Title, Description, Tech Stack, Installation, Features, API Reference, and more
- **🎯 8 Preset Templates** - Quick-start layouts for Fullstack Apps, Portfolios, Mobile Apps, ML Projects, APIs, Games, Hackathons, and Packages
- **🖼️ Rich Media Support** - Embed logos, screenshots, and badges with beautiful grid layouts
- **🏷️ Badge Integration** - Add tech stack and tool badges with automatic Shields.io formatting
- **📝 Live Preview** - GitHub-flavored markdown preview alongside your edits
- **💾 Raw Markdown Editor** - Switch to code editor for manual fine-tuning with syntax highlighting
- **📋 Copy to Clipboard** - Export clean markdown (state metadata automatically stripped)
- **⬇️ Download as File** - Save your README.md directly to disk
- **⚙️ Environment Variables** - Formatted tables for .env documentation
- **🔄 Bidirectional Sync** - Edit visually or in raw markdown—both modes stay in sync
- **📱 Responsive Design** - Works seamlessly on desktop and tablet

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/readme-builder.git
   cd readme-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173` (or next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📖 Usage

### Creating a README

1. **Select a preset** from the dropdown (Fullstack App, Portfolio, Mobile App, etc.)
2. **Customize sections** on the left panel:
   - Edit titles, descriptions, and content
   - Reorder sections with drag-and-drop
   - Toggle visibility with the eye icon
   - Delete unwanted sections
3. **Preview in real-time** on the right panel
4. **Switch to Raw Editor** tab for fine-tuning markdown syntax
5. **Copy or Export**:
   - Click "Copy" to copy clean markdown (without state metadata)
   - Click "Export MD" to download `README.md` file

### Section Types

- **Title** - Project name, subtitle, optional logo
- **Description** - Project overview
- **Tech Stack** - Technology badges (Shields.io integration)
- **Installation** - Prerequisites and setup commands
- **Usage** - Usage instructions with code blocks
- **Features** - Feature list with checkmarks
- **Screenshots** - Image gallery with captions (single or grid layout)
- **Environment Variables** - .env configuration table
- **API Reference** - REST endpoint documentation
- **Folder Structure** - Project directory tree visualization
- **Contributing** - Contribution guidelines
- **License** - License information
- **Table of Contents** - Auto-generated TOC from section titles
- **Social Links** - GitHub, Twitter, LinkedIn links
- **FAQ** - Frequently asked questions
- **Roadmap** - Feature roadmap with progress tracking
- **Demo & Deployments** - Links to live demos and deployments
- **Custom Markdown** - Raw markdown for custom content

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Svelte 5** | Reactive UI framework |
| **SvelteKit** | Full-stack meta-framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Vite** | Fast build tooling |
| **Marked** | Markdown rendering |
| **Lucide Svelte** | Icon library |
| **svelte-dnd-action** | Drag-and-drop functionality |

---

## 📁 Project Structure

```
readme-builder/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte UI components
│   │   │   ├── LeftPanel.svelte      # Section editor sidebar
│   │   │   ├── RightPanel.svelte     # Preview & export panel
│   │   │   ├── SectionForm.svelte    # Dynamic form renderer
│   │   │   ├── BadgeSelector.svelte  # Badge picker UI
│   │   │   └── ImageUploader.svelte  # Image upload handler
│   │   ├── utils/
│   │   │   ├── sections.ts           # Section type definitions
│   │   │   ├── markdown-generator.ts # Markdown compilation
│   │   │   ├── presets.ts            # Template presets
│   │   │   └── badges.ts             # Badge formatting
│   │   └── assets/
│   ├── routes/
│   │   ├── +page.svelte         # Main app page
│   │   └── +layout.svelte       # App layout wrapper
│   └── app.html                 # HTML entry point
├── static/
├── package.json
├── svelte.config.js
├── vite.config.ts
└── tailwind.config.js
```

---

## 🎨 Key Features Explained

### Drag-and-Drop Reordering
Move sections intuitively to reorganize your README structure. Visual feedback shows drop zones.

### Bidirectional Markdown Sync
- Edit sections visually → auto-compiles to markdown
- Edit raw markdown → auto-parses back to visual form
- Builder state persists as Base64 comment (stripped on copy)

### Clean Markdown Export
- Copy button removes embedded state metadata
- Export downloads pure, production-ready README.md
- No build artifacts or debug info

### Template Presets
Quick-start with pre-configured layouts tailored for different project types:
- **Fullstack** - Full-featured web applications
- **Portfolio** - Developer portfolios and showcases
- **Package** - NPM/library projects
- **Mobile** - Mobile app projects
- **ML** - Machine learning projects
- **Hackathon** - Quick project documentation
- **API** - REST/GraphQL API documentation
- **Game** - Game development projects

---

## ⚙️ Available Scripts

```bash
npm run dev           # Start dev server (hot reload)
npm run build         # Build for production
npm run preview       # Preview production build locally
npm run check         # Type check with svelte-kit
npm run lint          # Run prettier & eslint
npm run format        # Auto-format code with prettier
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

## 🙋 Support

Found a bug or have a feature request? [Open an issue](https://github.com/zndr3/readme-builder/issues)!

---

**Made with 🐞 by Zander**
