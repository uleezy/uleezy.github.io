// ============================================================
// CRONO FOLLOW SYSTEM (Desktop Only)
// Includes: delayed follow, direction detection, animation switching,
// speed-based walk/run logic, idle system w/ random expressions.
// ============================================================

// Detect mobile
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// If mobile → disable entirely
if (isMobile) {
    console.log("Crono disabled on mobile.");
    return;
}

// Create Crono follower element
const crono = document.createElement("img");
crono.id = "crono-follower";
document.body.appendChild(crono);

// File paths
const BASE = "assets/sprites/";

// Movement
const MOVE = {
    idleFront: "Crono (Front).gif",
    idleLeft: "Crono (Left).gif",
    idleBack: "Crono (Back).gif",

    walkFront: "Crono - Walk (Front).gif",
    walkLeft: "Crono - Walk (Left).gif",
    walkBack: "Crono - Walk (Back).gif",

    runFront: "Crono - Run (Front).gif",
    runLeft: "Crono - Run (Left).gif",
    runBack: "Crono - Run (Back).gif",
};

// Idle Expressions
const EXPRESS = {
    front: [
        "Crono - Nod (Front).gif",
        "Crono - Shake Head (Front).gif",
        "Crono - Victory.gif"
    ],
    left: [
        "Crono - Nod (Left).gif",
        "Crono - Shake Head (Left).gif"
    ],
    back: [
        "Crono - Nod (Back).gif",
        "Crono - Shake Head (Back).gif"
    ]
};

// Crono movement memory
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let cronoX = targetX;
let cronoY = targetY;

let lastMoveTime = Date.now();
let lastDirection = "front"; // "left", "right", "front", "back"
let lastIdlePlayed = null;
let idleTimeout = null;

const FOLLOW_DELAY = 0.1; // lower = slower follow
const WALK_THRESHOLD = 3;
const RUN_THRESHOLD = 15;

// Movement listener
document.addEventListener("mousemove", (e) => {
    targetX = e.clientX - 30;  // offset so Crono trails slightly behind
    targetY = e.clientY - 30;

    lastMoveTime = Date.now();

    resetIdle();
});

// Idle timer logic
function resetIdle() {
    if (idleTimeout) clearTimeout(idleTimeout);

    idleTimeout = setTimeout(() => {
        playIdleAnimation();
    }, 6000 + Math.random() * 1000); // 6–7 seconds
}

function playIdleAnimation() {
    let pool;

    if (lastDirection === "front") pool = EXPRESS.front;
    else if (lastDirection === "left" || lastDirection === "right") pool = EXPRESS.left;
    else pool = EXPRESS.back;

    let choice = pool[Math.floor(Math.random() * pool.length)];

    // Prevent repeating same animation
    if (choice === lastIdlePlayed && pool.length > 1) {
        choice = pool[(pool.indexOf(choice) + 1) % pool.length];
    }

    lastIdlePlayed = choice;

    crono.src = BASE + "expressions/" + choice;

    // Flip if facing right
    if (lastDirection === "right") {
        crono.style.transform = "scaleX(-1)";
    } else {
        crono.style.transform = "scaleX(1)";
    }
}

// Animation selection based on speed + direction
function updateAnimation(dx, dy, speed) {
    // Determine direction
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) lastDirection = "left";
        else lastDirection = "right";
    } else {
        if (dy < 0) lastDirection = "back";
        else lastDirection = "front";
    }

    // Choose animation by speed
    let anim = "";
    if (speed < WALK_THRESHOLD) {
        // Idle
        if (lastDirection === "front") anim = MOVE.idleFront;
        else if (lastDirection === "left") anim = MOVE.idleLeft;
        else if (lastDirection === "right") anim = MOVE.idleLeft; // flipped
        else anim = MOVE.idleBack;
    } else if (speed < RUN_THRESHOLD) {
        // Walking
        if (lastDirection === "front") anim = MOVE.walkFront;
        else if (lastDirection === "left") anim = MOVE.walkLeft;
        else if (lastDirection === "right") anim = MOVE.walkLeft;
        else anim = MOVE.walkBack;
    } else {
        // Running
        if (lastDirection === "front") anim = MOVE.runFront;
        else if (lastDirection === "left") anim = MOVE.runLeft;
        else if (lastDirection === "right") anim = MOVE.runLeft;
        else anim = MOVE.runBack;
    }

    // Set path
    crono.src = BASE + "movement/" + anim;

    // Flip if needed
    if (lastDirection === "right") {
        crono.style.transform = "scaleX(-1)";
    } else {
        crono.style.transform = "scaleX(1)";
    }
}

// Crono movement loop
function loop() {
    requestAnimationFrame(loop);

    // Smooth follow interpolation
    cronoX += (targetX - cronoX) * FOLLOW_DELAY;
    cronoY += (targetY - cronoY) * FOLLOW_DELAY;

    const dx = targetX - cronoX;
    const dy = targetY - cronoY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    updateAnimation(dx, dy, speed);

    crono.style.left = cronoX + "px";
    crono.style.top = cronoY + "px";
}

loop();
resetIdle();
