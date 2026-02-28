from bs4 import BeautifulSoup
import re
from pathlib import Path
from collections import Counter

INPUT_FILE = "casereports/recent4.html"
OUTPUT_FILE = "casereports/recent4_test.html"

# ----------------------------
# Sentence splitting
# ----------------------------
def split_sentences(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return re.split(r'(?<=[.!?])\s+', text)

# ----------------------------
# Smart content extraction
# ----------------------------
def extract_main_content(soup):
    best_block = None
    best_length = 0

    for tag in soup.find_all(["div", "article", "section", "main"]):
        paragraphs = tag.find_all("p")
        if len(paragraphs) < 2:
            continue
        text = " ".join(p.get_text(" ", strip=True) for p in paragraphs)
        length = len(text)
        if length > best_length:
            best_length = length
            best_block = tag

    if not best_block:
        raise Exception("Could not locate main content block")

    paragraphs = best_block.find_all("p")
    texts = []
    for p in paragraphs:
        t = p.get_text(" ", strip=True)
        if len(t) > 60:
            texts.append(t)
    return " ".join(texts)

# ----------------------------
# Build meta description using 3-sentence sliding window scored by keywords
# ----------------------------
def build_meta_description(text, keywords):
    sentences = split_sentences(text)
    if len(sentences) <= 3:
        return " ".join(sentences)

    windows = [sentences[i:i+3] for i in range(len(sentences)-2)]
    scores = []
    for w in windows:
        combined = " ".join(w).lower()
        score = sum(combined.count(k.lower()) for k in keywords)
        scores.append(score)

    max_idx = scores.index(max(scores))
    best_window = windows[max_idx]
    return " ".join(best_window)[:320]

# ----------------------------
# Extract keywords from title first segment + hard-coded phrase
# ----------------------------
def extract_title_keywords(title):
    first_segment = title.split("|")[0].strip()  # before vertical divider
    words = re.findall(r"\b\w+\b", first_segment)
    keywords = words + ["acupuncture surrey"]
    return keywords

# ----------------------------
# Update meta tags
# ----------------------------
def update_meta_description(soup, description):
    meta = soup.find("meta", attrs={"name": "description"})
    if meta:
        meta["content"] = description
    else:
        new_meta = soup.new_tag("meta", attrs={"name": "description", "content": description})
        soup.head.append(new_meta)

def update_meta_keywords(soup, keywords):
    content = ", ".join(keywords)
    meta = soup.find("meta", attrs={"name": "keywords"})
    if meta:
        meta["content"] = content
    else:
        new_meta = soup.new_tag("meta", attrs={"name":"keywords","content":content})
        soup.head.append(new_meta)

# ----------------------------
# MAIN
# ----------------------------
def main():
    input_path = Path(INPUT_FILE)
    output_path = Path(OUTPUT_FILE)

    print(f"Opening: {input_path}")
    soup = BeautifulSoup(input_path.read_text(encoding="utf-8"), "lxml")

    title = soup.title.string.strip()
    print("Detected title:", title)

    # Extract main content
    content_text = extract_main_content(soup)

    # Generate keywords from title first segment + hard-coded phrase
    meta_keywords = extract_title_keywords(title)
    print("Meta keywords:", meta_keywords)

    # Generate meta description (best 3-sentence window scored by keywords)
    meta_description = build_meta_description(content_text, meta_keywords)
    print("\nGenerated meta description:\n", meta_description)

    # Update soup tags
    update_meta_description(soup, meta_description)
    update_meta_keywords(soup, meta_keywords)

    # Save output
    output_path.write_text(str(soup), encoding="utf-8")
    print("\n✅ Updated page saved:", output_path)

if __name__ == "__main__":
    main()
