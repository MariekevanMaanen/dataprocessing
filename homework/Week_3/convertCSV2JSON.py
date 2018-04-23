#!/usr/bin/env python
# Name: Marieke van Maanen 
# Student number: 10888640
"""
This script converts CSV content to a JSON file.
"""

import csv
import json

# open CSV file
with open("population_south_america.csv", "r") as f:
	reader = csv.DictReader(f)
	rows = list(reader)
	print(rows)


# write CSV content to JSON file
with open("population_south_america.json", "w") as f:
	json.dump(rows, f)
	

# csvfile = open("population_south_america.csv", "r")
# jsonfile = open("population_south_america.json", "w")

# names = ("Country", "Population in 2018")
# reader = csv.DictReader(csvfile, names)
# for row in reader:
# 	json.dump(row, jsonfile)
# 	jsonfile.write("\n")

# csvfile.close()
# jsonfile.close()