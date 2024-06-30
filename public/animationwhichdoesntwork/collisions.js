function rectIntersect(posA, sizeA, posB, sizeB) {
    return posA.x < posB.x + sizeB.width && posA.x + sizeA.width > posB.x &&
        posA.y < posB.y + sizeB.height && posA.y + sizeA.height > posB.y;
}

function handleWallCollision() {
    if (puckPosition.x <= BOUNDS_LEFT || puckPosition.x + PUCK_WIDTH >= BOUNDS_RIGHT) {
        puckSpeed.x = -puckSpeed.x;
    }
    if (puckPosition.y <= BOUNDS_TOP || puckPosition.y + PUCK_HEIGHT >= BOUNDS_BOTTOM) {
        puckSpeed.y = -puckSpeed.y;
    }
}

function handlePlayer1WallCollision() {
    if (player1Position.x <= BOUNDS_LEFT) player1Position.x = BOUNDS_LEFT;
    if (player1Position.x + PLAYER1_WIDTH >= BOUNDS_RIGHT) player1Position.x = BOUNDS_RIGHT - PLAYER1_WIDTH;
    if (player1Position.y <= BOUNDS_TOP) player1Position.y = BOUNDS_TOP;
    if (player1Position.y + PLAYER1_HEIGHT >= BOUNDS_BOTTOM) player1Position.y = BOUNDS_BOTTOM - PLAYER1_HEIGHT;
}

function handlePlayer2WallCollision() {
    if (player2Position.x <= BOUNDS_LEFT) player2Position.x = BOUNDS_LEFT;
    if (player2Position.x + PLAYER2_WIDTH >= BOUNDS_RIGHT) player2Position.x = BOUNDS_RIGHT - PLAYER2_WIDTH;
    if (player2Position.y <= BOUNDS_TOP) player2Position.y = BOUNDS_TOP;
    if (player2Position.y + PLAYER2_HEIGHT >= BOUNDS_BOTTOM) player2Position.y = BOUNDS_BOTTOM - PLAYER2_HEIGHT;
}

function handlePlayer1Player2Collision() {
    if (rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT })) {
        player1Position.x -= player1Velocity.x;
        player1Position.y -= player1Velocity.y;
        player2Position.x -= player2Velocity.x;
        player2Position.y -= player2Velocity.y;
    }
}

function checkCollisions() {
    if (rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
        puckControlledBy = "player1";
    } else if (rectIntersect(player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
        puckControlledBy = "player2";
    }

    if (puckControlledBy === "player1") {
        puckPosition.x = player1Position.x - (PLAYER1_WIDTH / 2); // Place the puck in front of the player1
        puckPosition.y = player1Position.y + PLAYER1_HEIGHT - PUCK_HEIGHT;
    } else if (puckControlledBy === "player2") {
        puckPosition.x = player2Position.x + PLAYER2_WIDTH; // Place the puck in front of the player2
        puckPosition.y = player2Position.y + PLAYER2_HEIGHT - PUCK_HEIGHT;
    }

    updatePosition('puck', puckPosition);
}
