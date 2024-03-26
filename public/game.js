// Global score variables und winningScore bleiben unverändert
let playerScore = 0;
let goalieScore = 0;
const winningScore = 4; // Adjust as needed

// Diese Funktionen bleiben unverändert, da sie spezifisch den Spielzustand steuern
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
    // Da resetPuckAndGame eine spezifische Funktion in movement.js ist, rufen wir sie hier nicht auf
    resetScores();
    // Stattdessen benachrichtigen wir movement.js, um den Puck zurückzusetzen
    resetPuckPosition(); // Diese Funktion muss in movement.js definiert werden
}

// Die initGame Funktion benötigt nur, das Spiel zu initialisieren und die Spielschleife zu starten
function initGame() {
    resetGame();
    requestAnimationFrame(gameLoop); // Ersetzt setInterval für eine flüssigere Animation
}

// Die gameLoop Funktion wird stark vereinfacht, da die Kollisionserkennung in movement.js abgehandelt wird
function gameLoop() {
    // Die Spielschleife könnte hier genutzt werden, um Spiel-spezifische Checks durchzuführen,
    // wie Zeitlimits, spezielle Ereignisse etc., falls benötigt
    requestAnimationFrame(gameLoop);
}

// Update score und checkWinCondition Funktionen bleiben gleich, aber:
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
