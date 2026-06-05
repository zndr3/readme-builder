import { type READMESection, createSection, generateId, type SectionType } from './sections';
import { renderBadgeMarkdown } from './badges';

// Encodes UTF-8 string to Base64 safely (supporting emojis)
function safeBtoa(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return '';
  }
}

// Decodes Base64 to UTF-8 string safely
function safeAtob(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return '';
  }
}

// Compile a section state to its final Markdown representation
export function compileSection(section: READMESection, allSections: READMESection[]): string {
  if (!section.visible) return '';

  const { type, content } = section;

  switch (type) {
    case 'title': {
      const { text, subtitle, align, logoUrl, logoWidth } = content;
      const logoTag = logoUrl ? `<img src="${logoUrl}" width="${logoWidth || '100'}" alt="Logo" />\n\n` : '';
      if (align === 'center' || align === 'right') {
        return `<div align="${align}">\n\n${logoTag}# ${text}\n\n> ${subtitle}\n\n</div>\n`;
      }
      return `${logoUrl ? `![Logo](${logoUrl})\n\n` : ''}# ${text}\n\n> ${subtitle}\n`;
    }

    case 'description': {
      return `## Description\n\n${content.text}\n`;
    }

    case 'installation': {
      const { prerequisites, commands } = content;
      let md = `## Installation\n\n`;
      if (prerequisites) {
        md += `### Prerequisites\n\n\`\`\`text\n${prerequisites}\n\`\`\`\n\n`;
      }
      if (commands) {
        md += `### Setup Instructions\n\n\`\`\`bash\n${commands}\n\`\`\`\n`;
      }
      return md;
    }

    case 'usage': {
      const { description, codeBlock, language } = content;
      let md = `## Usage\n\n`;
      if (description) {
        md += `${description}\n\n`;
      }
      if (codeBlock) {
        md += `\`\`\`${language || 'javascript'}\n${codeBlock}\n\`\`\`\n`;
      }
      return md;
    }

    case 'features': {
      const items = content.items || [];
      if (items.length === 0) return '';
      const list = items.map((item: string) => `- ${item}`).join('\n');
      return `## Features\n\n${list}\n`;
    }

    case 'tech-stack': {
      const badges = content.badges || [];
      if (badges.length === 0) return '';
      const badgeList = badges.map((b: any) => renderBadgeMarkdown(b)).join(' ');
      return `## Tech Stack\n\n${badgeList}\n`;
    }

    case 'screenshots': {
      const { images, style } = content;
      if (!images || images.length === 0) return '';
      let md = `## Screenshots\n\n`;

      if (style === 'grid' && images.length > 1) {
        md += `<table>\n  <tr>\n`;
        images.forEach((img: any) => {
          md += `    <td align="center" valign="top" width="${Math.floor(100 / images.length)}%">\n`;
          
          // Use HTML image tag if width/height are specified
          if (img.width || img.height) {
            const widthAttr = img.width ? `width="${img.width}"` : '';
            const heightAttr = img.height ? `height="${img.height}"` : '';
            md += `      <img src="${img.url}" alt="${img.alt || 'Screenshot'}" ${widthAttr} ${heightAttr} />\n`;
          } else {
            md += `      <img src="${img.url}" alt="${img.alt || 'Screenshot'}" />\n`;
          }
          
          if (img.caption) {
            md += `      <br />\n      <sub><b>${img.caption}</b></sub>\n`;
          }
          md += `    </td>\n`;
        });
        md += `  </tr>\n</table>\n`;
      } else {
        images.forEach((img: any) => {
          // Use HTML image tag if width/height are specified
          if (img.width || img.height) {
            const widthAttr = img.width ? `width="${img.width}"` : '';
            const heightAttr = img.height ? `height="${img.height}"` : '';
            md += `<img src="${img.url}" alt="${img.alt || 'Screenshot'}" ${widthAttr} ${heightAttr} />\n`;
          } else {
            md += `![${img.alt || 'Screenshot'}](${img.url})\n`;
          }
          
          if (img.caption) {
            md += `*${img.caption}*\n\n`;
          } else if (img.width || img.height) {
            md += `\n`;
          }
        });
      }
      return md;
    }

   case 'env-vars': {
    const vars = content.vars || [];
    if (vars.length === 0) return '';
    
    let md = `## Environment Variables\n\nTo run this project, you will need to add the following environment variables to your \`.env\` file:\n\n`;
    
    // Start HTML Table with explicit column widths and wrapping styles
    md += `<table style="width: 100%; table-layout: fixed; border-collapse: collapse;">\n`;
    md += `  <thead>\n`;
    md += `    <tr>\n`;
    md += `      <th style="width: 30%; text-align: left;">Variable</th>\n`;
    md += `      <th style="width: 50%; text-align: left;">Description</th>\n`;
    md += `      <th style="width: 20%; text-align: left;">Default</th>\n`;
    md += `    </tr>\n`;
    md += `  </thead>\n`;
    md += `  <tbody>\n`;
    
    vars.forEach((v: any) => {
      const defaultVal = v.defaultValue ? `<code>${v.defaultValue}</code>` : '—';
      
      md += `    <tr>\n`;
      md += `      <td style="word-break: break-all; vertical-align: top;"><code>${v.name}</code></td>\n`;
      md += `      <td style="word-wrap: break-word; white-space: normal; vertical-align: top;">${v.description}</td>\n`;
      md += `      <td style="word-break: break-all; vertical-align: top;">${defaultVal}</td>\n`;
      md += `    </tr>\n`;
    });
    
    md += `  </tbody>\n`;
    md += `</table>\n\n`;
    
    return md;
  }

    case 'api-setup': {
      const { endpoint, method, headers, body, response } = content;
      let md = `## API Reference\n\n`;
      md += `#### \`${method || 'GET'}\` \`${endpoint || '/'}\`\n\n`;
      if (headers) {
        md += `**Headers:**\n\`\`\`text\n${headers}\n\`\`\`\n\n`;
      }
      if (body) {
        md += `**Request Body:**\n\`\`\`json\n${body}\n\`\`\`\n\n`;
      }
      if (response) {
        md += `**Response:**\n\`\`\`json\n${response}\n\`\`\`\n`;
      }
      return md;
    }

    case 'folder-structure': {
      const { tree, explanation } = content;
      let md = `## Project Structure\n\n`;
      if (tree) {
        md += `\`\`\`text\n${tree}\n\`\`\`\n\n`;
      }
      if (explanation) {
        md += `${explanation}\n`;
      }
      return md;
    }

    case 'contributing': {
      return `## Contributing\n\n${content.text}\n`;
    }

    case 'license': {
      const { type, author, year } = content;
      return `## License\n\nDistributed under the **${type || 'MIT'}** License. See \`LICENSE\` for more information.\n\nCopyright (c) ${year || new Date().getFullYear()} ${author || ''}\n`;
    }

    case 'socials': {
      const items = content.items || [];
      if (items.length === 0) return '';
      const badgeList = items.map((s: any) => {
        const logoName = s.platform.toLowerCase().replace('/x', '').replace('website', 'link').split(' ')[0];
        return `[![${s.platform}](https://img.shields.io/badge/${encodeURIComponent(s.platform)}-${s.color || 'blue'}?style=for-the-badge&logo=${logoName}&logoColor=white)](${s.url})`;
      }).join(' ');
      return `## Contact\n\n${badgeList}\n`;
    }

    case 'faq': {
      const items = content.items || [];
      if (items.length === 0) return '';
      let md = `## FAQ\n\n`;
      items.forEach((item: any) => {
        md += `<details>\n  <summary><b>${item.question}</b></summary>\n  <p>${item.answer}</p>\n</details>\n\n`;
      });
      return md;
    }

    case 'roadmap': {
      const items = content.items || [];
      if (items.length === 0) return '';
      let md = `## Roadmap\n\n`;
      items.forEach((item: any) => {
        md += `- [${item.completed ? 'x' : ' '}] ${item.text}\n`;
      });
      return md;
    }

    case 'demo-links': {
      const items = content.items || [];
      if (items.length === 0) return '';
      let md = `## Demo & Deployments\n\n`;
      items.forEach((item: any) => {
        md += `- **[${item.label}](${item.url})**\n`;
      });
      return md;
    }

    case 'toc': {
      let md = `## Table of Contents\n\n`;
      // Find all sections below the table of contents and list their titles
      const index = allSections.findIndex(s => s.id === section.id);
      const remainingSections = allSections.slice(index + 1);

      remainingSections.forEach((s) => {
        if (s.visible && s.type !== 'title' && s.type !== 'toc') {
          // Normalize titles to standard slug link format
          const link = s.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
          md += `- [${s.title}](#${link})\n`;
        }
      });
      md += '\n';
      return md;
    }

    case 'custom-markdown': {
      return `${content.markdown}\n`;
    }

    default:
      return '';
  }
}

// Compiles the entire array of sections into a final markdown string
export function compileMarkdown(sections: READMESection[]): string {
  let markdown = '';

  sections.forEach((section) => {
    const compiled = compileSection(section, sections);
    if (compiled) {
      markdown += compiled + '\n';
    }
  });

  // Strip trailing whitespace
  markdown = markdown.trim() + '\n\n';

  // Embed Svelte visual states in a small, secure, base64 encoded HTML comment block
  const stateJson = JSON.stringify(sections.map(s => ({
    type: s.type,
    title: s.title,
    visible: s.visible,
    content: s.content
  })));
  const encodedState = safeBtoa(stateJson);

  markdown += `<!-- readme-builder-state: ${encodedState} -->\n`;

  return markdown;
}

// Parses raw markdown back into a Svelte state array (Bidirectional sync!)
export function parseMarkdown(markdown: string): READMESection[] {
  if (!markdown) return [];

  // 1. Try to find the embedded Base64 state comment
  const stateMatch = markdown.match(/<!--\s*readme-builder-state:\s*([A-Za-z0-9+/=]+)\s*-->/);
  if (stateMatch && stateMatch[1]) {
    const decoded = safeAtob(stateMatch[1]);
    if (decoded) {
      try {
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed)) {
          // Re-generate unique IDs for draggable items
          return parsed.map((item: any) => ({
            id: generateId(),
            type: item.type as SectionType,
            title: item.title || 'Untitled',
            visible: item.visible !== undefined ? item.visible : true,
            content: item.content
          }));
        }
      } catch (e) {
        console.error('Failed to parse embedded state JSON:', e);
      }
    }
  }

  // 2. Fallback: Parse section contents dynamically by header search (for direct manual edits)
  const sections: READMESection[] = [];
  const lines = markdown.split('\n');

  // Helper variables to track our header scanning
  let currentSection: READMESection | null = null;
  let sectionLines: string[] = [];

  const finalizeSection = () => {
    if (currentSection) {
      const contentText = sectionLines.join('\n').trim();
      processSectionContent(currentSection, contentText);
      sections.push(currentSection);
      currentSection = null;
      sectionLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for Main Title Header (level 1)
    const titleMatch = line.match(/^#\s+(.+)$/) || line.match(/<div align="center">\s*#\s+(.+)$/);
    // Check for Secondary Headers (level 2)
    const h2Match = line.match(/^##\s+(.+)$/);

    if (line.trim().startsWith('<!-- readme-builder-state:')) {
      // Reached the state block, skip parsing the rest
      break;
    }

    if (titleMatch) {
      finalizeSection();
      currentSection = createSection('title');
      currentSection.content.text = titleMatch[1].replace(/<\/div>/g, '').trim();
      // Scan for subtitle
      let sub = '';
      if (i + 2 < lines.length && lines[i + 2].trim().startsWith('>')) {
        sub = lines[i + 2].replace(/^>\s*/, '').trim();
      }
      currentSection.content.subtitle = sub;
      // Scan for logo inside div block
      let logoUrl = '';
      for (let j = Math.max(0, i - 4); j < i; j++) {
        const logoMatch = lines[j].match(/<img\s+src="([^"]+)"/);
        if (logoMatch) {
          logoUrl = logoMatch[1];
          break;
        }
      }
      currentSection.content.logoUrl = logoUrl;
    } else if (h2Match) {
      finalizeSection();
      const h2Text = h2Match[1].trim();
      const type = matchHeaderToType(h2Text);
      if (type) {
        currentSection = createSection(type);
        currentSection.title = h2Text;
      } else {
        currentSection = createSection('custom-markdown');
        currentSection.title = h2Text;
        sectionLines.push(line);
      }
    } else {
      if (currentSection) {
        sectionLines.push(line);
      }
    }
  }

  finalizeSection();

  // If no sections were parsed at all, insert a custom block with the raw text
  if (sections.length === 0) {
    const custom = createSection('custom-markdown');
    custom.content.markdown = markdown;
    sections.push(custom);
  }

  return sections;
}

// Maps Markdown heading strings to corresponding visual Svelte widget types
function matchHeaderToType(headerText: string): SectionType | null {
  const norm = headerText.toLowerCase();
  if (norm.includes('description') || norm.includes('about')) return 'description';
  if (norm.includes('installation') || norm.includes('setup') || norm.includes('getting started')) return 'installation';
  if (norm.includes('usage') || norm.includes('how to use')) return 'usage';
  if (norm.includes('features') || norm.includes('highlights')) return 'features';
  if (norm.includes('tech stack') || norm.includes('built with') || norm.includes('technologies')) return 'tech-stack';
  if (norm.includes('screenshot') || norm.includes('preview')) return 'screenshots';
  if (norm.includes('environment variable') || norm.includes('env')) return 'env-vars';
  if (norm.includes('api') || norm.includes('endpoint')) return 'api-setup';
  if (norm.includes('structure') || norm.includes('directory') || norm.includes('tree')) return 'folder-structure';
  if (norm.includes('contributing')) return 'contributing';
  if (norm.includes('license')) return 'license';
  if (norm.includes('contact') || norm.includes('author') || norm.includes('social')) return 'socials';
  if (norm.includes('faq') || norm.includes('question')) return 'faq';
  if (norm.includes('roadmap') || norm.includes('todo')) return 'roadmap';
  if (norm.includes('demo') || norm.includes('deployment')) return 'demo-links';
  if (norm.includes('table of contents') || norm.includes('index')) return 'toc';
  return null;
}

// Processes visual state attributes for each widget when reconstructing from manual text
function processSectionContent(section: READMESection, text: string) {
  const { type } = section;

  switch (type) {
    case 'description':
      section.content.text = text;
      break;

    case 'installation': {
      // Find prerequisites block
      const prereqMatch = text.match(/###\s*Prerequisites\s*```text\s*([\s\S]*?)\s*```/i);
      const commandsMatch = text.match(/###\s*(?:Setup Instructions|Commands)\s*```bash\s*([\s\S]*?)\s*```/i) || text.match(/```bash\s*([\s\S]*?)\s*```/i);
      section.content.prerequisites = prereqMatch ? prereqMatch[1].trim() : '';
      section.content.commands = commandsMatch ? commandsMatch[1].trim() : text;
      break;
    }

    case 'usage': {
      // Get code block
      const langMatch = text.match(/```([a-zA-Z0-9]+)/);
      const codeMatch = text.match(/```[a-zA-Z0-9]*\s*([\s\S]*?)\s*```/);
      const descText = text.replace(/```[\s\S]*?```/g, '').trim();

      section.content.description = descText;
      section.content.codeBlock = codeMatch ? codeMatch[1].trim() : '';
      section.content.language = langMatch ? langMatch[1] : 'javascript';
      break;
    }

    case 'features': {
      // Extract bullet points
      const bullets = text.match(/^-\s+(.+)$/gm) || text.match(/^\*\s+(.+)$/gm);
      if (bullets) {
        section.content.items = bullets.map(b => b.replace(/^-\s*/, '').replace(/^\*\s*/, '').trim());
      } else {
        section.content.items = text.split('\n').filter(l => l.trim().length > 0);
      }
      break;
    }

    case 'tech-stack': {
      // Parse badges (Extracting label, message, color, logo from shields.io URLs)
      const badgeRegex = /!\[([^\]]*)\]\(https:\/\/img\.shields\.io\/badge\/([^-]+)-([a-fA-F0-9]+)(?:\?[^)]*logo=([^&)]+))?[^)]*\)/g;
      const badges = [];
      let match;
      while ((match = badgeRegex.exec(text)) !== null) {
        badges.push({
          label: match[1] || decodeURIComponent(match[2]),
          message: decodeURIComponent(match[2]),
          color: match[3],
          logo: match[4] || ''
        });
      }
      if (badges.length > 0) {
        section.content.badges = badges;
      }
      break;
    }

    case 'screenshots': {
      // Extract markdown image tags
      const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\*([^*]+)\*)?/g;
      const images = [];
      let match;
      while ((match = imgRegex.exec(text)) !== null) {
        images.push({
          url: match[2],
          alt: match[1],
          caption: match[3] || ''
        });
      }
      // Check HTML table grids
      const srcRegex = /<img\s+src="([^"]+)"(?:\s+alt="([^"]+)")?/g;
      while ((match = srcRegex.exec(text)) !== null) {
        images.push({
          url: match[1],
          alt: match[2] || 'Screenshot',
          caption: ''
        });
      }

      if (images.length > 0) {
        section.content.images = images;
      }
      break;
    }

    case 'env-vars': {
      // Parse markdown table rows
      const rows = text.split('\n').filter(l => l.includes('|'));
      const vars = [];
      for (let i = 2; i < rows.length; i++) { // Skip header and separator
        const cols = rows[i].split('|').map(c => c.trim()).filter(c => c !== '');
        if (cols.length >= 2) {
          vars.push({
            name: cols[0].replace(/`/g, ''),
            description: cols[1],
            defaultValue: cols[2] ? cols[2].replace(/`/g, '') : ''
          });
        }
      }
      if (vars.length > 0) {
        section.content.vars = vars;
      }
      break;
    }

    case 'api-setup': {
      const endpointMatch = text.match(/####\s*`([A-Z]+)`\s*`([^`]+)`/);
      const headersMatch = text.match(/\*\*Headers:\*\*\s*```text\s*([\s\S]*?)\s*```/i);
      const bodyMatch = text.match(/\*\*Request Body:\*\*\s*```json\s*([\s\S]*?)\s*```/i);
      const responseMatch = text.match(/\*\*Response:\*\*\s*```json\s*([\s\S]*?)\s*```/i);

      if (endpointMatch) {
        section.content.method = endpointMatch[1];
        section.content.endpoint = endpointMatch[2];
      }
      section.content.headers = headersMatch ? headersMatch[1].trim() : '';
      section.content.body = bodyMatch ? bodyMatch[1].trim() : '';
      section.content.response = responseMatch ? responseMatch[1].trim() : '';
      break;
    }

    case 'folder-structure': {
      const treeMatch = text.match(/```text\s*([\s\S]*?)\s*```/);
      const explanationText = text.replace(/```[\s\S]*?```/g, '').trim();
      section.content.tree = treeMatch ? treeMatch[1].trim() : '';
      section.content.explanation = explanationText;
      break;
    }

    case 'license': {
      const typeMatch = text.match(/Distributed under the\s*\*\*([^*]+)\*\*/i);
      const copyrightMatch = text.match(/Copyright \(c\)\s*(\d{4})\s*(.+)/i);
      if (typeMatch) section.content.type = typeMatch[1].trim();
      if (copyrightMatch) {
        section.content.year = copyrightMatch[1];
        section.content.author = copyrightMatch[2].trim();
      }
      break;
    }

    case 'faq': {
      // Parse <details> blocks
      const detailsRegex = /<details>[\s\S]*?<summary><b>([^<]+)<\/b><\/summary>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/details>/g;
      const items = [];
      let match;
      while ((match = detailsRegex.exec(text)) !== null) {
        items.push({
          question: match[1].trim(),
          answer: match[2].trim()
        });
      }
      if (items.length > 0) {
        section.content.items = items;
      }
      break;
    }

    case 'roadmap': {
      // Parse checkbox checklist items
      const itemsRegex = /^-\s+\[([ xX])\]\s+(.+)$/gm;
      const items = [];
      let match;
      while ((match = itemsRegex.exec(text)) !== null) {
        items.push({
          text: match[2].trim(),
          completed: match[1].toLowerCase() === 'x'
        });
      }
      if (items.length > 0) {
        section.content.items = items;
      }
      break;
    }

    case 'demo-links': {
      // Parse markdown links
      const linkRegex = /^-\s+\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/gm;
      const items = [];
      let match;
      while ((match = linkRegex.exec(text)) !== null) {
        items.push({
          label: match[1].trim(),
          url: match[2].trim()
        });
      }
      if (items.length > 0) {
        section.content.items = items;
      }
      break;
    }

    case 'custom-markdown':
      section.content.markdown = text;
      break;

    default:
      break;
  }
}
