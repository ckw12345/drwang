from bs4 import BeautifulSoup, Comment
from pathlib import Path
import re

# ----------------------------
# CONFIG
# ----------------------------
SITE_ROOT = Path(".")
CASE_REPORTS_FOLDER = SITE_ROOT / "casereports"
TARGET_PAGES = ["index.html", "case-reports.html"]
LOG_FILE = SITE_ROOT / "link_replacements.log"

# ----------------------------
# BUILD OLD -> NEW MAP
# ----------------------------
def build_old_to_new_map():
    mapping = {}

    for html_file in CASE_REPORTS_FOLDER.glob("*.html"):
        soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "lxml")

        comments = soup.find_all(string=lambda text: isinstance(text, Comment))

        for c in comments:
            text = c.strip()

            match = re.search(r'([a-zA-Z0-9_\-]+\.html)', text)
            if match:
                old_file = match.group(1)
                mapping[old_file] = html_file.name
                break  # stop after first match

    return mapping

# ----------------------------
# REPLACE LINKS IN PAGE
# ----------------------------
def replace_links_in_page(page_path, old_to_new):
    page_modified = False
    replacements = []

    # Normalize mapping: remove ".html"
    normalized_map = {
        k.replace(".html", ""): v
        for k, v in old_to_new.items()
    }

    soup = BeautifulSoup(page_path.read_text(encoding="utf-8"), "lxml")

    for a in soup.find_all("a", href=True):
        href = a["href"]

        # Extract filename from any URL format
        filename = href.split("/")[-1]

        # Normalize filename
        filename_clean = filename.replace(".html", "")

        if filename_clean in normalized_map:
            new_file = normalized_map[filename_clean]

            # Use relative path (recommended)
            new_href = f"casereports/{new_file}"

            replacements.append((href, new_href))
            a["href"] = new_href
            page_modified = True

    if page_modified:
        page_path.write_text(str(soup), encoding="utf-8")

    return replacements

# ----------------------------
# MAIN
# ----------------------------
def main():
    print("Building mapping from casereports...")
    old_to_new = build_old_to_new_map()

    if not old_to_new:
        print("❌ No mappings found. Check your HTML comments.")
        return

    print(f"Found {len(old_to_new)} mappings")

    log_lines = []
    total_replacements = 0

    for page in TARGET_PAGES:
        page_path = SITE_ROOT / page

        if not page_path.exists():
            print(f"⚠️ Skipping missing page: {page}")
            continue

        replacements = replace_links_in_page(page_path, old_to_new)

        if replacements:
            log_lines.append(f"Updated links in {page}:")
            for old, new in replacements:
                log_lines.append(f"  {old}  →  {new}")
            log_lines.append("")
            total_replacements += len(replacements)

    if log_lines:
        LOG_FILE.write_text("\n".join(log_lines), encoding="utf-8")
        print(f"✅ Log written to {LOG_FILE}")
    else:
        print("⚠️ No links were replaced.")

    print(f"✅ Total links updated: {total_replacements}")


if __name__ == "__main__":
    main()
