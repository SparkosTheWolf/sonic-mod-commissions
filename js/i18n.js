window.SonicI18n = (() => {
  const STORAGE_KEY = 'sonic-lang';
  const DEFAULT_LANG = 'ru';
  const SUPPORTED = ['ru', 'en'];

  const dictionaries = {
    ru: {
      'meta.title': 'Sparkos - Заказы модов Sonic',

      'lang.label': 'Язык',
      'lang.ru': 'RU',
      'lang.en': 'EN',
      'lang.ru.title': 'Переключить на русский',
      'lang.en.title': 'Switch to English',

      'nav.menu': 'Навигация',
      'nav.sections': 'Навигация по разделам',
      'nav.up': 'Предыдущий раздел',
      'nav.down': 'Следующий раздел',
      'nav.examples': 'Примеры модов',
      'nav.games': 'Поддерживаемые игры',
      'nav.calculator': 'Калькулятор заказа',
      'nav.order': 'Оставить заказ',
      'examples.title': 'Примеры модов',
      'examples.subtitle': 'Галерея выбранных работ.',
      'examples.new': 'Новый',
      'examples.date': 'Дата создания',
      'examples.download': 'Скачать',
      'examples.unavailable': 'Отсутствует',
      'examples.cancelled': 'Отменён',
      'examples.client': 'Заказчик',
      'examples.game': 'Игра',

      'hero.eyebrow': 'Sparkos The Wolf',
      'hero.title': 'КОМИШЕНЫ SONIC МОДОВ',
      'hero.subtitle': 'Кастомные модели • Текстуры • Замена персонажей • Моддинг',
      'hero.loading': 'Загрузка...',
      'hero.cta': 'ОФОРМИТЬ ЗАКАЗ',
      'hero.bannerAlt': 'Баннер комишенов Sonic модов от Sparkos The Wolf',

      'status.open': '🟢 Комишены открыты',
      'status.closed': '🔴 Комишены закрыты',

      'status.slots': '{free} / {total} свободных слотов',

      'games.title': 'Поддерживаемые игры',
      'games.subtitle': 'Игры и услуги, доступные для заказа.',

      'games.difficulty': 'Сложность',
      'games.defaultDescription': 'Поддержка моддинга Sonic по выбранным играм.',
      'games.empty': 'Пока нет доступных игр.',

      'calc.title': 'Калькулятор стоимости',
      'calc.subtitle': 'Выберите игру, услугу и дополнительные опции, чтобы увидеть ориентировочную цену.',
      'calc.game': 'Игра',
      'calc.service': 'Основная услуга',
      'calc.extras': 'Дополнительные опции',
      'calc.extrasHint': 'Нажми на карточку, чтобы добавить опцию к заказу.',
      'calc.note': '«Модель от клиента» и «Кастомная модель» — альтернативные базовые услуги и не складываются автоматически.',
      'calc.estimateLabel': 'ОРИЕНТИРОВОЧНАЯ СТОИМОСТЬ',
      'calc.estimateFootnote': 'Окончательная цена может измениться после изучения модели и требований проекта.',
      'calc.basePrice': 'Базовая услуга',
      'calc.extrasTotal': 'Доп. опции',
      'calc.selectedCount': 'Выбрано: {count}',


      'order.title': 'Готов отправить заявку?',
      'order.subtitle': 'Заполни форму и отправь запрос в Telegram для быстрого ответа.',
      'order.character': 'Персонаж',
      'order.characterPlaceholder': 'например, Shadow',
      'order.description': 'Описание',
      'order.descriptionPlaceholder': 'Опиши желаемый мод или задачи',
      'order.references': 'Референсы',
      'order.referencesPlaceholder': 'Ссылки, скриншоты или детали',
      'order.modelLink': 'Ссылка на модель',
      'order.modelLinkPlaceholder': 'Опциональная ссылка на модель или референс',
      'order.additional': 'Дополнительные требования',
      'order.additionalPlaceholder': 'Любые заметки для Sparkos',
      'order.openTelegram': 'ОТКРЫТЬ TELEGRAM',
      'order.copyRequest': 'СКОПИРОВАТЬ ЗАПРОС',

      'feedback.tooLong': 'Сообщение слишком длинное для прямой ссылки. Используй «СКОПИРОВАТЬ ЗАПРОС».',
      'feedback.telegramError': 'Не удалось открыть Telegram: {error}',
      'feedback.copied': 'Запрос скопирован в буфер обмена.',
      'feedback.copyError': 'Ошибка копирования: {error}',
      'feedback.openedAndCopied': 'Telegram открыт, заявка скопирована — вставь её в чат (Cmd/Ctrl+V).',
      'feedback.openedNotCopied': 'Telegram открыт. Скопировать автоматически не вышло — нажми «СКОПИРОВАТЬ ЗАПРОС».',

      'orders.title': 'ТЕКУЩИЕ ЗАКАЗЫ',
      'orders.subtitle': 'Публичные статусы текущих комишенов по Sonic модам.',

      'orders.empty': 'Публичных заказов пока нет.',

      'orderStatus.waiting': '🟡 Ожидание',
      'orderStatus.in_progress': '🔵 В работе',
      'orderStatus.waiting_client': '🟠 Ждёт клиента',
      'orderStatus.completed': '🟢 Завершено',
      'orderStatus.paused': '🔴 Приостановлено',

      'error.loadTitle': 'Не удалось загрузить данные комишенов.',

      'error.loadText': 'Проверь настройки репозитория и попробуй снова.',

      'telegram.header': '🦔 ЗАЯВКА НА SONIC МОД',
      'telegram.game': '🎮 Игра',
      'telegram.character': '👤 Персонаж',
      'telegram.service': '🛠️ Услуга',
      'telegram.extras': '➕ Дополнительно',
      'telegram.price': '💰 Ориентировочная цена',
      'telegram.additional': '📝 Дополнительная информация',
      'telegram.references': '🔗 Референсы',
      'telegram.modelLink': '🔗 Ссылка на модель',
      'telegram.notSpecified': 'Не указано',
      'telegram.noUsername': 'Telegram-аккаунт не настроен',
      'telegram.clipboardUnavailable': 'Буфер обмена недоступен',

      'footer.text': '© Персонажи принадлежат SEGA.'

    },

    en: {
      'meta.title': 'Sparkos - Sonic Mod Commissions',
      'lang.label': 'Language',
      'lang.ru': 'RU',
      'lang.en': 'EN',
      'lang.ru.title': 'Переключить на русский',
      'lang.en.title': 'Switch to English',

      'nav.menu': 'Navigation',
      'nav.sections': 'Section navigation',
      'nav.up': 'Previous section',
      'nav.down': 'Next section',
      'nav.examples': 'Mod examples',
      'nav.games': 'Supported games',
      'nav.calculator': 'Price calculator',
      'nav.order': 'Place an order',
      'examples.title': 'Mod examples',
      'examples.subtitle': 'A gallery of selected work.',
      'examples.new': 'New',
      'examples.date': 'Created',
      'examples.download': 'Download',
      'examples.unavailable': 'Unavailable',
      'examples.cancelled': 'Cancelled',
      'examples.client': 'Client',
      'examples.game': 'Game',

      'hero.eyebrow': 'Sparkos The Wolf',
      'hero.title': 'SONIC MOD COMMISSIONS',
      'hero.subtitle': 'Custom models • Textures • Character swaps • Modding',
      'hero.loading': 'Loading...',
      'hero.cta': 'PLACE AN ORDER',
      'hero.bannerAlt': 'Sonic mod commissions banner by Sparkos The Wolf',

      'status.open': '🟢 Commissions open',
      'status.closed': '🔴 Commissions closed',
      'status.slots': '{free} / {total} slots available',

      'games.title': 'Supported games',
      'games.subtitle': 'Games and services available for commissions.',
      'games.difficulty': 'Difficulty',
      'games.defaultDescription': 'Sonic modding support for the selected games.',
      'games.empty': 'No games available yet.',

      'calc.title': 'Price calculator',
      'calc.subtitle': 'Pick a game, a service and extra options to see an estimated price.',
      'calc.game': 'Game',
      'calc.service': 'Main service',
      'calc.extras': 'Extra options',
      'calc.extrasHint': 'Click a card to add the option to your order.',
      'calc.note': 'Client-provided model and Custom model are alternative base services and are not stacked automatically.',
      'calc.estimateLabel': 'ESTIMATED PRICE',
      'calc.estimateFootnote': 'The final price may change after reviewing the model and project requirements.',
      'calc.basePrice': 'Base service',
      'calc.extrasTotal': 'Extras',
      'calc.selectedCount': 'Selected: {count}',


      'order.title': 'Ready to send a request?',
      'order.subtitle': 'Fill in the form and send the request via Telegram for a quick reply.',
      'order.character': 'Character',
      'order.characterPlaceholder': 'e.g. Shadow',
      'order.description': 'Description',
      'order.descriptionPlaceholder': 'Describe the mod or tasks you want',
      'order.references': 'References',
      'order.referencesPlaceholder': 'Links, screenshots or details',
      'order.modelLink': 'Model link',
      'order.modelLinkPlaceholder': 'Optional link to a model or reference',
      'order.additional': 'Additional requirements',
      'order.additionalPlaceholder': 'Any notes for Sparkos',
      'order.openTelegram': 'OPEN TELEGRAM',
      'order.copyRequest': 'COPY REQUEST',

      'feedback.tooLong': 'The message is too long for a direct link. Use “COPY REQUEST”.',
      'feedback.telegramError': 'Could not open Telegram: {error}',
      'feedback.copied': 'Request copied to clipboard.',
      'feedback.copyError': 'Copy failed: {error}',
      'feedback.openedAndCopied': 'Telegram opened and the request is copied — just paste it (Cmd/Ctrl+V).',
      'feedback.openedNotCopied': 'Telegram opened. Automatic copy failed — press “COPY REQUEST”.',

      'orders.title': 'CURRENT ORDERS',
      'orders.subtitle': 'Public statuses of ongoing Sonic mod commissions.',
      'orders.empty': 'No public orders available yet.',

      'orderStatus.waiting': '🟡 Waiting',
      'orderStatus.in_progress': '🔵 In progress',
      'orderStatus.waiting_client': '🟠 Waiting for client',
      'orderStatus.completed': '🟢 Completed',
      'orderStatus.paused': '🔴 Paused',

      'error.loadTitle': 'Failed to load commission data.',
      'error.loadText': 'Check the data repository settings and try again.',

      'telegram.header': '🦔 SONIC MOD REQUEST',
      'telegram.game': '🎮 Game',
      'telegram.character': '👤 Character',
      'telegram.service': '🛠️ Service',
      'telegram.extras': '➕ Extras',
      'telegram.price': '💰 Estimated price',
      'telegram.additional': '📝 Additional info',
      'telegram.references': '🔗 References',
      'telegram.modelLink': '🔗 Model link',
      'telegram.notSpecified': 'Not specified',
      'telegram.noUsername': 'Telegram username is not configured',
      'telegram.clipboardUnavailable': 'Clipboard is not available',

      'footer.text': '© Characters belong to SEGA.'
    }
  };

  /**
   * Translations for remote data entities, keyed by their `id`.
   * Used when the data repository itself has no localized fields.
   */
  const content = {
    ru: {
      'service.texture.name': 'Текстуры / рекрас',
      'service.texture.description': 'Работа с текстурами и рекрасом на предоставленных моделях.',
      'service.recolor.name': 'Рекрас (recolor)',
      'service.recolor.description': 'Перекраска существующей модели без изменения геометрии.',
      'service.client_model.name': 'Модель от заказчика',
      'service.client_model.description': 'Заказчик предоставляет готовую модель — я адаптирую и настраиваю её.',
      'service.custom_model.name': 'Кастомная модель',
      'service.custom_model.description': 'Создаю собственную модель с нуля или по референсам.',
      'service.adaptation.name': 'Адаптация модели',
      'service.adaptation.description': 'Существующая модель требует серьёзной адаптации и подгонки под игру.',
      'service.installer.name': 'Установщик мода',
      'service.installer.description': 'Удобный установщик для готового мода.',
      'service.extra_form.name': 'Доп. форма персонажа',
      'service.extra_form.description': 'Дополнительная форма персонажа для расширенного набора.',
      'service.extra_variant.name': 'Доп. вариант модели',
      'service.extra_variant.description': 'Дополнительная модель или вариант в рамках одного заказа.',
      'service.extra_texture.name': 'Доп. набор текстур',
      'service.extra_texture.description': 'Дополнительный набор текстур в рамках одного заказа.',
      'service.rush.name': 'Срочный заказ',
      'service.rush.description': 'Ускоренная очередь и приоритетное выполнение.',
      'service.custom.name': 'Другое / индивидуально',
      'service.custom.description': 'Индивидуальная доп. услуга, которой нет в стандартном списке.',

      'game.sonic_adventure_dx.description': 'Работаю с Sonic в Sonic Adventure DX: текстуры, модели и переработка цвета.',
      'game.sonic_r.description': 'Работаю с любыми персонажами в Sonic R. Высокая свобода моделей при строгих технических ограничениях.',
      'game.sonic_generations.description': 'Работаю с Modern Sonic и Classic Sonic: замена моделей, текстур и адаптация.',
      'game.sonic_forces.description': 'Работаю с Modern Sonic и Avatar. Для Avatar сложность выше и нужна аккуратная адаптация.',
      'game.sonic_frontiers.description': 'Работаю с Sonic: кастомные модели, адаптация, текстуры и рекрас для Frontiers-модов.',
      'game.sonic_battle.description': 'Работаю с Sonic Battle: рекрас, адаптация текстур и спрайтов, работа с готовыми спрайтами.',
      'game.sonic_unleashed_recompiled.description': 'Работаю с Sonic Unleashed Recompiled: замена моделей и текстур, рекрас и адаптация.',

      'difficulty.low': 'низкая',
      'difficulty.medium': 'средняя',
      'difficulty.high': 'высокая',

      'note.texture replacement': 'Замена текстур',
      'note.textures': 'Текстуры',
      'note.custom textures': 'Кастомные текстуры',
      'note.recolor': 'Рекрас',
      'note.recolors': 'Рекрасы',
      'note.model replacement': 'Замена моделей',
      'note.model adaptation': 'Адаптация модели',
      'note.adaptation': 'Адаптация',
      'note.custom model': 'Кастомная модель',
      'note.custom models': 'Кастомные модели',
      'note.client-provided model': 'Модель от заказчика',
      'note.character replacement': 'Замена персонажей',
      'note.optimization required': 'Требуется оптимизация',
      'note.facial animation не предлагается': 'Лицевая анимация не предлагается',
      'note.texture / sprite adaptation': 'Адаптация текстур и спрайтов',
      'note.работа с существующими sprites': 'Работа с готовыми спрайтами',
      'note.ограничение палитры': 'Ограничение палитры',
      'note.custom character': 'Кастомный персонаж',
      'note.character swap': 'Замена персонажа',
      'note.installer': 'Установщик',
      'note.rush order': 'Срочный заказ'

    },

    en: {
      'service.texture.name': 'Texture / Recolor',
      'service.texture.description': 'Texture and recolor work on models you provide.',
      'service.recolor.name': 'Recolor',
      'service.recolor.description': 'Repainting an existing model without changing its geometry.',
      'service.client_model.name': 'Client-provided model',
      'service.client_model.description': 'You provide a finished model — I adapt and set it up.',
      'service.custom_model.name': 'Custom model',
      'service.custom_model.description': 'A model built from scratch or from your references.',
      'service.adaptation.name': 'Model adaptation',
      'service.adaptation.description': 'An existing model that needs heavy adaptation and rigging for the game.',
      'service.installer.name': 'Mod installer',
      'service.installer.description': 'A convenient installer for the finished mod.',
      'service.extra_form.name': 'Additional character form',
      'service.extra_form.description': 'An extra character form for a wider set.',
      'service.extra_variant.name': 'Additional model variant',
      'service.extra_variant.description': 'An extra model or variant within the same order.',
      'service.extra_texture.name': 'Additional texture set',
      'service.extra_texture.description': 'An extra texture set within the same order.',
      'service.rush.name': 'Rush order',
      'service.rush.description': 'Priority queue and faster delivery.',
      'service.custom.name': 'Custom / other',
      'service.custom.description': 'A custom extra that does not fit the standard list.',

      'game.sonic_adventure_dx.description': 'Sonic in Sonic Adventure DX: textures, models and color rework.',
      'game.sonic_r.description': 'Any character in Sonic R. Great model freedom within strict technical limits.',
      'game.sonic_generations.description': 'Modern and Classic Sonic: model and texture replacement plus adaptation.',
      'game.sonic_forces.description': 'Modern Sonic and the Avatar. The Avatar is harder and needs careful adaptation.',
      'game.sonic_frontiers.description': 'Sonic: custom models, adaptation, textures and recolors for Frontiers mods.',
      'game.sonic_battle.description': 'Sonic Battle: recolors, texture/sprite adaptation and work with existing sprites.',
      'game.sonic_unleashed_recompiled.description': 'Sonic Unleashed Recompiled: model and texture replacement, recolors and adaptation.',

      'difficulty.low': 'low',
      'difficulty.medium': 'medium',
      'difficulty.high': 'high',

      'note.texture replacement': 'Texture replacement',
      'note.textures': 'Textures',
      'note.custom textures': 'Custom textures',
      'note.recolor': 'Recolor',
      'note.recolors': 'Recolors',
      'note.model replacement': 'Model replacement',
      'note.model adaptation': 'Model adaptation',
      'note.adaptation': 'Adaptation',
      'note.custom model': 'Custom model',
      'note.custom models': 'Custom models',
      'note.client-provided model': 'Client-provided model',
      'note.character replacement': 'Character replacement',
      'note.optimization required': 'Optimization required',
      'note.facial animation не предлагается': 'Facial animation is not offered',
      'note.texture / sprite adaptation': 'Texture / sprite adaptation',
      'note.работа с существующими sprites': 'Work with existing sprites',
      'note.ограничение палитры': 'Palette limitation',
      'note.custom character': 'Custom character',
      'note.character swap': 'Character swap',
      'note.installer': 'Installer',
      'note.rush order': 'Rush order'

    }
  };

  let current = detectInitialLang();


  function detectInitialLang() {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      stored = null;
    }
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
  }

  function getLang() {
    return current;
  }

  function t(key, params) {
    const dict = dictionaries[current] || dictionaries[DEFAULT_LANG];
    let value = dict[key];
    if (value === undefined) value = dictionaries[DEFAULT_LANG][key];
    if (value === undefined) return key;
    if (!params) return value;
    return Object.keys(params).reduce(
      (text, name) => text.replace(new RegExp(`\\{${name}\\}`, 'g'), params[name]),
      value
    );
  }

  /**
   * Picks a localized field from remote data.
   * Supports `name_en` / `nameEn` / `name` fallback chain.
   */
  function field(source, key) {
    if (!source) return '';
    const suffixed = `${key}_${current}`;
    const camel = `${key}${current.charAt(0).toUpperCase()}${current.slice(1)}`;
    return source[suffixed] ?? source[camel] ?? source[key] ?? '';
  }

  /**
   * Localized text for a remote entity (`service`, `game`, ...).
   * Priority: localized field in data → content catalog by id → raw field.
   */
  function entity(kind, source, key) {
    if (!source) return '';
    const suffixed = `${key}_${current}`;
    const camel = `${key}${current.charAt(0).toUpperCase()}${current.slice(1)}`;
    if (source[suffixed]) return source[suffixed];
    if (source[camel]) return source[camel];
    const catalog = content[current] || {};
    const fromCatalog = catalog[`${kind}.${source.id}.${key}`];
    if (fromCatalog) return fromCatalog;
    return source[key] ?? '';
  }

  /**
   * Name for a service id that is missing from services.json
   * (e.g. `recolor` is referenced by games/pricing only).
   */
  function serviceFallback(serviceId) {
    if (!serviceId) return '';
    const catalog = content[current] || {};
    return catalog[`service.${serviceId}.name`] || serviceId;
  }

  /** Translates a free-form note string using the content catalog. */

  function note(text) {
    if (!text) return '';
    const catalog = content[current] || {};
    return catalog[`note.${String(text).trim().toLowerCase()}`] || text;
  }

  /** Translates difficulty values like `low-medium` / `medium-high`. */
  function difficulty(value) {
    if (!value) return '';
    const catalog = content[current] || {};
    return String(value)
      .split(/[-–/]/)
      .map(part => catalog[`difficulty.${part.trim().toLowerCase()}`] || part.trim())
      .join(current === 'ru' ? '–' : '-');
  }

  function formatNumber(value) {

    return Number(value).toLocaleString(current === 'ru' ? 'ru-RU' : 'en-US');
  }

  function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
      node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(node => {
      node.setAttribute('title', t(node.dataset.i18nTitle));
    });
    root.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
      node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel));
    });
    root.querySelectorAll('[data-i18n-alt]').forEach(node => {
      node.setAttribute('alt', t(node.dataset.i18nAlt));
    });
    if (root === document) {
      document.title = t('meta.title');
      document.documentElement.lang = current;
    }
  }

  function updateSwitcher() {
    document.querySelectorAll('[data-lang-option]').forEach(button => {
      const isActive = button.dataset.langOption === current;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang) || lang === current) return;
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* storage may be unavailable — ignore */
    }
    applyTranslations();
    updateSwitcher();
    document.dispatchEvent(new CustomEvent('sonic:langchange', { detail: { lang } }));
  }

  function initSwitcher() {
    document.querySelectorAll('[data-lang-option]').forEach(button => {
      button.addEventListener('click', () => setLang(button.dataset.langOption));
    });
    updateSwitcher();
  }

  return {
    t,
    field,
    entity,
    serviceFallback,
    note,

    difficulty,
    formatNumber,

    getLang,
    setLang,
    applyTranslations,
    initSwitcher,
    supported: SUPPORTED
  };
})();
