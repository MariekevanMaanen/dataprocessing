/**
scatter.js

dataprocessing week 4
Marieke van Maanen
10888640

This file creates a bar graph about the extent of arctic ice sea from 2002-2015.
**/

window.onload = function() {
	GetData();
};

function GetData(error) {
	if (error) throw error;

	var data = "http://stats.oecd.org/SDMX-JSON/data/GREEN_GROWTH/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.RE_NRG+PM_PWM+POPDEN/all?startTime=2000&endTime=2013&dimensionAtObservation=allDimensions";
	
	d3.queue()
  	.defer(d3.request, data)
  	.awaitAll(LoadData);
};




function LoadData(error, response) {
	if (error) throw error;

	var nr_years = 14;
	var nr_countries = 34;
	var nr_variables = 3;
	var obj = {};
	
	// select datasets
	var json = JSON.parse(response[0].responseText);


	// iterate over years and add data for every year and country per topic	
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

	console.log(obj);
	MakeScatter(obj)

};




function MakeScatter(dataset) {
	//if dataset does not exist, geef foutmelding

	console.log(dataset)

	// set dimensions for bargraph
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
    	width = 760 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;


	// get svg element
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.selectAll("circle")
			   .data(dataset[0])
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {return d[0];})
			   .attr("cy", function(d) {return d[1];})
			   .attr("r", 5);
			   //.attr("r", function(d) {return Math.sqrt(height - d[0]);});


}

