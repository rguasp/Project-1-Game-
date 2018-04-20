// Assigning image to letiable
let enemiesImg = new Image();
enemiesImg.src = "./images/enemyShip.png";

let enemyBombs = new Image();
enemyBombs.src = "./images/bomb.png";

let deathAnimation = new Image();
deathAnimation.src = "./images/boom.png";



// Row of enemy enemys
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

// Enemy bomb dropping function
function EnemyDrop() {	
    
    this.randomEnemy = function() {
      let randomBomb =	Math.floor(Math.random() * enemyArr1.length);
      //loop where randomBomb is the enemyArray1[randomBomb]
      for (let i = 1; i < enemyArr1.length; i++) {
        this.enemyX = enemyArr1[randomBomb].x;
        this.enemyY = enemyArr1[randomBomb].y;
      }
    }
    this.random = this.randomEnemy();
    this.x = this.enemyX;
    this.y = this.enemyY + 50;
    
    this.sprite = enemyBombs;
    this.width = 10;
    this.height = 20;
    this.alive = true;
    this.update = function() {
      this.y += 2;
    }
    this.draw = function() {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    }
    // collision detection
    this.didHit = (otherobj) => {
      let myleft = this.x;
      let myright = this.x + (this.width);
      let mytop = this.y;
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
        this.alive = false;
      }
      return hit;
    }
  }






