#!/usr/bin/env python
# Name: Marieke van Maanen 
# Student number: 10888640
"""
This script converts CSV content to a JSON file.
"""

import csv
import json

# open CSV file
with open("polar_ice_cap.csv", "r") as f:
	reader = csv.DictReader(f)
	rows = list(reader)

# create object of CSV content
obj = {"data": rows}

# write CSV content to JSON file
with open("polar_ice_cap.json", "w") as f:
	 json.dump(obj, f)