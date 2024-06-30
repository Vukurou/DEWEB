let player2Velocity = { x: 0, y: 0 };
const player2MaxVelocity = 1.2; // Max velocity
const player2MinVelocity = 0.6; // Min velocity
const player2Acceleration = 0.03; // Reduced acceleration rate
const player2Deceleration = 0.015; // Reduced deceleration rate

function movePlayer2() {
    let deltaX = 0;
    let deltaY = 0;

    if (keysPressed['a']) deltaX = -1;
    if (keysPressed['d']) deltaX = 1;
    if (keysPressed['w']) deltaY = -1;
    if (keysPressed['s']) deltaY = 1;

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
    if (puckControlledBy === "player2" && keysPressed[' ']) { // Space bar to shoot
        puckSpeed = { x: PUCK_SHOT_SPEED, y: 0 };
        puckControlledBy = null;
    }
}
