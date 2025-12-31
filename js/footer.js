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
   FOOTER MANUSKRIPT UPLOAD (FULL STYLING)
   ====================== */
.dv-footer-upload{
  margin-bottom: 44px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,.10);
  background:
    radial-gradient(900px 520px at 15% 0%, rgba(139,92,246,.20), transparent 60%),
    radial-gradient(700px 420px at 85% 40%, rgba(99,102,241,.14), transparent 62%),
    rgba(255,255,255,.04);
  box-shadow: 0 18px 40px rgba(0,0,0,.35);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);

  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 22px;
  align-items:start;
}

/* Head */
.dv-footer-upload-head .upload-kicker{
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
  opacity: .85;
  margin-bottom: 10px;
}

.dv-footer-upload-head .upload-title{
  margin: 0 0 8px;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 900;
  color: #fff;
}

.dv-footer-upload-head .upload-sub{
  margin: 0 0 14px;
  color: rgba(255,255,255,.78);
  font-size: 14px;
  line-height: 1.5;
}

/* Chips */
.dv-footer-upload .upload-chips{
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.dv-footer-upload .chip{
  display:inline-flex;
  align-items:center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: rgba(255,255,255,.86);
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);
}

/* Section reset */
.dv-footer-upload .upload-section{
  padding: 0;
  margin: 0;
}
.dv-footer-upload .upload-inner{
  width: 100%;
  margin: 0;
}

/* Card */
.dv-footer-upload .upload-card{
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.18);
  padding: 16px;
}

/* Grid */
.dv-footer-upload .upload-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.dv-footer-upload .field.full{
  grid-column: 1 / -1;
}

/* Labels */
.dv-footer-upload .field label{
  display:block;
  font-size: 12px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgba(255,255,255,.72);
  margin-bottom: 6px;
}

/* ======================
   INPUTS – PREMIUM LOOK (Name + Email)
   ====================== */
.dv-footer-upload input[type="text"],
.dv-footer-upload input[type="email"]{
  width:100%;
  height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.18);
  background: linear-gradient(
    180deg,
    rgba(255,255,255,.06),
    rgba(0,0,0,.32)
  );
  color: #fff;
  font-size: 14.5px;
  font-weight: 500;
  outline: none;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12),
    0 6px 18px rgba(0,0,0,.25);
  transition:
    border-color .18s ease,
    box-shadow .18s ease,
    background .18s ease,
    transform .12s ease;
  -webkit-appearance: none;
  appearance: none;
}

.dv-footer-upload input::placeholder{
  color: rgba(255,255,255,.55);
}

/* Focus */
.dv-footer-upload input:focus{
  border-color: rgba(139,92,246,.65);
  background: rgba(0,0,0,.38);
  box-shadow:
    0 0 0 4px rgba(139,92,246,.22),
    inset 0 1px 0 rgba(255,255,255,.14);
}

/* Fix: iOS Safari tends to make some inputs white (especially text inputs) */
.dv-footer-upload input[type="text"]{
  background-color: transparent;
  -webkit-text-fill-color: #fff;
  caret-color: #fff;
}

/* ======================
   Dropzone
   ====================== */
.dv-footer-upload .dropzone{
  position: relative;
  border-radius: 14px;
  border: 1px dashed rgba(255,255,255,.22);
  background: rgba(255,255,255,.04);
  padding: 14px;
}
.dv-footer-upload .dropzone input[type="file"]{
  position:absolute;
  inset:0;
  opacity:0;
  cursor:pointer;
}
.dv-footer-upload .dz-ui{
  pointer-events:none;
}
.dv-footer-upload .dz-title{
  font-weight: 900;
  color:#fff;
}
.dv-footer-upload .dz-meta{
  margin-top: 4px;
  font-size: 12.5px;
  color: rgba(255,255,255,.72);
}

/* File pills */
.dv-footer-upload .file-list{
  margin-top: 10px;
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.dv-footer-upload .file-pill{
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(139,92,246,.16);
  border: 1px solid rgba(139,92,246,.26);
  color: rgba(255,255,255,.9);
}

/* Actions */
.dv-footer-upload .upload-actions{
  margin-top: 12px;
  display:flex;
  gap: 10px;
  justify-content:flex-end;
}

/* Buttons fallback (falls .btn global anders ist) */
.dv-footer-upload .upload-actions .btn{
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
  color:#fff;
  font-weight: 900;
  cursor:pointer;
}
.dv-footer-upload .upload-actions .btn.primary{
  border: none;
  background: linear-gradient(135deg,#8b5cf6,#6366f1);
}

/* Note */
.dv-footer-upload .upload-note{
  margin-top: 10px;
  font-size: 12.5px;
  color: rgba(255,255,255,.70);
}

/* Loading overlay */
.dv-footer-upload .upload-loading{
  position: fixed;
  inset: 0;
  display:none;
  place-items:center;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
}
.dv-footer-upload .upload-loading.is-on{ display:grid; }

.dv-footer-upload .loading-card{
  width: min(420px, calc(100% - 40px));
  padding: 18px 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(10,12,20,.75);
  color:#fff;
}
.dv-footer-upload .spinner{
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,.28);
  border-top-color: rgba(255,255,255,.9);
  animation: dvSpin .7s linear infinite;
  margin-bottom: 10px;
}
@keyframes dvSpin{ to { transform: rotate(360deg); } }

.dv-footer-upload .loading-title{
  font-weight: 900;
  margin-bottom: 10px;
}
.dv-footer-upload .loading-bar{
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.10);
  overflow:hidden;
}
.dv-footer-upload .loading-bar span{
  display:block;
  height:100%;
  width: 45%;
  border-radius:999px;
  background: linear-gradient(135deg,#8b5cf6,#6366f1);
  animation: dvBar 1.1s ease-in-out infinite;
}
@keyframes dvBar{
  0%{ transform: translateX(-120%); }
  100%{ transform: translateX(260%); }
}

/* ======================
   MOBILE (Layout + iOS input polish)
   ====================== */
@media(max-width: 900px){
  .dv-footer-upload{
    grid-template-columns: 1fr;
  }
  .dv-footer-upload .upload-grid{
    grid-template-columns: 1fr;
  }
  .dv-footer-upload .upload-actions{
    justify-content: stretch;
  }
  .dv-footer-upload .upload-actions .btn{
    width: 100%;
  }
}

/* ======================
   FOOTER RESPONSIVE
   ====================== */
@media(max-width:900px){
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

    <!-- MANUSKRIPT-CHECK (moved from Hero) -->
    <div class="dv-footer-upload" id="upload">
      <div class="dv-footer-upload-head">
        <div class="upload-kicker">MANUSKRIPT-CHECK</div>
        <h2 class="upload-title">Kostenloser Manuskript-Check</h2>
        <p class="upload-sub">Lade dein Manuskript hoch — wir melden uns in 24–48h mit den nächsten Schritten.</p>

        <div class="upload-chips" aria-label="Vorteile">
          <span class="chip">Vertraulich</span>
          <span class="chip">Kostenlos</span>
          <span class="chip">Binnen 48h Antwort</span>
        </div>
      </div>

      <section class="upload-section" aria-label="Manuskript Upload">
        <div class="upload-inner">
          <div class="upload-card">
            <form class="upload-form"
                  name="manuskript-upload"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  enctype="multipart/form-data"
                  action="/de/danke-upload/">

              <input type="hidden" name="form-name" value="manuskript-upload" />
              <p class="hidden">
                <label>Don’t fill this out: <input name="bot-field" /></label>
              </p>

              <div class="upload-grid">
                <div class="field">
                  <label for="u_name">Name</label>
                  <input id="u_name" name="name" type="text" required placeholder="Name">
                </div>

                <div class="field">
                  <label for="u_email">E-Mail</label>
                  <input id="u_email" name="email" type="email" required placeholder="name@mail.com">
                </div>

                <div class="field full">
                  <label for="u_files">Dateien</label>

                  <div class="dropzone" id="dropzone">
                    <input id="u_files"
                           name="dateien"
                           type="file"
                           multiple
                           required
                           accept=".pdf,.doc,.docx,.epub,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">

                    <div class="dz-ui">
                      <div class="dz-title">Drag &amp; Drop oder klicken</div>
                      <div class="dz-meta">Mehrere Dateien möglich</div>
                    </div>
                  </div>

                  <div class="file-list" id="fileList" aria-live="polite"></div>
                </div>
              </div>

              <div class="upload-actions">
                <button class="btn ghost" type="reset" id="u_reset">Reset</button>
                <button class="btn primary" type="submit" id="u_submit">Senden</button>
              </div>

              <div class="upload-note">
                Hinweis: Deine Dateien werden sicher über Netlify Forms übertragen.
              </div>

            </form>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div class="upload-loading" id="uploadLoading" aria-hidden="true">
          <div class="loading-card" role="status" aria-live="polite">
            <div class="spinner" aria-hidden="true"></div>
            <div class="loading-title">Upload läuft…</div>
            <div class="loading-bar"><span></span></div>
          </div>
        </div>
      </section>
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
