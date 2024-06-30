let player2Velocity = { x: 0, y: 0 };
const player2MaxVelocity = 2.4; // Max velocity
const player2MinVelocity = 1.2; // Min velocity
const player2Acceleration = 0.06; // Increased acceleration rate
const player2Deceleration = 0.03; // Increased deceleration rate

function movePlayer2() {
    let deltaX = 0;
    let deltaY = 0;

    if (keysPressed['ArrowLeft']) deltaX = -1;
    if (keysPressed['ArrowRight']) deltaX = 1;
    if (keysPressed['ArrowUp']) deltaY = -1;
    if (keysPressed['ArrowDown']) deltaY = 1;

    if (deltaX !== 0 || deltaY !== 0) {
        // Accelerate player
        player2Velocity.x += deltaX * player2Acceleration;
        player2Velocity.y += deltaY * player2Acceleration;

        // Clamp velocity
        player2Velocity.x = Math.max(-player2MaxVelocity, Math.min(player2MaxVelocity, player2Velocity.x));
        player2Velocity.y = Math.max(-player2MaxVelocity, Math.min(player2MaxVelocity, player2Velocity.y));
    } else {
        // Decelerate player
        player2Velocity.x *= (1 - player2Deceleration);
        player2Velocity.y *= (1 - player2Deceleration);

        // Clamp to zero if very slow
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
        puckSpeed = { x: PUCK_SHOT_SPEED, y: 0 }; // Simplified shooting
        puckControlledBy = null;
    }
}
