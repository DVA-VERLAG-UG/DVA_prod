// /js/footer.js
(() => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  /* ======================
     CSS (einmal injizieren)
     ====================== */
  const STYLE_ID = "dv-footer-styles";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* ======================
   DVAYD FOOTER – COMPACT + PNG ICONS
   ====================== */
.dv-footer{
  position: relative;
  background:
    radial-gradient(900px 520px at 20% 10%, rgba(139,92,246,.22), transparent 60%),
    radial-gradient(700px 420px at 85% 30%, rgba(99,102,241,.16), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.35)),
    #070814;
  color: rgba(255,255,255,.84);
  border-top: 1px solid rgba(255,255,255,.08);
  overflow: hidden;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* subtiler Glow */
.dv-footer::before{
  content:"";
  position:absolute;
  inset:0;
  background: radial-gradient(420px 160px at 50% 0%, rgba(139,92,246,.14), transparent 72%);
  opacity:.5;
  pointer-events:none;
}

.dv-footer-inner{
  position: relative;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 44px 0 18px;
}

.dv-footer-grid{
  display: grid;
  grid-template-columns: 1.05fr 1.05fr 1fr 1.25fr;
  gap: 26px;
}

.dv-ftitle{
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(255,255,255,.95);
  margin-bottom: 14px;
}

.dv-flink{
  display:block;
  padding:8px 0;
  color: rgba(255,255,255,.70);
  text-decoration:none;
  transition: color .16s ease, transform .16s ease;
}
.dv-flink:hover{
  color: rgba(255,255,255,.92);
  transform: translateX(2px);
}

.dv-col-right{ text-align:right; }

.dv-fcontact{
  display:flex;
  flex-direction:column;
  gap:10px;
  margin-top:10px;
}

.dv-faccent{
  font-weight:950;
  color: rgba(167,139,250,.92);
  text-decoration:none;
}
.dv-faccent:hover{ color: rgba(196,181,253,.98); }

.dv-fhint{
  margin-top:14px;
  font-size:13px;
  line-height:1.55;
  color: rgba(255,255,255,.62);
  max-width:36ch;
  margin-left:auto;
}

/* ===== SOCIAL ICONS (PNG) ===== */
.dv-social{
  margin-top:16px;
  display:flex;
  justify-content:flex-end;
  gap:12px;
}

.dv-sbtn{
  width:42px;
  height:42px;
  border-radius:999px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.10);
  transition: transform .16s ease, background .16s ease, border-color .16s ease;
}

.dv-sbtn img{
  width:18px;
  height:18px;
  object-fit:contain;
  filter: brightness(1.2);
}

.dv-sbtn:hover{
  transform: translateY(-1px);
  background: rgba(139,92,246,.14);
  border-color: rgba(139,92,246,.28);
}

/* ===== Bottom Bar ===== */
.dv-bottom{
  margin-top:28px;
  padding-top:14px;
  border-top:1px solid rgba(255,255,255,.08);
  display:flex;
  justify-content:space-between;
  gap:14px;
  align-items:center;
  flex-wrap:wrap;
}

.dv-brand{
  display:flex;
  align-items:center;
  gap:12px;
  font-weight:950;
}

.dv-logo{
  height:18px;
  width:auto;
  filter: brightness(1.1);
}

.dv-legal{
  display:flex;
  gap:10px;
  align-items:center;
  font-size:12.5px;
  color: rgba(255,255,255,.55);
}
.dv-legal a{
  color: rgba(255,255,255,.68);
  text-decoration:none;
}
.dv-legal a:hover{ color:#fff; }
.dv-sep{ color: rgba(255,255,255,.22); }

/* Responsive */
@media (max-width: 980px){
  .dv-footer-grid{ grid-template-columns:1fr 1fr; }
  .dv-col-right{ text-align:left; }
  .dv-fhint{ margin-left:0; }
  .dv-social{ justify-content:flex-start; }
}
@media (max-width: 560px){
  .dv-footer-grid{ grid-template-columns:1fr; }
}
    `;
    document.head.appendChild(style);
  }

  /* ======================
     HTML
     ====================== */
  const year = new Date().getFullYear();

  mount.innerHTML = `
    <div class="dv-footer">
      <div class="dv-footer-inner">

        <div class="dv-footer-grid">
          <div class="dv-col">
            <div class="dv-ftitle">DVAYD</div>
            <a class="dv-flink" href="/de/">Start</a>
            <a class="dv-flink" href="/de/ueber-uns/">Über uns</a>
            <a class="dv-flink" href="/de/projekte/">Projekte</a>
            <a class="dv-flink" href="/de/pakete-dienste/">Pakete</a>
            <a class="dv-flink" href="/de/kontakt/">Kontakt</a>
          </div>

          <div class="dv-col">
            <div class="dv-ftitle">Leistungen</div>
            <a class="dv-flink">Manuskript-Check</a>
            <a class="dv-flink">Lektorat & Korrektorat</a>
            <a class="dv-flink">Cover & Layout</a>
            <a class="dv-flink">ISBN & Listing</a>
            <a class="dv-flink">Marketing</a>
          </div>

          <div class="dv-col">
            <div class="dv-ftitle">Wissen</div>
            <a class="dv-flink">Blog</a>
            <a class="dv-flink">FAQ</a>
            <a class="dv-flink">Ablauf</a>
            <a class="dv-flink">Referenzen</a>
          </div>

          <div class="dv-col dv-col-right">
            <div class="dv-ftitle">Kontakt</div>

            <div class="dv-fcontact">
              <a class="dv-faccent" href="tel:+494000000000">+49 40 0000000</a>
              <a class="dv-faccent" href="mailto:info@dva-yd.com">info@dva-yd.com</a>
            </div>

            <div class="dv-fhint">
              Deutschland ↔ Türkei • Persönliche Betreuung • 100% Autorenrechte
            </div>

            <!-- PNG Social Icons -->
            <div class="dv-social">
              <a class="dv-sbtn" href="#" aria-label="X">
                <img src="/assets/icons/x.png" alt="">
              </a>
              <a class="dv-sbtn" href="#" aria-label="Instagram">
                <img src="/assets/icons/instagram.png" alt="">
              </a>
              <a class="dv-sbtn" href="#" aria-label="YouTube">
                <img src="/assets/icons/youtube.png" alt="">
              </a>
              <a class="dv-sbtn" href="#" aria-label="LinkedIn">
                <img src="/assets/icons/linkedin.png" alt="">
              </a>
            </div>
          </div>
        </div>

        <div class="dv-bottom">
          <div class="dv-brand">
            <img src="/assets/images/dva-logo.png" alt="DVAYD Logo" class="dv-logo">
            <span>DVAYD Publishing</span>
          </div>

          <div class="dv-legal">
            <span>© ${year} DVAYD</span>
            <span class="dv-sep">|</span>
            <a href="/de/datenschutz/">Privacy Policy</a>
            <span class="dv-sep">|</span>
            <a href="/de/impressum/">Impressum</a>
          </div>
        </div>

      </div>
    </div>
  `;
})();
