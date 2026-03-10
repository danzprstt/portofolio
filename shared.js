// ========== SHARED NAVBAR & FOOTER ==========
const PAGES = [
  { label: 'Home', path: '/home' },
  { label: 'Portofolio', path: '/portofolio' },
  { label: 'Testimoni', path: '/testimoni' },
  { label: 'Store', path: '/store' },
];

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('/home') || path.endsWith('/') || path.endsWith('index.html')) return '/home';
  if (path.includes('/portofolio')) return '/portofolio';
  if (path.includes('/testimoni')) return '/testimoni';
  if (path.includes('/store')) return '/store';
  return '/home';
}

function getRelativePath(target) {
  const cur = getCurrentPage();
  const depth = cur === '/home' ? '../' : '../';
  const map = {
    '/home': depth + 'home/index.html',
    '/portofolio': depth + 'portofolio/index.html',
    '/testimoni': depth + 'testimoni/index.html',
    '/store': depth + 'store/index.html',
  };
  return map[target] || '#';
}

function injectNavbar() {
  const cur = getCurrentPage();
  const links = PAGES.map(p => {
    const active = cur === p.path ? 'active' : '';
    return `<li><a href="${getRelativePath(p.path)}" class="nav-link ${active}" data-path="${p.path}">${p.label}</a></li>`;
  }).join('');

  const navbar = `
  <nav class="navbar" id="navbar">
    <a href="${getRelativePath('/home')}" class="logo">
      <span class="logo-star">✦</span>
      danz<span class="logo-accent">Tech</span>
    </a>
    <ul class="nav-menu" id="nav-menu">${links}
      <li><a href="https://danz-tools.vercel.app/index.html" class="nav-link" target="_blank">Tools</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-overlay" id="nav-overlay"></div>
  </nav>`;
  document.body.insertAdjacentHTML('afterbegin', navbar);

  // Hamburger
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');
  function toggleMenu(state) {
    const open = state !== undefined ? state : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    ham.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  ham.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // Scroll shrink
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });
}

function injectFooter() {
  const links = PAGES.map(p =>
    `<a href="${getRelativePath(p.path)}">${p.label}</a>`
  ).join('');

  const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="logo-star">✦</span> danz<span class="logo-accent">Tech</span>
      </div>
      <nav class="footer-nav">${links}<a href="https://danz-tools.vercel.app/index.html" target="_blank">Tools</a></nav>
      <div class="footer-contact">
        <a href="https://wa.me/6283844026828" target="_blank">💬 WhatsApp</a>
        <a href="https://www.instagram.com/xdnnzy._" target="_blank">📸 Instagram</a>
        <a href="https://t.me/danzinc" target="_blank">✈️ Telegram</a>
        <a href="https://github.com/danzprstt" target="_blank">💻 GitHub</a>
      </div>
      <p class="footer-copy">&copy; 2026 <span>danzTech</span> · Muhammad Dias Wildan Adam · SMK KBM 1</p>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', footer);
}

// Inject shared CSS
function injectSharedCSS() {
  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg: #050510;
    --bg2: #0c0c20;
    --cyan: #00f5ff;
    --purple: #a855f7;
    --pink: #ff2d78;
    --yellow: #ffd700;
    --white: #f0f0ff;
    --gray: #7070a0;
    --glass: rgba(12,12,32,0.7);
    --border: rgba(0,245,255,0.12);
    --nav-h: 72px;
    --ease: cubic-bezier(0.4,0,0.2,1);
    --font: 'Outfit', sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;scroll-padding-top:var(--nav-h);}
  body{font-family:var(--font);background:var(--bg);color:var(--white);overflow-x:hidden;line-height:1.6;}

  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:linear-gradient(var(--cyan),var(--purple));border-radius:3px;}

  /* ===== NAVBAR ===== */
  .navbar{
    position:fixed;top:0;left:0;width:100%;height:var(--nav-h);
    display:flex;align-items:center;justify-content:space-between;
    padding:0 5%;z-index:1000;
    background:rgba(5,5,16,0.4);backdrop-filter:blur(20px);
    border-bottom:1px solid transparent;
    transition:all 0.4s var(--ease);
  }
  .navbar.scrolled{background:rgba(5,5,16,0.92);border-bottom-color:var(--border);}

  .logo{
    font-size:1.6rem;font-weight:800;text-decoration:none;color:var(--white);
    display:flex;align-items:center;gap:6px;letter-spacing:-0.5px;
  }
  .logo-star{color:var(--cyan);animation:spin-slow 8s linear infinite;display:inline-block;}
  .logo-accent{background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

  .nav-menu{
    list-style:none;display:flex;gap:4px;
    background:rgba(12,12,32,0.6);backdrop-filter:blur(12px);
    padding:6px;border-radius:50px;border:1px solid var(--border);
  }
  .nav-link{
    text-decoration:none;color:rgba(240,240,255,0.7);font-weight:500;font-size:0.9rem;
    padding:7px 16px;border-radius:50px;transition:all 0.3s var(--ease);
  }
  .nav-link:hover,.nav-link.active{color:var(--cyan);background:rgba(0,245,255,0.1);}

  .hamburger{
    display:none;flex-direction:column;gap:5px;cursor:pointer;
    background:none;border:none;padding:8px;z-index:1001;
  }
  .hamburger span{display:block;width:24px;height:2px;background:var(--white);border-radius:2px;transition:all 0.3s var(--ease);}
  .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
  .hamburger.open span:nth-child(2){opacity:0;}
  .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

  .nav-overlay{
    display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:999;
  }
  .nav-overlay.open{display:block;}

  @media(max-width:768px){
    .hamburger{display:flex;}
    .nav-menu{
      position:fixed;top:0;right:-100%;width:75%;max-width:300px;height:100vh;
      flex-direction:column;align-items:flex-start;gap:4px;
      padding:calc(var(--nav-h) + 20px) 20px 20px;
      border-radius:0;background:rgba(5,5,16,0.98);
      border-left:1px solid var(--border);z-index:1000;
      transition:right 0.35s var(--ease);
    }
    .nav-menu.open{right:0;}
    .nav-link{width:100%;font-size:1.1rem;padding:12px 16px;}
  }

  /* ===== FOOTER ===== */
  .site-footer{
    background:rgba(5,5,16,0.97);border-top:1px solid var(--border);
    padding:50px 5% 30px;margin-top:80px;
  }
  .footer-inner{max-width:1100px;margin:0 auto;text-align:center;}
  .footer-brand{font-size:1.8rem;font-weight:800;margin-bottom:24px;}
  .footer-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;margin-bottom:24px;}
  .footer-nav a{color:var(--gray);text-decoration:none;font-size:0.9rem;transition:color 0.3s;}
  .footer-nav a:hover{color:var(--cyan);}
  .footer-contact{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:28px;}
  .footer-contact a{
    color:var(--gray);text-decoration:none;font-size:0.85rem;
    padding:8px 16px;border:1px solid var(--border);border-radius:50px;
    transition:all 0.3s;
  }
  .footer-contact a:hover{color:var(--cyan);border-color:var(--cyan);}
  .footer-copy{font-size:0.8rem;color:var(--gray);}
  .footer-copy span{color:var(--cyan);}

  /* ===== UTILS ===== */
  @keyframes spin-slow{to{transform:rotate(360deg);}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
  @keyframes gradient-shift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}

  .gradient-text{
    background:linear-gradient(135deg,var(--cyan),var(--purple),var(--pink));
    background-size:200% 200%;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:gradient-shift 4s ease infinite;
  }
  .glass-card{
    background:var(--glass);backdrop-filter:blur(12px);
    border:1px solid var(--border);border-radius:16px;
  }
  .section-badge{
    display:inline-flex;align-items:center;gap:6px;
    padding:5px 14px;background:rgba(0,245,255,0.08);
    border:1px solid rgba(0,245,255,0.2);border-radius:50px;
    font-size:0.75rem;color:var(--cyan);letter-spacing:2px;
    text-transform:uppercase;font-family:var(--mono);margin-bottom:16px;
  }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.insertBefore(style, document.head.firstChild);
}

// Auto-inject on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  injectSharedCSS();
  injectNavbar();
  injectFooter();
});
