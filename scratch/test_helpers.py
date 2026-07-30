import json
import re
import os

base_dir = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2"

def count_words(text):
    if not text:
        return 0
    return len(re.findall(r'\b\w+\b', text))

def clean_boilerplate(body):
    # Remove common boilerplate ending sentences if found
    boilerplates = [
        r"By establishing automated telemetry pipelines and event-driven n8n triggers, growth engineers eliminate manual operational friction while maintaining data integrity across core business tools\.",
        r"Deploying this automated system enables digital agencies and SaaS enterprises to optimize resource utilization, accelerate turnaround times, and sustain long-term revenue growth\."
    ]
    cleaned = body
    for bp in boilerplates:
        cleaned = re.sub(bp, "", cleaned, flags=re.MULTILINE)
    return cleaned.strip()

print("Helper functions defined successfully.")
