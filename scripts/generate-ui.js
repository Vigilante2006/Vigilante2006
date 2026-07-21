const fs = require('fs');
const path = require('path');

const USERNAME = 'Vigilante 2006';

const COLORS = {
  glassBg: 'rgba(25, 30, 40, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.6)',
  glassInner: 'rgba(255, 255, 255, 0.1)',
  goldMain: '#F4D03F',
  goldGlow: '#F39C12',
  textMain: '#FFFFFF',
  textMuted: '#BFC9CA',
  barBg: 'rgba(255, 255, 255, 0.15)',
  barFill: 'rgba(255, 255, 255, 0.8)'
};

const MASTER_W = 800;
const MASTER_H = 550;

function createCornerFlourish(x, y, rotate) {
  return `
    <g transform="translate(${x}, ${y}) rotate(${rotate})">
      <path d="M 0 30 L 0 0 L 30 0" class="stroke-white stroke-w-2 filter-glow" fill="none"/>
      <polygon points="0,0 8,8 16,0 8,-8" class="fill-white filter-glow" transform="translate(6, 6) scale(0.6) rotate(45)"/>
      <path d="M 8 35 Q 15 15 35 8" class="stroke-white stroke-w-1" fill="none" opacity="0.6"/>
      <circle cx="3" cy="45" r="1.5" class="fill-white" opacity="0.6"/>
      <circle cx="45" cy="3" r="1.5" class="fill-white" opacity="0.6"/>
    </g>
  `;
}

function createOrnateLine(x, y, width) {
  const center = width / 2;
  return `
    <g transform="translate(${x}, ${y})">
      <line x1="0" y1="0" x2="${center - 20}" y2="0" class="stroke-white stroke-w-1" opacity="0.4"/>
      <polygon points="${center}, -4 ${center+8}, 0 ${center}, 4 ${center-8}, 0" class="fill-gold filter-glow" opacity="0.8"/>
      <circle cx="${center-15}" cy="0" r="1.5" class="fill-gold" opacity="0.6"/>
      <circle cx="${center+15}" cy="0" r="1.5" class="fill-gold" opacity="0.6"/>
      <line x1="${center + 20}" y1="0" x2="${width}" y2="0" class="stroke-white stroke-w-1" opacity="0.4"/>
    </g>
  `;
}

function createTabularRow(x, y, label, value, valColor = 'text-main', delay = 0) {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="-14" width="310" height="20" class="fill-glass" opacity="0.05">
        <animate attributeName="opacity" values="0.05;0.1;0.05" dur="3s" begin="${delay}s" repeatCount="indefinite"/>
      </rect>
      <line x1="0" y1="6" x2="310" y2="6" class="stroke-white stroke-w-1" opacity="0.1"/>
      
      <text x="5" y="0" class="font-sans text-muted" font-size="12">${label}</text>
      <text x="305" y="0" class="font-sans ${valColor}" font-size="13" text-anchor="end">${value}</text>
    </g>
  `;
}

function createSkillRow(x, y, label, level, percentage, delay = 0) {
  return `
    <g transform="translate(${x}, ${y})">
      <text x="5" y="0" class="font-sans text-main" font-size="12">${label}</text>
      <text x="115" y="0" class="font-sans text-muted" font-size="11" text-anchor="end">Lv.${level}</text>
      
      <rect x="125" y="-6" width="180" height="6" class="fill-bar-bg" rx="3"/>
      <rect x="125" y="-6" width="${1.8 * percentage}" height="6" class="fill-bar filter-glow" rx="3">
        <animate attributeName="width" values="0;${1.8 * percentage}" dur="${2 + delay}s" fill="freeze"/>
      </rect>
    </g>
  `;
}

const masterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MASTER_W} ${MASTER_H}" width="${MASTER_W}" height="${MASTER_H}">
  <defs>
    <style>
      :root {
        --glass-bg: ${COLORS.glassBg};
        --glass-border: ${COLORS.glassBorder};
        --gold-main: ${COLORS.goldMain};
        --gold-glow: ${COLORS.goldGlow};
        --text-main: ${COLORS.textMain};
        --text-muted: ${COLORS.textMuted};
      }
      
      .fill-glass { fill: var(--glass-border); }
      .fill-gold { fill: var(--gold-main); }
      .fill-white { fill: #FFFFFF; }
      .fill-bar-bg { fill: ${COLORS.barBg}; }
      .fill-bar { fill: ${COLORS.barFill}; }

      .stroke-white { stroke: #FFFFFF; }
      .stroke-gold { stroke: var(--gold-main); }
      .stroke-w-1 { stroke-width: 1; }
      .stroke-w-2 { stroke-width: 2; }
      .stroke-w-3 { stroke-width: 3; }

      .text-main { fill: var(--text-main); }
      .text-muted { fill: var(--text-muted); }
      .text-gold { fill: var(--gold-main); }

      .font-serif { font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif; }
      .font-sans { font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; }
      
      .font-bold { font-weight: bold; }
      .font-italic { font-style: italic; }

      .filter-glow { filter: url(#glow); }
      .filter-gold-glow { filter: url(#goldGlow); }
    </style>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="goldGlow">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComponentTransfer in="blur" result="glow">
        <feFuncR type="linear" slope="1.5"/>
        <feFuncG type="linear" slope="1.2"/>
        <feFuncB type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 40, 50, 0.85)"/>
      <stop offset="100%" stop-color="rgba(15, 20, 25, 0.95)"/>
    </linearGradient>
  </defs>

  <rect width="${MASTER_W}" height="${MASTER_H}" fill="transparent"/>

  <g transform="translate(30, 30)">
    
    <rect x="0" y="0" width="740" height="490" rx="15" fill="none" class="stroke-white filter-glow" stroke-width="4" opacity="0.2"/>
    <rect x="0" y="0" width="740" height="490" rx="15" fill="url(#glassGrad)"/>
    
    <rect x="8" y="8" width="724" height="474" rx="10" class="stroke-white" fill="none" stroke-width="1.5" opacity="0.7"/>
    <rect x="12" y="12" width="716" height="466" rx="8" class="stroke-white" fill="none" stroke-width="0.5" opacity="0.3"/>

    ${createCornerFlourish(10, 10, 0)}
    ${createCornerFlourish(730, 10, 90)}
    ${createCornerFlourish(730, 480, 180)}
    ${createCornerFlourish(10, 480, 270)}

    <g transform="translate(370, 60)">
      <text x="0" y="0" class="font-serif text-gold filter-gold-glow font-bold" font-size="38" letter-spacing="4" text-anchor="middle">
        ${USERNAME}
        <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite"/>
      </text>
      
      <text x="0" y="25" class="font-serif text-white font-italic" font-size="14" letter-spacing="2" text-anchor="middle" opacity="0.8">
        CLASS: AI SYSTEMS ENGINEER
      </text>
    </g>

    ${createOrnateLine(120, 110, 500)}

    <g transform="translate(40, 140)">
      <rect x="0" y="0" width="310" height="150" class="stroke-white" fill="none" stroke-width="1" opacity="0.3" rx="4"/>
      <rect x="0" y="0" width="310" height="25" class="fill-glass" opacity="0.1" rx="4"/>
      <text x="155" y="17" class="font-sans text-gold font-bold" font-size="11" letter-spacing="2" text-anchor="middle">CHARACTER ATTRIBUTES</text>
      
      ${createTabularRow(0, 45, 'HP (Total Contributions)', '1,402', 'text-main', 0.1)}
      ${createTabularRow(0, 70, 'MP (Current Streak)', '42 DAYS', 'text-gold font-bold', 0.2)}
      ${createTabularRow(0, 95, 'RANK TIER', 'S+', 'text-gold font-bold filter-gold-glow', 0.3)}
      ${createTabularRow(0, 120, 'EXP TO NEXT LEVEL', '12,450 / 20K', 'text-muted', 0.4)}
    </g>

    <g transform="translate(390, 140)">
      <rect x="0" y="0" width="310" height="150" class="stroke-white" fill="none" stroke-width="1" opacity="0.3" rx="4"/>
      <rect x="0" y="0" width="310" height="25" class="fill-glass" opacity="0.1" rx="4"/>
      <text x="155" y="17" class="font-sans text-gold font-bold" font-size="11" letter-spacing="2" text-anchor="middle">MAGIC / SKILLS</text>
      
      ${createSkillRow(5, 45, 'TypeScript / JavaScript', '8', 95, 0.1)}
      ${createSkillRow(5, 65, 'Python (AI/ML)', '7', 85, 0.2)}
      ${createSkillRow(5, 85, 'React / Next.js', '9', 98, 0.3)}
      ${createSkillRow(5, 105, 'Node.js / API', '8', 90, 0.4)}
      ${createSkillRow(5, 125, 'Docker / AWS', '6', 70, 0.5)}
    </g>

    <g transform="translate(40, 320)">
      <rect x="0" y="0" width="660" height="120" class="stroke-white" fill="none" stroke-width="1" opacity="0.3" rx="4"/>
      <rect x="0" y="0" width="660" height="25" class="fill-glass" opacity="0.1" rx="4"/>
      <text x="330" y="17" class="font-sans text-gold font-bold" font-size="11" letter-spacing="2" text-anchor="middle">ACTIVE QUESTS</text>

      <g transform="translate(20, 55)">
        <circle cx="5" cy="-4" r="3" class="fill-gold filter-glow"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle>
        <text x="20" y="0" class="font-sans text-main font-bold" font-size="14">Main Quest: Developer OS Platform</text>
        <text x="640" y="0" class="font-sans text-gold" font-size="12" text-anchor="end">COMPLETE</text>
        <rect x="20" y="10" width="620" height="4" class="fill-bar-bg" rx="2"/>
        <rect x="20" y="10" width="620" height="4" class="fill-bar filter-glow" rx="2"/>
      </g>
      
      <g transform="translate(20, 95)">
        <circle cx="5" cy="-4" r="3" class="fill-white" opacity="0.5"/>
        <text x="20" y="0" class="font-sans text-muted" font-size="14">Side Quest: Neural Autonomous Agent</text>
        <text x="640" y="0" class="font-sans text-main" font-size="12" text-anchor="end">IN PROGRESS (60%)</text>
        <rect x="20" y="10" width="620" height="4" class="fill-bar-bg" rx="2"/>
        <rect x="20" y="10" width="372" height="4" class="fill-bar filter-glow" rx="2">
           <animate attributeName="width" values="0;372" dur="3s" fill="freeze"/>
        </rect>
      </g>
    </g>

    ${createOrnateLine(120, 465, 500)}

  </g>
</svg>
`;

const outPath = path.join(__dirname, '..', 'svg', 'master-dashboard.svg');
fs.writeFileSync(outPath, masterSvg);
console.log('✅ Generated FANTASY RPG GLASS UI master-dashboard.svg');
