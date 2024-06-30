let player1Velocity = { x: 0, y: 0 };
const player1MaxVelocity = 1.2; // Max velocity
const player1MinVelocity = 0.6; // Min velocity
const player1Acceleration = 0.03;
const player1Deceleration = 0.015;
const PUCK_SHOT_SPEED = 5;

function movePlayer1() {
    let deltaX = 0;
    let deltaY = 0;

    if (keysPressed['ArrowLeft']) deltaX = -1;
    if (keysPressed['ArrowRight']) deltaX = 1;
    if (keysPressed['ArrowUp']) deltaY = -1;
    if (keysPressed['ArrowDown']) deltaY = 1;

    if (deltaX !== 0 || deltaY !== 0) {
        // Accelerate player
        player1Velocity.x += deltaX * player1Acceleration;
        player1Velocity.y += deltaY * player1Acceleration;

        // Clamp velocity
        player1Velocity.x = Math.max(-player1MaxVelocity, Math.min(player1MaxVelocity, player1Velocity.x));
        player1Velocity.y = Math.max(-player1MaxVelocity, Math.min(player1MaxVelocity, player1Velocity.y));
    } else {
        // Decelerate player
        player1Velocity.x *= (1 - player1Deceleration);
        player1Velocity.y *= (1 - player1Deceleration);

        // Clamp to zero if very slow
        if (Math.abs(player1Velocity.x) < player1MinVelocity) player1Velocity.x = 0;
        if (Math.abs(player1Velocity.y) < player1MinVelocity) player1Velocity.y = 0;
    }

    player1Position.x += player1Velocity.x;
    player1Position.y += player1Velocity.y;

    handlePlayer1WallCollision();
    handlePlayer1Player2Collision();

    updatePosition('player1', player1Position);
    checkCollisions();
}

function shootPuckPlayer1() {
    if (puckControlledBy === "player1" && keysPressed['Enter']) {
        puckSpeed = { x: -PUCK_SHOT_SPEED, y: 0 };
        puckControlledBy = null;
    }
}
