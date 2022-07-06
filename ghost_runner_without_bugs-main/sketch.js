
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");

}

function setup() {
  createCanvas(600,600);
//torres
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
    //grupos
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup= new Group();
  //fantasma
  ghost = createSprite(200,250,50,50);
  ghost.scale=0.4;
  ghost.setCollider("rectangle",0,0,10,10);
  ghost.addImage("ghost",ghostImg);

}

function draw() {
  background(255);
  if(tower.y>400){
    tower.y=300;
  }
  if (gameState === "play"){
    if (keyDown("a")){
    ghost.x=ghost.x - 3
    }

    if (keyDown("d")){
    ghost.x=ghost.x + 3
    }
    if(keyDown("space")){
        ghost.velocityY=-10;

    }
    ghost.velocityY=ghost.velocityY+0.8;      

    if (tower.y>400){
        tower.y=350;

    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;

    }
    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy();
    gameState="end";

    }
    drawSprites();
  }
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250)
  }

}
    function spawnDoors(){
    if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    var climber= createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height=2;

    door.addImage(doorImg)
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY=1;
    invisibleBlock.velocityY = 1;//antes estava invisibleBlock=velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth+=1;
    
    //da linha 98 à 100 vc estava adicionando lifetime aos grupos de sprite
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
   
    doorsGroup.add(door);
    invisibleBlockGroup.debug=true;//estava se referindo à variável, ñ ao grupo
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    }
  }
