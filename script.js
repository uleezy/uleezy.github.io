/* ====================================================== */
/*                INTRO SCREEN + AUDIO                    */
/* ====================================================== */

const introScreen = document.getElementById("intro-screen");
const pressStartBtn = document.getElementById("press-start-btn");
const introLoop = document.getElementById("intro-loop");
const glitchOverlay = document.getElementById("glitch-overlay");
const mainSite = document.getElementById("main-site");

// Autoplay-safe setup
introLoop.volume = 0.0;
introLoop.muted = true;
introLoop.play().catch(() => {});

/* Fade in intro loop after click */
function fadeInIntroLoop() {
    introLoop.muted = false;
    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.05;
        introLoop.volume = vol;
        if (vol >= 0.8) clearInterval(fade);
    }, 60);
}

/* ====================================================== */
/*         KAOMOJI FLOAT PARTICLES                        */
/* ====================================================== */

const kaomojiList = [
    "(｡•́‿•̀｡)", "(╥﹏╥)", "(>_<)", "(¬‿¬)", 
    "(◕‿◕)", "(✿◠‿◠)", "(ﾉ◕ヮ◕)ﾉ*", "(ಠ_ಠ)"
];

function spawnKaomoji() {
    const container = document.getElementById("kaomoji-container");
    const span = document.createElement("span");

    span.classList.add("kaomoji");
    span.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.top = Math.random() * 100 + "%";

    container.appendChild(span);

    setTimeout(() => span.remove(), 15000);
}

setInterval(spawnKaomoji, 1200);


/* ====================================================== */
/*   PRESS START → GLITCH → LOAD MAIN SITE                */
/* ====================================================== */

pressStartBtn.addEventListener("click", () => {

    fadeInIntroLoop();

    setTimeout(() => {
        glitchOverlay.classList.add("glitch-active");

        let vol = introLoop.volume;
        const fadeOut = setInterval(() => {
            vol -= 0.08;
            introLoop.volume = Math.max(0, vol);
            if (vol <= 0) {
                clearInterval(fadeOut);
                introLoop.pause();
            }
        }, 50);

        setTimeout(() => {
            introScreen.classList.add("hidden");
            mainSite.classList.remove("hidden");
            startPlaylist();
        }, 1600);

    }, 800);
});


/* ====================================================== */
/*                        GALLERY                         */
/* ====================================================== */

const galleryImages = [
    "assets/images/main-image-2.png",
    "assets/images/main-image-3.webp",
    "assets/images/main-image-4.webp",
    "assets/images/main-image-7.jpg",
    "assets/images/main-image-8.jpg"
];

const galleryImage = document.getElementById("gallery-image");

let galleryIndex = 0;
galleryImages.sort(() => Math.random() - 0.5);

function showGalleryItem() {
    galleryImage.style.opacity = 0;
    setTimeout(() => {
        galleryImage.src = galleryImages[galleryIndex];
        galleryImage.style.opacity = 1;
    }, 400);
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
}

showGalleryItem();
setInterval(showGalleryItem, 6000);


/* ====================================================== */
/*                MUSIC PLAYER + VISUALIZER               */
/* ====================================================== */

const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const volumeSlider = document.getElementById("volume-slider");

const playlist = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3",
    "assets/music/song4.mp3",
    "assets/music/song5.mp3",
    "assets/music/song6.mp3",
    "assets/music/song7.mp3",
];

let currentTrack = 0;

function startPlaylist() {
    bgMusic.src = playlist[currentTrack];
    bgMusic.volume = 0.8;
    bgMusic.play().catch(()=>{});
}

playPauseBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        playPauseBtn.textContent = "❚❚";
    } else {
        bgMusic.pause();
        playPauseBtn.textContent = "▶";
    }
});

volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value;
});

bgMusic.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    bgMusic.src = playlist[currentTrack];
    bgMusic.play();
    playPauseBtn.textContent = "❚❚";
});


/* ====================================================== */
/*                  AUDIO GLOW VISUALIZER                 */
/* ====================================================== */

const canvas = document.getElementById("visualizer-canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

let audioContext, analyser, dataArray;

function setupVisualizer() {
    if (audioContext) return;

    audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(bgMusic);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
}

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    let bass = dataArray[1] + dataArray[2] + dataArray[3];
    let intensity = bass / 5;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 50,
        canvas.width/2, canvas.height/2, canvas.width*0.8
    );

    gradient.addColorStop(0, `rgba(255,255,0,${0.15 + intensity/900})`);
    gradient.addColorStop(0.5, `rgba(255,190,0,${0.10 + intensity/1200})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

bgMusic.addEventListener("play", () => {
    setupVisualizer();
    if (audioContext.state === "suspended") audioContext.resume();
    drawVisualizer();
});


/* ====================================================== */
/*            CENSORED WORD + RANDOM SYMBOLS              */
/* ====================================================== */

const censoredWord = document.getElementById("censored-word");
const symbols = ["$", "@", "%", "!", "#", "&", ")", "(", "*"];

function scramble() {
    let result = "";
    for (let i=0;i<10;i++) {
        result += symbols[Math.floor(Math.random() * symbols.length)];
    }
    censoredWord.textContent = result + "G";
}

setInterval(scramble,150);


/* ====================================================== */
/*               MUSIC PAGE REDIRECT BUTTON               */
/* ====================================================== */

const musicPageButton = document.getElementById("music-page-button");
if (musicPageButton) {
    musicPageButton.addEventListener("click", () => {
        window.location.href = "music.html";
    });
}
