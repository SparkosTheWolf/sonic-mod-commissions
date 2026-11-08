window.SonicOrders = (() => {
  const statusStyles = {
    waiting: 'background: rgba(252, 188, 44, 0.12); color: #f9c74f;',
    in_progress: 'background: rgba(72, 123, 255, 0.12); color: #7ab8ff;',
    waiting_client: 'background: rgba(255, 158, 74, 0.12); color: #ffb766;',
    completed: 'background: rgba(101, 237, 150, 0.12); color: #91f4a8;',
    paused: 'background: rgba(255, 86, 86, 0.12); color: #ff7a7a;'
  };

  function getStatusLabel(status) {
    const key = `orderStatus.${status}`;
    const label = SonicI18n.t(key);
    return label === key ? status : label;
  }

  function renderOrders(orders) {
    const container = document.getElementById('orders-list');
    container.innerHTML = '';
    const publicOrders = (orders.orders || []).filter(item => item.public !== false);
    if (!publicOrders.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = SonicI18n.t('orders.empty');
      container.appendChild(empty);
      return;
    }

    publicOrders.forEach((order, index) => {
      const item = document.createElement('div');
      item.className = 'order-item reveal';
      item.style.setProperty('--delay', `${index * 60}ms`);

      const summary = document.createElement('div');
      summary.className = 'order-summary';
      const title = document.createElement('strong');
      title.textContent = `#${order.id} — ${SonicI18n.field(order, 'game') || order.game || ''}`;
      const work = document.createElement('span');
      const rawWork = SonicI18n.field(order, 'work') || order.work || '';
      work.textContent = SonicI18n.note(rawWork);
      summary.appendChild(title);
      summary.appendChild(work);


      const status = document.createElement('div');
      status.className = 'order-status';
      status.textContent = getStatusLabel(order.status);
      status.style = statusStyles[order.status] || '';

      item.appendChild(summary);
      item.appendChild(status);
      container.appendChild(item);
    });

    if (typeof window.observeReveal === 'function') window.observeReveal(container);
  }


  return {
    renderOrders,
    getStatusLabel
  };
})();
