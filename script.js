/* =========================================================
   INTRO NAME CYCLING + GLITCH ULATRON
========================================================= */
const line1Names = ["Ula", "Uleezy", "The Ulanator"];
let nameIndex = 0;

const nameLine1 = document.getElementById("name-line-1");
const nameLine2 = document.getElementById("name-line-2");

function cycleNames() {
    nameIndex = (nameIndex + 1) % line1Names.length;
    nameLine1.textContent = line1Names[nameIndex];
}
setInterval(cycleNames, 6000); // stays ~5–6 seconds per name

// Random glitch on crossed-out Ulatron
setInterval(() => {
    if (Math.random() < 0.3) {
        nameLine2.style.transform = "rotate(" + (Math.random() * 6 - 3) + "deg)";
        nameLine2.style.opacity = 0.7 + Math.random() * 0.3;
    }
}, 200);


/* =========================================================
   PRESS START → INTRO LOOP FADE → TRANSITION
========================================================= */
const introScreen = document.getElementById("intro-screen");
const pressStart = document.getElementById("press-start");
const introMusic = document.getElementById("intro-music");
const gameContainer = document.getElementById("game-container");

pressStart.addEventListener("click", () => {
    introMusic.volume = 1;
    const fadeOut = setInterval(() => {
        introMusic.volume -= 0.05;
        if (introMusic.volume <= 0) {
            clearInterval(fadeOut);
            introMusic.pause();
        }
    }, 80);

    introScreen.style.animation = "fadeOutIntro 1s forwards";

    setTimeout(() => {
        introScreen.style.display = "none";
        gameContainer.classList.remove("hidden");
    }, 1200);
});


/* =========================================================
   GALLERY ROTATOR
========================================================= */
const galleryImages = [
    "https://i.pinimg.com/736x/4f/e4/d2/4fe4d27ec4e7beef97429f855383384c.jpg",
    "https://i.pinimg.com/736x/43/fe/d2/43fed25a912fd4e44af1d35b9aac6a01.jpg",
    "https://i.pinimg.com/736x/4a/90/45/4a9045416707ca4f825c70cb81079ebb.jpg",
    "https://i.pinimg.com/736x/68/d8/e6/68d8e6a18aac67bb0b47c8ec77ec1cd2.jpg",
    "https://i.pinimg.com/736x/86/6d/22/866d220dbf59a6aee104196a586c0832.jpg"
];

const galleryImg = document.getElementById("gallery-img");
let galleryIndex = 0;

function changeGallery() {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    galleryImg.style.opacity = 0;
    setTimeout(() => {
        galleryImg.src = galleryImages[galleryIndex];
        galleryImg.style.opacity = 1;
    }, 400);
}
setInterval(changeGallery, 5000);


/* =========================================================
   KAOMOJI DRIFT SYSTEM (LIMITED POPULATION)
========================================================= */
const kaomojiLayer = document.getElementById("kaomoji-layer");
const kaomojiFaces = [
    "(^_^)", "(•‿•)", "(✿◠‿◠)", "(｡♥‿♥｡)", "(⚆_⚆)",
    "(⊙_⊙)", "(◕‿◕)", "(✧ω✧)", "(≧◡≦)", "(；▽；)",
    "(｡•́︿•̀｡)", "(ಥ_ಥ)", "(´･ω･`)", "(='X'=)", "(>_<)"
];
let maxKaomoji = 12;

function spawnKaomoji() {
    if (kaomojiLayer.children.length >= maxKaomoji) return;

    const k = document.createElement("div");
    k.className = "kaomoji";
    k.textContent = kaomojiFaces[Math.floor(Math.random() * kaomojiFaces.length)];

    k.style.left = Math.random() * 90 + "%";
    k.style.bottom = "-40px";

    kaomojiLayer.appendChild(k);

    setTimeout(() => k.remove(), 12000);
}
setInterval(spawnKaomoji, 2000);


/* =========================================================
   MUSIC PLAYER — RANDOM SHUFFLE SYSTEM
========================================================= */
const musicPlayer = document.getElementById("music-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const skipBtn = document.getElementById("skip-btn");
const volumeSlider = document.getElementById("volume-slider");

const songs = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3",
    "assets/music/song4.mp3",
    "assets/music/song5.mp3",
    "assets/music/song6.mp3",
    "assets/music/song7.mp3"
];

let currentSong = null;

function getRandomSong() {
    let pick = songs[Math.floor(Math.random() * songs.length)];
    if (pick === currentSong) return getRandomSong();
    return pick;
}

function playRandomSong() {
    let next = getRandomSong();
    currentSong = next;

    // crossfade
    let fade = setInterval(() => {
        musicPlayer.volume -= 0.05;
        if (musicPlayer.volume <= 0) {
            clearInterval(fade);
            musicPlayer.src = next;
            musicPlayer.play();
            fadeIn();
        }
    }, 50);
}

function fadeIn() {
    musicPlayer.volume = 0;
    let up = setInterval(() => {
        musicPlayer.volume += 0.05;
        if (musicPlayer.volume >= volumeSlider.value) {
            clearInterval(up);
        }
    }, 50);
}

// AUTOSTART music after transition
setTimeout(() => {
    musicPlayer.src = getRandomSong();
    currentSong = musicPlayer.src;
    musicPlayer.play();
}, 1800);

// Buttons
playBtn.addEventListener("click", () => musicPlayer.play());
pauseBtn.addEventListener("click", () => musicPlayer.pause());

skipBtn.addEventListener("click", () => playRandomSong());

volumeSlider.addEventListener("input", () => {
    musicPlayer.volume = volumeSlider.value;
});


/* =========================================================
   MUSIC HUD — SLIDE UP / DOWN
========================================================= */
const musicHUD = document.getElementById("music-hud");
const musicToggle = document.getElementById("music-toggle");
let hudOpen = false;

musicToggle.addEventListener("click", () => {
    hudOpen = !hudOpen;
    musicHUD.style.bottom = hudOpen ? "20px" : "-260px";
});


/* =========================================================
   SNES PIXEL VISUALIZER
========================================================= */
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioCtx, analyser, bufferLength, dataArray;

function setupVisualizer() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(musicPlayer);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;

    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    animateVisualizer();
}

function animateVisualizer() {
    requestAnimationFrame(animateVisualizer);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;

        ctx.fillStyle = "#ff77ff";
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
    }
}

musicPlayer.addEventListener("play", () => {
    if (!audioCtx) setupVisualizer();
});
