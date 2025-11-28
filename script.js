/* ---------------------------------------------------------
   ELEMENT GRABS
--------------------------------------------------------- */
const introLoop = document.getElementById("introLoop");
const introEcho = document.getElementById("introEcho");

const sfxClick = document.getElementById("sfx-click");
const sfxChrono = document.getElementById("sfx-chrono");
const sfxWhoosh = document.getElementById("sfx-whoosh");
const sfxShimmer = document.getElementById("sfx-shimmer");

const startupScreen = document.getElementById("startup-screen");
const pressStartBtn = document.getElementById("press-start");
const crtOverlay = document.getElementById("crt-overlay");

const handheldUI = document.getElementById("handheld-ui");
const handheldScreen = document.getElementById("handheld-screen");

const mainCutoutName = document.getElementById("main-cutout-name");
const taglineCutout = document.getElementById("tagline-cutout");

const galleryImage = document.getElementById("gallery-image");

const musicPlayer = document.getElementById("music-player");
const pausePlayBtn = document.getElementById("pausePlay");
const skipBtn = document.getElementById("skip");
const volumeSlider = document.getElementById("volume");

const musicEmbed = document.getElementById("music-embed");
const nowPlaying = document.getElementById("now-playing");
const artistStyleBox = document.getElementById("artist-style");

const kaomojiContainer = document.getElementById("kaomoji-container");


/* ---------------------------------------------------------
   INTRO LOOP START IMMEDIATELY
--------------------------------------------------------- */
window.onload = () => {
    introLoop.volume = 0.45;
    introLoop.play().catch(()=>{});
};


/* ---------------------------------------------------------
   PRESS START → INTRO SEQUENCE
--------------------------------------------------------- */
pressStartBtn.addEventListener("click", () => {

    sfxClick.volume = 0.25;
    sfxWhoosh.volume = 0.20;
    sfxChrono.volume = 0.20;

    sfxClick.play();

    /* fade out intro loop */
    let fadeOut = setInterval(() => {
        if (introLoop.volume > 0.02) {
            introLoop.volume -= 0.015;
        } else {
            clearInterval(fadeOut);
            introLoop.pause();

            /* echo tail */
            introEcho.volume = 0.15;
            introEcho.src = "https://assets.mixkit.co/sfx/preview/mixkit-small-hit-in-a-game-2072.mp3";
            introEcho.play();

        }
    }, 50);

    /* CRT fade in */
    crtOverlay.style.opacity = 1;

    /* Start transition sequence */
    setTimeout(() => {
        startupScreen.style.opacity = 0;

        setTimeout(() => {
            startupScreen.style.display = "none";
            handheldUI.style.display = "block";
            sfxChrono.play();

            /* slide up */
            handheldScreen.style.transition = "all 1s ease";
            handheldScreen.style.top = "60%";

            /* zoom to center */
            setTimeout(() => {
                handheldScreen.classList.add("handheld-active");
                sfxWhoosh.play();
            }, 900);

            /* After animation → change to cutout name */
            setTimeout(() => {
                activateCutoutTitle();
                taglineCutout.style.opacity = 1;
            }, 1600);

        }, 300);

    }, 800);
});


/* ---------------------------------------------------------
   CUTOUT MAGAZINE TITLE ACTIVATION
--------------------------------------------------------- */
function activateCutoutTitle() {
    let text = "Ula • Uleezy • The Ulanator";
    mainCutoutName.innerHTML = "";

    let textures = [
        "#fff", "#eee", "#f8f8f8",
        "linear-gradient(#fff, #ccc)", 
        "linear-gradient(#f2e9ff, #ccbaff)",
        "linear-gradient(#ffe1f7, #ffc8ff)"
    ];

    [...text].forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;

        span.style.display = "inline-block";
        span.style.margin = "0 2px";
        span.style.padding = "5px 6px";
        span.style.color = "black";

        span.style.background = textures[Math.floor(Math.random()*textures.length)];
        span.style.transform = `rotate(${Math.random()*20 - 10}deg)`;

        span.style.opacity = 0;
        span.style.transition = "opacity 0.5s ease";

        setTimeout(() => { span.style.opacity = 1; }, 80*i);

        mainCutoutName.appendChild(span);
    });

    mainCutoutName.style.opacity = 1;
}


/* ---------------------------------------------------------
   KAOMOJI SPAWNING (LIMITED)
--------------------------------------------------------- */
let kaomojiList = [
    "(๑˃ᴗ˂)ﻭ", "(•́⌄•́๑)", "(｡>﹏<｡)", "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
    "(╥﹏╥)", "(☆▽☆)", "( •̀ᴗ•́ )و ̑̑", "(｡•̀ᴗ-)✧",
    "(≧◡≦)", "(⁎˃ᆺ˂)", "(∩˃o˂∩)♡"
];

const MAX_KAOMOJI = 12;

function spawnKaomoji() {
    if (kaomojiContainer.childElementCount >= MAX_KAOMOJI) return;

    let span = document.createElement("div");
    span.className = "kaomoji";
    span.textContent = kaomojiList[Math.floor(Math.random()*kaomojiList.length)];

    span.style.left = Math.random()*100 + "%";
    span.style.top = "100%";

    kaomojiContainer.appendChild(span);

    /* remove when animation ends */
    setTimeout(() => span.remove(), 12000);
}
setInterval(spawnKaomoji, 1500);


/* ---------------------------------------------------------
   KAOMOJI BUTTON REACTIONS
--------------------------------------------------------- */
function createBtnReaction(btn) {
    let kao = btn.querySelector(".btnKao");

    let normal = "(◕‿◕✿)";
    let scared = "(⊙﹏⊙ )";
    let happy = "(♡˙︶˙♡)";
    let sad = "(｡•́︿•̀｡)";

    kao.textContent = normal;

    btn.addEventListener("mousemove", () => {
        kao.textContent = scared;
    });

    btn.addEventListener("mouseenter", () => {
        kao.textContent = happy;
    });

    btn.addEventListener("mouseleave", () => {
        kao.textContent = sad;
        setTimeout(()=> kao.textContent = normal, 2500);
    });
}

document.querySelectorAll("#nav-buttons button").forEach(btn => {
    createBtnReaction(btn);
});


/* ---------------------------------------------------------
   GALLERY RANDOMIZER (PINTEREST IMAGES)
--------------------------------------------------------- */
let galleryImages = [
    "https://i.pinimg.com/736x/4f/e4/d2/4fe4d27ec4e7beef97429f855383384c.jpg",
    "https://i.pinimg.com/736x/43/fe/d2/43fed25a912fd4e44af1d35b9aac6a01.jpg",
    "https://i.pinimg.com/736x/4a/90/45/4a9045416707ca4f825c70cb81079ebb.jpg",
    "https://i.pinimg.com/736x/68/d8/e6/68d8e6a18aac67bb0b47c8ec77ec1cd2.jpg",
    "https://i.pinimg.com/736x/86/6d/22/866d220dbf59a6aee104196a586c0832.jpg"
];

function updateGallery() {
    let r = Math.floor(Math.random()*galleryImages.length);
    galleryImage.style.opacity = 0;

    setTimeout(() => {
        galleryImage.src = galleryImages[r];
        galleryImage.style.opacity = 1;
    }, 500);
}

setInterval(updateGallery, 5000);
updateGallery();


/* ---------------------------------------------------------
   MUSIC PLAYER LOGIC
--------------------------------------------------------- */
let playlist = [
    /* ULA */
    {
        artist: "Ula",
        embed: "https://open.spotify.com/embed/artist/2xfdMTaWnH1kgowZNwnWT5",
        style: {color: "#7af", glow: "0 0 12px #7af"}
    },

    /* MOON36 */
    {
        artist: "Moon36",
        embed: "https://open.spotify.com/embed/artist/6BNvTEwAr0fK0eCGAv4Cbg",
        style: {color: "#b3e3ff", glow: "0 0 15px #b3e3ff"}
    },

    /* ETHAN KREM */
    {
        artist: "Ethan Krem",
        embed: "https://open.spotify.com/embed/artist/6tGewkCfNGfYQRQqFe0d3X",
        style: {color: "#e2ffe2", glow: "0 0 12px #e2ffe2"}
    },

    /* COZEY */
    {
        artist: "Cozey 👑",
        embed: "https://open.spotify.com/embed/album/26oXyzfdLf9R1663xtHkfu",
        style: {color: "gold", glow: "0 0 15px gold"}
    },

    /* NUR */
    {
        artist: "Nur 👑",
        embed: "https://open.spotify.com/embed/artist/1wk6uAGsywbHw0NDbzsZR0",
        style: {color: "gold", glow: "0 0 18px gold"}
    },

    /* CHXMPLOO */
    {
        artist: "Chxmploo",
        embed: "https://www.youtube.com/embed/?listType=search&list=chxmploo",
        style: {color: "#ff9fe8", glow: "0 0 12px #ff9fe8"}
    },

    /* KILLEDOFFSIN */
    {
        artist: "KilledOffSin",
        embed: "https://soundcloud.com/officialkilledoffsin",
        style: {color: "#ff4444", glow: "0 0 12px #ff4444"}
    }
];

let currentSong = null;

/* random shuffle */
function playRandomSong() {
    let pick = playlist[Math.floor(Math.random()*playlist.length)];

    currentSong = pick;

    musicEmbed.src = pick.embed;
    nowPlaying.textContent = pick.artist;

    artistStyleBox.style.color = pick.style.color;
    artistStyleBox.style.textShadow = pick.style.glow;
    artistStyleBox.textContent = pick.artist;
}

skipBtn.addEventListener("click", () => {
    sfxChrono.play();
    playRandomSong();
});

/* PLAY/PAUSE EMBED NEEDS TOGGLE HACK */
pausePlayBtn.addEventListener("click", () => {
    sfxClick.play();
    /* embeds cannot be paused normally, so we reload src */
    musicEmbed.src = currentSong.embed;
});


/* OPEN MUSIC PLAYER */
document.getElementById("music-btn").addEventListener("click", () => {
    musicPlayer.classList.toggle("open");
    sfxShimmer.volume = 0.2;
    sfxShimmer.play();
    if (!currentSong) playRandomSong();
});


/* VOLUME SLIDER */
volumeSlider.addEventListener("input", () => {
    introLoop.volume = volumeSlider.value;
});


/* ---------------------------------------------------------
   ULAVILLE BUTTON (PIXEL WIPE TRANSITION)
--------------------------------------------------------- */
document.getElementById("ulaville-btn").addEventListener("click", () => {
    sfxShimmer.play();

    /* For prototype: Just shimmer and alert */
    alert("ULAVILLE is under construction! (Pixel Wipe will go here)");
});


/* ---------------------------------------------------------
   VISUALIZER (FAKE ANIMATION)
--------------------------------------------------------- */
let canvas = document.getElementById("visualizer");
let ctx = canvas.getContext("2d");

function drawVisualizer() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let bars = 20;
    for (let i=0; i<bars; i++) {
        let h = Math.random()*60 + 10;
        ctx.fillStyle = "#ffccff";
        ctx.fillRect(i*15+10, 80-h, 10, h);
    }

    requestAnimationFrame(drawVisualizer);
}
drawVisualizer();

