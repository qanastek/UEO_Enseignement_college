/**
 *********************************************
 *              Travaux pratique             *
 *           Licence 3 Informatique          *
 *            Avignon Université             *
 *********************************************
 */

// Settings
const FRESHRATE = 10;
const WIDTH = screen.width;
const HEIGHT = screen.height*0.335;
const STEPS = 10;
const MOVE_DISTANCE = WIDTH / STEPS;
const ROAD_HEIGHT = HEIGHT*0.75;
const MIDDLE_ROAD = HEIGHT*0.625;
const NBR_MIDDLE_BAND = 6;
const WIDHT_MIDDLE_BAND = WIDTH / NBR_MIDDLE_BAND; // Center band
const FINISH_STRING = "FINISH";

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

// Map
var MAP = []

/**
 * The constructor of the game
 */
function startGame() {

    // Road
    MAP.push(new component(WIDTH, ROAD_HEIGHT, "black", 0, HEIGHT*0.25,"road"));

    // Center of the road
    for (let i = 0; i < NBR_MIDDLE_BAND; i++) {
        MAP.push(new component(
            WIDHT_MIDDLE_BAND*0.5,
            HEIGHT*0.05,
            "white",
            i*WIDHT_MIDDLE_BAND,
            MIDDLE_ROAD,
            "road"
        ));   
    }

    // Finish line
    MAP.push(new component(WIDTH*0.025, HEIGHT, "white", WIDTH*0.975, HEIGHT*0.25,"road")); // Strape
    MAP.push(new component("30px", "Consolas", "black", WIDTH*0.982, HEIGHT*0.3, "text finish line")); // Text

    // Player 1
    myGamePieceP1 = new component(SIZE_CAR, SIZE_CAR, "yellow", 0, HEIGHT*-0.02,"car"); // Player 1 piece
    scoreP1 = new component("30px", "Consolas", "black", WIDTH*0.015, HEIGHT*0.15, "text"); // Score

    // Player 2
    myGamePieceP2 = new component(SIZE_CAR, SIZE_CAR, "pink", 0, HEIGHT*0.35,"car"); // Player 2 piece
    scoreP2 = new component("30px", "Consolas", "black", WIDTH*0.175, HEIGHT*0.15, "text"); // Score

    // Start the game
    myGameArea.start();
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

            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);

        } else if (this.type == "car") {
            
            ctx.fillStyle = color;
            carP1.style.fill = color;
            // carP1 = "data:image/svg+xml;charset=utf-8," + carP1.replace(/#e04236/g,color);
            ctx.drawImage(carP1,this.x,this.y,this.width,this.height);

        } else if (this.type == "road") {

            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        } else if (this.type == "text finish line") {

            ctx.save();
            ctx.font = this.width + " " + this.height;
            ctx.translate(this.x,this.y);
            ctx.rotate(-0.5*-Math.PI);

            ctx.fillStyle = color;
            ctx.fillText(FINISH_STRING.split('').join(' '), 0, 0);
            ctx.restore();
        }
    }

    // Update the position
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitEnd();
    }

    // Finish line
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

    // Update the road
    MAP.forEach(road => road.update());
    
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