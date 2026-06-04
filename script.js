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

const titleScreen = document.getElementById("titleScreen");
const siteShell = document.getElementById("siteShell");
const pressStartButton = document.getElementById("pressStartButton");
const skipIntroButton = document.getElementById("skipIntroButton");
const bootSequence = document.getElementById("bootSequence");
const returnToTitle = document.getElementById("returnToTitle");
const soundToggle = document.getElementById("soundToggle");

const titleNavButtons = document.querySelectorAll("[data-start-panel]");
const menuButtons = document.querySelectorAll(".menu-button");
const panels = document.querySelectorAll(".panel");

const trackTitle = document.getElementById("trackTitle");
const trackMeta = document.getElementById("trackMeta");
const playerButtons = document.querySelectorAll("[data-player-action]");
const volumeSlider = document.getElementById("volumeSlider");

const slideText = document.getElementById("slideText");
const slideshowFrame = document.querySelector(".slideshow-frame");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const asciiDrifter = document.getElementById("asciiDrifter");

let soundOn = true;
let audioContext = null;
let currentTrack = 0;
let isPlaying = false;
let currentSlide = 0;
let secretClicks = 0;
let secretModeActive = false;

document.body.classList.add("intro-active");

function hardTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

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

function switchPanel(panelId) {
  panels.forEach((panel) => {
    panel.classList.toggle("active-panel", panel.id === panelId);
  });

  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });

  hardTop();

  secretClicks += 1;

  if (secretClicks >= 18 && !secretModeActive) {
    activateSecretMode();
  }
}

function unlockSite(targetPanel = "homeBase", useBoot = true) {
  beep("start");
  hardTop();

  if (useBoot) {
    bootSequence.classList.add("active");
    bootSequence.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      showSite(targetPanel);
      bootSequence.classList.remove("active");
      bootSequence.setAttribute("aria-hidden", "true");
    }, 1350);

    return;
  }

  showSite(targetPanel);
}

function showSite(targetPanel = "homeBase") {
  hardTop();
  titleScreen.classList.add("hidden");
  document.body.classList.remove("intro-active");
  switchPanel(targetPanel);
  hardTop();
}

function showTitleScreen() {
  beep("back");
  hardTop();
  titleScreen.classList.remove("hidden");
  document.body.classList.add("intro-active");
}

pressStartButton.addEventListener("click", () => {
  unlockSite("homeBase", true);
});

skipIntroButton.addEventListener("click", () => {
  unlockSite("homeBase", false);
});

returnToTitle.addEventListener("click", showTitleScreen);

titleNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.startPanel || "homeBase";
    unlockSite(target, true);
  });
});

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    beep("select");
    switchPanel(button.dataset.panel);
  });
});

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "sound: on" : "sound: off";

  if (soundOn) {
    beep("select");
  }
});

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
  soundOn = Number(volumeSlider.value) > 0;
  soundToggle.textContent = soundOn ? "sound: on" : "sound: off";
});

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

function spawnKaomoji() {
  const kaomoji = document.createElement("span");
  kaomoji.className = "kaomoji";

  kaomoji.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];

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
    spawnKaomoji();

    if (Math.random() > 0.62) {
      window.setTimeout(spawnKaomoji, 400);
    }
  }, 1300);
}

function chooseAsciiArt() {
  return asciiArts[Math.floor(Math.random() * asciiArts.length)];
}

function startAsciiDrifter() {
  if (!asciiDrifter) return;

  asciiDrifter.classList.remove("drift");
  void asciiDrifter.offsetWidth;

  asciiDrifter.textContent = chooseAsciiArt();

  const top = 8 + Math.random() * 56;
  asciiDrifter.style.top = `${top}vh`;

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

asciiDrifter.addEventListener("animationend", () => {
  window.setTimeout(startAsciiDrifter, 600 + Math.random() * 1400);
});

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
  secretToast.style.zIndex = "100";
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !titleScreen.classList.contains("hidden")) {
    unlockSite("homeBase", true);
  }

  if (event.key === "Escape" && titleScreen.classList.contains("hidden")) {
    showTitleScreen();
  }
});

function init() {
  hardTop();
  updateTrack();
  setPlayButtonText();
  updateSlide();
  startKaomojiWeather();
  startAsciiDrifter();
}

init();
