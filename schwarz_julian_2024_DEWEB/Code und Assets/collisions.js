function rectIntersect(posA, sizeA, posB, sizeB) {
    return posA.x < posB.x + sizeB.width && posA.x + sizeA.width > posB.x &&
        posA.y < posB.y + sizeB.height && posA.y + sizeA.height > posB.y;
}

const dampingFactor = 0.3;

function handleWallCollision() {
    // Check collision with left boundary
    if (puckPosition.x <= BOUNDS_LEFT) {
        puckPosition.x = BOUNDS_LEFT;
        if (puckSpeed.x < 0) {
            puckSpeed.x = -puckSpeed.x * dampingFactor;
        }
    }

    // Check collision with right boundary
    if (puckPosition.x + PUCK_WIDTH >= BOUNDS_RIGHT) {
        puckPosition.x = BOUNDS_RIGHT - PUCK_WIDTH;
        if (puckSpeed.x > 0) {
            puckSpeed.x = -puckSpeed.x * dampingFactor;
        }
    }

    // Check collision with top boundary
    if (puckPosition.y <= BOUNDS_TOP) {
        puckPosition.y = BOUNDS_TOP;
        if (puckSpeed.y < 0) {
            puckSpeed.y = -puckSpeed.y * dampingFactor;
        }
    }

    // Check collision with bottom boundary
    if (puckPosition.y + PUCK_HEIGHT >= BOUNDS_BOTTOM) {
        puckPosition.y = BOUNDS_BOTTOM - PUCK_HEIGHT;
        if (puckSpeed.y > 0) {
            puckSpeed.y = -puckSpeed.y * dampingFactor;
        }
    }

    // Handle puck collision with left goal frame boundaries (Player 1's goal)
    if (puckPosition.y >= GOAL_FRAME_TOP && puckPosition.y <= GOAL_FRAME_BOTTOM) {
        if (puckPosition.x <= GOAL_FRAME_LEFT_FRONT_P1 && puckPosition.x >= GOAL_FRAME_LEFT_BACK_P1) {
            puckSpeed.x = -puckSpeed.x * dampingFactor;
        }
    }

    // Handle puck collision with right goal frame boundaries (Player 2's goal)
    if (puckPosition.y >= GOAL_FRAME_TOP && puckPosition.y <= GOAL_FRAME_BOTTOM) {
        if (puckPosition.x + PUCK_WIDTH >= GOAL_FRAME_RIGHT_BACK_P2 && puckPosition.x + PUCK_WIDTH <= GOAL_FRAME_RIGHT_FRONT_P2) {
            puckSpeed.x = -puckSpeed.x * dampingFactor;
        }
    }
}

function handlePlayer1WallCollision() {
    if (player1Position.x <= BOUNDS_LEFT) player1Position.x = BOUNDS_LEFT;
    if (player1Position.x + PLAYER1_WIDTH >= BOUNDS_RIGHT) player1Position.x = BOUNDS_RIGHT - PLAYER1_WIDTH;
    if (player1Position.y <= BOUNDS_TOP) player1Position.y = BOUNDS_TOP;
    if (player1Position.y + PLAYER1_HEIGHT >= BOUNDS_BOTTOM) player1Position.y = BOUNDS_BOTTOM - PLAYER1_HEIGHT;

    // Handle player collision with left goal frame boundaries (Player 1's goal)
    if (player1Position.y >= GOAL_FRAME_TOP && player1Position.y <= GOAL_FRAME_BOTTOM) {
        if (player1Position.x + PLAYER1_WIDTH >= GOAL_FRAME_LEFT_BACK_P1 && player1Position.x <= GOAL_FRAME_LEFT_FRONT_P1) {
            player1Position.x = GOAL_FRAME_LEFT_BACK_P1 - PLAYER1_WIDTH;
        }
    }

    // Handle player collision with right goal frame boundaries (Player 2's goal)
    if (player1Position.y >= GOAL_FRAME_TOP && player1Position.y <= GOAL_FRAME_BOTTOM) {
        if (player1Position.x >= GOAL_FRAME_RIGHT_FRONT_P2 && player1Position.x - PLAYER1_WIDTH <= GOAL_FRAME_RIGHT_BACK_P2) {
            player1Position.x = GOAL_FRAME_RIGHT_BACK_P2;
        }
    }
}

function handlePlayer2WallCollision() {
    if (player2Position.x <= BOUNDS_LEFT) player2Position.x = BOUNDS_LEFT;
    if (player2Position.x + PLAYER2_WIDTH >= BOUNDS_RIGHT) player2Position.x = BOUNDS_RIGHT - PLAYER2_WIDTH;
    if (player2Position.y <= BOUNDS_TOP) player2Position.y = BOUNDS_TOP;
    if (player2Position.y + PLAYER2_HEIGHT >= BOUNDS_BOTTOM) player2Position.y = BOUNDS_BOTTOM - PLAYER2_HEIGHT;

    // Handle player collision with left goal frame boundaries (Player 1's goal)
    if (player2Position.y >= GOAL_FRAME_TOP && player2Position.y <= GOAL_FRAME_BOTTOM) {
        if (player2Position.x + PLAYER2_WIDTH >= GOAL_FRAME_LEFT_BACK_P1 && player2Position.x <= GOAL_FRAME_LEFT_FRONT_P1) {
            player2Position.x = GOAL_FRAME_LEFT_BACK_P1 - PLAYER2_WIDTH;
        }
    }

    // Handle player collision with right goal frame boundaries (Player 2's goal)
    if (player2Position.y >= GOAL_FRAME_TOP && player2Position.y <= GOAL_FRAME_BOTTOM) {
        if (player2Position.x >= GOAL_FRAME_RIGHT_FRONT_P2 && player2Position.x - PLAYER2_WIDTH <= GOAL_FRAME_RIGHT_BACK_P2) {
            player2Position.x = GOAL_FRAME_RIGHT_BACK_P2;
        }
    }
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
    if (puckControlledBy === "player1" && rectIntersect(player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
        puckControlledBy = "player2";
    } else if (puckControlledBy === "player2" && rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
        puckControlledBy = "player1";
    } else if (puckControlledBy === null) {
        if (rectIntersect(player1Position, { width: PLAYER1_WIDTH, height: PLAYER1_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
            puckControlledBy = "player1";
        } else if (rectIntersect(player2Position, { width: PLAYER2_WIDTH, height: PLAYER2_HEIGHT }, puckPosition, { width: PUCK_WIDTH, height: PUCK_HEIGHT })) {
            puckControlledBy = "player2";
        }
    }

    if (puckControlledBy === "player1") {
        puckPosition.x = player1Position.x - (PLAYER1_WIDTH / 2 - (PUCK_WIDTH / 4));
        puckPosition.y = player1Position.y + PLAYER1_HEIGHT / 2 + PUCK_HEIGHT / 2;
    } else if (puckControlledBy === "player2") {
        puckPosition.x = player2Position.x + PLAYER1_WIDTH;
        puckPosition.y = player2Position.y + PLAYER2_HEIGHT / 2 + PUCK_HEIGHT / 2;
    }

    updatePosition('puck', puckPosition);
}
