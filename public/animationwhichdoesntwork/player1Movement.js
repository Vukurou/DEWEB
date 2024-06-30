let player1Velocity = { x: 0, y: 0 };
const player1MaxVelocity = 1.2; // Max velocity
const player1MinVelocity = 0.6; // Min velocity
const player1Acceleration = 0.05; // Acceleration rate
const player1Deceleration = 0.02; // Deceleration rate
const PUCK_SHOT_SPEED = 5; // Constant speed for shooting the puck

function movePlayer1() {
    let deltaX = 0;
    let deltaY = 0;
    let isMoving = false;

    if (keysPressed['a']) { deltaX = -1; isMoving = true; }
    if (keysPressed['d']) { deltaX = 1; isMoving = true; }
    if (keysPressed['w']) { deltaY = -1; isMoving = true; }
    if (keysPressed['s']) { deltaY = 1; isMoving = true; }

    if (isMoving) {
        // Spieler beschleunigen
        player1Velocity.x += deltaX * player1Acceleration;
        player1Velocity.y += deltaY * player1Acceleration;

        // Begrenze die Geschwindigkeit
        player1Velocity.x = Math.max(-player1MaxVelocity, Math.min(player1MaxVelocity, player1Velocity.x));
        player1Velocity.y = Math.max(-player1MaxVelocity, Math.min(player1MaxVelocity, player1Velocity.y));
    } else {
        // Spieler verlangsamen
        player1Velocity.x *= (1 - player1Deceleration);
        player1Velocity.y *= (1 - player1Deceleration);

        // Begrenze auf Null, wenn sehr langsam
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
    if (puckControlledBy === "player1" && keysPressed[' ']) { // Space bar to shoot
        puckSpeed = { x: -PUCK_SHOT_SPEED, y: 0 }; // Constant shot speed towards the left
        puckControlledBy = null;

        // Apply shooting animation
        const player1Element = document.getElementById('player1');
        player1Element.classList.add('player-shoot');
        setTimeout(() => {
            player1Element.classList.remove('player-shoot');
        }, 500); // Duration of the shoot animation
    }
}
