/* =============================== */
/*  BACKGROUND MUSIC (LOOP BGM)    */
/* =============================== */

const bgm = document.getElementById("bgm");

window.addEventListener("click", () => {
    bgm.volume = 0.75;
    bgm.play().catch(() => {});
}, { once: true });



/* =============================== */
/*  AVATAR FOLLOWING + KAOMOJI     */
/* =============================== */

const ulaAvatar = document.getElementById("ula-avatar");
const ulaKao = document.getElementById("ula-kaomoji");
const timeline = document.getElementById("timeline");

const nodes = document.querySelectorAll(".node");

window.addEventListener("scroll", () => {
    const rect = timeline.getBoundingClientRect();
    const yOffset = window.scrollY;

    // Avatar moves down with scrolling
    ulaAvatar.style.top = (120 + yOffset * 0.25) + "px";

    // Detect which node is currently closest
    let closest = null;
    let closestDist = Infinity;

    nodes.forEach(node => {
        const box = node.getBoundingClientRect();
        const dist = Math.abs(box.top - window.innerHeight * 0.4);

        if (dist < closestDist) {
            closestDist = dist;
            closest = node;
        }
    });

    if (closest) {
        ulaKao.textContent = closest.dataset.kao;
    }
});



/* =============================== */
/*  BACKGROUND GLOW VISUALIZER     */
/* =============================== */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let glow = 0;

function draw() {
    glow += 0.03;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 50,
        canvas.width/2, canvas.height/2, canvas.width * 0.8
    );

    gradient.addColorStop(0, `rgba(255,255,150,${0.14 + Math.sin(glow)*0.04})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
}

draw();
