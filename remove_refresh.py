from bs4 import BeautifulSoup
import os
import glob

# Only look in casereports/ folder
folder_path = "./casereports"

# Find all HTML files starting with 'acupuncture-for'
files = glob.glob(os.path.join(folder_path, "acupuncture-for*.html"))

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Remove <meta http-equiv="refresh"> tags
    for meta in soup.find_all("meta", attrs={"http-equiv": "refresh"}):
        meta.decompose()

    # Save changes
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print(f"Removed refresh tag from: {file_path}")
