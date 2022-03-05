class Enemy {
  
    constructor(speed) {
      this.speed = speed;
      this.angle = 0;
      let y;
      if (random(1) < 0.5) {
        // from the top
        y = random(-300, 0);            
      } else {
        // from the bottom
        y = random(height, height + 300);
      }
      
      let x = random(-300, width + 300);
      this.pos = createVector(x, y);
    } 
    
      
    draw() {
      push();
      fill(100, 255, 100);
      let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
      translate(this.pos.x, this.pos.y);
      rotate(angle - 1.5708);
      fill(0, 43, 255);
      rect(0, 0, 45, 35);             // main body
      rect(0, 30, 10, 37.5);   // tank gun
      fill(0);
      rect(-25, 0, 12, 50);      // left wheel
      rect(25, 0, 12, 50);      // right wheel
      fill(0, 43, 255);
      rect(0, 0, 20, 22);    // tank head
      pop();
    }
    
    
    update() {
      let difference = p5.Vector.sub(player.pos, this.pos);
      difference.limit(this.speed);
      this.pos.add(difference);
      this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    }
    hitYou() {
        return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
    }
  }
