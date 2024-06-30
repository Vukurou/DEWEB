let player1Score = 0;
let player2Score = 0;
const winningScore = 3; // Adjust as needed

function resetScores() {
    player1Score = 0;
    player2Score = 0;
    updateScoreDisplays();
}

function updateScoreDisplays() {
    const player1ScoreElement = document.getElementById('player1-score');
    const player2ScoreElement = document.getElementById('player2-score');
    if (player1ScoreElement && player2ScoreElement) {
        player1ScoreElement.textContent = player1Score.toString();
        player2ScoreElement.textContent = player2Score.toString();
    } else {
        console.error('Score elements not found in the DOM');
    }
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
    movePlayer1();
    movePlayer2();
    movePuck();
    shootPuckPlayer1();
    shootPuckPlayer2();
    handleWallCollision();
    checkGoal();
    requestAnimationFrame(gameLoop);
}

function updateScore(scorer) {
    if (scorer === 'player1') {
        player1Score++;
    } else if (scorer === 'player2') {
        player2Score++;
    }
    console.log(`Score updated: Player 1 - ${player1Score}, Player 2 - ${player2Score}`);
    updateScoreDisplays();
    checkWinCondition();
}

function checkWinCondition() {
    if (player1Score >= winningScore || player2Score >= winningScore) {
        alert(`Game Over. ${player1Score >= winningScore ? 'Player 1' : 'Player 2'} wins!`);
        resetGame();
    } else {
        resetPositions();
    }
}

function resetPuckPosition() {
    puckPosition = { x: 396, y: 305 };
    puckSpeed = { x: 0, y: 0 };
    puckControlledBy = null;
    updatePosition('puck', puckPosition);
}

function resetPositions() {
    player1Position = { x: 625, y: 290 };
    player2Position = { x: 155, y: 290 };
    resetPuckPosition();
    updatePosition('player1', player1Position);
    updatePosition('player2', player2Position);
}

function checkGoal() {
    const goalLineP1 = 130;
    const goalLineP2 = 670;
    const goalTop = 270;
    const goalBottom = 340;

    // Player 1 scores
    if (puckPosition.x >= goalLineP2 && puckPosition.y >= goalTop && puckPosition.y <= goalBottom) {
        if (puckPosition.x - puckSpeed.x < goalLineP2) {
            console.log('Player 1 scores!');
            updateScore('player1');
            resetPositions();
        }
    }
    // Player 2 scores
    else if (puckPosition.x <= goalLineP1 && puckPosition.y >= goalTop && puckPosition.y <= goalBottom) {
        if (puckPosition.x - puckSpeed.x > goalLineP1) {
            console.log('Player 2 scores!');
            updateScore('player2');
            resetPositions();
        }
    }
}


function updatePosition(elementId, position) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
    } else {
        console.error(`Element with ID ${elementId} not found`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');

    const scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    scoreboard.innerHTML = '<span id="player1-score">0</span> - <span id="player2-score">0</span>';
    scoreboard.style.position = 'absolute';
    scoreboard.style.top = '20px';
    scoreboard.style.left = '50%';
    scoreboard.style.transform = 'translateX(-50%)';
    scoreboard.style.fontSize = '60px';
    scoreboard.style.color = 'black';
    scoreboard.style.backgroundColor = 'white';
    scoreboard.style.padding = '10px';
    scoreboard.style.borderRadius = '5px';
    scoreboard.style.zIndex = '1000';
    gameContainer.appendChild(scoreboard);

    if (!document.getElementById('player1')) {
        const player1 = document.createElement('div');
        player1.id = 'player1';
        player1.style.position = 'absolute';
        gameContainer.appendChild(player1);
    }

    if (!document.getElementById('player2')) {
        const player2 = document.createElement('div');
        player2.id = 'player2';
        player2.style.position = 'absolute';
        gameContainer.appendChild(player2);
    }

    if (!document.getElementById('puck')) {
        const puck = document.createElement('div');
        puck.id = 'puck';
        puck.style.position = 'absolute';
        gameContainer.appendChild(puck);
    }

    initGame();
});
