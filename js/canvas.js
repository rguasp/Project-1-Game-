// Canvas
let canvas = document.getElementById("game-board");
let ctx = canvas.getContext("2d");

//Sounds
let backgroundSound = new Audio("./Sounds/Forward-Assault.mp3");
let enemyDestroyedSound = new Audio("./Sounds/Explosion5.mp3");
let theLaserSound = new Audio("./Sounds/Laser-Shot-2.mp3");

// Frames Start number
let frameNum = 0;

// Score counter
let score = 0;

// game end conition
let gameEnd = false;

// Draw Score
function drawScore() {
    ctx.font = "22px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 20, 635);
}

// Draw life counter
function lifeCounter() {
	ctx.font = "22px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Lives: ", 380, 635);
	if (player.lifes === 3) {
		ctx.drawImage(playerShipImg, 520, 610, 30, 30);
		ctx.drawImage(playerShipImg, 485, 610, 30, 30);
		ctx.drawImage(playerShipImg, 450, 610, 30, 30);
	} else if (player.lifes === 2) {
			ctx.drawImage(playerShipImg, 485, 610, 30, 30);
			ctx.drawImage(playerShipImg, 450, 610, 30, 30);
	} else if (player.lifes === 1) {
			ctx.drawImage(playerShipImg, 450, 610, 30, 30);
	} else if (player.lifes === -1) {
			clearInterval(intervalId);
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
			ctx.fillRect(0, 0, 600, 600);
			ctx.font = "50px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Try Again!", 200, 300);
			ctx.font = "20px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Click to Reset!", 245, 350);
			gameEnd = true;
	}
}

// Player
let playerShipImg = new Image();
playerShipImg.src = "./images/ship.png";

// Draw Player
function drawPlayer()	{
	ctx.drawImage(playerShipImg, player.x, player.y, player.width, player.height)
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

	// Code that handles collision
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
			score += 10;
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
				enemyDestroyedSound.play();
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
		theLaserSound.play();
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

// Draw enemy bombs
function pushEnemyFire() {
	if (frameIntveral(500)) {
		enemyFiredArr.push(new EnemyDrop());
	}
}

function updateEnemyFire() {
	if (frameNum <= 500) {
		enemyFiredArr = [];
	}
	enemyFiredArr.forEach(function(elm) {
		elm.randomEnemy();
		elm.update();
		elm.draw();
		if(elm.didHit(player)){
			player.lifes -= 1;
		}
	});
	let result = enemyFiredArr.filter((elem) => {
		return elem.alive === true
	})
	enemyFiredArr = result;
}




// place holder for onloads
function onloadPlaceholder() {
	ctx.drawImage(playerShipImg, 240, 525, 100, 110);
	ctx.drawImage(playerLaser, 280, 450, 20, 70);
	ctx.drawImage(enemiesImg, 310, 10, 80, 90);
	ctx.drawImage(enemiesImg, 120, 220, 80, 90);
	ctx.drawImage(enemyBombs, 340, 150, 15, 50);
	ctx.drawImage(enemyBombs, 150, 370, 15, 50);

};

// Onload
window.onload = function() {
	onloadPlaceholder();
	document.getElementById("start-button").onclick = function() {
	beginGame();
};  
}

// Start Game
function beginGame() {
	this.intervalId = setInterval(updateCanvas, 20);
	document.getElementById("start-button").disabled = true;
	document.getElementById("howtoplaybtn").disabled = true;
	document.getElementById("gameinfobtn").disabled = true;
	backgroundSound.play();
}

// Update game
function updateCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
	laserUpdate();
	enemiesUpdate();
	updateEnemyFire();
	pushEnemyFire();
	drawScore();
	lifeCounter();
	frameNum += 20;
}

// frame intveral variable for rate of enemy bombs/laser
function frameIntveral(i) {
	if ((frameNum / i) % 1 === 0) {
		return true;
	} else { return false; }
}

//Reset
function reset()	{
	window.location.reload();
	document.getElementById("start-button").disabled = false;
	document.getElementById("howtoplay").disabled = false;
	document.getElementById("gameinfo").disabled = false;
	gameEnd = false;

}


// Click to Reset
window.addEventListener('click', (e) =>	{
	if(gameEnd === true)	{
		reset();
	}
})
	