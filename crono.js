// ============================================================
// CRONO FOLLOW SYSTEM (Desktop Only)
// Includes delayed follow, mouse-velocity animation logic,
// direction detection, idle expressions, walk/run movement.
// ============================================================

// Detect mobile
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (!isMobile) {

    // Create Crono follower element
    const crono = document.createElement("img");
    crono.id = "crono-follower";
    document.body.appendChild(crono);

    // File paths
    const BASE = "assets/sprites/";

    // Movement animations
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

    // Crono memory
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let cronoX = targetX;
    let cronoY = targetY;

    let lastDirection = "front";
    let lastIdlePlayed = null;
    let idleTimeout = null;

    // Mouse velocity tracking
    let lastMouseX = null;
    let lastMouseY = null;
    let mouseSpeed = 0;

    const FOLLOW_DELAY = 0.1;
    const IDLE_DELAY = 6000 + Math.random() * 1000; // 6–7 seconds

    // Mouse movement listener
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        targetX = x - 30;
        targetY = y - 30;

        // Calculate mouse velocity
        if (lastMouseX !== null && lastMouseY !== null) {
            const dx = x - lastMouseX;
            const dy = y - lastMouseY;
            mouseSpeed = Math.sqrt(dx * dx + dy * dy);
        }

        lastMouseX = x;
        lastMouseY = y;

        resetIdleTimer();
    });

    // Idle timer logic
    function resetIdleTimer() {
        if (idleTimeout) clearTimeout(idleTimeout);

        idleTimeout = setTimeout(() => {
            playIdleAnimation();
        }, IDLE_DELAY);
    }

    // Play idle animation
    function playIdleAnimation() {
        let pool;

        if (lastDirection === "front") pool = EXPRESS.front;
        else if (lastDirection === "left" || lastDirection === "right") pool = EXPRESS.left;
        else pool = EXPRESS.back;

        let choice = pool[Math.floor(Math.random() * pool.length)];

        if (choice === lastIdlePlayed && pool.length > 1) {
            choice = pool[(pool.indexOf(choice) + 1) % pool.length];
        }

        lastIdlePlayed = choice;
        crono.src = BASE + "expressions/" + choice;

        crono.style.transform = (lastDirection === "right") ? "scaleX(-1)" : "scaleX(1)";
    }

    // Determine direction + choose animation based on mouse speed
    function updateAnimation() {
        const dx = targetX - cronoX;
        const dy = targetY - cronoY;

        if (Math.abs(dx) > Math.abs(dy)) {
            lastDirection = dx < 0 ? "left" : "right";
        } else {
            lastDirection = dy < 0 ? "back" : "front";
        }

        let anim = "";

        if (mouseSpeed < 2) {
            // Idle
            anim =
                lastDirection === "front" ? MOVE.idleFront :
                lastDirection === "left"  ? MOVE.idleLeft :
                lastDirection === "right" ? MOVE.idleLeft :
                                            MOVE.idleBack;
        }
        else if (mouseSpeed < 15) {
            // Walking
            anim =
                lastDirection === "front" ? MOVE.walkFront :
                lastDirection === "left"  ? MOVE.walkLeft :
                lastDirection === "right" ? MOVE.walkLeft :
                                            MOVE.walkBack;
        }
        else {
            // Running
            anim =
                lastDirection === "front" ? MOVE.runFront :
                lastDirection === "left"  ? MOVE.runLeft :
                lastDirection === "right" ? MOVE.runLeft :
                                            MOVE.runBack;
        }

        crono.src = BASE + "movement/" + anim;

        crono.style.transform =
            lastDirection === "right" ? "scaleX(-1)" : "scaleX(1)";
    }

    // Main Loop
    function loop() {
        requestAnimationFrame(loop);

        cronoX += (targetX - cronoX) * FOLLOW_DELAY;
        cronoY += (targetY - cronoY) * FOLLOW_DELAY;

        updateAnimation();

        crono.style.left = cronoX + "px";
        crono.style.top = cronoY + "px";
    }

    loop();
    resetIdleTimer();
}
