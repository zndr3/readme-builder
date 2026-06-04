# 📖 README Builder

> A fast README builder. Connect Github account, import repository, edit and commit.

## Screenshots

![Screenshot 2026 06 01 230548](.github/assets/screenshot-2026-06-01-230548.png)
![Screenshot 2026 06 01 231327](.github/assets/screenshot-2026-06-01-231327.png)

## Demo & Deployments

- **[🚀 Vercel Deployment](https://readme-builder-fast.vercel.app/)**

## Features

- *🎨 Visual Drag-and-Drop Editor** - Arrange sections intuitively with smooth DnD interactions
- *📋 15+ Section Templates** - Title, Description, Tech Stack, Installation, Features, API Reference, and more
- *🎯 8 Preset Templates** - Quick-start layouts for Fullstack Apps, Portfolios, Mobile Apps, ML Projects, APIs, Games, Hackathons, and Packages
- *🖼️ Rich Media Support** - Embed logos, screenshots, and badges with beautiful grid layouts
- *🏷️ Badge Integration** - Add tech stack and tool badges with automatic Shields.io formatting
- *📝 Live Preview** - GitHub-flavored markdown preview alongside your edits
- *💾 Raw Markdown Editor** - Switch to code editor for manual fine-tuning with syntax highlighting
- *📋 Copy to Clipboard** - Export clean markdown (state metadata automatically stripped)
- *⬇️ Download as File** - Save your README.md directly to disk
- *⚙️ Environment Variables** - Formatted tables for .env documentation
- *🔄 Bidirectional Sync** - Edit visually or in raw markdown—both modes stay in sync
- *📱 Responsive Design** - Works seamlessly on desktop and tablet

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

## Usage

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


## Tech Stack

![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodejs&logoColor=white) ![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)

## Project Structure

---

## Features

- Edit sections visually → auto-compiles to markdown
- Edit raw markdown → auto-parses back to visual form
- Builder state persists as Base64 comment (stripped on copy)
- Copy button removes embedded state metadata
- Export downloads pure, production-ready README.md
- No build artifacts or debug info
- *Fullstack** - Full-featured web applications
- *Portfolio** - Developer portfolios and showcases
- *Package** - NPM/library projects
- *Mobile** - Mobile app projects
- *ML** - Machine learning projects
- *Hackathon** - Quick project documentation
- *API** - REST/GraphQL API documentation
- *Game** - Game development projects

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

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙋 Support

Found a bug or have a feature request? [Open an issue](https://github.com/zndr3/readme-builder/issues)!

---

**Made with 🐞 by Zander**

## Installation

### Prerequisites

```text
Node.js v18+
```

### Setup Instructions

```bash
npm install
```

<!-- readme-builder-state: W3sidHlwZSI6InRpdGxlIiwidGl0bGUiOiJQcm9qZWN0IFRpdGxlIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJ0ZXh0Ijoi8J+TliBSRUFETUUgQnVpbGRlciIsInN1YnRpdGxlIjoiQSBmYXN0IFJFQURNRSBidWlsZGVyLiBDb25uZWN0IEdpdGh1YiBhY2NvdW50LCBpbXBvcnQgcmVwb3NpdG9yeSwgZWRpdCBhbmQgY29tbWl0LiIsImFsaWduIjoibGVmdCIsImxvZ29VcmwiOiIiLCJsb2dvV2lkdGgiOiIxMDAifX0seyJ0eXBlIjoic2NyZWVuc2hvdHMiLCJ0aXRsZSI6IlNjcmVlbnNob3RzIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJpbWFnZXMiOlt7ImlkIjoiOXJid3ZtcCIsInVybCI6Ii5naXRodWIvYXNzZXRzL3NjcmVlbnNob3QtMjAyNi0wNi0wMS0yMzA1NDgucG5nIiwiYWx0IjoiU2NyZWVuc2hvdCAyMDI2IDA2IDAxIDIzMDU0OCIsImNhcHRpb24iOiIiLCJwcmV2aWV3VXJsIjoiYmxvYjpodHRwOi8vbG9jYWxob3N0OjUxNzMvYTc4NGFlZjctZmY5ZC00YmM1LWEzZTctNTNmYzRhODFiNTdjIiwiZmlsZU5hbWUiOiJzY3JlZW5zaG90LTIwMjYtMDYtMDEtMjMwNTQ4LnBuZyIsInJlcG9zaXRvcnlQYXRoIjoiLmdpdGh1Yi9hc3NldHMvc2NyZWVuc2hvdC0yMDI2LTA2LTAxLTIzMDU0OC5wbmcifSx7ImlkIjoiZGRqaTA4eCIsInVybCI6Ii5naXRodWIvYXNzZXRzL3NjcmVlbnNob3QtMjAyNi0wNi0wMS0yMzEzMjcucG5nIiwiYWx0IjoiU2NyZWVuc2hvdCAyMDI2IDA2IDAxIDIzMTMyNyIsImNhcHRpb24iOiIiLCJwcmV2aWV3VXJsIjoiYmxvYjpodHRwOi8vbG9jYWxob3N0OjUxNzMvYzZjZDdmNzYtNzE1ZS00YmYwLTkxY2ItNTgzYzhhNDY1MGU1IiwiZmlsZU5hbWUiOiJzY3JlZW5zaG90LTIwMjYtMDYtMDEtMjMxMzI3LnBuZyIsInJlcG9zaXRvcnlQYXRoIjoiLmdpdGh1Yi9hc3NldHMvc2NyZWVuc2hvdC0yMDI2LTA2LTAxLTIzMTMyNy5wbmcifV0sInN0eWxlIjoibGlzdCJ9fSx7InR5cGUiOiJkZW1vLWxpbmtzIiwidGl0bGUiOiJEZW1vIExpbmtzIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJpdGVtcyI6W3sibGFiZWwiOiLwn5qAIFZlcmNlbCBEZXBsb3ltZW50IiwidXJsIjoiaHR0cHM6Ly9yZWFkbWUtYnVpbGRlci1mYXN0LnZlcmNlbC5hcHAvIn1dfX0seyJ0eXBlIjoiZmVhdHVyZXMiLCJ0aXRsZSI6IuKcqCBGZWF0dXJlcyIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsiaXRlbXMiOlsiKvCfjqggVmlzdWFsIERyYWctYW5kLURyb3AgRWRpdG9yKiogLSBBcnJhbmdlIHNlY3Rpb25zIGludHVpdGl2ZWx5IHdpdGggc21vb3RoIERuRCBpbnRlcmFjdGlvbnMiLCIq8J+TiyAxNSsgU2VjdGlvbiBUZW1wbGF0ZXMqKiAtIFRpdGxlLCBEZXNjcmlwdGlvbiwgVGVjaCBTdGFjaywgSW5zdGFsbGF0aW9uLCBGZWF0dXJlcywgQVBJIFJlZmVyZW5jZSwgYW5kIG1vcmUiLCIq8J+OryA4IFByZXNldCBUZW1wbGF0ZXMqKiAtIFF1aWNrLXN0YXJ0IGxheW91dHMgZm9yIEZ1bGxzdGFjayBBcHBzLCBQb3J0Zm9saW9zLCBNb2JpbGUgQXBwcywgTUwgUHJvamVjdHMsIEFQSXMsIEdhbWVzLCBIYWNrYXRob25zLCBhbmQgUGFja2FnZXMiLCIq8J+WvO+4jyBSaWNoIE1lZGlhIFN1cHBvcnQqKiAtIEVtYmVkIGxvZ29zLCBzY3JlZW5zaG90cywgYW5kIGJhZGdlcyB3aXRoIGJlYXV0aWZ1bCBncmlkIGxheW91dHMiLCIq8J+Pt++4jyBCYWRnZSBJbnRlZ3JhdGlvbioqIC0gQWRkIHRlY2ggc3RhY2sgYW5kIHRvb2wgYmFkZ2VzIHdpdGggYXV0b21hdGljIFNoaWVsZHMuaW8gZm9ybWF0dGluZyIsIirwn5OdIExpdmUgUHJldmlldyoqIC0gR2l0SHViLWZsYXZvcmVkIG1hcmtkb3duIHByZXZpZXcgYWxvbmdzaWRlIHlvdXIgZWRpdHMiLCIq8J+SviBSYXcgTWFya2Rvd24gRWRpdG9yKiogLSBTd2l0Y2ggdG8gY29kZSBlZGl0b3IgZm9yIG1hbnVhbCBmaW5lLXR1bmluZyB3aXRoIHN5bnRheCBoaWdobGlnaHRpbmciLCIq8J+TiyBDb3B5IHRvIENsaXBib2FyZCoqIC0gRXhwb3J0IGNsZWFuIG1hcmtkb3duIChzdGF0ZSBtZXRhZGF0YSBhdXRvbWF0aWNhbGx5IHN0cmlwcGVkKSIsIirirIfvuI8gRG93bmxvYWQgYXMgRmlsZSoqIC0gU2F2ZSB5b3VyIFJFQURNRS5tZCBkaXJlY3RseSB0byBkaXNrIiwiKuKame+4jyBFbnZpcm9ubWVudCBWYXJpYWJsZXMqKiAtIEZvcm1hdHRlZCB0YWJsZXMgZm9yIC5lbnYgZG9jdW1lbnRhdGlvbiIsIirwn5SEIEJpZGlyZWN0aW9uYWwgU3luYyoqIC0gRWRpdCB2aXN1YWxseSBvciBpbiByYXcgbWFya2Rvd27igJRib3RoIG1vZGVzIHN0YXkgaW4gc3luYyIsIirwn5OxIFJlc3BvbnNpdmUgRGVzaWduKiogLSBXb3JrcyBzZWFtbGVzc2x5IG9uIGRlc2t0b3AgYW5kIHRhYmxldCJdfX0seyJ0eXBlIjoiY3VzdG9tLW1hcmtkb3duIiwidGl0bGUiOiLwn5qAIFF1aWNrIFN0YXJ0IiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJtYXJrZG93biI6IiMjIPCfmoAgUXVpY2sgU3RhcnRcblxuIyMjIFByZXJlcXVpc2l0ZXNcblxuLSAqKk5vZGUuanMqKiAxOCsgXG4tICoqbnBtKiogb3IgKip5YXJuKiogcGFja2FnZSBtYW5hZ2VyXG5cbiMjIyBJbnN0YWxsYXRpb25cblxuMS4gKipDbG9uZSB0aGUgcmVwb3NpdG9yeSoqXG4gICBgYGBiYXNoXG4gICBnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL3lvdXJ1c2VybmFtZS9yZWFkbWUtYnVpbGRlci5naXRcbiAgIGNkIHJlYWRtZS1idWlsZGVyXG4gICBgYGBcblxuMi4gKipJbnN0YWxsIGRlcGVuZGVuY2llcyoqXG4gICBgYGBiYXNoXG4gICBucG0gaW5zdGFsbFxuICAgYGBgXG5cbjMuICoqU3RhcnQgdGhlIGRldmVsb3BtZW50IHNlcnZlcioqXG4gICBgYGBiYXNoXG4gICBucG0gcnVuIGRldlxuICAgYGBgXG4gICBPcGVucyBhdCBgaHR0cDovL2xvY2FsaG9zdDo1MTczYCAob3IgbmV4dCBhdmFpbGFibGUgcG9ydClcblxuNC4gKipCdWlsZCBmb3IgcHJvZHVjdGlvbioqXG4gICBgYGBiYXNoXG4gICBucG0gcnVuIGJ1aWxkXG4gICBgYGBcblxuLS0tIn19LHsidHlwZSI6InVzYWdlIiwidGl0bGUiOiLwn5OWIFVzYWdlIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJkZXNjcmlwdGlvbiI6IiMjIyBDcmVhdGluZyBhIFJFQURNRVxuXG4xLiAqKlNlbGVjdCBhIHByZXNldCoqIGZyb20gdGhlIGRyb3Bkb3duIChGdWxsc3RhY2sgQXBwLCBQb3J0Zm9saW8sIE1vYmlsZSBBcHAsIGV0Yy4pXG4yLiAqKkN1c3RvbWl6ZSBzZWN0aW9ucyoqIG9uIHRoZSBsZWZ0IHBhbmVsOlxuICAgLSBFZGl0IHRpdGxlcywgZGVzY3JpcHRpb25zLCBhbmQgY29udGVudFxuICAgLSBSZW9yZGVyIHNlY3Rpb25zIHdpdGggZHJhZy1hbmQtZHJvcFxuICAgLSBUb2dnbGUgdmlzaWJpbGl0eSB3aXRoIHRoZSBleWUgaWNvblxuICAgLSBEZWxldGUgdW53YW50ZWQgc2VjdGlvbnNcbjMuICoqUHJldmlldyBpbiByZWFsLXRpbWUqKiBvbiB0aGUgcmlnaHQgcGFuZWxcbjQuICoqU3dpdGNoIHRvIFJhdyBFZGl0b3IqKiB0YWIgZm9yIGZpbmUtdHVuaW5nIG1hcmtkb3duIHN5bnRheFxuNS4gKipDb3B5IG9yIEV4cG9ydCoqOlxuICAgLSBDbGljayBcIkNvcHlcIiB0byBjb3B5IGNsZWFuIG1hcmtkb3duICh3aXRob3V0IHN0YXRlIG1ldGFkYXRhKVxuICAgLSBDbGljayBcIkV4cG9ydCBNRFwiIHRvIGRvd25sb2FkIGBSRUFETUUubWRgIGZpbGVcblxuIyMjIFNlY3Rpb24gVHlwZXNcblxuLSAqKlRpdGxlKiogLSBQcm9qZWN0IG5hbWUsIHN1YnRpdGxlLCBvcHRpb25hbCBsb2dvXG4tICoqRGVzY3JpcHRpb24qKiAtIFByb2plY3Qgb3ZlcnZpZXdcbi0gKipUZWNoIFN0YWNrKiogLSBUZWNobm9sb2d5IGJhZGdlcyAoU2hpZWxkcy5pbyBpbnRlZ3JhdGlvbilcbi0gKipJbnN0YWxsYXRpb24qKiAtIFByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIGNvbW1hbmRzXG4tICoqVXNhZ2UqKiAtIFVzYWdlIGluc3RydWN0aW9ucyB3aXRoIGNvZGUgYmxvY2tzXG4tICoqRmVhdHVyZXMqKiAtIEZlYXR1cmUgbGlzdCB3aXRoIGNoZWNrbWFya3Ncbi0gKipTY3JlZW5zaG90cyoqIC0gSW1hZ2UgZ2FsbGVyeSB3aXRoIGNhcHRpb25zIChzaW5nbGUgb3IgZ3JpZCBsYXlvdXQpXG4tICoqRW52aXJvbm1lbnQgVmFyaWFibGVzKiogLSAuZW52IGNvbmZpZ3VyYXRpb24gdGFibGVcbi0gKipBUEkgUmVmZXJlbmNlKiogLSBSRVNUIGVuZHBvaW50IGRvY3VtZW50YXRpb25cbi0gKipGb2xkZXIgU3RydWN0dXJlKiogLSBQcm9qZWN0IGRpcmVjdG9yeSB0cmVlIHZpc3VhbGl6YXRpb25cbi0gKipDb250cmlidXRpbmcqKiAtIENvbnRyaWJ1dGlvbiBndWlkZWxpbmVzXG4tICoqTGljZW5zZSoqIC0gTGljZW5zZSBpbmZvcm1hdGlvblxuLSAqKlRhYmxlIG9mIENvbnRlbnRzKiogLSBBdXRvLWdlbmVyYXRlZCBUT0MgZnJvbSBzZWN0aW9uIHRpdGxlc1xuLSAqKlNvY2lhbCBMaW5rcyoqIC0gR2l0SHViLCBUd2l0dGVyLCBMaW5rZWRJbiBsaW5rc1xuLSAqKkZBUSoqIC0gRnJlcXVlbnRseSBhc2tlZCBxdWVzdGlvbnNcbi0gKipSb2FkbWFwKiogLSBGZWF0dXJlIHJvYWRtYXAgd2l0aCBwcm9ncmVzcyB0cmFja2luZ1xuLSAqKkRlbW8gJiBEZXBsb3ltZW50cyoqIC0gTGlua3MgdG8gbGl2ZSBkZW1vcyBhbmQgZGVwbG95bWVudHNcbi0gKipDdXN0b20gTWFya2Rvd24qKiAtIFJhdyBtYXJrZG93biBmb3IgY3VzdG9tIGNvbnRlbnRcblxuLS0tIiwiY29kZUJsb2NrIjoiIiwibGFuZ3VhZ2UiOiJqYXZhc2NyaXB0In19LHsidHlwZSI6InRlY2gtc3RhY2siLCJ0aXRsZSI6IvCfm6DvuI8gVGVjaCBTdGFjayIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsiYmFkZ2VzIjpbeyJsYWJlbCI6IlN2ZWx0ZSIsIm1lc3NhZ2UiOiJTdmVsdGUiLCJjb2xvciI6IkZGM0UwMCIsImxvZ28iOiJzdmVsdGUifSx7ImxhYmVsIjoiVHlwZVNjcmlwdCIsIm1lc3NhZ2UiOiJUeXBlU2NyaXB0IiwiY29sb3IiOiIzMTc4QzYiLCJsb2dvIjoidHlwZXNjcmlwdCJ9LHsibGFiZWwiOiJUYWlsd2luZCBDU1MiLCJtZXNzYWdlIjoiVGFpbHdpbmRDU1MiLCJjb2xvciI6IjA2QjZENCIsImxvZ28iOiJ0YWlsd2luZGNzcyJ9LHsibGFiZWwiOiJWaXRlIiwibWVzc2FnZSI6IlZpdGUiLCJjb2xvciI6IjY0NkNGRiIsImxvZ28iOiJ2aXRlIn0seyJsYWJlbCI6Ik5vZGUuanMiLCJtZXNzYWdlIjoiTm9kZS5qcyIsImNvbG9yIjoiMzM5OTMzIiwibG9nbyI6Im5vZGVqcyJ9LHsibGFiZWwiOiJTdmVsdGVLaXQiLCJtZXNzYWdlIjoiU3ZlbHRlS2l0IiwiY29sb3IiOiJGRjNFMDAiLCJsb2dvIjoic3ZlbHRlIn1dfX0seyJ0eXBlIjoiZm9sZGVyLXN0cnVjdHVyZSIsInRpdGxlIjoi8J+TgSBQcm9qZWN0IFN0cnVjdHVyZSIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsidHJlZSI6IiIsImV4cGxhbmF0aW9uIjoiLS0tIn19LHsidHlwZSI6ImZlYXR1cmVzIiwidGl0bGUiOiLwn46oIEtleSBGZWF0dXJlcyBFeHBsYWluZWQiLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7Iml0ZW1zIjpbIkVkaXQgc2VjdGlvbnMgdmlzdWFsbHkg4oaSIGF1dG8tY29tcGlsZXMgdG8gbWFya2Rvd24iLCJFZGl0IHJhdyBtYXJrZG93biDihpIgYXV0by1wYXJzZXMgYmFjayB0byB2aXN1YWwgZm9ybSIsIkJ1aWxkZXIgc3RhdGUgcGVyc2lzdHMgYXMgQmFzZTY0IGNvbW1lbnQgKHN0cmlwcGVkIG9uIGNvcHkpIiwiQ29weSBidXR0b24gcmVtb3ZlcyBlbWJlZGRlZCBzdGF0ZSBtZXRhZGF0YSIsIkV4cG9ydCBkb3dubG9hZHMgcHVyZSwgcHJvZHVjdGlvbi1yZWFkeSBSRUFETUUubWQiLCJObyBidWlsZCBhcnRpZmFjdHMgb3IgZGVidWcgaW5mbyIsIipGdWxsc3RhY2sqKiAtIEZ1bGwtZmVhdHVyZWQgd2ViIGFwcGxpY2F0aW9ucyIsIipQb3J0Zm9saW8qKiAtIERldmVsb3BlciBwb3J0Zm9saW9zIGFuZCBzaG93Y2FzZXMiLCIqUGFja2FnZSoqIC0gTlBNL2xpYnJhcnkgcHJvamVjdHMiLCIqTW9iaWxlKiogLSBNb2JpbGUgYXBwIHByb2plY3RzIiwiKk1MKiogLSBNYWNoaW5lIGxlYXJuaW5nIHByb2plY3RzIiwiKkhhY2thdGhvbioqIC0gUXVpY2sgcHJvamVjdCBkb2N1bWVudGF0aW9uIiwiKkFQSSoqIC0gUkVTVC9HcmFwaFFMIEFQSSBkb2N1bWVudGF0aW9uIiwiKkdhbWUqKiAtIEdhbWUgZGV2ZWxvcG1lbnQgcHJvamVjdHMiXX19LHsidHlwZSI6ImN1c3RvbS1tYXJrZG93biIsInRpdGxlIjoi4pqZ77iPIEF2YWlsYWJsZSBTY3JpcHRzIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJtYXJrZG93biI6IiMjIOKame+4jyBBdmFpbGFibGUgU2NyaXB0c1xuXG5gYGBiYXNoXG5ucG0gcnVuIGRldiAgICAgICAgICAgIyBTdGFydCBkZXYgc2VydmVyIChob3QgcmVsb2FkKVxubnBtIHJ1biBidWlsZCAgICAgICAgICMgQnVpbGQgZm9yIHByb2R1Y3Rpb25cbm5wbSBydW4gcHJldmlldyAgICAgICAjIFByZXZpZXcgcHJvZHVjdGlvbiBidWlsZCBsb2NhbGx5XG5ucG0gcnVuIGNoZWNrICAgICAgICAgIyBUeXBlIGNoZWNrIHdpdGggc3ZlbHRlLWtpdFxubnBtIHJ1biBsaW50ICAgICAgICAgICMgUnVuIHByZXR0aWVyICYgZXNsaW50XG5ucG0gcnVuIGZvcm1hdCAgICAgICAgIyBBdXRvLWZvcm1hdCBjb2RlIHdpdGggcHJldHRpZXJcbmBgYFxuXG4tLS0ifX0seyJ0eXBlIjoiY29udHJpYnV0aW5nIiwidGl0bGUiOiLwn6SdIENvbnRyaWJ1dGluZyIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsidGV4dCI6IkNvbnRyaWJ1dGlvbnMgYXJlIHdoYXQgbWFrZSB0aGUgb3BlbiBzb3VyY2UgY29tbXVuaXR5IHN1Y2ggYW4gYW1hemluZyBwbGFjZSB0byBsZWFybiwgaW5zcGlyZSwgYW5kIGNyZWF0ZS4gQW55IGNvbnRyaWJ1dGlvbnMgeW91IG1ha2UgYXJlICoqZ3JlYXRseSBhcHByZWNpYXRlZCoqLlxuXG4xLiBGb3JrIHRoZSBQcm9qZWN0XG4yLiBDcmVhdGUgeW91ciBGZWF0dXJlIEJyYW5jaCAoYGdpdCBjaGVja291dCAtYiBmZWF0dXJlL0FtYXppbmdGZWF0dXJlYClcbjMuIENvbW1pdCB5b3VyIENoYW5nZXMgKGBnaXQgY29tbWl0IC1tICdBZGQgc29tZSBBbWF6aW5nRmVhdHVyZSdgKVxuNC4gUHVzaCB0byB0aGUgQnJhbmNoIChgZ2l0IHB1c2ggb3JpZ2luIGZlYXR1cmUvQW1hemluZ0ZlYXR1cmVgKVxuNS4gT3BlbiBhIFB1bGwgUmVxdWVzdCJ9fSx7InR5cGUiOiJjdXN0b20tbWFya2Rvd24iLCJ0aXRsZSI6IvCfmYsgU3VwcG9ydCIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsibWFya2Rvd24iOiIjIyDwn5mLIFN1cHBvcnRcblxuRm91bmQgYSBidWcgb3IgaGF2ZSBhIGZlYXR1cmUgcmVxdWVzdD8gW09wZW4gYW4gaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS96bmRyMy9yZWFkbWUtYnVpbGRlci9pc3N1ZXMpIVxuXG4tLS1cblxuKipNYWRlIHdpdGgg8J+QniBieSBaYW5kZXIqKiJ9fSx7InR5cGUiOiJpbnN0YWxsYXRpb24iLCJ0aXRsZSI6Ikluc3RhbGxhdGlvbiIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsicHJlcmVxdWlzaXRlcyI6Ik5vZGUuanMgdjE4KyIsImNvbW1hbmRzIjoibnBtIGluc3RhbGwifX1d -->
