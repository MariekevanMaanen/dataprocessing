#!/usr/bin/env python
# Name: Marieke van Maanen 
# Student number: 10888640
"""
This script converts CSV content to a JSON file.
"""

import csv
import json

# open CSV file
with open("slave_exports.csv", "r") as f:
	reader = csv.DictReader(f)
	rows = list(reader)

# # create object of CSV content
# obj = {"data": rows}

# write CSV content to JSON file
with open("slave_exports.json", "w") as f:
	 json.dump(rows, f)