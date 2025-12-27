// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"Konfigurator", process:"Prozess", blog:"Blog", search:"Suche", placeholder:"Suchbegriff eingeben", noResults:"Keine Ergebnisse" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"Configurator", process:"Process", blog:"Blog", search:"Search", placeholder:"Type to search", noResults:"No results" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"Konfigüratör", process:"Süreç", blog:"Blog", search:"Ara", placeholder:"Arama terimi girin", noResults:"Sonuç yok" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"Configurateur", process:"Processus", blog:"Blog", search:"Recherche", placeholder:"Entrez un mot-clé", noResults:"Aucun résultat" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";
  const SEARCH_ICON = "/assets/icons/lupe.png";

  // If you still keep /search/ as a dedicated page, you can keep this link in the drawer:
  const SEARCH_PAGE = "/search/";

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
    const t = LABELS[lang] || LABELS.de;

    return `
      <style>
        :root{ --hdr-h:72px; --max:1180px; }

        .hdr{
          position:fixed;
          inset:0 0 auto 0;
          height:var(--hdr-h);
          z-index:9999; /* keep header ALWAYS above page content */
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
          font-weight:700;
          letter-spacing:.2px;
          min-width: 200px;
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

        .right{
          display:flex;
          align-items:center;
          justify-content:flex-end;
          gap:14px;
          min-width: 420px;
        }

        /* ==========================
           HEADER SEARCH (INLINE + DROPDOWN)
           ========================== */
        .site-search{
          position:relative;
          display:flex;
          align-items:center;
          gap:10px;

          height:46px;
          width: min(520px, 45vw); /* wider */
          padding:0 10px 0 14px;

          border-radius:18px;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.16);

          backdrop-filter: blur(16px) saturate(1.5);
          -webkit-backdrop-filter: blur(16px) saturate(1.5);

          box-shadow:
            0 16px 46px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.18);

          transition: background .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .site-search:focus-within{
          background: rgba(255,255,255,.14);
          border-color: rgba(255,255,255,.22);
          box-shadow:
            0 20px 62px rgba(0,0,0,.26),
            inset 0 1px 0 rgba(255,255,255,.20);
        }

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
          min-width: 180px;
        }
        .site-search input::placeholder{
          color: rgba(255,255,255,.75);
          font-weight:550;
        }

        /* icon inside field (no button border) */
        .site-search .search-icon{
          width:36px;
          height:36px;
          border:0;
          background:transparent;
          padding:0;
          cursor:pointer;
          display:grid;
          place-items:center;
          border-radius:12px;
        }
        .site-search .search-icon img{
          width:18px;
          height:18px;
          object-fit:contain;
          opacity:.92;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)) brightness(1.05);
          transition: opacity .15s ease, transform .15s ease;
        }
        .site-search .search-icon:hover img{
          opacity:1;
          transform: scale(1.08);
        }

        /* dropdown results */
        .search-dd{
          position:absolute;
          top: calc(100% + 10px);
          right:0;
          width: 100%;
          max-height: min(62vh, 520px);
          overflow:auto;

          z-index:10000; /* ABOVE header + everything */
          display:none;

          border-radius:18px;
          background: rgba(0,0,0,.55);
          border: 1px solid rgba(255,255,255,.14);

          backdrop-filter: blur(20px) saturate(1.6);
          -webkit-backdrop-filter: blur(20px) saturate(1.6);

          box-shadow:
            0 30px 90px rgba(0,0,0,.50),
            inset 0 1px 0 rgba(255,255,255,.12);
        }
        .search-dd.is-open{ display:block; }

        .search-dd .dd-head{
          padding: 10px 12px 8px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          color: rgba(255,255,255,.85);
          font-weight:750;
          font-size:12px;
          letter-spacing:.02em;
        }
        .search-dd .dd-clear{
          border:0;
          background: rgba(255,255,255,.08);
          color:#fff;
          font-weight:800;
          font-size:12px;
          padding:8px 10px;
          border-radius:12px;
          cursor:pointer;
        }
        .search-dd .dd-clear:hover{ filter: brightness(1.08); }

        .search-dd .dd-list{
          padding: 0 8px 10px;
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .search-dd a.dd-item{
          display:block;
          padding: 12px 12px;
          border-radius:14px;
          text-decoration:none;
          color:#fff;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .search-dd a.dd-item:hover{
          background: rgba(255,255,255,.09);
          border-color: rgba(255,255,255,.14);
          transform: translateY(-1px);
        }
        .search-dd .dd-title{
          font-weight:900;
          font-size:13px;
          letter-spacing:.01em;
          margin-bottom:4px;
        }
        .search-dd .dd-url{
          font-size:11px;
          opacity:.70;
          margin-bottom:6px;
          word-break: break-all;
        }
        .search-dd .dd-excerpt{
          font-size:12px;
          line-height:1.35;
          opacity:.88;
        }

        .search-dd .dd-empty{
          padding: 14px 12px 16px;
          color: rgba(255,255,255,.85);
          font-weight:700;
        }

        /* languages */
        .langs{
          display:flex; align-items:center; gap:8px;
          color:#fff; font-weight:800; font-size:12px;
          letter-spacing:.08em; text-transform:uppercase;
          text-shadow: 0 10px 26px rgba(0,0,0,.55);
          user-select:none;
          white-space: nowrap;
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

          box-shadow:
            -16px 0 60px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.14);

          backdrop-filter: blur(2px) saturate(1.55);
          -webkit-backdrop-filter: blur(26px) saturate(1.55);

          transform: translateX(112%);
          transition: transform .55s cubic-bezier(.16, 1, .12, 1);
        }
        .drawer.is-open{ transform: translateX(0); }

        .drawer-top{
          position:relative;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:12px;
          color:#fff;
        }
        .drawer-top .title{
          font-weight:900;
          letter-spacing:.02em;
          text-shadow: 0 12px 28px rgba(0,0,0,.28);
        }

        .close{
          width:42px; height:42px;
          border-radius:14px;
          border:0;
          background: rgba(255,255,255,.05);
          color:#fff;
          cursor:pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 12px 30px rgba(0,0,0,.20),
            inset 0 1px 0 rgba(255,255,255,.14);
        }
        .close:hover{ filter: brightness(1.08); }

        .drawer nav{
          position:relative;
          display:flex;
          flex-direction:column;
          gap:6px;
          padding-top:6px;
        }
        .drawer nav a{
          padding:14px 10px;
          border-radius:14px;
          color:rgba(255,255,255,.92);
          text-decoration:none;
          font-weight:850;
          letter-spacing:.01em;
          background: transparent;
          transition: background .20s ease, transform .20s ease, color .20s ease;
        }
        .drawer nav a:hover{
          background: rgba(255,255,255,.07);
          transform: translateX(-2px);
          color:#fff;
        }

        @media (max-width: 980px){
          .right{ min-width: auto; }
          .site-search{ width: min(420px, 42vw); }
        }
        @media (max-width: 820px){
          .site-search{ display:none; }
        }
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
            <form class="site-search" id="site-search-form" role="search" autocomplete="off">
              <input
                id="site-search-input"
                type="search"
                placeholder="${t.placeholder}"
                aria-label="${t.search}"
              />
              <button type="submit" class="search-icon" aria-label="${t.search}">
                <img src="${SEARCH_ICON}" alt="" />
              </button>

              <div class="search-dd" id="site-search-dd" aria-label="Suchergebnisse">
                <div class="dd-head">
                  <span id="site-search-meta"> </span>
                  <button type="button" class="dd-clear" id="site-search-clear">Löschen</button>
                </div>
                <div class="dd-list" id="site-search-list"></div>
              </div>
            </form>

            <div class="langs" aria-label="Language switch">
              <a data-lang="de">DE</a><span class="sep">|</span>
              <a data-lang="en">EN</a><span class="sep">|</span>
              <a data-lang="tr">TR</a><span class="sep">|</span>
              <a data-lang="fr">FR</a>
            </div>

            <button class="burger" type="button" aria-label="Menu" aria-expanded="false">
              <span class="icon" aria-hidden="true">
                <i></i><i></i><i></i>
              </span>
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
          <a href="${SEARCH_PAGE}">${t.search}</a>
          <a href="${ROUTES[lang].about}" data-nav>${t.about}</a>
          <a href="${ROUTES[lang].projects}" data-nav>${t.projects}</a>
          <a href="${ROUTES[lang].services}" data-nav>${t.services}</a>
          <a href="${ROUTES[lang].process}" data-nav>${t.process}</a>
          <a href="${ROUTES[lang].blog}" data-nav>${t.blog}</a>
          <a href="${ROUTES[lang].contact}" data-nav>${t.contact}</a>
        </nav>
      </aside>
    `;
  }

  // ---------- Pagefind loader + helpers ----------
  function loadPagefindOnce() {
    if (window.pagefind) return Promise.resolve(window.pagefind);

    // avoid duplicate script tags
    const existing = document.querySelector('script[data-pagefind="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        const done = () => (window.pagefind ? resolve(window.pagefind) : reject(new Error("pagefind not available")));
        existing.addEventListener("load", done, { once: true });
        existing.addEventListener("error", reject, { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "/_pagefind/pagefind.js";
      s.async = true;
      s.defer = true;
      s.dataset.pagefind = "1";
      s.onload = () => {
        if (window.pagefind) resolve(window.pagefind);
        else reject(new Error("pagefind loaded but window.pagefind missing"));
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function debounce(fn, ms = 180) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function safeText(str) {
    return (str || "").toString();
  }

  function stripHtml(html) {
    const d = document.createElement("div");
    d.innerHTML = html || "";
    return d.textContent || d.innerText || "";
  }

  // ---------- init ----------
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

    // Active nav highlight
    const path = location.pathname;
    mount.querySelectorAll("[data-nav]").forEach(a => {
      const href = a.getAttribute("href");
      const active = path === href || path.startsWith(href);
      a.classList.toggle("is-active", active);
    });

    // Language switch keeps same page type
    const pageKey = getPageKey(path, lang);
    mount.querySelectorAll("[data-lang]").forEach(a => {
      const targetLang = a.dataset.lang;
      a.href = (ROUTES[targetLang] && ROUTES[targetLang][pageKey]) || ROUTES[targetLang].home;
      a.classList.toggle("is-active", targetLang === lang);
    });

    // Collapse on scroll down, show on scroll up
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

    // ---------- SEARCH DROPDOWN ----------
    const t = LABELS[lang] || LABELS.de;

    const form = mount.querySelector("#site-search-form");
    const input = mount.querySelector("#site-search-input");
    const dd = mount.querySelector("#site-search-dd");
    const list = mount.querySelector("#site-search-list");
    const meta = mount.querySelector("#site-search-meta");
    const clearBtn = mount.querySelector("#site-search-clear");

    let lastQuery = "";
    let lastOpenByUser = false;

    function openDD() {
      dd.classList.add("is-open");
    }
    function closeDD() {
      dd.classList.remove("is-open");
    }
    function clearDD() {
      list.innerHTML = "";
      meta.textContent = "";
      closeDD();
    }

    clearBtn.addEventListener("click", () => {
      input.value = "";
      input.focus();
      lastQuery = "";
      clearDD();
    });

    // IMPORTANT: prevent redirect
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // If user hits Enter: just keep dropdown open (or open it)
      if (input.value.trim().length >= 2) openDD();
    });

    // Close when clicking outside (but keep clicks inside)
    document.addEventListener("pointerdown", (e) => {
      if (!dd.classList.contains("is-open")) return;
      const within = form.contains(e.target);
      if (!within) closeDD();
    });

    input.addEventListener("focus", () => {
      lastOpenByUser = true;
      if (list.children.length > 0) openDD();
    });

    // allow clicking results before closing
    input.addEventListener("blur", () => {
      setTimeout(() => {
        if (!form.contains(document.activeElement)) closeDD();
      }, 120);
    });

    const runSearch = debounce(async () => {
      const q = input.value.trim();
      lastQuery = q;

      if (q.length < 2) {
        clearDD();
        return;
      }

      meta.textContent = "Suche…";
      openDD();

      try {
        const pf = await loadPagefindOnce();

        // Pagefind search
        const res = await pf.search(q);

        // user typed something else while we waited
        if (input.value.trim() !== q) return;

        const hits = res?.results || [];
        meta.textContent = hits.length ? `${hits.length} Treffer` : t.noResults;

        if (!hits.length) {
          list.innerHTML = `<div class="dd-empty">${t.noResults}</div>`;
          return;
        }

        // Render top N results
        const MAX = 7;
        const slice = hits.slice(0, MAX);

        const items = await Promise.all(slice.map(async (r) => {
          const data = await r.data();
          return {
            url: data.url,
            title: data.meta?.title || data.url,
            excerpt: stripHtml(data.excerpt || "").slice(0, 140)
          };
        }));

        // still same query?
        if (input.value.trim() !== q) return;

        list.innerHTML = items.map(it => `
          <a class="dd-item" href="${it.url}">
            <div class="dd-title">${safeText(it.title)}</div>
            <div class="dd-url">${safeText(it.url)}</div>
            <div class="dd-excerpt">${safeText(it.excerpt)}</div>
          </a>
        `).join("");

        // keep open if user is interacting
        if (lastOpenByUser) openDD();
      } catch (err) {
        // show error in dropdown
        meta.textContent = "Search error";
        list.innerHTML = `<div class="dd-empty">Pagefind konnte nicht geladen werden.</div>`;
        openDD();
      }
    }, 180);

    input.addEventListener("input", runSearch);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
