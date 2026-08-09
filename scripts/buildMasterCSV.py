import os
import json
import glob
import csv

def build_master_csv():
    workspace_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sanity_file = os.path.join(workspace_dir, "all_sanity_posts_full.json")
    output_csv = os.path.join(workspace_dir, "blogs_and_casestudies.csv")
    
    posts_map = {}
    
    # 1. Load from all_sanity_posts_full.json
    if os.path.exists(sanity_file):
        with open(sanity_file, 'r', encoding='utf-8') as f:
            sanity_posts = json.load(f)
            for p in sanity_posts:
                slug = p.get('slug')
                if isinstance(slug, dict):
                    slug = slug.get('current', '')
                if slug:
                    posts_map[slug] = {
                        'title': p.get('title', ''),
                        'slug': slug,
                        'content_type': 'case_study' if 'case-study' in slug or 'sop' in slug else 'blog',
                        'category': 'Automation & AI',
                        'canonical_url': f"https://whoisalfaz.me/blog/{slug}",
                        'meta_description': p.get('seoDescription') or p.get('description') or '',
                        'body_text': '',
                        'status': 'pending',
                        'devto_status': 'pending',
                        'medium_status': 'pending',
                        'hashnode_status': 'pending',
                        'linkedin_status': 'pending',
                        'twitter_status': 'pending',
                        'reddit_status': 'pending',
                        'pinterest_status': 'pending',
                        'telegram_status': 'pending',
                        'tumblr_status': 'pending',
                        'syndicated_at': ''
                    }
                    
    # 2. Enrich/Add from draft JSON files
    draft_files = glob.glob(os.path.join(workspace_dir, "draft-*.json"))
    for df in draft_files:
        try:
            with open(df, 'r', encoding='utf-8') as f:
                data = json.load(f)
                slug = data.get('slug')
                if isinstance(slug, dict):
                    slug = slug.get('current', '')
                if not slug:
                    basename = os.path.basename(df).replace('draft-', '').replace('.json', '')
                    slug = data.get('slug', basename)
                
                title = data.get('title', '')
                meta_desc = data.get('seoDescription') or data.get('description') or data.get('metaDescription') or ''
                body = data.get('content') or data.get('body') or data.get('markdown') or ''
                
                if isinstance(body, list):
                    # Portable text array
                    body_snippets = []
                    for block in body:
                        if isinstance(block, dict) and block.get('children'):
                            for child in block['children']:
                                if isinstance(child, dict) and child.get('text'):
                                    body_snippets.append(child['text'])
                    body = "\n\n".join(body_snippets)
                elif not isinstance(body, str):
                    body = str(body)

                content_type = 'case_study' if ('case-study' in slug or 'playbook' in slug or 'sop' in slug or 'blueprint' in slug) else 'blog'

                if slug in posts_map:
                    if title: posts_map[slug]['title'] = title
                    if meta_desc: posts_map[slug]['meta_description'] = meta_desc
                    if body: posts_map[slug]['body_text'] = body
                    posts_map[slug]['content_type'] = content_type
                else:
                    posts_map[slug] = {
                        'title': title,
                        'slug': slug,
                        'content_type': content_type,
                        'category': data.get('category', 'Automation & AI'),
                        'canonical_url': f"https://whoisalfaz.me/blog/{slug}",
                        'meta_description': meta_desc,
                        'body_text': body,
                        'status': 'pending',
                        'devto_status': 'pending',
                        'medium_status': 'pending',
                        'hashnode_status': 'pending',
                        'linkedin_status': 'pending',
                        'twitter_status': 'pending',
                        'reddit_status': 'pending',
                        'pinterest_status': 'pending',
                        'telegram_status': 'pending',
                        'tumblr_status': 'pending',
                        'syndicated_at': ''
                    }
        except Exception as e:
            print(f"Error reading {df}: {e}")
            
    # Write to CSV
    fieldnames = [
        'id', 'title', 'slug', 'content_type', 'category', 'canonical_url',
        'meta_description', 'body_text', 'status', 'devto_status', 'medium_status',
        'hashnode_status', 'linkedin_status', 'twitter_status', 'reddit_status',
        'pinterest_status', 'telegram_status', 'tumblr_status', 'syndicated_at'
    ]
    
    records = list(posts_map.values())
    print(f"Total unique posts & case studies collected: {len(records)}")
    
    with open(output_csv, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for idx, item in enumerate(records, start=1):
            item['id'] = idx
            writer.writerow(item)
            
    print(f"Successfully created master CSV at: {output_csv}")

if __name__ == '__main__':
    build_master_csv()
