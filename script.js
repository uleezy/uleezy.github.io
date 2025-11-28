// =============================
// INTRO + PRESS START SEQUENCE
// =============================

// Get elements safely
const introScreen = document.getElementById("intro-screen");
const pressStartBtn = document.getElementById("press-start-btn");
const siteWrapper = document.getElementById("site-wrapper");

// Your audio files
const introMusic = new Audio("assets/music/intro_loop.mp3");
introMusic.loop = true;
introMusic.volume = 0.45;

// Game SFX (you can replace these later)
const startSFX = new Audio("assets/music/start_sfx.mp3");
startSFX.volume = 0.35;

// -----------------------------
// START INTRO MUSIC ON LOAD
// -----------------------------
window.addEventListener("load", () => {
    introMusic.play().catch(() => {
        console.log("Autoplay blocked until user presses something.");
    });
});

// -----------------------------
// PRESS START BUTTON
// -----------------------------
pressStartBtn.addEventListener("click", () => {

    // Fade out intro loop
    let fadeOut = setInterval(() => {
        if (introMusic.volume > 0.02) {
            introMusic.volume -= 0.02;
        } else {
            clearInterval(fadeOut);
            introMusic.pause();
        }
    }, 120);

    // Play SFX
    startSFX.play();

    // Fade out intro screen
    introScreen.style.opacity = "0";
    introScreen.style.transition = "opacity 1.2s ease";

    setTimeout(() => {
        introScreen.style.display = "none";

        // Reveal site wrapper
        siteWrapper.style.display = "block";

        // CRT flash effect
        document.body.classList.add("crt-start");

        setTimeout(() => {
            document.body.classList.remove("crt-start");

            // Trigger HUD animation (GBA zoom + slide)
            const gba = document.getElementById("gba-container");
            if (gba) {
                gba.classList.add("gba-animate");
            }

        }, 900);

    }, 1200);
});

// =============================
// MUSIC PLAYER (LOCAL FILES)
// =============================

let tracks = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3",
    "assets/music/song4.mp3",
    "assets/music/song5.mp3",
    "assets/music/song6.mp3",
    "assets/music/song7.mp3"
];

shuffleArray(tracks);

// Player elements
const audio = new Audio();
audio.volume = 0.6;

let currentTrack = 0;

// Shuffle function
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Play next song
function playNext() {
    currentTrack = (currentTrack + 1) % tracks.length;
    audio.src = tracks[currentTrack];
    audio.play();
}

// Auto-next on finish
audio.addEventListener("ended", playNext);

// Expose controls to the page
window.musicPlayer = {
    play: () => {
        audio.src = tracks[currentTrack];
        audio.play();
    },
    pause: () => audio.pause(),
    skip: playNext,
    setVolume: (value) => audio.volume = value
};
