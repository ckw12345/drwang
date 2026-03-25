from bs4 import BeautifulSoup, Comment
from pathlib import Path
import re

CASEREPORTS_DIR = Path("casereports")
LOG_FILE = Path("reverse_redirect_log.txt")

# ----------------------------
# Extract original filename from comment
# ----------------------------
def extract_original_filename(soup):

    comments = soup.find_all(string=lambda text: isinstance(text, Comment))

    for c in comments:
        text = c.strip().lower()

        # match patterns like:
        # <!-- Original file: recent4.html -->
        match = re.search(r'original file:\s*([a-zA-Z0-9_\-\.]+\.html)', text)

        if match:
            return match.group(1)

    return None

# ----------------------------
# Add redirect to OLD file
# ----------------------------
def add_redirect_to_old(old_file, new_file):

    old_path = CASEREPORTS_DIR / old_file

    if not old_path.exists():
        return f"❌ Missing old file: {old_file}"

    soup = BeautifulSoup(old_path.read_text(encoding="utf-8"), "lxml")

    # Remove existing refresh (avoid duplicates)
    for tag in soup.find_all("meta", attrs={"http-equiv": "refresh"}):
        tag.decompose()

    # Add redirect
    redirect_tag = soup.new_tag(
        "meta",
        attrs={
            "http-equiv": "refresh",
            "content": f"0; url={new_file}"
        }
    )
    soup.head.append(redirect_tag)

    # Add canonical
    canonical = soup.new_tag(
        "link",
        rel="canonical",
        href=new_file
    )
    soup.head.append(canonical)

    # Add noindex
    robots = soup.new_tag(
        "meta",
        attrs={"name": "robots", "content": "noindex, follow"}
    )
    soup.head.append(robots)

    old_path.write_text(str(soup), encoding="utf-8")

    return f"{old_file} -> {new_file}"

# ----------------------------
# MAIN
# ----------------------------
def main():

    logs = []

    for file in CASEREPORTS_DIR.glob("acupuncture-for-*.html"):

        soup = BeautifulSoup(file.read_text(encoding="utf-8"), "lxml")

        old_filename = extract_original_filename(soup)

        if not old_filename:
            logs.append(f"⚠️ No origin found in {file.name}")
            continue

        result = add_redirect_to_old(old_filename, file.name)

        logs.append(result)

    LOG_FILE.write_text("\n".join(logs), encoding="utf-8")

    print(f"✅ Reverse redirect complete")
    print(f"Log saved: {LOG_FILE}")


if __name__ == "__main__":
    main()
