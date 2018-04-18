dom = document.getElementById("rawdata").value;

/** dit voor multiline comments **/
// dit voor enkele comments

/*
console.log al je dingen, maar console.log ook tconsole.log(typeof())
Je moet bijvoorbeeld bij de hoogste temp ook zeker weten dat je niet op strings zoekt
Dus zorg dat bij de max temp de temps niet strings zijn, maar values.
*/

var day_temp = dom.split("\n");

var dateList = [];
var tempList = [];

for (var i = 0; i < day_temp.length; i++) {
	split_lines = day_temp[i].split(",");

	var d = split_lines[0];

	var year = d.substring(0, 4);
	var month = d.substring(4, 6);
	var day = d.substring(6);
	var date = new Date(year + "-" + month + "-" + day);
	
	dateList.push(date);
	
	tempList.push(Number(split_lines[1]));
};

console.log(typeof(dateList[0]));
console.log(typeof(tempList[0]));

//
//


var ctx = canvas.getContext('2d');




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