/**
temp1963.js

Data Processing Week 2
Marieke van Maanen
10888640

Line graph of the average temperature in De Bilt in 2001.
**/

function reqListener () {
	// get rawdata of average temperature of 1963
	var rawdata = this.responseText;

	//create array of dates and temperatures with a maximum of 365 days
	var day_temp = rawdata.split("\n", 365);

	var dateList = [];
	var tempList = [];

	// iterate over date and temperature list
	for (var i = 0; i < day_temp.length; i++) {
		
		// split date and temperature
		var split_lines = day_temp[i].split(",");
		
		// convert yyyymmdd format to yyyy-mm-dd
		var d = split_lines[0].trim();
		var year = d.substring(0,4);
		var month = d.substring(4,6);
		var day = d.substring(6);

		// store date into date list
		var date = new Date(year + "-" + month + "-" + day);
		dateList.push(date);

		// store temperature into temperature list
		tempList.push(Number(split_lines[1]));
	};

	function createTransform(domain, range){
		// domain is a two-element array of the data bounds [domain_min, domain_max]
		// range is a two-element array of the screen bounds [range_min, range_max]
		// this gives you two equations to solve:
		// range_min = alpha * domain_min + beta
		// range_max = alpha * domain_max + beta
	 	// a solution would be:

	    var domain_min = domain[0]
	    var domain_max = domain[1]
	    var range_min = range[0]
	    var range_max = range[1]

	    // formulas to calculate the alpha and the beta
	   	var alpha = (range_max - range_min) / (domain_max - domain_min)
	    var beta = range_max - alpha * domain_max

	    // returns the function for the linear transformation (y= a * x + b)
	    return function(x){
	      return alpha * x + beta;
	    }
	}

	// get minimum and maximum temperature
	var minTemp = Math.min(...tempList);
	var maxTemp = Math.max(...tempList);

	// get first and latest dates in milisec
	var minDate = Math.min(...dateList);
	var maxDate = Math.max(...dateList);

	// set screen properties
	var minHeight = 50;
	var maxHeight = 250;
	var minWidth = 50;
	var maxWidth = 550;

	var temperatures = [];
	var temp_transformation = createTransform([maxTemp, minTemp], [minHeight, maxHeight]);
		
	for (i = 0; i < tempList.length; i++) {
		var temp = temp_transformation(tempList[i]);

		temperatures.push(temp);
	}

	var dates = [];
	var date_transformation = createTransform([minDate, maxDate], [minWidth, maxWidth]);

	for (i = 0; i < dateList.length; i++) {
		var date = date_transformation(dateList[i].getTime());

		dates.push(date);
	}

	// get and set canvas properties
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 580;
	canvas.height = 310;

	// Labels for line graph
	var year = 2001;
	var title = "Average temperature De Bilt (2001)";
	var x_axis = "Time of year (in months)"
	var y_axis = "Temperature (C)"
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
	              "Sep", "Oct", "Nov", "Dec"];

	// draw graph title
	ctx.font = "16pt Arial";
	ctx.fillText(title, 120 , 20);

	// draw x axis
	ctx.beginPath();
	ctx.moveTo(minWidth, maxHeight);
	ctx.lineTo(maxWidth, maxHeight);
	ctx.stroke();

	// draw x-axis label
	ctx.font = "12pt Arial"
	ctx.fillText(x_axis, 200, 300)

	// draw y axis
	ctx.beginPath();
	ctx.moveTo(minWidth, minHeight);
	ctx.lineTo(minWidth,maxHeight);
	ctx.stroke();

	// draw rotated y-axis label
	ctx.save();
	ctx.font = "12pt Arial";
	ctx.translate(15, 200)
	ctx.rotate(-Math.PI / 2);
	ctx.fillText(y_axis, 0, 0);
	ctx.restore();

	// draw stripes and month labels on x-axis
	ctx.beginPath();
	month_period = [];

	// iterate over days, increasing with 1 month (± 31 days)
	for (var i = 0; i <= 365; i+=31) {
		var m = date_transformation(dateList[i].getTime());

		// store months coordinates in a list
		month_period.push(m)

		// draw stripes for every month
		ctx.moveTo(m, 250)
		ctx.lineTo(m, 255)
	}

	// draw month labels on x-axis
	for (var i = 0; i < months.length; i++) {
		ctx.font = "8pt Arial";
		ctx.fillText(months[i], month_period[i] + 11, 270)
	}
	ctx.stroke();

	// set year at the beginning of the x-axis
	ctx.save();
	ctx.font = "8pt Arial";
	ctx.translate(30, 290)
	ctx.rotate(-Math.PI / 3);
	ctx.fillText(year, 5, 5);
	ctx.restore();

	// draw stripes and temperature scaling on y-axis
	ctx.beginPath();

	// iterate over temperature
	for (var i = -50; i <= maxTemp; i+=50) {
		var n = temp_transformation(i);

		// draw stripes for temperatures with interval of 5 degrees
		ctx.moveTo(50, n)
		ctx.lineTo(45, n)

		ctx.font = "8pt Arial";
		ctx.fillText(i/10, 25, n + 3);
	}
	ctx.stroke();


	ctx.beginPath();

	// iterate over dates and temperatures for each day
	for(var i = 0; i < dates.length; i++)
	{
		var x = dates[i];
		var y = temperatures[i];
		ctx.lineTo(x, y);
	}
	ctx.stroke();
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
