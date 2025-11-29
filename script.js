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
/*          GALLERY (PINTEREST IMAGES ONLY + FADE)        */
/* ====================================================== */

const galleryImages = [
    "https://i.pinimg.com/736x/4a/90/45/4a9045416707ca4f825c70cb81079ebb.jpg",
    "https://i.pinimg.com/736x/43/fe/d2/43fed25a912fd4e44af1d35b9aac6a01.jpg",
    "https://i.pinimg.com/736x/4f/e4/d2/4fe4d27ec4e7beef97429f855383384c.jpg",
    "https://i.pinimg.com/736x/68/d8/e6/68d8e6a18aac67bb0b47c8ec77ec1cd2.jpg",
    "https://i.pinimg.com/736x/86/6d/22/866d220dbf59a6aee104196a586c0832.jpg"
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
    // fade out
    galleryImageElement.style.opacity = 0;

    setTimeout(() => {
        galleryImageElement.src = galleryImages[galleryIndex];
        galleryImageElement.style.opacity = 1; // fade in
    }, 400);

    galleryIndex = (galleryIndex + 1) % galleryImages.length;
}

// rotate every 6 seconds
setInterval(showGalleryItem, 6000);

// load first image immediately
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


