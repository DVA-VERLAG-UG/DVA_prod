// js/header.js
(() => {
  const ROUTES = {
    de: { home:"/de/", about:"/de/ueber-uns/", contact:"/de/kontakt/", projects:"/de/projekte/", services:"/de/configurator/", process:"/de/prozess/", blog:"/de/blog/" },
    en: { home:"/en/", about:"/en/about/", contact:"/en/contact/", projects:"/en/projects/", services:"/en/configurator/", process:"/en/process/", blog:"/en/blog/" },
    tr: { home:"/tr/", about:"/tr/hakkimizda/", contact:"/tr/iletisim/", projects:"/tr/projeler/", services:"/tr/configurator/", process:"/tr/surec/", blog:"/tr/blog/" },
    fr: { home:"/fr/", about:"/fr/a-propos/", contact:"/fr/contact/", projects:"/fr/projets/", services:"/fr/configurator/", process:"/fr/processus/", blog:"/fr/blog/" },
  };

  const LABELS = {
    de: { about:"Über uns", contact:"Kontakt", projects:"Projekte", services:"configurator", process:"Prozess", blog:"Blog", search:"Suche" },
    en: { about:"About", contact:"Contact", projects:"Projects", services:"configurator", process:"Process", blog:"Blog", search:"Search" },
    tr: { about:"Hakkımızda", contact:"İletişim", projects:"Projeler", services:"configurator", process:"Süreç", blog:"Blog", search:"Ara" },
    fr: { about:"À propos", contact:"Contact", projects:"Projets", services:"configurator", process:"Processus", blog:"Blog", search:"Recherche" },
  };

  const LOGO_SRC = "/assets/images/dva-logo.png";

  // Global search page (you currently use /search/)
  const SEARCH_PATH = "/search/";

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

          transform: translateY(0);
          transition:
            transform .28s cubic-bezier(.2,.9,.2,1),
            background .18s ease,
            backdrop-filter .18s ease,
            -webkit-backdrop-filter .18s ease;
          will-change: transform;
        }
        .hdr.is-hidden{
          transform: translateY(calc(-1 * var(--hdr-h)));
        }
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
        /* ==========================
   HEADER SEARCH FIELD
   ========================== */
.site-search{
  display:flex;
  align-items:center;
  gap:10px;

  height:44px;
  min-width:260px;
  padding:0 10px 0 14px;

  border-radius:16px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);

  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);

  box-shadow:
    0 14px 40px rgba(0,0,0,.22),
    inset 0 1px 0 rgba(255,255,255,.18);

  transition: background .2s ease, box-shadow .2s ease;
}

.site-search:hover{
  background: rgba(255,255,255,.12);
}

.site-search input{
  flex:1;
  height:100%;
  border:0;
  outline:0;
  background:transparent;

  color:#fff;
  font-size:14px;
  font-weight:600;
  letter-spacing:.01em;
}

.site-search input::placeholder{
  color: rgba(255,255,255,.75);
  font-weight:500;
}

/* Search icon inside field (no border, integrated) */
.site-search .search-icon{
  position:relative;
  width:34px;
  height:34px;
  margin-right:2px;

  border:0;
  background:transparent;
  padding:0;
  cursor:pointer;

  display:grid;
  place-items:center;

  /* no separation line */
  box-shadow:none;
}

.site-search .search-icon img{
  width:18px;
  height:18px;
  object-fit:contain;
  opacity:.88;
  filter:
    drop-shadow(0 6px 14px rgba(0,0,0,.35))
    brightness(1.05);

  transition: opacity .15s ease, transform .15s ease;
}

.site-search .search-icon:hover img{
  opacity:1;
  transform: scale(1.08);
}

.site-search button:hover{
  filter: brightness(1.1);
  transform: scale(1.05);
}

/* Mobile: hide search, keep icon feel clean */
@media (max-width: 820px){
  .site-search{
    display:none;
  }
}
  


        /* NEW: Search button */
        .search-btn{
          width:42px; height:42px;
          display:grid; place-items:center;
          border-radius:14px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          color:#fff;
          text-decoration:none;
          cursor:pointer;
          box-shadow: 0 12px 30px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.12);
          filter: drop-shadow(0 10px 26px rgba(0,0,0,.25));
        }
        .search-btn:hover{ filter: brightness(1.08) drop-shadow(0 10px 26px rgba(0,0,0,.25)); }

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
          .langs{ display:none; } /* optional: hide language row on very small screens */
        }
      </style>

      <div class="hdr">
        <div class="hdr-inner">
          <a class="brand" href="${ROUTES[lang].home}" aria-label="Homepage">
            <img src="${LOGO_SRC}" alt="DVAYD Publishing Logo" />
            <span>DVAYD Publishing</span>
          </a>

          <div class="right">
            <!-- NEW: Search button -->
            <form class="site-search" action="${SEARCH_PATH}" method="GET" role="search">
  <input
    type="search"
    name="q"
    placeholder="Suchbegriff eingeben"
    aria-label="Suchbegriff eingeben"
  />
<button type="submit" class="search-icon" aria-label="${LABELS[lang].search}">
  <img src="/assets/icons/lupe.png" alt="" />
</button>

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
          <!-- NEW: Search inside drawer too -->
          <a href="${SEARCH_PATH}" data-nav-search>${LABELS[lang].search}</a>

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

    const hdr = mount.querySelector(".hdr");
    const overlay = mount.querySelector("[data-overlay]");
    const drawer = mount.querySelector("[data-drawer]");
    const burger = mount.querySelector(".burger");
    const closeBtn = mount.querySelector("[data-close]");

    const open = () => {
      burger.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-open");
      drawer.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      hdr.classList.remove("is-hidden");
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

    // Close drawer when clicking any nav link (including search)
    mount.querySelectorAll("aside.drawer a").forEach(a => {
      a.addEventListener("click", () => close());
    });

    // Active nav highlight (for your internal pages)
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
       COLLAPSE ON SCROLL DOWN,
       SHOW ON SCROLL UP
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

      if (menuOpen) {
        lastY = y;
        return;
      }

      const diff = y - lastY;
      if (Math.abs(diff) < DELTA) return;

      if (diff > 0 && y > HIDE_AFTER) {
        hdr.classList.add("is-hidden");
      } else {
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

    onScroll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
