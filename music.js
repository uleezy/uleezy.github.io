/* ============================================================
   PAGE MUSIC 
============================================================ */
const music = document.getElementById("music");

window.addEventListener("load", () => {
    music.volume = 0.65;
    music.play().catch(() => {
        console.log("Audio autoplay blocked — user must click somewhere first.");
    });
});

/* ============================================================
   OLD MOUSE-FOLLOW AVATAR DISABLED
   (Crono follower replaces this system)
============================================================ */
// Removed: avatar following mouse
// The Crono follower is now handled by crono.js instead.
