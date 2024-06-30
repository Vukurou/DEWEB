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