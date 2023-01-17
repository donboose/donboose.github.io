class Bullet {
    constructor(x, y, angle, size, speed) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = speed;
      this.size = size;
    }
    
    draw() {
      push();
      rectMode(CENTER);
      // stroke(255, 255, 0);
      stroke(0);
      strokeWeight(2);
      fill(255, 255, 0);
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
    
    update() {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
  }
