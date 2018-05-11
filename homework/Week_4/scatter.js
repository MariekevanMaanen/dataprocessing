/**
scatter.js

dataprocessing week 4
Marieke van Maanen
10888640

This file plots PM2.5 vs population density with renewable energy as third variable.
**/

window.onload = function() {
	GetData();
};

function GetData(error) {
	if (error) throw error;

	var data = "http://stats.oecd.org/SDMX-JSON/data/GREEN_GROWTH/AUT+BEL+CAN+CZE+DNK+FIN+FRA+DEU+ISL+IRL+ITA+NLD+NZL+NOR+POL+PRT+ESP+SWE+CHE+GBR.RE_NRG+PM_PWM+POPDEN/all?startTime=2000&endTime=2013&dimensionAtObservation=allDimensions";
	
	d3.queue()
  	.defer(d3.request, data)
  	.awaitAll(LoadData);
};




function LoadData(error, response) {
	if (error) throw error;
	
	var nr_years = 14;
	var nr_countries = 20;
	var nr_variables = 3;
	var obj = {};
	
	// select datasets
	var json = JSON.parse(response[0].responseText);
	

	// add variables per country per year
	for(var year = 0; year < nr_years; year++) {

		var list_country = [];
		
		for(var country = 0; country < nr_countries; country++) {

			var datapoint = {};
			
			for(var variables = 0; variables < nr_variables; variables++) {
			
				var variables_data = json.dataSets[0].observations[country + ":" + variables + ":" + year][0];
				
				datapoint[variables] = variables_data;

			}
			
			list_country.push(datapoint);
			
		}

		obj[year] = list_country;

	};

	// define countries for data
	var countries = [];
	for(country = 0; country < nr_countries; country++) {
		var country_name = (json.structure.dimensions.observation[0]["values"][country]["name"]);
      	countries.push(country_name);
	}

	MakeScatter(obj, countries)

};




function MakeScatter(dataset, countries) {
	
	// add text elements for scatterplot
	d3.select("head").append("title")
							.text("Scatterplot about PM2.5 exposure");

	// set dimensions for bargraph
	var margin = {top: 40, right: 200, bottom: 50, left: 200},
    	width = 1000 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom,
    	padding = 10,
    	min_dot_size = 3,
    	max_dot_size = 13;


	// get svg element
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// create scale for x and y-axis
	var x = d3.scaleLinear()
						.domain([0, d3.max(dataset["0"], function(d) { return d["1"]; })])
						.range([padding, width - padding]);


	var y = d3.scaleLinear()
						.domain([0, d3.max(dataset["0"], function(d) { return d["2"]; })])
						.range([height, 0]);

	// create scale for radii
	var radii = d3.scaleLinear()
						.domain([0, d3.max(dataset["0"], function (d) { return d["0"]; })])			
						.range([min_dot_size, max_dot_size]);

	// create x and y-axis
	svg.append("g")
	      .attr("class", "axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));

  	svg.append("g")
  		.attr("class", "axis")
      	.call(d3.axisLeft(y));

	// text labels for x and y-axis
	svg.append("text")
			.attr("transform", "translate(" + (width / 2) + " ," + (height + 4 * padding) + ")")
			.text("Population Density (inhabitants per km2)")
			.style("text-anchor", "middle");

	svg.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", - padding * 6)
		    .attr("x",- height / 2)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .text("Mean population exposure to PM2.5");

	// create plot title
    svg.append("text")
       .attr("id", "PlotTitle")
       .attr("y", padding)
       .attr("x", width / 3)
       .text("PM2.5 vs Population Density")

	// get color scheme
	var color = d3.scaleOrdinal(d3.schemeCategory20b);

	// define d3 tooltip			
    var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d, i) { return countries[i] + ":" + "<br>" + "Renewable electricity: " + d["0"] + "% total electricity generation"; });
    
    svg.call(tool_tip);

    // create circles
    svg.selectAll("circle")
        .data(dataset["0"])
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d[1]); })
        .attr("cy", function(d) { return y(d[2]); })
        .attr("r", function(d) { return radii(d[0]); })
        .attr("class", "dot")
        .style("fill", function(d) { return color(d["0"]); })
		.on('mouseover', tool_tip.show)
      	.on('mouseout', tool_tip.hide);

    // create legend
    var legend = svg.selectAll(".legend")
	                .data(color.domain())
	                .enter()
	                .append("g")
	                .attr("class", "legend")
	                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	// draw legend colored rectangles
    legend.append("rect")
                .attr("x", width)
                .attr("y", -20)
                .attr("width", 15)
                .attr("height", 15)
                .style("fill", color);

    // add text to legend
    legend.append("text")
                .attr("x", width + 2 * padding)
                .attr("y", -13)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .style("font-size", "13px")
                .data(countries)
                .text(function(d) { return d; });

    // update scatterplot
	d3.selectAll(".year")
		       	.on("click", function() {
		       	var value = this.getAttribute("value");
		       	var update_data;

				if (value == "2000") {
                	update_data = dataset[0]
	            };
	            if (value == "2001") {
	              	update_data = dataset[1]
	            };
	            if (value == "2002") {
	              	update_data = dataset[2]
	            };
	            if (value == "2003") {
	              	update_data = dataset[3]
	            };
	            if (value == "2004") {
	              	update_data = dataset[4]
	            };
	            if (value == "2005") {
	              	update_data = dataset[5]
	            };
	            if (value == "2006") {
	              	update_data = dataset[6]
	            };
	            if (value == "2007") {
	              	update_data = dataset[7]
	            };
	            if (value == "2008") {
	              	update_data = dataset[8]
	            };
	            if (value == "2009") {
	              	update_data = dataset[9]
	            };
	            if (value == "2010") {
	              	update_data = dataset[10]
	            };
	            if (value == "2011") {
	              	update_data = dataset[11]
	            };
	            if (value == "2012") {
	              	update_data = dataset[12]
	            };
	            if (value == "2013") {
	            	update_data = dataset[13]
	            };

		// rescale x-axis, y-axis and radii
		var x = d3.scaleLinear()
					.domain([0, d3.max(update_data, function(d) { return d[1]; })])
					.range([padding, width - padding]);


		var y = d3.scaleLinear()
					.domain([0, d3.max(update_data, function(d) { return d[2]; })])
					.range([height, 0]);

		// create scale for radii
		var radii = d3.scaleLinear()
					.domain([0, d3.max(update_data, function (d) { return d[0]; })])			
					.range([min_dot_size, max_dot_size]);


	    // update circles
	    svg.selectAll("circle")
	        .data(update_data)
	        .transition()
	        .duration(2000)
	        .attr("cx", function(d) { return x(d[1]); })
	        .attr("cy", function(d) { return y(d[2]); })
	        .attr("r", function(d) { return radii(d[0]); })
	        .style("fill", function(d) { return color(d["0"]); })
			.on('mouseover', tool_tip.show)
	      	.on('mouseout', tool_tip.hide);

	    // update x and y-axis
	    svg.select("axis")
	        .transition()
	        .duration(500)
	        .call(d3.axisBottom(x));

	    svg.select("axis")
	        .transition()
	        .duration(500)
	        .call(d3.axisLeft(y));
	});

};