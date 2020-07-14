var r_scale;
var cloud_x;
var cloud_seed;
var col;
var lightning_seed;
var lightning_x;
var lightning_count;
var spaceShip_y;
var starField;

function setup()
{
  createCanvas(1200, 600);

  r_scale = 0.75;
  cloud_x = 0;
  cloud_seed = 0;
  col = [255,255,255];
  lightning_seed = 0
  lightning_x = width/2;
  lightning_count = 0;
  spaceShip_y = height/2;


  starField = [];

  //our random stars
  for(var i = 0; i < 100; i++)
  {
    starField.push(createVector(random(0,width), random(0,height)));
  }

}

function draw()
{
  background(0);

  stroke(255);
  strokeWeight(3);
  for(var i = 0; i < starField.length; i++)
  {
    var x = width - (starField[i].x + frameCount * 0.5)%width;
    point(x, starField[i].y);
  }



  noStroke();
  randomSeed(cloud_seed);
  recursiveCloud(cloud_x, 200, 100, col);

  cloud_x -= 1;

  if(cloud_x < -400)
  {
    cloud_x = width + 400;
    cloud_seed = millis();
    //r_scale = random(0.4,0.6);

      for(let i = 0; i < 3; i++)
      {
       col[i] = random(0,255);
      }

  }

  drawSpaceShip();


  randomSeed();
  stroke(255);
  noFill();


  if(lightning_count > 0)
  {
    if(random() < 0.5 )
    {
      randomSeed(lightning_seed);
      lightning(lightning_x,0,5,0,0,130);

    }
    lightning_count -= 1;
  }
  else if(random() < 0.01)
  {
    lightning_x = random(0,width);
    lightning_count = 30;
    lightning_seed = millis();
  }




}



function recursiveCloud(x, y, radius, c)
{

  let nc = [c[0], c[1], c[2]];
  for(let i = 0; i < 3; i++)
  {
   nc[i] += random(-40,40);
   nc[i] = constrain(nc[i], 0,255);
  }

  fill(nc[0],nc[1],nc[2],50);
  ellipse(x, y, radius);


  if (radius > 10)
  {

    let r = radius * r_scale;

    recursiveCloud(x - r, y + random(-r,r), r,nc);
    recursiveCloud(x + r, y + random(-r,r), r,nc);

  }

}

function lightning(x,y,stepSize,angle,stepCount,maxSteps)
{

  var v = createVector(0,stepSize);
  v.rotate(angle + random(-PI/3,PI/3));
  var nx = x + v.x;
  var ny = y + v.y;
  strokeWeight(stepSize/2);
  line(x,y,nx,ny);

  if(ny < height && stepCount < maxSteps)
  {
    lightning(nx,ny,stepSize,angle,stepCount + 1,maxSteps);

    if(random() < 0.05 && stepSize > 1)
    {
      lightning(
        nx,ny,
        stepSize * 0.5,
        angle + random(-PI/4, PI/4),
        0,
        maxSteps * 0.5);
    }
  }

}


function drawSpaceShip()
{
  push();
  translate(50,spaceShip_y);
  noStroke();
  fill(120);
  rect(0,0,50,2);
  rect(0,0,40,8);
  rect(2,-10,16,25);
  rect(15,-5,10,10);
  pop();
}
