let player1Position = { x: 500, y: 290 };
let player2Position = { x: 150, y: 290 };
let puckPosition = { x: 400, y: 290 };
let puckSpeed = { x: 0, y: 0 };
let puckControlledBy = null;

const PLAYER1_WIDTH = 25;
const PLAYER1_HEIGHT = 30;
const PLAYER2_WIDTH = 25;
const PLAYER2_HEIGHT = 30;
const PUCK_WIDTH = 10;
const PUCK_HEIGHT = 10;

const RINK_WIDTH = 800;
const RINK_HEIGHT = 500;

const BOUNDS_LEFT = 45;
const BOUNDS_RIGHT = RINK_WIDTH - 45;
const BOUNDS_TOP = 145;
const BOUNDS_BOTTOM = RINK_HEIGHT - 35;

// Define goal frame boundaries
const GOAL_FRAME_TOP = 260;
const GOAL_FRAME_BOTTOM = 340;
const GOAL_FRAME_DEPTH = 70;
const GOAL_FRAME_BLOCK_WIDTH = 12; // Block width for goal frames

// Left goal frame (Player 1's goal)
const GOAL_FRAME_LEFT_BACK_P1 = BOUNDS_LEFT + GOAL_FRAME_DEPTH;
const GOAL_FRAME_LEFT_FRONT_P1 = GOAL_FRAME_LEFT_BACK_P1 + GOAL_FRAME_BLOCK_WIDTH;

// Right goal frame (Player 2's goal)
const GOAL_FRAME_RIGHT_BACK_P2 = BOUNDS_RIGHT - GOAL_FRAME_DEPTH;
const GOAL_FRAME_RIGHT_FRONT_P2 = GOAL_FRAME_RIGHT_BACK_P2 - GOAL_FRAME_BLOCK_WIDTH;

let keysPressed = {};

function updatePosition(elementId, position) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updatePosition('player1', player1Position);
    updatePosition('player2', player2Position);
    updatePosition('puck', puckPosition);
});

document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keysPressed[event.key] = false;
});
