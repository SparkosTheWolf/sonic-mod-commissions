window.SonicAPI = (() => {
  const cache = {};

  async function loadConfig() {
    if (cache.config) return cache.config;
    const response = await fetch('config.json');
    if (!response.ok) throw new Error('Unable to load website config');
    cache.config = await response.json();
    return cache.config;
  }

  async function fetchJson(path) {
    const config = await loadConfig();
    const url = `${config.dataRepoRoot}/${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not load ${path} from ${url}`);
    }
    return response.json();
  }

  async function loadAllData() {
    const [config, games, pricing, services, orders] = await Promise.all([
      fetchJson('config.json'),
      fetchJson('games.json'),
      fetchJson('pricing.json'),
      fetchJson('services.json'),
      fetchJson('orders.json')
    ]);
    return { config, games, pricing, services, orders };
  }

  return {
    loadConfig,
    loadAllData
  };
})();
