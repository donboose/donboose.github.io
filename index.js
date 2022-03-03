function setup(){
    createCanvas(800, 400);
    noStroke();
}

let x = 10;
let y = 450;
let acc = 2

function draw(){ 
    background(0, 255, 34);         // green background

    fill(0, 43, 255);
    rect(x, y, 45, 35);             // main body
    rect(x+17.5, y-30, 10, 37.5);   // tank gun
    fill(0);
    rect(x-10, y-7.5, 12, 50);      // left wheel
    rect(x+45, y-7.5, 12, 50);      // right wheel
    fill(0, 43, 255);
    rect(x+12.5, y+7.5, 20, 22);    // tank head
    
    if (keyIsPressed && keyCode === LEFT_ARROW){
        x = x - acc;
    }
    if (keyIsPressed && keyCode === RIGHT_ARROW){
        x = x + acc;
    }
    if (keyIsPressed && keyCode === UP_ARROW){
        y = y - acc;
    } else if (keyIsPressed && keyCode === DOWN_ARROW){
        y = y + acc;
    }
    if (x>980){
        x = 20;
    } else if (x<0){
        x = 980;
    }
    if (y>480){
        y = 20;
    } else if (y<20){
        y = 480;
    }
} 
