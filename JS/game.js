const header = document.querySelector("#game-header");

// Get canvas and its context
const canvas = document.querySelector("#game-window");
const context = canvas.getContext("2d");

// Add key listener
document.addEventListener("keydown", keyPressed);

// Set how often game is refreshed per second
setInterval(draw, 1000/15);

const pixelsPerTile = 30;
const columns = Math.floor(canvas.height / pixelsPerTile);
const rows = Math.floor(canvas.width / pixelsPerTile);

const snake = new Snake();
const food = new Food()

var newGame = true;

function draw() {
    // When starting new game
    if(newGame) {
        snake.newLocation(rows, columns);
        food.newLocation(rows, columns);
        newGame = false;
    }
    snake.move();
    // If snake is out of bounds wrap it
    if(snake.x  < 0) {
        snake.location(rows - 1, snake.y);
    }
    if(snake.x > rows -1) {
        snake.location(0, snake.y);
    }
    if(snake.y  < 0) {
        snake.location(snake.x, columns -1);
    }
    if(snake.y > columns -1) {
        snake.location(snake.x, 0);
    }
    // Fill the background
    context.fillStyle = "#222629";
    context.fillRect(0,0,canvas.width, canvas.height);

    context.fillStyle="lime";
    for(let i = 0; i < snake.tail.length; i++) {
        context.fillRect(snake.tail[i].x * pixelsPerTile,
                        snake.tail[i].y * pixelsPerTile,
                        pixelsPerTile - 2,pixelsPerTile - 2);
        // If snake eats itself
        if(snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            header.innerHTML = "Score: " + snake.size + "<br>You lost! Press Space to restart!";
            snake.size = 0;
        }
    }

    snake.tail.push({x:snake.x, y:snake.y});
    while(snake.tail.length > snake.size) {
        snake.tail.shift();
    }

    if(food.x == snake.x && food.y == snake.y) {
        snake.size++;
        food.newLocation(rows, columns);
        // Prevent spawning food on a snake
        assureSpawnedCorrectly();
    }

    context.fillStyle = "red";
    context.fillRect(food.x * pixelsPerTile, food.y * pixelsPerTile, pixelsPerTile - 2, pixelsPerTile - 2);
}

function assureSpawnedCorrectly() {
    snake.tail.forEach((element) => {
        // Respawn food and chack again
        if(element.x == food.x && element.y == food.y) {
            food.newLocation(rows, columns);
            assureSpawnedCorrectly();
            // To prevent redundant checking
            return;
        }
    })
}

function keyPressed(event) {
    switch(event.keyCode) {
        case 37:
            // To prevent eating self on pressing opposite direction
            if(snake.xSpeed != 1) {
                snake.direction(-1, 0);
            }
            break;
        case 38:
            // To prevent eating self on pressing opposite direction
            if(snake.ySpeed != 1) {
                snake.direction(0, -1);
            }
            break;
        case 39:
            // To prevent eating self on pressing opposite direction
            if(snake.xSpeed != -1) {
                snake.direction(1, 0);
            }
            break;
        case 40:
            // To prevent eating self on pressing opposite direction
            if(snake.ySpeed != -1) {
                snake.direction(0, 1);
            }
            break;
        case 32:
            // Restart only after losing
            if(snake.size == 0) {
                snake.size = 1;
                newGame = true;
                header.innerHTML = "This time you have it!";
            }
            break;
    }
}