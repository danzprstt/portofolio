// ============================================================
//  danzTech — shared.js  v3
//  Icons: Lucide Icons (CDN)
//  NO emoji anywhere — library icons only
// ============================================================

const PAGES = [
  { label: 'Home',       path: '/home',       icon: 'house' },
  { label: 'Portofolio', path: '/portofolio', icon: 'layout-grid' },
  { label: 'Testimoni',  path: '/testimoni',  icon: 'star' },
  { label: 'Store',      path: '/store',      icon: 'shopping-bag' },
  { label: 'Progress',   path: '/progress',
icon: 'star' }
];

function getCurrentPage() {
  const p = window.location.pathname;
  if (p.includes('/portofolio')) return '/portofolio';
  if (p.includes('/testimoni'))  return '/testimoni';
  if (p.includes('/store'))      return '/store';
  return '/home';
  if (p.includes('/progress')) return '/progress'
}

function getRelativePath(target) {
  return {
    '/home':       '../home/index.html',
    '/portofolio': '../portofolio/index.html',
    '/testimoni':  '../testimoni/index.html',
    '/store':      '../store/index.html',
    '/progress':   '../progress/index.html'
  }[target] || '#';
}

// Lucide SVG helper — returns inline SVG string
function icon(name, size = 18, cls = '') {
  return `<svg class="lucide ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-lucide="${name}"></svg>`;
}

// ── SHARED CSS ─────────────────────────────────────────────
function injectSharedCSS() {
  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

  :root {
    --bg:#050510; --bg2:#0c0c20; --bg3:#10102a;
    --cyan:#00f5ff; --purple:#a855f7; --pink:#ff2d78;
    --yellow:#ffd700; --white:#f0f0ff; --gray:#6a6a8a;
    --glass:rgba(12,12,32,0.78); --border:rgba(0,245,255,0.11);
    --nav-h:72px; --ease:cubic-bezier(0.4,0,0.2,1);
    --font:'Outfit',sans-serif; --mono:'JetBrains Mono',monospace;
    --r:16px; --r-lg:22px;
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; scroll-padding-top:var(--nav-h); }
  body { font-family:var(--font); background:var(--bg); color:var(--white); overflow-x:hidden; line-height:1.6; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:linear-gradient(var(--cyan),var(--purple)); border-radius:3px; }

  /* ── LUCIDE icon baseline ── */
  .lucide { display:inline-block; vertical-align:middle; flex-shrink:0; }

  /* ── NAVBAR ── */
  .navbar {
    position:fixed; top:0; left:0; width:100%; height:var(--nav-h);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 5%; z-index:1000;
    background:rgba(5,5,16,0.25); backdrop-filter:blur(24px);
    border-bottom:1px solid transparent;
    transition:all 0.4s var(--ease);
  }
  .navbar.scrolled {
    background:rgba(5,5,16,0.96);
    border-bottom-color:var(--border);
    box-shadow:0 4px 32px rgba(0,0,0,0.45);
  }

  /* Logo */
  .logo {
    display:flex; align-items:center; gap:10px;
    text-decoration:none; color:var(--white);
    font-size:1.5rem; font-weight:800; letter-spacing:-0.5px;
  }
  .logo-icon-wrap {
    width:36px; height:36px; border-radius:10px;
    background:linear-gradient(135deg, var(--cyan), var(--purple));
    display:flex; align-items:center; justify-content:center;
    color:#050510;
    animation:logo-pulse 3s ease-in-out infinite;
  }
  @keyframes logo-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(0,245,255,0.4); }
    50%      { box-shadow:0 0 0 8px rgba(0,245,255,0); }
  }
  .logo-text { letter-spacing:-0.5px; }
  .logo-text span {
    background:linear-gradient(135deg,var(--cyan),var(--purple));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }

  /* Nav menu */
  .nav-menu {
    list-style:none; display:flex; gap:2px;
    background:rgba(12,12,32,0.55); backdrop-filter:blur(14px);
    padding:5px; border-radius:50px; border:1px solid var(--border);
  }
  .nav-link {
    text-decoration:none; color:rgba(240,240,255,0.6);
    font-weight:500; font-size:0.88rem;
    padding:7px 15px; border-radius:50px;
    display:flex; align-items:center; gap:7px;
    transition:all 0.28s var(--ease); position:relative;
  }
  .nav-link:hover, .nav-link.active {
    color:var(--cyan); background:rgba(0,245,255,0.09);
  }
  .nav-link.active::after {
    content:''; position:absolute; bottom:3px; left:50%;
    transform:translateX(-50%); width:4px; height:4px;
    border-radius:50%; background:var(--cyan);
    box-shadow:0 0 7px var(--cyan);
  }

  /* Hamburger */
  .hamburger {
    display:none; flex-direction:column; gap:5px; cursor:pointer;
    background:none; border:none; padding:8px; z-index:1001;
  }
  .hamburger span {
    display:block; width:22px; height:2px;
    background:var(--white); border-radius:2px;
    transition:all 0.3s var(--ease);
  }
  .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  .nav-overlay {
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.72); backdrop-filter:blur(4px); z-index:999;
  }
  .nav-overlay.open { display:block; }

  @media(max-width:768px) {
    .hamburger { display:flex; }
    .nav-menu {
      position:fixed; top:0; right:-100%; width:76%; max-width:290px; height:100vh;
      flex-direction:column; align-items:flex-start; gap:4px;
      padding:calc(var(--nav-h) + 20px) 18px 20px;
      border-radius:0; background:rgba(5,5,16,0.99);
      border-left:1px solid var(--border); z-index:1000;
      transition:right 0.36s var(--ease);
    }
    .nav-menu.open { right:0; }
    .nav-link { width:100%; font-size:1rem; padding:12px 14px; }
  }

  /* ── FOOTER ── */
  .site-footer {
    background:rgba(5,5,16,0.98); border-top:1px solid var(--border);
    padding:56px 5% 32px; margin-top:80px;
  }
  .footer-inner { max-width:1100px; margin:0 auto; text-align:center; }
  .footer-brand {
    display:inline-flex; align-items:center; gap:10px;
    font-size:1.7rem; font-weight:800; margin-bottom:24px;
  }
  .footer-brand .logo-icon-wrap { width:34px; height:34px; border-radius:9px; }
  .footer-nav {
    display:flex; flex-wrap:wrap; justify-content:center;
    gap:6px 18px; margin-bottom:24px;
  }
  .footer-nav a {
    color:var(--gray); text-decoration:none; font-size:0.88rem;
    display:flex; align-items:center; gap:6px;
    transition:color 0.3s;
  }
  .footer-nav a:hover { color:var(--cyan); }
  .footer-contact {
    display:flex; flex-wrap:wrap; justify-content:center;
    gap:10px; margin-bottom:28px;
  }
  .footer-contact a {
    color:var(--gray); text-decoration:none; font-size:0.82rem;
    padding:8px 16px; border:1px solid var(--border); border-radius:50px;
    display:flex; align-items:center; gap:7px;
    transition:all 0.3s;
  }
  .footer-contact a:hover { color:var(--cyan); border-color:var(--cyan); background:rgba(0,245,255,0.05); }
  .footer-copy { font-size:0.76rem; color:var(--gray); }
  .footer-copy span { color:var(--cyan); }

  /* ── KEYFRAMES ── */
  @keyframes spin-slow   { to { transform:rotate(360deg); } }
  @keyframes float       { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes blink       { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
  @keyframes grad-shift  { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }

  /* ── UTILS ── */
  .gradient-text {
    background:linear-gradient(135deg,var(--cyan),var(--purple),var(--pink));
    background-size:200% 200%; -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; background-clip:text;
    animation:grad-shift 4s ease infinite;
  }
  .section-badge {
    display:inline-flex; align-items:center; gap:7px; padding:5px 14px;
    background:rgba(0,245,255,0.07); border:1px solid rgba(0,245,255,0.16);
    border-radius:50px; font-size:0.72rem; color:var(--cyan);
    letter-spacing:2px; text-transform:uppercase;
    font-family:var(--mono); margin-bottom:16px;
  }

  /* ── Floating UI TOOLTIP ── */
  .dt-tooltip {
    background:rgba(8,8,22,0.97); border:1px solid var(--border);
    color:var(--white); padding:7px 13px; border-radius:9px;
    font-size:0.76rem; font-family:var(--mono);
    box-shadow:0 8px 28px rgba(0,0,0,0.5);
    z-index:9999; pointer-events:none; white-space:nowrap;
    animation:tooltip-in 0.14s ease;
  }
  @keyframes tooltip-in { from{opacity:0;transform:translateY(3px);} to{opacity:1;transform:translateY(0);} }

  /* ── UIverse BUTTONS ── */
  .uiv-btn {
    position:relative; display:inline-flex; align-items:center; gap:8px;
    padding:11px 26px; border-radius:50px; font-family:var(--font);
    font-weight:700; font-size:0.92rem; border:none; cursor:pointer;
    text-decoration:none; overflow:hidden;
    transition:transform 0.3s var(--ease), box-shadow 0.3s;
  }
  .uiv-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
    transform:translateX(-100%); transition:transform 0.5s;
  }
  .uiv-btn:hover::before { transform:translateX(100%); }
  .uiv-btn:hover { transform:translateY(-3px); }
  .uiv-btn:active { transform:translateY(-1px); }
  .uiv-btn-cyan   { background:linear-gradient(135deg,var(--cyan),#0080ff); color:#050510; box-shadow:0 0 26px rgba(0,245,255,0.28); }
  .uiv-btn-cyan:hover   { box-shadow:0 0 44px rgba(0,245,255,0.52); }
  .uiv-btn-purple { background:linear-gradient(135deg,var(--purple),var(--pink)); color:#fff; box-shadow:0 0 26px rgba(168,85,247,0.28); }
  .uiv-btn-purple:hover { box-shadow:0 0 44px rgba(168,85,247,0.52); }
  .uiv-btn-ghost  { background:transparent; color:var(--white); border:1.5px solid var(--border); }
  .uiv-btn-ghost:hover  { border-color:var(--cyan); color:var(--cyan); background:rgba(0,245,255,0.05); }
  .uiv-btn-wa     { background:linear-gradient(135deg,#25D366,#128C7E); color:#fff; box-shadow:0 0 26px rgba(37,211,102,0.28); }
  .uiv-btn-wa:hover     { box-shadow:0 0 44px rgba(37,211,102,0.48); }

  /* ── UIverse CARDS ── */
  .uiv-card {
    background:var(--glass); border:1px solid var(--border);
    border-radius:var(--r-lg); position:relative; overflow:hidden;
    transition:all 0.4s var(--ease);
  }
  .uiv-card::after {
    content:''; position:absolute; inset:0; border-radius:inherit;
    background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(0,245,255,0.055),transparent 40%);
    opacity:0; transition:opacity 0.3s; pointer-events:none;
  }
  .uiv-card:hover::after { opacity:1; }
  .uiv-card:hover { transform:translateY(-7px); border-color:rgba(0,245,255,0.26); box-shadow:0 22px 55px rgba(0,0,0,0.38); }

  /* ── UIverse BADGES ── */
  .uiv-badge {
    display:inline-flex; align-items:center; gap:5px; padding:3px 11px;
    border-radius:50px; font-size:0.71rem; font-family:var(--mono); font-weight:600;
  }
  .uiv-badge-cyan   { background:rgba(0,245,255,0.09);   border:1px solid rgba(0,245,255,0.22);   color:var(--cyan); }
  .uiv-badge-purple { background:rgba(168,85,247,0.09);  border:1px solid rgba(168,85,247,0.22);  color:var(--purple); }
  .uiv-badge-pink   { background:rgba(255,45,120,0.09);  border:1px solid rgba(255,45,120,0.22);  color:var(--pink); }
  .uiv-badge-yellow { background:rgba(255,215,0,0.09);   border:1px solid rgba(255,215,0,0.22);   color:var(--yellow); }

  /* ── UIverse INPUT ── */
  .uiv-input {
    width:100%; padding:11px 18px;
    background:rgba(12,12,32,0.82); border:1px solid var(--border);
    border-radius:50px; color:var(--white);
    font-family:var(--font); font-size:0.88rem; outline:none;
    transition:border-color 0.3s, box-shadow 0.3s;
  }
  .uiv-input:focus { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(0,245,255,0.09); }
  .uiv-input::placeholder { color:var(--gray); }

  /* ── SweetAlert2 dark theme ── */
  .swal2-popup.dt-swal {
    background:rgba(10,10,26,0.98) !important; backdrop-filter:blur(24px) !important;
    border:1px solid var(--border) !important; border-radius:20px !important;
    color:var(--white) !important; font-family:var(--font) !important;
    box-shadow:0 32px 80px rgba(0,0,0,0.65) !important;
  }
  .swal2-popup.dt-swal .swal2-title { color:var(--white) !important; font-weight:800 !important; }
  .swal2-popup.dt-swal .swal2-html-container { color:var(--gray) !important; line-height:1.7 !important; }
  .swal2-popup.dt-swal .swal2-confirm {
    background:linear-gradient(135deg,var(--cyan),#0080ff) !important;
    color:#050510 !important; font-weight:700 !important;
    border-radius:50px !important; font-family:var(--font) !important; border:none !important;
  }
  .swal2-popup.dt-swal .swal2-cancel {
    background:rgba(255,255,255,0.06) !important; color:var(--white) !important;
    border:1px solid var(--border) !important; border-radius:50px !important;
    font-family:var(--font) !important;
  }
  .swal2-popup.dt-swal .swal2-timer-progress-bar { background:linear-gradient(90deg,var(--cyan),var(--purple)) !important; }
  .swal2-container.swal2-backdrop-show { background:rgba(0,0,0,0.72) !important; backdrop-filter:blur(8px) !important; }
  .swal2-popup.dt-swal [class^=swal2-success-line] { background:var(--cyan) !important; }
  .swal2-popup.dt-swal .swal2-success-ring { border-color:rgba(0,245,255,0.3) !important; }

  /* Page progress bar */
  .page-progress {
    position:fixed; top:0; left:0; height:2px; width:0%;
    background:linear-gradient(90deg,var(--cyan),var(--purple),var(--pink));
    z-index:9999; transition:width 0.2s;
  }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.insertBefore(s, document.head.firstChild);
}

// ── NAVBAR ─────────────────────────────────────────────────
function injectNavbar() {
  const cur = getCurrentPage();

  const links = PAGES.map(p => {
    const active = cur === p.path ? 'active' : '';
    return `<li>
      <a href="${getRelativePath(p.path)}" class="nav-link ${active}" data-tip="${p.label}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="${p.icon}" class="lucide"></svg>
        ${p.label}
      </a>
    </li>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="page-progress" id="page-progress"></div>
    <nav class="navbar" id="navbar">
      <a href="${getRelativePath('/home')}" class="logo">
        <div class="logo-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-lucide="zap" class="lucide"></svg>
        </div>
        <span class="logo-text">danz<span>Tech</span></span>
      </a>
      <ul class="nav-menu" id="nav-menu">
        ${links}
        <li>
          <a href="../undefine/index.html" class="nav-link" target="_blank" data-tip="Buka danz-tools">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="wrench" class="lucide"></svg>
            Tools
          </a>
        </li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-overlay" id="nav-overlay"></div>
    </nav>`);

  // Lucide icons init
  if (window.lucide) lucide.createIcons();
  else window.addEventListener('load', () => lucide?.createIcons());

  // Hamburger toggle
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  const ov = document.getElementById('nav-overlay');
  const toggle = (s) => {
    const open = s !== undefined ? s : !menu.classList.contains('open');
    [menu, ov, ham].forEach(el => el.classList.toggle('open', open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  ham.addEventListener('click', () => toggle());
  ov.addEventListener('click', () => toggle(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  // Scroll effects
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40);
    const d = document.documentElement;
    const pg = document.getElementById('page-progress');
    if (pg) pg.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + '%';
  });

  // Floating UI tooltips (desktop)
  window.addEventListener('load', () => {
    if (!window.FloatingUIDOM || window.innerWidth < 769) return;
    const { computePosition, offset, flip, shift } = FloatingUIDOM;
    document.querySelectorAll('.nav-link[data-tip]').forEach(el => {
      let tip;
      el.addEventListener('mouseenter', async () => {
        tip = Object.assign(document.createElement('div'), { className: 'dt-tooltip', textContent: el.dataset.tip });
        document.body.appendChild(tip);
        const { x, y } = await computePosition(el, tip, { placement: 'bottom', middleware: [offset(7), flip(), shift({ padding: 5 })] });
        Object.assign(tip.style, { position: 'absolute', left: x + 'px', top: y + 'px' });
      });
      el.addEventListener('mouseleave', () => { tip?.remove(); tip = null; });
    });
  });
}

// ── FOOTER ─────────────────────────────────────────────────
function injectFooter() {
  const links = PAGES.map(p => `
    <a href="${getRelativePath(p.path)}">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="${p.icon}" class="lucide"></svg>
      ${p.label}
    </a>`).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="logo-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-lucide="zap" class="lucide"></svg>
          </div>
          <span class="logo-text">danz<span class="gradient-text">Tech</span></span>
        </div>
        <nav class="footer-nav">
          ${links}
          <a href="../undefine/index.html" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="wrench" class="lucide"></svg>
            Tools
          </a>
        </nav>
        <div class="footer-contact">
          <a href="https://wa.me/6283844026828" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="message-circle" class="lucide"></svg>
            WhatsApp
          </a>
          <a href="https://www.instagram.com/xdnnzy._" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="instagram" class="lucide"></svg>
            Instagram
          </a>
          <a href="https://t.me/danzinc" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="send" class="lucide"></svg>
            Telegram
          </a>
          <a href="https://github.com/danzprstt" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="github" class="lucide"></svg>
            GitHub
          </a>
        </div>
        <p class="footer-copy">&copy; 2026 <span>danzTech</span> &middot; Muhammad Dias Wildan Adam &middot; SMK KBM 1</p>
      </div>
    </footer>`);

  if (window.lucide) lucide.createIcons();
}

// ── UIverse mouse-glow ─────────────────────────────────────
function initCardGlow() {
  document.querySelectorAll('.uiv-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

// ── SweetAlert2 helpers ────────────────────────────────────
window.dtAlert   = opts => Swal?.fire({ customClass:{ popup:'dt-swal' }, ...opts });
window.dtConfirm = opts => dtAlert({ showCancelButton:true, confirmButtonText:'Ya', cancelButtonText:'Batal', ...opts });
window.dtToast   = (title, icon = 'success') => Swal?.fire({
  toast:true, position:'top-end', showConfirmButton:false,
  timer:2600, timerProgressBar:true, icon, title,
  customClass:{ popup:'dt-swal' },
  didOpen: t => {
    t.addEventListener('mouseenter', Swal.stopTimer);
    t.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// ── BOOT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectSharedCSS();
  injectNavbar();
  injectFooter();
  setTimeout(initCardGlow, 400);
});
