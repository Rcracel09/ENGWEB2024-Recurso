import json
import ast

# Path to your JSON file
file_path = 'dataset.json'

# Read the JSON data from the file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Define a function to convert string lists to actual lists
def convert_string_lists(item):
    keys_to_convert = ['genres', 'characters', 'awards', 'ratingsByStars', 'setting']
    for key in keys_to_convert:
        if key in item and isinstance(item[key], str):
            # Safely evaluate the string to a Python list
            try:
                item[key] = ast.literal_eval(item[key])
            except (ValueError, SyntaxError):
                print(f"Skipping {key} due to evaluation error")
    return item

def tratarAutores(item):
    if 'author' in item and isinstance(item['author'], str):
        # Split the author string by commas (assuming authors are separated by commas)
        authors_list = item['author'].split(',')
        # Strip leading and trailing whitespace from each author
        authors_list = [author.strip() for author in authors_list]
        # Assign the authors list back to the item
        item['author'] = authors_list
    return item

# Process each item in the JSON data
for item in data:
    item = convert_string_lists(item)
    item = tratarAutores(item)    

new_file_path = 'datasetFinal.json'
# Write the updated JSON back to the file
with open(new_file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)

print("String lists have been converted to actual lists.")