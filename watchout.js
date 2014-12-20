// start slingin' some d3 here.

//set up game environment - height, width, num enemies
var height = 600;
var width = 800;
var numEnemies = 50;

var svg = d3.select("body").append("svg")
  .attr("width",width).attr("height",height);

var player = svg.selectAll("circle").data([{x:width/2,y:height/2}]).enter().append("circle")
  .attr("r", 10).attr("cx",function(d) { return d.x; }).attr("cy",function(d) { return d.y; })
  .classed("player",true);

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
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
   d3.select(this).classed("dragging", false);
}



//set up player class
//set up enemies class
//render the player and enemies

//the game loop
  //move enemies
  //allow dragging of player
  //detect collisions
    //update scores on collision

//start the game loop
