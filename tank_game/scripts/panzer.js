class Panzer {
  
    constructor(speed, enehealth) {
        this.speed = speed;
        this.angle = 0;
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
      } 
      
        
    draw() {
        push();
  
        let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
        translate(this.pos.x, this.pos.y);
        rotate(angle - 1.5708);
  
        strokeWeight(2);
        fill(85, 92, 95);
        rect(0, 0, 45, 55);             // main body
        rect(0, 41, 10, 55);          // tank gun
        rect(0, -4, 30, 35);             // tank head
        fill(0);
        rect(-25, 0, 12, 70);           // left wheel
        rect(25, 0, 12, 70);            // right wheel
          
        strokeWeight(1);
        stroke(255, 255, 255);
        fill(0, 0, 0);
        rect(0, -5, 16, 4);
        rect(0, -5, 4, 16);
        noStroke();
        rect(0, -5, 5, 5);
  
        pop();
        for (let bullet of this.ammo) {  
          bullet.update();
          bullet.draw();
        }
      }
      
      
    update() {
        let difference = p5.Vector.sub(player.pos, this.pos);
        difference.limit(this.speed);
        this.pos.add(difference);
        this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
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
          if (dist(this.ammo[i].x, this.ammo[i].y, player.pos.x, player.pos.y) < 20) {
            this.ammo.splice(i, 1);
            hit = true;
            return true;
          } else if (this.ammo[i].x > 1550 || this.ammo[i].x < 0 || this.ammo[i].y > 750 || this.ammo[i].y < 0){
            this.ammo.splice(i, 1);
          }
        }
        hit = false;
        return false;
      }
    shoot(){
      if (frameCount % 20 === 0){
        this.ammo.push(new Bullet(this.pos.x, this.pos.y, this.angle, 5, 16));
      }
    }
  }