/* Reference-site interactions; not a production component dependency. */
(() => {
  const sections = [...document.querySelectorAll('main > section')];
  const picker = document.querySelector('#section-picker');
  const dialog = document.querySelector('.search-dialog');
  const search = document.querySelector('#system-search');
  const results = document.querySelector('.search-results');
  const entries = sections.map(section => ({
    section,
    title: section.querySelector('h1, h2')?.textContent.trim() || section.id,
    text: section.textContent.replace(/\s+/g, ' ').trim()
  }));
  entries.forEach(entry => {
    const option = document.createElement('option');
    option.value = '#' + entry.section.id;
    option.textContent = entry.title;
    picker?.append(option);
  });
  function go(id) {
    const target = document.getElementById(id);
    if (!target) return;
    location.hash = id;
    const heading = target.querySelector('h1, h2') || target;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
  picker?.addEventListener('change', () => go(picker.value.slice(1)));
  function renderSearch() {
    const query = search.value.trim().toLowerCase();
    results.replaceChildren();
    const matches = entries.filter(entry => entry.text.toLowerCase().includes(query));
    document.querySelector('#search-count').textContent = matches.length ? `${matches.length} matching sections` : 'No matching sections. Try a broader term.';
    matches.forEach(entry => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + entry.section.id;
      a.textContent = entry.title;
      const small = document.createElement('small');
      const at = query ? Math.max(0, entry.text.toLowerCase().indexOf(query) - 35) : 0;
      small.textContent = entry.text.slice(at, at + 140) + '…';
      a.append(small);
      a.addEventListener('click', event => { event.preventDefault(); dialog.close(); go(entry.section.id); });
      li.append(a); results.append(li);
    });
  }
  document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', () => { renderSearch(); dialog.showModal(); search.focus(); }));
  document.querySelector('[data-search-close]')?.addEventListener('click', () => dialog.close());
  search?.addEventListener('input', renderSearch);

  const navLinks = [...document.querySelectorAll('.side-nav a[href^="#"], .top-nav-links a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(records => {
      const current = records.find(record => record.isIntersecting);
      if (!current) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + current.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (picker) picker.value = '#' + current.target.id;
    }, { rootMargin: '-10% 0px -70% 0px' });
    sections.forEach(section => observer.observe(section));
  }
  // Copy what the live specimen actually uses, without documentation wrappers.
  document.querySelectorAll('#components .comp-block, #expression .expression-example').forEach(block => {
    const live = block.querySelector('.playground, .issue, .card');
    if (!live) return;
    const source = block.dataset.expression ? `<section data-expression="${block.dataset.expression}">\n${live.outerHTML}\n</section>` : live.classList.contains('playground') ? live.innerHTML.trim() : live.outerHTML;
    const details = document.createElement('details'); details.className = 'recipe';
    const summary = document.createElement('summary'); summary.textContent = 'Markup & behavior';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'doc-control copy-button'; button.textContent = 'Copy markup';
    const pre = document.createElement('pre'); pre.textContent = source;
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(source); document.querySelector('#copy-status').textContent = 'Markup copied.'; }
      catch { document.querySelector('#copy-status').textContent = 'Copy unavailable. Select the markup below and copy it.'; }
    });
    details.append(summary, button, pre); block.append(details);
  });
  // Explicit downloads include only files in the asset manifest, including PNG-only exceptions.
  document.querySelectorAll('.char-card, .label-card, .shape-card').forEach(card => {
    const image = card.querySelector('img'); const body = card.querySelector('.char-body, .label-body, .shape-meta');
    if (!image || !body) return;
    const path = image.getAttribute('src');
    const formats = card.querySelector('h3')?.textContent.includes('Hard Hat') ? ['png'] : path.includes('/shapes/') ? ['svg'] : ['svg', 'png'];
    const downloads = document.createElement('div'); downloads.className = 'asset-downloads';
    formats.forEach(format => {
      const a = document.createElement('a'); a.href = path.replace(/\.(png|svg)$/, '.' + format); a.download = ''; a.className = 'text-link'; a.textContent = 'Download ' + format.toUpperCase(); downloads.append(a);
    });
    body.append(downloads);
  });
  document.querySelectorAll('.char-art img').forEach(image => {
    function unavailable() { const placeholder = document.createElement('p'); placeholder.className = 'placeholder'; placeholder.textContent = 'Asset unavailable: ' + image.getAttribute('src').split('/').pop(); image.replaceWith(placeholder); }
    image.addEventListener('error', unavailable);
    if (image.complete && !image.naturalWidth) unavailable();
  });
  function copyControl(label, content) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'doc-control copy-button'; button.textContent = label;
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(content); document.querySelector('#copy-status').textContent = label + ': copied.'; }
      catch { document.querySelector('#copy-status').textContent = 'Copy unavailable. Select the text and copy it.'; }
    });
    return button;
  }
  document.querySelectorAll('.swatch .meta').forEach(meta => {
    const name = meta.querySelector('.token').textContent.split(' / ')[0].trim();
    meta.append(copyControl('Copy ' + name, `var(${name})`));
  });
  document.querySelectorAll('pre.code-block').forEach(pre => pre.after(copyControl('Copy code', pre.textContent)));
  function luminance(hex) {
    const values = hex.trim().replace('#', '').match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
  }
  function contrastMatrix() {
    const body = document.querySelector('#contrast-matrix tbody'); if (!body) return;
    const style = getComputedStyle(document.documentElement);
    const pairs = [
      ['Body', '--text-primary', '--surface-page', 4.5], ['Helper', '--text-secondary', '--surface-card', 4.5],
      ['Primary', '--action-primary-fg', '--action-primary-bg', 4.5], ['Primary hover', '--action-primary-fg', '--action-primary-hover', 4.5], ['Primary pressed', '--action-primary-fg', '--action-primary-pressed', 4.5],
      ['Accent label', '--text-accent', '--surface-card', 4.5], ['Code keyword', '--code-keyword', '--code-bg', 4.5],
      ['Focus', '--focus', '--surface-page', 3], ['Error border', '--border-error', '--surface-card', 3], ['Success border', '--border-success', '--surface-card', 3], ['Warning border', '--border-warning', '--surface-card', 3]
    ];
    body.replaceChildren();
    pairs.forEach(([name, fg, bg, min]) => {
      const a = luminance(style.getPropertyValue(fg)), b = luminance(style.getPropertyValue(bg));
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      const row = document.createElement('tr'); row.dataset.pass = String(ratio >= min);
      [name, fg + ' / ' + bg, ratio.toFixed(2) + ':1', min + ':1 · ' + (ratio >= min ? 'Pass' : 'Fail')].forEach(text => { const cell = document.createElement('td'); cell.textContent = text; row.append(cell); });
      body.append(row);
    });
  }
  contrastMatrix(); document.addEventListener('ab-theme-change', contrastMatrix);
})();
