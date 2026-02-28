from bs4 import BeautifulSoup
import re
from pathlib import Path

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

    # look for main content block heuristically
    for tag in soup.find_all(["div", "article", "section", "main"]):
        paragraphs = tag.find_all("p")
        if len(paragraphs) < 1:
            continue
        text = " ".join(p.get_text(" ", strip=True) for p in paragraphs)
        length = len(text)
        if length > best_length:
            best_length = length
            best_block = tag

    if not best_block:
        raise Exception("Could not locate main content block")

    # join paragraphs with significant length (>60 chars)
    paragraphs = best_block.find_all("p")
    texts = []
    for p in paragraphs:
        t = p.get_text(" ", strip=True)
        if len(t) > 60:
            texts.append(t)
    return " ".join(texts)

# ----------------------------
# Build meta description using 3-sentence window scored by title keywords
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

    max_idx = scores.index(max(scores))
    best_window = windows[max_idx]
    return " ".join(best_window)[:320]  # optional cut-off at 320 chars

# ----------------------------
# Extract keywords from title first segment
# ----------------------------
def extract_title_keywords(title):
    first_segment = title.split("|")[0].strip()  # before vertical divider
    # split by comma to get individual keywords
    raw_keywords = [kw.strip() for kw in first_segment.split(",") if kw.strip()]

    cleaned_keywords = []
    for kw in raw_keywords:
        # remove redundant phrases
        kw = re.sub(r"(?i)acupuncture for\s*", "", kw)
        kw = re.sub(r"(?i)in tcm\s*$", "", kw)
        kw = kw.strip()
        if kw:
            cleaned_keywords.append(kw)

    # build meta keywords list with prefixes
    keywords_list = ["acupuncture surrey"]  # hard-coded keyword phrase
    for kw in cleaned_keywords:
        keywords_list.append(f"Acupuncture for {kw}")
        keywords_list.append(f"TCM for {kw}")

    return keywords_list, cleaned_keywords  # second list used for scoring

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

    # Generate meta keywords (title first segment + Acupuncture/TCM prefixes)
    meta_keywords, title_keywords_for_scoring = extract_title_keywords(title)
    print("Meta keywords:", meta_keywords)

    # Generate meta description (best 3-sentence window scored by title keywords)
    meta_description = build_meta_description(content_text, title_keywords_for_scoring)
    print("\nGenerated meta description:\n", meta_description)

    # Update soup tags
    update_meta_description(soup, meta_description)
    update_meta_keywords(soup, meta_keywords)

    # Save output
    output_path.write_text(str(soup), encoding="utf-8")
    print("\n✅ Updated page saved:", output_path)

if __name__ == "__main__":
    main()
