function fiveSidedPoly(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5){
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
    vertex(x5, y5);
    endShape(CLOSE);
}

function gameOver(){
	push()
	
    fill(0, 200);
	rectMode(CENTER);
    rect(width/2 , height/2-25, 1000, 750);
	rectMode(CORNER);
	textFont('Helvetica');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",width/2,height/2 -100)
		
	textFont('Helvetica');
	textSize(30);
	fill(235);
	let scoreString = "Score: " + score;
	let deathMeassage, funString;
	text(scoreString, width/2, height/2 - 50);
	text("Time survived: "+timePlayed+"s", width/2, height/2-20)
	if (deathString === "mig"){
		deathMeassage = "Shot by a MiG 21 Jet";
		funString = "Get better at dog fights";
	} else if (deathString === "drone"){
		deathMeassage = "Blown up by a drone";
		funString = "Get better at evading";
	} else if (deathString = "fuel"){
		deathMeassage = "You ran out ot fuel";
		funString = "LOL";
	}
	text(deathMeassage, width/2, height/2+10);
	text(funString, width/2, height/2+40);

	
	Retry.show();
	Retry.position(width/2 - 52, height/2 + 60);
	Retry.size(120,40);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(restart);
	
	pop();
	noLoop();
	
}

function restart() {
    Retry.hide();
    player = new Player(width/2, height/2);
    droneArray = [];
	mig21Array = [];
	missileArray = [];
    score = 0;

    droneSpawnTime = 300;
	droneMaxSpeed = 2;
    frame = 0;

	migSpawnTime = 300;
	migFrame = 0;

	gunName = "machine";
	upgradeIcon = false;
	gamePause = false;

	targetString = "";
	deathString = "";

	timePlayed = 0;
	playerHealth = 200;
	medikitCount = 0;
	bandageCount = 0;
	fuelCanisterCount = 0;
	missileCount = 6;
	fuelCapacity = 200;
	
    loop();
}

function drawReticle(objectX, objectY){
    noFill();
    strokeWeight(1);
    stroke(0);
	ellipse(objectX, objectY, 20);
   	line(objectX-14, objectY-14, objectX+14, objectY+14);
	line(objectX+14, objectY-14, objectX-14, objectY+14);
    fill(0);
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

function sevenSidedPoly(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7){
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
    vertex(x5, y5);
    vertex(x6, y6);
    vertex(x7, y7);
    endShape(CLOSE);
}
