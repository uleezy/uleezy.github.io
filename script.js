/* ====================================================== */
/*                INTRO SCREEN + AUDIO                    */
/* ====================================================== */

const introScreen = document.getElementById("intro-screen");
const pressStartBtn = document.getElementById("press-start-btn");
const introLoop = document.getElementById("intro-loop");
const glitchOverlay = document.getElementById("glitch-overlay");
const mainSite = document.getElementById("main-site");

introLoop.volume = 0.8;
introLoop.play().catch(() => {
    // Autoplay might get blocked until user interacts
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
/*          PRESS START → GLITCH → MAIN SITE              */
/* ====================================================== */

pressStartBtn.addEventListener("click", () => {
    introLoop.pause();
    introLoop.currentTime = 0;

    glitchOverlay.classList.add("glitch-active");

    setTimeout(() => {
        introScreen.classList.add("hidden");
        mainSite.classList.remove("hidden");
        startPlaylist();
    }, 1600); // matches glitch animation duration
});



/* ====================================================== */
/*                  GALLERY (IMAGES + VIDEOS)             */
/* ====================================================== */

const galleryImages = [
    "assets/images/main-image-1.jpg",
    "assets/images/main-image-2.png",
    "assets/images/main-image-3.webp",
    "assets/images/main-image-4.webp",
    "assets/images/main-image-5.jpg",
    "assets/images/main-image-6.jpg",
    "assets/images/main-image-7.jpg",
    "assets/images/main-image-8.jpg",
];

const galleryVideos = [
    "assets/videos/main-video-1.mov",
    "assets/videos/main-video-2.mov",
    "assets/videos/main-video-3.MOV",
    "assets/videos/main-video-4.mov",
    "assets/videos/main-video-5.mov",
    "assets/videos/main-video-6.mov",
    "assets/videos/main-video-7.mov",
    "assets/videos/main-video-8.mov",
];

const galleryImageElement = document.getElementById("gallery-image");
const galleryVideoElement = document.getElementById("gallery-video");

let galleryIndex = 0;
let allGalleryItems = [];

// combine image + video lists into a single sequence
allGalleryItems = [...galleryImages, ...galleryVideos];

// shuffle
allGalleryItems.sort(() => Math.random() - 0.5);

function showGalleryItem() {
    const item = allGalleryItems[galleryIndex];

    // If item ends with video type → show video
    const isVideo = item.endsWith(".mov") || item.endsWith(".MOV") || item.endsWith(".mp4");

    if (isVideo) {
        galleryVideoElement.src = item;
        galleryVideoElement.style.opacity = 1;

        galleryImageElement.style.opacity = 0;
        galleryVideoElement.play();
    } else {
        galleryImageElement.src = item;
        galleryImageElement.style.opacity = 1;

        galleryVideoElement.pause();
        galleryVideoElement.style.opacity = 0;
    }

    galleryIndex = (galleryIndex + 1) % allGalleryItems.length;
}

setInterval(showGalleryItem, 6000);
showGalleryItem(); // initial load



/* ====================================================== */
/*                 MUSIC PLAYER LOGIC                     */
/* ====================================================== */

const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const volumeSlider = document.getElementById("volume-slider");

// full playlist
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
    bgMusic.play();
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

// when a song ends → go to next
bgMusic.addEventListener("ended", () => {
    currentTrack++;

    if (currentTrack >= playlist.length) {
        currentTrack = 0; // reset to beginning
    }

    bgMusic.src = playlist[currentTrack];
    bgMusic.play();
    playPauseBtn.textContent = "❚❚";
});



/* ====================================================== */
/*            CENSORED WORD ANIMATION MAP                */
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
