window.SonicExamples = (() => {
  const examples = [
    { image: 'mod1.png', name: 'Телега', date: '27.02.2025', client: 'Irma', game: 'Sonic R' },
    { image: 'mod2.png', name: 'Aubie X', date: '16.02.2025', client: 'Sparkos', game: 'Sonic R', links: [['Скачать', 'https://t.me/SparkosTWolf/375']] },
    { image: 'mod3.png', name: 'Wonder The Wolf', date: 'cancelled', client: 'Wonder', game: 'Sonic Battle' },
    { image: 'mod4.png', name: 'Wonder The Wolf', date: '23.09.2023', client: 'Wonder', game: "Garry's Mod" },
    { image: 'mod5.png', name: 'Wonder The Wolf', date: '03.08.2023', client: 'Wonder', game: 'Sonic Adventure DX' },
    { image: 'mod6.png', name: 'Aubie X', date: 'cancelled', client: 'Sparkos', game: 'Sonic Generations' },
    { image: 'mod7.png', name: 'Sparkos The Wolf', date: '09.07.2023', client: 'Sparkos', game: 'Sonic Generations', links: [['Скачать', 'https://gamebanana.com/mods/453872']] },
    { image: 'mod8.png', name: 'Wonder The Wolf', date: '09.07.2023', client: 'Wonder', game: 'Sonic Generations', links: [['Скачать', 'https://gamebanana.com/mods/453723']] },
    { image: 'mod9.png', name: 'Sparkos (Modern Sonic) | Wonder (Avatar)', date: '09.07.2023', client: 'Sparkos | Wonder', game: 'Sonic Forces', links: [['Sparkos', 'https://gamebanana.com/mods/455684'], ['Wonder', 'https://gamebanana.com/mods/454817']] },
    { image: 'mod10.png', name: 'Sparkos The Wolf', date: '09.07.2023', client: 'Sparkos', game: 'Sonic Frontiers', links: [['Скачать', 'https://gamebanana.com/mods/455688']] },
    { image: 'mod11.png', name: 'Wonder The Wolf', date: '09.07.2023', client: 'Wonder', game: 'Sonic Frontiers', links: [['Скачать', 'https://gamebanana.com/mods/455686']] },
    { image: 'mod12.png', name: 'Fairon', date: '11.10.2026', client: 'Fairon', game: 'Sonic Racing Crossworlds' }
  ];

  function render() {
    const container = document.getElementById('examples-grid');
    container.replaceChildren();

    examples.forEach(example => {
      const card = document.createElement('article');
      card.className = 'example-card';
      card.tabIndex = 0;
      card.setAttribute('aria-label', example.name);

      const image = document.createElement('img');
      image.src = `assets/mods/${example.image}`;
      image.alt = example.name;
      image.loading = 'lazy';
      card.appendChild(image);

      if (isNewExample(example.date)) {
        const badge = document.createElement('span');
        badge.className = 'new-badge';
        badge.textContent = SonicI18n.t('examples.new');
        card.appendChild(badge);
      }

      const info = document.createElement('div');
      info.className = 'mod-info';
      const title = document.createElement('h3');
      title.textContent = example.name;
      info.appendChild(title);

      appendDetail(info, SonicI18n.t('examples.date'), example.date === 'cancelled'
        ? SonicI18n.t('examples.cancelled')
        : example.date);

      const links = document.createElement('p');
      const linkLabel = document.createElement('strong');
      linkLabel.textContent = `${SonicI18n.t('examples.download')}: `;
      links.appendChild(linkLabel);
      if (example.links?.length) {
        example.links.forEach(([label, url], index) => {
          if (index) links.append(' | ');
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.textContent = label === 'Скачать' ? SonicI18n.t('examples.download') : label;
          links.appendChild(anchor);
        });
      } else {
        links.append(SonicI18n.t('examples.unavailable'));
      }
      info.appendChild(links);
      appendDetail(info, SonicI18n.t('examples.client'), example.client);

      const game = document.createElement('p');
      const gameLabel = document.createElement('strong');
      gameLabel.textContent = `${SonicI18n.t('examples.game')}: `;
      game.append(gameLabel, example.game);
      const logoFile = gameLogos[example.game];
      if (logoFile) {
        const logo = document.createElement('img');
        logo.className = 'game-logo';
        logo.src = `assets/games/${logoFile}`;
        logo.alt = example.game;
        logo.loading = 'lazy';
        game.append(document.createElement('br'), logo);
      }
      info.appendChild(game);
      card.appendChild(info);
      container.appendChild(card);
    });
  }

  function appendDetail(parent, label, value) {
    const line = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    line.append(strong, value);
    parent.appendChild(line);
  }

  function isNewExample(date) {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);
    if (!match) return false;

    const createdAt = Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const ageInDays = (today - createdAt) / (24 * 60 * 60 * 1000);
    return ageInDays >= 0 && ageInDays <= 30;
  }

  const gameLogos = {
    'Sonic R': 'sonic_r_logo.png',
    'Sonic Battle': 'sonic_battle_logo.png',
    "Garry's Mod": 'garry_mod_logo.png',
    'Sonic Adventure DX': 'sonic_adventure_logo.png',
    'Sonic Generations': 'sonic_generations_logo.png',
    'Sonic Forces': 'sonic_forces_logo.png',
    'Sonic Frontiers': 'sonic_frontiers_logo.png',
    'Sonic Racing Crossworlds': 'sonic_racing_crossworlds_logo.png'
  };

  document.addEventListener('DOMContentLoaded', () => {
    render();
    document.addEventListener('sonic:langchange', render);

    document.getElementById('examples-grid').addEventListener('click', event => {
      const card = event.target.closest('.example-card');
      if (!card || window.matchMedia('(min-width: 701px)').matches) return;
      document.querySelectorAll('.example-card.active').forEach(item => {
        if (item !== card) item.classList.remove('active');
      });
      card.classList.toggle('active');
    });
  });

  return { render };
})();
