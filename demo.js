/* Local specimen behavior. No data leaves the browser; no backend is configured. */
(() => {
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    const button = form.querySelector('[type="submit"]');
    const status = form.querySelector('[data-form-status]');
    const fields = [...form.querySelectorAll('[required]')];
    let busy = false;
    function validate(field) {
      const error = form.querySelector('#' + field.id + '-error');
      const invalid = !field.validity.valid;
      field.setAttribute('aria-invalid', String(invalid));
      field.closest('.field').classList.toggle('is-error', invalid);
      error.hidden = !invalid;
      return !invalid;
    }
    fields.forEach(field => field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); }));
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (busy) return;
      const invalid = fields.filter(field => !validate(field));
      if (invalid.length) { status.textContent = 'Check the highlighted fields.'; invalid[0].focus(); return; }
      busy = true; button.disabled = true; button.setAttribute('aria-busy', 'true');
      button.textContent = 'Sending…'; status.textContent = 'Simulating a local submission…';
      setTimeout(() => {
        busy = false; button.disabled = false; button.removeAttribute('aria-busy');
        const fail = form.querySelector('[data-simulate-failure]').checked;
        button.textContent = fail ? 'Retry message' : 'Send message';
        status.textContent = fail ? 'Demo delivery failed. Your message is still here. Turn off “Simulate delivery failure” and retry.' : 'Demo complete. Your message was validated locally; nothing was sent.';
      }, 700);
    });
  });
  document.querySelectorAll('[data-specimen-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-specimen-view]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelectorAll('[data-page-specimen]').forEach(page => { page.hidden = page.id !== button.dataset.specimenView; });
    history.replaceState(null, '', '#' + button.dataset.specimenView);
    const page = document.getElementById(button.dataset.specimenView); page.querySelector('h1').focus({ preventScroll: true });
  }));
  function selectHash() {
    const id = location.hash.slice(1);
    const target = document.getElementById(id);
    if (!target?.matches('[data-page-specimen]')) return;
    document.querySelectorAll('[data-page-specimen]').forEach(page => { page.hidden = page.id !== id; });
    document.querySelectorAll('[data-specimen-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.specimenView === id)));
  }
  selectHash(); window.addEventListener('hashchange', selectHash);
})();
