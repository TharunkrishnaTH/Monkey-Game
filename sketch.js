var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 monkey_collided=loadAnimation("sprite_6.png");
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  monkey =createSprite(80,315,15,15)
  monkey.addAnimation("running", monkey_running)
  monkey.addAnimation("collided", monkey_collided)
  monkey.scale=0.1
  ground = createSprite(400,350,9999999,10)
  ground.velocityX = -4
  ground.x =ground.width/2
  
   score= 0
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
background("white") 

  text("Survival Time: "+ score, 300,50);
  
  if(gameState === PLAY){
    
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY=-15
    }
    
      obstaclesF();
      bananaF();
  
      monkey.velocityY = monkey.velocityY + 0.6
      monkey.collide(ground)
    
    if(bananaGroup.isTouching(monkey)){
       score = score+1
      
      bananaGroup.destroyEach();
      
    }
    
   if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
       score = 0;
      
   }
  
  
  }
  
  if(gameState === END){
    
    
    
    ground.velocityX = 0;
      monkey.velocityY = 0
    monkey.changeAnimation("collided",monkey_collided)
   obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);     
    
    
  }
  
   
  drawSprites();
}

function obstaclesF(){
  
   if (frameCount % 85 === 0){
   var obstacle = createSprite(400,325,15,15);
   obstacle.velocityX = -6;

   obstacle.addImage(obstaclesImage)
   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   

   obstaclesGroup.add(obstacle);
 }
  
}

function bananaF(){
  if (frameCount % 60 === 0) {
     banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
    
    banana.lifetime = 134;
    
  
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
   bananaGroup.add(banana);
  }
   
  
  
}





