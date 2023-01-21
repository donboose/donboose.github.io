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


class missile{
    constructor(x, y, angle, size, speed) {
      this.x = x;
      this.y = y;
      this.angle = angle;

      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = 7;
      this.maxForce = 0.25;

      this.m = 1;
    }

    seek(targetArr){
      this.target = random(targetArr);
      this.targetIndex = targetArr.indexOf(this.target);
      let force = p5.Vector.sub(this.target.pos, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
      // return force;
    }

    returnTargetIndex(){
      return this.targetIndex;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    draw() {
      push();
      translate(this.pos.x, this.pos.y);
      rectMode(CENTER);
      rotate(this.vel.heading() + 1.5708);
      fill(255);

      stroke(0);
      strokeWeight(2);
  
      rect(0, 0, 10, 40);
      triangle(-5, -20, 5, -20, 0, -45);
      triangle(-5, -10, -15, 0, -5, 0);
      triangle(5, -10, 15, 0, 5, 0);
      triangle(-5, 15, -10, 20, -5, 20);
      triangle(5, 15, 10, 20, 5, 20);
      
      stroke(255, 144, 0);
      fill(255, 144, 0);
      sevenSidedPoly(-5, 22, -5, 32, -3, 27, -1, 37, 1, 27, 3, 32, 5, 22);
      pop();
    }
    
    update() {
        // this.planeTarget = random(targetList);
        // this.planeTargetIndex = targetList.indexOf(this.planeTarget);
        // this.seek(this.planeTarget.pos);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        
        // this.pos.x += this.maxSpeed * cos(this.angle);
        // this.pos.y += this.maxSpeed * sin(this.angle);
      
    }

    shotPlane(){
      return dist(this.target.pos.x, this.target.pos.y, this.pos.x, this.pos.y) < 20;
    }
}
