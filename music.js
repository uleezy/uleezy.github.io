/* =============================================== */
/*               BACKGROUND MUSIC LOOP             */
/* =============================================== */

const bgLoop = document.getElementById("bg-loop");

bgLoop.volume = 0.0;
bgLoop.play().catch(() => {});

let fadeVol = 0.0;

const fadeIn = setInterval(() => {
    fadeVol += 0.02;

    if (fadeVol >= 0.58) {
        fadeVol = 0.58;
        clearInterval(fadeIn);
    }

    bgLoop.volume = fadeVol;
}, 120);

/* =============================================== */
/*               MAP INTERACTIVITY                 */
/* =============================================== */

const avatar = document.getElementById("avatar");
const islands = document.querySelectorAll(".island");

const projectData = {
    morning: {
        title: "Morning",
        date: "July 20, 2020",
        spotify: "https://open.spotify.com/track/...",
        bandcamp: "https://ulamusic.bandcamp.com/track/morning",
        happy: "(^ワ^)"
    },
    bilingual: {
        title: "Bilingual",
        date: "Dec 31, 2021",
        spotify: "https://open.spotify.com/track/...",
        bandcamp: "https://ulamusic.bandcamp.com/track/bilingual",
        happy: "(*^▽^*)"
    },
    ac1: {
        title: "Another Castle (Vol. 1)",
        date: "Oct 1, 2022",
        spotify: "",
        bandcamp: "https://ulamusic.bandcamp.com/album/another-castle",
        happy: "(•̀ᴗ•́)و ̑̑"
    },
    ac2: {
        title: "Another Castle II",
        date: "Jan 10, 2023",
        spotify: "",
        bandcamp: "https://ulamusic.bandcamp.com/album/another-castle-ii",
        happy: "＼(^o^)／"
    },
    ac3: {
        title: "Another Castle III",
        date: "May 5, 2023",
        spotify: "",
        bandcamp: "https://ulamusic.bandcamp.com/album/another-castle-iii",
        happy: "(*≧∀≦*)"
    },
    slb: {
        title: "SUPERLAME BOY (EP)",
        date: "July 7, 2023",
        spotify: "https://open.spotify.com/album/...",
        bandcamp: "https://ulamusic.bandcamp.com/album/superlame-boy",
        happy: "(ﾉ>ω<)ﾉ"
    },
    home: {
        title: "home",
        date: "Jan 3, 2024",
        spotify: "",
        bandcamp: "https://ulamusic.bandcamp.com/album/home",
        happy: "٩(˘◡˘)۶"
    },
    mdgh: {
        title: "Modern Day Glitch Hop",
        date: "July 4, 2025",
        spotify: "https://open.spotify.com/album/...",
        bandcamp: "https://ulamusic.bandcamp.com/album/modern-day-glitch-hop",
        happy: "☆*:.｡.o(≧▽≦)o.｡.:*☆"
    }
};

const panelTitle = document.getElementById("proj-title");
const panelDate = document.getElementById("proj-date");
const spotifyLink = document.getElementById("spotify-link");
const bandcampLink = document.getElementById("bandcamp-link");

islands.forEach(island => {
    island.addEventListener("click", e => {

        // Move Avatar To Island
        const rect = island.getBoundingClientRect();
        avatar.style.top = rect.top + window.scrollY - 20 + "px";
        avatar.style.left = rect.left + window.scrollX + "px";

        // Load Project Data
        const id = island.getAttribute("data-project");
        const info = projectData[id];

        panelTitle.textContent = info.title;
        panelDate.textContent = info.date;

        spotifyLink.href = info.spotify;
        bandcampLink.href = info.bandcamp;

        // Change Avatar to Happy Kaomoji
        avatar.textContent = info.happy;

        // After 3 seconds, go back to neutral
        setTimeout(() => {
            avatar.textContent = "(・‿・)";
        }, 3000);
    });
});
