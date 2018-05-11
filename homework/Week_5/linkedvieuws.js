/**
linkedvieuws.js

dataprocessing week 5
Marieke van Maanen
10888640

Creates a map of Africa 
**/

window.onload = function() {
	d3.select("head").append("title")
						.text("Total Slave Exports Between 1400-1900");

	// d3.select("body").append("h1")
	// 						.text("Total Slave Exports Between 1400-1900");

	// d3.select("body").append("h3")
	// 						.text("Marieke van Maanen (10888640)");	
		GetData();

};

function GetData(error) {
	if (error) throw error;
	
	d3.queue()
  	.defer(d3.json, "exports.json")
  	.defer(d3.json, "only_total_exports.json")
  	.awaitAll(MakeMap);

};


function MakeMap(error, response) {
	if (error) throw error;

	// log trans atlantic axports from Angola
	console.log(typeof(response[0]["exports"][0].Angola.trans_atlantic))
	console.log(response[1]["total_exports"])

	// devide countries and values
    var total_slave_trades = [];
    var countries = [];
    
    for (i = 0; i < 51; i++) {

	    // select country names
	    countries.push(Object.keys(response[1]["total_exports"][i]));

	    // select all slave trades per country
	    total_slave_trades.push(Object.values(response[1]["total_exports"][i]));

	};


//console.log(typeof(total_slave_trades[0]))
console.log(total_slave_trades)
	total_slave_trades.forEach(function(d) {
		d = +d
	});
//console.log(typeof(total_slave_trades))

    // initialize tooltip
    var tooltip = d3.select("#container")
        .append("div")
        .attr("class", "tooltip hidden");

        // define d3 tooltip			
	var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10, 0])
			  .html(function(d) {
			    return "<span style='color:white'>" + d + "</span><strong style='color:white'> Slave Trades </strong> ";
			  });
	
	// call tooltip


    // get the minimum and maximum exports
    var max_slave_trades = d3.max(total_slave_trades, function(d) { return d; });
console.log(max_slave_trades) // max is 94.633 but should be 3 million..
    var min_slave_trades = d3.min(total_slave_trades, function(d) { return d; });

	// color scale for map
    var color = d3.scale.ordinal()
    	.domain([min_slave_trades, max_slave_trades])
        .range(["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603"]);


	/*.forEach(function(d){ 
	var low=Math.round(100*Math.random()), 
		mid=Math.round(100*Math.random()), 
		high=Math.round(100*Math.random());
	sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
			avg:Math.round((low+mid+high)/3), color:d3.interpolate("#ffffcc", "#800026")(low/100)};
*/



    var map = new Datamap({
			element: document.getElementById('container'),
			scope: "world",
			
			// zoom in on Africa
			setProjection: function(element) {
				var projection = d3.geo.equirectangular()
								    .center([23, 0])
								    .rotate([4.4, 0])
								    .scale(400)
								    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
								    
								    var path = d3.geo.path()
								    .projection(projection);

				return {path: path, projection: projection};
			},
			fills: {
				defaultFill: "#a63603"
			},
			geographyConfig: {
				borderColor: "lightgrey",
				popupOnHover: true,
				highlightOnHover: true,
				highlightFillColor: "darkgoldenrod"
			// 	"popupTemplate":  function(geo, countries) {
			//     		return '<div class=hoverinfo><strong>',
			//     		+ geography.properties.name + 
			//       		': ' + countries + '</strong></div>';
			// }
		}
	});



    MakeBar(response)
};

function MakeBar (dataset) {

	//console.log(dataset)
	var slave_exports = dataset["0"]["exports"];
	//console.log(slave_exports)
	var angola = slave_exports["0"]["Angola"]
	var zimbabwe = slave_exports["36"]["Zimbabwe"]
	var burundi = slave_exports["38"]["Burundi"]
	console.log(burundi)

	// does not work
	slave_exports.forEach(function(d) {
		d.indian_ocean = +d.indian_ocean;
		d.red_sea = +d.red_sea;
		d.trans_atlantic = +d.trans_atlantic
		d.trans_saharan = +d.trans_saharan;
	});
	//console.log(typeof(sudan))
	//console.log(typeof(burundi.trans_atlantic))

	
	// set dimensions for bargraph
	var margin = {top: 40, right: 30, bottom: 60, left: 40},
    	width = 560 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom,
		barPadding = 5,
		padding = 25;

	// get svg element
	var svg = d3.select("#container").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define d3 tooltip			
	var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10, 0])
			  .html(function(d) {
			    return "<span style='color:white'>" + d + "</span><strong style='color:white'> Slave Trades </strong> ";
			  });
	
	// call tooltip on svg
	svg.call(tip);


	// create scale for x and y-axis
	var x = d3.scale.ordinal()
					.domain(["Trans-Atlanctic", "Indian Ocean", "Trans-Saharan", "Red Sea"])
					.rangeRoundBands([0, width]);

	var y = d3.scale.linear()
					.domain([0, d3.max(Object.values(zimbabwe), function(d) { return d; })])
					.range([height, 0]); 

	// define x and y-axis
    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

    var yAxis = d3.svg.axis()
	              .scale(y)
	              .orient("left");

	// generate x-axis
	var draw_x = svg.append("g")
					    .attr("class", "axis")
					    .attr("transform", "translate(0," + height + ")")
					    .call(xAxis)
					.append("text")
						.attr("y", margin.bottom)
						.attr("x", height)
						.attr("dx", "15em")
						.style("font-size", "13px")
						.style("font-weight", "bold");


	var draw_y = svg.append("g")
					    .attr("class", "axis")
					    .call(yAxis)
					.append("text")
						.attr("transform", "rotate(-90)")
					    .attr("y", 0 - margin.left)
					    .attr("dy", ".8em")
					    .style("text-anchor", "end")
					    .text("Number of Slave Trades")
            			.style("font-size", "13px")
            			.style("font-weight", "bold");

    // create rectangles       			
	var rects = svg.selectAll(".bar")
				    .data(Object.values(zimbabwe))
					.enter()
					.append("rect")
					.attr("class", "bar")
					.attr("x", function(d, i) { return i * (width / 4); })
				    .attr("width", width / 4 - barPadding )
				    .attr("y", function(d) { return y(d); })
				    .attr("height", function(d) { return height - y(d); })
				 	.on("mouseover", tip.show)
					.on("mouseout", tip.hide);

	// create plot title
    svg.append("text")
       .attr("id", "PlotTitle")
       .attr("y", -20)
       .attr("x", width / 4)
       .text("Total Slave Exports Between 1400-1900 (in zimbabwe..)")
}