// Make enemies array
let enemyImage = new Image();
enemyImage.src = "./images/enemyShip.png";

let enemy = {
  x: 5,
  y: 40,
  enemyWidth: 100,
  enemyHeight: 100,
};

function drawEnemy() {
  for(i=0; i < 4; i++){
     ctx.drawImage(enemyImage, enemy.x + i*120+80, enemy.y, enemy.enemyWidth, enemy.enemyHeight);
  }
  for(i=0; i < 4; i++){
    ctx.drawImage(enemyImage, enemy.x + i*120+80, enemy.y+120, enemy.enemyWidth, enemy.enemyHeight);
 }
 for(i=0; i < 4; i++){
    ctx.drawImage(enemyImage, enemy.x + i*120+80, enemy.y+240, enemy.enemyWidth, enemy.enemyHeight);
  }
}
