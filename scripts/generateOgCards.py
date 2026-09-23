import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_brand_og(output_path, title, subtitle, badge_text="GTM & REVOPS ARCHITECT"):
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), color=(10, 15, 29)) # #0a0f1d

    # Create gradient background
    draw = ImageDraw.Draw(img)

    # Ambient gradient glow (Teal top-left / purple bottom-right)
    glow_teal = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_teal)
    glow_draw.ellipse((-100, -100, 500, 500), fill=(13, 148, 136, 60)) # Teal glow
    glow_draw.ellipse((800, 200, 1400, 800), fill=(126, 34, 206, 50)) # Purple glow
    glow_teal = glow_teal.filter(ImageFilter.GaussianBlur(120))
    img.paste(glow_teal, (0, 0), glow_teal)

    # Re-obtain draw handle
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([(20, 20), (width - 20, height - 20)], outline=(30, 41, 59), width=2)
    draw.rectangle([(22, 22), (width - 22, height - 22)], outline=(15, 23, 42), width=1)

    # Fonts
    font_bold_lg = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 52)
    font_bold_md = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    font_mono = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 16)
    font_sans = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 14)

    # Brand header (Top Left)
    draw.text((70, 60), "whois", fill=(45, 212, 191), font=font_bold_md) # Teal-400
    whois_len = draw.textlength("whois", font=font_bold_md)
    draw.text((70 + whois_len, 60), "alfaz", fill=(192, 132, 252), font=font_bold_md) # Purple-400
    alfaz_len = draw.textlength("alfaz", font=font_bold_md)
    draw.text((70 + whois_len + alfaz_len, 60), ".me", fill=(45, 212, 191), font=font_bold_md)

    # Live Badge (Top Right)
    badge_x = 920
    draw.rounded_rectangle([(badge_x, 56), (1130, 92)], radius=18, fill=(15, 23, 42), outline=(45, 212, 191), width=1)
    draw.ellipse([(badge_x + 16, 70), (badge_x + 24, 78)], fill=(52, 211, 153)) # Green dot
    draw.text((badge_x + 34, 65), "VERIFIED CREATOR", fill=(241, 245, 249), font=font_badge)

    # Profile photo (Left middle)
    profile_path = "public/profile.jpg"
    if os.path.exists(profile_path):
        prof = Image.open(profile_path).convert("RGBA")
        prof_size = 200
        prof = prof.resize((prof_size, prof_size), Image.Resampling.LANCZOS)
        
        # Rounded mask
        mask = Image.new("L", (prof_size, prof_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([(0, 0), (prof_size, prof_size)], radius=36, fill=255)
        
        # Border ring
        draw.rounded_rectangle([(66, 156), (66 + prof_size + 8, 156 + prof_size + 8)], radius=40, fill=(30, 41, 59), outline=(45, 212, 191), width=2)
        img.paste(prof, (70, 160), mask)

    # Text content (Right of profile photo)
    text_x = 310
    draw.rounded_rectangle([(text_x, 155), (text_x + 260, 185)], radius=6, fill=(19, 78, 74), outline=(45, 212, 191), width=1)
    draw.text((text_x + 14, 161), badge_text, fill=(45, 212, 191), font=font_badge)

    draw.text((text_x, 205), title, fill=(255, 255, 255), font=font_bold_lg)
    draw.text((text_x, 275), subtitle, fill=(148, 163, 184), font=font_sans)

    # Capability tags (Horizontal pills)
    pills = ["n8n Workflow Automation", "Autonomous RevOps", "Next.js Architecture", "Technical SEO"]
    pill_x = 70
    pill_y = 410
    for pill in pills:
        pill_w = draw.textlength(pill, font=font_sans) + 32
        draw.rounded_rectangle([(pill_x, pill_y), (pill_x + pill_w, pill_y + 46)], radius=12, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((pill_x + 16, pill_y + 10), pill, fill=(226, 232, 240), font=font_sans)
        pill_x += pill_w + 14

    # Bottom footer telemetry bar
    draw.line([(70, 520), (1130, 520)], fill=(30, 41, 59), width=1)
    draw.text((70, 545), "SUB-SECOND EDGE LATENCY", fill=(45, 212, 191), font=font_mono)
    draw.text((410, 545), "ZERO-TOUCH INDEXING PIPELINES", fill=(192, 132, 252), font=font_mono)
    draw.text((820, 545), "SELF-HEALING ARCHITECTURE", fill=(148, 163, 184), font=font_mono)

    img.save(output_path, "PNG", optimize=True)
    print(f"Generated OG card: {output_path} ({width}x{height})")

if __name__ == "__main__":
    create_brand_og(
        "public/featured-image.png",
        "Alfaz Mahmud Rizve",
        "Engineering autonomous revenue engines, n8n pipelines & Next.js systems.",
        "GTM & REVOPS ARCHITECT"
    )
    create_brand_og(
        "public/og-contact.png",
        "Let's Build Your System",
        "Book a strategy call or technical SEO audit. 24h response SLA guaranteed.",
        "WORK WITH ALFAZ"
    )
