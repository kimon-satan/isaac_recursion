var spaceShip;
var aliens;




function setup()
{
  createCanvas(1000,512);

  spaceShip = {
    x: 1000,
    y: 200,
    offset: 100,
    speed_x: 5,
    speed_y: 0
  }


  aliens = [];

  //create the aliens

  for(var i = 0; i < 100; i++)
  {
    aliens.push({x: random(1000, 10000), y: random(0, height)});
  }


  textSize(32);
  textAlign(CENTER);


}

function draw()
{

  background(0);
  spaceShip.x += spaceShip.speed_x;
  spaceShip.y += spaceShip.speed_y;

  for(var i = 0; i < aliens.length; i++)
  {
    drawAlien(aliens[i].x - spaceShip.x + spaceShip.offset,aliens[i].y);
  }

  drawSpaceShip(spaceShip.offset,spaceShip.y);

  // if(linearSearch() == true)
  // {
  //   noLoop(); //game over
  // }

  if(checkForCollisionsBinary(0,aliens.length-1) == true)
  {
    noLoop(); //game over
  }

}



function keyPressed()
{

  if(keyCode == 38)
  {
    spaceShip.speed_y = -5;
  }
  else if(keyCode == 40)
  {
    spaceShip.speed_y = 5;
  }

}

function keyReleased()
{

  spaceShip.speed_y = 0;

}

//////////////////////////////// HELPER FUNCTIONS AND CLASSES /////////////////////////

function linearSearch()
{
  for(var i = 0; i < aliens.length; i++)
  {
    var d = dist(aliens[i].x, aliens[i].y, spaceShip.x, spaceShip.y);
    if(d < 20)
    {
      return true;
    }
  }

}


function checkForCollisionsBinary(firstIndex,lastIndex)
{
  if(firstIndex > lastIndex)
  {
    return false; //we've been through all the aliens and there is no collision
    //base case
  }
  else
  {
      var mid = floor((firstIndex + lastIndex)/2);

      //it's a collision
      if(dist(aliens[mid].x,aliens[mid].y, spaceShip.x, spaceShip.y) <= 15)
      {
        return true;
        //base case
      }

      if(aliens[mid].x < spaceShip.x)
      {
        firstIndex = mid + 1;
        return checkForCollisionsBinary(firstIndex, lastIndex);
      }
      else
      {
        lastIndex = mid - 1;
        return checkForCollisionsBinary(firstIndex, lastIndex);
      }
  }
}


function drawSpaceShip(x,y)
{


  rectMode(CORNER);
  noStroke();
  fill(120);
  rect(x-50,y,50,2);
  rect(x-50,y,40,8);
  rect(x-48,y-10,16,25);
  rect(x-35,y-5,10,10);

  fill(255,0,0);
  ellipse(x,y,10);

}


function drawAlien(x,y)
{

  noStroke();
  fill(0,255,0);
  rectMode(CENTER);
  rect(x,y,25,25);
  rect(x-15,y+15,5,5);
  rect(x,y+15,5,5);
  rect(x+15,y+15,5,5);
  fill(0);
  rect(x-5,y-5,5,5);
  rect(x+5,y-5,5,5);

  fill(255,0,0);
  ellipse(x,y,10);

}
