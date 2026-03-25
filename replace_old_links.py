from bs4 import BeautifulSoup
from pathlib import Path
import re

# ----------------------------
# Configuration
# ----------------------------
SITE_ROOT = Path(".")
CASE_REPORTS_PAGES = ["index.html", "case-reports.html"]
CASE_REPORTS_FOLDER = SITE_ROOT / "casereports"
LOG_FILE = SITE_ROOT / "link_replacements.log"

# ----------------------------
# Build mapping from old file -> new file
# ----------------------------
def build_old_to_new_map():
    mapping = {}
    for html_file in CASE_REPORTS_FOLDER.glob("*.html"):
        soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "lxml")

        # look for the comment indicating original file
        comment = soup.find(string=lambda text: isinstance(text, type(soup.Comment)) and "Original file:" in text)
        if comment:
            m = re.search(r"Original file:\s*(\S+\.html)", comment)
            if m:
                old_file = m.group(1).strip()
                mapping[old_file] = html_file.name

    return mapping

# ----------------------------
# Replace old links in a page
# ----------------------------
def replace_links_in_page(page_path, old_to_new):
    page_modified = False
    replacements = []

    soup = BeautifulSoup(page_path.read_text(encoding="utf-8"), "lxml")

    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href in old_to_new:
            new_href = old_to_new[href]
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
    old_to_new = build_old_to_new_map()
    if not old_to_new:
        print("No old->new mappings found.")
        return

    log_lines = []

    for page_name in CASE_REPORTS_PAGES:
        page_path = SITE_ROOT / page_name
        if not page_path.exists():
            print(f"Page not found: {page_path}")
            continue

        replacements = replace_links_in_page(page_path, old_to_new)
        if replacements:
            log_lines.append(f"Updated links in {page_name}:")
            for old_href, new_href in replacements:
                log_lines.append(f"  {old_href} -> {new_href}")
            log_lines.append("")  # empty line between pages

    if log_lines:
        LOG_FILE.write_text("\n".join(log_lines), encoding="utf-8")
        print(f"✅ Link replacements logged in {LOG_FILE}")
    else:
        print("No links replaced.")

if __name__ == "__main__":
    main()
