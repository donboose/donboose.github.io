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
	tough = [];
    score = 0;
    enemySpawnTime = 300;
	enemyMaxSpeed = 2;
    frame = 0;
	time = 0;
	playerhealth = 200;
	armorbar = 0;
	armor = "iron";
	nohullOwned = true;
	ironhullOwned = false;
	alhullOwned = false;
	steelhullOwned = false;
	titaniumhullOwned = false;
	compositeOwned = false;
	chobhamOwned = false;

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
function keyTyped(){
	if (key === 'o' && !settings && !hangarBool && !upgradeBool){
		settings = true;
      	pause = true;
	} else if (key === "o" && settings){
		settings = false;
		pause = false;
	}
	if (key === "e" && !pause){
		if (gun === "antitank"){
			gun = "machine";
			gunString = "L94A1 chain gun";
		  } else if (gun === "machine"){
			gun = "gatling";
			gunString = "M134 gatling gun";
		  } else if (gun === "gatling"){
			gun = "missile";
			gunString = "Multistage g-missile"
		  } else if (gun === "missile"){
			gun = "antitank";
			gunString = "120 mm L/44 smoothbore gun";
		  }
	}
	if (key === "f" && !hangarBool && !upgradeBool && !settings){
		hangarBool = true;
		pause = true;
	} else if (key === "f" && hangarBool){
		hangarBool = false;
		pause = false;
	}
	if (key === "g" && !upgradeBool && !hangarBool && !settings){
		upgradeBool = true;
		pause = true;
	} else if (key === "g" && upgradeBool){
		upgradeBool = false;
		pause = false;
	}
	if (key === "q"){
		if (medikitCount > 0 && playerhealth < 200){
			if (playerhealth > 100){
			  medikitCount -= 1;
			  playerhealth = 200;
			} else if (playerhealth <= 100){
			  medikitCount -= 1;
			  playerhealth += 100;
			}
		  }
	}
	if (key === "z"){
		if (bandageCount > 0 && playerhealth < 200){
			if (playerhealth > 150){
			  bandageCount -= 1;
			  playerhealth = 200;
			} else if (playerhealth <= 150){
			  bandageCount -= 1;
			  playerhealth += 50;
			}
		  }
	}

	if (key === 'b' && nocheat){
		cheat1 = true;
		nocheat = false;
	}
	if (key === "n" && cheat1){
		cheat2 = true;
	}
	if (key === "m" && cheat2){
		cheat3 = true;
	}
	if (key === "l" && cheat1 && cheat2 && cheat3){
		money += 10000;
		cheat1 = false;
		cheat2 = false;
		cheat3 = false;
		nocheat = true;
	}
	if (key === "k" && cheat1 && cheat2 && cheat3){
		medikitCount += 5;
		bandageCount += 5;
		cheat1 = false;
		cheat2 = false;
		cheat3 = false;
		nocheat = true;
	}
}
