from bs4 import BeautifulSoup
import os
import glob

# Folder where your HTML files are stored
folder_path = "./"  # change to your folder path

# Find all files starting with 'acupuncture-for' and ending with .html
files = glob.glob(os.path.join(folder_path, "acupuncture-for*.html"))

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Remove all <meta http-equiv="refresh"> tags
    for meta in soup.find_all("meta", attrs={"http-equiv": "refresh"}):
        meta.decompose()

    # Save back to the same file
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print(f"Removed refresh tag from: {file_path}")
