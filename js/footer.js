// /js/footer.js
(() => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  /* ======================
     CSS (einmalig injizieren)
     ====================== */
  const STYLE_ID = "dv-footer-styles";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* ======================
   FOOTER BASE
   ====================== */
.dv-footer{
  background:
    radial-gradient(900px 520px at 15% 0%, rgba(139,92,246,.25), transparent 60%),
    linear-gradient(180deg, #070814, #05060f);
  color: rgba(255,255,255,.88);
  border-top: 1px solid rgba(255,255,255,.08);
  font-family: Inter, system-ui, sans-serif;
}

.dv-footer-inner{
  max-width: 1060px;
  margin: 0 auto;
  padding: 56px 20px 26px;
}

/* ======================
   TOP CONTACT FORM
   ====================== */
.dv-footer-form-top{
  margin-bottom: 44px;
  padding: 18px 22px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(139,92,246,.22),
    rgba(99,102,241,.16)
  );
  border: 1px solid rgba(139,92,246,.35);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 18px;
  align-items: center;
}

.dv-footer-form-head strong{
  display:block;
  font-size:18px;
  font-weight:900;
  color:#fff;
}
.dv-footer-form-head span{
  font-size:13px;
  opacity:.85;
}

.dv-footer-form{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap:10px;
}

.dv-footer-form input{
  padding:11px 14px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.25);
  background: rgba(0,0,0,.25);
  color:#fff;
  font-size:13px;
  outline:none;
}

.dv-footer-form button{
  padding:11px 18px;
  border-radius:999px;
  border:none;
  background: linear-gradient(135deg,#8b5cf6,#6366f1);
  color:#fff;
  font-weight:900;
  cursor:pointer;
  white-space:nowrap;
}

/* ======================
   FOOTER GRID
   ====================== */
.dv-footer-grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 34px;
}

.dv-ftitle{
  font-size:12px;
  font-weight:900;
  letter-spacing:.14em;
  text-transform:uppercase;
  margin-bottom:14px;
}

.dv-flink{
  display:block;
  padding:6px 0;
  color: rgba(255,255,255,.72);
}
.dv-flink:hover{ color:#fff; }

/* ======================
   CONTACT COLUMN
   ====================== */
.dv-contact strong{
  display:block;
  font-size:15px;
  font-weight:900;
  color:#a78bfa;
  margin-bottom:6px;
}

.dv-contact span{
  font-size:13px;
  opacity:.75;
}

/* ======================
   SOCIAL ICONS
   ====================== */
.dv-social{
  margin-top:14px;
  display:flex;
  gap:10px;
}

.dv-social a{
  width:40px;
  height:40px;
  border-radius:999px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  transition: transform .18s ease, background .18s ease;
}

.dv-social a:hover{
  transform: translateY(-1px);
  background: rgba(139,92,246,.22);
}

.dv-social img{
  width:18px;
  height:18px;
  object-fit:contain;
  filter: brightness(1.1);
}

/* ======================
   BOTTOM BAR
   ====================== */
.dv-footer-bottom{
  margin-top:34px;
  padding-top:18px;
  border-top:1px solid rgba(255,255,255,.08);
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;
  font-size:12.5px;
  color: rgba(255,255,255,.55);
}

.dv-footer-brand{
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:900;
  color:#fff;
}

.dv-footer-brand img{
  height:22px;
  width:auto;
}

.dv-footer-bottom a{
  color: rgba(255,255,255,.7);
}

/* ======================
   RESPONSIVE
   ====================== */
@media(max-width:900px){
  .dv-footer-form-top{
    grid-template-columns:1fr;
  }
  .dv-footer-form{
    grid-template-columns:1fr;
  }
  .dv-footer-grid{
    grid-template-columns:1fr 1fr;
  }
}

@media(max-width:520px){
  .dv-footer-grid{
    grid-template-columns:1fr;
  }
}
`;
    document.head.appendChild(style);
  }

  const year = new Date().getFullYear();

  /* ======================
     HTML
     ====================== */
  mount.innerHTML = `
<footer class="dv-footer">
  <div class="dv-footer-inner">

    <!-- TOP FORM -->
    <div class="dv-footer-form-top">
      <div class="dv-footer-form-head">
        <strong>Bereit für dein eigenes Buch?</strong>
        <span>Unverbindlich & persönlich</span>
      </div>

      <form class="dv-footer-form">
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="E-Mail" required>
        <input type="text" placeholder="Genre (optional)">
        <button type="submit">Kontakt aufnehmen</button>
      </form>
    </div>

    <!-- GRID -->
    <div class="dv-footer-grid">
      <div>
        <div class="dv-ftitle">DVAYD</div>
        <a class="dv-flink" href="/de/">Start</a>
        <a class="dv-flink" href="/de/ueber-uns/">Über uns</a>
        <a class="dv-flink" href="/de/projekte/">Projekte</a>
        <a class="dv-flink" href="/de/pakete-dienste/">Pakete</a>
        <a class="dv-flink" href="/de/kontakt/">Kontakt</a>
      </div>

      <div>
        <div class="dv-ftitle">Leistungen</div>
        <span class="dv-flink">Manuskript-Check</span>
        <span class="dv-flink">Lektorat & Korrektorat</span>
        <span class="dv-flink">Cover & Layout</span>
        <span class="dv-flink">ISBN & Listing</span>
        <span class="dv-flink">Marketing</span>
      </div>

      <div>
        <div class="dv-ftitle">Wissen</div>
        <a class="dv-flink" href="/de/blog/">Blog</a>
        <a class="dv-flink" href="/de/faq/">FAQ</a>
        <a class="dv-flink" href="/de/prozess/">Ablauf</a>
        <a class="dv-flink" href="/de/projekte/">Referenzen</a>
      </div>

      <div class="dv-contact">
        <div class="dv-ftitle">Kontakt</div>
        <strong>+49 40 0000000</strong>
        <strong>info@dva-yd.com</strong>
        <span>Deutschland ↔ Türkei · Persönliche Betreuung · 100% Autorenrechte</span>

        <div class="dv-social">
          <a href="#"><img src="/assets/icons/x.png" alt="X"></a>
          <a href="#"><img src="/assets/icons/instagram.png" alt="Instagram"></a>
          <a href="#"><img src="/assets/icons/youtube.png" alt="YouTube"></a>
          <a href="#"><img src="/assets/icons/linkedin.png" alt="LinkedIn"></a>
        </div>
      </div>
    </div>

    <!-- BOTTOM -->
    <div class="dv-footer-bottom">
      <div class="dv-footer-brand">
        <img src="/assets/images/dva-logo.png" alt="DVAYD Logo">
        <span>DVAYD Publishing</span>
      </div>
      <div>
        © ${year} DVAYD ·
        <a href="/de/datenschutz/">Privacy Policy</a> ·
        <a href="/de/impressum/">Impressum</a>
      </div>
    </div>

  </div>
</footer>
`;
})();
