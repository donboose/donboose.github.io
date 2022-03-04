function setup(){
    createCanvas(1250, 500);
    noStroke();
}

let x = 10;
let y = 450;
let acc = 2

function draw(){ 
    background(0, 255, 34);         

    fill(0, 43, 255);
    rect(x, y, 45, 35);             
    rect(x+17.5, y-30, 10, 37.5);   
    fill(0);
    rect(x-10, y-7.5, 12, 50);      
    rect(x+45, y-7.5, 12, 50);      
    fill(0, 43, 255);
    rect(x+12.5, y+7.5, 20, 22);    
    
    fill(255);
    rect(1160, 450, 40, 40);
    fill(0);
    text("D", 1175, 470);
    fill(255);
    rect(1120, 450, 40, 40);        
    fill(0);
    text("L", 1135, 470);
    fill(255);
    rect(1160, 410, 40, 40);         
    fill(0);
    text("U", 1175, 430);
    fill(255);
    rect(1200, 450, 40, 40);         
    fill(0);
    text("R", 1215, 470);
    rect(1200, 450, 40, 40);         
    fill(0);
    text("R", 1210, 460);
    
    if (keyIsPressed && keyCode === LEFT_ARROW){
        x = x - acc;
    }
    if (keyIsPressed && keyCode === RIGHT_ARROW){
        x = x + acc;
    }
    if (keyIsPressed && keyCode === UP_ARROW){
        y = y - acc;
    } else if (keyIsPressed && keyCode === DOWN_ARROW){
        y = y + acc;
    }
    
    if (mouseIsPressed && mouseX > 1160 && mouseX < 1200 && mouseY > 450 && mouseY < 490){
        y = y + acc;
    } else if (mouseIsPressed && mouseX > 1120 && mouseX < 1160 && mouseY > 450 && mouseY < 490){
        x = x - acc;
    } else if (mouseIsPressed && mouseX > 1160 && mouseX < 1200 && mouseY > 410 && mouseY < 450){
        y = y - acc;
    } else if (mouseIsPressed && mouseX > 1200 && mouseX < 1240 && mouseY > 450 && mouseY < 490){
        x = x + acc;
    }
   
    if (x>1230){
        x = 20;
    } else if (x<0){
        x = 1230;
    }
    if (y>480){
        y = 20;
    } else if (y<20){
        y = 480;
    }
} 
