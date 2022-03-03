console.log("hello");

function setup(){
  createCanvas(600, 400);
  background(200);
}
function draw(){
  ellipse(50, 50, 80, 80);
  fill(0);
  if (mouseIsPressed){
    fill(255);
  } else {
    fill(0);
  }
]
