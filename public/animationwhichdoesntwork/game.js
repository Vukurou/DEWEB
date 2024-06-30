let player1Score = 0;
let player2Score = 0;
const winningScore = 4; // Adjust as needed

let player1Position = { x: 500, y: 290 };
let player2Position = { x: 150, y: 290 };
let puckPosition = { x: 400, y: 290 };
let puckSpeed = { x: 0, y: 0 };
let puckControlledBy = null;

function resetScores() {
    player1Score = 0;
    player2Score = 0;
    updateScoreDisplays();
}

function updateScoreDisplays() {
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
}

function resetGame() {
    resetScores();
    resetPositions();
}

function initGame() {
    resetGame();
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    console.log('Game loop running');
    movePlayer1();
    movePlayer2();
    movePuck();
    requestAnimationFrame(gameLoop);
}

function updateScore(scorer) {
    if (scorer === 'player1') {
        player1Score++;
    } else if (scorer === 'player2') {
        player2Score++;
    }
    updateScoreDisplays();
    checkWinCondition();
}

function checkWinCondition() {
    if (player1Score >= winningScore || player2Score >= winningScore) {
        alert(`Game Over. ${player1Score >= winningScore ? 'player1' : 'player2'} wins!`);
        resetGame();
    } else {
        resetPositions();
    }
}

function resetPuckPosition() {
    puckPosition = { x: 400, y: 290 }; // Adjusted puck position
    puckSpeed = { x: 0, y: 0 }; // Stop the puck
    puckControlledBy = null; // Ensure puck is not controlled by anyone
    updatePosition('puck', puckPosition);
}

function resetPositions() {
    player1Position = { x: 500, y: 290 }; // Reset player1 position slightly to the left
    player2Position = { x: 150, y: 290 }; // Reset player2 position
    resetPuckPosition();
    updatePosition('player1', player1Position);
    updatePosition('player2', player2Position);
}

function checkGoal() {
    const goalLine = 20; // Goal line
    const icingLine = 50; // Icing line

    if (puckPosition.x <= goalLine) {
        if (puckPosition.y >= 200 && puckPosition.y <= 300) { // Goal area
            updateScore('player1');
        } else if (puckPosition.y < 200 || puckPosition.y > 300) { // Icing area
            updateScore('player2');
        }
        resetPositions();
    } else if (puckPosition.x >= 780) { // Right side of the rink
        updateScore('player2');
        resetPositions();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updatePosition('player1', player1Position);
    updatePosition('player2', player2Position);
    updatePosition('puck', puckPosition);
    initGame();
});
