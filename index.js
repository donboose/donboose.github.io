console.log("hello");

function setup(){
    createCanvas(600, 400);
    background(200);
    noStroke();
}
function draw(){
    ellipse(50, 50, 80, 80);
    if (mouseIsPressed){
        fill(100);
    } else {
        fill(255);
    }
}
