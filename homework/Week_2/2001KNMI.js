/**
temp1963.js

Data Processing Week 2
Marieke van Maanen
10888640

Line graph of the average temperature in De Bilt in 2001.
**/

function reqListener () {
	function createTransform(domain, range){
		/**
		transformation of raw data to canvas coordinate system to draw graphs
		domain is a two-element array of the data bounds [domain_min, domain_max]
		range is a two-element array of the screen bounds [range_min, range_max]
	 	**/

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

	// get rawdata of average temperature of 2001
	var raw_data = this.responseText;

	//create array of dates and temperatures with a maximum of 365 days
	var day_temp = raw_data.split("\n", 365);

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

	// get minimum and maximum temperature
	var minTemp = Math.min(...tempList);
	var maxTemp = Math.max(...tempList);

	// get first and latest date
	var minDate = Math.min(...dateList);
	var maxDate = Math.max(...dateList);

	// set screen properties
	var minHeight = 50;
	var maxHeight = 250;
	var minWidth = 50;
	var maxWidth = 550;

	// transform temperature coordinates and store them in new list
	var temperatures = [];
	var temp_transformation = createTransform([maxTemp, minTemp], [minHeight, maxHeight]);
		
	for (i = 0; i < tempList.length; i++) {
		var temp = temp_transformation(tempList[i]);

		temperatures.push(temp);
	}

	// transform date coordinates and store them in new list
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

	// draw x-axis including label
	ctx.beginPath();
	ctx.moveTo(minWidth, maxHeight);
	ctx.lineTo(maxWidth, maxHeight);
	ctx.stroke();
	ctx.font = "12pt Arial"
	ctx.fillText(x_axis, 200, 300)

	// draw y-axis
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

	// draw marks and month labels on x-axis
	ctx.beginPath();
	month_duration = [];

	// devide days in months (31 days per month)
	for (var i = 0; i <= 365; i+=31) {
		var m = date_transformation(dateList[i].getTime());

		// store months coordinates in a list
		month_duration.push(m)

		// draw marks for every month
		ctx.moveTo(m, 250)
		ctx.lineTo(m, 255)
	}

	// draw month labels on x-axis
	for (var i = 0; i < months.length; i++) {
		ctx.font = "8pt Arial";
		ctx.fillText(months[i], month_duration[i] + 11, 270)
	}
	ctx.stroke();

	// set year diagonally at the beginning of the x-axis
	ctx.save();
	ctx.font = "8pt Arial";
	ctx.translate(30, 290)
	ctx.rotate(-Math.PI / 3);
	ctx.fillText(year, 5, 5);
	ctx.restore();

	// draw marks and temperature scaling on y-axis
	ctx.beginPath();

	// lowest value on y-axis in 0.1 degrees celsius
	var start_y_axis = -50;

	// set temperature marks in steps of 50 (scale 0.1)
	for (var i = start_y_axis; i <= maxTemp; i+=50) {
		var n = temp_transformation(i);

		// draw marks for temperatures with interval of 5 degrees
		ctx.moveTo(50, n)
		ctx.lineTo(45, n)

		//converts temperature in 0.1 degrees celsius to 1
		var convert_celcius = i / 10;

		ctx.font = "8pt Arial";
		ctx.fillText(convert_celcius, 25, n + 3);
	}
	ctx.stroke();

	// draw line grapgh of average temperature of each day
	ctx.beginPath();

	// corrects for difference between minimum temperature and first y-axis value
	var correction = start_y_axis - minTemp;
	
	// iterate over dates and temperatures for each day
	for(var i = 0; i < dates.length; i++)
	{
		var x = dates[i];
		var y = temperatures[i];
		ctx.lineTo(x, y + correction);
	}
	ctx.stroke();

	// draw dashed line of 0 degrees celsius
	ctx.beginPath();
	ctx.strokeStyle='red';
	ctx.setLineDash([5,5]);
	ctx.moveTo(minWidth, temp_transformation(0));
	ctx.lineTo(maxWidth, temp_transformation(0));
	ctx.stroke();
}

// request to get data from browser
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://raw.githubusercontent.com/MariekevanMaanen/dataprocessing/master/homework/Week_2/rawdata.txt");
oReq.send();
