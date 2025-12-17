// js/header.js
(function () {
  const LOGO_SRC = "assets/dva-logo.png";

  /* =========================
     FAVICON (KEEP PROPORTIONS)
     ========================= */
  function setFaviconWithAspectRatio(src) {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);

      // keep aspect ratio (contain)
      const scale = Math.min(size / img.width, size / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (size - w) / 2;
      const y = (size - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      // replace favicon
      document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
        .forEach(el => el.remove());

      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = canvas.toDataURL("image/png");
      document.head.appendChild(link);
    };

    img.src = src;
  }

  setFaviconWithAspectRatio(LOGO_SRC);

  /* =========================
     STYLES
     ========================= */
  const css = `
    :root{
      --bg:#050509;
      --line:rgba(255,255,255,.08);
      --text:rgba(255,255,255,.88);
      --muted:rgba(255,255,255,.55);
      --purple:#7c3aed;
      --purple2:#a855f7;
      --max:1180px;
      --hdr-h:74px;
    }

    /* Header */
    .site-header{
      position:fixed;
      inset:0 0 auto 0;
      height:var(--hdr-h);
      z-index:1000;
      display:flex;
      align-items:center;
      border-bottom:1px solid var(--line);
      background: rgba(0,0,0,.35);
      backdrop-filter: blur(10px);
    }

    .site-header .inner{
      width:min(var(--max), calc(100% - 48px));
      margin:0 auto;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:22px;
      padding: 0 32px;
    }

    /* Logo with white background */
    .brand{
      display:flex;
      align-items:center;
      padding:6px 10px;
      background:#fff;
      border-radius:12px;
      text-decoration:none;
    }

    .brand img{
      display:block;
      height:26px;
      width:auto;
    }

    .nav{
      display:flex;
      gap:24px;
      margin-left:auto;
      margin-right:auto;
    }

    .nav a{
      color:var(--text);
      text-decoration:none;
      font-weight:600;
      font-size:14px;
      opacity:.9;
    }

    .nav a:hover{opacity:1}

    .langs{
      display:flex;
      gap:12px;
      font-size:13px;
      font-weight:700;
    }

    .langs a{
      color:var(--muted);
      text-decoration:none;
    }

    .langs a.is-active{color:var(--purple2)}

    @media (max-width:920px){
      .nav,.langs{display:none}
    }

    /* Hero background */
    .hero{
      position:relative;
      min-height:100vh;
      padding: calc(var(--hdr-h) + 70px) 20px 80px;
      background: linear-gradient(180deg, #020203, #07070b 55%, #020203);
      overflow:hidden;
    }

    .hero::before{
      content:"";
      position:absolute;
      inset:-40%;
      background:
        radial-gradient(420px 420px at var(--lx,65%) var(--ly,55%),
          rgba(124,58,237,.55),
          rgba(168,85,247,.22),
          transparent 70%);
      animation: floatLight 9s ease-in-out infinite;
    }

    @keyframes floatLight{
      0%{transform:translate(-1%,-1%)}
      50%{transform:translate(1.5%,1%)}
      100%{transform:translate(-1%,-1%)}
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* =========================
     HEADER MARKUP
     ========================= */
  const headerHTML = `
    <header class="site-header">
      <div class="inner">
        <a class="brand" href="#top">
          <img src="${LOGO_SRC}" alt="DVA Logo">
        </a>

        <nav class="nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <div class="langs">
          <a class="is-active">ENG</a>
          <a>TUR</a>
          <a>GER</a>
          <a>FR</a>
        </div>
      </div>
    </header>
  `;

  const mount = document.getElementById("siteHeader") || document.body;
  mount.insertAdjacentHTML("afterbegin", headerHTML);

  /* =========================
     PURPLE LIGHT MOTION
     ========================= */
  let lx = 65, ly = 55;
  function animate() {
    const t = Date.now() * 0.00018;
    lx = 50 + Math.sin(t) * 18;
    ly = 50 + Math.cos(t * 1.12) * 14;
    document.documentElement.style.setProperty("--lx", `${lx}%`);
    document.documentElement.style.setProperty("--ly", `${ly}%`);
    requestAnimationFrame(animate);
  }
  animate();
})();
