let player;
let enemies = [];
let score = 0;
let enemySpawnTime = 50;
let frame = 0;
let Retry;
function setup() {
  createCanvas(1250, 500);
  Retry = createButton('RETRY');
  Retry.hide();
  player = new Player();
}

function draw() {
  background(0, 255, 34);
  rectMode(CENTER);
  drawReticle();
  player.draw();
  player.update();
  
  for (let enemy of enemies){
      enemy.draw();
      enemy.update();
  }
  if (frameCount % 200 == 0) {   // add this
    enemies.push(new Enemy(1.5));
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].draw();
    enemies[i].update();
    if (enemies[i].hitYou()) { // add this
        gameOver();
        break;
      }
    if (player.hasShot(enemies[i])) {
        score++;
      enemies.splice(i, 1);
    }
  }
if (frame >= enemySpawnTime) {
    enemies.push(new Enemy(2));
    enemySpawnTime *= 0.95;
    frame = 0;
  }
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 100);
  
}
function mouseClicked(){
    player.shoot();
}

  function drawReticle(){
    fill(0, 43, 255);
	ellipse(mouseX, mouseY, 20);
	line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
	line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
	line(player.pos.x, player.pos.y, mouseX, mouseY);
}
