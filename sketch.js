//Create variables here
var dog,happydog;
var dogimg;
var foodstock,foods;
var database;
function preload()
{
  dogimg=loadImage("dogImg1.png");
  happydog=loadImage("dogImg.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(270,400,20,20);
  dog.addImage(dogimg);
  dog.scale=0.1;
  foodstock=database.ref('food');
  foodstock.on("value",readstock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writestock(foods);
  dog.addImage(happydog);
}

else{
  
  dog.addImage(dogimg);
  
}
  drawSprites();
  //add styles here
  fill("black");
  stroke("white");
  textSize(25);
text("Food Remaining:"+ foods,100,200);

text("Note press uparrow to feed dog milk",20,100);
}

function readstock(data){
  foods=data.val();
}
function writestock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }
  database.ref('/').update({
  food:x
  })
}



