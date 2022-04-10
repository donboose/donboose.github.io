let player;
let enemies = [];
let toughenemies = [];
let score = 0;
let time = 0;
let enemySpawnTime = 300;
let enemyMaxSpeed = 2;
let frame = 0;
let Retry;
let switchimage;
let settingsimage;
let settings = false;
let pause = false;
let devoption = false;
let playerhealth = 200;
let gun = "antitank";
let gunString = "Antitank Gun"

let x = 849;

function preload(){
    switchimage = loadImage("reload.png"); 
    settingsimage = loadImage("settings.png");
}

function setup() {
  createCanvas(1550, 750);
  frameRate(60);
  Retry = createButton('RETRY');
  Retry.hide();
  player = new Player();
  
}

function draw() {
  if (!pause){
  background(250, 250, 51);
  
  rectMode(CENTER);
  drawReticle();
  player.draw();
  player.update();

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].draw();
    enemies[i].update();
    if (enemies[i].hitYou()) {
        if (frameCount % 8 === 0){
          playerhealth-=20;
        }
        if (playerhealth <= 0){
          gameOver();
          break;
        }
      }
    if (player.hasShot(enemies[i])) {
      if (gun === "antitank"){
        enemies[i].enehealth -= 30;
      } else if (gun === "machine"){
        enemies[i].enehealth -= 20;
      }
        if (enemies[i].enehealth <= 0){
          score++;
          enemies.splice(i, 1);        
        }
    }
  }

  if (frame % 500 === 0){
    enemyMaxSpeed += 0.1;
  }
  if (frame >= enemySpawnTime) {
    if (enemyMaxSpeed >= 3){
      enemies.push(new Enemy(random(2, enemyMaxSpeed), 60));
    } else {
      enemies.push(new Enemy(random(1.5, enemyMaxSpeed), 60));
    }
    if (enemySpawnTime <= 100){
        enemySpawnTime *= 0.99;
    } else {
        enemySpawnTime *= 0.95;
    }
   
    frame = 0;
  }
  frame++;

  if (frameCount%60 === 0){
    time++;
  }

  //settings
  image(settingsimage, 1450, 50, 50, 50);

  noStroke();
  textFont('Monospace');
  textAlign(CORNER);
  textSize(25);
  fill(0);
  text("Score: "+score, 10, 30);
  text("Time: "+time+"s", 10, 60);
  text("Gun: "+gunString, 10, 90);
  if (devoption){
    text("mouseX: "+mouseX, 10, 150);
    text("mouseY: "+mouseY, 10, 180);
    text("Frame Rate: 60", 10, 210);
    text("Frame:  "+frame, 10, 240);
    text("EMS:  "+enemyMaxSpeed, 10, 270);
    text("EST:  "+enemySpawnTime, 10, 300);
  }
  

  //health bar
  stroke(0);
  rectMode(CORNER);
  fill(255, 255, 255);
  rect(width/2-100, height-40, 200, 10);
  if (playerhealth <= 66){
    fill(255, 0, 0);
  } else if (playerhealth > 132){
    fill(0, 128, 0);
  } else if (playerhealth <= 132 && playerhealth > 66){
    fill(255, 128, 0);
  }
  rect(width/2-100, height-40, playerhealth, 10);
  noStroke();
  textSize(15);
  fill(0);
  text("HP", 640, 720);
  text(playerhealth, 900, 720);
  text("/200", 925, 720);

  //gun switch
  fill(255, 255, 255);
  image(switchimage, 1450, 650, 50, 50);

} else {
  if (settings){
    rectMode(CORNER);
    stroke(0);
    strokeWeight(1);
    fill(255, 255, 255);
    rect(550 , 200, 400, 400);
    fill(255, 255, 255);
    rect(850, 250, 50, 10);
    fill(0);
    rect(x, 242.5, 25.5, 25);
    textSize(25);
    noStroke();
    text("Settings", 700, 230)
    text("Developer options: ", 560, 260);
    rectMode(CENTER);
    
  }
}
  
}
function mouseClicked(){
    player.shoot();
    if (mouseX > 1450 && mouseX < 1500 && mouseY > 650 && mouseY < 700 && gun === "antitank"){
      gun = "machine";
      gunString = "Machine Gun";
    } else if (mouseX > 1450 && mouseX < 1500 && mouseY > 650 && mouseY < 700 && gun === "machine"){
      gun = "antitank";
      gunString = "Antitank Gun"
    }
    if (mouseX > 1450 && mouseX < 1500 && mouseY > 50 && mouseY < 100){
      settings = true;
      pause = true;
    } else if (settings && (mouseX > 950 || mouseX < 550 || mouseY > 600 || mouseY < 200)){
      pause = false;
    }
    if (settings && mouseX > 849 && mouseX < 874.5 && mouseY > 242.5 && mouseY < 267.5){
      x = 849+25.5;
      devoption = true;
    } else if (settings && mouseX > 849+25.5 && mouseX < 874.5+25.5 && mouseY > 242.5 && mouseY < 267.5){
      x = 849;
      devoption = false;
    }
}

function keyTyped(){
  if (key === ' '){
    player.shoot();
  }
}
