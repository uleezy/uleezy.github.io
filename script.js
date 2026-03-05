/* =========================================================
   ulanator.online — script.js
   Features implemented:
   1) Press-Start intro screen -> smooth reveal into site
   2) 7-song playlist BGM with play/pause + volume slider
   3) Gallery modal (JS-injected items)
   4) Slow drifting Unicode/ASCII background (your 9 approved BG_ARTs)
   5) Kaomoji “creature” easter eggs drifting around
   6) Hidden Kaomoji Arcade: click a special kaomoji -> opens canvas mini-games
      - Starter Pack games included, playable w/ keybinds
   ========================================================= */

/* --------------------------
   QUICK CONFIG (edit me)
-------------------------- */

// 7-song playlist (put your real paths)
const PLAYLIST = [
  { artist: "Ula", title: "song1", src: "assets/music/song1.mp3" },
  { artist: "Ula", title: "song2", src: "assets/music/song2.mp3" },
  { artist: "Ula", title: "song3", src: "assets/music/song3.mp3" },
  { artist: "Ula", title: "song4", src: "assets/music/song4.mp3" },
  { artist: "Ula", title: "song5", src: "assets/music/song5.mp3" },
  { artist: "Ula", title: "song6", src: "assets/music/song6.mp3" },
  { artist: "Ula", title: "song7", src: "assets/music/song7.mp3" },
];

// Gallery items (you can mix images + videos)
const GALLERY_ITEMS = [
  // { type: "image", src: "assets/gallery/img1.jpg", alt: "Ula 1" },
  // { type: "video", src: "assets/gallery/clip1.mp4", poster: "assets/gallery/poster1.jpg", title: "Clip 1" },
];

// Kaomoji creature set
const KAOMOJI_POOL = [
  "(｡•̀ᴗ-)✧", "(≧▽≦)", "(•̀ω•́)ゝ", "(づ｡◕‿‿◕｡)づ", "(ಠ_ಠ)", "(¬‿¬)",
  "(•ᴗ•)", "(=^･ω･^=)", "(ง'̀-'́)ง", "(๑•̀ㅂ•́)و✧", "(っ˘ω˘ς )",
  "(╯°□°）╯︵ ┻━┻", "┬─┬ノ(ಠ_ಠノ)", "(☉_☉)", "(._.)", "( •_•)>⌐■-■",
  "(⌐■_■)", "(˘•ω•˘)", "(ಥ﹏ಥ)", "(◕‿◕)", "(•‿•)", "(≖_≖ )",
];

// How many kaomoji creatures to spawn drifting around
const KAOMOJI_COUNT = 18;

// Chance any spawned kaomoji is “special” (click -> opens arcade)
const ARCADE_EGG_CHANCE = 0.12; // 12%

// ASCII background drift settings
const BG_ART_COUNT = 9; // You approved exactly 9
const BG_DRIFT_SPEED_MIN = 0.02;
const BG_DRIFT_SPEED_MAX = 0.08;

// Kaomoji drift settings
const KAO_DRIFT_SPEED_MIN = 0.03;
const KAO_DRIFT_SPEED_MAX = 0.12;

/* --------------------------
   UTILS
-------------------------- */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => Math.random() * (max - min) + min;
const randi = (min, max) => Math.floor(rand(min, max + 1));

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

/* --------------------------
   DOM HOOKS
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Core nodes
  const startScreen = $("#start-screen");
  const startBtn = $("#btn-start");
  const transition = $("#screen-transition");

  const app = $("#app");
  const introAudio = $("#intro-audio");
  const introVideo = $("#intro-video");

  const bgAsciiLayer = $("#bg-ascii-layer");
  const bgKaomojiLayer = $("#bg-kaomoji-layer");

  const bgmAudio = $("#bgm-audio");
  const btnPlay = $("#btn-play");
  const volume = $("#volume");
  const volReadout = $("#vol-readout");
  const trackArtist = $("#track-artist");
  const trackTitle = $("#track-title");

  const galleryModal = $("#gallery-modal");
  const galleryGrid = $("#gallery-grid");
  const openGalleryBtn = $("#open-gallery");

  const arcadeModal = $("#arcade-modal");
  const arcadeCanvas = $("#arcade-canvas");
  const arcadeHud = $("#arcade-hud");
  const arcadeNextBtn = $("#arcade-next");

  // Safety: if any key nodes missing, bail quietly.
  if (!startScreen || !startBtn || !app || !bgAsciiLayer || !bgKaomojiLayer) return;

  /* =========================================================
     1) PRESS START FLOW
     - Browsers block autoplay audio. We only start sound on gesture.
     ========================================================= */
  let started = false;

  // Try to keep intro video quietly looping as visual, audio waits.
  if (introVideo) {
    introVideo.muted = true;
    introVideo.play().catch(() => {});
  }

  // When user first interacts with start screen, we can begin intro audio loop.
  // (They may still wait to press start, but at least sound can exist.)
  const armIntroAudio = () => {
    if (!introAudio) return;
    // If already playing, do nothing.
    if (!introAudio.paused) return;

    // Soft start at a reasonable volume; user can later control main BGM via slider.
    introAudio.volume = 0.8;
    introAudio.play().catch(() => {
      // If play fails (some browsers are strict), we’ll still start it on the Start button.
    });
  };

  startScreen.addEventListener("pointerdown", armIntroAudio, { once: false });

  startBtn.addEventListener("click", async () => {
    if (started) return;
    started = true;

    // Make sure intro audio starts at least once (gesture guaranteed here)
    armIntroAudio();

    // Transition overlay on
    if (transition) transition.classList.add("transition--on");

    // Fade out intro audio smoothly
    fadeOutAudio(introAudio, 650);

    // After the veil, swap screens
    setTimeout(() => {
      startScreen.classList.remove("screen--active");
      startScreen.setAttribute("aria-hidden", "true");
      startScreen.style.display = "none";

      app.hidden = false;
      document.body.classList.add("site-live");

      // Start main BGM playlist
      initPlaylistPlayer({
        audio: bgmAudio,
        btnPlay,
        volume,
        volReadout,
        trackArtist,
        trackTitle,
      });

      // Build gallery
      initGallery({ galleryModal, galleryGrid, openGalleryBtn });

      // Spawn background ASCII + kaomoji eggs
      initAsciiBackground(bgAsciiLayer);
      initKaomojiCreatures(bgKaomojiLayer, openArcade);

      // Set up arcade
      initArcade({
        arcadeModal,
        canvas: arcadeCanvas,
        hud: arcadeHud,
        nextBtn: arcadeNextBtn,
      });

      // Transition overlay off
      if (transition) {
        setTimeout(() => transition.classList.remove("transition--on"), 250);
      }
    }, 750);
  });

  /* =========================================================
     2) MODALS: close logic (Gallery + Arcade)
     ========================================================= */
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const close = t.getAttribute("data-close");
    if (!close) return;

    if (close === "gallery") closeModal(galleryModal);
    if (close === "arcade") closeModal(arcadeModal);
  });

  function openModal(el) {
    if (!el) return;
    el.hidden = false;
    el.classList.add("modal--open");
    document.body.classList.add("modal-open");
  }
  function closeModal(el) {
    if (!el) return;
    el.classList.remove("modal--open");
    // small delay lets CSS animate if you want
    setTimeout(() => {
      el.hidden = true;
      document.body.classList.remove("modal-open");
    }, 120);
  }

  function openArcade() {
    openModal(arcadeModal);
    // Arcade is initialized at site start; opening just focuses.
    if (arcadeCanvas) arcadeCanvas.focus?.();
  }

  /* =========================================================
     HELPERS
     ========================================================= */
  function fadeOutAudio(audioEl, ms = 500) {
    if (!audioEl) return;
    const startVol = clamp(audioEl.volume, 0, 1);
    const startTime = performance.now();

    const tick = (now) => {
      const p = clamp((now - startTime) / ms, 0, 1);
      audioEl.volume = startVol * (1 - p);
      if (p < 1) requestAnimationFrame(tick);
      else {
        audioEl.pause();
        audioEl.currentTime = 0;
        audioEl.volume = startVol; // restore in case we reuse
      }
    };
    requestAnimationFrame(tick);
  }

  /* =========================================================
     3) PLAYLIST PLAYER
     ========================================================= */
  function initPlaylistPlayer(opts) {
    const audio = opts.audio;
    if (!audio) return;

    let index = 0;
    let isPlaying = false;

    const setTrack = (i) => {
      index = (i + PLAYLIST.length) % PLAYLIST.length;
      const tr = PLAYLIST[index];

      audio.src = tr.src;
      audio.load();

      if (opts.trackArtist) opts.trackArtist.textContent = tr.artist;
      if (opts.trackTitle) opts.trackTitle.textContent = tr.title;
    };

    const play = async () => {
      try {
        await audio.play();
        isPlaying = true;
        syncPlayIcon(true);
      } catch {
        // If play fails, user can click again
        isPlaying = false;
        syncPlayIcon(false);
      }
    };

    const pause = () => {
      audio.pause();
      isPlaying = false;
      syncPlayIcon(false);
    };

    const syncPlayIcon = (playing) => {
      if (!opts.btnPlay) return;
      opts.btnPlay.classList.toggle("is-playing", !!playing);
    };

    // Volume
    const startVol = clamp(parseFloat(opts.volume?.value ?? "0.7"), 0, 1);
    audio.volume = startVol;
    if (opts.volReadout) opts.volReadout.textContent = `${Math.round(startVol * 100)}%`;

    opts.volume?.addEventListener("input", () => {
      const v = clamp(parseFloat(opts.volume.value), 0, 1);
      audio.volume = v;
      if (opts.volReadout) opts.volReadout.textContent = `${Math.round(v * 100)}%`;
    });

    // Play / Pause
    opts.btnPlay?.addEventListener("click", () => {
      if (audio.paused) play();
      else pause();
    });

    // Auto-next on end
    audio.addEventListener("ended", () => {
      setTrack(index + 1);
      play();
    });

    // First track
    setTrack(0);
    play();
  }

  /* =========================================================
     4) GALLERY
     ========================================================= */
  function initGallery({ galleryModal, galleryGrid, openGalleryBtn }) {
    if (!galleryModal || !galleryGrid || !openGalleryBtn) return;

    // Inject items
    galleryGrid.innerHTML = "";

    if (!GALLERY_ITEMS.length) {
      const empty = document.createElement("div");
      empty.className = "gallery-empty";
      empty.textContent = "No gallery items yet. Add files to /assets/gallery and list them in script.js.";
      galleryGrid.appendChild(empty);
    } else {
      for (const item of GALLERY_ITEMS) {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-item";

        if (item.type === "image") {
          const img = document.createElement("img");
          img.src = item.src;
          img.alt = item.alt || "Gallery image";
          img.loading = "lazy";
          card.appendChild(img);

          card.addEventListener("click", () => {
            // Simple “focus” view: open in new tab style behavior but same site
            // If you want a full lightbox later, we can add it.
            window.open(item.src, "_blank", "noopener,noreferrer");
          });
        } else if (item.type === "video") {
          const wrap = document.createElement("div");
          wrap.className = "gallery-video-thumb";

          const poster = document.createElement("img");
          poster.src = item.poster || "";
          poster.alt = item.title || "Video";
          poster.loading = "lazy";

          const label = document.createElement("div");
          label.className = "gallery-video-label";
          label.textContent = item.title || "Video";

          wrap.appendChild(poster);
          wrap.appendChild(label);
          card.appendChild(wrap);

          card.addEventListener("click", () => {
            // Inline video player popup window: simplest is open new tab
            window.open(item.src, "_blank", "noopener,noreferrer");
          });
        }

        galleryGrid.appendChild(card);
      }
    }

    openGalleryBtn.addEventListener("click", () => openModal(galleryModal));
  }

  /* =========================================================
     5) ASCII BACKGROUND DRIFT (your 9 approved BG arts)
     Reads <template id="bg-art-defs"> pre blocks in index.html
     ========================================================= */
  function initAsciiBackground(layer) {
    if (!layer) return;

    const defs = $("#bg-art-defs");
    if (!defs) return;

    // If user prefers reduced motion: keep static placement.
    const reduce = prefersReducedMotion();

    const pres = $all("pre", defs).slice(0, BG_ART_COUNT);

    // Create drifting nodes
    const nodes = pres.map((pre, n) => {
      const el = document.createElement("pre");
      el.className = "bg-ascii";
      el.textContent = pre.textContent.replace(/\n$/, "");

      // data fields
      el.dataset.artId = pre.dataset.artId || `BG_${n}`;
      el.dataset.name = pre.dataset.name || "";
      el.dataset.type = pre.dataset.type || "";

      // Place randomly (start off-screen sometimes for drift vibe)
      const x = rand(-100, window.innerWidth + 100);
      const y = rand(-80, window.innerHeight + 80);

      // Slow drift vector
      const vx = rand(BG_DRIFT_SPEED_MIN, BG_DRIFT_SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);
      const vy = rand(BG_DRIFT_SPEED_MIN, BG_DRIFT_SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);

      // Depth: different opacity / scale per type
      const type = el.dataset.type;
      const depth = depthForType(type);

      el.style.opacity = String(depth.opacity);
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${depth.scale})`;

      layer.appendChild(el);

      return { el, x, y, vx, vy, w: 0, h: 0, depth };
    });

    // Measure dimensions after layout
    requestAnimationFrame(() => {
      for (const obj of nodes) {
        const r = obj.el.getBoundingClientRect();
        obj.w = r.width;
        obj.h = r.height;
      }
    });

    if (reduce) return;

    // Animate drift
    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      for (const o of nodes) {
        o.x += o.vx;
        o.y += o.vy;

        // Wrap around screen edges with buffer
        const buffer = 120;
        if (o.x > W + buffer) o.x = -o.w - buffer;
        if (o.x < -o.w - buffer) o.x = W + buffer;
        if (o.y > H + buffer) o.y = -o.h - buffer;
        if (o.y < -o.h - buffer) o.y = H + buffer;

        o.el.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) scale(${o.depth.scale})`;
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Keep things sane on resize
    window.addEventListener("resize", () => {
      for (const o of nodes) {
        const r = o.el.getBoundingClientRect();
        o.w = r.width;
        o.h = r.height;
      }
    });

    function depthForType(type) {
      // Tune these however you want in CSS later; this is just a nice starting spread.
      switch (type) {
        case "small": return { opacity: 0.18, scale: 0.7 };
        case "large": return { opacity: 0.16, scale: 0.9 };
        case "giant": return { opacity: 0.12, scale: 1.0 };
        case "tall": return { opacity: 0.14, scale: 0.95 };
        case "diagonal": return { opacity: 0.11, scale: 0.85 };
        case "mascot": return { opacity: 0.15, scale: 0.85 };
        case "relic": return { opacity: 0.13, scale: 0.9 };
        case "shrine": return { opacity: 0.10, scale: 0.95 };
        case "massive": return { opacity: 0.08, scale: 1.05 };
        default: return { opacity: 0.12, scale: 0.9 };
      }
    }
  }

  /* =========================================================
     6) KAOMOJI EASTER EGGS
     - Drifting little faces
     - A few are “special”: click -> open arcade
     ========================================================= */
  function initKaomojiCreatures(layer, openArcadeFn) {
    if (!layer) return;

    const reduce = prefersReducedMotion();

    const creatures = [];
    for (let i = 0; i < KAOMOJI_COUNT; i++) {
      const span = document.createElement("button");
      span.type = "button";
      span.className = "kao-creature";
      span.textContent = KAOMOJI_POOL[randi(0, KAOMOJI_POOL.length - 1)];

      const special = Math.random() < ARCADE_EGG_CHANCE;
      if (special) {
        span.classList.add("kao-creature--arcade");
        span.title = "??";
        span.setAttribute("aria-label", "Mysterious Kaomoji");
      } else {
        span.title = "";
        span.setAttribute("aria-label", "Kaomoji Creature");
      }

      // Random start
      let x = rand(20, window.innerWidth - 20);
      let y = rand(20, window.innerHeight - 20);

      // Drift
      const vx = rand(KAO_DRIFT_SPEED_MIN, KAO_DRIFT_SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);
      const vy = rand(KAO_DRIFT_SPEED_MIN, KAO_DRIFT_SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);

      // Depth / subtle variance
      const scale = rand(0.85, 1.15);
      const op = rand(0.25, 0.55);

      span.style.opacity = String(op);
      span.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

      span.addEventListener("click", (e) => {
        e.stopPropagation();
        if (special) {
          openArcadeFn?.();
        } else {
          // tiny “squeak” feedback (visual only)
          span.classList.add("kao-creature--boop");
          setTimeout(() => span.classList.remove("kao-creature--boop"), 220);
        }
      });

      layer.appendChild(span);
      creatures.push({ el: span, x, y, vx, vy, scale, w: 0, h: 0 });
    }

    // measure
    requestAnimationFrame(() => {
      for (const c of creatures) {
        const r = c.el.getBoundingClientRect();
        c.w = r.width;
        c.h = r.height;
      }
    });

    if (reduce) return;

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const buffer = 40;

      for (const c of creatures) {
        c.x += c.vx;
        c.y += c.vy;

        if (c.x > W + buffer) c.x = -c.w - buffer;
        if (c.x < -c.w - buffer) c.x = W + buffer;
        if (c.y > H + buffer) c.y = -c.h - buffer;
        if (c.y < -c.h - buffer) c.y = H + buffer;

        c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.scale})`;
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    window.addEventListener("resize", () => {
      for (const c of creatures) {
        const r = c.el.getBoundingClientRect();
        c.w = r.width;
        c.h = r.height;
      }
    });
  }

  /* =========================================================
     7) KAOMOJI ARCADE (Canvas Mini-Games Starter Pack)
     - Runs inside #arcade-canvas
     - Keybinds:
       Global in-arcade:
       - [Esc] closes arcade
       - [Enter] restart current game
       - [Tab] or Arcade “Next Game” button cycles games
       Game controls are shown in HUD per game.
     ========================================================= */
  function initArcade({ arcadeModal, canvas, hud, nextBtn }) {
    if (!arcadeModal || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas focusable for keyboard
    canvas.tabIndex = 0;

    // Resize helper (keeps crisp pixels without specifying styles here)
    // We keep internal resolution fixed (640x360) for stable gameplay.
    const W = canvas.width;
    const H = canvas.height;

    // Input state
    const keys = new Set();

    const onKeyDown = (e) => {
      // Only listen when arcade is open
      if (arcadeModal.hidden) return;

      // Prevent page scroll on arrows/space inside arcade
      const block = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"];
      if (block.includes(e.key)) e.preventDefault();

      keys.add(e.key);

      // Global arcade keys
      if (e.key === "Escape") closeModal(arcadeModal);
      if (e.key === "Tab") {
        e.preventDefault();
        cycleGame(1);
      }
      if (e.key === "Enter") current?.reset?.();
    };

    const onKeyUp = (e) => {
      if (arcadeModal.hidden) return;
      keys.delete(e.key);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // Games
    const games = [
      makeKaomojiDodgerGame({ W, H }),
      makeKaomojiPongGame({ W, H }),
      makeKaomojiStarCatcherGame({ W, H }),
    ];

    let gameIndex = 0;
    let current = games[gameIndex];
    current.reset();

    // Next button
    nextBtn?.addEventListener("click", () => cycleGame(1));

    // When arcade opens, focus canvas and ensure loop runs
    const observer = new MutationObserver(() => {
      const open = !arcadeModal.hidden;
      if (open) canvas.focus();
    });
    observer.observe(arcadeModal, { attributes: true, attributeFilter: ["hidden"] });

    function cycleGame(dir) {
      gameIndex = (gameIndex + dir + games.length) % games.length;
      current = games[gameIndex];
      current.reset();
      renderHud();
    }

    function renderHud(extra = "") {
      if (!hud) return;
      const title = current.title || "Game";
      const controls = current.controls || "";
      hud.innerHTML = `
        <div class="arcade-hud__row">
          <span class="arcade-hud__title">${escapeHTML(title)}</span>
          <span class="arcade-hud__meta">[Tab / Next] switch • [Enter] restart • [Esc] close</span>
        </div>
        <div class="arcade-hud__row">
          <span class="arcade-hud__controls">${escapeHTML(controls)}</span>
          <span class="arcade-hud__extra">${escapeHTML(extra)}</span>
        </div>
      `;
    }

    // Main loop
    let last = performance.now();
    const loop = (now) => {
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Background for arcade canvas (simple text vibe)
      // No hardcoded colors here; CSS background can show through. We’ll draw minimal UI.
      current.update(dt, keys);
      current.draw(ctx);

      renderHud(current.hudText?.() || "");

      requestAnimationFrame(loop);
    };

    renderHud();
    requestAnimationFrame(loop);

    // Small HTML escape for HUD text
    function escapeHTML(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  }

  /* =========================================================
     GAME 1: KAOMOJI DODGER
     - Move your kaomoji left/right
     - Avoid falling “bad” symbols
     Controls: A/D or ←/→, Space = dash burst
     ========================================================= */
  function makeKaomojiDodgerGame({ W, H }) {
    const playerFace = "(ง'̀-'́)ง";
    const hazards = ["💥", "✖", "☄", "⚡", "◎", "※"];
    const good = ["✧", "☆", "❀"];

    let px, py, pvx, score, alive, dashCd;
    let drops;

    function reset() {
      px = W * 0.5;
      py = H * 0.78;
      pvx = 0;
      score = 0;
      alive = true;
      dashCd = 0;
      drops = [];
    }

    function update(dt, keys) {
      // Spawn falling objects
      if (alive) {
        const spawnRate = 0.9 + Math.min(score / 30, 1.4); // ramps
        const wantsSpawn = Math.random() < dt * spawnRate;
        if (wantsSpawn) {
          const isGood = Math.random() < 0.18;
          drops.push({
            x: rand(10, W - 10),
            y: -10,
            vy: rand(40, 85) + score * 1.2,
            r: isGood ? 10 : 12,
            kind: isGood ? "good" : "bad",
            glyph: isGood ? good[randi(0, good.length - 1)] : hazards[randi(0, hazards.length - 1)],
          });
        }
      }

      // Player movement
      const left = keys.has("a") || keys.has("A") || keys.has("ArrowLeft");
      const right = keys.has("d") || keys.has("D") || keys.has("ArrowRight");
      const dash = keys.has(" ") || keys.has("Spacebar");

      const accel = 360;
      const maxV = 190;

      if (left) pvx -= accel * dt;
      if (right) pvx += accel * dt;
      if (!left && !right) pvx *= Math.pow(0.001, dt); // quick friction

      pvx = clamp(pvx, -maxV, maxV);

      // Dash burst
      if (dashCd > 0) dashCd -= dt;
      if (dash && dashCd <= 0 && alive) {
        const dir = right ? 1 : left ? -1 : (Math.random() < 0.5 ? -1 : 1);
        pvx += dir * 420;
        dashCd = 0.65;
      }

      px += pvx * dt;
      px = clamp(px, 20, W - 20);

      // Update drops
      for (const d of drops) d.y += d.vy * dt;

      // Collisions
      if (alive) {
        for (const d of drops) {
          const dx = d.x - px;
          const dy = d.y - py;
          const dist2 = dx * dx + dy * dy;
          const hit = dist2 < (d.r + 16) * (d.r + 16);
          if (hit) {
            if (d.kind === "bad") {
              alive = false;
              break;
            } else {
              score += 2;
              d.y = H + 999; // remove
            }
          }
        }
      }

      // Remove offscreen drops
      drops = drops.filter((d) => {
        if (d.y > H + 30) {
          if (alive && d.kind === "bad") score += 1; // survived one
          return false;
        }
        return true;
      });
    }

    function draw(ctx) {
      // Title strip
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.font = "16px monospace";
      ctx.fillText("KAOMOJI DODGER", 14, 22);
      ctx.globalAlpha = 0.7;
      ctx.fillText(`Score: ${score}`, 14, 42);
      ctx.restore();

      // Draw drops
      ctx.save();
      ctx.font = "18px monospace";
      for (const d of drops) {
        ctx.globalAlpha = d.kind === "good" ? 0.9 : 0.85;
        ctx.fillText(d.glyph, d.x, d.y);
      }
      ctx.restore();

      // Draw player
      ctx.save();
      ctx.font = alive ? "22px monospace" : "22px monospace";
      ctx.globalAlpha = alive ? 1 : 0.65;
      ctx.fillText(alive ? playerFace : "(x_x)", px - 20, py);
      ctx.restore();

      if (!alive) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.font = "20px monospace";
        ctx.fillText("YOU GOT BONKED", W * 0.33, H * 0.48);
        ctx.font = "14px monospace";
        ctx.fillText("Press Enter to restart", W * 0.34, H * 0.54);
        ctx.restore();
      }
    }

    function hudText() {
      return alive ? "stay alive... (+2 for ✧) " : "rip... press Enter";
    }

    return {
      title: "Kaomoji Dodger",
      controls: "A/D or ←/→ move • Space dash",
      reset,
      update,
      draw,
      hudText,
    };
  }

  /* =========================================================
     GAME 2: KAOMOJI PONG (solo vs wall)
     - Keep the ball alive by bouncing it with your paddle
     Controls: W/S or ↑/↓
     ========================================================= */
  function makeKaomojiPongGame({ W, H }) {
    let paddleY, paddleVy, score, alive;
    let ball;

    function reset() {
      paddleY = H * 0.5;
      paddleVy = 0;
      score = 0;
      alive = true;

      ball = {
        x: W * 0.55,
        y: H * 0.5,
        vx: rand(120, 160) * (Math.random() < 0.5 ? -1 : 1),
        vy: rand(-90, 90),
        r: 6,
      };
    }

    function update(dt, keys) {
      const up = keys.has("w") || keys.has("W") || keys.has("ArrowUp");
      const down = keys.has("s") || keys.has("S") || keys.has("ArrowDown");
      const speed = 220;

      paddleVy = 0;
      if (up) paddleVy = -speed;
      if (down) paddleVy = speed;

      paddleY += paddleVy * dt;
      paddleY = clamp(paddleY, 30, H - 30);

      if (!alive) return;

      // Move ball
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Walls top/bottom
      if (ball.y < 14) {
        ball.y = 14;
        ball.vy *= -1;
      }
      if (ball.y > H - 14) {
        ball.y = H - 14;
        ball.vy *= -1;
      }

      // Right wall bounce (free points)
      if (ball.x > W - 12) {
        ball.x = W - 12;
        ball.vx *= -1;
        score += 1;
      }

      // Paddle on left
      const paddleX = 34;
      const paddleH = 48;

      const withinY = ball.y > paddleY - paddleH * 0.5 && ball.y < paddleY + paddleH * 0.5;
      const hitX = ball.x < paddleX + 8 && ball.x > paddleX - 8;

      if (withinY && hitX && ball.vx < 0) {
        ball.x = paddleX + 9;
        ball.vx *= -1.05;
        // add some angle depending on hit point
        const off = (ball.y - paddleY) / (paddleH * 0.5);
        ball.vy += off * 90;
        score += 2;
      }

      // Missed left edge
      if (ball.x < -20) {
        alive = false;
      }
    }

    function draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.font = "16px monospace";
      ctx.fillText("KAOMOJI PONG", 14, 22);
      ctx.globalAlpha = 0.7;
      ctx.fillText(`Score: ${score}`, 14, 42);
      ctx.restore();

      // Paddle (kaomoji paddle)
      ctx.save();
      ctx.font = "16px monospace";
      ctx.globalAlpha = 0.95;
      // draw paddle as vertical bars
      for (let i = -2; i <= 2; i++) {
        ctx.fillText("│", 30, paddleY + i * 10);
      }
      ctx.restore();

      // Ball
      ctx.save();
      ctx.font = "18px monospace";
      ctx.globalAlpha = 0.95;
      ctx.fillText("●", ball.x, ball.y);
      ctx.restore();

      // Right wall face
      ctx.save();
      ctx.font = "14px monospace";
      ctx.globalAlpha = 0.45;
      ctx.fillText("(¬‿¬)", W - 74, 24);
      ctx.restore();

      if (!alive) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.font = "20px monospace";
        ctx.fillText("BALL ESCAPED", W * 0.35, H * 0.48);
        ctx.font = "14px monospace";
        ctx.fillText("Press Enter to restart", W * 0.34, H * 0.54);
        ctx.restore();
      }
    }

    function hudText() {
      return alive ? "keep it alive (+2 per paddle hit)" : "press Enter";
    }

    return {
      title: "Kaomoji Pong",
      controls: "W/S or ↑/↓ move paddle",
      reset,
      update,
      draw,
      hudText,
    };
  }

  /* =========================================================
     GAME 3: STAR CATCHER
     - Catch falling stars, avoid bombs
     Controls: A/D or ←/→
     ========================================================= */
  function makeKaomojiStarCatcherGame({ W, H }) {
    let px, score, alive;
    let items;
    let spawnTimer;

    function reset() {
      px = W * 0.5;
      score = 0;
      alive = true;
      items = [];
      spawnTimer = 0;
    }

    function update(dt, keys) {
      const left = keys.has("a") || keys.has("A") || keys.has("ArrowLeft");
      const right = keys.has("d") || keys.has("D") || keys.has("ArrowRight");

      const speed = 210;
      if (left) px -= speed * dt;
      if (right) px += speed * dt;
      px = clamp(px, 20, W - 20);

      // spawn
      if (alive) {
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawnTimer = rand(0.25, 0.5);
          const bomb = Math.random() < 0.18;
          items.push({
            x: rand(10, W - 10),
            y: -10,
            vy: rand(70, 120) + score * 0.4,
            kind: bomb ? "bomb" : "star",
            glyph: bomb ? "💣" : (Math.random() < 0.5 ? "☆" : "✧"),
          });
        }
      }

      // update items
      const py = H * 0.82;
      for (const it of items) it.y += it.vy * dt;

      if (alive) {
        for (const it of items) {
          const hit = Math.abs(it.x - px) < 18 && Math.abs(it.y - py) < 14;
          if (hit) {
            if (it.kind === "bomb") {
              alive = false;
            } else {
              score += it.glyph === "✧" ? 2 : 1;
              it.y = H + 999;
            }
          }
        }
      }

      items = items.filter((it) => it.y < H + 40);
    }

    function draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.font = "16px monospace";
      ctx.fillText("STAR CATCHER", 14, 22);
      ctx.globalAlpha = 0.7;
      ctx.fillText(`Score: ${score}`, 14, 42);
      ctx.restore();

      // items
      ctx.save();
      ctx.font = "18px monospace";
      for (const it of items) {
        ctx.globalAlpha = it.kind === "bomb" ? 0.85 : 0.95;
        ctx.fillText(it.glyph, it.x, it.y);
      }
      ctx.restore();

      // player
      ctx.save();
      ctx.font = "22px monospace";
      ctx.globalAlpha = alive ? 1 : 0.65;
      ctx.fillText(alive ? "(•‿•)" : "(ಥ﹏ಥ)", px - 20, H * 0.82);
      ctx.restore();

      if (!alive) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.font = "20px monospace";
        ctx.fillText("BOOM.", W * 0.45, H * 0.48);
        ctx.font = "14px monospace";
        ctx.fillText("Press Enter to restart", W * 0.34, H * 0.54);
        ctx.restore();
      }
    }

    function hudText() {
      return alive ? "catch ☆ / ✧, dodge 💣" : "press Enter";
    }

    return {
      title: "Star Catcher",
      controls: "A/D or ←/→ move",
      reset,
      update,
      draw,
      hudText,
    };
  }
});
