import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r"C:\Users\user\.gemini\antigravity\brain\44812473-e65f-4e5f-8db8-98f9a004ee7a"
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH = 1920
HEIGHT = 1080

def create_featured_image(slug, title, category_tag, tech_stack, filename):
    # 1. Base image with radial gradient
    img = Image.new("RGBA", (WIDTH, HEIGHT), (7, 11, 25, 255))
    
    # Create background glow layers
    glow_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Cyan glow top-left / center
    for r in range(400, 0, -5):
        alpha = int(35 * (1 - r / 400))
        glow_draw.ellipse([300 - r, 300 - r, 300 + r, 300 + r], fill=(0, 242, 254, alpha))
        
    # Purple glow bottom-right
    for r in range(450, 0, -5):
        alpha = int(40 * (1 - r / 450))
        glow_draw.ellipse([1600 - r, 800 - r, 1600 + r, 800 + r], fill=(127, 0, 255, alpha))

    # Blue central ambient glow
    for r in range(500, 0, -5):
        alpha = int(25 * (1 - r / 500))
        glow_draw.ellipse([960 - r, 540 - r, 960 + r, 540 + r], fill=(30, 58, 138, alpha))
        
    img = Image.alpha_composite(img, glow_layer)
    draw = ImageDraw.Draw(img)
    
    # 2. Tech grid overlay
    grid_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    
    grid_size = 80
    for x in range(0, WIDTH, grid_size):
        grid_draw.line([(x, 0), (x, HEIGHT)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, HEIGHT, grid_size):
        grid_draw.line([(0, y), (WIDTH, y)], fill=(255, 255, 255, 8), width=1)
        
    # Tech node dots at grid intersections
    for x in range(grid_size, WIDTH, grid_size * 2):
        for y in range(grid_size, HEIGHT, grid_size * 2):
            if (x + y) % 3 == 0:
                grid_draw.ellipse([x-2, y-2, x+2, y+2], fill=(0, 242, 254, 40))
                
    img = Image.alpha_composite(img, grid_layer)
    draw = ImageDraw.Draw(img)
    
    # 3. Glassmorphic Center Card
    card_margin_x = 240
    card_margin_y = 180
    card_box = [card_margin_x, card_margin_y, WIDTH - card_margin_x, HEIGHT - card_margin_y]
    
    card_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    card_draw = ImageDraw.Draw(card_layer)
    
    # Card fill (dark semi-transparent)
    card_draw.rounded_rectangle(card_box, radius=32, fill=(13, 22, 45, 210))
    # Border gradient simulation
    card_draw.rounded_rectangle(card_box, radius=32, outline=(0, 242, 254, 80), width=2)
    
    img = Image.alpha_composite(img, card_layer)
    draw = ImageDraw.Draw(img)
    
    # Fonts
    font_tag = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 28)
    font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 62)
    font_tech = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    
    # 4. Draw Category Tag Pill
    tag_text = category_tag.upper()
    tag_bbox = font_tag.getbbox(tag_text)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_h = tag_bbox[3] - tag_bbox[1]
    
    tag_padding_x = 28
    tag_padding_y = 12
    tag_x = 960 - (tag_w / 2)
    tag_y = 260
    
    pill_box = [
        tag_x - tag_padding_x,
        tag_y - tag_padding_y,
        tag_x + tag_w + tag_padding_x,
        tag_y + tag_h + tag_padding_y + 4
    ]
    draw.rounded_rectangle(pill_box, radius=20, fill=(0, 242, 254, 30), outline=(0, 242, 254, 180), width=1)
    draw.text((tag_x, tag_y), tag_text, fill=(0, 242, 254), font=font_tag)
    
    # 5. Draw Title Text (Word wrapped & centered)
    words = title.split()
    lines = []
    current_line = []
    
    max_title_width = 1300
    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = font_title.getbbox(test_line)
        if bbox[2] - bbox[0] <= max_title_width:
            current_line.append(word)
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))
        
    line_height = 80
    total_text_height = len(lines) * line_height
    start_y = 480 - (total_text_height / 2)
    
    for i, line in enumerate(lines):
        line_bbox = font_title.getbbox(line)
        line_w = line_bbox[2] - line_bbox[0]
        line_x = 960 - (line_w / 2)
        line_y = start_y + (i * line_height)
        
        # Subtle drop shadow
        draw.text((line_x + 3, line_y + 3), line, fill=(0, 0, 0, 180), font=font_title)
        # Main text
        draw.text((line_x, line_y), line, fill=(255, 255, 255), font=font_title)
        
    # 6. Draw Tech Stack Badges at Bottom of Card
    tech_text = " • ".join(tech_stack)
    tech_bbox = font_tech.getbbox(tech_text)
    tech_w = tech_bbox[2] - tech_bbox[0]
    tech_x = 960 - (tech_w / 2)
    tech_y = 780
    
    draw.text((tech_x + 2, tech_y + 2), tech_text, fill=(0, 0, 0, 150), font=font_tech)
    draw.text((tech_x, tech_y), tech_text, fill=(148, 163, 184), font=font_tech)
    
    # Save image
    out_path = os.path.join(OUTPUT_DIR, filename)
    img.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"Generated: {out_path}")
    return out_path

posts = [
    {
        "slug": "open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark",
        "title": "Open-Source LLM Embeddings: BGE vs Voyage RAG",
        "category": "RAG & Vector Search Benchmark",
        "tech": ["BGE-Large", "Voyage AI", "mxbai-embed", "n8n Workflow"],
        "filename": "post_12_featured.jpg"
    },
    {
        "slug": "dify-ai-vultr-gpu-docker-deployment-guide",
        "title": "Dify.ai Vultr GPU Docker Deployment Blueprint",
        "category": "Self-Hosted Infrastructure",
        "tech": ["Dify.ai", "Vultr GPU", "Docker Compose", "NVIDIA CUDA"],
        "filename": "post_13_featured.jpg"
    },
    {
        "slug": "dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes",
        "title": "Dify.ai vs n8n AI Agents: Architecture Guide",
        "category": "AI Agent Architecture",
        "tech": ["Dify Workflows", "n8n AI Nodes", "LangChain", "Autonomous Agents"],
        "filename": "post_14_featured.jpg"
    },
    {
        "slug": "semantic-search-api-n8n-qdrant-fastapi-bridge",
        "title": "Semantic Search API: n8n Qdrant FastAPI Guide",
        "category": "Vector API & Pipeline",
        "tech": ["FastAPI", "Qdrant Vector DB", "n8n Webhook", "Python Async"],
        "filename": "post_15_featured.jpg"
    }
]

for post in posts:
    create_featured_image(post["slug"], post["title"], post["category"], post["tech"], post["filename"])
