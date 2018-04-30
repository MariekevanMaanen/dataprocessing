/**
scatter.js

dataprocessing week 4
Marieke van Maanen
10888640

This file creates a bar graph about the extent of arctic ice sea from 2002-2015.
**/

window.onload = function() {

  console.log('Yes, you can!')
};
		//						de website / json wil je  / verzoek voor info
//var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
//var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"

// raw broccoli, leek, endive, asparagus, cauliflower, iceberg lettuce, carrots and spinach
var vegetables = ["https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11090",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11246",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11213",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11011",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11135",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11252",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11124",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=11457"]

/*var meat = ["https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009",
					"https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx&nutrients=208&nutrients=203&ndbno=01009"]*/


var food = "https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=json&api_key=tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx"

console.log(vegetables)
// api key = tkiNnoFu03qCb2HkvCCyLsS0XMEfShQ0jVAfcOEx
