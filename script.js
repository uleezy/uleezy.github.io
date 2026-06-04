/* =========================================================
   ULAVILLE v1.0
   script.js

   This file controls:
   - Press Start intro
   - menu switching
   - retro sound beeps
   - fake music player controls
   - slideshow placeholder
   - floating kaomoji
   - giant rotating Unicode / ASCII drifter
   - hidden easter egg
   ========================================================= */


/* =========================
   EDIT THESE LATER
   ========================= */

// Add/remove kaomoji here.
// These will float in the background.
const kaomojiList = [
  ":3",
  "(￣▽￣)",
  "(¬‿¬)",
  "(｡•̀ᴗ-)✧",
  "(╥﹏╥)",
  "(づ｡◕‿‿◕｡)づ",
  "(ง'̀-'́)ง",
  "(っ˘ڡ˘ς)",
  "( •̀ᴗ•́ )و",
  "(ノಠ益ಠ)ノ",
  "( ˘ ³˘)♥",
  "(￣ヘ￣)",
  "(✿◠‿◠)",
  "(´･ω･`)",
  "(╯°□°）╯",
  "(⌐■_■)",
  "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"
];

// These are the fake music player tracks.
// This player is visual for now. Real listening links are in the site buttons.
const tracks = [
  {
    title: "graceULAnd Blunt Rotation",
    meta: "demo tape // newgrounds transmission"
  },
  {
    title: "Rogues Gallery Demo EP",
    meta: "demo ep // villain file"
  },
  {
    title: "Modern Day Glitch-Hop",
    meta: "album // main file"
  },
  {
    title: "Another Castle",
    meta: "release // side quest"
  },
  {
    title: "Super Lame Boy",
    meta: "back in the lab // rebuilding..."
  }
];

// These are the placeholder slideshow cards.
// Later we can replace these with real image filenames.
const slides = [
  {
    title: "image slot 01",
    note: "artist photo goes here later"
  },
  {
    title: "image slot 02",
    note: "studio photo goes here later"
  },
  {
    title: "image slot 03",
    note: "show footage goes here later"
  },
  {
    title: "image slot 04",
    note: "xbox / room / camcorder archive"
  }
];

// Giant Unicode art drifters.
// These stay as complete text blocks. Do not remove the backticks.
const asciiArts = [
`⠀⠀⠀⢀⠴⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠲⣄⠀⠀⠀
⠀⠀⡰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⠀
⠀⡸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀
⠀⡇⠀⠀⠀⢀⡶⠛⣿⣷⡄⠀⠀⠀⣰⣿⠛⢿⣷⡄⠀⠀⠀⢸⠀
⠀⡇⠀⠀⠀⢸⣷⣶⣿⣿⡇⠀⠀⠀⢻⣿⣶⣿⣿⣿⠀⠀⠀⢸⠀
⠀⡇⠀⠀⠀⠈⠛⠻⠿⠟⠁⠀⠀⠀⠈⠛⠻⠿⠛⠁⠀⠀⠀⢸⠀
⠀⠹⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠏⠀
⠀⠀⠈⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣚⡁⠀⠀
⠀⠀⠀⠀⠈⠙⠒⢢⡤⠤⠤⠤⠤⠤⠖⠒⠒⠋⠉⠉⠀⠀⠉⠉⢦
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸
⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⠀⠀⠀⣤⠀⠀⠀⢀⣀⣀⣀⠀⠀⠀⢸
⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⢠⣿⠀⠀⠀⢸⠀⠀⣿⠀⠀⠀⣸
⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⢸⠘⡆⠀⠀⢸⣀⡰⠋⣆⠀⣠⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⠤⠤⠼⠀⠘⠤⠴⠃⠀⠀⠀⠈⠉⠁⠀`,

`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                 ⣠⣤⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠋⠀⠹⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡇⠀⠀⠀⠀⣿⣠⣤⣤⣄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣸⣧⠀⠀⠀⠀⣿⡏⠀⠈⣿⡆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡾⠉⠉⠟⠀⠀⠀⠀⠉⠁⠀⠀⢹⡇
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⣦⠀⠀⠀⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇
⣠⣄⠀⠀⠀⠀⠀⢀⣾⠁⢹⣧⠀⠀⢈⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠏⠀
⣿⠛⢷⣤⣤⡴⠶⠾⠃⠀⠀⣿⢀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⣀⣼⠏⠀⠀
⢻⡆⣀⡀⠀⠀⠀⠀⣀⣀⠀⣿⡟⠁⠀⠀⠀⠀⠀⢀⣠⣤⠶⠞⠋⠁⠀⠀⠀
⠸⣿⡿⠟⣿⣄⡾⠟⡛⢓⣿⠋⠀⠀⠀⣀⣤⡶⠞⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠹⣷⣼⣁⣽⣧⣽⠿⠋⢁⣠⣴⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⡿⠛⠉⠁⠀⠀⠰⣯⣁⣠⠴⠛⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣾⠋⢀⣄⠀⠀⠀⣀⠀⢿⡷⠦⠴⠶⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⡏⢠⣿⢹⣧⠀⣾⠻⣧⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⢷⠟⠁⢸⡏⠀⣿⠀⠻⣦⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⡇⢸⡟⠀⠀⠈⠁⠀⠀⠀`,

`⠀⠀⠀⠀⠀⢀⠄⠂⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠐⠠⠀⠀⠀⠀⠀⠀
⠀⠀⣠⣤⣮⣤⡤⠤⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠤⠤⢤⣤⣵⣤⣄⠀⠀
⢠⣾⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⡀
⢸⣿⡏⠀⣤⠶⠛⠶⢦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡴⠶⠛⠶⣤⠀⢸⣿⡇
⠘⣿⡇⠀⢿⣤⣄⡄⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⢠⣠⣤⡿⠀⢸⣿⠁
⠀⣿⣇⠀⠀⠀⠉⠁⣰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣇⠈⠉⠀⠀⠀⣸⣿⠀
⠀⠙⡻⣷⣶⣶⣶⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣶⣶⣶⣾⠟⠋⠀
⠀⠀⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀
⠀⠀⠨⠄⠀⠀⠀⠀⠀⠀⠀⢠⣤⣤⣤⣤⣤⣤⡄⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀
⠀⠀⠀⠙⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠛⠷⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⠾⠛⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠓⠶⠶⠶⠶⠶⠒⠚⠛⠉⠁`,

`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠘⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠀⢀⡾⠁⢠⠖⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣈⣁⠀⣾⠃⠀⠨⠄⠘⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⡤⠚⠉⠁⠀⠉⠳⡀⠀⢀⣀⣀⣀⣀⣀⡀
⠀⠀⠀⠀⠀⢠⠮⣉⡿⠀⠀⠀⠀⠀⠀⣽⠟⣋⠥⠒⠛⢶⣤⡽
⠀⠀⠀⠀⠀⠸⡂⢰⣰⡂⠀⠀⠀⠀⠀⠀⢙⣧⣦⣔⡾⠟⠋⠀
⠀⣀⡐⢢⠀⠀⠘⡬⠒⠂⡄⢿⡿⠀⠀⢀⡽⠃⠀⠀⠀⠀⠀⠀
⠘⢦⣁⢸⠀⠀⢠⠞⠀⣄⣙⣒⣀⣤⡴⣿⡁⠀⠀⢀⡀⠀⠀⠀
⠀⠀⠀⠈⠀⠀⡎⠀⠀⠀⠀⠀⠀⠀⠘⣻⣧⠀⢰⠃⠼⢄⠀⠀
⠀⠀⠀⠀⠀⢀⡷⠠⠞⠃⠀⠀⠀⠐⠒⠦⢿⡀⠑⠒⠂⠋⠀⠀
⠀⠀⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⢹⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⢀⢾⠟⠉⢷⡀⢸⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠀⢸⡵⢀⣟⣸⣇⡼⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠛⠓⠒⠒⠒⠚⠛⠛⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀`
];


/* =========================
   ELEMENTS
   ========================= */

const titleScreen = document.getElementById("titleScreen");
const siteShell = document.getElementById("siteShell");
const pressStartButton = document.getElementById("pressStartButton");
const skipIntroButton = document.getElementById("skipIntroButton");
const bootSequence = document.getElementById("bootSequence");
const returnToTitle = document.getElementById("returnToTitle");
const soundToggle = document.getElementById("soundToggle");

const menuButtons = document.querySelectorAll(".menu-button");
const panels = document.querySelectorAll(".panel");
const unlockLinks = document.querySelectorAll(".unlock-link");

const trackTitle = document.getElementById("trackTitle");
const trackMeta = document.getElementById("trackMeta");
const playerButtons = document.querySelectorAll("[data-player-action]");
const volumeSlider = document.getElementById("volumeSlider");

const slideText = document.getElementById("slideText");
const slideshowFrame = document.querySelector(".slideshow-frame");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const asciiDrifter = document.getElementById("asciiDrifter");


/* =========================
   STATE
   ========================= */

let soundOn = true;
let audioContext = null;

let currentTrack = 0;
let isPlaying = false;

let currentSlide = 0;

let secretClicks = 0;
let secretModeActive = false;


/* =========================
   SOUND
   ========================= */

// Modern browsers only let audio start after a user click.
// This makes tiny browser-generated menu beeps, no audio files needed.
function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function beep(type = "menu") {
  if (!soundOn) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  const now = ctx.currentTime;

  const settings = {
    menu: { frequency: 440, end: 0.065, gain: 0.035 },
    select: { frequency: 660, end: 0.09, gain: 0.045 },
    back: { frequency: 240, end: 0.08, gain: 0.04 },
    start: { frequency: 880, end: 0.16, gain: 0.055 },
    secret: { frequency: 1200, end: 0.22, gain: 0.055 }
  };

  const chosen = settings[type] || settings.menu;

  oscillator.type = type === "secret" ? "triangle" : "square";
  oscillator.frequency.setValueAtTime(chosen.frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(80, chosen.frequency * 0.45),
    now + chosen.end
  );

  gain.gain.setValueAtTime(chosen.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + chosen.end);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + chosen.end);
}

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "sound: on" : "sound: off";
  if (soundOn) beep("select");
});


/* =========================
   TITLE SCREEN / INTRO
   ========================= */

function unlockSite(targetPanel = "homeBase", useBoot = true) {
  beep("start");

  if (useBoot) {
    bootSequence.classList.add("active");
    bootSequence.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      bootSequence.classList.remove("active");
      bootSequence.setAttribute("aria-hidden", "true");
      showSite(targetPanel);
    }, 1450);
  } else {
    showSite(targetPanel);
  }
}

function showSite(targetPanel = "homeBase") {
  titleScreen.hidden = true;
  siteShell.hidden = false;

  switchPanel(targetPanel);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showTitleScreen() {
  beep("back");
  titleScreen.hidden = false;
  siteShell.hidden = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

pressStartButton.addEventListener("click", () => {
  unlockSite("homeBase", true);
});

skipIntroButton.addEventListener("click", () => {
  unlockSite("homeBase", false);
});

returnToTitle.addEventListener("click", showTitleScreen);

unlockLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = link.dataset.unlockTarget || "homeBase";
    unlockSite(target, true);
  });
});


/* =========================
   MENU SWITCHING
   ========================= */

function switchPanel(panelId) {
  panels.forEach((panel) => {
    panel.classList.toggle("active-panel", panel.id === panelId);
  });

  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });

  secretClicks += 1;

  if (secretClicks >= 18 && !secretModeActive) {
    activateSecretMode();
  }
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    beep("select");
    switchPanel(button.dataset.panel);
  });
});


/* =========================
   FAKE MUSIC PLAYER
   ========================= */

function updateTrack() {
  const track = tracks[currentTrack];
  trackTitle.textContent = track.title;
  trackMeta.textContent = track.meta;
}

function setPlayButtonText() {
  const playButton = document.querySelector('[data-player-action="play"]');
  if (!playButton) return;
  playButton.textContent = isPlaying ? "pause" : "play";
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  updateTrack();
}

function prevTrackAction() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  updateTrack();
}

playerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.playerAction;

    if (action === "play") {
      isPlaying = !isPlaying;
      beep(isPlaying ? "select" : "back");
      setPlayButtonText();
      return;
    }

    if (action === "next") {
      beep("menu");
      nextTrack();
      return;
    }

    if (action === "prev") {
      beep("menu");
      prevTrackAction();
    }
  });
});

volumeSlider.addEventListener("input", () => {
  // This controls beep volume lightly by turning sound off at 0.
  // The fake player itself is visual only for now.
  soundOn = Number(volumeSlider.value) > 0;
  soundToggle.textContent = soundOn ? "sound: on" : "sound: off";
});


/* =========================
   SLIDESHOW PLACEHOLDER
   ========================= */

function updateSlide() {
  const slide = slides[currentSlide];

  slideText.textContent = slide.title;

  const slideNote = slideshowFrame.querySelector("span");
  if (slideNote) {
    slideNote.textContent = slide.note;
  }
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}

nextSlide.addEventListener("click", () => {
  beep("menu");
  goToNextSlide();
});

prevSlide.addEventListener("click", () => {
  beep("menu");
  goToPrevSlide();
});


/* =========================
   FLOATING KAOMOJI
   ========================= */

function spawnKaomoji() {
  const kaomoji = document.createElement("span");
  kaomoji.className = "kaomoji";

  const text = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];
  kaomoji.textContent = text;

  const left = Math.random() * 100;
  const duration = 9000 + Math.random() * 13000;
  const driftX = `${-80 + Math.random() * 160}px`;
  const spin = `${-35 + Math.random() * 70}deg`;
  const opacity = 0.28 + Math.random() * 0.42;

  kaomoji.style.left = `${left}vw`;
  kaomoji.style.bottom = "-10vh";
  kaomoji.style.animationDuration = `${duration}ms`;
  kaomoji.style.opacity = String(opacity);
  kaomoji.style.setProperty("--drift-x", driftX);
  kaomoji.style.setProperty("--spin", spin);

  document.body.appendChild(kaomoji);

  window.setTimeout(() => {
    kaomoji.remove();
  }, duration + 500);
}

function startKaomojiWeather() {
  spawnKaomoji();

  window.setInterval(() => {
    const shouldSpawnExtra = Math.random() > 0.62;
    spawnKaomoji();

    if (shouldSpawnExtra) {
      window.setTimeout(spawnKaomoji, 400);
    }
  }, 1300);
}


/* =========================
   GIANT ASCII / UNICODE DRIFTER
   ========================= */

function chooseAsciiArt() {
  const index = Math.floor(Math.random() * asciiArts.length);
  return asciiArts[index];
}

function startAsciiDrifter() {
  if (!asciiDrifter) return;

  asciiDrifter.classList.remove("drift");

  // Force the browser to notice the animation restart.
  void asciiDrifter.offsetWidth;

  asciiDrifter.textContent = chooseAsciiArt();

  // Randomize height slightly so it doesn't always pass through the same lane.
  const top = 8 + Math.random() * 56;
  asciiDrifter.style.top = `${top}vh`;

  // Randomize color while staying within the Ulaville palette.
  const colors = [
    "var(--green)",
    "var(--gold)",
    "var(--pink)",
    "var(--blue)",
    "var(--purple)"
  ];

  asciiDrifter.style.color = colors[Math.floor(Math.random() * colors.length)];

  asciiDrifter.classList.add("drift");
}

// Restart drifter when animation ends.
asciiDrifter.addEventListener("animationend", () => {
  window.setTimeout(startAsciiDrifter, 600 + Math.random() * 1400);
});


/* =========================
   EASTER EGG
   ========================= */

function activateSecretMode() {
  secretModeActive = true;
  document.body.classList.add("secret-mode");
  beep("secret");

  const secretToast = document.createElement("div");
  secretToast.textContent = "secret mode unlocked: button goblin detected";
  secretToast.style.position = "fixed";
  secretToast.style.left = "50%";
  secretToast.style.bottom = "22px";
  secretToast.style.transform = "translateX(-50%)";
  secretToast.style.zIndex = "90";
  secretToast.style.maxWidth = "min(92vw, 520px)";
  secretToast.style.padding = "0.85rem 1rem";
  secretToast.style.border = "1px solid rgba(255, 121, 198, 0.65)";
  secretToast.style.borderRadius = "999px";
  secretToast.style.color = "#050508";
  secretToast.style.background = "linear-gradient(90deg, var(--pink), var(--gold))";
  secretToast.style.fontFamily = "var(--mono)";
  secretToast.style.fontSize = "0.75rem";
  secretToast.style.textAlign = "center";
  secretToast.style.textTransform = "uppercase";
  secretToast.style.boxShadow = "0 0 30px rgba(255, 121, 198, 0.45)";

  document.body.appendChild(secretToast);

  window.setTimeout(() => {
    secretToast.remove();
  }, 5200);
}


/* =========================
   KEYBOARD SHORTCUTS
   ========================= */

// Enter on the title screen presses start.
// Escape returns to the title screen from the main site.
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !titleScreen.hidden) {
    unlockSite("homeBase", true);
  }

  if (event.key === "Escape" && !siteShell.hidden) {
    showTitleScreen();
  }
});


/* =========================
   INITIALIZE
   ========================= */

function init() {
  updateTrack();
  setPlayButtonText();
  updateSlide();

  startKaomojiWeather();
  startAsciiDrifter();

  // Little first-load beep only happens after a user interacts,
  // so this does not actually make sound immediately. That is normal.
}

init();
