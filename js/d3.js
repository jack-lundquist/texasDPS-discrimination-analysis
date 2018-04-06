var hr_url = "https://raw.githubusercontent.com/jkastelan/DAA2018_jlk635/master/contrahr.json";


d3.queue()
.defer(d3.json, hr_url).
await(createChart)


function createChart(error, data){

  var ttl = d3.sum(data, function(d){
    return d.bcount
  })
  console.log(ttl)
  var svg = d3.select('#outcomeCharts').append('svg')
.style("width", 500)
.style("height", 500)
.append("g");

var circle = svg.selectAll('circle').data(data).enter()
.append('circle').attr("cx", function(d){
  return d.White * 500;
})
.attr("cy", function(d){
  return 500 - (d.Black * 500);
})
.attr("r", function(d){
  return  2 + (d.bcount / 75);
})

var line = svg.append("line")
            .attr("x1", 0)
            .attr("y1", 500)
            .attr("x2", 500)
            .attr("y2", 0)
.attr("stroke-width", 2)
.attr("stroke-dasharray", "5")
.attr("stroke", 'black');

}
