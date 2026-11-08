window.SonicCalculator = (() => {
  let data = null;
  const selectedExtras = new Set();

  function init(dataset) {
    data = dataset;
    populateGameOptions();
    document.getElementById('game-select').addEventListener('change', handleGameChange);
    document.getElementById('service-select').addEventListener('change', computeEstimate);
    document.getElementById('start-commission').addEventListener('click', scrollToOrderForm);
    buildExtraOptions();
    computeEstimate();
  }

  /** Rebuilds every data-driven label using the current language. */
  function refresh() {
    if (!data) return;
    const gameId = document.getElementById('game-select').value;
    const serviceId = document.getElementById('service-select').value;

    populateGameOptions(gameId, serviceId);
    buildExtraOptions();
    computeEstimate();
  }

  function scrollToOrderForm() {
    document.getElementById('leave-request').scrollIntoView({ behavior: 'smooth' });
  }

  function populateGameOptions(keepGameId, keepServiceId) {
    const select = document.getElementById('game-select');
    select.innerHTML = '';
    data.games.games.filter(game => game.active).forEach(game => {
      const option = document.createElement('option');
      option.value = game.id;
      option.textContent = SonicI18n.entity('game', game, 'name') || game.id;
      select.appendChild(option);
    });
    if (keepGameId) select.value = keepGameId;
    handleGameChange(keepServiceId);
  }

  function getServiceDefinition(serviceId) {
    return data.services.services.find(service => service.id === serviceId);
  }

  function serviceName(serviceId) {
    const info = getServiceDefinition(serviceId);
    if (info) return SonicI18n.entity('service', info, 'name') || serviceId;
    // Fallback for ids present in games/pricing but missing in services.json
    return SonicI18n.serviceFallback(serviceId);
  }

  function handleGameChange(keepServiceId) {
    const gameId = document.getElementById('game-select').value;
    const game = data.games.games.find(item => item.id === gameId);
    const serviceSelect = document.getElementById('service-select');
    serviceSelect.innerHTML = '';
    if (!game) return;
    const prices = data.pricing[gameId] || {};
    game.services.forEach(serviceId => {
      const option = document.createElement('option');
      option.value = serviceId;
      const price = prices[serviceId];
      option.textContent = typeof price === 'number'
        ? `${serviceName(serviceId)} — ${formatPrice(price)}`
        : serviceName(serviceId);
      serviceSelect.appendChild(option);
    });
    if (typeof keepServiceId === 'string' && keepServiceId) {
      serviceSelect.value = keepServiceId;
    }
    computeEstimate();
  }

  function extraPrice(extraId) {
    const price = data.pricing.extras?.[extraId];
    return typeof price === 'number' ? price : 0;
  }

  function buildExtraOptions() {
    const extrasRow = document.getElementById('extras-row');
    extrasRow.innerHTML = '';

    data.services.services
      .filter(item => item.category === 'extra')
      .forEach((extra, index) => {
        const price = extraPrice(extra.id);

        const card = document.createElement('label');
        card.className = 'extra-card reveal';
        card.style.setProperty('--delay', `${index * 45}ms`);
        card.classList.toggle('selected', selectedExtras.has(extra.id));

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'extra-checkbox';
        checkbox.value = extra.id;
        checkbox.checked = selectedExtras.has(extra.id);
        checkbox.addEventListener('change', toggleExtra);

        const marker = document.createElement('span');
        marker.className = 'extra-marker';
        marker.setAttribute('aria-hidden', 'true');

        const body = document.createElement('span');
        body.className = 'extra-body';

        const title = document.createElement('span');
        title.className = 'extra-name';
        title.textContent = SonicI18n.entity('service', extra, 'name') || extra.id;

        const description = document.createElement('span');
        description.className = 'extra-description';
        description.textContent = SonicI18n.entity('service', extra, 'description') || '';

        body.append(title, description);

        const priceTag = document.createElement('span');
        priceTag.className = 'extra-price';
        priceTag.textContent = price > 0 ? `+${formatPrice(price)}` : '—';

        card.append(checkbox, marker, body, priceTag);
        extrasRow.appendChild(card);
      });

    if (typeof window.observeReveal === 'function') window.observeReveal(extrasRow);
  }


  function toggleExtra(event) {
    const id = event.target.value;
    const card = event.target.closest('.extra-card');
    if (event.target.checked) {
      selectedExtras.add(id);
    } else {
      selectedExtras.delete(id);
    }
    if (card) {
      card.classList.toggle('selected', event.target.checked);
      if (event.target.checked) {
        card.classList.remove('pulse');
        // restart the pulse animation on every new selection
        void card.offsetWidth;
        card.classList.add('pulse');
      }
    }
    computeEstimate();
  }

  function formatPrice(value) {
    const currency = data?.config?.currency === 'RUB' ? '₽' : (data?.config?.currency || '₽');
    return `${SonicI18n.formatNumber(value)} ${currency}`;
  }

  function computeEstimate() {
    const gameId = document.getElementById('game-select').value;
    const serviceId = document.getElementById('service-select').value;
    const gamePrices = data.pricing[gameId] || {};

    const base = typeof gamePrices[serviceId] === 'number' ? gamePrices[serviceId] : 0;
    let extrasTotal = 0;
    selectedExtras.forEach(id => {
      extrasTotal += extraPrice(id);
    });

    const total = base + extrasTotal;
    const priceNode = document.getElementById('estimated-price');
    priceNode.textContent = total > 0 ? formatPrice(total) : '—';
    priceNode.classList.remove('bump');
    void priceNode.offsetWidth;
    priceNode.classList.add('bump');

    const baseNode = document.getElementById('estimate-base');
    const extrasNode = document.getElementById('estimate-extras');
    const countNode = document.getElementById('estimate-count');
    if (baseNode) baseNode.textContent = base > 0 ? formatPrice(base) : '—';
    if (extrasNode) extrasNode.textContent = extrasTotal > 0 ? formatPrice(extrasTotal) : '—';
    if (countNode) {
      countNode.textContent = SonicI18n.t('calc.selectedCount', { count: selectedExtras.size });
    }
  }

  function getSelectedOrderPreview() {
    const gameId = document.getElementById('game-select').value;
    const game = data.games.games.find(item => item.id === gameId);
    const serviceId = document.getElementById('service-select').value;
    const priceText = document.getElementById('estimated-price').textContent;
    const extras = Array.from(selectedExtras).map(serviceName).filter(Boolean);
    return {
      game: SonicI18n.entity('game', game, 'name'),
      service: serviceName(serviceId),
      priceText,
      extras,
      character: document.getElementById('character-input').value.trim(),
      description: document.getElementById('description-input').value.trim(),
      references: document.getElementById('reference-input').value.trim(),
      modelLink: document.getElementById('model-link-input').value.trim(),
      additional: document.getElementById('additional-input').value.trim()
    };
  }

  return {
    init,
    refresh,
    getSelectedOrderPreview
  };
})();
