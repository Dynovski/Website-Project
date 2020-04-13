// Constructor function for Snake object
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.size = 1;
    this.tail = [];

    // Set new direction of movement
    this.direction = function(x,y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    // New snake location for wrapping
    this.location = function(x,y) {
        this.x = x;
        this.y = y;
    }

    // Make next movement
    this.move = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // New random location
    this.newLocation = function (rows, columns) {
        this.x = Math.floor(Math.random() * rows);
        this.y = Math.floor(Math.random() * columns);
    }
}