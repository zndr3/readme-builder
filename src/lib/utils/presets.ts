import { createSection, type READMESection, generateId } from './sections';

export interface TemplatePreset {
  name: string;
  description: string;
  icon: string;
  sections: READMESection[];
}

export const templatePresets: Record<string, TemplatePreset> = {
  fullstack: {
    name: 'Fullstack App',
    description: 'Sleek setup for complex web apps (Database, API, Auth, Env vars).',
    icon: 'Layers',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '🌐 Nexus Platform', subtitle: 'Enterprise-grade fullstack dashboard with real-time analytics.', align: 'center', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'tech-stack',
        title: 'Tech Stack',
        visible: true,
        content: {
          badges: [
            { label: 'Next.js', message: 'Next.js', color: '000000', logo: 'nextdotjs' },
            { label: 'TypeScript', message: 'TypeScript', color: '3178C6', logo: 'typescript' },
            { label: 'Tailwind CSS', message: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss' },
            { label: 'NestJS', message: 'NestJS', color: 'E0234E', logo: 'nestjs' },
            { label: 'PostgreSQL', message: 'PostgreSQL', color: '4169E1', logo: 'postgresql' },
            { label: 'Docker', message: 'Docker', color: '2496ED', logo: 'docker' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Description',
        visible: true,
        content: { text: 'Nexus is a high-availability, fully dockerized SaaS platform that lets operations teams monitor application health metrics in real time. It features a responsive React dashboard, an optimized NestJS server with Redis caching, and a robust PostgreSQL database storage layer.' }
      },
      {
        id: generateId(),
        type: 'features',
        title: 'Features',
        visible: true,
        content: {
          items: [
            '🔐 **JWT Authentication**: Secure login, registration, and session controls.',
            '📈 **Real-Time Telemetry**: WebSockets-driven charts displaying system CPU and memory load.',
            '⚡ **Redis Cache Layer**: Instant responses for high-demand analytical endpoints.',
            '🐳 **Docker Orchestrated**: Spin up the entire environment (Frontend, DB, Cache) in one command.'
          ]
        }
      },
      {
        id: generateId(),
        type: 'screenshots',
        title: 'Screenshots',
        visible: true,
        content: {
          images: [
            { url: './images/dashboard-main.png', alt: 'Analytics Dashboard', caption: 'Interactive operations control room featuring light and dark configurations.' }
          ],
          style: 'list'
        }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Installation',
        visible: true,
        content: {
          prerequisites: 'Docker & Docker Compose\nNode.js v20.0.0+',
          commands: '# Clone repository\ngit clone https://github.com/company/nexus-platform.git\ncd nexus-platform\n\n# Configure local environments\ncp .env.example .env\n\n# Run using docker-compose\ndocker-compose up -d --build\n\n# Verify frontend is running locally\n# Open http://localhost:3000 in your browser'
        }
      },
      {
        id: generateId(),
        type: 'env-vars',
        title: 'Environment Variables',
        visible: true,
        content: {
          vars: [
            { name: 'DATABASE_URL', description: 'PostgreSQL connection string', defaultValue: 'postgresql://postgres:secret@localhost:5432/nexus' },
            { name: 'JWT_SECRET_KEY', description: 'Cryptographic hash key for signing login web tokens', defaultValue: 'nexus_secret_hash_2026' },
            { name: 'REDIS_HOST', description: 'Address for local cache services', defaultValue: 'localhost' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'api-setup',
        title: 'API Setup',
        visible: true,
        content: {
          endpoint: '/api/v1/metrics/summary',
          method: 'GET',
          headers: 'Authorization: Bearer <JWT_TOKEN>',
          body: '',
          response: '{\n  "status": "success",\n  "timestamp": "2026-05-26T22:30:00Z",\n  "metrics": {\n    "activeUsers": 1289,\n    "systemCpuLoadPercent": 14.5,\n    "dbConnectionHealthy": true\n  }\n}'
        }
      },
      {
        id: generateId(),
        type: 'folder-structure',
        title: 'Folder Structure',
        visible: true,
        content: {
          tree: 'nexus-platform/\n├── apps/\n│   ├── frontend/         # Next.js web application\n│   └── backend/          # NestJS Server core\n├── docker-compose.yml   # Multi-container conductor\n├── images/              # Visual user assets\n└── README.md',
          explanation: 'Nexus operates as a monorepo under the `apps/` directory, managed dynamically using standard npm workspaces.'
        }
      },
      {
        id: generateId(),
        type: 'license',
        title: 'License',
        visible: true,
        content: { type: 'MIT', author: 'Nexus Devs', year: '2026' }
      }
    ]
  },

  portfolio: {
    name: 'Portfolio Project',
    description: 'Designed to showcase your achievements, custom links, and social grids.',
    icon: 'Briefcase',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '👨‍💻 Jane Doe — Creative Developer', subtitle: 'Crafting responsive, high-performance web experiences and interactive tools.', align: 'center', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'socials',
        title: 'Author / Social Links',
        visible: true,
        content: {
          items: [
            { platform: 'GitHub', username: 'janedoe_dev', url: 'https://github.com/janedoe_dev', color: '181717' },
            { platform: 'Twitter/X', username: 'jane_tweets', url: 'https://twitter.com/jane_tweets', color: '1DA1F2' },
            { platform: 'LinkedIn', username: 'jane-doe', url: 'https://linkedin.com/in/jane-doe', color: '0077B5' },
            { platform: 'Portfolio Website', username: 'janedoe.dev', url: 'https://janedoe.dev', color: '4CAF50' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Description',
        visible: true,
        content: { text: 'Hi! I am a passionate Frontend Developer specializing in React, Svelte, and immersive WebGL applications. This repository houses my open-source codebases, design guidelines, and interactive experimentation sandboxes.' }
      },
      {
        id: generateId(),
        type: 'features',
        title: 'Core Skills',
        visible: true,
        content: {
          items: [
            '🚀 **Frontend Excellence**: Proficient in React, Svelte, Tailwind CSS, and SvelteKit.',
            '⚡ **WebGL & Animations**: Experience with Three.js, GSAP, and custom shaders.',
            '🛠️ **Architecting Pipelines**: Automated CI/CD integration using GitHub Actions.',
            '💡 **User Experience**: Highly focused on premium micro-interactions, responsive design, and deep accessibility.'
          ]
        }
      },
      {
        id: generateId(),
        type: 'demo-links',
        title: 'Demo Links',
        visible: true,
        content: {
          items: [
            { label: '✨ View My Live Interactive Portfolio', url: 'https://janedoe.dev' },
            { label: '📄 Read My Interactive Resume', url: 'https://resume.janedoe.dev' }
          ]
        }
      }
    ]
  },

  pkg: {
    name: 'Open Source Package',
    description: 'Perfect for npm packages, Python libraries, or Go binaries with clear setup instructions.',
    icon: 'Package',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '📦 FastCache', subtitle: 'A thread-safe, high-concurrency memory cache for high-demand servers.', align: 'left', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'tech-stack',
        title: 'Tech Stack',
        visible: true,
        content: {
          badges: [
            { label: 'Go', message: 'Go', color: '00ADD8', logo: 'go' },
            { label: 'Docker', message: 'Docker', color: '2496ED', logo: 'docker' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Description',
        visible: true,
        content: { text: 'FastCache is a zero-allocation, lightweight Go library designed to hold millions of entries without incurring significant garbage collection overhead. It is optimized for high-concurrency environments and achieves sub-nanosecond lookups.' }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Installation',
        visible: true,
        content: {
          prerequisites: 'Go v1.19+',
          commands: '# Fetch package into your workspace\ngo get github.com/username/fastcache'
        }
      },
      {
        id: generateId(),
        type: 'usage',
        title: 'Usage',
        visible: true,
        content: {
          description: 'Initialize a new FastCache instance and begin writing/reading entries in parallel.',
          codeBlock: "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n\t\"github.com/username/fastcache\"\n)\n\nfunc main() {\n\t// Create cache instance with a 5-minute eviction interval\n\tcache := fastcache.New(5 * time.Minute)\n\n\t// Write key-value pair\n\tcache.Set(\"session_1092\", []byte(\"user_active\"), 30 * time.Second)\n\n\t// Retrieve item\n\tval, found := cache.Get(\"session_1092\")\n\tif found {\n\t\tfmt.Printf(\"Session State: %s\\n\", string(val))\n\t}\n}",
          language: 'go'
        }
      },
      {
        id: generateId(),
        type: 'contributing',
        title: 'Contributing',
        visible: true,
        content: { text: 'We love open-source collaboration! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to run tests, write benchmarks, and submit clean pull requests.' }
      },
      {
        id: generateId(),
        type: 'license',
        title: 'License',
        visible: true,
        content: { type: 'MIT', author: 'FastCache Authors', year: '2026' }
      }
    ]
  },

  mobile: {
    name: 'Mobile App',
    description: 'Designed for iOS / Android projects, showcasing store badges and build prerequisites.',
    icon: 'Smartphone',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '📱 FitTracker Mobile', subtitle: 'Beautiful offline-first exercise and sleep companion app.', align: 'center', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'tech-stack',
        title: 'Tech Stack',
        visible: true,
        content: {
          badges: [
            { label: 'React Native', message: 'React Native', color: '61DAFB', logo: 'react' },
            { label: 'TypeScript', message: 'TypeScript', color: '3178C6', logo: 'typescript' },
            { label: 'Firebase', message: 'Firebase', color: 'FFCA28', logo: 'firebase' },
            { label: 'SQLite', message: 'SQLite', color: '003B57', logo: 'sqlite' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Description',
        visible: true,
        content: { text: 'FitTracker helps individuals log workouts, monitor sleep patterns, and track nutritional milestones in an elegant offline-first interface. It runs natively on iOS and Android devices, securely syncing local SQLite tables with a central cloud directory when internet access returns.' }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Developer Setup',
        visible: true,
        content: {
          prerequisites: 'Node.js v18+\nXcode (for iOS build compilation)\nAndroid Studio & SDK (for Android builds)',
          commands: '# Install React Native CLI dependencies\nnpm install\n\n# Set up iOS pods directory\ncd ios && pod install && cd ..\n\n# Run app in iOS Simulator\nnpm run ios\n\n# Run app in Android Emulator\nnpm run android'
        }
      },
      {
        id: generateId(),
        type: 'license',
        title: 'License',
        visible: true,
        content: { type: 'Apache 2.0', author: 'FitTracker Inc', year: '2026' }
      }
    ]
  },

  ml: {
    name: 'Machine Learning',
    description: 'Preloads datasets citations, notebook links, python dependency structures, and model benchmarks.',
    icon: 'Cpu',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '🧠 AstroClassifier', subtitle: 'Classifying galaxy structures and stellar shapes using Deep Convolutional Neural Networks.', align: 'left', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'tech-stack',
        title: 'Tech Stack',
        visible: true,
        content: {
          badges: [
            { label: 'Python', message: 'Python', color: '3776AB', logo: 'python' },
            { label: 'PyTorch', message: 'PyTorch', color: 'EE4C2C', logo: 'pytorch' },
            { label: 'FastAPI', message: 'FastAPI', color: '009688', logo: 'fastapi' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Description',
        visible: true,
        content: { text: 'AstroClassifier uses a PyTorch-driven ResNet-50 architecture to scan astronomical astronomical surveys and classify galaxies into spiral, elliptical, or irregular structures with 98.4% validation accuracy.' }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Environment Setup',
        visible: true,
        content: {
          prerequisites: 'Python 3.10+\nNVIDIA CUDA Toolkit 11.8+ (For GPU acceleration)',
          commands: '# Create and launch virtual environment\npython -m venv venv\nsource venv/bin/activate # On Windows use `venv\\Scripts\\activate`\n\n# Install deep learning dependencies\npip install -r requirements.txt'
        }
      },
      {
        id: generateId(),
        type: 'usage',
        title: 'Running Inference',
        visible: true,
        content: {
          description: 'Provide an astronomical image input and run inference to predict galaxy classification.',
          codeBlock: "from astro_classifier import GalaxyNet\nfrom PIL import Image\nimport torch\n\n# Initialize model and load trained weights\nmodel = GalaxyNet()\nmodel.load_state_dict(torch.load(\"weights/resnet50_best.pth\"))\nmodel.eval()\n\n# Open survey image\nimg = Image.open(\"surveys/spiral_galaxy_a.jpg\")\nprediction = model.predict(img)\nprint(f\"Predicted Structure: {prediction.label} ({prediction.confidence * 100:.2f}%)\")",
          language: 'python'
        }
      }
    ]
  },

  hackathon: {
    name: 'Hackathon Project',
    description: 'Designed to get pitch demos, video links, team members, and high-impact descriptions up in minutes.',
    icon: 'Zap',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '⚡ HelpFlow', subtitle: 'Bridging local charity networks and surplus food supplies in real time.', align: 'center', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Hackathon Pitch & Problem Solver',
        visible: true,
        content: { text: '⚠️ **The Problem**: Tons of edible food is discarded daily by local bakeries/grocers, while charity kitchens face daily food shortages.\n\n💡 **Our Solution**: HelpFlow acts as an instant food-matching dashboard, letting retailers log surplus stocks with two taps. Nearby charity drivers get automated SMS alerts and optimal navigation maps to pick up and distribute food before it expires.' }
      },
      {
        id: generateId(),
        type: 'demo-links',
        title: 'Interactive Assets',
        visible: true,
        content: {
          items: [
            { label: '🎥 Watch our 3-Minute Video Pitch', url: 'https://youtube.com/watch?v=mock_video' },
            { label: '🚀 Test the Active Mobile Prototype Webapp', url: 'https://helpflow.vercel.app' }
          ]
        }
      },
      {
        id: generateId(),
        type: 'features',
        title: 'How It Works',
        visible: true,
        content: {
          items: [
            '📱 **Retailer Logger**: Bakers tap categories (Bread, Pastries, Produce) and submit.',
            '💬 **Twilio Dispatch**: Local drivers receive immediate pickup SMS notifications.',
            '🗺️ **Mapbox Routing**: Automatically traces the fastest routes to prevent transit delays.'
          ]
        }
      }
    ]
  },

  api: {
    name: 'API Service',
    description: 'Preloads curl queries, visual API response outputs, and route specifications.',
    icon: 'Code',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '🔌 ImageEvict API', subtitle: 'High-speed cloud-based image processing and background removal service.', align: 'left', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Overview',
        visible: true,
        content: { text: 'ImageEvict is a lightning-fast API microservice built in Go that strips backgrounds from e-commerce product photos. It exposes simple POST REST routes and handles high-throughput image matrices using native CPU SIMD instructions.' }
      },
      {
        id: generateId(),
        type: 'api-setup',
        title: 'Endpoint Reference',
        visible: true,
        content: {
          endpoint: '/api/v2/remove-background',
          method: 'POST',
          headers: 'Content-Type: multipart/form-data\nX-API-Key: imgevict_token_908210',
          body: '# Multipart Form Fields:\nimage: file (png, jpeg)\nthreshold: float (0.1 - 1.0)\noutput_format: string ("png", "webp")',
          response: '{\n  "status": "completed",\n  "processing_time_ms": 114,\n  "original_size_bytes": 1092408,\n  "processed_image_url": "https://cdn.imageevict.com/outputs/product_no_bg_18.webp"\n}'
        }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Self-Hosting Setup',
        visible: true,
        content: {
          prerequisites: 'Go 1.20+\nlibvips-dev library (Debian/Ubuntu: `sudo apt install libvips-dev`)',
          commands: '# Install libvips dependency on macOS\n# brew install vips\n\n# Run locally\ngo run cmd/api/main.go'
        }
      }
    ]
  },

  game: {
    name: 'Game Development',
    description: 'Boilerplate showing controls, engine specification, design guidelines, and desktop builds.',
    icon: 'Gamepad',
    sections: [
      {
        id: generateId(),
        type: 'title',
        title: 'Project Title',
        visible: true,
        content: { text: '⚔️ ChronoQuest', subtitle: 'A retro-inspired 2D action RPG built using Godot 4.2.', align: 'center', logoUrl: '', logoWidth: '100' }
      },
      {
        id: generateId(),
        type: 'description',
        title: 'Game Outline',
        visible: true,
        content: { text: 'Step into the shoes of a time-traveling explorer, dodging traps, solving puzzles, and battling boss monsters across historic timelines. Built in Godot with GDScript, ChronoQuest features pixel art assets, lighting shaders, and original synthesizer chip music.' }
      },
      {
        id: generateId(),
        type: 'features',
        title: 'Key Gameplay Features',
        visible: true,
        content: {
          items: [
            '⌛ **Time Rewind mechanic**: Slip backwards up to 5 seconds to dodge incoming projectiles.',
            '🏰 **Adaptive Timelines**: Environments change based on the era you traverse.',
            '🎒 **Equipment customization**: Synthesize historic tools to forge unique battle items.'
          ]
        }
      },
      {
        id: generateId(),
        type: 'installation',
        title: 'Controls & Building',
        visible: true,
        content: {
          prerequisites: 'Godot Engine v4.2+ (Standard Edition)',
          commands: '# WSAD / Arrow Keys: Character Movement\n# Spacebar: Jump & Dodge\n# J: Primary sword attack\n# K: Time-travel portal activation\n\n# To open project:\n# 1. Download and run Godot 4.2.\n# 2. Click "Import" and choose the `project.godot` file in this directory.'
        }
      }
    ]
  }
};
