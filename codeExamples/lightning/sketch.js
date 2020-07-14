var seed;
var lightning_x;
var lightning_count;

function setup() {
  createCanvas(400, 400);
  seed = 0;
  lightning_x = random(0,width);
  lightning_count = 60;
}

function draw()
{
  randomSeed();
  background(0);
  stroke(255);
  noFill();


  if(lightning_count > 0)
  {
    if(random() < 0.5 )
    {
      randomSeed(seed);
      lightning(lightning_x,0,5,0,0,100);

    }
    lightning_count -= 1;
  }
  else if(random() < 0.05)
  {
    lightning_x = random(0,width);
    lightning_count = 30;
    seed = millis();
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
