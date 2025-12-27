// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"configurator", process:"Prozess", blog:"Blog" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"configurator", process:"Process", blog:"Blog" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"configurator", process:"Süreç", blog:"Blog" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"configurator", process:"Processus", blog:"Blog" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";

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
          position:fixed;
          inset:0 0 auto 0;
          height:var(--hdr-h);
          z-index:100;
          background:transparent;
          pointer-events:none;

          /* NEW: smooth show/hide */
          transform: translateY(0);
          transition:
            transform .28s cubic-bezier(.2,.9,.2,1),
            background .18s ease,
            backdrop-filter .18s ease,
            -webkit-backdrop-filter .18s ease;
          will-change: transform;
        }

        /* NEW: hide when scrolling down */
        .hdr.is-hidden{
          transform: translateY(calc(-1 * var(--hdr-h)));
        }

        /* Scroll state: still minimal, but adds premium legibility */
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

        .right{ display:flex; align-items:center; gap:14px; }

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

          box-shadow:
            -16px 0 60px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.14);

          backdrop-filter: blur(2px) saturate(1.55);
          -webkit-backdrop-filter: blur(26px) saturate(1.55);

          transform: translateX(112%);
          transition: transform .55s cubic-bezier(.16, 1, .12, 1);
        }
        .drawer.is-open{ transform: translateX(0); }

        .drawer::before{
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          opacity:.08;
          mix-blend-mode: overlay;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.70' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
        }

        .drawer::after{
          content:"";
          position:absolute;
          top:0; left:0;
          width:1px; height:100%;
          background: linear-gradient(to bottom, rgba(255,255,255,.18), rgba(255,255,255,.03));
          opacity:.7;
          pointer-events:none;
        }

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
          border: 0;
          box-shadow: none;

          transition: background .20s ease, transform .20s ease, color .20s ease;
        }
        .drawer nav a:hover{
          background: rgba(255,255,255,.07);
          transform: translateX(-2px);
          color:#fff;
        }
        .drawer nav a.is-active{
          background: rgba(120,190,255,.12);
          color:#fff;
        }

        @media (max-width: 520px){
          .brand span{ display:none; }
        }
      </style>

      <div class="hdr">
        <div class="hdr-inner">
          <a class="brand" href="${ROUTES[lang].home}" aria-label="Homepage">
            <img src="${LOGO_SRC}" alt="DVAYD Publishing Logo" />
            <span>DVAYD Publishing</span>
          </a>

          <div class="right">
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
          <a href="${ROUTES[lang].about}" data-nav>${LABELS[lang].about}</a>
          <a href="${ROUTES[lang].projects}" data-nav>${LABELS[lang].projects}</a>
          <a href="${ROUTES[lang].services}" data-nav>${LABELS[lang].services}</a>
          <a href="${ROUTES[lang].process}" data-nav>${LABELS[lang].process}</a>
          <a href="${ROUTES[lang].blog}" data-nav>${LABELS[lang].blog}</a>
          <a href="${ROUTES[lang].contact}" data-nav>${LABELS[lang].contact}</a>
        </nav>
      </aside>
    `;
  }

  function init() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const lang = getLang();
    mount.innerHTML = headerHTML(lang);

    const hdr = mount.querySelector(".hdr");          // NEW
    const overlay = mount.querySelector("[data-overlay]");
    const drawer = mount.querySelector("[data-drawer]");
    const burger = mount.querySelector(".burger");
    const closeBtn = mount.querySelector("[data-close]");

    const open = () => {
      burger.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-open");
      drawer.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      hdr.classList.remove("is-hidden"); // NEW: keep header visible while menu is open
    };
    const close = () => {
      burger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-open");
      drawer.classList.remove("is-open");
      document.documentElement.style.overflow = "";
    };

    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      isOpen ? close() : open();
    });
    overlay.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

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

    /* ==========================
       NEW: COLLAPSE ON SCROLL DOWN,
       SHOW ON SCROLL UP
       ========================== */

    let lastY = window.scrollY || 0;
    let ticking = false;

    const SCROLL_ON_AT = 8;        // ab wann "is-scrolled" aktiv wird
    const HIDE_AFTER = 120;        // erst nach etwas Scroll "weg"
    const DELTA = 6;               // kleine Zitterbewegungen ignorieren

    function onScroll() {
      const y = window.scrollY || 0;
      const menuOpen = burger.getAttribute("aria-expanded") === "true";

      // scrolled style
      hdr.classList.toggle("is-scrolled", y > SCROLL_ON_AT);

      // wenn Menü offen: Header nicht verstecken
      if (menuOpen) {
        lastY = y;
        return;
      }

      const diff = y - lastY;
      if (Math.abs(diff) < DELTA) return;

      if (diff > 0 && y > HIDE_AFTER) {
        // runter scrollen -> verstecken
        hdr.classList.add("is-hidden");
      } else {
        // hoch scrollen -> zeigen
        hdr.classList.remove("is-hidden");
      }

      lastY = y;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // initial state
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
