// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"Konfigurator", process:"Prozess", blog:"Blog", search:"Suche", theme:"Dim", search_ph:"Suchbegriff eingeben" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"Configurator", process:"Process", blog:"Blog", search:"Search", theme:"Dim", search_ph:"Search…" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"Configurator", process:"Süreç", blog:"Blog", search:"Ara", theme:"Dim", search_ph:"Ara…" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"Configurator", process:"Processus", blog:"Blog", search:"Recherche", theme:"Dim", search_ph:"Rechercher…" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";
  const PAGEFIND_MODULE_PATH = "/_pagefind/pagefind.js";

// Inject header.css directly from JS (so we can delete /assets/css/header.css)
function injectHeaderCSS() {
  if (document.getElementById("dvayd-header-css")) return;

  const style = document.createElement("style");
  style.id = "dvayd-header-css";

  // ✅ PASTE your entire header.css content INSIDE the template string below
  style.textContent = `
/* /assets/css/header.css */

/* Root vars (global ok) */
:root{ --hdr-h:72px; --max:1180px; }

/* =========================================================
   SCOPE: Alles nur im Header-Mount, damit style.css nicht funkt
   ========================================================= */
#site-header .hdr{
  position:fixed;
  inset:0 0 auto 0;
  height:var(--hdr-h);
  z-index:100;
  background:transparent;
  pointer-events:none;
  transform: translateY(0);
  transition: transform .28s cubic-bezier(.2,.9,.2,1), background .18s ease, backdrop-filter .18s ease;
  will-change: transform;
}
#site-header .hdr.is-hidden{ transform: translateY(calc(-1 * var(--hdr-h))); }
#site-header .hdr.is-scrolled{
  background: rgba(0,0,0,.10);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
}

#site-header .hdr-inner{
  pointer-events:auto;
  height:100%;
  width:min(var(--max), calc(100% - 40px));
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;

  /* wichtig gegen Overflows */
  min-width:0;
}

/* =========================
   BRAND
   ========================= */
#site-header .brand{
  display:flex; align-items:center; gap:12px;
  color:#fff; text-decoration:none;
  font-weight:700; letter-spacing:.2px;
  min-width:200px;
  flex: 0 0 auto;
}
#site-header .brand img{
  width:36px; height:36px;
  object-fit:contain;
  display:block;
  filter: drop-shadow(0 10px 26px rgba(0,0,0,.55));
}
#site-header .brand span{
  font-size:14px;
  opacity:.95;
  text-shadow: 0 10px 26px rgba(0,0,0,.55);
}

/* =========================
   RIGHT AREA
   ========================= */
#site-header .right{
  display:flex;
  align-items:center;
  gap:12px;
  flex: 1 1 auto;
  justify-content:flex-end;

  /* wichtig: verhindert, dass children das Logo überdecken */
  min-width:0;
}

/* =========================
   SEARCH (Dropdown)
   ========================= */
#site-header .site-search{
  position:relative;
  display:flex;
  align-items:center;
  gap:10px;

  height:46px;
  width: min(420px, 42vw);
  padding:0 10px 0 16px;

  border-radius:18px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);

  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);

  box-shadow: 0 14px 40px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.18);
  transition: background .2s ease, box-shadow .2s ease;

  z-index: 9999;

  /* wichtig in Flex-Kontext */
  min-width:0;
}
#site-header .site-search:hover{ background: rgba(255,255,255,.12); }

#site-header .site-search input{
  flex:1;
  min-width:0; /* verhindert rausdrücken */
  height:100%;
  border:0;
  outline:0;
  background:transparent;
  color:#fff;
  font-size:14px;
  font-weight:650;
  letter-spacing:.01em;
}
#site-header .site-search input::placeholder{
  color: rgba(255,255,255,.75);
  font-weight:500;
}

#site-header .site-search .search-icon{
  width:36px;
  height:36px;
  border:0;
  background:transparent;
  padding:0;
  cursor:pointer;
  display:grid;
  place-items:center;
  flex: 0 0 auto;
}
#site-header .site-search .search-icon img{
  width:18px;
  height:18px;
  object-fit:contain;
  opacity:.9;
  filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)) brightness(1.05);
  transition: opacity .15s ease, transform .15s ease;
}
#site-header .site-search .search-icon:hover img{ opacity:1; transform: scale(1.08); }

#site-header .search-dd{
  position:absolute;
  top: calc(100% + 10px);
  right:0;
  width: 100%;
  max-height: 52vh;
  overflow:auto;

  border-radius:18px;
  background: rgba(0,0,0,.55);
  border: 1px solid rgba(255,255,255,.12);

  backdrop-filter: blur(18px) saturate(1.35);
  -webkit-backdrop-filter: blur(18px) saturate(1.35);

  box-shadow: 0 30px 90px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.10);

  padding: 10px;
  display:none;
}
#site-header .search-dd.is-open{ display:block; }

#site-header .dd-row{
  display:block;
  padding: 12px 12px;
  border-radius: 14px;
  text-decoration:none;
  color: rgba(255,255,255,.92);
  transition: background .15s ease, transform .15s ease;
}
#site-header .dd-row:hover{ background: rgba(255,255,255,.07); transform: translateY(-1px); color:#fff; }
#site-header .dd-row.is-active{
  background: rgba(255,255,255,.18);
  box-shadow: 0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.25);
}
#site-header .dd-title{ font-weight:850; letter-spacing:.01em; margin-bottom: 4px; line-height:1.2; }
#site-header .dd-meta{ font-size:12px; opacity:.75; line-height:1.35; }
#site-header .dd-empty,
#site-header .dd-loading{ padding: 10px 12px; color: rgba(255,255,255,.80); font-weight:700; }

#site-header .search-dd mark{
  background: rgba(255,255,255,.12);
  color:#fff;
  border-radius:6px;
  padding:0 4px;
}

/* =========================
   THEME TOGGLE
   ========================= */
#site-header .theme-btn{
  width:42px; height:42px;
  display:grid; place-items:center;
  border-radius:14px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  color:#fff;
  cursor:pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.12);
  filter: drop-shadow(0 10px 26px rgba(0,0,0,.25));
  transition: transform .15s ease, filter .15s ease, background .15s ease;
  flex: 0 0 auto;
}
#site-header .theme-btn:hover{
  filter: brightness(1.08) drop-shadow(0 10px 26px rgba(0,0,0,.25));
  transform: translateY(-1px);
}
#site-header .theme-btn .sun{ display:none; }
#site-header .theme-btn.is-dim .moon{ display:none; }
#site-header .theme-btn.is-dim .sun{ display:block; }
#site-header .theme-btn:not(.is-dim) .moon{ display:block; }

/* =========================
   LANGS + BURGER
   ========================= */
#site-header .langs{
  display:flex; align-items:center; gap:8px;
  color:#fff; font-weight:800; font-size:12px;
  letter-spacing:.08em; text-transform:uppercase;
  text-shadow: 0 10px 26px rgba(0,0,0,.55);
  user-select:none;
  flex: 0 0 auto;
}
#site-header .langs a{ color:#fff; opacity:.70; text-decoration:none; }
#site-header .langs a.is-active{ opacity:1; }
#site-header .langs .sep{ opacity:.35; font-weight:700; }

#site-header .burger{
  width:42px; height:42px;
  display:grid; place-items:center;
  border:0; background:transparent;
  cursor:pointer; padding:0;
  flex: 0 0 auto;
}
#site-header .burger .icon{
  width:22px; height:14px;
  display:flex; flex-direction:column;
  justify-content:space-between;
  filter: drop-shadow(0 10px 26px rgba(0,0,0,.55));
}
#site-header .burger .icon i{
  display:block; height:2px;
  border-radius:999px;
  background:rgba(255,255,255,.95);
}

/* =========================
   OVERLAY + DRAWER
   ========================= */
#site-header .overlay{
  position:fixed; inset:0;
  background: radial-gradient(900px 700px at 80% 15%, rgba(255,255,255,.08), rgba(0,0,0,.02)), rgba(0,0,0,.02);
  opacity:0;
  pointer-events:none;
  transition: opacity .10s ease;
  z-index:200;
}
#site-header .overlay.is-open{ opacity:1; pointer-events:auto; }

#site-header .drawer{
  position:fixed; top:0; right:0;
  height:100%;
  width:min(380px, 90vw);
  padding:18px 18px 22px;
  z-index:201;

  background:
    linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,.015)),
    radial-gradient(900px 650px at 30% 10%, rgba(255,255,255,.008), rgba(255,255,255,0)),
    radial-gradient(900px 700px at 80% 80%, rgba(120,190,255,.04), rgba(0,0,0,0));
  border-left: 1px solid rgba(255,255,255,.10);

  box-shadow: -16px 0 60px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.14);

  backdrop-filter: blur(26px) saturate(1.55);
  -webkit-backdrop-filter: blur(26px) saturate(1.55);

  transform: translateX(112%);
  transition: transform .55s cubic-bezier(.16, 1, .12, 1);
}
#site-header .drawer.is-open{ transform: translateX(0); }

#site-header .drawer-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:12px;
  color:#fff;
}
#site-header .drawer-top .title{ font-weight:900; letter-spacing:.02em; }

#site-header .close{
  width:42px; height:42px;
  border-radius:14px;
  border:0;
  background: rgba(255,255,255,.05);
  color:#fff;
  cursor:pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.14);
}

#site-header .drawer nav{ display:flex; flex-direction:column; gap:6px; padding-top:6px; }
#site-header .drawer nav a{
  padding:14px 10px;
  border-radius:14px;
  color:rgba(255,255,255,.92);
  text-decoration:none;
  font-weight:850;
}
#site-header .drawer nav a:hover{ background: rgba(255,255,255,.07); }

/* =========================
   RESPONSIVE
   ========================= */

/* Tablet: Suche bleibt sichtbar, aber kleiner */
@media (max-width: 980px){
  #site-header .site-search{
    width: min(320px, 36vw);
    height: 44px;
  }
}

/* <= 820px: NICHT verstecken, nur kompakter */
@media (max-width: 820px){
  #site-header .site-search{ display:flex; }
  #site-header .brand{ min-width: 0; }
}

/* <= 520px: EINE ZEILE: Logo | Suche | Mond | Burger */
@media (max-width: 520px){
  #site-header .hdr{ height:auto; }
  #site-header .hdr-inner{
    height:auto;
    width: calc(100% - 24px);
    flex-wrap: nowrap;
    gap:10px;
    padding: 10px 0;
  }

  #site-header .brand{ min-width:0; }
  #site-header .brand span{ display:none; }
  #site-header .langs{ display:none; }

  /* Suche füllt die Mitte sauber */
  #site-header .site-search{
    flex: 1 1 auto;
    width: auto;
    min-width: 0;
    height: 38px;
    border-radius: 999px;
    padding: 0 10px 0 12px;
  }
  #site-header .site-search input{
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #site-header .theme-btn{ width:40px; height:40px; }
  #site-header .burger{ width:40px; height:40px; }

  #site-header .search-dd{ left:0; right:0; width:100%; }
}

/* super kleine Geräte */
@media (max-width: 360px){
  #site-header .site-search{ height: 36px; }
  #site-header .site-search .search-icon{ width:32px; height:32px; }
}


  `;

  document.head.appendChild(style);
}


  const THEME_KEY  = "dvayd_theme";
  const DIM_VALUE  = "dim";
  const THEME_ATTR = "data-theme"; // <html data-theme="dim">

  function getLang() {
    const m = location.pathname.match(/^\/(de|en|tr|fr)(\/|$)/);
    return m ? m[1] : "de";
  }

  function getPageKey(path, lang) {
    const r = ROUTES[lang];
    for (const [k, v] of Object.entries(r)) {
      if (path === v || path.startsWith(v)) return k;
    }
    return "home";
  }

  // Theme helpers
  function getStoredTheme(){
    try { return localStorage.getItem(THEME_KEY) || ""; } catch { return ""; }
  }
  function setStoredTheme(v){
    try { localStorage.setItem(THEME_KEY, v); } catch {}
  }
  function applyTheme(v){
    const root = document.documentElement;
    if (v === DIM_VALUE) root.setAttribute(THEME_ATTR, DIM_VALUE);
    else root.removeAttribute(THEME_ATTR);
  }
  function isDimActive(){
    return document.documentElement.getAttribute(THEME_ATTR) === DIM_VALUE;
  }

  function headerHTML(lang) {
    const L = LABELS[lang] || LABELS.de;

    return `
      <div class="hdr">
        <div class="hdr-inner">
          <a class="brand" href="${ROUTES[lang].home}" aria-label="Homepage">
            <img src="${LOGO_SRC}" alt="DVAYD Publishing Logo" />
            <span>DVAYD Publishing</span>
          </a>

          <div class="right">

            <!-- ✅ WRAPPER: lets us keep search visible on mobile -->
            <div class="hdr-search">
              <form class="site-search" role="search" autocomplete="off">
                <input
                  id="site-search-input"
                  type="search"
                  placeholder="${L.search_ph}"
                  aria-label="${L.search}"
                />
                <button type="submit" class="search-icon" aria-label="${L.search}">
                  <img src="/assets/icons/lupe.png" alt="" />
                </button>
                <div class="search-dd" id="site-search-dd"></div>
              </form>
            </div>

            <button class="theme-btn" id="themeToggle" type="button" aria-label="Toggle dim mode" title="${L.theme}">
              <span class="moon" aria-hidden="true">🌙</span>
              <span class="sun" aria-hidden="true">☀️</span>
            </button>

            <div class="langs" aria-label="Language switch">
              <a data-lang="de">DE</a><span class="sep">|</span>
              <a data-lang="en">EN</a><span class="sep">|</span>
              <a data-lang="tr">TR</a><span class="sep">|</span>
              <a data-lang="fr">FR</a>
            </div>

            <button class="burger" type="button" aria-label="Menu" aria-expanded="false">
              <span class="icon" aria-hidden="true"><i></i><i></i><i></i></span>
            </button>
          </div>
        </div>
      </div>

      <div class="overlay" data-overlay></div>

      <aside class="drawer" data-drawer aria-label="Menu">
        <div class="drawer-top">
          <div class="title">Menü</div>
          <button class="close" type="button" data-close aria-label="Close">✕</button>
        </div>
        <nav>
          <a href="${ROUTES[lang].about}">${L.about}</a>
          <a href="${ROUTES[lang].projects}">${L.projects}</a>
          <a href="${ROUTES[lang].services}">${L.services}</a>
          <a href="${ROUTES[lang].process}">${L.process}</a>
          <a href="${ROUTES[lang].blog}">${L.blog}</a>
          <a href="${ROUTES[lang].contact}">${L.contact}</a>
        </nav>
      </aside>
    `;
  }

  function debounce(fn, wait = 180) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function init() {
    injectHeaderCSS();

    const mount = document.getElementById("site-header");
    if (!mount) return;

    // apply stored theme ASAP
    const stored = getStoredTheme();
    applyTheme(stored);

    const lang = getLang();
    mount.innerHTML = headerHTML(lang);

    const hdr = mount.querySelector(".hdr");
    const overlay = mount.querySelector("[data-overlay]");
    const drawer = mount.querySelector("[data-drawer]");
    const burger = mount.querySelector(".burger");
    const closeBtn = mount.querySelector("[data-close]");

    // ===== Sync CSS var --hdr-h to real header height =====
    function syncHeaderHeight(){
      if (!hdr) return;
      const h = Math.round(hdr.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--hdr-h", `${h}px`);
    }
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => syncHeaderHeight());
      ro.observe(hdr);
    }

    // ===== Theme toggle =====
    const themeBtn = mount.querySelector("#themeToggle");
    const syncThemeBtn = () => {
      if (!themeBtn) return;
      themeBtn.classList.toggle("is-dim", isDimActive());
      themeBtn.setAttribute("aria-pressed", isDimActive() ? "true" : "false");
    };
    syncThemeBtn();

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const next = isDimActive() ? "" : DIM_VALUE;
        applyTheme(next);
        setStoredTheme(next);
        syncThemeBtn();
      });
    }

    // ===== Drawer open/close =====
    const openMenu = () => {
      burger.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-open");
      drawer.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      hdr?.classList.remove("is-hidden");
    };
    const closeMenu = () => {
      burger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-open");
      drawer.classList.remove("is-open");
      document.documentElement.style.overflow = "";
    };

    burger?.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    overlay?.addEventListener("click", closeMenu);
    closeBtn?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    // ===== Active language link =====
    const path = location.pathname;
    const pageKey = getPageKey(path, lang);
    mount.querySelectorAll("[data-lang]").forEach(a => {
      const targetLang = a.dataset.lang;
      a.href = (ROUTES[targetLang] && ROUTES[targetLang][pageKey]) || ROUTES[targetLang].home;
      a.classList.toggle("is-active", targetLang === lang);
    });

    // ===== Header hide/show on scroll =====
    let lastY = window.scrollY || 0;
    let ticking = false;
    const SCROLL_ON_AT = 8, HIDE_AFTER = 120, DELTA = 6;

    function onScroll() {
      const y = window.scrollY || 0;
      const menuOpen = burger?.getAttribute("aria-expanded") === "true";
      hdr?.classList.toggle("is-scrolled", y > SCROLL_ON_AT);
      if (menuOpen) { lastY = y; return; }
      const diff = y - lastY;
      if (Math.abs(diff) < DELTA) return;
      if (diff > 0 && y > HIDE_AFTER) hdr?.classList.add("is-hidden");
      else hdr?.classList.remove("is-hidden");
      lastY = y;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    onScroll();

    // ===== Pagefind dropdown search =====
    const form = mount.querySelector(".site-search");
    const input = mount.querySelector("#site-search-input");
    const dd = mount.querySelector("#site-search-dd");
    if (!form || !input || !dd) return;

    let pagefindMod = null;
    let pagefindLoading = false;

    async function ensurePagefind() {
      if (pagefindMod) return pagefindMod;
      if (pagefindLoading) return null;
      pagefindLoading = true;

      try {
        pagefindMod = await import(PAGEFIND_MODULE_PATH);
        pagefindMod = pagefindMod?.default ? pagefindMod.default : pagefindMod;
        return pagefindMod;
      } catch (e) {
        console.error("Pagefind failed to load:", e);
        dd.classList.add("is-open");
        dd.innerHTML = `<div class="dd-empty">Pagefind konnte nicht geladen werden.</div>`;
        return null;
      } finally {
        pagefindLoading = false;
      }
    }

    function openDD(){ dd.classList.add("is-open"); }
    function closeDD(){ dd.classList.remove("is-open"); dd.innerHTML = ""; }

    function escapeHTML(s) {
      return String(s || "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }

    async function runSearch(q) {
      q = (q || "").trim();
      if (!q) { closeDD(); return; }

      openDD();
      dd.innerHTML = `<div class="dd-loading">Suche…</div>`;

      const pf = await ensurePagefind();
      if (!pf || typeof pf.search !== "function") {
        dd.innerHTML = `<div class="dd-empty">Pagefind konnte nicht geladen werden.</div>`;
        return;
      }

      try {
        const res = await pf.search(q);
        const results = res?.results || [];

        if (!results.length) {
          dd.innerHTML = `<div class="dd-empty">Keine Ergebnisse für „${escapeHTML(q)}“</div>`;
          return;
        }

        const top = results.slice(0, 6);
        const data = await Promise.all(top.map(r => r.data()));

        dd.innerHTML = data.map(d => {
          const url = d.url || "#";
          const title = escapeHTML(d.meta?.title || d.title || url);
          const excerpt = (d.excerpt || "").trim(); // can contain <mark>
          const niceUrl = escapeHTML(url);

          return `
            <a class="dd-row" href="${url}">
              <div class="dd-title">${title}</div>
              <div class="dd-meta">${excerpt ? excerpt : niceUrl}</div>
            </a>
          `;
        }).join("");

      } catch (e) {
        console.error("Pagefind search error:", e);
        dd.innerHTML = `<div class="dd-empty">Fehler bei der Suche.</div>`;
      }
    }

    const runSearchDebounced = debounce(runSearch, 220);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      runSearch(input.value);
    });

    input.addEventListener("focus", () => {
      ensurePagefind();
      if (dd.innerHTML.trim()) openDD();
    });

    input.addEventListener("input", () => {
      runSearchDebounced(input.value);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDD();
    });

    document.addEventListener("click", (e) => {
      if (!form.contains(e.target)) closeDD();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
