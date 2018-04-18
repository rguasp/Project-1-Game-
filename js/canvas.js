// // create main object 
// let shipImage = new Image();
// shipImage.src = "./images/ship.png";

// // runs when entire page loads
// window.onload = function() {
//   document.getElementById("start-button").onclick = function() {
//     startGame();
//   };  
  
//   function startGame() {
//     createGameBoard();
//     drawShip();
//     drawEnemy();
//   }
  
//   // create canvas
//   function createGameBoard(){
//     this.canvas = document.getElementById('game-board');
//     this.ctx = canvas.getContext('2d');
//     this.ctx.fillStyle="white";
//     this.ctx.font = "20px Helvetica";
//     this.ctx.fillText("Score: " + board.score, 20, 30);
//   }
//   // score variable frames too
//   let board = {
//     score: 0,
//     // frames: 0
//   }
//   // Ship object 
//   let ship = {
//     x: 260,
//     y: 580,
//     shipWidth: 50,
//     shipHeight: 50,
//     moveLeft: function(){
//       clearShip();
//       this.x -=10
//       drawShip();
//     },
//     moveRight: function(){
//       clearShip();
//       this.x +=10
//       drawShip();
//     }
//   }

//   function drawShip() {
//     ctx.drawImage(shipImage, ship.x, ship.y, ship.shipWidth, ship.shipHeight);
//   }

//   function clearShip(){
//     ctx.clearRect(ship.x, ship.y, ship.shipWidth, ship.shipHeight);
//   }

//  // Movement
//  document.onkeydown = function(key){
//   switch(key.keyCode){
//     case 37:
//       ship.moveLeft();
//       break;
//     case 39:
//       ship.moveRight();
//       break;
//     default:
//       console.log("not a keyCOMMAND");
//   }
// }
// // Make ship shoot

 
// };
// Holds all my images among other things
let imageRepository = new function() {

	// Define images
	this.background = new Image();
	this.ship = new Image();
	this.laser = new Image();

	// Ensures all images have loaded before starting the game
	let numImages = 3;
	let numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}

	// runs the imageLoaded function for all 3 images
	this.background.onload = function() {
		imageLoaded();
	}
	this.ship.onload = function() {
		imageLoaded();
	}
	this.laser.onload = function() {
		imageLoaded();
	}

	// Set images source
	this.background.src = "./images/bleh.png";
	this.ship.src = "./images/ship.png";
	this.laser.src = "./images/blast-harrier-laser-1.png";
}

// Creates the Drawable object
// base class for drawable objects in game
// sets up default variables that all child object will inherit
// as well as default functions
function Drawable() {
	this.init = function(x, y, width, height) {

		// Default variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	// Define abstract function to be implemented in child objects
	// Does not need to be defined since its empty
	// object is abstract shouldnt create more objects from it
	this.draw = function() {
	};	
}

// Creates Background object which will become child of 
// Drawable object. background is drawn on the "game-board"
// canvas and creates illusion of moving by panning image.
function Background() {
	this.speed = .5; // Redefine speed of the background for panning

	// Implement abstract function
	this.draw = function() {

		// Pan background
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);

		// Draw another image at the top edge of the first image
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}

// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

// Creates game object which will hold all objects and data for game
function Game() {

	// gets canvas info and context and sets up all game objects
	// returns true is canvas is supported false if it isn't
	// this is to stop the animation script from running
	// constantly on older browsers
	this.init = function() {

		// Get the canvas element
		this.bgCanvas = document.getElementById('game-board');

		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');

			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			return true;
		} else {
			return false;
		}
	};

	// Start the animation loop
	this.start = function() {
		animate();
	};
}

// animation loop. this function must be a global function
// and cannot be within an object
// calls the requestAnimationFrame
function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}

// requestAnim shim layer by Paul Irish
// Finds the first API that works to optimize the animation loop,
// otherwise defaults to setTimeout().
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	// window.oRequestAnimationFrame      ||
	// window.msRequestAnimationFrame     ||
	function(/* function */ callback, /* DOMElement */ element){
		window.setTimeout(callback, 1000 / 60);
	};
})();

// Initialize the Game and start it.
let game = new Game();

function init() {
  if(game.init())
    game.start(); 
}



