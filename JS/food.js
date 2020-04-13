// Constructor function for food
function Food() {
    this.x = 0;
    this.y = 0;

    // New random location for the food based on number of rows and columns
    this.newLocation = function (rows, columns) {
        this.x = Math.floor(Math.random() * rows);
        this.y = Math.floor(Math.random() * columns);
    }
}