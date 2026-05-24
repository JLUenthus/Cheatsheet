// ============================================================
// AdminSheet – Shared Navigation
// Include this script in every page, after the header HTML
// ============================================================
(function() {
  const PAGES = [
    { id: 'index',    href: 'index.html',    label: 'Windows',   icon: '⚡', color: '#7c8cf8', desc: '147 Befehle · 13 Kategorien' },
    { id: 'exchange', href: 'exchange.html', label: 'Exchange',  icon: '📧', color: '#e8b339', desc: 'On-Prem & Exchange Online' },
    { id: 'forti',    href: 'forti.html',    label: 'Fortinet',  icon: '🔥', color: '#fb7124', desc: 'FG · FMG · FAZ' },
    { id: 'scripts',  href: 'scripts.html',  label: 'PS Scripts',icon: '💚', color: '#4ade80', desc: 'Fertige .ps1 Skripte' },
    { id: 'eventlog',  href: 'eventlog.html',  label: 'Log Analyzer',icon: '📋', color: '#e8b339', desc: 'Event Logs analysieren' },
    { id: 'mitmachen',href: 'mitmachen.html',label: 'Mitmachen', icon: '🤝', color: '#a78bfa', desc: 'Ideen & Befehle einreichen' },
  ];

  // Detect current page
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const currentId = PAGES.find(p => p.href === currentFile)?.id || 'index';

  // ── INJECT CSS ──────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* ── LOGO DROPDOWN ── */
    .as-logo-wrap { position:relative; display:flex; align-items:center; gap:10px; flex-shrink:0; cursor:pointer; user-select:none; }
    .as-logo-wrap:hover .as-logo-icon { border-color:var(--current-color,#7c8cf8); }
    .as-logo-icon { width:32px;height:32px;background:var(--logo-bg,rgba(124,140,248,.1));border:1px solid var(--logo-border,rgba(124,140,248,.3));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;transition:border-color .15s; flex-shrink:0; }
    .as-logo-text { font-size:1rem;font-weight:700;color:var(--text,#e0e4f0);letter-spacing:-.02em;line-height:1; }
    .as-logo-text .as-logo-accent { color:var(--current-color,#7c8cf8); }
    .as-logo-chevron { font-size:10px;color:var(--dim,#555a70);margin-left:2px;transition:transform .2s; }
    .as-logo-wrap.open .as-logo-chevron { transform:rotate(180deg); }

    .as-dropdown {
      display:none;position:absolute;top:calc(100% + 10px);left:0;z-index:500;
      background:#1a1d2e;border:1px solid #343860;border-radius:14px;
      padding:8px;min-width:240px;
      box-shadow:0 16px 48px rgba(0,0,0,.6);
    }
    .as-logo-wrap.open .as-dropdown { display:block; animation:asDropIn .15s ease; }
    @keyframes asDropIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

    .as-dd-item {
      display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;
      text-decoration:none;color:var(--muted,#8890aa);transition:all .12s;cursor:pointer;
    }
    .as-dd-item:hover { background:rgba(255,255,255,.05);color:var(--text,#e0e4f0); }
    .as-dd-item.active { background:rgba(255,255,255,.06); }
    .as-dd-item.active .as-dd-label { color:var(--text,#e0e4f0);font-weight:700; }
    .as-dd-icon { width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0; }
    .as-dd-info { display:flex;flex-direction:column;gap:1px; }
    .as-dd-label { font-size:.84rem;font-weight:600;line-height:1; }
    .as-dd-desc { font-size:.7rem;color:var(--dim,#555a70); }
    .as-dd-divider { height:1px;background:#2a2d3e;margin:6px 4px; }
    .as-dd-active-dot { width:6px;height:6px;border-radius:50%;margin-left:auto;flex-shrink:0; }

    /* ── TAB BAR ── */
    .as-tab-bar {
      position:sticky;top:58px;z-index:99;
      background:rgba(15,17,23,.95);backdrop-filter:blur(12px);
      border-bottom:1px solid #2a2d3e;
      padding:0 24px;
      display:flex;align-items:center;gap:2px;
      overflow-x:auto;scrollbar-width:none;
    }
    .as-tab-bar::-webkit-scrollbar { display:none; }
    .as-tab {
      display:flex;align-items:center;gap:6px;
      padding:10px 14px;
      font-family:inherit;font-size:.8rem;font-weight:600;
      color:var(--muted,#8890aa);
      border:none;background:none;cursor:pointer;
      text-decoration:none;
      border-bottom:2px solid transparent;
      margin-bottom:-1px;
      white-space:nowrap;
      transition:color .15s,border-color .15s;
    }
    .as-tab:hover { color:var(--text,#e0e4f0); }
    .as-tab.active { color:var(--tab-color,#7c8cf8);border-bottom-color:var(--tab-color,#7c8cf8); }
    .as-tab-icon { font-size:14px; }



    /* ── UPDATE BANNER ── */
    .as-update-bar {
      position:fixed;top:0;left:0;right:0;z-index:1000;
      background:#1a1d2e;border-bottom:1px solid rgba(74,222,128,.3);
      padding:10px 20px;
      display:flex;align-items:center;justify-content:center;gap:12px;
      transform:translateY(-100%);transition:transform .3s ease;
      font-size:.82rem;
    }
    .as-update-bar.show { transform:translateY(0); }
    .as-update-text { color:#e0e4f0; }
    .as-update-text span { color:#4ade80;font-weight:700; }
    .as-update-btn {
      display:flex;align-items:center;gap:6px;
      padding:6px 16px;border-radius:8px;
      background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.35);
      color:#4ade80;font-family:inherit;font-size:.8rem;font-weight:600;
      cursor:pointer;transition:all .15s;white-space:nowrap;
    }
    .as-update-btn:hover { background:rgba(74,222,128,.22); }
    .as-update-dismiss {
      background:none;border:none;color:var(--dim,#555a70);
      font-size:16px;cursor:pointer;padding:0 4px;line-height:1;
      transition:color .15s;
    }
    .as-update-dismiss:hover { color:var(--muted,#8890aa); }

    /* Push header down when banner is visible */
    body.has-update header { top:42px; }
    body.has-update .as-tab-bar { top:100px; }
    /* ── SCROLL TO TOP ── */
    .as-scroll-top {
      position:fixed;bottom:32px;right:calc((100vw - 1200px) / 4);z-index:400;
      width:64px;height:64px;border-radius:14px;
      background:var(--panel2,#21253a);
      border:1px solid var(--border2,#343860);
      color:var(--muted,#8890aa);
      font-size:26px;cursor:pointer;line-height:1;padding-bottom:3px;
      display:flex;align-items:center;justify-content:center;
      opacity:0;transform:translateY(12px);
      transition:opacity .25s,transform .25s,background .15s,color .15s,border-color .15s;
      pointer-events:none;
    }
    .as-scroll-top.visible {
      opacity:1;transform:translateY(0);
      pointer-events:all;
    }
    .as-scroll-top:hover {
      background:var(--panel,#1a1d2e);
      color:var(--text,#e0e4f0);
      border-color:var(--accent,#7c8cf8);
    }
    /* ── SEARCH IMPROVEMENTS ── */
    .as-search-hint {
      position:absolute;right:12px;top:50%;transform:translateY(-50%);
      font-size:.68rem;color:var(--dim,#555a70);font-family:monospace;
      pointer-events:none;
      background:rgba(255,255,255,.06);border:1px solid #2a2d3e;
      border-radius:4px;padding:1px 5px;letter-spacing:.02em;
    }
    .search-wrap { position:relative; }
    #search:focus + .as-search-hint,
    #search:not(:placeholder-shown) + .as-search-hint { display:none; }
  `;
  document.head.appendChild(style);

  // ── INJECT LOGO DROPDOWN ─────────────────────────────────
  const logoEl = document.querySelector('.logo, .as-logo-wrap');
  if (logoEl && !logoEl.classList.contains('as-logo-wrap')) {
    const current = PAGES.find(p => p.id === currentId);
    logoEl.classList.add('as-logo-wrap');
    logoEl.style.setProperty('--current-color', current?.color || '#7c8cf8');
    logoEl.style.setProperty('--logo-bg', `${current?.color || '#7c8cf8'}1a`);
    logoEl.style.setProperty('--logo-border', `${current?.color || '#7c8cf8'}4d`);

    // Add chevron
    const chevron = document.createElement('span');
    chevron.className = 'as-logo-chevron';
    chevron.textContent = '▾';
    logoEl.appendChild(chevron);

    // Build dropdown
    const dd = document.createElement('div');
    dd.className = 'as-dropdown';
    PAGES.forEach((p, i) => {
      if (i === PAGES.length - 2) { // divider before Mitmachen (last item)
        const div = document.createElement('div');
        div.className = 'as-dd-divider';
        dd.appendChild(div);
      }
      const a = document.createElement('a');
      a.className = 'as-dd-item' + (p.id === currentId ? ' active' : '');
      a.href = p.href;
      a.innerHTML = `
        <div class="as-dd-icon" style="background:${p.color}1a">${p.icon}</div>
        <div class="as-dd-info">
          <span class="as-dd-label" style="color:${p.id === currentId ? p.color : ''}">${p.label}</span>
          <span class="as-dd-desc">${p.desc}</span>
        </div>
        ${p.id === currentId ? `<div class="as-dd-active-dot" style="background:${p.color}"></div>` : ''}
      `;
      dd.appendChild(a);
    });
    logoEl.appendChild(dd);

    // Toggle on click
    logoEl.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      logoEl.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!logoEl.contains(e.target)) logoEl.classList.remove('open');
    });
  }

  // ── INJECT TAB BAR ───────────────────────────────────────
  const header = document.querySelector('header');
  if (header && !document.querySelector('.as-tab-bar')) {
    const tabBar = document.createElement('nav');
    tabBar.className = 'as-tab-bar';
    tabBar.setAttribute('aria-label', 'Seiten-Navigation');
    PAGES.forEach(p => {
      const a = document.createElement('a');
      const isActive = p.id === currentId;
      a.className = 'as-tab' + (isActive ? ' active' : '');
      a.href = p.href;
      a.style.setProperty('--tab-color', p.color);
      a.innerHTML = `<span class="as-tab-icon">${p.icon}</span>${p.label}`;
      tabBar.appendChild(a);
    });
    header.insertAdjacentElement('afterend', tabBar);
    // Adjust hero padding to account for tab bar
    const hero = document.querySelector('.hero');
    if (hero) {
      const current = window.getComputedStyle(hero).paddingTop;
      const currentPx = parseInt(current);
      if (currentPx > 20) hero.style.paddingTop = (currentPx - 20) + 'px';
    }
  }

  // ── SIMPLIFY HEADER-RIGHT ────────────────────────────────
  // Remove individual nav links since tabs take over
  const headerRight = document.querySelector('.header-right');
  if (headerRight) {
    headerRight.querySelectorAll('a.nav-link, a[class*="nav-link"]').forEach(a => a.remove());
    headerRight.querySelectorAll('.nav-sep').forEach(s => s.remove());
  }

  // ── CTRL+K SEARCH ────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchEl = document.getElementById('search');
      if (searchEl) { searchEl.focus(); searchEl.select(); }
    }
    if (e.key === 'Escape') {
      const searchEl = document.getElementById('search');
      if (searchEl && document.activeElement === searchEl) {
        searchEl.blur();
        searchEl.value = '';
        searchEl.dispatchEvent(new Event('input'));
      }
    }
  });

  // Add Ctrl+K hint to search field
  const searchEl = document.getElementById('search');
  if (searchEl && !document.querySelector('.as-search-hint')) {
    const hint = document.createElement('span');
    hint.className = 'as-search-hint';
    hint.textContent = 'Ctrl K';
    searchEl.parentNode.appendChild(hint);
  }


  // ── SCROLL TO TOP ────────────────────────────────────────
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'as-scroll-top';
  scrollBtn.setAttribute('aria-label', 'Nach oben scrollen');
  scrollBtn.innerHTML = '↑';
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });


  // ── SW UPDATE HANDLER ────────────────────────────────────
  if ('serviceWorker' in navigator) {
    // Create update banner (hidden initially)
    const bar = document.createElement('div');
    bar.className = 'as-update-bar';
    bar.innerHTML = `
      <span class="as-update-text">⚡ <span>Neue Version verfügbar!</span> Die Seite wurde aktualisiert.</span>
      <button class="as-update-btn" onclick="window.location.reload()">🔄 Jetzt aktualisieren</button>
      <button class="as-update-dismiss" onclick="this.closest('.as-update-bar').classList.remove('show');document.body.classList.remove('has-update')" title="Schließen">✕</button>
    `;
    document.body.prepend(bar);

    // Listen for SW update message
    navigator.serviceWorker.addEventListener('message', e => {
      if (e.data?.type === 'SW_UPDATED') {
        bar.classList.add('show');
        document.body.classList.add('has-update');
      }
    });

    // Check for waiting SW on page load (for returning visitors)
    navigator.serviceWorker.ready.then(reg => {
      if (reg.waiting) {
        // There's already a waiting SW - show banner immediately
        bar.classList.add('show');
        document.body.classList.add('has-update');
        // Tell waiting SW to take over when user clicks reload
        bar.querySelector('.as-update-btn').addEventListener('click', () => {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }, { once: true });
      }

      // Watch for future updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            bar.classList.add('show');
            document.body.classList.add('has-update');
            bar.querySelector('.as-update-btn').addEventListener('click', () => {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }, { once: true });
          }
        });
      });
    });

    // Reload all tabs when SW takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) { refreshing = true; window.location.reload(); }
    });
  }

})();
