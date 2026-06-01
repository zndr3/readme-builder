# 📖 README Builder

> A fast README builder. Connect Github account, import repository, edit and commit.

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

<!-- readme-builder-state: W3sidHlwZSI6InRpdGxlIiwidGl0bGUiOiJQcm9qZWN0IFRpdGxlIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJ0ZXh0Ijoi8J+TliBSRUFETUUgQnVpbGRlciIsInN1YnRpdGxlIjoiQSBmYXN0IFJFQURNRSBidWlsZGVyLiBDb25uZWN0IEdpdGh1YiBhY2NvdW50LCBpbXBvcnQgcmVwb3NpdG9yeSwgZWRpdCBhbmQgY29tbWl0LiIsImFsaWduIjoibGVmdCIsImxvZ29VcmwiOiIiLCJsb2dvV2lkdGgiOiIxMDAifX0seyJ0eXBlIjoiZGVtby1saW5rcyIsInRpdGxlIjoiRGVtbyBMaW5rcyIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsiaXRlbXMiOlt7ImxhYmVsIjoi8J+agCBWZXJjZWwgRGVwbG95bWVudCIsInVybCI6Imh0dHBzOi8vcmVhZG1lLWJ1aWxkZXItZmFzdC52ZXJjZWwuYXBwLyJ9XX19LHsidHlwZSI6ImZlYXR1cmVzIiwidGl0bGUiOiLinKggRmVhdHVyZXMiLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7Iml0ZW1zIjpbIirwn46oIFZpc3VhbCBEcmFnLWFuZC1Ecm9wIEVkaXRvcioqIC0gQXJyYW5nZSBzZWN0aW9ucyBpbnR1aXRpdmVseSB3aXRoIHNtb290aCBEbkQgaW50ZXJhY3Rpb25zIiwiKvCfk4sgMTUrIFNlY3Rpb24gVGVtcGxhdGVzKiogLSBUaXRsZSwgRGVzY3JpcHRpb24sIFRlY2ggU3RhY2ssIEluc3RhbGxhdGlvbiwgRmVhdHVyZXMsIEFQSSBSZWZlcmVuY2UsIGFuZCBtb3JlIiwiKvCfjq8gOCBQcmVzZXQgVGVtcGxhdGVzKiogLSBRdWljay1zdGFydCBsYXlvdXRzIGZvciBGdWxsc3RhY2sgQXBwcywgUG9ydGZvbGlvcywgTW9iaWxlIEFwcHMsIE1MIFByb2plY3RzLCBBUElzLCBHYW1lcywgSGFja2F0aG9ucywgYW5kIFBhY2thZ2VzIiwiKvCflrzvuI8gUmljaCBNZWRpYSBTdXBwb3J0KiogLSBFbWJlZCBsb2dvcywgc2NyZWVuc2hvdHMsIGFuZCBiYWRnZXMgd2l0aCBiZWF1dGlmdWwgZ3JpZCBsYXlvdXRzIiwiKvCfj7fvuI8gQmFkZ2UgSW50ZWdyYXRpb24qKiAtIEFkZCB0ZWNoIHN0YWNrIGFuZCB0b29sIGJhZGdlcyB3aXRoIGF1dG9tYXRpYyBTaGllbGRzLmlvIGZvcm1hdHRpbmciLCIq8J+TnSBMaXZlIFByZXZpZXcqKiAtIEdpdEh1Yi1mbGF2b3JlZCBtYXJrZG93biBwcmV2aWV3IGFsb25nc2lkZSB5b3VyIGVkaXRzIiwiKvCfkr4gUmF3IE1hcmtkb3duIEVkaXRvcioqIC0gU3dpdGNoIHRvIGNvZGUgZWRpdG9yIGZvciBtYW51YWwgZmluZS10dW5pbmcgd2l0aCBzeW50YXggaGlnaGxpZ2h0aW5nIiwiKvCfk4sgQ29weSB0byBDbGlwYm9hcmQqKiAtIEV4cG9ydCBjbGVhbiBtYXJrZG93biAoc3RhdGUgbWV0YWRhdGEgYXV0b21hdGljYWxseSBzdHJpcHBlZCkiLCIq4qyH77iPIERvd25sb2FkIGFzIEZpbGUqKiAtIFNhdmUgeW91ciBSRUFETUUubWQgZGlyZWN0bHkgdG8gZGlzayIsIirimpnvuI8gRW52aXJvbm1lbnQgVmFyaWFibGVzKiogLSBGb3JtYXR0ZWQgdGFibGVzIGZvciAuZW52IGRvY3VtZW50YXRpb24iLCIq8J+UhCBCaWRpcmVjdGlvbmFsIFN5bmMqKiAtIEVkaXQgdmlzdWFsbHkgb3IgaW4gcmF3IG1hcmtkb3du4oCUYm90aCBtb2RlcyBzdGF5IGluIHN5bmMiLCIq8J+TsSBSZXNwb25zaXZlIERlc2lnbioqIC0gV29ya3Mgc2VhbWxlc3NseSBvbiBkZXNrdG9wIGFuZCB0YWJsZXQiXX19LHsidHlwZSI6ImN1c3RvbS1tYXJrZG93biIsInRpdGxlIjoi8J+agCBRdWljayBTdGFydCIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsibWFya2Rvd24iOiIjIyDwn5qAIFF1aWNrIFN0YXJ0XG5cbiMjIyBQcmVyZXF1aXNpdGVzXG5cbi0gKipOb2RlLmpzKiogMTgrIFxuLSAqKm5wbSoqIG9yICoqeWFybioqIHBhY2thZ2UgbWFuYWdlclxuXG4jIyMgSW5zdGFsbGF0aW9uXG5cbjEuICoqQ2xvbmUgdGhlIHJlcG9zaXRvcnkqKlxuICAgYGBgYmFzaFxuICAgZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS95b3VydXNlcm5hbWUvcmVhZG1lLWJ1aWxkZXIuZ2l0XG4gICBjZCByZWFkbWUtYnVpbGRlclxuICAgYGBgXG5cbjIuICoqSW5zdGFsbCBkZXBlbmRlbmNpZXMqKlxuICAgYGBgYmFzaFxuICAgbnBtIGluc3RhbGxcbiAgIGBgYFxuXG4zLiAqKlN0YXJ0IHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIqKlxuICAgYGBgYmFzaFxuICAgbnBtIHJ1biBkZXZcbiAgIGBgYFxuICAgT3BlbnMgYXQgYGh0dHA6Ly9sb2NhbGhvc3Q6NTE3M2AgKG9yIG5leHQgYXZhaWxhYmxlIHBvcnQpXG5cbjQuICoqQnVpbGQgZm9yIHByb2R1Y3Rpb24qKlxuICAgYGBgYmFzaFxuICAgbnBtIHJ1biBidWlsZFxuICAgYGBgXG5cbi0tLSJ9fSx7InR5cGUiOiJ1c2FnZSIsInRpdGxlIjoi8J+TliBVc2FnZSIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsiZGVzY3JpcHRpb24iOiIjIyMgQ3JlYXRpbmcgYSBSRUFETUVcblxuMS4gKipTZWxlY3QgYSBwcmVzZXQqKiBmcm9tIHRoZSBkcm9wZG93biAoRnVsbHN0YWNrIEFwcCwgUG9ydGZvbGlvLCBNb2JpbGUgQXBwLCBldGMuKVxuMi4gKipDdXN0b21pemUgc2VjdGlvbnMqKiBvbiB0aGUgbGVmdCBwYW5lbDpcbiAgIC0gRWRpdCB0aXRsZXMsIGRlc2NyaXB0aW9ucywgYW5kIGNvbnRlbnRcbiAgIC0gUmVvcmRlciBzZWN0aW9ucyB3aXRoIGRyYWctYW5kLWRyb3BcbiAgIC0gVG9nZ2xlIHZpc2liaWxpdHkgd2l0aCB0aGUgZXllIGljb25cbiAgIC0gRGVsZXRlIHVud2FudGVkIHNlY3Rpb25zXG4zLiAqKlByZXZpZXcgaW4gcmVhbC10aW1lKiogb24gdGhlIHJpZ2h0IHBhbmVsXG40LiAqKlN3aXRjaCB0byBSYXcgRWRpdG9yKiogdGFiIGZvciBmaW5lLXR1bmluZyBtYXJrZG93biBzeW50YXhcbjUuICoqQ29weSBvciBFeHBvcnQqKjpcbiAgIC0gQ2xpY2sgXCJDb3B5XCIgdG8gY29weSBjbGVhbiBtYXJrZG93biAod2l0aG91dCBzdGF0ZSBtZXRhZGF0YSlcbiAgIC0gQ2xpY2sgXCJFeHBvcnQgTURcIiB0byBkb3dubG9hZCBgUkVBRE1FLm1kYCBmaWxlXG5cbiMjIyBTZWN0aW9uIFR5cGVzXG5cbi0gKipUaXRsZSoqIC0gUHJvamVjdCBuYW1lLCBzdWJ0aXRsZSwgb3B0aW9uYWwgbG9nb1xuLSAqKkRlc2NyaXB0aW9uKiogLSBQcm9qZWN0IG92ZXJ2aWV3XG4tICoqVGVjaCBTdGFjayoqIC0gVGVjaG5vbG9neSBiYWRnZXMgKFNoaWVsZHMuaW8gaW50ZWdyYXRpb24pXG4tICoqSW5zdGFsbGF0aW9uKiogLSBQcmVyZXF1aXNpdGVzIGFuZCBzZXR1cCBjb21tYW5kc1xuLSAqKlVzYWdlKiogLSBVc2FnZSBpbnN0cnVjdGlvbnMgd2l0aCBjb2RlIGJsb2Nrc1xuLSAqKkZlYXR1cmVzKiogLSBGZWF0dXJlIGxpc3Qgd2l0aCBjaGVja21hcmtzXG4tICoqU2NyZWVuc2hvdHMqKiAtIEltYWdlIGdhbGxlcnkgd2l0aCBjYXB0aW9ucyAoc2luZ2xlIG9yIGdyaWQgbGF5b3V0KVxuLSAqKkVudmlyb25tZW50IFZhcmlhYmxlcyoqIC0gLmVudiBjb25maWd1cmF0aW9uIHRhYmxlXG4tICoqQVBJIFJlZmVyZW5jZSoqIC0gUkVTVCBlbmRwb2ludCBkb2N1bWVudGF0aW9uXG4tICoqRm9sZGVyIFN0cnVjdHVyZSoqIC0gUHJvamVjdCBkaXJlY3RvcnkgdHJlZSB2aXN1YWxpemF0aW9uXG4tICoqQ29udHJpYnV0aW5nKiogLSBDb250cmlidXRpb24gZ3VpZGVsaW5lc1xuLSAqKkxpY2Vuc2UqKiAtIExpY2Vuc2UgaW5mb3JtYXRpb25cbi0gKipUYWJsZSBvZiBDb250ZW50cyoqIC0gQXV0by1nZW5lcmF0ZWQgVE9DIGZyb20gc2VjdGlvbiB0aXRsZXNcbi0gKipTb2NpYWwgTGlua3MqKiAtIEdpdEh1YiwgVHdpdHRlciwgTGlua2VkSW4gbGlua3Ncbi0gKipGQVEqKiAtIEZyZXF1ZW50bHkgYXNrZWQgcXVlc3Rpb25zXG4tICoqUm9hZG1hcCoqIC0gRmVhdHVyZSByb2FkbWFwIHdpdGggcHJvZ3Jlc3MgdHJhY2tpbmdcbi0gKipEZW1vICYgRGVwbG95bWVudHMqKiAtIExpbmtzIHRvIGxpdmUgZGVtb3MgYW5kIGRlcGxveW1lbnRzXG4tICoqQ3VzdG9tIE1hcmtkb3duKiogLSBSYXcgbWFya2Rvd24gZm9yIGN1c3RvbSBjb250ZW50XG5cbi0tLSIsImNvZGVCbG9jayI6IiIsImxhbmd1YWdlIjoiamF2YXNjcmlwdCJ9fSx7InR5cGUiOiJ0ZWNoLXN0YWNrIiwidGl0bGUiOiLwn5ug77iPIFRlY2ggU3RhY2siLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7ImJhZGdlcyI6W3sibGFiZWwiOiJTdmVsdGUiLCJtZXNzYWdlIjoiU3ZlbHRlIiwiY29sb3IiOiJGRjNFMDAiLCJsb2dvIjoic3ZlbHRlIn0seyJsYWJlbCI6IlR5cGVTY3JpcHQiLCJtZXNzYWdlIjoiVHlwZVNjcmlwdCIsImNvbG9yIjoiMzE3OEM2IiwibG9nbyI6InR5cGVzY3JpcHQifSx7ImxhYmVsIjoiVGFpbHdpbmQgQ1NTIiwibWVzc2FnZSI6IlRhaWx3aW5kQ1NTIiwiY29sb3IiOiIwNkI2RDQiLCJsb2dvIjoidGFpbHdpbmRjc3MifSx7ImxhYmVsIjoiVml0ZSIsIm1lc3NhZ2UiOiJWaXRlIiwiY29sb3IiOiI2NDZDRkYiLCJsb2dvIjoidml0ZSJ9LHsibGFiZWwiOiJOb2RlLmpzIiwibWVzc2FnZSI6Ik5vZGUuanMiLCJjb2xvciI6IjMzOTkzMyIsImxvZ28iOiJub2RlanMifSx7ImxhYmVsIjoiU3ZlbHRlS2l0IiwibWVzc2FnZSI6IlN2ZWx0ZUtpdCIsImNvbG9yIjoiRkYzRTAwIiwibG9nbyI6InN2ZWx0ZSJ9XX19LHsidHlwZSI6ImZvbGRlci1zdHJ1Y3R1cmUiLCJ0aXRsZSI6IvCfk4EgUHJvamVjdCBTdHJ1Y3R1cmUiLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7InRyZWUiOiIiLCJleHBsYW5hdGlvbiI6Ii0tLSJ9fSx7InR5cGUiOiJmZWF0dXJlcyIsInRpdGxlIjoi8J+OqCBLZXkgRmVhdHVyZXMgRXhwbGFpbmVkIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJpdGVtcyI6WyJFZGl0IHNlY3Rpb25zIHZpc3VhbGx5IOKGkiBhdXRvLWNvbXBpbGVzIHRvIG1hcmtkb3duIiwiRWRpdCByYXcgbWFya2Rvd24g4oaSIGF1dG8tcGFyc2VzIGJhY2sgdG8gdmlzdWFsIGZvcm0iLCJCdWlsZGVyIHN0YXRlIHBlcnNpc3RzIGFzIEJhc2U2NCBjb21tZW50IChzdHJpcHBlZCBvbiBjb3B5KSIsIkNvcHkgYnV0dG9uIHJlbW92ZXMgZW1iZWRkZWQgc3RhdGUgbWV0YWRhdGEiLCJFeHBvcnQgZG93bmxvYWRzIHB1cmUsIHByb2R1Y3Rpb24tcmVhZHkgUkVBRE1FLm1kIiwiTm8gYnVpbGQgYXJ0aWZhY3RzIG9yIGRlYnVnIGluZm8iLCIqRnVsbHN0YWNrKiogLSBGdWxsLWZlYXR1cmVkIHdlYiBhcHBsaWNhdGlvbnMiLCIqUG9ydGZvbGlvKiogLSBEZXZlbG9wZXIgcG9ydGZvbGlvcyBhbmQgc2hvd2Nhc2VzIiwiKlBhY2thZ2UqKiAtIE5QTS9saWJyYXJ5IHByb2plY3RzIiwiKk1vYmlsZSoqIC0gTW9iaWxlIGFwcCBwcm9qZWN0cyIsIipNTCoqIC0gTWFjaGluZSBsZWFybmluZyBwcm9qZWN0cyIsIipIYWNrYXRob24qKiAtIFF1aWNrIHByb2plY3QgZG9jdW1lbnRhdGlvbiIsIipBUEkqKiAtIFJFU1QvR3JhcGhRTCBBUEkgZG9jdW1lbnRhdGlvbiIsIipHYW1lKiogLSBHYW1lIGRldmVsb3BtZW50IHByb2plY3RzIl19fSx7InR5cGUiOiJjdXN0b20tbWFya2Rvd24iLCJ0aXRsZSI6IuKame+4jyBBdmFpbGFibGUgU2NyaXB0cyIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsibWFya2Rvd24iOiIjIyDimpnvuI8gQXZhaWxhYmxlIFNjcmlwdHNcblxuYGBgYmFzaFxubnBtIHJ1biBkZXYgICAgICAgICAgICMgU3RhcnQgZGV2IHNlcnZlciAoaG90IHJlbG9hZClcbm5wbSBydW4gYnVpbGQgICAgICAgICAjIEJ1aWxkIGZvciBwcm9kdWN0aW9uXG5ucG0gcnVuIHByZXZpZXcgICAgICAgIyBQcmV2aWV3IHByb2R1Y3Rpb24gYnVpbGQgbG9jYWxseVxubnBtIHJ1biBjaGVjayAgICAgICAgICMgVHlwZSBjaGVjayB3aXRoIHN2ZWx0ZS1raXRcbm5wbSBydW4gbGludCAgICAgICAgICAjIFJ1biBwcmV0dGllciAmIGVzbGludFxubnBtIHJ1biBmb3JtYXQgICAgICAgICMgQXV0by1mb3JtYXQgY29kZSB3aXRoIHByZXR0aWVyXG5gYGBcblxuLS0tIn19LHsidHlwZSI6ImNvbnRyaWJ1dGluZyIsInRpdGxlIjoi8J+knSBDb250cmlidXRpbmciLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7InRleHQiOiJDb250cmlidXRpb25zIGFyZSB3aGF0IG1ha2UgdGhlIG9wZW4gc291cmNlIGNvbW11bml0eSBzdWNoIGFuIGFtYXppbmcgcGxhY2UgdG8gbGVhcm4sIGluc3BpcmUsIGFuZCBjcmVhdGUuIEFueSBjb250cmlidXRpb25zIHlvdSBtYWtlIGFyZSAqKmdyZWF0bHkgYXBwcmVjaWF0ZWQqKi5cblxuMS4gRm9yayB0aGUgUHJvamVjdFxuMi4gQ3JlYXRlIHlvdXIgRmVhdHVyZSBCcmFuY2ggKGBnaXQgY2hlY2tvdXQgLWIgZmVhdHVyZS9BbWF6aW5nRmVhdHVyZWApXG4zLiBDb21taXQgeW91ciBDaGFuZ2VzIChgZ2l0IGNvbW1pdCAtbSAnQWRkIHNvbWUgQW1hemluZ0ZlYXR1cmUnYClcbjQuIFB1c2ggdG8gdGhlIEJyYW5jaCAoYGdpdCBwdXNoIG9yaWdpbiBmZWF0dXJlL0FtYXppbmdGZWF0dXJlYClcbjUuIE9wZW4gYSBQdWxsIFJlcXVlc3QifX0seyJ0eXBlIjoiY3VzdG9tLW1hcmtkb3duIiwidGl0bGUiOiLwn5mLIFN1cHBvcnQiLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7Im1hcmtkb3duIjoiIyMg8J+ZiyBTdXBwb3J0XG5cbkZvdW5kIGEgYnVnIG9yIGhhdmUgYSBmZWF0dXJlIHJlcXVlc3Q/IFtPcGVuIGFuIGlzc3VlXShodHRwczovL2dpdGh1Yi5jb20vem5kcjMvcmVhZG1lLWJ1aWxkZXIvaXNzdWVzKSFcblxuLS0tXG5cbioqTWFkZSB3aXRoIPCfkJ4gYnkgWmFuZGVyKioifX0seyJ0eXBlIjoiaW5zdGFsbGF0aW9uIiwidGl0bGUiOiJJbnN0YWxsYXRpb24iLCJ2aXNpYmxlIjp0cnVlLCJjb250ZW50Ijp7InByZXJlcXVpc2l0ZXMiOiJOb2RlLmpzIHYxOCsiLCJjb21tYW5kcyI6Im5wbSBpbnN0YWxsIn19XQ== -->
