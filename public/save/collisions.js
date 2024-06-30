function rectIntersect(posA, sizeA, posB, sizeB) {
    return posA.x < posB.x + sizeB.width && posA.x + sizeA.width > posB.x &&
        posA.y < posB.y + sizeB.height && posA.y + sizeA.height > posB.y;
}

function handleWallCollision() {
    const dampingFactor = 0.3; // Damping factor to slightly reduce speed after collision

    // Check collision with left boundary
    if (puckPosition.x <= BOUNDS_LEFT) {
        puckPosition.x = BOUNDS_LEFT; // Prevent the puck from going out of bounds
        if (puckSpeed.x < 0) { // Only reflect if moving towards the boundary
            puckSpeed.x = -puckSpeed.x * dampingFactor; // Reflect and reduce speed slightly
        }
    }

    // Check collision with right boundary
    if (puckPosition.x + PUCK_WIDTH >= BOUNDS_RIGHT) {
        puckPosition.x = BOUNDS_RIGHT - PUCK_WIDTH; // Prevent the puck from going out of bounds
        if (puckSpeed.x > 0) { // Only reflect if moving towards the boundary
            puckSpeed.x = -puckSpeed.x * dampingFactor; // Reflect and reduce speed slightly
        }
    }

    // Check collision with top boundary
    if (puckPosition.y <= BOUNDS_TOP) {
        puckPosition.y = BOUNDS_TOP; // Prevent the puck from going out of bounds
        if (puckSpeed.y < 0) { // Only reflect if moving towards the boundary
            puckSpeed.y = -puckSpeed.y * dampingFactor; // Reflect and reduce speed slightly
        }
    }

    // Check collision with bottom boundary
    if (puckPosition.y + PUCK_HEIGHT >= BOUNDS_BOTTOM) {
        puckPosition.y = BOUNDS_BOTTOM - PUCK_HEIGHT; // Prevent the puck from going out of bounds
        if (puckSpeed.y > 0) { // Only reflect if moving towards the boundary
            puckSpeed.y = -puckSpeed.y * dampingFactor; // Reflect and reduce speed slightly
        }
    }
}


function handlePlayer1Player2Collision() {
    if (rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT })) {
        // Separate players to avoid sticking
        if (player1Velocity.x > 0) player1Position.x -= player1Velocity.x;
        if (player1Velocity.x < 0) player1Position.x += player1Velocity.x;
        if (player1Velocity.y > 0) player1Position.y -= player1Velocity.y;
        if (player1Velocity.y < 0) player1Position.y += player1Velocity.y;

        if (player2Velocity.x > 0) player2Position.x -= player2Velocity.x;
        if (player2Velocity.x < 0) player2Position.x += player2Velocity.x;
        if (player2Velocity.y > 0) player2Position.y -= player2Velocity.y;
        if (player2Velocity.y < 0) player2Position.y += player2Velocity.y;

        // Allow players to take the puck from each other
        if (puckControlledBy === 'player1') {
            puckControlledBy = 'player2';
        } else if (puckControlledBy === 'player2') {
            puckControlledBy = 'player1';
        }
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

function checkCollisions() {
    if (puckControlledBy === null) {
        if (rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
            puckControlledBy = "player1";
        } else if (rectIntersect(player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
            puckControlledBy = "player2";
        }
    }

    if (puckControlledBy === "player1") {
        puckPosition.x = player1Position.x - (PLAYER1_WIDTH / 2 - (PUCK_WIDTH / 4)); // Place the puck in front of player1
        puckPosition.y = player1Position.y + PLAYER1_HEIGHT / 2;
    } else if (puckControlledBy === "player2") {
        puckPosition.x = player2Position.x + PLAYER1_WIDTH; // Place the puck in front of player2
        puckPosition.y = player2Position.y + PLAYER2_HEIGHT / 2;
    }

    updatePosition('puck', puckPosition);
}