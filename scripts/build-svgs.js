const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '../svg');
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

// Global Definitions
const DEFS = `
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=Inter:wght@400;500;700&amp;display=swap');
      
      .bg { fill: #080B12; }
      .surface { fill: #10141D; }
      .card { fill: #171C28; }
      .border-line { stroke: #2A3242; }
      
      .text-title { font-family: 'Space Grotesk', sans-serif; fill: #F8FAFC; }
      .text-body { font-family: 'Inter', sans-serif; fill: #CBD5E1; }
      .text-accent { fill: #EF4444; }
      .text-secondary { fill: #14B8A6; }
      
      .glow-red { filter: url(#glowRed); }
      .glow-teal { filter: url(#glowTeal); }
      .glass { filter: url(#glassFilter); }
      
      .hover-lift { transition: transform 0.3s ease; }
      .hover-lift:hover { transform: translateY(-5px); }
    </style>
    
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="glassFilter" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" result="alpha"/>
      <feComposite in="SourceGraphic" in2="alpha" operator="over"/>
    </filter>

    <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="1"/>
      <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e2433" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#171c28" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
`;

const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="450">
  ${DEFS}
  <!-- Background -->
  <rect width="1200" height="450" rx="20" class="surface border-line" stroke-width="2"/>
  
  <!-- Red Moon -->
  <circle cx="600" cy="200" r="100" fill="url(#moonGrad)" class="glow-red">
    <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
  </circle>

  <!-- Clouds / Mist (Simple paths) -->
  <path d="M400 250 Q 500 230 600 260 T 800 250" fill="none" stroke="#2A3242" stroke-width="4" opacity="0.6">
    <animate attributeName="d" values="M400 250 Q 500 230 600 260 T 800 250; M400 260 Q 500 240 600 270 T 800 260; M400 250 Q 500 230 600 260 T 800 250" dur="8s" repeatCount="indefinite"/>
  </path>
  <path d="M350 280 Q 450 260 550 290 T 850 270" fill="none" stroke="#2A3242" stroke-width="8" opacity="0.4">
    <animate attributeName="d" values="M350 280 Q 450 260 550 290 T 850 270; M350 290 Q 450 270 550 300 T 850 280; M350 280 Q 450 260 550 290 T 850 270" dur="10s" repeatCount="indefinite"/>
  </path>

  <!-- Sword Silhouette -->
  <path d="M595 100 L 605 100 L 602 320 L 598 320 Z" fill="#F8FAFC" class="glow-teal" opacity="0.9"/>
  <rect x="585" y="300" width="30" height="10" fill="#EF4444" rx="2"/>
  <rect x="592" y="310" width="16" height="50" fill="#171C28" stroke="#EF4444" stroke-width="2" rx="2"/>

  <!-- Left Content -->
  <g transform="translate(60, 160)">
    <text y="0" class="text-title" font-size="48" font-weight="700">Vigilante2006</text>
    <text y="35" class="text-body text-secondary" font-size="20" font-weight="500">FULL STACK DEVELOPER</text>
    <text y="75" class="text-body" font-size="16" opacity="0.8">Building clean, premium web</text>
    <text y="100" class="text-body" font-size="16" opacity="0.8">experiences &amp; glassmorphism UIs.</text>
    
    <!-- CTA Button -->
    <g transform="translate(0, 140)" class="hover-lift">
      <rect width="160" height="48" rx="8" fill="#EF4444" class="glow-red"/>
      <text x="80" y="30" class="text-title" fill="#FFFFFF" font-size="16" font-weight="600" text-anchor="middle">View Missions</text>
    </g>
  </g>

  <!-- Right Content (Status Cards) -->
  <g transform="translate(850, 150)">
    <!-- System Status -->
    <g transform="translate(0, 0)">
      <rect width="280" height="50" rx="12" fill="url(#cardGrad)" class="border-line" stroke-width="1.5"/>
      <circle cx="25" cy="25" r="5" fill="#22C55E" class="glow-teal"/>
      <text x="45" y="31" class="text-title" font-size="14" font-weight="600">SYSTEM ONLINE</text>
    </g>
    <!-- Base -->
    <g transform="translate(0, 65)">
      <rect width="280" height="50" rx="12" fill="url(#cardGrad)" class="border-line" stroke-width="1.5"/>
      <circle cx="25" cy="25" r="5" fill="#EF4444"/>
      <text x="45" y="31" class="text-title" font-size="14" font-weight="600">BASE: UNNAO, INDIA</text>
    </g>
    <!-- Rank -->
    <g transform="translate(0, 130)">
      <rect width="280" height="50" rx="12" fill="url(#cardGrad)" class="border-line" stroke-width="1.5"/>
      <circle cx="25" cy="25" r="5" fill="#F59E0B"/>
      <text x="45" y="31" class="text-title" font-size="14" font-weight="600">RANK: S-CLASS DEV</text>
    </g>
  </g>
</svg>`;

const statsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="100%" height="400">
  ${DEFS}
  
  <text x="600" y="60" class="text-title" font-size="32" font-weight="700" text-anchor="middle">CORPS RECORD</text>
  <path d="M 500 85 L 700 85" stroke="#EF4444" stroke-width="3" opacity="0.8"/>
  <circle cx="600" cy="85" r="5" fill="#EF4444" class="glow-red"/>

  <!-- Grid of 4 Cards -->
  <g transform="translate(100, 140)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)" class="hover-lift">
      <rect width="220" height="180" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="2"/>
      <text x="110" y="50" class="text-body text-secondary" font-size="14" font-weight="600" text-anchor="middle">TOTAL REPOSITORIES</text>
      <text x="110" y="110" class="text-title" font-size="48" font-weight="700" text-anchor="middle">21</text>
      <rect x="85" y="140" width="50" height="4" rx="2" fill="#14B8A6"/>
    </g>
    
    <!-- Card 2 -->
    <g transform="translate(260, 0)" class="hover-lift">
      <rect width="220" height="180" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="2"/>
      <text x="110" y="50" class="text-body text-secondary" font-size="14" font-weight="600" text-anchor="middle">CONTRIBUTIONS</text>
      <text x="110" y="110" class="text-title" font-size="48" font-weight="700" text-anchor="middle">1.2K</text>
      <rect x="85" y="140" width="50" height="4" rx="2" fill="#14B8A6"/>
    </g>

    <!-- Card 3 -->
    <g transform="translate(520, 0)" class="hover-lift">
      <rect width="220" height="180" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="2"/>
      <text x="110" y="50" class="text-body text-accent" font-size="14" font-weight="600" text-anchor="middle">CURRENT STREAK</text>
      <text x="110" y="110" class="text-title" font-size="48" font-weight="700" text-anchor="middle" class="glow-red">14</text>
      <rect x="85" y="140" width="50" height="4" rx="2" fill="#EF4444"/>
    </g>

    <!-- Card 4 -->
    <g transform="translate(780, 0)" class="hover-lift">
      <rect width="220" height="180" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="2"/>
      <text x="110" y="50" class="text-body text-accent" font-size="14" font-weight="600" text-anchor="middle">FOLLOWERS</text>
      <text x="110" y="110" class="text-title" font-size="48" font-weight="700" text-anchor="middle">7</text>
      <rect x="85" y="140" width="50" height="4" rx="2" fill="#EF4444"/>
    </g>
  </g>
</svg>`;

const skillsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="100%" height="600">
  ${DEFS}
  
  <text x="600" y="60" class="text-title" font-size="32" font-weight="700" text-anchor="middle">BREATHING STYLES</text>
  <path d="M 500 85 L 700 85" stroke="#14B8A6" stroke-width="3" opacity="0.8"/>
  <circle cx="600" cy="85" r="5" fill="#14B8A6" class="glow-teal"/>

  <!-- Skills Columns -->
  <g transform="translate(100, 150)">
    
    <!-- Water Breathing -->
    <g transform="translate(0, 0)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#38BDF8" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">🌊</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Water Breathing (Frontend)</text>
      <text x="80" y="60" class="text-body" font-size="14">React, HTML, CSS, Tailwind</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="100" height="6" rx="3" fill="#38BDF8"/>
    </g>

    <!-- Flame Breathing -->
    <g transform="translate(550, 0)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#EF4444" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">🔥</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Flame Breathing (Backend)</text>
      <text x="80" y="60" class="text-body" font-size="14">Node.js, Express, PHP</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="85" height="6" rx="3" fill="#EF4444"/>
    </g>

    <!-- Thunder Breathing -->
    <g transform="translate(0, 110)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#F59E0B" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">⚡</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Thunder Breathing (Performance)</text>
      <text x="80" y="60" class="text-body" font-size="14">Vite, Webpack</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="90" height="6" rx="3" fill="#F59E0B"/>
    </g>

    <!-- Mist Breathing -->
    <g transform="translate(550, 110)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#94A3B8" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">🌫️</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Mist Breathing (Cloud)</text>
      <text x="80" y="60" class="text-body" font-size="14">Vercel, Netlify, AWS</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="70" height="6" rx="3" fill="#94A3B8"/>
    </g>

    <!-- Stone Breathing -->
    <g transform="translate(0, 220)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#64748B" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">🪨</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Stone Breathing (Architecture)</text>
      <text x="80" y="60" class="text-body" font-size="14">MongoDB, PostgreSQL</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="60" height="6" rx="3" fill="#64748B"/>
    </g>

    <!-- Wind Breathing -->
    <g transform="translate(550, 220)" class="hover-lift">
      <rect width="450" height="80" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="20" fill="#10141D" stroke="#10B981" stroke-width="2"/>
      <text x="40" y="45" font-size="20" text-anchor="middle">🌪️</text>
      <text x="80" y="35" class="text-title" font-size="16" font-weight="600">Wind Breathing (DevOps)</text>
      <text x="80" y="60" class="text-body" font-size="14">Docker, Git, GitHub Actions</text>
      <rect x="300" y="38" width="120" height="6" rx="3" fill="#10141D"/>
      <rect x="300" y="38" width="75" height="6" rx="3" fill="#10B981"/>
    </g>

  </g>
</svg>`;

const missionsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="450">
  ${DEFS}
  
  <text x="600" y="60" class="text-title" font-size="32" font-weight="700" text-anchor="middle">MISSION SCROLLS</text>
  <path d="M 500 85 L 700 85" stroke="#F59E0B" stroke-width="3" opacity="0.8"/>
  <circle cx="600" cy="85" r="5" fill="#F59E0B" class="glow-red"/>

  <g transform="translate(100, 140)">
    
    <!-- Repo 1 -->
    <a href="https://github.com/Vigilante2006/spotifyGlassCard" target="_blank">
      <g transform="translate(0, 0)" class="hover-lift">
        <rect width="480" height="120" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
        <text x="30" y="40" class="text-title" font-size="20" font-weight="700" fill="#FFFFFF">🎵 spotifyGlassCard</text>
        <text x="30" y="75" class="text-body" font-size="14">Glassmorphism Spotify-style card UI.</text>
        <text x="30" y="100" class="text-body" font-size="14">A premium frontend component.</text>
        <rect x="420" y="25" width="40" height="20" rx="10" fill="#10141D" stroke="#14B8A6"/>
        <text x="440" y="39" class="text-title" font-size="10" fill="#14B8A6" text-anchor="middle">JS</text>
      </g>
    </a>

    <!-- Repo 2 -->
    <a href="https://github.com/Vigilante2006/kalyanam.github.io" target="_blank">
      <g transform="translate(520, 0)" class="hover-lift">
        <rect width="480" height="120" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
        <text x="30" y="40" class="text-title" font-size="20" font-weight="700" fill="#FFFFFF">💒 kalyanam.github.io</text>
        <text x="30" y="75" class="text-body" font-size="14">Elegant event-themed web page.</text>
        <text x="30" y="100" class="text-body" font-size="14">Refined typography and responsive layout.</text>
        <rect x="420" y="25" width="40" height="20" rx="10" fill="#10141D" stroke="#38BDF8"/>
        <text x="440" y="39" class="text-title" font-size="10" fill="#38BDF8" text-anchor="middle">CSS</text>
      </g>
    </a>

    <!-- Repo 3 -->
    <a href="https://github.com/Vigilante2006/netflixClone.github.io" target="_blank">
      <g transform="translate(0, 150)" class="hover-lift">
        <rect width="480" height="120" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
        <text x="30" y="40" class="text-title" font-size="20" font-weight="700" fill="#FFFFFF">🎬 netflixClone</text>
        <text x="30" y="75" class="text-body" font-size="14">Netflix-style landing page clone.</text>
        <text x="30" y="100" class="text-body" font-size="14">Cinematic dark UI and responsive grids.</text>
        <rect x="420" y="25" width="40" height="20" rx="10" fill="#10141D" stroke="#38BDF8"/>
        <text x="440" y="39" class="text-title" font-size="10" fill="#38BDF8" text-anchor="middle">CSS</text>
      </g>
    </a>

    <!-- Repo 4 -->
    <a href="https://github.com/Vigilante2006/FormWithLocalStorage" target="_blank">
      <g transform="translate(520, 150)" class="hover-lift">
        <rect width="480" height="120" rx="16" fill="url(#cardGrad)" stroke="#2A3242" stroke-width="1.5"/>
        <text x="30" y="40" class="text-title" font-size="20" font-weight="700" fill="#FFFFFF">📝 FormWithLocalStorage</text>
        <text x="30" y="75" class="text-body" font-size="14">Interactive form with local persistence.</text>
        <text x="30" y="100" class="text-body" font-size="14">Practical JavaScript data handling.</text>
        <rect x="420" y="25" width="40" height="20" rx="10" fill="#10141D" stroke="#14B8A6"/>
        <text x="440" y="39" class="text-title" font-size="10" fill="#14B8A6" text-anchor="middle">JS</text>
      </g>
    </a>

  </g>
</svg>`;

fs.writeFileSync(path.join(svgDir, 'ds-hero.svg'), heroSvg);
fs.writeFileSync(path.join(svgDir, 'ds-stats-glass.svg'), statsSvg);
fs.writeFileSync(path.join(svgDir, 'ds-breathing-skills.svg'), skillsSvg);
fs.writeFileSync(path.join(svgDir, 'ds-missions.svg'), missionsSvg);

console.log('SVGs generated successfully.');
