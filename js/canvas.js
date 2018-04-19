// Canvas
let canvas = document.getElementById("game-board");
let ctx = canvas.getContext("2d");

// Frames Start number
let frameNum = 0;

// Background
let background = new Image();
background.src = "./images/bleh.png";

// Draw Background
function drawBackground() {
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};


// Player
let img = new Image();
img.src = "./images/ship.png";

// Draw Player
function drawPlayer()	{
	ctx.drawImage(img, player.x, player.y, player.width, player.height)
}

// Player Laser
let playerLaser = new Image();
playerLaser.src = "./images/blast-harrier-laser-1.png"

// Arrays for enemies, laser, enemy bombs
let enemyArr1 = [];
let firedArr = [];
let enemyFiredArr = [];

// Player object
let player = {
	x: 270,
	y: 530,
	speedX: 0,
	speedY: 0,
	width: 60,
	height: 70,
	lifes: 4,
	life: true,
	moveLeft:  function() { this.x -= this.speedX },
	moveRight: function() { this.x += this.speedX },
	left: function() { return this.x },
  right: function() { return (this.x + this.width) },
  top: function() { return this.y },
  bottom: function() { return (this.y + this.height) },

}

// Player Shoot
function PlayerShoot()	{
	this.x = player.x;
	this.y = player.y;
	this.width = 9;
	this.height = 25;
	this.sprite = playerLaser;
	this.live = true;
	// Draws laser as sprite
	this.draw = function()	{
		ctx.drawImage(this.sprite, this.x + (player.width/2 - this.width/2), this.y, this.width, this.height)
	}
	this.update = function()	{
		this.y -= 4;
	}
	// Code to handle collision
	this.didHit = (otherobj) => {
		let myleft = this.x;
		let myright = this.x + (this.width);
		let mytop = this.y
		let mybottom = this.y + (this.height);
		let otherleft = otherobj.x;
		let otherright = otherobj.x + (otherobj.width);
		let otherbottom = otherobj.y + (otherobj.height);
		let othertop = otherobj.y;
		let hit = true;
		if (
			(mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)
		) {
			hit = false;
		} else {
			otherobj.living = false;
			this.live = false;
			// score += 5;
		}
		return hit;
	}
}
// Draw and push laser for player into fired array
function pushLaser() {
	if (firedArr.length < 4) {
	firedArr.push(new PlayerShoot());
	}
}

function laserUpdate() {
	firedArr.forEach(function(elm) {
		if (elm.y < 0) {
			elm.live = false;
		}
		elm.update();
		elm.draw();
		enemyArr1.forEach((elem) => {
			elm.didHit(elem);
			if (elm.didHit(elem)) {
				boom(elem.x, elem.y)
				//thesoundfile.play();
			}
		})
	})
	let result1 = enemyArr1.filter((elem) => {
		return elem.living !== false;
	});
	enemyArr1 = result1;
	let result2 = firedArr.filter((elem) => {
		return elem.live !== false;
	});
	firedArr = result2;
}

// Player Controls
document.onkeydown = function(e)	{
	switch (e.keyCode)	{
		// Left Arrow
		case 37:
		player.speedX = 10;
		player.moveLeft();
		if(player.x < 0) {
			player.x = 0;
		}
		break;
		// Right Arrow
		case 39: 
		player.speedX = 10;
		player.moveRight();
		if (player.x > 540) {
			player.x = 540;
		}
		break;
		// Space Bar attack
		case 32:
		pushLaser();
		// lasersound.play();
		break;
	}
}
// Keep drawing enemies
function pushEnemy()	{
	if (frameIntveral(1000)) {
		enemyArr1.push(new FirstRowEnemy());
	}
}

function enemiesUpdate()	{
	pushEnemy();
	enemyArr1.forEach(function(elm)	{
		elm.update();
		elm.draw();
	});
}



// place holder for onloads
function onloadPlaceholder() {
	ctx.drawImage(background, 0, 0, 600, 650);
	ctx.drawImage(img, 240, 525, 100, 110);
	ctx.drawImage(playerLaser, 280, 450, 20, 70);
	ctx.drawImage(enemiesImg, 300, 10, 80, 90);
	ctx.drawImage(enemiesImg, 100, 220, 80, 90);
};

// Onload
window.onload = function() {
	onloadPlaceholder();
	document.getElementById("start-button").onclick = function() {
	startGame();
};  
}

// Start Game
function startGame() {
	this.intervalId = setInterval(updateCanvas, 20);
}

// Update game
function updateCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	drawPlayer();
	laserUpdate();
	enemiesUpdate();
	frameNum += 20;
}

function frameIntveral(i) {
	if ((frameNum / i) % 1 === 0) {
		return true;
	} else { return false; }
}

	