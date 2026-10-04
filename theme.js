/* AtomicBytes theme controller · 0.1.0. Load in <head> before CSS. */
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-color-scheme: dark)');
  let explicit = null;
  try { explicit = localStorage.getItem('ab-theme'); } catch { /* Storage may be unavailable. */ }
  if (!['light', 'dark'].includes(explicit)) explicit = null;
  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#241F18' : '#F6F1E8');
    document.querySelectorAll('[data-theme-set]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeSet === theme)));
    document.querySelectorAll('[data-hex-light]').forEach(el => { el.textContent = theme === 'dark' ? el.dataset.hexDark : el.dataset.hexLight; });
    document.dispatchEvent(new Event('ab-theme-change'));
  }
  apply(explicit || (preference.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelectorAll('[data-theme-set]').forEach(button => button.addEventListener('click', () => {
      explicit = button.dataset.themeSet;
      try { localStorage.setItem('ab-theme', explicit); } catch { /* Keep the in-memory choice. */ }
      apply(explicit);
    }));
  });
  preference.addEventListener('change', event => { if (!explicit) apply(event.matches ? 'dark' : 'light'); });
})();
