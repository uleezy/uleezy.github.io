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
   AVATAR FOLLOWING MOUSE
============================================================ */
const avatarWrapper = document.getElementById("avatar-wrapper");

window.addEventListener("mousemove", (e) => {
    const offsetX = 30;  // keeps avatar away from cursor
    const offsetY = 30;

    avatarWrapper.style.transform = `translate(${e.pageX + offsetX}px, ${e.pageY + offsetY}px)`;
});
