let player;
let enemies = [];
let tough = [];
let money = 0;
let score = 0;
let time = 0;
let enemySpawnTime = 300;
let panzerSpawnTime = 350;
let enemyMaxSpeed = 2;
let frame = 0;
let panzerframe = 0;
let Retry;
let switchimage, settingsimage, antitank, machine, gatling, hangar, ironingot, al, steel, titanium, composite, chobham, coin, missile;
let medikit, bandage, upgrade, tanktrack;
let settings = false;
let pause = false;
let devoption = false;
let mobile = false;
let hangarBool = false;
let upgradeBool = false;
let flag = false;
let hit = false;
let playerhealth = 200;
let armorbar = 0;
let armor = "iron";
let armorString = "No Armor";
let gun = "antitank";
let gunString = "120 mm L/44 smoothbore gun";
let trackString = "No track";
let medikitCount = 0;
let bandageCount = 0;

let x1 = 849;
let x2 = 849;
let x3 = 849;

let nohullOwned = true;
let ironhullOwned = false;
let alhullOwned = false;
let steelhullOwned = false;
let titaniumhullOwned = false;
let compositeOwned = false;
let chobhamOwned = false;

let notrack = true;
let trackl1 = false;
let trackl2 = false;
let trackl3 = false;
let trackl4 = false;

let nocoin = true;
let coinl1 = false;
let coinl2 = false;
let coinl3 = false;
let coinl4 = false;

let nocheat = true;
let cheat1 = false;
let cheat2 = false;
let cheat3 = false;
let cheat4 = false;

function preload(){
    switchimage = loadImage("reload.png"); 
    settingsimage = loadImage("settings.png");
    antitank = loadImage("antitank.png");
    machine = loadImage("machine.png");
    gatling = loadImage("gatling.png");
    hangar = loadImage("hangar.png");
    ironingot = loadImage("ironingot.webp");
    al = loadImage("aluminium.jfif");
    steel = loadImage("steelingot.webp");
    titanium = loadImage("titanium.png");
    composite = loadImage("composite.png");
    chobham = loadImage("chobam.png");
    coin = loadImage("coin.png");
    medikit = loadImage("medikit.png");
    bandage = loadImage("bandage.png");
    missile = loadImage("missile.png");
    upgrade = loadImage("upgrade.png");
    tanktrack = loadImage("tanktrack.jfif");
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
        if (nohullOwned){
          playerhealth -= 45;
        }
        if (ironhullOwned){
          playerhealth -= 40;
        }
        if (alhullOwned){
          playerhealth -= 35;
        }
        if (steelhullOwned){
          playerhealth -= 30;
        }
        if (titaniumhullOwned){
          playerhealth -= 25;
        }
      }
      if (frameCount % 10 === 0){
        if (compositeOwned){
          playerhealth -= 20;
        }
        if (chobhamOwned){
          playerhealth -= 15;
        }
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
      } else if (gun === "gatling"){
        enemies[i].enehealth -= 25;
      } else if (gun === "missile"){
        enemies[i].enehealth -= 60;
      }
        if (enemies[i].enehealth <= 0){
          if (coinl4){
            money += 100;
          } else if (coinl3){
            money += 80;
          } else if (coinl2){
            money += 70;
          } else if (coinl1){
            money += 60;
          } else if (nocoin){
            money += 50;
          }
          score++;
          enemies.splice(i, 1);        
        }
    }
  }

  
  // code 1
  for (let i = tough.length - 1; i >= 0; i--){
    tough[i].draw();
    tough[i].update();
    tough[i].shoot();

    if (tough[i].hitYou(player)){
     
        if (nohullOwned){
          playerhealth -= 25;
        }
        if (ironhullOwned){
          playerhealth -= 20;
        }
        if (alhullOwned){
          playerhealth -= 17;
        }
        if (steelhullOwned){
          playerhealth -= 14;
        }
        if (titaniumhullOwned){
          playerhealth -= 11;
        }
      
      
        if (compositeOwned){
          playerhealth -= 8;
        }
        if (chobhamOwned){
          playerhealth -= 5;
        }
      
      if (playerhealth <= 0){
        gameOver();
        break;
      }
    }
    if (player.hasShot(tough[i])) {
      if (gun === "antitank"){
        tough[i].enehealth -= 15;
      } else if (gun === "machine"){
        tough[i].enehealth -= 10;
      } else if (gun === "gatling"){
        tough[i].enehealth -= 20;
      } else if (gun === "missile"){
        tough[i].enehealth -= 60;
      }
        if (tough[i].enehealth <= 0){
          score += 2;
          if (coinl4){
            money += 200;
          } else if (coinl3){
            money += 160;
          } else if (coinl2){
            money += 140;
          } else if (coinl1){
            money += 120;
          } else if (nocoin){
            money += 100;
          }
          tough.splice(i, 1);        
        }
    }
  }
  
 // end code 1

  if (frame >= enemySpawnTime) {
    if (enemyMaxSpeed >= 3){
      enemies.push(new Enemy(random(2, enemyMaxSpeed), 60));
    } else {
      enemies.push(new Enemy(random(1.5, enemyMaxSpeed), 60));
    }
    if (enemySpawnTime <= 100){
        enemySpawnTime *= 0.99;
    } else {
        enemySpawnTime *= 0.98;
    }
    frame = 0;
  }
  
  if (panzerframe >= panzerSpawnTime){
    tough.push(new Panzer(1.5, 60));
    if (panzerSpawnTime <= 100){
      panzerSpawnTime -= 3;
    } else {
      panzerSpawnTime -= 4;
    }
    panzerframe = 0;
  }
  
  frame++;
  panzerframe += 0.5;

  if (frameCount%60 === 0){
    time++;
  }

  //settings
  image(settingsimage, 1180, 10, 50, 50);
  noStroke();
  textFont('Monospace');
  textAlign(CORNER);
  fill(0);
  textSize(25);

  text(gunString, 1180, 140);
  if (gun === "antitank"){
    image(antitank, 1240, 10, 300, 100);
  } else if (gun === "machine"){
    image(machine, 1240, 10, 300, 100);
  } else if (gun === "gatling"){
    image(gatling, 1240, 10, 300, 100);
  } else if (gun === "missile"){
    image(missile, 1240, 10, 300, 100);
  }

  text("Score: "+score, 10, 30);
  text("Time: "+time+"s", 10, 60);
  if (devoption){
    text("mouseX: "+mouseX, 10, 120);
    text("mouseY: "+mouseY, 10, 150);
    text("Frame Rate: 60", 10, 180);
    text("Frame:  "+frame, 10, 210);
    text("Pframe: "+panzerframe, 10, 240);
    text("EMS:  "+enemyMaxSpeed, 10, 270);
    text("EST:  "+enemySpawnTime, 10, 300);
    text("PST:  "+panzerSpawnTime, 10, 330);
    text("PlayerX: "+player.pos.x, 10, 360);
    text("PlayerY: "+player.pos.y, 10, 390);
  }
  
  //money
  image(coin, 1010, 20, 30, 30);
  noStroke();
  fill(0);
  textSize(25);
  text(money+"$", 1045, 44);

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

  //armor bar
  stroke(0);
  fill(255, 255, 255);
  rect(width/2-100, height-60, 200, 10);
  fill(0);
  rect(width/2-100, height-60, armorbar, 10);
  noStroke();
  textSize(15);
  fill(0);
  text("Armor", 625, 700);
  text(armorbar, 900, 700);
  text("/200", 925, 700);
  text("Armor: "+armorString, 1050, 700);
  text("Track: "+trackString, 1050, 715);

  image(hangar, 1470, 185, 70, 70);
  image(upgrade, 1470, 265, 70, 70);

  //armor
  if (ironhullOwned){
    armorbar = 40;
    armorString = "Iron hull";
  }
  if (alhullOwned){
    armorbar = 80;
    armorString = "Aluminium hull";
  }
  if (steelhullOwned){
    armorbar = 100;
    armorString = "Steel hull";
  }
  if (titaniumhullOwned){
    armorbar = 140;
    armorString = "Titanium hull";
  }
  if (compositeOwned){
    armorbar = 170;
    armorString = "Composite Armor";
  }
  if (chobhamOwned){
    armorbar = 200;
    armorString = "Chobham Armor";
  }

  //track
  if (trackl4){
    trackString = "Track Level - 4";
  } else if (trackl3){
    trackString = "Track Level - 3";
  } else if (trackl2){
    trackString = "Track Level - 2";
  } else if (trackl1){
    trackString = "Track Level - 1";
  } else if (notrack){
    trackString = "No Track";
  }

  //gun switch
  fill(255, 255, 255);
  image(switchimage, 1180, 60, 50, 50);

  if (mobile){
    stroke(0);
    strokeWeight(2);
    rect(20, height-150, 140, 140);
    rect(160, height-150, 140, 140);
    rect(300, height-150, 140, 140);
    rect(160, height-290, 140, 140);
  }

  stroke(0);
  strokeWeight(2);
  rect(539, 679, 52, 52);
  rect(469, 679, 52, 52);
  image(medikit, 540, 680, 50, 50);
  image(bandage, 470, 680, 50, 50);

  noStroke();
  fill(0);
  text(medikitCount, 595, 730);
  text(bandageCount, 525, 730);

  if (mouseIsPressed){
    player.shoot();
  }
  if (keyIsPressed){
    if (key === ' '){
      player.shoot();
    }
  }

  } else {
    if (settings){
      rectMode(CORNER);
      stroke(0);
      strokeWeight(1);
      fill(255, 255, 255);
      rect(550 , 200, 400, 400);
      fill(255, 255, 255);
      rect(850, 250, 50, 10);
      rect(850, 290, 50, 10);
      rect(850, 330, 50, 10);
      fill(0);
      rect(x1, 242.5, 25.5, 25);
      rect(x2, 282.5, 25.5, 25);
      rect(x3, 322.5, 25.5, 25);
      textSize(25);
      noStroke();
      text("Settings", 700, 230)
      text("Developer options: ", 560, 260);
      text("Mobile Controls: ", 560, 300);
      text("Star or Flag: ", 560, 340);
      rectMode(CENTER);
    
    } else if (hangarBool){
      rectMode(CORNER);
      stroke(0);
      strokeWeight(2);
      textSize(25);
      fill(255, 255, 255);
      rect(300, 120, width-600, height-240);
      rect(319, 149, 102, 102);
      rect(439, 149, 102, 102);
      rect(559, 149, 102, 102);
      rect(679, 149, 102, 102);
      rect(799, 149, 102, 102);
      rect(919, 149, 102, 102);
      rect(319, 399, 102, 102);
      rect(439, 399, 102, 102);
      image(ironingot, 320, 150, 100, 100);
      image(al, 440, 150, 100, 100);
      image(steel, 560, 150, 100, 100);
      image(titanium, 680, 150, 100, 100);
      image(composite, 800, 150, 100, 100);
      image(chobham, 920, 150, 100, 100);
      image(medikit, 320, 400, 100, 100);
      image(bandage, 440, 400, 100, 100);

      noStroke();
      fill(0);
      text("Shop", width/2 - 5, 140);
      textSize(20);
      text("Iron hull", 320, 270);
      text("Armor +40", 320, 310);
      text("Aluminium", 440, 270);
      text("  hull", 440, 290);
      text("Armor +80", 440, 310);
      text("Steel hull", 560, 270);
      text("Armor +100", 560, 310);
      text("Titanium", 680, 270);
      text("  hull", 680, 290);
      text("Armor +140", 680, 310);
      text("Composite", 800, 270);
      text("  hull", 800, 290);
      text("Armor +170", 800, 310);
      text("Chobham", 920, 270);
      text(" Armor", 920, 290);
      text("Armor +200", 920, 310);
      text("Medikit", 320, 520);
      text("HP +100", 320, 540);
      text("Bandage", 440, 520);
      text("HP +50", 440, 540);

      image(coin, 1100, 130, 30, 30);
      text(money, 1135, 152.5);

      fill(255, 0, 0);
      text("400 coins", 320, 330);
      text("1000 coins", 440, 330);
      text("1600 coins", 560, 330);
      text("2400 coins", 680, 330);
      text("3000 coins", 800, 330);
      text("3600 coins", 920, 330);
      text("500 coins", 320, 560);
      text("250 coins", 440, 560);

      fill(255, 255, 255);
      stroke(0);
      strokeWeight(3);
      rect(320, 340, 100, 40);
      rect(440, 340, 100, 40);
      rect(560, 340, 100, 40);
      rect(680, 340, 100, 40);
      rect(800, 340, 100, 40);
      rect(920, 340, 100, 40);
      rect(320, 570, 100, 40);
      rect(440, 570, 100, 40);

      fill(0);
      noStroke();
      if (!ironhullOwned){
        text("BUY", 350, 365);
      } else if (ironhullOwned){
        nohullOwned = false;
        text("SOLD", 345, 365);
      }
      if (!alhullOwned){
        text("BUY", 470, 365);
      } else if (alhullOwned){
        nohullOwned = false;
        text("SOLD", 465, 365);
      }
      if (!steelhullOwned){
        text("BUY", 590, 365);
      } else if (steelhullOwned){
        nohullOwned = false;
        text("SOLD", 585, 365);
      }
      if (!titaniumhullOwned){
        text("BUY", 710, 365);
      } else if (titaniumhullOwned){
        nohullOwned = false;
        text("SOLD", 705, 365);
      }
      if (!compositeOwned){
        text("BUY", 830, 365);
      } else if (compositeOwned){
        nohullOwned = false;
        text("SOLD", 825, 365);
      }
      if (!chobhamOwned){
        text("BUY", 950, 365);
      } else if (chobhamOwned){
        nohullOwned = false;
        text("SOLD", 945, 365);
      }
      
      text(medikitCount, 408, 495);
      text(bandageCount, 528, 495);

      text("BUY", 350, 595);
      text("BUY", 470, 595);
    } else if (upgradeBool){
      rectMode(CORNER);
      stroke(0);
      strokeWeight(2);
      textSize(25);
      fill(255, 255, 255);
      rect(300, 120, width-600, height-240);

      if (trackl4){
        stroke(0, 128, 0);
        rect(319, 149, 102, 102);
        rect(439, 149, 102, 102);
        rect(559, 149, 102, 102);
        rect(679, 149, 102, 102);
      } else if (trackl3){
        stroke(0, 128, 0);
        rect(319, 149, 102, 102);
        rect(439, 149, 102, 102);
        rect(559, 149, 102, 102);
        stroke(255, 0, 0);
        rect(679, 149, 102, 102);
      } else if (trackl2){
        stroke(0, 128, 0);
        rect(319, 149, 102, 102);
        rect(439, 149, 102, 102);
        stroke(255, 0, 0);
        rect(559, 149, 102, 102);
        rect(679, 149, 102, 102);
      } else if (trackl1){
        stroke(0, 128, 0);
        rect(319, 149, 102, 102);
        stroke(255, 0, 0);
        rect(439, 149, 102, 102);
        rect(559, 149, 102, 102);
        rect(679, 149, 102, 102);
      } else if (notrack){
        stroke(255, 0, 0);
        rect(319, 149, 102, 102);
        rect(439, 149, 102, 102);
        rect(559, 149, 102, 102);
        rect(679, 149, 102, 102);
      }
      if (coinl4){
        stroke(0, 128, 0);
        rect(319, 399, 102, 102);
        rect(439, 399, 102, 102);
        rect(559, 399, 102, 102);
        rect(679, 399, 102, 102);
      } else if (coinl3){
        stroke(0, 128, 0);
        rect(319, 399, 102, 102);
        rect(439, 399, 102, 102);
        rect(559, 399, 102, 102);
        stroke(255, 0, 0);
        rect(679, 399, 102, 102);
      } else if (coinl2){
        stroke(0, 128, 0);
        rect(319, 399, 102, 102);
        rect(439, 399, 102, 102);
        stroke(255, 0, 0);
        rect(559, 399, 102, 102);
        rect(679, 399, 102, 102);
      } else if (coinl1){
        stroke(0, 128, 0);
        rect(319, 399, 102, 102);
        stroke(255, 0, 0);
        rect(439, 399, 102, 102);
        rect(559, 399, 102, 102);
        rect(679, 399, 102, 102);
      } else if (nocoin){
        stroke(255, 0, 0);
        rect(319, 399, 102, 102);
        rect(439, 399, 102, 102);
        rect(559, 399, 102, 102);
        rect(679, 399, 102, 102);
      }

      image(tanktrack, 320, 150, 100, 100);
      image(tanktrack, 440, 150, 100, 100);
      image(tanktrack, 560, 150, 100, 100);
      image(tanktrack, 680, 150, 100, 100);

      image(coin, 320, 400, 100, 100);
      image(coin, 440, 400, 100, 100);
      image(coin, 560, 400, 100, 100);
      image(coin, 680, 400, 100, 100);

      noStroke();
      fill(0);
      text("Upgrades", width/2 - 35, 140);
      textSize(20);
      text("Track L-1", 320, 270);
      text("Speed +0.5", 320, 290);
      text("Track L-2", 440, 270);
      text("Speed +1", 440, 290);
      text("Track L-3", 560, 270);
      text("Speed +1.5", 560, 290);
      text("Track L-4", 680, 270);
      text("Speed +2", 680, 290);

      text("Coin L-1", 320, 520);
      text("Coin +60", 320, 540);
      text("Coin L-2", 440, 520);
      text("Coin +70", 440, 540);
      text("Coin L-3", 560, 520);
      text("Coin +80", 560, 540);
      text("Coin L-4", 680, 520);
      text("Coin +100", 680, 540);

      image(coin, 1100, 130, 30, 30);
      text(money, 1135, 152.5);

      fill(255, 0, 0);
      text("400 coins", 320, 330);
      text("600 coins", 440, 330);
      text("800 coins", 560, 330);
      text("1000 coins", 680, 330);

      text("600 coins", 320, 560);
      text("900 coins", 440, 560);
      text("1200 coins", 560, 560);
      text("1500 coins", 680, 560);

      fill(255, 255, 255);
      stroke(0);
      strokeWeight(3);
      rect(320, 340, 100, 40);
      rect(440, 340, 100, 40);
      rect(560, 340, 100, 40);
      rect(680, 340, 100, 40);

      rect(320, 570, 100, 40);
      rect(440, 570, 100, 40);
      rect(560, 570, 100, 40);
      rect(680, 570, 100, 40);

      fill(0);
      noStroke();
      if (!trackl1){
        text("BUY", 350, 365);
      } else if (trackl1){
        notrack = false;
        text("SOLD", 345, 365);
      }
      if (!trackl2){
        text("BUY", 470, 365);
      } else if (trackl2){
        notrack = false;
        text("SOLD", 465, 365);
      }
      if (!trackl3){
        text("BUY", 590, 365);
      } else if (trackl3){
        notrack = false;
        text("SOLD", 585, 365);
      }
      if (!trackl4){
        text("BUY", 710, 365);
      } else if (trackl4){
        notrack = false;
        text("SOLD", 705, 365);
      }

      if (!coinl1){
        text("BUY", 350, 595);
      } else if (coinl1){
        nocoin = false;
        text("SOLD", 345, 595);
      }
      if (!coinl2){
        text("BUY", 470, 595);
      } else if (coinl2){
        nocoin = false;
        text("SOLD", 465, 595);
      }
      if (!coinl3){
        text("BUY", 590, 595);
      } else if (coinl3){
        nocoin = false;
        text("SOLD", 585, 595);
      }
      if (!coinl4){
        text("BUY", 710, 595);
      } else if (coinl4){
        nocoin = false;
        text("SOLD", 705, 595);
      }
    }
  }
  
}
function mouseClicked(){
    if (mouseX > 1180 && mouseX < 1230 && mouseY > 60 && mouseY < 110){
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
    if (mouseX > 1180 && mouseX < 1230 && mouseY > 10 && mouseY < 60){
      settings = true;
      pause = true;
    } else if (settings && (mouseX > 950 || mouseX < 550 || mouseY > 600 || mouseY < 200)){
      settings = false;
      pause = false;
    } else if (mouseX > 1470 && mouseX < 1540 && mouseY > 185 && mouseY < 185+70){
      hangarBool = true;
      pause = true;
    } else if (hangarBool && (mouseX < 300 || mouseX > width-300 || mouseY < 120 || mouseY > height-120)){
      hangarBool = false;
      pause = false;
    } else if (mouseX > 1470 && mouseX < 1540 && mouseY > 265 && mouseY < 265+70){
      upgradeBool = true;
      pause = true;
    } else if (upgradeBool && (mouseX < 300 || mouseX > width-300 || mouseY < 120 || mouseY > height-120)){
      upgradeBool = false;
      pause = false;
    }
    if (settings && mouseX > 849 && mouseX < 874.5 && mouseY > 242.5 && mouseY < 267.5){
      x1 = 849+25.5;
      devoption = true;
    } else if (settings && mouseX > 849+25.5 && mouseX < 874.5+25.5 && mouseY > 242.5 && mouseY < 267.5){
      x1 = 849;
      devoption = false;
    }
    if(settings && mouseX > 849 && mouseX < 874.5 && mouseY > 282.5 && mouseY < 282.5+25){
      x2 = 849+25.5;
      mobile = true;
    } else if (settings && mouseX > 849+25.5 && mouseX < 874.5+25.5 && mouseY > 282.5 && mouseY < 282.5+25){
      x2 = 849.5;
      mobile = false;
    }
    if (settings && mouseX > 849 && mouseX < 874.5 && mouseY > 322.5 && mouseY < 322.5+25){
      x3 = 849+25.5;
      flag = true;
    } else if (settings && mouseX > 849+25.5 && mouseX < 874.5+25.5 && mouseY > 322.5 && mouseY < 322.5+25){
      x3 = 849;
      flag = false;
    }
    
    if (hangarBool){
      if (mouseX > 320 && mouseX < 420 && mouseY > 340 && mouseY < 380){
        if (money >= 400 && !ironhullOwned){
          money -= 400;
          ironhullOwned = true;
        }       
      }
      if (mouseX > 440 && mouseX < 540 && mouseY > 340 && mouseY < 380){
        if (money >= 800 && !alhullOwned){
          money -= 800;
          alhullOwned = true;
        }  
      }
      if (mouseX > 560 && mouseX < 660 && mouseY > 340 && mouseY < 380){
        if (money >= 1600 && !steelhullOwned){
          money -= 1600;
          steelhullOwned = true;
        }
      }
      if (mouseX > 680 && mouseX < 780 && mouseY > 340 && mouseY < 380){
        if (money >= 2400 && !titaniumhullOwned){
          money -= 2400;
          titaniumhullOwned = true;
        }
      }
      if (mouseX > 800 && mouseX < 900 && mouseY > 340 && mouseY < 380){
        if (money >= 3000 && !compositeOwned){
          money -= 3000;
          compositeOwned = true;
        }
      }
      if (mouseX > 920 && mouseX < 1020 && mouseY > 340 && mouseY < 380){
        if (money >= 3600 && !chobhamOwned){
          money -= 3600;
          chobhamOwned = true;
        }
      }
      if (mouseX > 320 && mouseX < 420 && mouseY > 570 && mouseY < 610){
        if (money >= 500){
          medikitCount += 1;
          money -= 500;
        }
      }
      if (mouseX > 440 && mouseX < 540 && mouseY > 570 && mouseY < 610){
        if (money >= 250){
          bandageCount += 1;
          money -= 250;
        }
      }
    }

    if (upgradeBool){
      if (mouseX > 320 && mouseX < 420 && mouseY > 340 && mouseY < 380){
        if (money >= 400 && !trackl1){
          money -= 400;
          trackl1 = true;
        }
      }
      if (mouseX > 440 && mouseX < 540 && mouseY > 340 && mouseY < 380){
        if (money >= 600 && !trackl2 && trackl1){
          money -= 600;
          trackl2 = true;
        }  
      }
      if (mouseX > 560 && mouseX < 660 && mouseY > 340 && mouseY < 380){
        if (money >= 800 && !trackl3 && trackl2){
          money -= 800;
          trackl3 = true;
        }
      }
      if (mouseX > 680 && mouseX < 780 && mouseY > 340 && mouseY < 380){
        if (money >= 1000 && !trackl4 && trackl3){
          money -= 1000;
          trackl4 = true;
        }
      }
      if (mouseX > 320 && mouseX < 420 && mouseY > 570 && mouseY < 610){
        if (money >= 600 && !coinl1){
          coinl1 = true;
          money -= 600;
        }
      }
      if (mouseX > 440 && mouseX < 540 && mouseY > 570 && mouseY < 610){
        if (money >= 900 && !coinl2 && coinl1){
          coinl2 = true;
          money -= 900;
        }
      }
      if (mouseX > 560 && mouseX < 660 && mouseY > 570 && mouseY < 610){
        if (money >= 1200 && !coinl3 && coinl2){
          coinl3 = true;
          money -= 1200;
        }
      }
      if (mouseX > 680 && mouseX < 780 && mouseY > 570 && mouseY < 610){
        if (money >= 1500 && !coinl4 && coinl3){
          coinl4 = true;
          money -= 1500;
        }
      }
    }

    if (mouseX > 540 && mouseX < 590 && mouseY > 680 && mouseY < 730){
      if (medikitCount > 0 && playerhealth < 200){
        if (playerhealth > 100){
          medikitCount -= 1;
          playerhealth = 200;
        } else if (playerhealth <= 100){
          medikitCount -= 1;
          playerhealth += 100;
        }
      }
    } else if (mouseX > 470 && mouseX < 520 && mouseY > 680 && mouseY < 730){
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
}
