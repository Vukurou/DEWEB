let playerPosition = { x: 50, y: 75 }; // Startpositionen in Prozent
let goaliePosition = { x: 50, y: 25 };
let puckPosition = { x: 50, y: 50 }; // Puck in der Mitte
let puckSpeed = { x: 0, y: 0 }; // Anfängliche Geschwindigkeit des Pucks

// Einfache Repräsentation der Größe von Spieler, Goalie und Puck
let playerSize = { width: 5, height: 10 }; // Beispielwerte in Prozent
let goalieSize = { width: 5, height: 10 }; // Beispielwerte
let puckSize = { width: 2, height: 2 }; // Beispielwerte

document.addEventListener('keydown', function(event) {
    if (event.key === 'a') {
        movePlayer(-5, 0);
    } else if (event.key === 'd') {
        movePlayer(5, 0);
    } else if (event.key === 'w') {
        movePlayer(0, -5);
    } else if (event.key === 's') {
        movePlayer(0, 5);
    }

    if (event.key === 'ArrowLeft') {
        moveGoalie(-5, 0);
    } else if (event.key === 'ArrowRight') {
        moveGoalie(5, 0);
    } else if (event.key === 'ArrowUp') {
        moveGoalie(0, -5);
    } else if (event.key === 'ArrowDown') {
        moveGoalie(0, 5);
    }
});

function movePlayer(deltaX, deltaY) {
    playerPosition.x = Math.max(0, Math.min(100, playerPosition.x + deltaX));
    playerPosition.y = Math.max(0, Math.min(100, playerPosition.y + deltaY));
    updatePosition('player', playerPosition);
    checkCollisions();
}

function moveGoalie(deltaX, deltaY) {
    goaliePosition.x = Math.max(0, Math.min(100, goaliePosition.x + deltaX));
    goaliePosition.y = Math.max(0, Math.min(100, goaliePosition.y + deltaY));
    updatePosition('goalie', goaliePosition);
    checkCollisions();
}

function updatePosition(elementId, position) {
    const element = document.getElementById(elementId);
    element.style.left = position.x + '%';
    element.style.top = position.y + '%';
}

function checkCollisions() {
    // Kollision Spieler mit Puck
    if (rectIntersect(playerPosition, puckPosition, playerSize, puckSize)) {
        puckSpeed.x = 5; // Richtung und Stärke anpassen
        puckSpeed.y = 0;
        puckPosition.x += 5; // Verhindere wiederholte Kollisionen
    }

    // Kollision Goalie mit Puck
    if (rectIntersect(goaliePosition, puckPosition, goalieSize, puckSize)) {
        puckSpeed.x = -puckSpeed.x * 0.5;
        puckSpeed.y = -puckSpeed.y * 0.5;
        puckPosition.x -= 5; // Verhindere wiederholte Kollisionen
    }

    movePuck();
}

function movePuck() {
    puckPosition.x += puckSpeed.x;
    puckPosition.y += puckSpeed.y;
    updatePosition('puck', puckPosition);
}

function rectIntersect(posA, posB, sizeA, sizeB) {
    return posA.x < posB.x + sizeB.width && posA.x + sizeA.width > posB.x &&
           posA.y < posB.y + sizeB.height && posA.y + sizeA.height > posB.y;
}

document.addEventListener('DOMContentLoaded', function() {
    updatePosition('player', playerPosition);
    updatePosition('goalie', goaliePosition);
    updatePosition('puck', puckPosition);
});
