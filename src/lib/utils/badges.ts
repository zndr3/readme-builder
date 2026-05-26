export interface TechBadge {
  label: string;
  message: string;
  color: string;
  logo: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'languages' | 'other';
}

export const techBadgesCatalog: TechBadge[] = [
  // Languages
  { label: 'TypeScript', message: 'TypeScript', color: '3178C6', logo: 'typescript', category: 'languages' },
  { label: 'JavaScript', message: 'JavaScript', color: 'F7DF1E', logo: 'javascript', category: 'languages' },
  { label: 'Python', message: 'Python', color: '3776AB', logo: 'python', category: 'languages' },
  { label: 'Rust', message: 'Rust', color: '000000', logo: 'rust', category: 'languages' },
  { label: 'Go', message: 'Go', color: '00ADD8', logo: 'go', category: 'languages' },
  { label: 'Ruby', message: 'Ruby', color: 'CC342D', logo: 'ruby', category: 'languages' },
  { label: 'PHP', message: 'PHP', color: '777BB4', logo: 'php', category: 'languages' },
  { label: 'Java', message: 'Java', color: '007396', logo: 'java', category: 'languages' },
  { label: 'Kotlin', message: 'Kotlin', color: '7F52FF', logo: 'kotlin', category: 'languages' },
  { label: 'Swift', message: 'Swift', color: 'F05138', logo: 'swift', category: 'languages' },
  { label: 'C++', message: 'C%2B%2B', color: '00599C', logo: 'cplusplus', category: 'languages' },
  { label: 'C#', message: 'C%23', color: '239120', logo: 'c-sharp', category: 'languages' },
  { label: 'Dart', message: 'Dart', color: '0175C2', logo: 'dart', category: 'languages' },
  { label: 'HTML5', message: 'HTML5', color: 'E34F26', logo: 'html5', category: 'languages' },
  { label: 'CSS3', message: 'CSS3', color: '1572B6', logo: 'css3', category: 'languages' },

  // Frontend
  { label: 'Svelte', message: 'Svelte', color: 'FF3E00', logo: 'svelte', category: 'frontend' },
  { label: 'React', message: 'React', color: '61DAFB', logo: 'react', category: 'frontend' },
  { label: 'Vue.js', message: 'Vue.js', color: '4FC08D', logo: 'vue.js', category: 'frontend' },
  { label: 'Angular', message: 'Angular', color: 'DD0031', logo: 'angular', category: 'frontend' },
  { label: 'Next.js', message: 'Next.js', color: '000000', logo: 'nextdotjs', category: 'frontend' },
  { label: 'Nuxt.js', message: 'Nuxt.js', color: '00DC82', logo: 'nuxtdotjs', category: 'frontend' },
  { label: 'SvelteKit', message: 'SvelteKit', color: 'FF3E00', logo: 'svelte', category: 'frontend' },
  { label: 'Tailwind CSS', message: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss', category: 'frontend' },
  { label: 'Bootstrap', message: 'Bootstrap', color: '7952B3', logo: 'bootstrap', category: 'frontend' },
  { label: 'Sass', message: 'Sass', color: 'CC6699', logo: 'sass', category: 'frontend' },
  { label: 'Chakra UI', message: 'Chakra UI', color: '319795', logo: 'chakraui', category: 'frontend' },
  { label: 'SolidJS', message: 'SolidJS', color: '2C4F7C', logo: 'solid', category: 'frontend' },
  { label: 'Redux', message: 'Redux', color: '764ABC', logo: 'redux', category: 'frontend' },
  { label: 'JQuery', message: 'jQuery', color: '0769AD', logo: 'jquery', category: 'frontend' },

  // Backend
  { label: 'Node.js', message: 'Node.js', color: '5FA04E', logo: 'nodedotjs', category: 'backend' },
  { label: 'Express', message: 'Express.js', color: '000000', logo: 'express', category: 'backend' },
  { label: 'Django', message: 'Django', color: '092E20', logo: 'django', category: 'backend' },
  { label: 'FastAPI', message: 'FastAPI', color: '009688', logo: 'fastapi', category: 'backend' },
  { label: 'Spring Boot', message: 'Spring Boot', color: '6DB33F', logo: 'springboot', category: 'backend' },
  { label: 'NestJS', message: 'NestJS', color: 'E0234E', logo: 'nestjs', category: 'backend' },
  { label: 'Flask', message: 'Flask', color: '000000', logo: 'flask', category: 'backend' },
  { label: 'Laravel', message: 'Laravel', color: 'FF2D20', logo: 'laravel', category: 'backend' },
  { label: 'Ruby on Rails', message: 'Ruby on Rails', color: 'CC0000', logo: 'rubyonrails', category: 'backend' },
  { label: 'GraphQL', message: 'GraphQL', color: 'E10098', logo: 'graphql', category: 'backend' },

  // Databases
  { label: 'PostgreSQL', message: 'PostgreSQL', color: '4169E1', logo: 'postgresql', category: 'database' },
  { label: 'MongoDB', message: 'MongoDB', color: '47A248', logo: 'mongodb', category: 'database' },
  { label: 'Redis', message: 'Redis', color: 'DC382D', logo: 'redis', category: 'database' },
  { label: 'SQLite', message: 'SQLite', color: '003B57', logo: 'sqlite', category: 'database' },
  { label: 'MySQL', message: 'MySQL', color: '4479A1', logo: 'mysql', category: 'database' },
  { label: 'Supabase', message: 'Supabase', color: '3ECF8E', logo: 'supabase', category: 'database' },
  { label: 'Firebase', message: 'Firebase', color: 'FFCA28', logo: 'firebase', category: 'database' },
  { label: 'Prisma', message: 'Prisma', color: '2D3748', logo: 'prisma', category: 'database' },
  { label: 'Cassandra', message: 'Cassandra', color: '1287B1', logo: 'apachecassandra', category: 'database' },

  // DevOps & Cloud
  { label: 'Docker', message: 'Docker', color: '2496ED', logo: 'docker', category: 'devops' },
  { label: 'Kubernetes', message: 'Kubernetes', color: '326CE5', logo: 'kubernetes', category: 'devops' },
  { label: 'AWS', message: 'AWS', color: '232F3E', logo: 'amazonwebservices', category: 'devops' },
  { label: 'Google Cloud', message: 'Google Cloud', color: '4285F4', logo: 'googlecloud', category: 'devops' },
  { label: 'Azure', message: 'Azure', color: '0089D6', logo: 'microsoftazure', category: 'devops' },
  { label: 'Vercel', message: 'Vercel', color: '000000', logo: 'vercel', category: 'devops' },
  { label: 'Netlify', message: 'Netlify', color: '00C8C8', logo: 'netlify', category: 'devops' },
  { label: 'GitHub Actions', message: 'GitHub Actions', color: '2088FF', logo: 'githubactions', category: 'devops' },
  { label: 'Terraform', message: 'Terraform', color: '844FBA', logo: 'terraform', category: 'devops' },
  { label: 'Cloudflare', message: 'Cloudflare', color: 'F38020', logo: 'cloudflare', category: 'devops' },

  // Other / Tools
  { label: 'Git', message: 'Git', color: 'F05032', logo: 'git', category: 'other' },
  { label: 'Vite', message: 'Vite', color: '646CFF', logo: 'vite', category: 'other' },
  { label: 'Linux', message: 'Linux', color: 'FCC624', logo: 'linux', category: 'other' },
  { label: 'VS Code', message: 'VS Code', color: '007ACC', logo: 'visualstudiocode', category: 'other' },
  { label: 'Figma', message: 'Figma', color: 'F24E1E', logo: 'figma', category: 'other' },
  { label: 'Postman', message: 'Postman', color: 'FF6C37', logo: 'postman', category: 'other' }
];

// Compile badge object to standard Shields.io markdown string
export function renderBadgeMarkdown(badge: { label: string; message: string; color: string; logo: string }, style = 'for-the-badge'): string {
  const cleanMessage = encodeURIComponent(badge.message).replace(/-/g, '--');
  const cleanColor = badge.color.replace('#', '');
  const logoParam = badge.logo ? `&logo=${badge.logo}` : '';
  const textLabel = badge.label || badge.message;
  return `![${textLabel}](https://img.shields.io/badge/${cleanMessage}-${cleanColor}?style=${style}${logoParam}&logoColor=white)`;
}
