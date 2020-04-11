/**
 *********************************************
 *              Travaux pratique             *
 *           Licence 3 Informatique          *
 *            Avignon Université             *
 *********************************************
 */

// Settings
const FRESHRATE = 10;
const WIDTH = 600;
const HEIGHT = 400;
const STEPS = 10;
const MOVE_DISTANCE = WIDTH / STEPS;

// Player 1
var myGamePieceP1;
var scoreP1Variable = 0;
var scoreP1;

// Player 2
var myGamePieceP2;
var scoreP2Variable = 0;
var scoreP2;

// Images cars
const SIZE_CAR = 250;
var carP1 = new Image();
carP1.src = "assets/images/car.svg";

/**
 * The constructor of the game
 */
function startGame() {

    // Player 1
    myGamePieceP1 = new component(30, 30, "yellow", 0, 60); // Player 1 piece
    scoreP1 = new component("30px", "Consolas", "black", 0, 40, "text"); // Score
    // Player 2
    myGamePieceP2 = new component(30, 30, "pink", 0, 180); // Player 2 piece
    scoreP2 = new component("30px", "Consolas", "black", 370, 40, "text"); // Score

    myGameArea.start(); // Game
}

var myGameArea = {

    // The canvas HTML element
    canvas : document.createElement("canvas"),

    // The starting method
    start : function() {

        this.canvas.width = WIDTH; // Width
        this.canvas.height = HEIGHT; // Height

        this.context = this.canvas.getContext("2d"); // 2D
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Insert canvas in the html

        // Number of click by players
        this.clickNbr = {
            p1 : 0,
            p2 : 0
        };

        // Update the game every 20ms
        this.interval = setInterval(updateGameArea, FRESHRATE);

        },
    // Clear method
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    }
}

/**
 * Create a component on the canvas
 * @param {Integer} width 
 * @param {Integer} height 
 * @param {String} color 
 * @param {Double} x 
 * @param {Double} y 
 * @param {String} type 
 */
function component(width, height, color, x, y, type) {

    this.type = type; // Type of the canvas element
    this.score = 0; // Current score
    this.width = width; // Width of the component
    this.height = height; // Height of the component
    this.speedX = 0; // Speed in the X axis
    this.speedY = 0; // Speed in the X axis
    this.x = x; // Horizontal position
    this.y = y; // Vertical position

    // Update the component
    this.update = function() {

        // The component
        ctx = myGameArea.context;

        // If the component is a piece of text
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height; // Set the font size
            ctx.fillStyle = color; // Set the color size
            ctx.fillText(this.text, this.x, this.y); // Draw the text
        } else {
            ctx.fillStyle = color; // Set the color of the component
            // ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the component
            carP1.style.fill = color;
            // carP1 = "data:image/svg+xml;charset=utf-8," + carP1.replace(/#e04236/g,color);
            ctx.drawImage(carP1,this.x,this.y,SIZE_CAR,SIZE_CAR); // Draw the component
        }
    }

    // Update the position
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitEnd();
    }

    this.hitEnd = function() {

        if (this.x > myGameArea.canvas.width) {
            
            // Check winner
            if (myGamePieceP1.x > myGamePieceP2.x) {
                scoreP1Variable +=1;             
            } else if (myGamePieceP1.x == myGamePieceP2.x) {
                scoreP1Variable +=1;  
                scoreP2Variable +=1;           
            }  else {
                scoreP2Variable +=1;
            }

            // Reset
            myGamePieceP1.x = 0;
            myGamePieceP2.x = 0;
        }
    }
}

function updateGameArea() {

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    // Change text
    scoreP1.text="SCORE P1: " + scoreP1Variable;
    scoreP2.text="SCORE P2: " + scoreP2Variable;

    // Update the position
    myGamePieceP1.newPos();
    myGamePieceP2.newPos();

    // Update the components
    myGamePieceP1.update();
    myGamePieceP2.update();
    scoreP1.update();
    scoreP2.update();
}

/**
 * Move a piece from N pixel on the X axis
 * @param {Component} piece 
 * @param {Integer} n 
 */
function move(piece) {
    piece.x += MOVE_DISTANCE;
}