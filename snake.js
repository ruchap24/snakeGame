// javascript code for snake game
const gameBoard = document.getElementById('game-board');
const boardSize = 20; // 20x20 grid
let snake = [{ x: 10, y: 10 }]; // Start the snake in the middle
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let direction = { x: 1, y: 0 }; // Start moving to the right
let speed = 200;
let gameOver = false; // To check game over status

function createBoard() {
    gameBoard.innerHTML = ''; // Clear previous board
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const box = document.createElement('div');
            if (snake.some(segment => segment.x === j && segment.y === i)) {
                box.classList.add('snake');
            }
            if (food.x === j && food.y === i) {
                box.classList.add('food');
            }
            gameBoard.appendChild(box);
        }
    }
}
function updateSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if the snake hits the wall or itself
    if (
        newHead.x < 0 || newHead.x >= boardSize ||
        newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        gameOver = true; // Set game over flag
        alert('Game Over!');
        resetGame();
        return;
    }

    snake.unshift(newHead); // Add new head to the front

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) }; // Generate new food position
    } else {
        snake.pop(); // Remove the last segment unless we eat food
    }
}

function changeDirection(event) {
    if (gameOver) return; // Prevent direction change if the game is over
    switch (event.keyCode) {
        case 37: // Left arrow
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 38: // Up arrow
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 39: // Right arrow
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
        case 40: // Down arrow
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }]; // Reset snake to the starting point
    direction = { x: 1, y: 0 }; // Start moving to the right
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) }; // Generate new food
    gameOver = false; // Reset game over status
}

function gameLoop() {
    if (!gameOver) {
        updateSnake();
        createBoard();
    }
    setTimeout(gameLoop, speed);
}

window.addEventListener('keydown', changeDirection);
gameLoop(); // Start the game loop
