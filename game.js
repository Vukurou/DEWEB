// Define winning score
const winningScore = 4; // Adjust as needed

// Function to reset puck position and game state
function resetPuckAndGame() {
    // Reset puck position
    const puck = document.getElementById('puck');
    puck.style.left = '50%';
    puck.style.top = '50%';

    // Reset player position
    resetPlayerPosition();
}

// Function to reset the game state
function resetGame() {
    // Reset puck position and game state
    resetPuckAndGame();

    // Reset scores
    resetScores();
}

// Function to reset scores
function resetScores() {
    playerScore = 0;
    goalieScore = 0;
    updateScoreDisplays();
}

// Function to update score displays
function updateScoreDisplays() {
    const playerScoreElement = document.getElementById('player-score');
    const goalieScoreElement = document.getElementById('goalie-score');
    playerScoreElement.textContent = playerScore;
    goalieScoreElement.textContent = goalieScore;
}

// Function to initialize the game
function initGame() {
    // Add event listener for game loop
    setInterval(gameLoop, 1000 / 60); // Run game loop at 60 frames per second
}

// Function to update game state and handle collisions
function gameLoop() {
    // Check collisions between player, goalie, and puck
    checkCollisions();
}

// Function to check collisions between player, goalie, and puck
function checkCollisions() {
    const puck = document.getElementById('puck');
    const goal = document.getElementById('goal');
    const goalLine = document.getElementById('goal-line');
    const icingLine = document.getElementById('icing-line');

    // Get positions and dimensions of elements
    const puckRect = puck.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();
    const goalLineRect = goalLine.getBoundingClientRect();
    const icingLineRect = icingLine.getBoundingClientRect();

    // Check collision between puck and goal
    if (rectIntersect(puckRect, goalRect)) {
        // Check if the puck crosses the goal line
        if (puckRect.bottom <= goalLineRect.top) {
            // Handle scoring if the puck crosses the goal line
            updateScore();
            return; // Return early to prevent further checks
        }
        // Reset puck position if the puck collides with the goal but does not cross the goal line
        resetPuckAndGame();
        return; // Return early to prevent further checks
    }

    // Check if the puck crosses the icing line
    if (puckRect.bottom > icingLineRect.top) {
        // Reset puck position if the puck crosses the icing line
        resetPuckAndGame();
        return; // Return early to prevent further checks
    }

    // Check if the puck crosses the goal line without crossing the goal
    if (puckRect.bottom > goalLineRect.top && !rectIntersect(puckRect, goalRect)) {
        // Handle scoring for goalie if the puck crosses the goal line without scoring
        goalieScores();
        return; // Return early to prevent further checks
    }
}

// Function to handle scoring for goalie
function goalieScores() {
    // Increment the score of the goalie
    goalieScore++;

    // Update the scoreboard display
    goalieScoreElement.textContent = goalieScore;

    // Check if a player has won
    checkWinCondition();
}

// Function to handle scoring for player
function updateScore() {
    const playerScoreElement = document.getElementById('player-score');

    // Increment the score of the player
    playerScore++;

    // Update the scoreboard display
    playerScoreElement.textContent = playerScore;

    // Check if a player has won
    checkWinCondition();
}

// Function to check if a player has won
function checkWinCondition() {
    if (playerScore >= winningScore || goalieScore >= winningScore) {
        // Reset game state if a player has won
        resetGame();
    }
}

// Function to reset player position
function resetPlayerPosition() {
    const player = document.getElementById('player');
    // Set the initial player position or position it wherever you want
    player.style.left = '0';
    player.style.top = '0';
}

// Function to check if two rectangles intersect
function rectIntersect(rect1, rect2) {
    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}

// Function to initialize the game when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// Call resetGame() whenever you need to reset the game state
// For example, after a goal is scored
resetGame();
