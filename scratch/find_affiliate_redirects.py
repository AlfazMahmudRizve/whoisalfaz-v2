with open('next.config.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines, 1):
    if '/go/' in line or 'destination:' in line and 'http' in line:
        print(f"Line {idx}: {line.strip()}")
