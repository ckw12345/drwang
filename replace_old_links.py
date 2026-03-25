from bs4 import BeautifulSoup
from pathlib import Path
import re

# ----------------------------
# Configuration
# ----------------------------

# Pages that contain links to update
LINK_PAGES = [
    "index.html",
    "case-reports.html"
]

# Folder containing all case report HTMLs
CASE_FOLDER = Path("casereports")

# ----------------------------
# Build old->new mapping
# ----------------------------
def build_old_to_new_mapping(folder: Path):
    mapping = {}
    for file in folder.glob("*.html"):
        soup = BeautifulSoup(file.read_text(encoding="utf-8"), "lxml")
        # Look for comment indicating original file
        comment = soup.find(string=lambda text: isinstance(text, type(soup.Comment)) and "Original file:" in text)
        if comment:
            old_file = comment.replace("Original file:", "").strip()
            mapping[old_file] = file.name
    return mapping

# ----------------------------
# Update links in given page
# ----------------------------
def update_links_in_page(page_path: Path, mapping: dict):
    content = page_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(content, "lxml")
    links_updated = 0

    for a_tag in soup.find_all("a", href=True):
        href = a_tag["href"]
        if href in mapping:
            a_tag["href"] = mapping[href]
            links_updated += 1

    if links_updated > 0:
        page_path.write_text(str(soup), encoding="utf-8")

    return links_updated

# ----------------------------
# MAIN
# ----------------------------
def main():
    print("Building old -> new mapping from casereports folder...")
    old_to_new = build_old_to_new_mapping(CASE_FOLDER)
    print(f"Found {len(old_to_new)} old->new mappings.")

    total_updates = 0
    for page in LINK_PAGES:
        page_path = Path(page)
        if not page_path.exists():
            print(f"Page not found, skipping: {page}")
            continue
        updates = update_links_in_page(page_path, old_to_new)
        print(f"{updates} links updated in {page}")
        total_updates += updates

    print(f"✅ Finished. Total links updated: {total_updates}")

if __name__ == "__main__":
    main()
