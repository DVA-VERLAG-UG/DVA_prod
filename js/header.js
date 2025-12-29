// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"Konfigurator", process:"Prozess", blog:"Blog", search:"Suche", theme:"Dim" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"Configurator", process:"Process", blog:"Blog", search:"Search", theme:"Dim" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"Configurator", process:"Süreç", blog:"Blog", search:"Ara", theme:"Dim" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"Configurator", process:"Processus", blog:"Blog", search:"Recherche", theme:"Dim" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";
  const PAGEFIND_MODULE_PATH = "/_pagefind/pagefind.js";

  // ✅ NEW: make sure header.css is actually loaded (since header.js doesn't "reference" CSS)
  const HEADER_CSS_HREF = "/assets/css/header.css";
  function ensureHeaderCSS() {
    const existing = document.querySelector(`link[rel="stylesheet"][href="${HEADER_CSS_HREF}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HEADER_CSS_HREF;
    link.media = "all";
    document.head.appendChild(link);
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

  // ===== THEME HELPERS =====
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
    return `
      <div class="hdr">
        <div class="hdr-inner">
          <a class="brand" href="${ROUTES[lang].home}" aria-label="Homepage">
            <img src="${LOGO_SRC}" alt="DVAYD Publishing Logo" />
            <span>DVAYD Publishing</span>
          </a>

          <div class="right">
            <form class="site-search" role="search" autocomplete="off">
              <input
                id="site-search-input"
                type="search"
                placeholder="Suchbegriff eingeben"
                aria-label="${LABELS[lang].search}"
              />
              <button type="submit" class="search-icon" aria-label="${LABELS[lang].search}">
                <img src="/assets/icons/lupe.png" alt="" />
              </button>
              <div class="search-dd" id="site-search-dd"></div>
            </form>

            <button class="theme-btn" id="themeToggle" type="button" aria-label="Toggle dim mode" title="${LABELS[lang].theme}">
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
          <a href="${ROUTES[lang].about}">${LABELS[lang].about}</a>
          <a href="${ROUTES[lang].projects}">${LABELS[lang].projects}</a>
          <a href="${ROUTES[lang].services}">${LABELS[lang].services}</a>
          <a href="${ROUTES[lang].process}">${LABELS[lang].process}</a>
          <a href="${ROUTES[lang].blog}">${LABELS[lang].blog}</a>
          <a href="${ROUTES[lang].contact}">${LABELS[lang].contact}</a>
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
    // ✅ ensure header.css is loaded (works even if you forget to add <link> in some pages)
    ensureHeaderCSS();

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

    // Recalc on resize + when header layout changes (search wraps, etc.)
    window.addEventListener("resize", syncHeaderHeight);

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => syncHeaderHeight());
      ro.observe(hdr);
    }


    

    // ===== THEME TOGGLE wiring =====
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

    function setActive(el){
      dd.querySelectorAll(".dd-row.is-active").forEach(x => x.classList.remove("is-active"));
      if (el) el.classList.add("is-active");
    }

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

        dd.querySelectorAll(".dd-row").forEach(a => {
          a.addEventListener("click", () => setActive(a));
        });

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
