from bs4 import BeautifulSoup
from pathlib import Path

ROOT_DIR = Path(".")  # root of repo
LOG_FILE = ROOT_DIR / "old_casereport_links_log.txt"

# Find all HTML files in the repo except node_modules or .github
html_files = list(ROOT_DIR.rglob("*.html"))

log_lines = []

for html_file in html_files:
    try:
        content = html_file.read_text(encoding="utf-8")
        soup = BeautifulSoup(content, "lxml")

        # Find all <a> tags
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"]
            # Only log links to casereports/*.html
            if href.startswith("casereports/") and href.endswith(".html"):
                # record which file contains the link and the href
                log_lines.append(f"{html_file}: {href}")

    except Exception as e:
        log_lines.append(f"{html_file}: ERROR reading file - {e}")

# Write log file
LOG_FILE.write_text("\n".join(log_lines), encoding="utf-8")

print(f"✅ Log saved to {LOG_FILE}, total links found: {len(log_lines)}")
