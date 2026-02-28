from bs4 import BeautifulSoup
import re
from pathlib import Path
from collections import Counter

INPUT_FILE = "casereports/recent4.html"
OUTPUT_FILE = "casereports/recent4_test.html"

# --------------------------------------------------
# Sentence splitting
# --------------------------------------------------
def split_sentences(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return re.split(r'(?<=[.!?])\s+', text)

# --------------------------------------------------
# SMART CONTENT DETECTION
# --------------------------------------------------
def extract_main_content(soup):
    """
    Find container with MOST paragraph text.
    This reliably finds article body.
    """
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
        if len(t) > 60:  # skip very short lines
            texts.append(t)

    return " ".join(texts)

# --------------------------------------------------
# Build meta description using keyword scoring
# --------------------------------------------------
def build_meta_description(text, keywords):
    sentences = split_sentences(text)

    if len(sentences) <= 3:
        return " ".join(sentences)

    # Build all 3-sentence sliding windows
    windows = [sentences[i:i+3] for i in range(len(sentences)-2)]
    scores = []

    for w in windows:
        combined = " ".join(w).lower()
        score = sum(combined.count(k) for k in keywords)
        scores.append(score)

    # Pick window with highest score
    max_idx = scores.index(max(scores))
    best_window = windows[max_idx]

    return " ".join(best_window)[:320]  # trim to 320 chars

# --------------------------------------------------
# Generate meta keywords from content
# --------------------------------------------------
STOPWORDS = {
    "for","and","the","in","of","a","an","with",
    "case","report","tcm","patient","was","is","on",
    "at","by","to","from","after","before"
}

def generate_meta_keywords(text, top_n=15):
    clean_text = re.sub(r"[^\w\s]", " ", text.lower())
    words = [w for w in clean_text.split() if w not in STOPWORDS and len(w) > 2]
    freq = Counter(words)
    keywords = [word for word, count in freq.most_common(top_n)]
    return keywords

# --------------------------------------------------
# Update meta tag
# --------------------------------------------------
def update_meta_description(soup, description):
    meta = soup.find("meta", attrs={"name": "description"})
    if meta:
        meta["content"] = description
    else:
        new_meta = soup.new_tag(
            "meta",
            attrs={"name": "description", "content": description}
        )
        soup.head.append(new_meta)

def update_meta_keywords(soup, keywords):
    content = ", ".join(keywords)
    meta = soup.find("meta", attrs={"name": "keywords"})
    if meta:
        meta["content"] = content
    else:
        new_meta = soup.new_tag(
            "meta",
            attrs={"name":"keywords","content":content}
        )
        soup.head.append(new_meta)

# --------------------------------------------------
# MAIN
# --------------------------------------------------
def main():
    input_path = Path(INPUT_FILE)
    output_path = Path(OUTPUT_FILE)

    print(f"Opening: {input_path}")

    soup = BeautifulSoup(
        input_path.read_text(encoding="utf-8"),
        "lxml"
    )

    title = soup.title.string.strip()
    print("Detected title:", title)

    # Extract main content
    content_text = extract_main_content(soup)

    # Generate meta keywords from content
    meta_keywords = generate_meta_keywords(content_text, top_n=15)
    print("Meta keywords:", meta_keywords)

    # Generate meta description (best 3-sentence window)
    meta_description = build_meta_description(content_text, meta_keywords)
    print("\nGenerated meta description:\n", meta_description)

    # Update tags in soup
    update_meta_description(soup, meta_description)
    update_meta_keywords(soup, meta_keywords)

    # Save output
    output_path.write_text(str(soup), encoding="utf-8")
    print("\n✅ Updated page saved:", output_path)

if __name__ == "__main__":
    main()
