let player2Velocity = { x: 0, y: 0 };
const player2MaxVelocity = 1.2; // Max velocity
const player2MinVelocity = 0.6; // Min velocity
const player2Acceleration = 0.05; // Acceleration rate
const player2Deceleration = 0.02; // Deceleration rate
const PUCK_SHOT_SPEED = 5; // Constant speed for shooting the puck

function movePlayer2() {
    let deltaX = 0;
    let deltaY = 0;
    let isMoving = false;

    if (keysPressed['ArrowLeft']) { deltaX = -1; isMoving = true; }
    if (keysPressed['ArrowRight']) { deltaX = 1; isMoving = true; }
    if (keysPressed['ArrowUp']) { deltaY = -1; isMoving = true; }
    if (keysPressed['ArrowDown']) { deltaY = 1; isMoving = true; }

    if (isMoving) {
        // Spieler beschleunigen
        player2Velocity.x += deltaX * player2Acceleration;
        player2Velocity.y += deltaY * player2Acceleration;

        // Begrenze die Geschwindigkeit
        player2Velocity.x = Math.max(-player2MaxVelocity, Math.min(player2MaxVelocity, player2Velocity.x));
        player2Velocity.y = Math.max(-player2MaxVelocity, Math.min(player2MaxVelocity, player2Velocity.y));
    } else {
        // Spieler verlangsamen
        player2Velocity.x *= (1 - player2Deceleration);
        player2Velocity.y *= (1 - player2Deceleration);

        // Begrenze auf Null, wenn sehr langsam
        if (Math.abs(player2Velocity.x) < player2MinVelocity) player2Velocity.x = 0;
        if (Math.abs(player2Velocity.y) < player2MinVelocity) player2Velocity.y = 0;
    }

    player2Position.x += player2Velocity.x;
    player2Position.y += player2Velocity.y;

    handlePlayer2WallCollision();
    handlePlayer1Player2Collision();

    updatePosition('player2', player2Position);
    checkCollisions();
}

function shootPuckPlayer2() {
    if (puckControlledBy === "player2" && keysPressed['Enter']) { // Enter key to shoot
        puckSpeed = { x: PUCK_SHOT_SPEED, y: 0 }; // Constant shot speed towards the right
        puckControlledBy = null;

        // Apply shooting animation
        const player2Element = document.getElementById('player2');
        player2Element.classList.add('player-shoot');
        setTimeout(() => {
            player2Element.classList.remove('player-shoot');
        }, 500); // Duration of the shoot animation
    }
}
