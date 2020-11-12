

var data = [
{"name" : "<=1.18" , "parent" : "null" , "coff" : [1,2,3,4,5]},
{"name" : "<=0.89" , "parent" : "<=1.18" , "coff" : [1,2,3,4,5]},
{"name" : "<=-0.0008" , "parent" : "<=1.18" , "coff" : [1,2,3,4,5]},
{"name" : "<=-0.66" , "parent" : "<=0.89" , "coff" : [1,2,3,4,5]},
{"name" : "<=1.07" , "parent" : "<=0.89" , "coff" : [1,2,3,4,5]}, 
{"name" : "=62" , "parent" : "<=-0.0008" , "coff" : [1,2,3,4,5]},
{"name" : "<=-0.77" , "parent" : "<=-0.0008" , "coff" : [1,2,3,4,5]},
{"name" : "=27" , "parent" : "<=-0.66" , "coff" : [1,2,3,4,5]},
{"name" : "=49" , "parent" : "<=-0.66" , "coff" : [1,2,3,4,5]},
{"name" : "=10" , "parent" : "<=1.07" , "coff" : [1,2,3,4,5]},
{"name" : "=78" , "parent" : "<=1.07" , "coff" : [1,2,3,4,5]},
{"name" : "=11" , "parent" : "<=-0.77" , "coff" : [1,2,3,4,5]},
{"name" : "=63" , "parent" : "<=-0.77" , "coff" : [9,2,4,2,1]}
];
var  dataMap=data.reduce(function(map,node){
    map[node.name]=node;
    return map;

},{});
var treeData = [];
data.forEach(function(node) {
 // add to parent
 var parent = dataMap[node.parent];
 if (parent) {
  // create child array if it doesn't exist
  (parent.children || (parent.children = []))
   // add node to child array
   .push(node);
 } else {
  // parent is null or missing
  treeData.push(node);
 }
});

// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 100, bottom: 20, left: 50},
 width = 660 - margin.right - margin.left,
 height = 500 - margin.top - margin.bottom;
 
var i = 0;

var tree = d3.layout.tree()
 .size([height, width]);

var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
  
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
   links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  

  var node = svg.selectAll("g.node")
             .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
     .on("click", click);
     

  nodeEnter.append("rect")
      .attr("width", 10)
      .attr("height", 20)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#FFF"; });
  var text = nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; });

  //var bbox = text.node().getBBox();

  

  // Declare the linksâ€¦
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", diagonal);

}
function click(d)
{
  d3.select("#the_SVG_ID").remove();

  var margin = {top: 20, right: 20, bottom: 70, left: 40},
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// Parse the date / time


var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id","the_SVG_ID")
.append("g")
  .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");

        var z=d.coff

        data = [
        {date:"obj1",value:z[0]},
        {date:"2",value:z[1]},
        {date:"3",value:z[2]},
        {date:"obj4",value:z[3]},
        {date:"obj5",value:z[4]},
        ]

  data.forEach(function(d) {
      d.date =(d.date);
      d.value = +d.value;
  });

x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value ($)");

svg.selectAll("bar")
    .data(data)
  .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d) { return x(d.date); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });


        
// var margin2 = {top2: 30, right2: 20, bottom2: 30, left2: 50},
// width2 = 800 - margin2.left2 - margin2.right2,
// height2 = 270 - margin2.top2 - margin2.bottom2;

// // Parse the date / time
// //var parseDate = d3.time.format("%d-%b-%y").parse;

// // Set the ranges
// var x = d3.scale.ordinal().range([0, width2]);
// var y = d3.scale.linear().range([height2, 0]);

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
// .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
// .orient("left").ticks(5);

// // Define the line
// var valueline = d3.svg.line()
// .x(function(d) { return x(d.date); })
// .y(function(d) { return y(d.close); });

// // Adds the svg canvas
// var svg = d3.select("body")
// .append("svg")
//     .attr("width", width2 + margin2.left2 + margin2.right2)
//     .attr("height", height2 + margin2.top2 + margin2.bottom2)
// .append("g")
//     .attr("transform", 
//           "translate(" + margin2.left2 + "," + margin2.top2 + ")");

// // Get the data
// var z=d.coff

// data = [
// {date:"obj1",close:z[0]},
// {date:"2",close:z[1]},
// {date:"3",close:z[2]},
// {date:"obj4",close:z[3]},
// {date:"obj5",close:z[4]},

// ];


 
// data.forEach(function(d) {
//     d.date =d.date;
//     d.close = +d.close;
// });

// // Scale the range of the data
// x.domain(d3.extent(data, function(d) { return d.date; }));
// y.domain([0, d3.max(data, function(d) { return d.close; })]);

// // Add the valueline path.
// svg.append("path")
//     .attr("class", "line")
//     .attr("d", valueline(data));

// // Add the X Axis
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height2 + ")")
//     .call(xAxis);

// // Add the Y Axis
// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);
    

//});     






}

  




    

