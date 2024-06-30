function movePuck() {
    if (puckControlledBy === null) { // Only move puck if it's not controlled
        puckPosition.x += puckSpeed.x * 0.7; // Use 0.7 for speed
        puckPosition.y += puckSpeed.y * 0.7; // Use 0.7 for speed

        puckSpeed.x *= 0.995;
        puckSpeed.y *= 0.995;

        handleWallCollision();
    }

    updatePosition('puck', puckPosition);
}
