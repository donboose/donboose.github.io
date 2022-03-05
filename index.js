function gameOver(){
	push()
	
	textFont('Helvetica');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",width/2,height/2 -100)
		
	textFont('Helvetica');
	textSize(30);
	fill(235);
	let scoreString = "score: " + score;
	text(scoreString, width/2, height/2);
	
	Retry.show();
	Retry.position(width/2, height/2);
	Retry.size(100,30);
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

    loop();
  }
