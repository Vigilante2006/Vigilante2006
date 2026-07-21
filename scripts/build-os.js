const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

// Configure these variables
const GITHUB_USERNAME = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : 'Vigilante2006';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const API_URL = 'https://api.github.com/graphql';

const REPO_QUERY = `
{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
}`;

async function run() {
  console.log('Starting Developer OS Auto-Configuration...');

  if (!GITHUB_TOKEN) {
    console.warn('⚠️ No GITHUB_TOKEN found. Skipping dynamic fetch and using placeholders.');
    // In a real run without token, you could exit or use mock data.
    return;
  }

  try {
    // 1. Fetch data from GitHub GraphQL API
    const response = await axios.post(
      API_URL,
      { query: REPO_QUERY },
      {
        headers: {
          Authorization: `bearer ${GITHUB_TOKEN}`,
        },
      }
    );

    const repos = response.data.data.user.pinnedItems.nodes;

    // 2. Generate Projects Markdown
    let projectsMd = `# SYSTEM DATABASE: ACTIVE MISSIONS (REPOSITORIES)\n\n`;
    projectsMd += `\`\`\`json\n{\n  "status": "AUTO-SYNC",\n  "records": ${repos.length}\n}\n\`\`\`\n\n`;

    let readmeProjectsHtml = '';

    repos.forEach(repo => {
      projectsMd += `## [ACTIVE] ${repo.name}\n`;
      projectsMd += `* **URL:** ${repo.url}\n`;
      projectsMd += `* **STARS:** ⭐ ${repo.stargazerCount}\n`;
      projectsMd += `* **LANG:** ${repo.primaryLanguage ? repo.primaryLanguage.name : 'N/A'}\n`;
      projectsMd += `* **DESC:** ${repo.description || 'No description provided.'}\n\n`;

      readmeProjectsHtml += `  | \`${repo.name}\` | **${repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown'}** | ⭐ ${repo.stargazerCount} | [View Repository](${repo.url}) |\n`;
    });

    // 3. Write to database/projects.md
    const projectsPath = path.join(__dirname, '../database/projects.md');
    await fs.writeFile(projectsPath, projectsMd);
    console.log('✅ Updated database/projects.md');

    // 4. Inject into README.md
    const readmePath = path.join(__dirname, '../README.md');
    let readmeContent = await fs.readFile(readmePath, 'utf8');

    const startTag = '<!-- OS_PROJECTS_START -->';
    const endTag = '<!-- OS_PROJECTS_END -->';

    const startIndex = readmeContent.indexOf(startTag);
    const endIndex = readmeContent.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1) {
      const before = readmeContent.substring(0, startIndex + startTag.length);
      const after = readmeContent.substring(endIndex);
      
      const newTable = `\n  | REPOSITORY | CORE_TECH | STATUS | LINK |\n  |---|---|---|---|\n${readmeProjectsHtml}`;
      
      readmeContent = before + newTable + after;
      await fs.writeFile(readmePath, readmeContent);
      console.log('✅ Injected repositories into README.md');
    }

    console.log('Developer OS Build Complete!');
  } catch (error) {
    console.error('❌ Error building Developer OS:', error.message);
    if (error.response) {
      console.error(error.response.data);
    }
  }
}

run();
