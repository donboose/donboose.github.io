let player;
let money = 0;
let score = 0;
let timePlayed = 0;

let droneSpawnTime = 300;
let droneMaxSpeed = 2;
let frame = 100;
let migSpawnTime = 300;
let migFrame = 0;

let enemies = [];
let migs = [];
let missiles = [];

let Retry;
let target;

let playerHealth = 200;
let fuelCapacity = 200;

let medikitCount = 0;
let bandageCount = 0;
let fuelCanisterCount = 0;

let gun = 1;
let upgradeIcon = false;
let gamePause = false;

let coin_image, shop_image, upgrade_image;
let canister_image, bandage_img, medickit_img;

let deathString = "";

function preload(){
    coin_image = loadImage("fp_plane\\images\\coin.png");
    shop_image = loadImage("fp_plane\\images\\shop2.png");
    upgrade_image = loadImage("fp_plane\\images\\upgrade.png");
    canister_image = loadImage("fp_plane\\images\\canister.jpg");
    bandage_img = loadImage("fp_plane\\images\\bandage.png");
    medickit_img = loadImage("fp_plane\\images\\medikit.png");
}

function setup(){
    createCanvas(1550, 750);
    frameRate(60);
    Retry = createButton('RETRY');
    Retry.hide();
    player = new Player(width/2, height/2);
}

function draw(){
    if (!gamePause){
    background(135, 206, 235);
    rectMode(CENTER);
    player.draw();
    player.update();
    textFont('Monospace');

    target = createVector(mouseX, mouseY);
    drawReticle(target.x, target.y);
    player.seek(target);

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].draw();
        enemies[i].update();  
        if (enemies[i].hitYou()) {
            playerHealth -= 40;
            enemies.splice(i, 1);
            if (playerHealth <= 0){
                deathString = "drone";
                gameOver();
                break;
            }  
        }            
        else if (player.hasShot(enemies[i])) {
            enemies[i].enehealth -= 30;
            if (enemies[i].enehealth <= 0) {
                score++;
                money += 100;
                enemies.splice(i, 1);
            }
        }
              
    }

    for (let i = migs.length - 1; i >= 0; i--) {
        migs[i].draw();
        migs[i].update(player);

        if (dist(migs[i].pos.x, migs[i].pos.y, player.pos.x, player.pos.y) < 500){
            migs[i].shoot();
        }

        if (migs[i].hitYou(player)) {
            playerHealth -= 20;
            if (playerHealth <= 0){
                deathString = "mig";
                gameOver();
                break;
            }  
        }            
        if (player.hasShot(migs[i])) {
            migs[i].enehealth -= 20;
            if (migs[i].enehealth <= 0) {
                score++;
                money += 500;
                migs.splice(i, 1);
            }
        }
              
    }

    if (frame >= droneSpawnTime) {
        enemies.push(new Enemy(droneMaxSpeed, 60));
        if (droneSpawnTime <= 100){
            droneSpawnTime *= 0.99;
        } else {
            droneSpawnTime *= 0.98;
        }
        frame = 0;
    }
    frame += 0.5;

    if (migFrame >= migSpawnTime){
        migs.push(new mig21(3, 60));
        if (migSpawnTime <= 100){
          migSpawnTime *= 0.99;
        } else {
          migSpawnTime *= 0.98;
        }
        migFrame = 0;
    }
    migFrame += 0.25;
    
    if (mouseIsPressed){
        player.shoot();
    }
    if (keyIsPressed){
        if (key === ' '){
          player.shoot();
        }
    }

    if (frameCount%60 === 0){
        timePlayed++;
        fuelCapacity -= 0.25;
    }

    if (fuelCapacity <= 0){
        deathString = "fuel";
        gameOver();
    }

    // dashboard
    stroke(0);
    strokeWeight(2);
    fill(255);
    rectMode(CORNER);
    rect(500, 650, 500, 100);

    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(425-2, 673, 54, 54);
    rect(350-2, 673, 54, 54);
    rect(275-2, 673, 54, 54);

    noStroke();
    fill(0);
    textSize(18);
    text("POS - " + player.pos.x.toFixed(0) + ", " + player.pos.y.toFixed(0), width/2-260, 670);
    text("VEL - " + player.vel.mag().toFixed(1) + " p/s", width/2-260, 690);
    text("ACC - " + player.acc.mag().toFixed(3) + " p/s2", width/2-260, 710);
    text("ANG - " + player.vel.heading().toFixed(2) + " Radians", width/2-260, 730);

    stroke(0);
    fill(255, 255, 255);
    rect(width/2-30, 730, 200, 10);
    rect(width/2-30, 710, 200, 10);

    if (playerHealth <= 66){
        fill(255, 0, 0);
    } else if (playerHealth > 132){
        fill(0, 128, 0);
    } else if (playerHealth <= 132 && playerHealth > 66){
        fill(255, 128, 0);
    }

    rect(width/2-30, 730, playerHealth, 10);

    fill(255, 165, 0);
    rect(width/2-30, 710, fuelCapacity, 10);

    noStroke();
    textSize(15);
    fill(0);
    text("HP ", 720, 740);
    text(playerHealth, 950, 740);
    text("FU ", 720, 720);
    text(round(fuelCapacity/2), 950, 720);

    image(upgrade_image, 1000, 680, 70, 70);

    // text("/200", 895, 740);

    noStroke();
    fill(0);
    textSize(20);

    text("Score: "+score, 10, 30);
    text("Time: "+timePlayed+"s", 10, 60);
    text(money, 40, 90);
    image(coin_image, 10, 72, 20, 20);

    image(medickit_img, 425, 675, 50, 50);
    text(medikitCount, 478, 725);

    image(bandage_img, 350, 675, 50, 50);
    text(bandageCount, 403, 725);

    image(canister_image, 275, 675, 50, 50);
    text(fuelCanisterCount, 328, 725); 

    } else  {
        if (upgradeIcon) {
            fill(255);
            stroke(0);
            strokeWeight(2);
            rect(width/2 - 400, height/2 - 300, 800, 600);

            rect(385-2, 98, 104, 104);
            rect(510-2, 98, 104, 104);
            rect(635-2, 98, 104, 104);

            noStroke();
            textSize(20);
            fill(0);
            text("SHOP", width/2-20, height/2 - 280);
            
            image(canister_image, 385, 100, 100, 100);
            text("Fuel Can", 385, 220);
            text("fuel +75", 385, 240);
            text("500 C", 385, 260);

            image(medickit_img, 510, 100, 100, 100);
            text("Medic Kit", 510, 220);
            text("HP +150", 510, 240);
            text("1000 C", 510, 260);

            image(bandage_img, 635, 100, 100, 100);
            text("Bandage", 635, 220);
            text("HP +75", 635, 240);
            text("500 C", 635, 260);

            textSize(15);
            text(fuelCanisterCount, 470, 200);
            text(medikitCount, 600, 200);
            text(bandageCount, 720, 200);

            fill(255);
            stroke(0);
            strokeWeight(2);
            rect(385, 270, 100, 30);
            rect(510, 270, 100, 30);
            rect(635, 270, 100, 30);

            noStroke();
            textSize(20);
            fill(0);
            text("BUY", 418, 290);
            text("BUY", 543, 290);
            text("BUY", 668, 290);

            image(coin_image, width/2+250, height/2 - 290, 25, 25);
            text(money, width/2 + 280, height/2 - 270);
        }
    }
}

function mousePressed(){
    if (mouseX > 1000 && mouseY > 680 && mouseX < 1070 && mouseY < 680+70 && gamePause === false){
        gamePause = true;
        upgradeIcon = true;
    }
    if ((mouseX < width/2 - 400 || mouseX > width/2 + 400 || mouseY < height/2 - 300) && upgradeIcon === true){
        gamePause = false;
        upgradeIcon = false;
    }
    //
    if (! gamePause){
        if (mouseX > 425 && mouseX < 475 && mouseY > 675 && mouseY < 725){
            if (medikitCount >= 1){
                medikitCount--;
                if (playerHealth <= 50){
                    playerHealth += 150;
                } else if (playerHealth > 50){
                    playerHealth = 200;
                }
            }
        }
        if (mouseX > 350 && mouseX < 400 && mouseY > 675 && mouseY < 725){
            if (bandageCount >= 1){
                bandageCount--;
                if (playerHealth <= 125){
                    playerHealth += 75;
                } else if (playerHealth > 125){
                    playerHealth = 200;
                }
            }
        }
        if (mouseX > 275 && mouseX < 325 && mouseY > 675 && mouseY < 725){
            if (fuelCanisterCount >= 1){
                fuelCanisterCount--;
                if (fuelCapacity <= 50){
                    fuelCapacity += 150;
                } else if (fuelCapacity > 50){
                    fuelCapacity = 200;
                }
            }
        }
    }

    if (upgradeIcon){
        if (mouseX > 385 && mouseX < 485 && mouseY > 270 && mouseY < 300){
            if (money >= 500){
                fuelCanisterCount++;
                money -= 500;
            }
        }
        if (mouseX > 510 && mouseX < 610 && mouseY > 270 && mouseY < 300){
            if (money >= 1000){
                medikitCount++;
                money -= 1000;
            }
        }
        if (mouseX > 635 && mouseX < 735 && mouseY > 270 && mouseY < 300){
            if (money >= 500){
                bandageCount++;
                money -= 500;
            }
        }
    }
    
}
