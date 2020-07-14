var r_scale = 0.75;
var cloud_x = 0;
var seed = 0;
var col = [255,255,255];

function setup() {
  createCanvas(400, 400);


}

function draw()
{
  background(0);
  noStroke();
  randomSeed(seed);
  recursiveCloud(cloud_x, 200, 100, col);

  cloud_x -= 1;

  if(cloud_x < -400)
  {
    cloud_x = width + 400;
    seed = millis();
    //r_scale = random(0.4,0.6);

      for(let i = 0; i < 3; i++)
      {
       col[i] = random(0,255);
      }

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
