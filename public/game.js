// Global score variables und winningScore
let playerScore = 0;
let goalieScore = 0;
const winningScore = 4; // Adjust as needed

function resetScores() {
    playerScore = 0;
    goalieScore = 0;
    updateScoreDisplays();
}

function updateScoreDisplays() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('goalie-score').textContent = goalieScore;
}

function resetGame() {
    resetScores();
    resetPuckPosition();
}

// Die initGame Funktion benötigt nur, das Spiel zu initialisieren und die Spielschleife zu starten
function initGame() {
    resetGame();
    requestAnimationFrame(gameLoop); 

function gameLoop() {
    requestAnimationFrame(gameLoop);
}
}

function updateScore(scorer) {
    if (scorer === 'player') {
        playerScore++;
    } else if (scorer === 'goalie') {
        goalieScore++;
    }
    updateScoreDisplays();
    checkWinCondition();
}

function checkWinCondition() {
    if (playerScore >= winningScore || goalieScore >= winningScore) {
        alert(`Game Over. ${playerScore >= winningScore ? 'Player' : 'Goalie'} wins!`);
        resetGame(); // Dieses Mal ruft resetGame resetPuckPosition über einen Umweg auf
    }
}

document.addEventListener('DOMContentLoaded', initGame);
