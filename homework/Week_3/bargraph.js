/**
dataprocessing week 3
Marieke van Maanen
10888640

This file creates a bar chart about slave trades in Africa using the D3 library.
**/

// create array for json data
var country = [];
var slave_trades = [];

d3.json("slave_exports.json", function(data) {
	// iterate over the data and push elements to the right array
  	for (var i = 0; i < data.length; i++) {
		country.push(data[i].Country);
    	slave_trades.push(data[i].all_slave_trades);
	}

	console.log(country, slave_trades);


});