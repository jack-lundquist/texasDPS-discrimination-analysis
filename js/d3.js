var hr_url = "https://raw.githubusercontent.com/jkastelan/DAA2018_jlk635/master/contrahr.json";

var county_URL = "https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.geojson";

d3.queue()
.defer(d3.json, hr_url)
.defer(d3.json, county_URL).
await(createChart)


function createChart(error, outcomes, county){

  var margin = {'left': 30, 'right': 30,
               'top':10, 'bottom': 20}
  var svg = d3.select('#scatterSvg').append('svg')
.style("width", 1200)
.style("height", 600);

  var gChart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var gMap   = svg.append("g")
                  .attr("transform", "translate(650, 0)");


  createMap(gMap, outcomes, county);
  createScatter(gChart,outcomes, county);


  function createScatter(g, outcomes, county){
      var height = 500;
      var width = 1000;

      var x = d3.scaleLinear().domain([0, 1]).range([0, 500]);
      var y = d3.scaleLinear().domain([0, 1]).range([500, 0]);

      var xAxis = d3.axisBottom(x)
      var yAxis = d3.axisLeft(y)

      var tooltip = d3.select("#scatterSvg")
        .append("div")
        .attr("class", "tooltip");



    var circle = g.selectAll('circle').data(outcomes).enter()
        .append('circle').attr("cx", function(d){
            return x(d.White);
    })
    .attr("cy", function(d){
        return y(d.Black);
    })
    .attr("r", function(d){
      return  2 + (d.bcount / 75);
    })
    .style('fill', 'orange');


circle =
          g.selectAll('circle').data(outcomes)
      .on("mouseover", function(d){
          tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index)
        })
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    g.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    var line = g.append("line")
            .attr("x1", 0)
            .attr("y1", 500)
            .attr("x2", 500)
            .attr("y2", 0)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5")
    .attr("stroke", 'black');

      d3.select('#h').on("click", function(){
       updateMap(gMap, outcomes, 1);
    var circle = g.selectAll('circle').data(outcomes)
    .transition().duration(500)
    .attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Hispanic);
    })
    .attr("r", function(d){
      return  2 + (d.hcount / 75);
    })
    .style("fill", "purple")
    .style("stroke", "purple");


    circle =
          g.selectAll('circle').data(outcomes)
      .on("mouseover", function(d){
          tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index)
        })
      })


    d3.select('#a').on("click", function(){
      updateMap(gMap, outcomes, 2);
    var circle = g.selectAll('circle').data(outcomes).
    transition().duration(500).attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Asian);
    })
    .attr("r", function(d){
      return  2 + (d.acount / 75);
    })
    .style("fill", "green")
    .style("stroke", "green");

      circle =
          g.selectAll('circle').data(outcomes)
      .on("mouseover", function(d){
          tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index)
        })
    })

    d3.select('#b').on("click", function(){
      updateMap(gMap, outcomes, 0);
    var circle = g.selectAll('circle').data(outcomes).transition()
    .duration(500).attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Black);
    })
    .attr("r", function(d){
      return  2 + (d.bcount / 75);
    })
    .style("fill", "orange")
    .style("stroke", "orange");

      circle =
          g.selectAll('circle').data(outcomes)
      .on("mouseover", function(d){
          tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index)
        })
  })
      }




 function createMap(g, outcomes, county){
      let canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2, canvasSize[1]/2]),

// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      path       = d3.geoPath()
                     .projection(projection);

//   Let's create a path for each (new) county shape
  g.selectAll(".county")
    .data(county.features)
    .enter().append("path")
      .attr("class", "county")
      .attr("d", path);

  updateMap(g, outcomes, 0);

    }

    function updateMap(g, outcomes, i){
      var data     = outcomes.map(d => [d.Asian, d.Black, d.Hispanic, d.White, d.index]),
      maxCount = d3.max(data, d => d[i]),
      steps    = 5,
      color    = d3.scaleThreshold()
                   .domain(d3.range(0, maxCount, maxCount/steps))
                   .range(d3.schemeOranges[steps]);


// console.log(data);
  counties = g.selectAll(".county")
                  .data(data, d => (d[4]?d[4]:d.properties.COUNTY));

  counties
    .transition().duration(300)
    .style("fill", d => color(d[i]));

    }

}
