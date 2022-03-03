function setup(){
    createCanvas(800, 400);
    noStroke();
}

let x = 10;
let acc = 2

function draw(){ 
    background(200);

    fill(151, 244, 247);
    rect(x, 200, 100, 20);
    rect(x+15, 178, 70, 40);
    fill(255);
    ellipse(x+25, 221, 24, 24);
    ellipse(x+75, 221, 24, 24);
    
    if (keyIsPressed && keyCode === LEFT_ARROW){
        x = x - acc;
    }
    if (keyIsPressed && keyCode === RIGHT_ARROW){
        x = x + acc;
    }
    
} 
