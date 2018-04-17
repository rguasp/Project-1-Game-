// 1st step
let canvas = document.getElementById('game-board');
let ctx = canvas.getContext('2d');
// runs when entire page loads
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };  

  function startGame() {
    drawShip();
    drawEnemy();
    drawScore();
  }
  
  // create main object Ship step 2!!!
  let shipImage = new Image();
  shipImage.src = "./images/ship.png";

  let ship = {
    x: 260,
    y: 580,
    shipWidth: 50,
    shipHeight: 50,
    lifes: 3,
    life: true,
    moveLeft: function(){
      clearShip();
      this.x -=10
      drawShip();
    },
    moveRight: function(){
      clearShip();
      this.x +=10
      drawShip();
    }
  }

  function drawShip() {
    ctx.drawImage(shipImage, ship.x, ship.y, ship.shipWidth, ship.shipHeight);
  }
  
  function clearShip(){
    ctx.clearRect(ship.x, ship.y, ship.shipWidth, ship.shipHeight);
  }

 // 3rd => make Ship move
 document.onkeydown = function(key){
  switch(key.keyCode){
    case 37:
      ship.moveLeft();
      break;
    case 39:
      ship.moveRight();
      break;
    default:
      console.log("not a keyCOMMAND");
  }
}
// Make ship shoot









  
  
};