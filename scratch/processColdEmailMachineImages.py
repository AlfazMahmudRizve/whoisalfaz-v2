import os
from PIL import Image

# Get absolute path to tmp_images relative to the script location
script_dir = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.join(os.path.dirname(script_dir), "tmp_images")

targets = ["cold_email_machine_featured", "cold_email_machine_body1", "cold_email_machine_body2", "cold_email_machine_social"]

for target in targets:
    png_path = os.path.join(img_dir, f"{target}.png")
    webp_path = os.path.join(img_dir, f"{target}.webp")
    
    if os.path.exists(png_path):
        with Image.open(png_path) as im:
            # 1. First, try reducing quality
            quality = 75
            while quality > 5:
                im.save(webp_path, "WEBP", quality=quality)
                size = os.path.getsize(webp_path) / 1024
                if size < 100.0:
                    break
                quality -= 5
            
            # 2. If quality reduction alone is not enough, scale down the image dimensions
            scale_factor = 0.9
            current_im = im.copy()
            while size >= 100.0 and current_im.width > 100 and current_im.height > 100:
                new_width = int(current_im.width * scale_factor)
                new_height = int(current_im.height * scale_factor)
                current_im = current_im.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Try saving again at quality 75 (or minimum quality)
                current_im.save(webp_path, "WEBP", quality=75)
                size = os.path.getsize(webp_path) / 1024
                if size < 100.0:
                    break
            
            print(f"Compressed {target}.webp to {size:.2f} KB (final size: {current_im.width}x{current_im.height})")
