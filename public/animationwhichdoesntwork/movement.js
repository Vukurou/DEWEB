const PLAYER1_WIDTH = 25;
const PLAYER1_HEIGHT = 30;
const PLAYER2_WIDTH = 25;
const PLAYER2_HEIGHT = 30;
const PUCK_WIDTH = 10;
const PUCK_HEIGHT = 10;

const RINK_WIDTH = 800;
const RINK_HEIGHT = 500;

const BOUNDS_LEFT = 0;
const BOUNDS_RIGHT = RINK_WIDTH;
const BOUNDS_TOP = 0;
const BOUNDS_BOTTOM = RINK_HEIGHT;

let keysPressed = {};

document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    console.log('Key down:', event.key);
});

document.addEventListener('keyup', function(event) {
    keysPressed[event.key] = false;
    console.log('Key up:', event.key);
});

function updatePosition(elementId, position) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
        console.log(`Updated position of ${elementId} to (${position.x}, ${position.y})`);
    }
}
