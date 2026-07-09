(() => {
  "use strict";

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

  const fallbackPlaylist = [
    { title: "The Ulanator", artist: "Ula", src: "music/the%20ulanator.mp3" },
    { title: "The Ulatron", artist: "Ula", src: "music/the%20ulatron.mp3" },
    { title: "Ula", artist: "Ula", src: "music/ula.mp3" },
    { title: "Uleezy", artist: "Ula", src: "music/uleezy.mp3" }
  ];

  const fallbackGallery = [
    { title: "pic1", src: "images/pic1.jpg" },
    { title: "pic2", src: "images/pic2.jpg" },
    { title: "pic3", src: "images/pic3.jpg" },
    { title: "pic4", src: "images/pic4.jpg" },
    { title: "pic5", src: "images/pic5.jpg" },
    { title: "pic6", src: "images/pic6.jpg" },
    { title: "pic7", src: "images/pic7.jpg" },
    { title: "pic8", src: "images/pic8.jpg" },
    { title: "pic9", src: "images/pic9.jpg" },
    { title: "pic10", src: "images/pic10.jpg" },
    { title: "pic11", src: "images/pic11.jpg" },
    { title: "pic12", src: "images/pic12.jpg" },
    { title: "pic13", src: "images/pic13.jpg" },
    { title: "ula banner", src: "images/ula%20banner.jpg" }
  ];

  const $ = (id) => document.getElementById(id);

  const titleScreen = $("titleScreen");
  const siteShell = $("siteShell");
  const startTransition = $("startTransition");
  const soundToggle = $("soundToggle");

  const introLoopAudio = $("introLoopAudio");
  const siteMusicAudio = $("siteMusicAudio");

  const currentTrackTitle = $("currentTrackTitle");
  const currentTrackMeta = $("currentTrackMeta");
  const playerStateBadge = $("playerStateBadge");
  const playPauseButton = $("playPauseButton");
  const prevTrackButton = $("prevTrackButton");
  const nextTrackButton = $("nextTrackButton");
  const volumeSlider = $("volumeSlider");
  const trackProgressFill = $("trackProgressFill");
  const currentTimeText = $("currentTimeText");
  const durationText = $("durationText");
  const danceSprite = $("danceSprite");
  const danceSpriteStatus = $("danceSpriteStatus");

  const galleryImage = $("galleryImage");
  const galleryCaption = $("galleryCaption");
  const prevImageButton = $("prevImageButton");
  const nextImageButton = $("nextImageButton");

  const archiveVideo = $("archiveVideo");
  const asciiDrifter = $("asciiDrifter");

  const menuButtons = document.querySelectorAll(".menu-button");
  const panels = document.querySelectorAll(".panel");
  const panelJumpButtons = document.querySelectorAll("[data-panel-jump]");
  const videoSelectButtons = document.querySelectorAll(".video-select-button");

  let soundOn = true;
  let siteUnlocked = false;
  let introLoopStarted = false;
  let audioContext = null;

  let playlist = readJsonScript("localPlaylistData", fallbackPlaylist);
  let galleryItems = readJsonScript("galleryData", fallbackGallery);
  let shuffledPlaylist = shuffleArray(playlist);
  let currentTrackIndex = 0;
  let currentGalleryIndex = 0;

  let frozenDanceCanvas = null;

  function readJsonScript(scriptId, fallbackData) {
    const script = $(scriptId);

    if (!script) {
      return fallbackData;
    }

    try {
      const parsed = JSON.parse(script.textContent.trim());
      return Array.isArray(parsed) && parsed.length ? parsed : fallbackData;
    } catch (error) {
      console.warn(`Could not parse ${scriptId}`, error);
      return fallbackData;
    }
  }

  function shuffleArray(array) {
    const clone = [...array];

    for (let i = clone.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[randomIndex]] = [clone[randomIndex], clone[i]];
    }

    return clone;
  }

  function resetScrollPositions() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (titleScreen) titleScreen.scrollTop = 0;
    if (siteShell) siteShell.scrollTop = 0;
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

    const settings = {
      menu: { frequency: 440, end: 0.065, gain: 0.035, wave: "square" },
      select: { frequency: 660, end: 0.09, gain: 0.045, wave: "square" },
      back: { frequency: 240, end: 0.08, gain: 0.04, wave: "triangle" },
      start: { frequency: 880, end: 0.18, gain: 0.055, wave: "square" },
      glitch: { frequency: 1300, end: 0.24, gain: 0.05, wave: "sawtooth" }
    };

    const chosen = settings[type] || settings.menu;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    oscillator.type = chosen.wave;
    oscillator.frequency.setValueAtTime(chosen.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(90, chosen.frequency * 0.42),
      now + chosen.end
    );

    gain.gain.setValueAtTime(chosen.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + chosen.end);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + chosen.end);
  }

  function setAudioVolumes() {
    const value = volumeSlider ? Number(volumeSlider.value) / 100 : 0.75;

    if (introLoopAudio) {
      introLoopAudio.volume = Math.min(0.35, value * 0.45);
    }

    if (siteMusicAudio) {
      siteMusicAudio.volume = value;
    }

    soundOn = value > 0;

    if (soundToggle) {
      soundToggle.textContent = soundOn ? "sound: on" : "sound: off";
    }
  }

  function tryStartIntroLoop() {
    if (!introLoopAudio || siteUnlocked || introLoopStarted || !soundOn) return;

    setAudioVolumes();

    const playPromise = introLoopAudio.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          introLoopStarted = true;
        })
        .catch(() => {
          introLoopStarted = false;
        });
    } else {
      introLoopStarted = true;
    }
  }

  function fadeOutAudio(audioElement, duration = 1500) {
    return new Promise((resolve) => {
      if (!audioElement) {
        resolve();
        return;
      }

      const startVolume = audioElement.volume || 0;
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        audioElement.volume = startVolume * (1 - progress);

        if (progress < 1) {
          requestAnimationFrame(step);
          return;
        }

        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.volume = startVolume;
        resolve();
      }

      requestAnimationFrame(step);
    });
  }

  function revealSiteShell() {
    document.body.classList.remove("title-mode");
    document.body.classList.add("site-started", "music-paused");

    if (titleScreen) titleScreen.hidden = true;

    if (siteShell) {
      siteShell.hidden = false;
      siteShell.setAttribute("aria-hidden", "false");
      siteShell.scrollTop = 0;
    }

    switchPanel("homePanel", false);
    resetScrollPositions();
  }

  function hideSiteShell() {
    document.body.classList.add("title-mode", "music-paused");
    document.body.classList.remove("site-started", "music-playing");

    if (titleScreen) titleScreen.hidden = false;

    if (siteShell) {
      siteShell.hidden = true;
      siteShell.setAttribute("aria-hidden", "true");
    }

    resetScrollPositions();
  }

  window.ulavilleStart = function (event) {
    if (event) event.preventDefault();
    if (siteUnlocked) return;

    siteUnlocked = true;

    beep("start");
    window.setTimeout(() => beep("glitch"), 140);

    if (archiveVideo && !archiveVideo.paused) {
      archiveVideo.pause();
    }

    if (startTransition) {
      startTransition.classList.add("active");
      startTransition.setAttribute("aria-hidden", "false");
    }

    fadeOutAudio(introLoopAudio, 1700);

    window.setTimeout(() => {
      revealSiteShell();
      startRandomPlaylist();
    }, 950);

    window.setTimeout(() => {
      if (startTransition) {
        startTransition.classList.remove("active");
        startTransition.setAttribute("aria-hidden", "true");
      }
    }, 1750);
  };

  window.ulavilleSkipIntro = function (event) {
    if (event) event.preventDefault();
    if (siteUnlocked) return;

    siteUnlocked = true;

    beep("start");
    fadeOutAudio(introLoopAudio, 350);
    revealSiteShell();
    startRandomPlaylist();
  };

  window.ulavilleReturnTitle = function (event) {
    if (event) event.preventDefault();

    beep("back");
    siteUnlocked = false;
    pauseSiteMusic();

    if (archiveVideo && !archiveVideo.paused) {
      archiveVideo.pause();
    }

    hideSiteShell();

    introLoopStarted = false;
    window.setTimeout(tryStartIntroLoop, 250);
  };

  function switchPanel(panelId, makeSound = true) {
    if (makeSound) beep("select");

    panels.forEach((panel) => {
      panel.classList.toggle("active-panel", panel.id === panelId);
    });

    menuButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.panel === panelId);
    });

    if (siteShell) siteShell.scrollTop = 0;
  }

  function startRandomPlaylist() {
    shuffledPlaylist = shuffleArray(playlist);
    currentTrackIndex = 0;
    loadCurrentTrack();
    playSiteMusic();
  }

  function loadCurrentTrack() {
    if (!siteMusicAudio) return;

    if (!shuffledPlaylist.length) {
      shuffledPlaylist = shuffleArray(playlist);
    }

    const track = shuffledPlaylist[currentTrackIndex];
    if (!track) return;

    siteMusicAudio.src = track.src;
    siteMusicAudio.load();

    if (currentTrackTitle) currentTrackTitle.textContent = track.title;
    if (currentTrackMeta) currentTrackMeta.textContent = `${track.artist} // ulaville radio`;
    if (playerStateBadge) playerStateBadge.textContent = "track loaded";

    updateProgressUI();
  }

  function playSiteMusic() {
    if (!siteMusicAudio) return;

    if (!siteMusicAudio.src) {
      loadCurrentTrack();
    }

    setAudioVolumes();

    const playPromise = siteMusicAudio.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setMusicState(true))
        .catch(() => {
          setMusicState(false);
          if (playerStateBadge) playerStateBadge.textContent = "tap play";
        });
      return;
    }

    setMusicState(true);
  }

  function pauseSiteMusic() {
    if (!siteMusicAudio) return;
    siteMusicAudio.pause();
    setMusicState(false);
  }

  function toggleSiteMusic() {
    if (!siteMusicAudio) return;

    if (siteMusicAudio.paused) {
      beep("select");
      playSiteMusic();
      return;
    }

    beep("back");
    pauseSiteMusic();
  }

  function nextTrack() {
    beep("menu");

    currentTrackIndex += 1;

    if (currentTrackIndex >= shuffledPlaylist.length) {
      shuffledPlaylist = shuffleArray(playlist);
      currentTrackIndex = 0;
    }

    loadCurrentTrack();
    playSiteMusic();
  }

  function previousTrack() {
    beep("menu");

    currentTrackIndex -= 1;

    if (currentTrackIndex < 0) {
      currentTrackIndex = shuffledPlaylist.length - 1;
    }

    loadCurrentTrack();
    playSiteMusic();
  }

  function setMusicState(isPlaying) {
    document.body.classList.toggle("music-playing", isPlaying);
    document.body.classList.toggle("music-paused", !isPlaying);

    if (playPauseButton) playPauseButton.textContent = isPlaying ? "pause" : "play";
    if (playerStateBadge) playerStateBadge.textContent = isPlaying ? "playing" : "paused";
    if (danceSpriteStatus) danceSpriteStatus.textContent = isPlaying ? "dancing..." : "idle...";

    if (isPlaying) {
      unfreezeDanceSprite();
    } else {
      freezeDanceSprite();
    }
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  function updateProgressUI() {
    if (!siteMusicAudio) return;

    const current = siteMusicAudio.currentTime || 0;
    const duration = siteMusicAudio.duration || 0;
    const progress = duration > 0 ? (current / duration) * 100 : 0;

    if (trackProgressFill) trackProgressFill.style.width = `${Math.min(progress, 100)}%`;
    if (currentTimeText) currentTimeText.textContent = formatTime(current);
    if (durationText) durationText.textContent = formatTime(duration);
  }

  function freezeDanceSprite() {
    if (!danceSprite || !danceSprite.complete) return;

    if (!frozenDanceCanvas) {
      frozenDanceCanvas = document.createElement("canvas");
      frozenDanceCanvas.setAttribute("aria-hidden", "true");
      frozenDanceCanvas.style.maxWidth = "min(110px, 100%)";
      frozenDanceCanvas.style.maxHeight = "122px";
      frozenDanceCanvas.style.objectFit = "contain";
      frozenDanceCanvas.style.filter =
        "grayscale(0.55) drop-shadow(0 0 10px rgba(255, 211, 106, 0.26))";
    }

    const width = danceSprite.naturalWidth || danceSprite.width || 120;
    const height = danceSprite.naturalHeight || danceSprite.height || 120;

    frozenDanceCanvas.width = width;
    frozenDanceCanvas.height = height;

    try {
      const ctx = frozenDanceCanvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(danceSprite, 0, 0, width, height);

      danceSprite.style.display = "none";

      if (!frozenDanceCanvas.parentElement && danceSprite.parentElement) {
        danceSprite.parentElement.insertBefore(frozenDanceCanvas, danceSprite);
      }

      frozenDanceCanvas.style.display = "block";
    } catch {
      danceSprite.style.opacity = "0.55";
    }
  }

  function unfreezeDanceSprite() {
    if (frozenDanceCanvas) frozenDanceCanvas.style.display = "none";

    if (danceSprite) {
      danceSprite.style.display = "";
      danceSprite.style.opacity = "";
    }
  }

  function getImageCandidates(src) {
    const cleanSrc = src.trim();
    const base = cleanSrc.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "");

    return [
      cleanSrc,
      `${base}.jpg`,
      `${base}.jpeg`,
      `${base}.png`,
      `${base}.webp`,
      `${base}.JPG`,
      `${base}.JPEG`,
      `${base}.PNG`,
      `${base}.WEBP`
    ];
  }

  function tryLoadGalleryImage(candidates, item, index = 0) {
    if (!galleryImage || !galleryCaption) return;

    if (index >= candidates.length) {
      galleryCaption.textContent = `${item.title} ain't loading yet`;
      galleryImage.style.opacity = "0.35";
      galleryImage.classList.remove("is-changing");
      return;
    }

    const testImage = new Image();

    testImage.onload = () => {
      galleryImage.src = candidates[index];
      galleryImage.alt = `Ulaville photo: ${item.title}`;
      galleryCaption.textContent = item.title;
      galleryImage.style.opacity = "";
    };

    testImage.onerror = () => {
      tryLoadGalleryImage(candidates, item, index + 1);
    };

    testImage.src = candidates[index];
  }

  function updateGalleryImage() {
    if (!galleryImage || !galleryCaption || !galleryItems.length) return;

    const item = galleryItems[currentGalleryIndex];

    galleryImage.classList.add("is-changing");

    window.setTimeout(() => {
      tryLoadGalleryImage(getImageCandidates(item.src), item);
    }, 90);

    window.setTimeout(() => {
      galleryImage.classList.remove("is-changing");
    }, 290);
  }

  function nextImage() {
    beep("menu");
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateGalleryImage();
  }

  function previousImage() {
    beep("menu");
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGalleryImage();
  }

  function selectVideo(videoButton) {
    beep("select");

    if (!archiveVideo || !videoButton.dataset.videoSrc) return;

    videoSelectButtons.forEach((button) => {
      button.classList.toggle("active", button === videoButton);
    });

    const source = archiveVideo.querySelector("source");
    if (!source) return;

    archiveVideo.pause();
    source.src = videoButton.dataset.videoSrc;
    archiveVideo.load();
  }

  function spawnKaomoji() {
    const kaomoji = document.createElement("span");
    kaomoji.className = "kaomoji";
    kaomoji.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];

    const duration = 9000 + Math.random() * 13000;

    kaomoji.style.left = `${Math.random() * 100}vw`;
    kaomoji.style.bottom = "-10vh";
    kaomoji.style.animationDuration = `${duration}ms`;
    kaomoji.style.opacity = String(0.28 + Math.random() * 0.42);
    kaomoji.style.setProperty("--drift-x", `${-90 + Math.random() * 180}px`);
    kaomoji.style.setProperty("--spin", `${-35 + Math.random() * 70}deg`);

    document.body.appendChild(kaomoji);

    window.setTimeout(() => kaomoji.remove(), duration + 500);
  }

  function spawnParticle() {
    const particle = document.createElement("span");
    particle.className = "pixel-particle";

    const colors = ["var(--gold)", "var(--pink)", "var(--blue)", "var(--soft-pink)"];

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = "-8vh";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = `${4200 + Math.random() * 7600}ms`;
    particle.style.opacity = String(0.25 + Math.random() * 0.55);
    particle.style.setProperty("--drift-x", `${-80 + Math.random() * 160}px`);

    document.body.appendChild(particle);

    window.setTimeout(() => particle.remove(), 12500);
  }

  function startKaomojiWeather() {
    spawnKaomoji();

    window.setInterval(() => {
      spawnKaomoji();

      if (Math.random() > 0.68) {
        window.setTimeout(spawnKaomoji, 420);
      }
    }, 1400);

    window.setInterval(() => {
      spawnParticle();

      if (Math.random() > 0.7) {
        window.setTimeout(spawnParticle, 240);
      }
    }, 900);
  }

  function chooseAsciiArt() {
    return asciiArts[Math.floor(Math.random() * asciiArts.length)];
  }

  function startAsciiDrifter() {
    if (!asciiDrifter) return;

    asciiDrifter.classList.remove("drift");
    void asciiDrifter.offsetWidth;

    asciiDrifter.textContent = chooseAsciiArt();
    asciiDrifter.style.top = `${7 + Math.random() * 58}vh`;

    const colors = ["var(--gold)", "var(--pink)", "var(--soft-pink)", "var(--blue)", "var(--purple)"];
    asciiDrifter.style.color = colors[Math.floor(Math.random() * colors.length)];

    asciiDrifter.classList.add("drift");
  }

  function bindEvents() {
    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        soundOn = !soundOn;
        soundToggle.textContent = soundOn ? "sound: on" : "sound: off";

        if (!soundOn) {
          if (introLoopAudio) introLoopAudio.pause();
          if (siteMusicAudio) siteMusicAudio.pause();
          setMusicState(false);
          return;
        }

        beep("select");

        if (siteUnlocked) {
          playSiteMusic();
        } else {
          tryStartIntroLoop();
        }
      });
    }

    menuButtons.forEach((button) => {
      button.addEventListener("click", () => switchPanel(button.dataset.panel, true));
    });

    panelJumpButtons.forEach((button) => {
      button.addEventListener("click", () => switchPanel(button.dataset.panelJump, true));
    });

    if (playPauseButton) playPauseButton.addEventListener("click", toggleSiteMusic);
    if (nextTrackButton) nextTrackButton.addEventListener("click", nextTrack);
    if (prevTrackButton) prevTrackButton.addEventListener("click", previousTrack);

    if (volumeSlider) {
      volumeSlider.addEventListener("input", () => {
        setAudioVolumes();

        if (!soundOn) {
          if (introLoopAudio) introLoopAudio.pause();
          if (siteMusicAudio) siteMusicAudio.pause();
          setMusicState(false);
        } else if (!siteUnlocked) {
          tryStartIntroLoop();
        }
      });
    }

    if (siteMusicAudio) {
      siteMusicAudio.addEventListener("timeupdate", updateProgressUI);
      siteMusicAudio.addEventListener("loadedmetadata", updateProgressUI);
      siteMusicAudio.addEventListener("ended", nextTrack);
      siteMusicAudio.addEventListener("play", () => setMusicState(true));
      siteMusicAudio.addEventListener("pause", () => {
        if (siteUnlocked) setMusicState(false);
      });
    }

    if (prevImageButton) prevImageButton.addEventListener("click", previousImage);
    if (nextImageButton) nextImageButton.addEventListener("click", nextImage);

    videoSelectButtons.forEach((button) => {
      button.addEventListener("click", () => selectVideo(button));
    });

    if (archiveVideo) {
      archiveVideo.addEventListener("play", () => {
        if (siteMusicAudio && !siteMusicAudio.paused) {
          pauseSiteMusic();
        }
      });
    }

    if (asciiDrifter) {
      asciiDrifter.addEventListener("animationend", () => {
        window.setTimeout(startAsciiDrifter, 600 + Math.random() * 1400);
      });
    }

    document.addEventListener("pointerdown", () => {
      if (!siteUnlocked) tryStartIntroLoop();
    }, { once: true });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !siteUnlocked) window.ulavilleStart(event);
      if (event.key === "Escape" && siteUnlocked) window.ulavilleReturnTitle(event);

      if (event.code === "Space" && siteUnlocked) {
        const activeTag = document.activeElement?.tagName?.toLowerCase();

        if (activeTag !== "input" && activeTag !== "button") {
          event.preventDefault();
          toggleSiteMusic();
        }
      }
    });
  }

  function init() {
    resetScrollPositions();

    document.body.classList.add("title-mode", "music-paused");
    document.body.classList.remove("site-started", "music-playing");

    if (siteShell) {
      siteShell.hidden = true;
      siteShell.setAttribute("aria-hidden", "true");
    }

    if (titleScreen) {
      titleScreen.hidden = false;
    }

    setAudioVolumes();
    updateProgressUI();
    updateGalleryImage();
    setMusicState(false);
    bindEvents();
    startKaomojiWeather();
    startAsciiDrifter();

    window.setTimeout(tryStartIntroLoop, 450);
  }

  init();
})();
