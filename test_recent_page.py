import os
import re
from bs4 import BeautifulSoup

# =====================================
# SETTINGS
# =====================================

INPUT_FILE = "casereports/recent.html"
OUTPUT_FOLDER = "casereports"
META_DESC_LIMIT = 155


# =====================================
# BASIC HELPERS
# =====================================

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()


def first_sentence(text):
    parts = re.split(r'(?<=[.!?])\s+', text)
    return parts[0] if parts else text


def truncate(text, limit=155):
    if len(text) <= limit:
        return text
    cut = text[:limit]
    return cut[:cut.rfind(" ")] + "..."


def slugify(title):
    title = title.lower()
    title = re.sub(r"[^\w\s-]", "", title)
    title = re.sub(r"[\s_-]+", "-", title)
    return title.strip("-") + ".html"


def extract_title_segment(full_title):
    # take text BEFORE |
    return clean_text(full_title.split("|")[0])


# =====================================
# SMART CONTENT HEURISTICS
# =====================================

def similarity(a, b):
    a = a.lower()
    b = b.lower()
    common = set(a.split()) & set(b.split())
    return len(common) / max(len(b.split()), 1)


def score_paragraph(text, title):
    score = 0
    length = len(text)

    # Prefer longer text
    score += min(length / 50, 10)

    # Real sentences contain punctuation
    if "." in text:
        score += 5
    if "," in text:
        score += 2

    # Penalize similarity to title
    sim = similarity(text, title)
    score -= sim * 10

    # Penalize short lines
    if length < 60:
        score -= 5

    return score


def find_best_content_paragraph(soup, title_text):
    best_text = None
    best_score = -999

    for p in soup.find_all("p"):
        text = clean_text(p.get_text())

        if not text:
            continue

        score = score_paragraph(text, title_text)

        if score > best_score:
            best_score = score
            best_text = text

    return best_text


# =====================================
# MAIN
# =====================================

def main():

    print("Opening:", INPUT_FILE)

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # -------- TITLE --------
    title_tag = soup.find("title")
    if not title_tag:
        print("No title found.")
        return

    full_title = clean_text(title_tag.get_text())
    short_title = extract_title_segment(full_title)

    print("Detected title:", short_title)

    # -------- CONTENT DETECTION --------
    paragraph = find_best_content_paragraph(soup, short_title)

    if not paragraph:
        print("No valid paragraph found.")
        return

    desc = truncate(first_sentence(paragraph), META_DESC_LIMIT)

    # -------- META DESCRIPTION --------
    meta_desc = soup.find("meta", attrs={"name": "description"})

    if meta_desc:
        meta_desc["content"] = desc
    else:
        new_meta = soup.new_tag("meta")
        new_meta.attrs["name"] = "description"
        new_meta.attrs["content"] = desc
        soup.head.append(new_meta)

    print("Meta description updated.")

    # -------- META KEYWORDS --------
    meta_keywords = soup.find("meta", attrs={"name": "keywords"})

    if meta_keywords:
        existing = meta_keywords.get("content", "")
        meta_keywords["content"] = f"{short_title}, {existing}"
    else:
        new_keywords = soup.new_tag("meta")
        new_keywords.attrs["name"] = "keywords"
        new_keywords.attrs["content"] = short_title
        soup.head.append(new_keywords)

    print("Meta keywords updated.")

    # -------- OUTPUT NEW FILE --------
    new_filename = slugify(short_title)
    output_path = os.path.join(OUTPUT_FOLDER, new_filename)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print("✅ Output created:", output_path)
    print("Original file unchanged.")


if __name__ == "__main__":
    main()
