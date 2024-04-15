let playerPosition = { x: 60, y: 50 }; // Startpositionen in Prozent
let goaliePosition = { x: 25, y: 50 };
let puckPosition = { x: 50, y: 50 }; // Puck in der Mitte
let puckSpeed = { x: 0, y: 0 }; // Anfängliche Geschwindigkeit des Pucks
let puckControlledBy = null;

// Einfache Repräsentation der Größe von Spieler, Goalie und Puck
let playerSize = { width: 2, height: 5 }; 
let goalieSize = { width: 2, height: 5 }; 
let puckSize = { width: 1, height: 1 }; 

document.addEventListener('keydown', function(event) {
    const playerSpeed = 2;
    const goalieSpeed = 2;
        // Initialisiere Bewegungsänderungen für Spieler und Goalie
        let playerDeltaX = 0;
        let playerDeltaY = 0;
        let goalieDeltaX = 0;
        let goalieDeltaY = 0;
    
        // Spieler Bewegung
        if (event.key === 'a') playerDeltaX -= 2; // Links
        if (event.key === 'd') playerDeltaX += 2; // Rechts
        if (event.key === 'w') playerDeltaY -= 2; // Oben
        if (event.key === 's') playerDeltaY += 2; // Unten
    
        // Goalie Bewegung
        if (event.key === 'ArrowLeft') goalieDeltaX -= 2; // Links
        if (event.key === 'ArrowRight') goalieDeltaX += 2; // Rechts
        if (event.key === 'ArrowUp') goalieDeltaY -= 2; // Oben
        if (event.key === 'ArrowDown') goalieDeltaY += 2; // Unten
    
        // Bewege Spieler und Goalie basierend auf der gesammelten Delta-Information
        movePlayer(playerDeltaX, playerDeltaY);
        moveGoalie(goalieDeltaX, goalieDeltaY);
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
        puckControlledBy = "player";
    } else if (rectIntersect(goaliePosition, puckPosition, goalieSize, puckSize)) {
        puckControlledBy = "goalie";
    }

    // Puck-Position basierend auf der Kontrolle aktualisieren
    if (puckControlledBy === "player") {
        // Der Puck "klebt" an der Vorderseite des Spielers
        puckPosition.x = playerPosition.x + (playerSize.width / 2 - puckSize.width / 2);
        puckPosition.y = playerPosition.y - puckSize.height; // Puck oberhalb des Spielers positionieren
    } else if (puckControlledBy === "goalie") {
        // Der Puck "klebt" an der Vorderseite des Torwarts
        puckPosition.x = goaliePosition.x + (goalieSize.width / 2 - puckSize.width / 2);
        puckPosition.y = goaliePosition.y - puckSize.height; // Puck oberhalb des Torwarts positionieren
    }
    updatePosition('puck', puckPosition);
    movePuck();
}

function movePuck() {
    puckPosition.x += puckSpeed.x;
    puckPosition.y += puckSpeed.y;

    // Check for wall collisions
    if (puckPosition.x <= 0 || puckPosition.x + puckSize.width >= 100) { // Assuming 100 is the width of the rink
        puckSpeed.x = -puckSpeed.x; // Reverse direction
    }
    if (puckPosition.y <= 0 || puckPosition.y + puckSize.height >= 100) { // Assuming 100 is the height of the rink
        puckSpeed.y = -puckSpeed.y;
    }

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
