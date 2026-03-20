from bs4 import BeautifulSoup
import re
from pathlib import Path

INPUT_FOLDER = Path("casereports")

# ----------------------------
# Sentence splitting
# ----------------------------
def split_sentences(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return re.split(r'(?<=[.!?])\s+', text)

# ----------------------------
# Create SEO filename slug
# ----------------------------
def slugify(text):
    text = text.lower()
    text = re.sub(r"&", "and", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-") + ".html"

# ----------------------------
# Smart content extraction
# ----------------------------
def extract_main_content(soup):
    best_block = None
    best_length = 0

    for tag in soup.find_all(["div", "article", "section", "main"]):
        paragraphs = tag.find_all("p")
        if len(paragraphs) < 1:
            continue
        text = " ".join(p.get_text(" ", strip=True) for p in paragraphs)
        if len(text) > best_length:
            best_length = len(text)
            best_block = tag

    if not best_block:
        raise Exception("Could not locate main content block")

    texts = []
    for p in best_block.find_all("p"):
        t = p.get_text(" ", strip=True)
        if len(t) > 60:
            texts.append(t)

    return " ".join(texts)

# ----------------------------
# Build meta description (3-sentence window)
# ----------------------------
def build_meta_description(text, title_keywords):
    sentences = split_sentences(text)
    if len(sentences) <= 3:
        return " ".join(sentences)
    windows = [sentences[i:i+3] for i in range(len(sentences)-2)]
    scores = []
    for w in windows:
        first_sentence = w[0].lower()
        score = sum(first_sentence.count(k.lower()) for k in title_keywords)
        scores.append(score)
    best_window = windows[scores.index(max(scores))]
    return " ".join(best_window)[:320]

# ----------------------------
# Extract keywords from title
# ----------------------------
def extract_title_keywords(title):
    first_segment = title.split("|")[0].strip()
    raw_keywords = [kw.strip() for kw in first_segment.split(",") if kw.strip()]
    cleaned_keywords = []
    for kw in raw_keywords:
        kw = re.sub(r"(?i)acupuncture for\s*", "", kw)
        kw = re.sub(r"(?i)in tcm\s*$", "", kw)
        kw = kw.strip()
        if kw:
            cleaned_keywords.append(kw)

    keywords_list = ["acupuncture surrey"]
    for kw in cleaned_keywords:
        keywords_list.append(f"Acupuncture for {kw}")
        keywords_list.append(f"TCM for {kw}")
        keywords_list.append(f"Chinese Medicine for {kw}")

    return keywords_list, cleaned_keywords, first_segment

# ----------------------------
# Update meta description
# ----------------------------
def update_meta_description(soup, description):
    meta = soup.find("meta", attrs={"name": "description"})
    if meta:
        meta["content"] = description
    else:
        new_meta = soup.new_tag("meta", attrs={"name": "description", "content": description})
        soup.head.append(new_meta)

# ----------------------------
# Update meta keywords
# ----------------------------
def update_meta_keywords(soup, keywords):
    content = ", ".join(keywords)
    meta = soup.find("meta", attrs={"name": "keywords"})
    if meta:
        meta["content"] = content
    else:
        new_meta = soup.new_tag("meta", attrs={"name": "keywords", "content": content})
        soup.head.append(new_meta)

# ----------------------------
# Add 301 redirect for original file
# ----------------------------
def add_301_redirect(soup, original_filename):
    redirect_tag = soup.new_tag("meta", attrs={
        "http-equiv": "refresh",
        "content": f"0; url={original_filename}"
    })
    soup.head.insert(0, redirect_tag)

# ----------------------------
# Process a single file
# ----------------------------
def process_file(input_path: Path):
    print("Opening:", input_path)
    soup = BeautifulSoup(input_path.read_text(encoding="utf-8"), "lxml")

    title = soup.title.string.strip()
    print("Detected title:", title)

    content_text = extract_main_content(soup)
    meta_keywords, title_keywords_for_scoring, first_segment = extract_title_keywords(title)

    meta_description = build_meta_description(content_text, title_keywords_for_scoring)

    update_meta_description(soup, meta_description)
    update_meta_keywords(soup, meta_keywords)

    filename = slugify(first_segment + " in tcm")  # keep "in tcm" in filename
    output_path = input_path.parent / filename
    print("Output filename:", filename)

    # Add 301 redirect to point old file to new file
    add_301_redirect(soup, input_path.name)

    output_path.write_text(str(soup), encoding="utf-8")
    print("✅ Page saved with 301 redirect:", output_path)

# ----------------------------
# MAIN
# ----------------------------
def main():
    skip_files = {
        "recent4.html",
        "acupuncture-for-knee-leg-pain-rib-pain-sinus-problem-in-tcm.html"
    }

    for html_file in INPUT_FOLDER.glob("*.html"):
        if html_file.name in skip_files:
            print("Skipping:", html_file.name)
            continue
        process_file(html_file)

if __name__ == "__main__":
    main()
