import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_featured_image():
    bg_path = r"C:\Users\user\.gemini\antigravity\brain\80eec7d8-c70a-4b75-a6bd-88f5a5ec3db3\stripe_fintech_bg_1791578313009.jpg"
    out_dir = r"e:\Ai Agents\whoisalfaz.me\Web Projects\antigravity\whoisalfaz-v2\public\blog"
    os.makedirs(out_dir, exist_ok=True)
    out_png = os.path.join(out_dir, "how-stripe-quietly-takes-more-fees-featured.png")
    out_webp = os.path.join(out_dir, "how-stripe-quietly-takes-more-fees-featured.webp")

    # Target resolution: 1600 x 900 (standard 16:9)
    width, height = 1600, 900

    # 1. Base Image
    base = Image.open(bg_path).convert("RGBA")
    base = base.resize((width, height), Image.Resampling.LANCZOS)

    # Dark overlay / vignette for contrast
    vignette = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vignette)
    # Radial dark wash in center to ensure text legibility
    cx, cy = width // 2, height // 2
    for r in range(width // 2, 0, -20):
        factor = (r / (width / 2.0))
        alpha = int((1.0 - factor) * 110)
        v_draw.ellipse([cx - r, cy - int(r * 0.6), cx + r, cy + int(r * 0.6)], fill=(10, 15, 29, alpha))
    
    base = Image.alpha_composite(base, vignette)

    # 2. Translucent Frosted Glass Card in Center
    card_w, card_h = 1260, 560
    card_x1 = (width - card_w) // 2
    card_y1 = (height - card_h) // 2
    card_x2 = card_x1 + card_w
    card_y2 = card_y1 + card_h

    card = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card)

    # Subtle outer glow shadow behind card
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([card_x1 - 8, card_y1 - 8, card_x2 + 8, card_y2 + 8], radius=32, fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    base = Image.alpha_composite(base, shadow)

    # Card background: Deep slate navy with blur
    c_draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=28, fill=(10, 15, 30, 215), outline=(99, 91, 255, 140), width=2)
    base = Image.alpha_composite(base, card)

    draw = ImageDraw.Draw(base)

    # 3. Fonts Setup
    bold_font_path = "C:\\Windows\\Fonts\\segoeuib.ttf"
    reg_font_path = "C:\\Windows\\Fonts\\segoeui.ttf"
    sb_font_path = "C:\\Windows\\Fonts\\seguisb.ttf"

    font_badge = ImageFont.truetype(bold_font_path, 20)
    font_title1 = ImageFont.truetype(bold_font_path, 54)
    font_title2 = ImageFont.truetype(bold_font_path, 54)
    font_sub = ImageFont.truetype(sb_font_path, 34)
    font_footer = ImageFont.truetype(bold_font_path, 18)

    # 4. Top Pill Badge (Centered)
    badge_text = "STRIPE UNIT ECONOMICS & REVOPS"
    b_bbox = font_badge.getbbox(badge_text)
    bw = b_bbox[2] - b_bbox[0]
    bh = b_bbox[3] - b_bbox[1]
    
    pad_x, pad_y = 22, 10
    bx1 = (width - bw) // 2 - pad_x
    by1 = card_y1 + 45
    bx2 = bx1 + bw + (pad_x * 2)
    by2 = by1 + bh + (pad_y * 2)

    badge = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    b_draw.rounded_rectangle([bx1, by1, bx2, by2], radius=14, fill=(99, 91, 255, 45), outline=(0, 229, 255, 200), width=1)
    base = Image.alpha_composite(base, badge)
    draw = ImageDraw.Draw(base)
    draw.text(((width - bw) // 2, by1 + pad_y - 2), badge_text, font=font_badge, fill=(0, 229, 255, 255))

    # 5. Centered Main Titles
    line1 = "How Stripe Quietly Takes 3.4%"
    line2 = "Instead of 2.9%"
    subline = "(And the Math Behind It)"

    # Line 1 bbox
    l1_bbox = font_title1.getbbox(line1)
    l1_w = l1_bbox[2] - l1_bbox[0]
    l1_h = l1_bbox[3] - l1_bbox[1]
    l1_x = (width - l1_w) // 2
    l1_y = by2 + 35

    # Line 2 bbox
    l2_bbox = font_title2.getbbox(line2)
    l2_w = l2_bbox[2] - l2_bbox[0]
    l2_h = l2_bbox[3] - l2_bbox[1]
    l2_x = (width - l2_w) // 2
    l2_y = l1_y + l1_h + 24

    # Subline bbox
    sub_bbox = font_sub.getbbox(subline)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_h = sub_bbox[3] - sub_bbox[1]
    sub_x = (width - sub_w) // 2
    sub_y = l2_y + l2_h + 32

    # Draw Title Shadow for Depth
    title_shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ts_draw = ImageDraw.Draw(title_shadow)
    ts_draw.text((l1_x, l1_y + 4), line1, font=font_title1, fill=(0, 0, 0, 180))
    ts_draw.text((l2_x, l2_y + 4), line2, font=font_title2, fill=(0, 0, 0, 180))
    ts_draw.text((sub_x, sub_y + 3), subline, font=font_sub, fill=(0, 0, 0, 160))
    title_shadow = title_shadow.filter(ImageFilter.GaussianBlur(6))
    base = Image.alpha_composite(base, title_shadow)
    draw = ImageDraw.Draw(base)

    # Render Text Lines
    # Line 1: Pure crisp white
    draw.text((l1_x, l1_y), line1, font=font_title1, fill=(255, 255, 255, 255))
    
    # Line 2: Highlighted with electric cyan/violet accent
    draw.text((l2_x, l2_y), line2, font=font_title2, fill=(167, 139, 250, 255)) # Lilac Purple / Tailwind Violet 400
    
    # Subtitle: Clean silver gray
    draw.text((sub_x, sub_y), subline, font=font_sub, fill=(203, 213, 225, 255)) # Slate 300

    # 6. Bottom Brand Tag inside card
    foot_text = "WHOISALFAZ.ME  •  ENGINEERING TEARDOWN"
    f_bbox = font_footer.getbbox(foot_text)
    fw = f_bbox[2] - f_bbox[0]
    fx = (width - fw) // 2
    fy = card_y2 - 50
    draw.text((fx, fy), foot_text, font=font_footer, fill=(100, 116, 139, 230)) # Slate 500

    # 7. Convert and Save
    final_rgb = base.convert("RGB")
    final_rgb.save(out_png, "PNG", optimize=True)
    final_rgb.save(out_webp, "WEBP", quality=92)

    print(f"[OK] Generated PNG: {out_png}")
    print(f"[OK] Generated WebP: {out_webp}")

if __name__ == "__main__":
    create_featured_image()
