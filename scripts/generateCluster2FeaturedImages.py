import os
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1280, 720
out_dir = r'e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2\public\generated-images'
os.makedirs(out_dir, exist_ok=True)

font_bold_path = r'C:\Windows\Fonts\segoeuib.ttf'
font_reg_path = r'C:\Windows\Fonts\segoeui.ttf'

title_font = ImageFont.truetype(font_bold_path, 44)
badge_font = ImageFont.truetype(font_bold_path, 16)
footer_font = ImageFont.truetype(font_reg_path, 15)

posts = [
    {
        'slug': 'scaling-qdrant-vector-database-to-10-million-embeddings',
        'title': 'Scaling Qdrant to 10M Embeddings on Vultr VPS',
        'badge': 'VECTOR DATABASE & VPS BENCHMARK'
    },
    {
        'slug': 'corrective-rag-crag-blueprint-n8n-tavily-fallback',
        'title': 'Corrective RAG CRAG Blueprint: n8n & Tavily',
        'badge': 'ADVANCED RAG BLUEPRINT'
    },
    {
        'slug': 'automated-pdf-document-chunking-vectorization-n8n',
        'title': 'Automated PDF Document Chunking in n8n Guide',
        'badge': 'WORKFLOW AUTOMATION'
    },
    {
        'slug': 'building-an-enterprise-knowledge-graph-rag-n8n',
        'title': 'Enterprise Knowledge Graph RAG in n8n Blueprint',
        'badge': 'ENTERPRISE AI ARCHITECTURE'
    }
]

def create_image(post):
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#070B14')
    draw = ImageDraw.Draw(img)

    cx, cy = WIDTH // 2, HEIGHT // 2

    # Subtle grid lines
    grid_color = (20, 35, 65)
    for x in range(0, WIDTH, 40):
        draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(0, HEIGHT, 40):
        draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)

    # Card box
    card_margin_x, card_margin_y = 90, 70
    card_box = [card_margin_x, card_margin_y, WIDTH - card_margin_x, HEIGHT - card_margin_y]
    
    draw.rounded_rectangle(card_box, radius=24, fill=(11, 18, 38), outline=(56, 189, 248), width=2)

    # Badge
    badge_text = post['badge']
    bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    tw = bbox[2] - bbox[0]
    pill_w = tw + 40
    pill_h = 36
    pill_x = cx - pill_w // 2
    pill_y = card_margin_y + 40
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=18, fill=(16, 42, 77), outline=(56, 189, 248), width=1)
    draw.text((pill_x + 20, pill_y + 8), badge_text, fill=(56, 189, 248), font=badge_font)

    # Title text wrapping
    title = post['title']
    words = title.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        w = draw.textbbox((0, 0), test_line, font=title_font)[2] - draw.textbbox((0, 0), test_line, font=title_font)[0]
        if w > (WIDTH - 300) and current_line:
            lines.append(' '.join(current_line))
            current_line = [word]
        else:
            current_line.append(word)
    if current_line:
        lines.append(' '.join(current_line))

    total_text_h = len(lines) * 58
    start_y = cy - (total_text_h // 2) + 20

    for i, line in enumerate(lines):
        line_bbox = draw.textbbox((0, 0), line, font=title_font)
        lw = line_bbox[2] - line_bbox[0]
        lx = cx - lw // 2
        ly = start_y + i * 58
        draw.text((lx + 2, ly + 2), line, fill=(0, 0, 0), font=title_font)
        draw.text((lx, ly), line, fill=(255, 255, 255), font=title_font)

    footer_text = 'WHOISALFAZ.ME | ARCHITECTURE & BLUEPRINTS'
    f_bbox = draw.textbbox((0, 0), footer_text, font=footer_font)
    fw = f_bbox[2] - f_bbox[0]
    draw.text((cx - fw // 2, HEIGHT - card_margin_y - 45), footer_text, fill=(148, 163, 184), font=footer_font)

    filepath = os.path.join(out_dir, f"{post['slug']}-featured.jpg")
    img.save(filepath, quality=95)
    print(f"Generated: {filepath}")

for post in posts:
    create_image(post)
