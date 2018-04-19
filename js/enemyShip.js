// Assigning image to variable
let enemiesImg = new Image();
enemiesImg.src = "./images/enemyShip.png";

let deathAnimation = new Image();
deathAnimation.src = "./images/boom.png";


// let enemyFiredArr = [];

// Row of enemy ships
function FirstRowEnemy()  {
  this.x = 630;
  this.y = 10;
  this.sprite = enemiesImg;
  this.width = 50;
  this.height = 50;
  this.left   = function() { return this.x                 };
  this.right  = function() { return (this.x + this.width)  };
  this.top    = function() { return this.y                 };
  this.bottom = function() { return (this.y + this.height) };
	this.living = true;
	this.update = function(){
		this.x -= 2;
		if (this.x < -10) {
			this.y += 60;
			this.x = 630;
		}
	}
  this.draw = function()  {
    ctx.drawImage(enemiesImg, this.x ,this.y , this.width, this.height);
  }
}
  
function boom(x, y) {
    ctx.drawImage(deathAnimation, x, y, 50, 50);
  }






