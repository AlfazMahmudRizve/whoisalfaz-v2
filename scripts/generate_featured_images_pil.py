import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_tech_banner(title, category, output_path, width=1280, height=720, accent_color=(0, 229, 255)):
    # 1. Base Image with Dark Navy Gradient
    img = Image.new("RGBA", (width, height), (7, 10, 20, 255))
    draw = ImageDraw.Draw(img)

    # Radial background glow behind center
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    center_x, center_y = width // 2, height // 2
    for r in range(400, 0, -10):
        alpha = int((1 - r / 400.0) ** 2 * 60)
        color = (accent_color[0], accent_color[1], accent_color[2], alpha)
        glow_draw.ellipse([center_x - r * 1.5, center_y - r, center_x + r * 1.5, center_y + r], fill=color)

    glow = glow.filter(ImageFilter.GaussianBlur(30))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # 2. Subtle Tech Grid & Cyber Accents
    grid_color = (255, 255, 255, 10)
    grid_step = 40
    for x in range(0, width, grid_step):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, grid_step):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Glowing tech circuit lines
    acc_alpha = (accent_color[0], accent_color[1], accent_color[2], 120)
    draw.line([(100, 140), (300, 140), (350, 190)], fill=acc_alpha, width=2)
    draw.ellipse([95, 135, 105, 145], fill=accent_color)
    draw.ellipse([345, 185, 355, 195], fill=accent_color)

    draw.line([(width - 100, height - 140), (width - 300, height - 140), (width - 350, height - 190)], fill=acc_alpha, width=2)
    draw.ellipse([width - 105, height - 145, width - 95, height - 135], fill=accent_color)
    draw.ellipse([width - 355, height - 195, width - 345, height - 185], fill=accent_color)

    # 3. Translucent Center Card Frame
    card_margin_x = 100
    card_margin_y = 120
    card_box = [card_margin_x, card_margin_y, width - card_margin_x, height - card_margin_y]

    card = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    card_draw = ImageDraw.Draw(card)
    card_draw.rounded_rectangle(card_box, radius=24, fill=(13, 20, 38, 220), outline=(accent_color[0], accent_color[1], accent_color[2], 180), width=2)
    img = Image.alpha_composite(img, card)
    draw = ImageDraw.Draw(img)

    # 4. Fonts
    font_path = "C:\\Windows\\Fonts\\segoeuib.ttf" # Segoe UI Bold
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\arialbd.ttf"
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\arial.ttf"

    title_font_size = 52
    category_font_size = 22

    try:
        title_font = ImageFont.truetype(font_path, title_font_size)
        category_font = ImageFont.truetype(font_path, category_font_size)
    except Exception:
        title_font = ImageFont.load_default()
        category_font = ImageFont.load_default()

    # 5. Render Category Badge
    cat_text = category.upper()
    cat_bbox = category_font.getbbox(cat_text)
    cat_w = cat_bbox[2] - cat_bbox[0]
    cat_h = cat_bbox[3] - cat_bbox[1]
    
    badge_pad_x, badge_pad_y = 18, 8
    badge_x1 = (width - cat_w) // 2 - badge_pad_x
    badge_y1 = card_margin_y + 40
    badge_x2 = badge_x1 + cat_w + (badge_pad_x * 2)
    badge_y2 = badge_y1 + cat_h + (badge_pad_y * 2)

    badge = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    b_draw.rounded_rectangle([badge_x1, badge_y1, badge_x2, badge_y2], radius=12, fill=(accent_color[0], accent_color[1], accent_color[2], 40), outline=accent_color, width=1)
    img = Image.alpha_composite(img, badge)
    draw = ImageDraw.Draw(img)

    draw.text(((width - cat_w) // 2, badge_y1 + badge_pad_y - 2), cat_text, font=category_font, fill=accent_color)

    # 6. Title Text Wrapping
    def wrap_text(text, font, max_width):
        words = text.split()
        lines = []
        current_line = []
        for word in words:
            test_line = ' '.join(current_line + [word])
            bbox = font.getbbox(test_line)
            w = bbox[2] - bbox[0]
            if w <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
        if current_line:
            lines.append(' '.join(current_line))
        return lines

    max_text_width = width - (card_margin_x * 2) - 80
    lines = wrap_text(title, title_font, max_text_width)

    # Calculate Total Text Block Height
    line_heights = []
    line_widths = []
    for l in lines:
        bbox = title_font.getbbox(l)
        line_widths.append(bbox[2] - bbox[0])
        line_heights.append(bbox[3] - bbox[1])

    line_spacing = 18
    total_text_h = sum(line_heights) + (len(lines) - 1) * line_spacing

    start_y = badge_y2 + 40 + ((card_box[3] - badge_y2 - 40 - total_text_h) // 2)

    # Draw Title Lines with Soft Glow Drop Shadow
    shadow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)

    curr_y = start_y
    for i, l in enumerate(lines):
        lw = line_widths[i]
        lx = (width - lw) // 2
        # Text Glow Shadow
        s_draw.text((lx, curr_y + 4), l, font=title_font, fill=(0, 0, 0, 180))
        s_draw.text((lx + 2, curr_y + 2), l, font=title_font, fill=(accent_color[0], accent_color[1], accent_color[2], 100))
        curr_y += line_heights[i] + line_spacing

    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(4))
    img = Image.alpha_composite(img, shadow_img)
    draw = ImageDraw.Draw(img)

    curr_y = start_y
    for i, l in enumerate(lines):
        lw = line_widths[i]
        lx = (width - lw) // 2
        draw.text((lx, curr_y), l, font=title_font, fill=(255, 255, 255, 255))
        curr_y += line_heights[i] + line_spacing

    # Convert to RGB and Save
    final_rgb = img.convert("RGB")
    final_rgb.save(output_path, "PNG", quality=95)
    print(f"Generated 16:9 featured image banner: {output_path}")

if __name__ == "__main__":
    brain_dir = r"C:\Users\user\.gemini\antigravity\brain\94f3888a-edb4-4212-a944-113261815299"
    os.makedirs(brain_dir, exist_ok=True)

    posts = [
        {
            "slug": "the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n",
            "title": "Self-Hosted AI Stack 2026: Vultr & n8n Guide",
            "category": "AI Stack Blueprint 2026",
            "filename": "post4_ai_stack_2026.png",
            "accent": (0, 229, 255) # Cyan
        },
        {
            "slug": "pinecone-serverless-vs-qdrant-vultr-latency-benchmark",
            "title": "Pinecone vs Qdrant Vultr: RAG Latency Benchmark",
            "category": "Vector DB Latency Benchmark",
            "filename": "post5_pinecone_vs_qdrant.png",
            "accent": (168, 85, 247) # Purple
        },
        {
            "slug": "pinecone-namespaces-vs-qdrant-payload-filters-comparison",
            "title": "Pinecone Namespaces vs Qdrant Payload Filters",
            "category": "Vector Filtering Architecture",
            "filename": "post6_pinecone_qdrant_filter.png",
            "accent": (59, 130, 246) # Blue
        },
        {
            "slug": "hybrid-vector-keyword-search-qdrant-n8n-pipeline",
            "title": "Hybrid Vector & Keyword Search: Qdrant n8n SOP",
            "category": "Hybrid Search RAG Pipeline",
            "filename": "post7_hybrid_search_sop.png",
            "accent": (236, 72, 153) # Pink/Magenta
        }
    ]

    generated_items = []
    for item in posts:
        out_path = os.path.join(brain_dir, item["filename"])
        create_tech_banner(item["title"], item["category"], out_path, accent_color=item["accent"])
        generated_items.append((item["slug"], out_path))

    print("\nGeneration finished successfully.")
