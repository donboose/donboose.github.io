class Enemy {
    constructor(speed, enehealth) {
      this.angle = 0;
      this.enehealth = 60;

      let y_scalar = 0;
      let x_scalar = random(-300, width + 300);
      if (random(1) < 0.5) {
        // from the top
        y_scalar = random(-600, -300);            
      } else {
        // from the bottom
        y_scalar = random(height + 350, height + 600);
      }
      this.pos = createVector(x_scalar, y_scalar);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = speed;
      this.maxForce = 0.05;
    } 

    seek(target){
      let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    }

    applyForce(force) {
      this.acc.add(force);
    }
      
    draw() {
      push();

      // let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
      translate(this.pos.x, this.pos.y);
      // rotate(angle + 1.5708);
      rotate(this.vel.heading() + 1.5708);

      stroke(0);
      strokeWeight(2);
      fill(0);
      rect(0, -20, 45, 10);
      rect(0, 0, 10, 50);
      ellipse(0, -25, 10, 40);  
      quad(-5, 10, -15, 20, -15, 25, -5, 25);
      quad(5, 10, 15, 20, 15, 25, 5, 25);
  
      pop();
    }
    
    
    update() {
      this.seek(player.pos);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);

      stroke(0);
      rectMode(CORNER);
      fill(255, 255, 255);
      rect(this.pos.x, this.pos.y-20, 60, 6);
      fill(0, 128, 0);
      rect(this.pos.x, this.pos.y-20, this.enehealth, 6);
      rectMode(CENTER);
    }
    
    hitYou() {
      return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
    }
}
