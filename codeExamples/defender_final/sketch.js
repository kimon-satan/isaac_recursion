var spaceShip;
var starField;
var aliens;
var bullets;
var threshold;

var tree;


var r_scale;
var cloud_x;
var cloud_seed;
var col;
var lightning_seed;
var lightning_x;
var lightning_count;



function setup()
{
  createCanvas(1000,512);


  tree = [];
  bullets = [];

  spaceShip = {
    x: 0,
    y: 200,
    speed_x: 5,
    speed_y: 0,
    offset: 100,
    bullet_speed: 10,
    is_collided: false
  }

  starField = [];
  aliens = [];
  bullets = [];

  threshold = 10;

  r_scale = 0.75;
  cloud_x = 0;
  cloud_seed = 0;
  col = [255,255,255];
  lightning_seed = 0
  lightning_x = width/2;
  lightning_count = 0;

  //our random stars
  for(var i = 0; i < 100; i++)
  {
    starField.push(createVector(random(0,width), random(0,height)));
  }

  //create the aliens
  for(var i = 0; i < 50; i++)
  {
    aliens.push({x: random(1000, 5000), y: random(0, height), isDead: false});
  }



  textSize(32);
  textAlign(CENTER);


}

function draw()
{


  spaceShip.x += spaceShip.speed_x;
  spaceShip.y += spaceShip.speed_y;


  //move the bullets
  for(var i = bullets.length -1; i >= 0; i--)
  {
    bullets[i].x += spaceShip.bullet_speed;

    if(bullets[i].x > spaceShip.x + width)
    {
      bullets.splice(i,1);
    }
  }


  //move the aliens
  randomSeed();
  for(var i = 0; i < aliens.length; i++)
  {
    if(aliens[i].isDead == false)
    {
      aliens[i].x +=  random(-10,10);
      aliens[i].y +=  random(-10,10);

      //make the aliens keep coming
      if(aliens[i].x - spaceShip.x < -500)
      {
        aliens[i].x = spaceShip.x + random(1500,3000);
      }
    }
  }

  //move the stars
  for(var i = 0; i < starField.length; i++)
  {
    starField[i].x -= spaceShip.speed_x;
    if(starField[i].x < 0)
    {
      starField[i].x = width;
    }
  }

  //update the cloud
  cloud_x -= 1;

  if(cloud_x < -400)
  {
    cloud_x = width + 400;
    cloud_seed = millis();

      for(let i = 0; i < 3; i++)
      {
       col[i] = random(0,255);
      }

  }

  //OLD METHODS

  //spaceShip.is_collided = checkForCollisions();

  //spaceShip.is_collided = checkForCollisionsBinary(0,aliens.length-1);

  updateTree();
  spaceShip.is_collided  = searchTree(0, spaceShip);

  //collision check bullets
  for(var i = bullets.length -1; i >= 0; i--)
  {
    var collided = searchTree(0, bullets[i]);

    if(collided)
    {
      bullets.splice(i,1);
      collided.isDead = true;
    }
  }


  //DO THE DRAWING

  background(0);

  for(var i = 0; i < starField.length; i++)
  {
    stroke(255);
    point(starField[i].x, starField[i].y);
  }

  for(var i = 0; i < aliens.length; i++)
  {
    if(aliens[i].isDead == false)
    {
      drawAlien(aliens[i].x - spaceShip.x + spaceShip.offset, aliens[i].y);
    }
  }

  drawSpaceShip(spaceShip.offset, spaceShip.y);


  fill(255,0,0);
  for(var i = 0; i  < bullets.length; i++)
  {
    ellipse(bullets[i].x - spaceShip.x + spaceShip.offset, bullets[i].y,5);
  }


  //draw the cloud
  noStroke();
  randomSeed(cloud_seed);
  recursiveCloud(cloud_x, 200, 100, col);


  //draw the lightning
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



  if(spaceShip.is_collided)
  {
    //stop the game
    fill(255);
    noStroke();
    text("GAME OVER", width/2,height/2);
    noLoop();
  }

}

/////////////////////// EVENTS //////////////////////////////

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

  if(key == ' ')
  {
    bullets.push(createVector(spaceShip.x, spaceShip.y));
  }
}

function keyReleased()
{

  spaceShip.speed_y = 0;

}

//////////////////////////////// HELPER FUNCTIONS AND CLASSES /////////////////////////


function searchTree(currentIndex, searchValue)
{

  if(dist(tree[currentIndex].data.x, tree[currentIndex].data.y, searchValue.x, searchValue.y) <= threshold)
  {
    return tree[currentIndex].data; //base case
  }
  else if(searchValue.x > tree[currentIndex].data.x &&
    tree[currentIndex].right != null
  )
  {
    return searchTree(tree[currentIndex].right, searchValue);
  }
  else if (searchValue.x <= tree[currentIndex].data.x &&
    tree[currentIndex].left != null)
  {
    return searchTree(tree[currentIndex].left, searchValue);
  }

  return false;
}

function updateTree()
{
  tree = [];
  tree.push({left: null, right: null, data: aliens[0]});

  for(var i= 1; i < aliens.length; i++)
  {
    if(aliens[i].isDead == false)
    {
      addTreeValue(aliens[i],0);
    }
  }
}

function addTreeValue(value, currentIndex)
{
  if(value.x < tree[currentIndex].data.x)
  {
    if(tree[currentIndex].left == null)
    {
      tree.push({left: null, right: null, data: value});
      tree[currentIndex].left = tree.length - 1;
    }
    else
    {
      addTreeValue(value, tree[currentIndex].left);
    }
  }
  else
  {
    if(tree[currentIndex].right == null)
    {
      tree.push({left: null, right: null, data: value});
      tree[currentIndex].right = tree.length - 1;
    }
    else
    {
      addTreeValue(value, tree[currentIndex].right);
    }
  }
}



function linearSearch()
{
  for(var i = 0; i < aliens.length; i++)
  {
    var d = dist(aliens[i].x, aliens[i].y, spaceShip.x, spaceShip.y);
    if(d < threshold)
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
      if(dist(aliens[mid].x,aliens[mid].y, spaceShip.x, spaceShip.y) <= threshold)
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
