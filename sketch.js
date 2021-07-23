//Create variables here
var food;
var dog;

var t=null;
var c=null;

function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png")
  dogSad=loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 700);
  
  database=firebase.database()

  dog=createSprite(400,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.4

  database.ref('food').on("value",readPosition)
  
  
  milk1=new Food()
  milk1.getFeedTime()
  milk1.getFeedTimeMin()
  milk1.getAddTime()
  milk1.getAddTimeMin()

}


function draw() {  
  background("black")

  

  milk1.buttons()
  milk1.milkImg()

  if (food===0){
    dog.addImage(dogHappy)
    dog.scale=0.4
  }

  drawSprites();
  //add styles here



  textSize(25)
  fill("green")

  if (milk1.feedTime<12){
    t="AM"
  }else
  if (milk1.feedTime>=12){
    t="PM"
  }

  if (milk1.addTime<12){
    c="AM"
  }else
  if (milk1.addTime>=12){
    c="PM"
  }




  text ("Last Fed : "+  milk1.feedTime+":"+milk1.feedTimeMin+" "+t,100,50)
  text ("Last Added : "+ milk1.addTime+":"+milk1.addTimeMin+" "+c,100,120)
 

}




function readPosition(data){

  food=data.val()
}

function WriteStock(data){

  database.ref('/').update({

    food:data,
    feedTime:hour(),
   feedTimeMin :minute(),
   
  })
}

function WriteStock2(data){

  database.ref('/').update({
    food:data,
    addTime:hour(),
    addTimeMin:minute()
  
  })
}