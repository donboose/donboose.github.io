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
      fill(0);
      circle(this.x, this.y, this.size);
      pop();
    }
    
    update() {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
  }