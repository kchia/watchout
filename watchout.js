// start slingin' some d3 here.

//set up game environment - height, width, num enemies
var height = 600;
var width = 800;
var numEnemies = 50;
var circleSize = 10;
var randomPosition = function(){ return {x: Math.random() * width, y: Math.random() * height}};
var wait = 2000;
var speed = 2000;
var collisions = 0;
var high = 0;
var current = 0;


var svg = d3.select("body").append("svg")
  .attr("width",width).attr("height",height);

var player = svg.selectAll("circle").data([{x:width/2,y:height/2}]).enter().append("circle")
  .attr("r", circleSize).attr("cx",function(d) { return d.x; }).attr("cy",function(d) { return d.y; })
  .classed("player",true);

var enemyPositions = d3.range(numEnemies).map(randomPosition);

var enemies = svg.selectAll("circle").data(enemyPositions).enter().append("circle")
  .attr("r", circleSize).attr("cx",function(d) { return d.x; }).attr("cy",function(d) { return d.y; })
  .classed("enemy",true);

var drag = d3.behavior.drag()
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

player.call(drag);

function dragstarted(d) {
   //d3.event.sourceEvent.stopPropagation(); // what does this do
   d3.select(this).classed("dragging", true);
}

function dragged(d) {
  var mouseX = d3.event.x;
  var mouseY = d3.event.y;

  if(mouseX > width-circleSize) {
    mouseX = width-circleSize;
  } else if (mouseX < circleSize) {
    mouseX = circleSize;
  }

  if(mouseY > height-circleSize) {
    mouseY = height-circleSize;
  } else if (mouseY < circleSize) {
    mouseY = circleSize;
  }

  d3.select(this).attr("cx", d.x = mouseX).attr("cy", d.y = mouseY);

  // if(0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height ){
  //   d3.select(this).attr("cx", d.x = mouseX).attr("cy", d.y = mouseY);
  // } else {
  //   if( mouseY < 0 ){
  //     d3.select(this).attr("cx", d.x = mouseX).attr("cy", d.y = circleSize);
  //   }
  //   if( mouseY > height ){
  //     d3.select(this).attr("cx", d.x = mouseX).attr("cy", d.y = height - circleSize);
  //   }
  //   if( mouseX < 0 ){
  //     d3.select(this).attr("cx", d.x = circleSize).attr("cy", d.y = mouseY);
  //   }
  //   if( mouseX > width ){
  //     d3.select(this).attr("cx", d.x = width - circleSize).attr("cy", d.y = mouseY);
  //   }
  // }
}

function dragended(d) {
   d3.select(this).classed("dragging", false);
}

setInterval(function(){
  enemyPositions = enemyPositions.map(randomPosition);
  svg.selectAll(".enemy").data(enemyPositions).transition().duration(speed).attr("cx",function(d) { return d.x; }).attr("cy",function(d) { return d.y; });
}, wait);



// Every millisecond, iterate over the enemies
setInterval(function(){
  // Check each enemy to see if its position is within 2r of the player's center
  svg.selectAll(".enemy").each(function(){
    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    var playerX = player.attr("cx");
    var playerY = player.attr("cy");
    var distance = Math.sqrt(Math.pow(enemyX - playerX,2) + Math.pow(enemyY - playerY,2));
    if(distance < 2 * circleSize){
      collide();
    }
});

},1);

setInterval(function(){
  current++;
  d3.select(".current").select('span').text(current);
},500)

var collide = _.throttle(function(){
  collisions++;
  high = current > high ? current : high;
  current = 0;
  d3.select(".collisions").select('span').text(collisions);
  d3.select(".high").select('span').text(high);
  d3.select(".current").select('span').text(current);
}, 1000, {trailing: false});
//set up player class
//set up enemies class
//render the player and enemies

//the game loop
  //move enemies
  //allow dragging of player
  //detect collisions
    //update scores on collision

//start the game loop
