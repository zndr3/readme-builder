export type SectionType =
  | 'title'
  | 'description'
  | 'installation'
  | 'usage'
  | 'features'
  | 'tech-stack'
  | 'screenshots'
  | 'env-vars'
  | 'api-setup'
  | 'folder-structure'
  | 'contributing'
  | 'license'
  | 'socials'
  | 'faq'
  | 'roadmap'
  | 'demo-links'
  | 'toc'
  | 'custom-markdown';

export interface READMESection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  content: any;
}

// Generates a random small ID for drag-and-drop unique references
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Full schemas and default/placeholder data for each section type
export const defaultSectionContent: Record<SectionType, { title: string; content: any }> = {
  title: {
    title: 'Project Title',
    content: {
      text: '🚀 My Awesome Project',
      subtitle: 'A clean, modern, and high-performance solution built for developers.',
      align: 'center',
      logoUrl: '',
      logoWidth: '100'
    }
  },
  description: {
    title: 'Description',
    content: {
      text: 'This project is a state-of-the-art web application designed to solve complex developer workflows. It features ultra-fast performance, premium glassmorphism styling, and responsive controls.\n\nBuilt with developer experience (DX) in mind, it provides an intuitive interface that makes building professional assets feel fast, visual, and entirely beginner-friendly.'
    }
  },
  installation: {
    title: 'Installation',
    content: {
      prerequisites: 'Node.js v18 or higher\nnpm v9 or higher',
      commands: '# Clone the repository\ngit clone https://github.com/username/my-awesome-project.git\n\n# Navigate to the project folder\ncd my-awesome-project\n\n# Install dependencies\nnpm install\n\n# Start local development server\nnpm run dev'
    }
  },
  usage: {
    title: 'Usage',
    content: {
      description: 'Import the main library and run the initialization function with your custom configuration.',
      codeBlock: "import { initializeApp } from 'my-awesome-package';\n\nconst app = initializeApp({\n  theme: 'dark',\n  enableCache: true,\n  maxRetries: 3\n});\n\n// Start the engine\nawait app.start();",
      language: 'javascript'
    }
  },
  features: {
    title: 'Features',
    content: {
      items: [
        '⚡ **Lightning Fast**: Built on Svelte 5 with reactivity and instant rendering.',
        '🎨 **Premium Aesthetics**: VSCode and GitHub inspired dark mode styling.',
        '🧩 **Draggable Modules**: Smooth drag-and-drop README form components.',
        '🛡️ **Shields.io Integrations**: Click-to-add technology badges catalog.',
        '📦 **Template Presets**: Bootstrap portfolios, packages, or mobile apps in one click.',
        '💾 **No Backend Needed**: Fully frontend client-side rendering and export.'
      ]
    }
  },
  'tech-stack': {
    title: 'Tech Stack',
    content: {
      // Default pre-selected badges
      badges: [
        { label: 'Svelte', message: 'Svelte', color: 'FF3E00', logo: 'svelte' },
        { label: 'TypeScript', message: 'TypeScript', color: '3178C6', logo: 'typescript' },
        { label: 'Tailwind CSS', message: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss' },
        { label: 'Vite', message: 'Vite', color: '646CFF', logo: 'vite' }
      ]
    }
  },
  screenshots: {
    title: 'Screenshots',
    content: {
      images: [
        {
          url: './images/preview.png',
          alt: 'Main Dashboard Preview',
          caption: 'Premium visual dashboard running in full dark mode first layout.'
        }
      ],
      style: 'list' // 'list' | 'grid'
    }
  },
  'env-vars': {
    title: 'Environment Variables',
    content: {
      vars: [
        { name: 'VITE_API_BASE_URL', description: 'The absolute endpoint for accessing backend services', defaultValue: 'https://api.example.com' },
        { name: 'VITE_ENABLE_ANALYTICS', description: 'Toggles visitor telemetry tracking (true/false)', defaultValue: 'false' },
        { name: 'VITE_SESSION_TIMEOUT_MS', description: 'Duration in milliseconds for user session expiry', defaultValue: '3600000' }
      ]
    }
  },
  'api-setup': {
    title: 'API Setup',
    content: {
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      headers: 'Content-Type: application/json\nAuthorization: Bearer <TOKEN>',
      body: '{\n  "email": "user@example.com",\n  "password": "securepassword123"\n}',
      response: '{\n  "status": "success",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "user": {\n    "id": "usr_90210",\n    "name": "Jane Doe"\n  }\n}'
    }
  },
  'folder-structure': {
    title: 'Folder Structure',
    content: {
      tree: 'project-root/\n├── .github/             # GitHub workflow configs\n├── images/              # Visual screenshots & assets\n├── src/\n│   ├── lib/\n│   │   ├── components/  # Reusable UI components\n│   │   └── utils/       # Utility files and encoders\n│   └── routes/          # SvelteKit page router endpoints\n├── static/              # Static file assets\n├── package.json\n└── README.md',
      explanation: 'Our project follows a standard SvelteKit layout, with all visual components and modules located under the `src/` subdirectory.'
    }
  },
  contributing: {
    title: 'Contributing',
    content: {
      text: 'Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.\n\n1. Fork the Project\n2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)\n3. Commit your Changes (`git commit -m \'Add some AmazingFeature\'`)\n4. Push to the Branch (`git push origin feature/AmazingFeature`)\n5. Open a Pull Request'
    }
  },
  license: {
    title: 'License',
    content: {
      type: 'MIT',
      author: 'My Company or Me',
      year: '2026'
    }
  },
  socials: {
    title: 'Author / Social Links',
    content: {
      items: [
        { platform: 'GitHub', username: 'github_username', url: 'https://github.com/github_username', color: '181717' },
        { platform: 'Twitter/X', username: 'twitter_handle', url: 'https://twitter.com/twitter_handle', color: '1DA1F2' },
        { platform: 'LinkedIn', username: 'profile_name', url: 'https://linkedin.com/in/profile_name', color: '0077B5' },
        { platform: 'Email', username: 'hello@example.com', url: 'mailto:hello@example.com', color: 'EA4335' }
      ]
    }
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: {
      items: [
        { question: 'Is this project free to use?', answer: 'Yes! It is released under the MIT license, allowing you to use it for personal and commercial projects.' },
        { question: 'How can I report a security issue or bug?', answer: 'Please open an issue in the GitHub issue tracker or contact the maintainers directly.' },
        { question: 'Does this application support offline mode?', answer: 'Yes! It operates fully on the client-side, meaning no data ever leaves your browser and it works offline.' }
      ]
    }
  },
  roadmap: {
    title: 'Roadmap',
    content: {
      items: [
        { text: 'Launch Phase 1 MVP layout with drag-and-drop sections', completed: true },
        { text: 'Add Shields.io database catalog with custom designer', completed: true },
        { text: 'Implement bidirectional raw markdown text syncing', completed: true },
        { text: 'Deploy AI README generator feature addon', completed: false },
        { text: 'Develop cloud syncing and team collaborative workspace support', completed: false }
      ]
    }
  },
  'demo-links': {
    title: 'Demo Links',
    content: {
      items: [
        { label: '🔴 Live Sandbox', url: 'https://demo.example.com' },
        { label: '📦 NPM Registry Package', url: 'https://npmjs.com/package/my-awesome-package' },
        { label: '🐳 Docker Hub Image', url: 'https://hub.docker.com/r/company/my-awesome-package' }
      ]
    }
  },
  toc: {
    title: 'Table of Contents',
    content: {
      maxDepth: 3
    }
  },
  'custom-markdown': {
    title: 'Custom Markdown Block',
    content: {
      markdown: '<!-- Add custom HTML elements, shields, or markdown here -->\n<div align="center">\n  <p>🎨 Made with love and passion.</p>\n</div>'
    }
  }
};

// Generates a fully initialized README section with default contents
export function createSection(type: SectionType): READMESection {
  const schema = defaultSectionContent[type];
  return {
    id: generateId(),
    type,
    title: schema.title,
    visible: true,
    content: JSON.parse(JSON.stringify(schema.content)) // Deep copy default placeholder values
  };
}
