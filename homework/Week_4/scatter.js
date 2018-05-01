/**
scatter.js

dataprocessing week 4
Marieke van Maanen
10888640

This file creates a bar graph about the extent of arctic ice sea from 2002-2015.
**/

window.onload = function() {
	console.log("Yes, you can!")


};

//function GetData(error) {
	//if (error) throw error;

	// forest felling and increment
	//var felling = "http://stats.oecd.org/SDMX-JSON/data/FOREST/FELL_TOT+FELL_SALV+NET_FELL+LOSSES+GINCR+NINCR+CHANGE+INT_USE.AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+NMEC+COL+CRI+LTU+RUS/all?startTime=2008&endTime=2016&dimensionAtObservation=allDimensions"
	//var increment = "http://stats.oecd.org/SDMX-JSON/data/FOREST/FELL_TOT+FELL_SALV+NET_FELL+LOSSES+GINCR+NINCR+CHANGE+INT_USE.AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+NMEC+COL+CRI+LTU+RUS/all?startTime=2008&endTime=2016&dimensionAtObservation=allDimensions"

	var data = "http://stats.oecd.org/SDMX-JSON/data/GREEN_GROWTH/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.RE_NRG+PM_PWM+POPDEN/all?startTime=2000&endTime=2013&dimensionAtObservation=allDimensions";

	d3.queue()
  	.defer(d3.request, data)
  	.awaitAll(LoadData);
//}

function LoadData(error, response) {
	if (error) throw error;

	var nr_years = 17;
	var nr_countries = 26;

	// create empty arrays for data
	var felling_per_country = [];
	var increment_per_country = [];

	// select datasets
	var json_felling = JSON.parse(response[0].responseText);
	var json_increment = JSON.parse(response[1].responseText);
	console.log(json_felling)

	// iterate over years and add data for every year and country	
	for(country = 0; country < nr_countries; country++) {

		var select_country = [];

			for(year = 0; year < nr_years; year++) {
		
			var data_felling = (json_felling["dataSets"]["0"]["observations"][country + ":0" + year][0])
			select_country.push(data_felling)
		}
		felling_per_country.push(select_country);
	}

	for(country = 0; country < nr_countries; country++) {

		var select_country = [];

			for(year = 0; year < nr_years; year++) {
		
			var data_felling = json_felling["dataSets"]["0"]["observations"][country + ":0" + year][0]
			select_country.push(data_felling)
		}
		increment_per_country.push(select_country);
	}

	console.log(increment_per_country)

}


function MakeScatter(error, data) {
	if (error) throw error;

	console.log(data)


}

