class Player {
    constructor() {
      this.pos = createVector(width / 2, height / 2);
      this.angle = 0;
      this.bullets = [];
    }

    hasShot(enemy) {
        for (let i = 0; i < this.bullets.length; i++) {
          if (dist(this.bullets[i].x, this.bullets[i].y, enemy.pos.x, enemy.pos.y) < 15) {
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

        fill(0, 43, 255);
        rect(0, 0, 45, 35);             // main body
        rect(0, 30, 10, 37.5);   // tank gun
        fill(0);
        rect(-25, 0, 12, 50);      // left wheel
        rect(25, 0, 12, 50);      // right wheel
        fill(0, 43, 255);
        rect(0, 0, 20, 22);    // tank head

        pop();
        for (let bullet of this.bullets) {  // add this
            bullet.update();
            bullet.draw();
        }
    }
    update() { 
        let xSpeed = 0;
        let ySpeed = 0;
        if (keyIsDown(65)) {
          xSpeed = -2;
        }
        if (keyIsDown(68)) {
          xSpeed = 2;
        }
        if (keyIsDown(87)) {
          ySpeed = -2;
        }
        if (keyIsDown(83)) {
          ySpeed = 2;
        }
        this.pos.add(xSpeed, ySpeed);
        this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
        
      }
    shoot(){ // add this
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
    }
  }
