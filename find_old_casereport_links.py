from pathlib import Path
from bs4 import BeautifulSoup

# Root of your repo (adjust if needed)
ROOT_DIR = Path(".")
CASEREPORT_FOLDER = "casereports"
LOG_FILE = ROOT_DIR / "old_casereport_links_log.txt"

log_entries = []

# Iterate over all HTML files in the repo
for html_file in ROOT_DIR.rglob("*.html"):
    # Skip HTML files in hidden folders like .github
    if ".github" in str(html_file):
        continue

    try:
        content = html_file.read_text(encoding="utf-8")
        soup = BeautifulSoup(content, "lxml")

        # Look for all links
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"].strip()

            # Only care about old casereports HTML
            if href.startswith(f"{CASEREPORT_FOLDER}/") and href.endswith(".html"):
                log_entries.append(
                    f"File: {html_file} | Link text: '{a_tag.get_text(strip=True)}' | Href: {href}"
                )
    except Exception as e:
        log_entries.append(f"⚠️ Failed to parse {html_file}: {e}")

# Write log to root
if log_entries:
    LOG_FILE.write_text("\n".join(log_entries), encoding="utf-8")
    print(f"✅ Log saved to {LOG_FILE} ({len(log_entries)} links found)")
else:
    LOG_FILE.write_text("No old casereport links found.", encoding="utf-8")
    print(f"✅ Log saved to {LOG_FILE} (0 links found)")
