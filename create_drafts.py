import json
import os
import re

# Helper function to count words
def count_words(text):
    return len(re.findall(r'\b\w+\b', text))

print("Script template ready.")
