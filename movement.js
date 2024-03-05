document.addEventListener('keydown', function(event) {
    const playerSpeed = 5; // Adjust this value to change player speed
    const goalieSpeed = 5; // Adjust this value to change goalie speed

    const player = document.getElementById('player');
    const goalie = document.getElementById('goalie');

    // Player controls (A and D keys for left and right, W and S keys for up and down)
    if (event.key === 'a') {
        movePlayer(player, 'left');
    } else if (event.key === 'd') {
        movePlayer(player, 'right');
    } else if (event.key === 'w') {
        movePlayer(player, 'up');
    } else if (event.key === 's') {
        movePlayer(player, 'down');
    }

    // Goalie controls (Arrow keys)
    if (event.key === 'ArrowLeft') {
        moveGoalie(goalie, 'left');
    } else if (event.key === 'ArrowRight') {
        moveGoalie(goalie, 'right');
    } else if (event.key === 'ArrowUp') {
        moveGoalie(goalie, 'up');
    } else if (event.key === 'ArrowDown') {
        moveGoalie(goalie, 'down');
    }
});

document.addEventListener('keyup', function(event) {
    const goalie = document.getElementById('goalie');

    // Reset goalie position if no arrow keys are pressed
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
        resetGoalie(goalie);
    }
});

function movePlayer(player, direction) {
    const playerSpeed = 5; // Adjust this value to change player speed
    const playerLeft = player.offsetLeft;
    const playerTop = player.offsetTop;

    if (direction === 'left') {
        player.style.left = playerLeft - playerSpeed + 'px';
    } else if (direction === 'right') {
        player.style.left = playerLeft + playerSpeed + 'px';
    } else if (direction === 'up') {
        player.style.top = playerTop - playerSpeed + 'px';
    } else if (direction === 'down') {
        player.style.top = playerTop + playerSpeed + 'px';
    }
}

function moveGoalie(goalie, direction) {
    const goalieSpeed = 5; // Adjust this value to change goalie speed
    const goalieLeft = goalie.offsetLeft;
    const goalieTop = goalie.offsetTop;

    if (direction === 'left') {
        goalie.style.left = goalieLeft - goalieSpeed + 'px';
    } else if (direction === 'right') {
        goalie.style.left = goalieLeft + goalieSpeed + 'px';
    } else if (direction === 'up') {
        goalie.style.top = goalieTop - goalieSpeed + 'px';
    } else if (direction === 'down') {
        goalie.style.top = goalieTop + goalieSpeed + 'px';
    }
}

function resetGoalie(goalie) {
    // Reset goalie to starting position
    goalie.style.left = '50%';
    goalie.style.top = '50%';
}
