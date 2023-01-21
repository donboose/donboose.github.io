class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.maxSpeed = 5;
        this.maxForce = 0.1;
        this.bullets = [];
    }

    seek(target){
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        this.applyForce(steering);
    }

    applyForce(force) {
        this.acc.add(force);
    }
    
    hasShot(drone) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (dist(drone.pos.x, drone.pos.y, this.bullets[i].x, this.bullets[i].y) < 20) {
                this.bullets.splice(i, 1);
                return true;
            } else if (this.bullets[i].x > 1550 || this.bullets[i].x < 0 || this.bullets[i].y > 750 || this.bullets[i].y < 0){
                this.bullets.splice(i, 1);
            }
        }
        return false;
    }

    

    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        // rotate(this.angle + 1.571);
        rotate(this.vel.heading() + 1.5708)        

        stroke(0);
        strokeWeight(2);
        rectMode(CENTER);

        //fuselage
        fill(200);
        rect(0, 0, 25, 70);
        triangle(-9.5, -35, 9.5, -35, 0, -70);
        rect(0, 39, 11, 7.5);
        
        // ailerons
        // line(-12.5, -23, -16.5, -10);
        // line(-16.5, -10, -45.5 ,5);
        // line(-45.5, 5, -45.5, 25);
        // line(-45.5, 25, -12.5, 33);
        fiveSidedPoly(-12.5, -23, -16.5, -10, -45.5, 5, -45.5, 25, -12.5, 33);

        // line(12.5, -23, 16.5, -10);
        // line(16.5, -10, 45.5 ,5);
        // line(45.5, 5, 45.5, 25);
        // line(45.5, 25, 12.5, 33);
        fiveSidedPoly(12.5, -23, 16.5, -10, 45.5, 5, 45.5, 25, 12.5, 33);

        //flaps
        // line(-12.5, 35, -29.5, 43);
        // line(-29.5, 43, -29.5, 53);
        // line(-29.5, 53, -14.5, 56);
        // line(-14.5, 56, -5.5, 35);
        fiveSidedPoly(-12.5, 35, -29.5, 43, -29.5, 53, -14.5, 56, -5.5, 35);

        // line(12.5, 35, 29.5, 43);
        // line(29.5, 43, 29.5, 53);
        // line(29.5, 53, 14.5, 56);
        // line(14.5, 56, 5.5, 35);
        fiveSidedPoly(12.5, 35, 29.5, 43, 29.5, 53, 14.5, 56, 5.5, 35);
        
        fill(0);
        ellipse(0, -33, 10, 30);
        rect(0, -26.5, 10, 17);
        
        //logo
        noStroke();
        fill(255);
        rect(-36.5, 15, 12, 2);
        circle(-36.5, 15, 6);
        rect(36.5, 15, 12, 2);
        circle(36.5, 15, 6);

        pop();

        for (let bullet of this.bullets) {  
            bullet.update();
            bullet.draw();
        }
    }

    update() { 
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        }

    shoot(){
        if (gunName === "machine"){
            if (frameCount % 7 === 0){
                this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.vel.heading(), 5, 80))
            }
        }
    }
}
