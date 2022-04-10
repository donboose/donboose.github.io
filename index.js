function gameOver(){
	push()
	
    fill(0);
    rect(width/2 , height/2-25, 400, 400);
	textFont('Helvetica');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",width/2,height/2 -100)
		
	textFont('Helvetica');
	textSize(30);
	fill(235);
	let scoreString = "Score: " + score;
	text(scoreString, width/2, height/2 - 50);
	text("Time survived: "+time+"s", width/2, height/2-20)
	
	Retry.show();
	Retry.position(width/2 - 52, height/2);
	Retry.size(120,40);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(restart);
	
	pop();
	noLoop();
	
}
function restart() {
    Retry.hide();
    player = new Player();
    enemies = [];
    score = 0;
    enemySpawnTime = 300;
	enemyMaxSpeed = 2;
    frame = 0;
	time = 0;
	playerhealth = 200;

    loop();
  }
function star(x, y, radius1, radius2, npoints) {
	let angle = TWO_PI / npoints;
	let halfAngle = angle / 2.0;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
	  let sx = x + cos(a) * radius2;
	  let sy = y + sin(a) * radius2;
	  vertex(sx, sy);
	  sx = x + cos(a + halfAngle) * radius1;
	  sy = y + sin(a + halfAngle) * radius1;
	  vertex(sx, sy);
	}
	endShape(CLOSE);
  }

function drawReticle(){
    noFill();
    strokeWeight(1);
    stroke(0);
	  ellipse(mouseX, mouseY, 20);
   	line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
	  line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
	  line(player.pos.x, player.pos.y, mouseX, mouseY);
    fill(0);
}
