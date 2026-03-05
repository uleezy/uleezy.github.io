// ================================
// ULA SITE: One-page boot flow
// Start screen -> Main site
// Floating music player + logo back button
// ================================

const introScreen = document.getElementById("intro-screen");
const mainSite = document.getElementById("main-site");

const pressStartBtn = document.getElementById("press-start-btn");
const introLoop = document.getElementById("intro-loop");

const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const volumeSlider = document.getElementById("volume-slider");
const logoBackBtn = document.getElementById("logo-back-btn");

const kaomojiContainer = document.getElementById("kaomoji-container");
const canvas = document.getElementById("visualizer-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let audioCtx = null;
let analyser = null;
let dataArray = null;
let animationId = null;

// Optional: set a default background track (put a file in assets/music/)
// Example: assets/music/bg_loop.mp3
const DEFAULT_BG_TRACK = ""; // e.g. "assets/music/bg_loop.mp3"

// ---------- Helpers ----------
function showMain() {
  introScreen.classList.add("hidden");
  mainSite.classList.remove("hidden");
}

function showIntro() {
  mainSite.classList.add("hidden");
  introScreen.classList.remove("hidden");
}

function safePlay(audioEl) {
  if (!audioEl) return;
  const p = audioEl.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function safePause(audioEl) {
  if (!audioEl) return;
  audioEl.pause();
}

function setPlayIcon(isPlaying) {
  playPauseBtn.textContent = isPlaying ? "❚❚" : "▶";
}

function stopEverything() {
  // stop bg music
  safePause(bgMusic);
  bgMusic.currentTime = 0;
  setPlayIcon(false);

  // stop intro loop
  safePause(introLoop);
  introLoop.currentTime = 0;

  // stop visualizer
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;
}

// ---------- Kaomoji ambience ----------
const KAOMOJI = [
  "(・ω・)", "(ง'̀-'́)ง", "(づ｡◕‿‿◕｡)づ", "(T_T)", "(¬_¬)", "(•̀ᴗ•́)و", "(•_•)", "(≧▽≦)", "(._.)"
];

function spawnKaomoji() {
  if (!kaomojiContainer) return;

  const el = document.createElement("div");
  el.textContent = KAOMOJI[Math.floor(Math.random() * KAOMOJI.length)];
  el.style.position = "absolute";
  el.style.left = Math.floor(Math.random() * 100) + "%";
  el.style.top = Math.floor(Math.random() * 100) + "%";
  el.style.opacity = (0.10 + Math.random() * 0.25).toFixed(2);
  el.style.fontSize = (16 + Math.random() * 18).toFixed(0) + "px";
  el.style.transform = `rotate(${(Math.random() * 12 - 6).toFixed(1)}deg)`;
  el.style.color = "rgba(245,245,255,0.7)";
  el.style.pointerEvents = "none";
  el.style.userSelect = "none";
  el.style.whiteSpace = "nowrap";

  kaomojiContainer.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 5000 + Math.random() * 3000);
}

setInterval(spawnKaomoji, 800);

// ---------- Visualizer ----------
function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * devicePixelRatio);
  canvas.height = Math.floor(rect.height * devicePixelRatio);
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

function initAudioGraph() {
  if (audioCtx) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  const source = audioCtx.createMediaElementSource(bgMusic);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function drawVisualizer() {
  if (!ctx || !analyser || !dataArray) return;

  analyser.getByteFrequencyData(dataArray);

  // clear
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  const barCount = 48;
  const step = Math.floor(dataArray.length / barCount);

  const barWidth = Math.max(4, Math.floor(w / barCount));
  const gap = 2;

  for (let i = 0; i < barCount; i++) {
    const v = dataArray[i * step] / 255;
    const barH = Math.floor(v * (h * 0.65));

    const x = i * (barWidth + gap);
    const y = h - barH;

    // no explicit colors requested, so keep it default subtle
    ctx.fillStyle = "rgba(245,245,255,0.18)";
    ctx.fillRect(x, y, barWidth, barH);
  }

  animationId = requestAnimationFrame(drawVisualizer);
}

// ---------- Boot flow ----------
pressStartBtn.addEventListener("click", () => {
  // Intro audio starts on user gesture
  safePlay(introLoop);
  introLoop.volume = 0.6;

  showMain();

  // Prepare BG music
  bgMusic.volume = parseFloat(volumeSlider.value || "0.8");
  if (DEFAULT_BG_TRACK) {
    bgMusic.src = DEFAULT_BG_TRACK;
  }

  resizeCanvas();
});

// ---------- Music controls ----------
playPauseBtn.addEventListener("click", async () => {
  // Ensure audio context exists and is resumed (required by some browsers)
  initAudioGraph();
  if (audioCtx && audioCtx.state === "suspended") {
    try { await audioCtx.resume(); } catch (_) {}
  }

  if (!bgMusic.src) {
    // if you haven't set a track, do nothing gracefully
    // (you can later set DEFAULT_BG_TRACK or programmatically set bgMusic.src)
    return;
  }

  if (bgMusic.paused) {
    safePlay(bgMusic);
    setPlayIcon(true);
    if (!animationId) drawVisualizer();
  } else {
    safePause(bgMusic);
    setPlayIcon(false);
  }
});

volumeSlider.addEventListener("input", () => {
  const vol = parseFloat(volumeSlider.value || "0.8");
  bgMusic.volume = vol;
  introLoop.volume = Math.min(0.8, vol);
});

// ---------- Logo back button ----------
logoBackBtn.addEventListener("click", () => {
  // Back to title screen (clean, game-like)
  stopEverything();
  showIntro();
});
