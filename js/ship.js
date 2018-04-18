// Pool object holds laser objects 
// to be managed to prevent garbage collection
function Pool(maxSize) {
	let size = maxSize; // Max laser allowed in the pool
	let pool = [];
	// ammo^^
	// Populates the pool array with laser objects
	this.init = function() {
		for (let i = 0; i < size; i++) {

			// Initalize the laser object
			let laser = new Laser();
			laser.init(0,0, imageRepository.laser.width,
			            imageRepository.laser.height);
			pool[i] = laser;
		}
	};
	
	//  Grabs the last item in the list and initializes it and
	//  pushes it to the front of the array.
	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};
	
	// Used for the ship to be able to get two lasers at once. If
	// only the get() function is used twice, the ship is able to
	// fire and only have 1 laser spawn instead of 2.
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
		if(!pool[size - 1].alive &&
		   !pool[size - 2].alive) {
				this.get(x1, y1, speed1);
				this.get(x2, y2, speed2);
			 }
	};
	
	// Draws lasers that are in use. If a laser goes off the screen,
	// clears it and pushes it to the front of the array.
	this.animate = function() {
		for (let i = 0; i < size; i++) {

			// Only draw until we find a laser that is not alive
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}

// Creates the Laser object which the ship fires.
// Laser is drawn on main canvas
function Laser() {
  this.alive = false; // is true if Laser is in use

  // Sets the Laser values
  this.spawn = function(x, y, speed)  {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  // uses dirty rectangle(clears immediate area around laser)
  // to erase laser and moves it
  //returns true if the bullet moved off the screen, indicating 
  //that the bullet si ready to be cleared by the pool
  //otherwise draws the bullet.
  this.draw = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.y -= this.speed;
		if (this.y <= 0 - this.height) {
			return true;
		}
		else {
			this.context.drawImage(imageRepository.laser, this.x, this.y);
		}
	};
	
  //Resets the bullet values
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
Laser.prototype = new Drawable();