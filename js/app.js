document.addEventListener('DOMContentLoaded', async () => {
  const t = SonicI18n.t;

  SonicI18n.applyTranslations();
  SonicI18n.initSwitcher();

  try {
    const data = await SonicAPI.loadAllData();
    window.SonicData = data;

    renderSite(data);
    SonicCalculator.init(data);
    SonicOrders.renderOrders(data.orders);
    setupTelegramActions(data.config);
    observeReveal();


    // Re-render dynamic (data-driven) parts when the language changes.
    document.addEventListener('sonic:langchange', () => {
      renderSite(data);
      SonicCalculator.refresh();
      SonicOrders.renderOrders(data.orders);
      document.getElementById('request-feedback').textContent = '';
    });
  } catch (error) {
    console.error(error);
    const dataError = document.getElementById('data-error');
    dataError.textContent = `${t('error.loadTitle')} ${t('error.loadText')} (${error.message})`;
    dataError.hidden = false;
    document.addEventListener('sonic:langchange', () => {
      dataError.textContent = `${t('error.loadTitle')} ${t('error.loadText')} (${error.message})`;
    });
  }
});

function renderSite(data) {
  const statusChip = document.getElementById('commission-chip');
  const slots = document.getElementById('slots-available');
  const open = data.config.commissionsOpen;
  const activeOrders = (data.orders.orders || []).filter(
    order => order.status === 'in_progress' || order.status === 'waiting' || order.status === 'waiting_client'
  );

  statusChip.removeAttribute('data-i18n');
  statusChip.textContent = SonicI18n.t(open ? 'status.open' : 'status.closed');
  statusChip.classList.toggle('open', open);
  statusChip.classList.toggle('closed', !open);
  slots.textContent = SonicI18n.t('status.slots', {
    free: Math.max(0, data.config.maxSlots - activeOrders.length),
    total: data.config.maxSlots
  });

  renderGames(data.games.games);
}

function renderGames(games) {
  const container = document.getElementById('game-grid');
  container.innerHTML = '';
  const activeGames = games.filter(game => game.active);

  if (!activeGames.length) {
    container.innerHTML = `<p class="empty-state">${SonicI18n.t('games.empty')}</p>`;
    return;
  }

  activeGames.forEach((game, index) => {
    const card = document.createElement('article');
    card.className = 'game-card reveal';
    card.style.setProperty('--delay', `${index * 60}ms`);

    const name = SonicI18n.entity('game', game, 'name') || game.id;
    const description =
      SonicI18n.entity('game', game, 'description') || SonicI18n.t('games.defaultDescription');
    const notes = SonicI18n.field(game, 'notes');
    const noteList = Array.isArray(notes) ? notes : [];

    card.innerHTML = `
      <h3></h3>
      <div class="game-tag"></div>
      <p></p>
      <ul></ul>
    `;
    card.querySelector('h3').textContent = name;
    card.querySelector('.game-tag').textContent =
      `${SonicI18n.t('games.difficulty')}: ${SonicI18n.difficulty(game.difficulty)}`;
    card.querySelector('p').textContent = description;

    const list = card.querySelector('ul');
    noteList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = SonicI18n.note(item);
      list.appendChild(li);
    });
    if (!noteList.length) list.remove();

    container.appendChild(card);
  });

  observeReveal(container);
}

/** Fades cards in as they enter the viewport (progressive enhancement). */
function observeReveal(scope = document) {
  const items = scope.querySelectorAll('.reveal:not(.revealed)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

window.observeReveal = observeReveal;


function setupTelegramActions(config) {
  const openButton = document.getElementById('open-telegram');
  const copyButton = document.getElementById('copy-request');
  const feedback = document.getElementById('request-feedback');

  openButton.addEventListener('click', async () => {
    feedback.textContent = '';
    try {
      const preview = SonicCalculator.getSelectedOrderPreview();
      const message = SonicTelegram.buildMessage(preview);
      const result = await SonicTelegram.openTelegram(config.telegramUsername, message);
      feedback.textContent = SonicI18n.t(
        result.copied ? 'feedback.openedAndCopied' : 'feedback.openedNotCopied'
      );
    } catch (error) {
      feedback.textContent = SonicI18n.t('feedback.telegramError', { error: error.message });
    }
  });

  copyButton.addEventListener('click', async () => {
    feedback.textContent = '';
    try {
      const preview = SonicCalculator.getSelectedOrderPreview();
      const message = SonicTelegram.buildMessage(preview);
      await SonicTelegram.copyToClipboard(message);
      feedback.textContent = SonicI18n.t('feedback.copied');
    } catch (error) {
      feedback.textContent = SonicI18n.t('feedback.copyError', { error: error.message });
    }
  });
}
