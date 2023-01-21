let player;
let money = 0;
let score = 0;
let timePlayed = 0;

let droneSpawnTime = 300;
let droneMaxSpeed = 2;
let frame = 100;
let migSpawnTime = 300;
let migFrame = 0;

let droneArray = [];
let mig21Array = [];
let missileArray = [];

let Retry;
let target;
let targetString = "";

let playerHealth = 200;
let fuelCapacity = 200;
let missileCount = 6;

let medikitCount = 0;
let bandageCount = 0;
let fuelCanisterCount = 0;

let gunName = "machine";
let upgradeIcon = false;
let gamePause = false;

let coin_img, shop_img, upgrade_img, reload_img;
let canister_img, bandage_img, medickit_img, missile_img;

let deathString = "";

function preload(){
    coin_img = loadImage("fp_plane\\images\\coin.png");
    shop_img = loadImage("fp_plane\\images\\shop2.png");
    upgrade_img = loadImage("fp_plane\\images\\upgrade.png");
    canister_img = loadImage("fp_plane\\images\\canister.jpg");
    bandage_img = loadImage("fp_plane\\images\\bandage.png");
    medickit_img = loadImage("fp_plane\\images\\medikit.png");
    reload_img = loadImage("fp_plane\\images\\reload.png");
    missile_img = loadImage("fp_plane\\images\\missileimg.png");
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

    for (let i = droneArray.length - 1; i >= 0; i--) {
        droneArray[i].draw();
        droneArray[i].update();  
        if (droneArray[i].hitYou()) {
            playerHealth -= 40;
            droneArray.splice(i, 1);
            if (playerHealth <= 0){
                deathString = "drone";
                gameOver();
                break;
            }  
        }            
        else if (player.hasShot(droneArray[i])) {
            droneArray[i].enehealth -= 30;
            if (droneArray[i].enehealth <= 0) {
                score++;
                money += 100;
                droneArray.splice(i, 1);
            }
        }
              
    }

    for (let i = mig21Array.length - 1; i >= 0; i--) {
        mig21Array[i].draw();
        mig21Array[i].update(player);

        if (dist(mig21Array[i].pos.x, mig21Array[i].pos.y, player.pos.x, player.pos.y) < 500){
            mig21Array[i].shoot();
        }

        if (mig21Array[i].hitYou(player)) {
            playerHealth -= 20;
            if (playerHealth <= 0){
                deathString = "mig";
                gameOver();
                break;
            }  
        }            
        if (player.hasShot(mig21Array[i])) {
            mig21Array[i].enehealth -= 20;
            if (mig21Array[i].enehealth <= 0) {
                score++;
                money += 500;
                mig21Array.splice(i, 1);
            }
        }    
    }

    if (frame >= droneSpawnTime) {
        droneArray.push(new Enemy(droneMaxSpeed, 60));
        if (droneSpawnTime <= 100){
            droneSpawnTime *= 0.99;
        } else {
            droneSpawnTime *= 0.98;
        }
        frame = 0;
    }
    frame += 0.5;

    if (migFrame >= migSpawnTime){
        mig21Array.push(new mig21(3, 60));
        if (migSpawnTime <= 100){
          migSpawnTime *= 0.99;
        } else {
          migSpawnTime *= 0.98;
        }
        migFrame = 0;
    }
    migFrame += 0.25;
    
    if (mouseIsPressed){
        if (gunName === "machine"){
            player.shoot();
        } else if (gunName === "missile"){
            if (frameCount % 60 === 0){
                missileArray.push(new missile(player.pos.x, player.pos.y, player.vel.heading(), 5, 8));
            }
        }
    }
    if (keyIsPressed){
        if (gunName === "machine"){
            if (key === ' '){
                player.shoot();
            }
        } else if (gunName === "missile"){
            if (frameCount % 60 === 0){
                if ((mig21Array.length > 0 || droneArray.length > 0) && missileCount > 0){
                    missileArray.push(new missile(player.pos.x, player.pos.y, player.vel.heading(), 5, 8));
                    missileCount--;
                    targetString = "MISSILE \n FIRED";
                } else if ((mig21Array.length === 0 && droneArray.length === 0)) {
                    targetString = "NO TARGET \n TO LOCK";
                } 
            }
        }
        if (gunName === "machine" && key === "s"){
            gunName = "missile";
        } else if (gunName === "missile" && key === "s"){
            gunName = "machine";
        }
    }

    for (let i = missileArray.length - 1; i >= 0; i--){
        missileArray[i].draw();
        missileArray[i].update();
        if (mig21Array.length > 0){
            missileArray[i].seek(mig21Array);
            if (missileArray[i].shotPlane()){
                mig21Array.splice(missileArray[i].returnTargetIndex(), 1)   
                missileArray.splice(i, 1);
                score++;
                money += 500;
            }
        } else if (droneArray.length > 0){
            missileArray[i].seek(droneArray);
            if (missileArray[i].shotPlane()){
                droneArray.splice(missileArray[i].returnTargetIndex(), 1)   
                missileArray.splice(i, 1);
                score++;
                money += 100;
            }
        } 
    }

    if (frameCount%60 === 0){
        timePlayed++;
        fuelCapacity -= 0.4;
    }

    if (fuelCapacity <= 0){
        deathString = "fuel";
        gameOver();
    }

    // dashboard
    stroke(0);
    strokeWeight(2);
    fill(0, 150);
    rectMode(CORNER);
    rect(500, 650, 500, 100);

    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(425-2, 673, 54, 54);
    rect(350-2, 673, 54, 54);
    rect(275-2, 673, 54, 54);

    noStroke();
    fill(0, 255, 0);
    textSize(18);
    text("POS - " + player.pos.x.toFixed(0) + ", " + player.pos.y.toFixed(0), width/2-260, 670);
    text("VEL - " + player.vel.mag().toFixed(1) + " p/s", width/2-260, 690);
    text("ACC - " + player.acc.mag().toFixed(3) + " p/s2", width/2-260, 710);
    text("ANG - " + player.vel.heading().toFixed(2) + " Radians", width/2-260, 730);

    if (gunName === "machine"){
        text("GUN - 25 mm GATLING GUN", width/2-60, 670);
        text("INFINITE BULLETS", width/2-60, 690);
    } else if (gunName === "missile"){
        text("MISSILE - AIM 120 AMRAAM", width/2-60, 670);
        if (missileCount > 0){
            stroke(0, 255, 0);
            strokeWeight(2);
            rectMode(CORNER);
            fill(0, 100);
            for (let i = 0; i < missileCount; i++){
                rect(720 + i*18, 690, 8, 20);
                triangle(720 + i*18, 690, 728 + i*18, 690, 724 + i*18, 680);
            }
            noStroke();
            fill(0, 255, 0);
            textSize(18);
            text(targetString, 865, 690);
        } else if (missileCount <= 0){
            text("NO MISSILES LEFT", width/2-60, 690);
        }
    }

    stroke(0);
    fill(255, 255, 255);
    rect(width/2-30, 735, 200, 10);
    rect(width/2-30, 720, 200, 10);

    if (playerHealth <= 66){
        fill(255, 0, 0);
    } else if (playerHealth > 132){
        fill(0, 128, 0);
    } else if (playerHealth <= 132 && playerHealth > 66){
        fill(255, 128, 0);
    }

    rect(width/2-30, 735, playerHealth, 10);

    fill(255, 165, 0);
    rect(width/2-30, 720, fuelCapacity, 10);

    noStroke();
    textSize(15);
    fill(0);
    text("HP ", 720, 745);
    text(playerHealth, 950, 745);
    text("FU ", 720, 730);
    text(round(fuelCapacity/2), 950, 730);

    image(upgrade_img, 1000, 680, 70, 70);
    image(reload_img, 1070, 680, 70, 70);

    noStroke();
    fill(0);
    textSize(20);

    text("Score: "+score, 10, 30);
    text("Time: "+timePlayed+"s", 10, 60);
    text(money, 40, 90);
    image(coin_img, 10, 72, 20, 20);

    image(medickit_img, 425, 675, 50, 50);
    text(medikitCount, 478, 725);

    image(bandage_img, 350, 675, 50, 50);
    text(bandageCount, 403, 725);

    image(canister_img, 275, 675, 50, 50);
    text(fuelCanisterCount, 328, 725); 

    } else  {
        if (upgradeIcon) {
            fill(255);
            stroke(0);
            strokeWeight(2);
            rect(width/2 - 400, height/2 - 300, 800, 600);

            rect(383, 98, 104, 104);
            rect(508, 98, 104, 104);
            rect(633, 98, 104, 104);
            rect(758, 98, 104, 104);

            noStroke();
            textSize(20);
            fill(0);
            text("SHOP", width/2-20, height/2 - 280);
            
            image(canister_img, 385, 100, 100, 100);
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

            image(missile_img, 760, 100, 100, 100);
            text("Missile", 760, 220);
            text("missile +1", 760, 240);
            text("1000 C", 760, 260);

            textSize(20);
            text(fuelCanisterCount, 470, 200);
            text(medikitCount, 600, 200);
            text(bandageCount, 720, 200);
            text(missileCount, 840, 200);

            fill(255);
            stroke(0);
            strokeWeight(2);
            rect(385, 270, 100, 30);
            rect(510, 270, 100, 30);
            rect(635, 270, 100, 30);
            rect(760, 270, 100, 30);

            noStroke();
            textSize(20);
            fill(0);
            text("BUY", 418, 290);
            text("BUY", 543, 290);
            text("BUY", 668, 290);
            text("BUY", 793, 290);

            image(coin_img, width/2+250, height/2 - 290, 25, 25);
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
        if (mouseX > 1070 && mouseY > 680 && mouseX < 1140 && mouseY < 750){
            if (gunName === "machine"){
                gunName = "missile";
            } else if (gunName === "missile"){
                gunName = "machine";
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
        if (mouseX > 760 && mouseX < 860 && mouseY > 270 && mouseY < 300){
            if (money >= 1000){
                if (missileCount < 6){
                    missileCount++;
                    money -= 1000;
                }
            }
        }
    }
}
