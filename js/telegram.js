window.SonicTelegram = (() => {
  function buildMessage(selection) {
    const t = SonicI18n.t;
    const empty = '—';
    const lines = [
      t('telegram.header'),
      '',
      `${t('telegram.game')}: ${selection.game || empty}`,
      `${t('telegram.character')}: ${selection.character || t('telegram.notSpecified')}`,
      `${t('telegram.service')}: ${selection.service || empty}`,
      selection.extras.length ? `${t('telegram.extras')}: ${selection.extras.join(', ')}` : null,
      `${t('telegram.price')}: ${selection.priceText}`,
      '',
      `${t('telegram.additional')}: ${selection.additional || selection.description || empty}`,
      `${t('telegram.references')}: ${selection.references || empty}`,
      selection.modelLink ? `${t('telegram.modelLink')}: ${selection.modelLink}` : null
    ];
    return sanitize(lines.filter(Boolean).join('\n'));
  }

  /**
   * Replaces non-breaking / narrow spaces (produced by number formatting)
   * with regular spaces, so the encoded link stays predictable.
   */
  function sanitize(text) {
    return String(text).replace(/[\u00A0\u202F]/g, ' ');
  }

  /**
   * Plain chat link. `?text=` is intentionally NOT used: Telegram only
   * pre-fills drafts from that parameter for bots and share links, while
   * regular user chats often show the raw percent-encoded string instead.
   * The message is placed in the clipboard instead (see openTelegram).
   */
  function buildDeepLink(username) {
    if (!username) return null;
    const cleanUser = username.replace(/^@/, '');
    return `https://t.me/${cleanUser}`;
  }

  async function openTelegram(username, message) {
    const text = sanitize(message);
    const link = buildDeepLink(username);
    if (!link) throw new Error(SonicI18n.t('telegram.noUsername'));

    // Copy first, while the click gesture is still active (clipboard
    // permission requires user activation in most browsers).
    let copied = false;
    try {
      await copyToClipboard(text);
      copied = true;
    } catch (error) {
      copied = false;
    }

    window.open(link, '_blank', 'noopener');
    return { success: true, copied };
  }


  async function copyToClipboard(message) {
    if (!navigator.clipboard) throw new Error(SonicI18n.t('telegram.clipboardUnavailable'));
    await navigator.clipboard.writeText(message);
  }

  return {
    buildMessage,
    buildDeepLink,
    openTelegram,
    copyToClipboard
  };
})();
