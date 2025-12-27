// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"Konfigurator", process:"Prozess", blog:"Blog", search:"Suche" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"Configurator", process:"Process", blog:"Blog", search:"Search" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"Configurator", process:"Süreç", blog:"Blog", search:"Ara" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"Configurator", process:"Processus", blog:"Blog", search:"Recherche" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";

  // Pagefind is ESM -> we load it via dynamic import (prevents import.meta errors)
  const PAGEFIND_MODULE_PATH = "/_pagefind/pagefind.js";

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

  function headerHTML(lang) {
    return `
      <style>
        :root{ --hdr-h:72px; --max:1180px; }

        .hdr{
          position:fixed; inset:0 0 auto 0;
          height:var(--hdr-h);
          z-index:100;
          background:transparent;
          pointer-events:none;

          transform: translateY(0);
          transition:
            transform .28s cubic-bezier(.2,.9,.2,1),
            background .18s ease,
            backdrop-filter .18s ease,
            -webkit-backdrop-filter .18s ease;
          will-change: transform;
        }
        .hdr.is-hidden{ transform: translateY(calc(-1 * var(--hdr-h))); }
        .hdr.is-scrolled{
          background: rgba(0,0,0,.10);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
        }

        .hdr-inner{
          pointer-events:auto;
          height:100%;
          width:min(var(--max), calc(100% - 40px));
          margin:0 auto;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
        }

        .brand{
          display:flex; align-items:center; gap:12px;
          color:#fff; text-decoration:none;
          font-weight:700; letter-spacing:.2px;
          min-width:200px;
        }
        .brand img{
          width:36px; height:36px;
          object-fit:contain;
          display:block;
          filter: drop-shadow(0 10px 26px rgba(0,0,0,.55));
        }
        .brand span{
          font-size:14px;
          opacity:.95;
          text-shadow: 0 10px 26px rgba(0,0,0,.55);
        }

        .right{ display:flex; align-items:center; gap:14px; }

        /* ==========================
           HEADER SEARCH (DROPDOWN)
           ========================== */
        .site-search{
          position:relative;
          display:flex;
          align-items:center;
          gap:10px;

          height:46px;
          width: min(460px, 46vw);
          padding:0 10px 0 16px;

          border-radius:18px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);

          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);

          box-shadow:
            0 14px 40px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.18);

          transition: background .2s ease, box-shadow .2s ease;

          /* IMPORTANT: keep above hero */
          z-index: 9999;
        }
        .site-search:hover{ background: rgba(255,255,255,.12); }

        .site-search input{
          flex:1;
          height:100%;
          border:0;
          outline:0;
          background:transparent;
          color:#fff;
          font-size:14px;
          font-weight:650;
          letter-spacing:.01em;
        }
        .site-search input::placeholder{
          color: rgba(255,255,255,.75);
          font-weight:500;
        }

        /* icon button INSIDE field */
        .site-search .search-icon{
          width:36px; height:36px;
          border:0;
          background:transparent;
          padding:0;
          cursor:pointer;
          display:grid;
          place-items:center;
        }
        .site-search .search-icon img{
          width:18px; height:18px;
          object-fit:contain;
          opacity:.9;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)) brightness(1.05);
          transition: opacity .15s ease, transform .15s ease;
        }
        .site-search .search-icon:hover img{ opacity:1; transform: scale(1.08); }

        /* Dropdown panel (does NOT push layout) */
        .search-dd{
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

          box-shadow:
            0 30px 90px rgba(0,0,0,.45),
            inset 0 1px 0 rgba(255,255,255,.10);

          padding: 10px;
          display:none;
        }
        .search-dd.is-open{ display:block; }

        .dd-row{
          display:block;
          padding: 12px 12px;
          border-radius: 14px;
          text-decoration:none;
          color: rgba(255,255,255,.92);
          transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
        }
        .dd-row:hover{
          background: rgba(255,255,255,.07);
          transform: translateY(-1px);
          color:#fff;
        }

        .dd-row.is-active{
          background: rgba(255,255,255,.18);
          box-shadow:
            0 12px 40px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.25);
          transform: translateY(-1px);
        }

        .dd-title{
          font-weight:850;
          letter-spacing:.01em;
          margin-bottom: 4px;
          line-height:1.2;
        }
        .dd-meta{
          font-size:12px;
          opacity:.75;
          line-height:1.35;
        }
        .dd-empty, .dd-loading{
          padding: 10px 12px;
          color: rgba(255,255,255,.80);
          font-weight:700;
        }

        /* style highlight tag (optional, looks better than raw <mark>) */
        .search-dd mark{
          background: rgba(255,255,255,.12);
          color:#fff;
          border-radius:6px;
          padding:0 4px;
        }

        @media (max-width: 820px){
          .site-search{ display:none; }
        }

        .langs{
          display:flex; align-items:center; gap:8px;
          color:#fff; font-weight:800; font-size:12px;
          letter-spacing:.08em; text-transform:uppercase;
          text-shadow: 0 10px 26px rgba(0,0,0,.55);
          user-select:none;
        }
        .langs a{ color:#fff; opacity:.70; text-decoration:none; }
        .langs a.is-active{ opacity:1; }
        .langs .sep{ opacity:.35; font-weight:700; }

        .burger{
          width:42px; height:42px;
          display:grid; place-items:center;
          border:0; background:transparent;
          cursor:pointer; padding:0;
        }
        .burger .icon{
          width:22px; height:14px;
          display:flex; flex-direction:column;
          justify-content:space-between;
          filter: drop-shadow(0 10px 26px rgba(0,0,0,.55));
        }
        .burger .icon i{
          display:block; height:2px;
          border-radius:999px;
          background:rgba(255,255,255,.95);
        }

        .overlay{
          position:fixed; inset:0;
          background:
            radial-gradient(900px 700px at 80% 15%, rgba(255,255,255,.08), rgba(0,0,0,.02)),
            rgba(0,0,0,.02);
          opacity:0;
          pointer-events:none;
          transition: opacity .10s ease;
          z-index:200;
        }
        .overlay.is-open{ opacity:1; pointer-events:auto; }

        .drawer{
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
        .drawer.is-open{ transform: translateX(0); }

        .drawer-top{
          display:flex; align-items:center; justify-content:space-between;
          gap:12px; margin-bottom:12px; color:#fff;
        }
        .drawer-top .title{ font-weight:900; letter-spacing:.02em; }

        .close{
          width:42px; height:42px;
          border-radius:14px;
          border:0;
          background: rgba(255,255,255,.05);
          color:#fff;
          cursor:pointer;
          box-shadow: 0 12px 30px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.14);
        }

        .drawer nav{ display:flex; flex-direction:column; gap:6px; padding-top:6px; }
        .drawer nav a{
          padding:14px 10px;
          border-radius:14px;
          color:rgba(255,255,255,.92);
          text-decoration:none;
          font-weight:850;
        }
        .drawer nav a:hover{ background: rgba(255,255,255,.07); }

        @media (max-width: 520px){
          .brand span{ display:none; }
          .langs{ display:none; }
        }
      </style>

      <div class="hdr">
        <div class="hdr-inner">
          <a class="brand" href="${ROUTES[lang].home}" aria-label="Homepage">
            <img src="${LOGO_SRC}" alt="DVAYD Publishing Logo" />
            <span>DVAYD Publishing</span>
          </a>

          <div class="right">
            <!-- NOTE: no action, no redirect -->
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
              <div class="search-dd" id="site-search-dd" aria-label="Suchergebnisse"></div>
            </form>

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

  function escapeHTML(s) {
    return String(s || "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function init() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const lang = getLang();
    mount.innerHTML = headerHTML(lang);

    const hdr = mount.querySelector(".hdr");
    const overlay = mount.querySelector("[data-overlay]");
    const drawer = mount.querySelector("[data-drawer]");
    const burger = mount.querySelector(".burger");
    const closeBtn = mount.querySelector("[data-close]");

    /* ==========================
       MENU OPEN/CLOSE
       ========================== */
    const openMenu = () => {
      burger.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-open");
      drawer.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      hdr.classList.remove("is-hidden");
    };
    const closeMenu = () => {
      burger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-open");
      drawer.classList.remove("is-open");
      document.documentElement.style.overflow = "";
    };

    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    overlay.addEventListener("click", closeMenu);
    closeBtn.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    /* ==========================
       LANG SWITCH
       ========================== */
    const path = location.pathname;
    const pageKey = getPageKey(path, lang);
    mount.querySelectorAll("[data-lang]").forEach(a => {
      const targetLang = a.dataset.lang;
      a.href = (ROUTES[targetLang] && ROUTES[targetLang][pageKey]) || ROUTES[targetLang].home;
      a.classList.toggle("is-active", targetLang === lang);
    });

    /* ==========================
       HEADER HIDE/SHOW ON SCROLL
       ========================== */
    let lastY = window.scrollY || 0;
    let ticking = false;

    const SCROLL_ON_AT = 8;
    const HIDE_AFTER = 120;
    const DELTA = 6;

    function onScroll() {
      const y = window.scrollY || 0;
      const menuOpen = burger.getAttribute("aria-expanded") === "true";

      hdr.classList.toggle("is-scrolled", y > SCROLL_ON_AT);

      if (menuOpen) { lastY = y; return; }

      const diff = y - lastY;
      if (Math.abs(diff) < DELTA) return;

      if (diff > 0 && y > HIDE_AFTER) hdr.classList.add("is-hidden");
      else hdr.classList.remove("is-hidden");

      lastY = y;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });

    onScroll();

    /* ==========================
       PAGEFIND DROPDOWN SEARCH
       ========================== */
    const form = mount.querySelector(".site-search");
    const input = mount.querySelector("#site-search-input");
    const dd = mount.querySelector("#site-search-dd");
    if (!form || !input || !dd) return;

    let pf = null;
    let pfLoading = false;

    async function ensurePagefind() {
      if (pf) return pf;
      if (pfLoading) return null;
      pfLoading = true;

      try {
        // ESM dynamic import
        const mod = await import(PAGEFIND_MODULE_PATH);
        // normalize export
        pf = mod?.default ?? mod;
        return pf;
      } catch (e) {
        console.error("Pagefind failed to load:", e);
        pf = null;
        return null;
      } finally {
        pfLoading = false;
      }
    }

    function openDD() { dd.classList.add("is-open"); }
    function closeDD() {
      dd.classList.remove("is-open");
      dd.innerHTML = "";
      dd.querySelectorAll(".dd-row.is-active").forEach(x => x.classList.remove("is-active"));
    }

    function setActive(el) {
      dd.querySelectorAll(".dd-row.is-active").forEach(x => x.classList.remove("is-active"));
      if (el) el.classList.add("is-active");
    }

    async function runSearch(q) {
      const query = (q || "").trim();
      if (!query) { closeDD(); return; }

      openDD();
      dd.innerHTML = `<div class="dd-loading">Suche…</div>`;

      const pagefind = await ensurePagefind();
      if (!pagefind || typeof pagefind.search !== "function") {
        dd.innerHTML = `<div class="dd-empty">Pagefind konnte nicht geladen werden.</div>`;
        return;
      }

      try {
        const res = await pagefind.search(query);
        const results = (res && res.results) ? res.results : [];

        if (!results.length) {
          dd.innerHTML = `<div class="dd-empty">Keine Ergebnisse für „${escapeHTML(query)}“</div>`;
          return;
        }

        const top = results.slice(0, 6);
        const data = await Promise.all(top.map(r => r.data()));

        dd.innerHTML = data.map((d) => {
          const url = d.url || "#";
          const title = escapeHTML(d.meta?.title || d.title || url);
          // excerpt may contain <mark> from pagefind – we keep it and style it
          const excerpt = (d.excerpt || "").trim();

          return `
            <a class="dd-row" href="${url}">
              <div class="dd-title">${title}</div>
              <div class="dd-meta">${excerpt ? excerpt : escapeHTML(url)}</div>
            </a>
          `;
        }).join("");

        // click highlight
        dd.querySelectorAll(".dd-row").forEach(a => {
          a.addEventListener("click", () => setActive(a));
        });

      } catch (e) {
        console.error("Pagefind search error:", e);
        dd.innerHTML = `<div class="dd-empty">Fehler bei der Suche.</div>`;
      }
    }

    const runSearchDebounced = debounce(runSearch, 220);

    // prevent redirect
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      runSearch(input.value);
    });

    input.addEventListener("focus", () => {
      // pre-load module when user interacts
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
