class mig21{
    constructor(speed, enehealth) {
        // this.speed = speed;
        // this.angle = 0;

        this.enehealth = enehealth;
        this.ammo = [];
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
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 5;
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

    arrive(target){
        let force = p5.Vector.sub(target, this.pos);
        let desiredSpeed = this.maxSpeed;
        let slowRadius = 300;
        let distance = force.mag();

        if (distance < slowRadius) {
            // desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            // this.flee(target);
            force.mult(-1);
        }
        force.setMag(desiredSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);

    }

    flee(target){
        let force = p5.Vector.sub(target, this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        force.mult(-1);
        this.applyForce(force);
    }
    
    draw() {
        push();
  
        // let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + 1.5708)
        // rotate(angle + 1.5708);
  
        stroke(0);
        strokeWeight(2);
        fill(75, 83, 32);
  
        triangle(-8, -30, 8, -30, 0, -65);
        rect(0, 0, 16, 80);
        triangle(-8, -25, -35, 15, -8, 15);
        
        triangle(8, -25, 35, 15, 8, 15);
        
        quad(-8, 25, -20, 35, -22, 45, -8, 40);
        quad(8, 25, 20, 35, 22, 45, 8, 40);
        
        rect(0, 43, 12, 6);
        
        fill(0);
        ellipse(0, -33, 8, 20);
        rect(0, -26, 8, 6)
        
        fill(255, 0, 0);
        stroke(255, 0, 0);
        star(-18, 5, 5, 2.5, 5);
        star(18, 5, 5, 2.5, 5);
  
        pop();
        for (let bullet of this.ammo) {  
          bullet.update();
          bullet.draw();
        }
      }
      
      
    update(player) {
        // let difference = p5.Vector.sub(player.pos, this.pos);
        // difference.limit(this.speed);
        // this.pos.add(difference);
        // this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
        this.arrive(player.pos);
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
    
    hitYou(player) {
        //return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
        for (let i = 0; i < this.ammo.length; i++) {
          if (dist(player.pos.x, player.pos.y, this.ammo[i].x, this.ammo[i].y) < 20) {
            this.ammo.splice(i, 1);
            // hit = true;
            return true;
          } else if (this.ammo[i].x > 1550 || this.ammo[i].x < 0 || this.ammo[i].y > 750 || this.ammo[i].y < 0){
            this.ammo.splice(i, 1);
          }
        }
        return false;
     }
    
    shoot(){
      if (frameCount % 10 === 0){
        this.ammo.push(new Bullet(this.pos.x, this.pos.y, this.vel.heading(), 5, 70));
      }
    }
  }
