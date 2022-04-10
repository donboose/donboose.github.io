class Player {
    constructor() {
      this.pos = createVector(width / 2, height / 2);
      this.angle = 0;
      this.bullets = [];
    }

    hasShot(enemy) {
        for (let i = 0; i < this.bullets.length; i++) {
          if (dist(this.bullets[i].x, this.bullets[i].y, enemy.pos.x, enemy.pos.y) < 20) {
            this.bullets.splice(i, 1);
            return true;
          }
        }
        return false;
      }
    
    
    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle - 1.5708);
        
        strokeWeight(2);
        fill(2, 48, 32);
        rect(0, 0, 45, 35);             // main body
        rect(0, 30, 10, 37.5);   // tank gun
        rect(0, 0, 20, 22);         // tank head
        fill(0);
        rect(-25, 0, 12, 50);      // left wheel
        rect(25, 0, 12, 50);      // right wheel
        //flag
        /* stroke(0);
         fill(255, 255, 255);     //main
         rect(0, 0, 20, 16);  
         noStroke();
         fill(0, 0, 255);
         rect(-5, -5, 10, 9);
         fill(255, 0, 0);
        
         rect(5, -8, 10, 2);      //red lines
         rect(5, -5, 10, 2);
         rect(5, -2, 10, 2);

         rect(0, 1, 20, 2);
         rect(0, 4, 20, 2);
         rect(0, 7, 20, 2);*/
        noStroke();
        fill(255, 255, 255);
        star(0, 0, 3*1.25, 7*1.25, 5);
        
        pop();
        for (let bullet of this.bullets) {  
            bullet.update();
            bullet.draw();
        }
    }
    update() { 
        let xSpeed = 0;
        let ySpeed = 0;
        if (keyIsDown(65)) {
          xSpeed = -2.5;
        }
        if (keyIsDown(68)) {
          xSpeed = 2.5;
        }
        if (keyIsDown(87)) {
          ySpeed = -2.5;
        }
        if (keyIsDown(83)) {
          ySpeed = 2.5;
        }
        this.pos.add(xSpeed, ySpeed);
        this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
        
      }
    shoot(){ // add this
      if (gun === "antitank"){
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle, 5, 16));
      } else if (gun === "machine"){
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle, 5, 32));
      }
        
    }
  }
