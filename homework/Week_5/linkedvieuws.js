/**
linkedvieuws.js

dataprocessing week 5 & 6
Marieke van Maanen
10888640

This file supports index.html.
It shows a linked view with a map of Africa and a corresponding barchart
about slave exports in Africa between 1400-1900.
**/

window.onload = function() {
/**
	Loads data files into this file and parses them to makeMap and makeBar function.
**/
	
	// loads all data files before parsing to functions
	d3.queue()
  	.defer(d3.json, "exports_per_country.json")
  	.defer(d3.json, "total_exports_per_country.json")
  	.defer(d3.json, "exports_africa.json")
  	.awaitAll(function (error, response) {
  		if (error) throw error;

  		makeMap(response);
  		makeBar(response);
  	});	
};


function makeMap(response) {
/**
	Loads a world map zoomed in on Africa
**/
	
	// select required data
	var exports_per_country = response[1]["total_exports"];

	// draws map according data
    var map = new Datamap({
			element: document.getElementById('container_map'),
			scope: "world",
			data: exports_per_country,
			
			done: function(datamap) {
	            
				// parse country data to update function if data is available 
	            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
	                var location = geography.id;
	                
	                // update bar graph title
	                if ((exports_per_country[location]) == null) {
                    	console.log("No Data Available for this Country")
                	}
                	
                	else {
	                	d3.selectAll("#plotTitle")
	                					.text("Slave Exports in " + geography.properties.name + " (1400-1900)")
	                	
	                	update(location, response);
	            	};
	            });
        	},

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

			// colours country according to number of slave exports
			fills: {
				"0": "#fdd0a2", 
				"1-1,000": "#fdae6b",
				"1,000-10,000": "#fd8d3c",
				"10,000-100,000": "#f16913",
				"100,000-1 million": "#d94801",
				"1 million <": "#8c2d04",
				defaultFill: "whitesmoke"
			},

			// geography configuration
			geographyConfig: {
				borderColor: "lightgrey",
				popupOnHover: true,
				highlightOnHover: true,
				highlightFillColor: "#00555D",
				highlightBorderColor: "black",
				
				// shows tooltip when hovering over country
				popupTemplate: function(geo, data) {
	                if (!data) {
	                	return ['<div class="hoverinfo"><strong>',
	                        'Country: </strong>' + geo.properties.name,
	                        '</br>' + '<strong>No Data of Total Exports</strong>',
	                        '</div>'].join('');
	                }

	                	return ['<div class="hoverinfo"><strong>',
	                        'Country: </strong>' + geo.properties.name,
	                        '</br>' + '<strong>Total exports: </strong>',
	                        data.exports + '</div>'].join('');
	            }
		}
	});

	// add legend to map
    var legend = {
        legendTitle: "Number of Exports"
    }
    map.legend(legend)
};


function makeBar (dataset) {
/**
	Draws bar graph of total slave exports in Africa.
**/
	
	// select required data
	var total_exports = Object.values(dataset["2"]["0"]);


	// set dimensions for bargraph
	var margin = {top: 70, right: 30, bottom: 60, left: 100},
    	width = 560 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom,
		barPadding = 10,
		padding = 25;

	// get svg element
	var svg = d3.select("#container_bar")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define d3 tooltip			
	var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-5, 0])
			.html(function(d) {
				return "<strong>" + d + "</strong> Exports";
			});
	
	// call tooltip on svg
	svg.call(tip);

	// create scale for x and y-axis
	var x = d3.scale.ordinal()
					.domain(["Trans-Atlanctic", "Indian Ocean", "Trans-Saharan", "Red Sea"])
					.rangeRoundBands([0, width]);

	var y = d3.scale.linear()
					.domain([0, d3.max(total_exports, function(d) { return d; })])
					.range([height, 0]); 


	// define x and y-axis
    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

    var yAxis = d3.svg.axis()
	            .scale(y)
	            .orient("left");

	// generate x and y-axis
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
					    .attr("id", "y_axis")
					    .call(yAxis)
					.append("text")
						.attr("transform", "rotate(-90)")
					    .attr("y", - 80)
					    .attr("dy", ".8em")
					    .style("text-anchor", "end")
					    .text("Number of Slave Exports")
            			.style("font-size", "13px")
            			.style("font-weight", "bold");

   // create rectangles       			
	var rects = svg.selectAll(".bar")
				    .data(total_exports)
					.enter()
					.append("rect")
					.attr("class", "bar")
					.attr("x", function(d, i) { return i * (width / 4) + barPadding; })
				    .attr("width", width / 4 - barPadding )
				    .attr("y", function(d) { return y(d); })
				    .attr("height", function(d) { return height - y(d); })
				 	.on("mouseover", tip.show)
					.on("mouseout", tip.hide);
    
	// add plot title				
    svg.append("text")
       .attr("id", "plotTitle")
       .attr("y", -30)
       .attr("x", width / 2)
       .text("Total Slave Exports between 1400-1900")
       .style("font-size", "17px")
       .style("text-anchor", "middle");
};



function update(location, dataset) {
/**
	Update data section when clicked on country.
**/

	// set dimensions for bargraph
	var margin = {top: 70, right: 30, bottom: 60, left: 100},
    	width = 560 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom,
		barPadding = 10,
		padding = 25;

	// select required data	
	var slave_exports = dataset["0"]["exports"];

    // define d3 tooltip			
	var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-5, 0])
			  .html(function(d) {
			    return "<strong>" + d + "</strong> Exports";
			  });
	
	// select corresponding svg
	var svg = d3.select("#container_bar")
				.select("svg");

	// call tooltip on svg
	svg.call(tip);

	// get ISO code from selected country
	var current_country = Object.values(slave_exports[location]);

	// create scale for x and y-axis
	var x = d3.scale.ordinal()
					.domain(["Trans-Atlanctic", "Indian Ocean", "Trans-Saharan", "Red Sea"])
					.rangeRoundBands([margin.left, width]);

	var y = d3.scale.linear()
					.domain([0, d3.max(current_country, function(d) { return d; })])
					.range([height, 0]); 

	// scale y-axis				
    var yAxis = d3.svg.axis()
	              .scale(y)
	              .orient("left");

	// remove current y-axis
	var remove_y = svg.selectAll("#y_axis")
						.remove();

	// draw new y-axis					
	var draw_y = svg.append("g")
				    .attr("class", "axis")
				    .attr("id", "y_axis")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				    .call(yAxis)
				.append("text")
					.attr("transform", "rotate(-90)")
				    .attr("y", - 80)
				    .attr("dy", ".8em")
				    .style("text-anchor", "end")
				    .text("Number of Slave Exports")
        			.style("font-size", "13px")
        			.style("font-weight", "bold");

    // remove current rectangles       			
	var rects_remove = svg.selectAll(".bar")
					.remove();

	// create new rectangles
	var rects = svg.selectAll(".bar").data(current_country)
					.enter()
					.append("rect")
					.attr("class", "bar")
					.attr("x", function(d, i) { return i * (width / 4) + margin.left + barPadding; })
				    .attr("width", width / 4 - barPadding )
				    .attr("y", function(d) { return y(d) + margin.top; })
				    .attr("height", function(d) { return height - y(d); })
				 	.on("mouseover", tip.show)
					.on("mouseout", tip.hide);

};

function reloadPage(data) {
/**
	Reloads page to show overall data of slave exports.
**/

    location.reload();
}

