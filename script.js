/* ====================================================== */
/*                INTRO SCREEN + AUDIO                    */
/* ====================================================== */

const introScreen = document.getElementById("intro-screen");
const pressStartBtn = document.getElementById("press-start-btn");
const introLoop = document.getElementById("intro-loop");
const glitchOverlay = document.getElementById("glitch-overlay");
const mainSite = document.getElementById("main-site");

// Force safe autoplay settings
introLoop.volume = 0.0;          // start muted for browser autoplay
introLoop.muted = true;          // allow autoplay
introLoop.play().catch(() => {   // in case autoplay still blocked
    console.log("Autoplay blocked until click");
});

/* ====================================================== */
/*                KAOMOJI BACKGROUND FLOAT                */
/* ====================================================== */

const kaomojiList = ["(｡•́‿•̀｡)", "(╥﹏╥)", "(>_<)", "(¬‿¬)", "(◕‿◕)", "(✿◠‿◠)", "(ﾉ◕ヮ◕)ﾉ*", "(ಠ_ಠ)"];
const kaomojiContainer = document.getElementById("kaomoji-container");

function spawnKaomoji() {
    const span = document.createElement("span");
    span.classList.add("kaomoji");
    span.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];

    span.style.left = Math.random() * 100 + "%";
    span.style.top = Math.random() * 100 + "%";
    span.style.animationDuration = (8 + Math.random() * 8) + "s";

    kaomojiContainer.appendChild(span);

    setTimeout(() => span.remove(), 15000);
}

setInterval(spawnKaomoji, 1200);


/* ====================================================== */
/*          PRESS START → FADE-IN → GLITCH → MAIN SITE    */
/* ====================================================== */

function fadeInIntroLoop() {
    introLoop.muted = false; // unmute on click
    let vol = 0.0;

    const fade = setInterval(() => {
        vol += 0.05;
        introLoop.volume = vol;

        if (vol >= 0.8) {
            clearInterval(fade);
        }
    }, 60);
}

pressStartBtn.addEventListener("click", () => {
    fadeInIntroLoop();

    // Let the intro loop be heard for ~800ms
    setTimeout(() => {
        glitchOverlay.classList.add("glitch-active");

        // Fade out intro audio before switching
        let fadeOutVol = introLoop.volume;
        const fadeOut = setInterval(() => {
            fadeOutVol -= 0.1;
            introLoop.volume = Math.max(0, fadeOutVol);

            if (fadeOutVol <= 0) {
                clearInterval(fadeOut);
                introLoop.pause();
                introLoop.currentTime = 0;
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
/*          GALLERY (LOCAL IMAGES ONLY + FADE)            */
/* ====================================================== */

const galleryImages = [
    "assets/images/main-image-1.jpg",
    "assets/images/main-image-2.png",
    "assets/images/main-image-3.webp",
    "assets/images/main-image-4.webp",
    "assets/images/main-image-5.jpg",
    "assets/images/main-image-6.jpg",
    "assets/images/main-image-7.jpg",
    "assets/images/main-image-8.jpg"
];

// gallery element
const galleryImageElement = document.getElementById("gallery-image");

// permanently hide video
const galleryVideoElement = document.getElementById("gallery-video");
galleryVideoElement.style.display = "none";

let galleryIndex = 0;

// randomize order each visit
galleryImages.sort(() => Math.random() - 0.5);

function showGalleryItem() {
    galleryImageElement.style.opacity = 0;

    setTimeout(() => {
        galleryImageElement.src = galleryImages[galleryIndex];
        galleryImageElement.style.opacity = 1;
    }, 400);

    galleryIndex = (galleryIndex + 1) % galleryImages.length;
}

setInterval(showGalleryItem, 6000);
showGalleryItem();




/* ====================================================== */
/*                 MUSIC PLAYER + PLAYLIST                */
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
    bgMusic.play().catch(() => {});
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
    currentTrack++;
    if (currentTrack >= playlist.length) {
        currentTrack = 0;
    }

    bgMusic.src = playlist[currentTrack];
    bgMusic.play().catch(() => {});
    playPauseBtn.textContent = "❚❚";
});



/* ====================================================== */
/*            CENSORED WORD RANDOM SYMBOLS                */
/* ====================================================== */

const censoredWord = document.getElementById("censored-word");
const symbols = ["$", "@", "%", "!", "#", "&", ")", "(", "*"];

function randomizeCensoredWord() {
    let result = "";
    for (let i = 0; i < 10; i++) {
        result += symbols[Math.floor(Math.random() * symbols.length)];
    }
    censoredWord.textContent = result + "G";
}

setInterval(randomizeCensoredWord, 150);



