/**
bargraph.js

dataprocessing week 3
Marieke van Maanen
10888640

This file creates a bar graph about the extent of arctic ice sea from 2002-2015.
**/

// add text elements for bargraph
d3.select("head").append("title")
						.text("Arctic Sea Ice from 2002-2015");

d3.select("body").append("h1")
						.text("Arctic Sea Ice from 2002-2015");

d3.select("body").append("h3")
						.text("Marieke van Maanen (10888640)");					

d3.select("body").append("p")
						.text("Arctic sea ice occupies an ocean basin mostly enclosed by land. \
							Because the ocean basin is surrounded by land, ice has limited \
							freedom of movement to drift into lower latitudes and melt. \
							However, many global climate models predict that the Arctic \
							will be ice free for at least part of the year before the end \
							of the 21st century due to global warming. In this bar graph \
							you will find the average minimum extent of arctic ice in \
							millions of km2 from 2002-2015.");	


// load json file
d3.json("polar_ice_cap.json", function(error, data) {
	if (error) {
		return console.warn(error);
	}
	DrawGraph(data);

});

function DrawGraph(dataset) {
/**
	Draw bar graph
**/

	// set dimensions for bargraph
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
    	width = 760 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom,
		data_length = dataset.data.length,
		barPadding = 1,
		padding = 25;

	// get svg element
	var svg = d3.select("body").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define d3 tooltip			
	var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10, 0])
			  .html(function(d) {
			    return "<span style='color:white'>" + d.extent + "</span><strong style='color:white'> millions of km2</strong> ";
			  });
	
	// call tooltip on svg
	svg.call(tip);    

	// variables for first and latest year from dataset		  
	var first_year = d3.min(dataset.data, function(d) {return d.year});
	var last_year = d3.max(dataset.data, function(d) {return d.year});

	// create scale for x and y-axis
	var x = d3.scale.linear()
						.domain([first_year, last_year])
						.range([padding, width - padding]);
	

	var y = d3.scale.linear()
						.domain([0, d3.max(dataset.data, function(d) { return d.extent; })])
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
						.text("Year")
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
					    .text("Average Minimum Extent of Artic Sea Ice(millions of km2)")
            			.style("font-size", "13px")
            			.style("font-weight", "bold");
            			
    // create rectangles       			
	var rects = svg.selectAll(".bar")
				    .data(dataset.data)
					.enter()
					.append("rect")
					.attr("class", "bar")
					.attr("x", function(d, i) { return i * (width / data_length); })
				    .attr("width", width / data_length - barPadding )
				    .attr("y", function(d) { return y(d.extent); })
				    .attr("height", function(d) { return height - y(d.extent); })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide);






};


