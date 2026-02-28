from bs4 import BeautifulSoup
import re
from pathlib import Path

INPUT_FILE = "casereports/recent4.html"
OUTPUT_FILE = "casereports/recent4_test.html"

# --------------------------------------------------
# Extract keywords from TITLE
# --------------------------------------------------
def extract_title_keywords(title):
    main_title = title.split("|")[0]
    clean = re.sub(r"[^\w\s]", " ", main_title)
    words = clean.lower().split()

    STOPWORDS = {
        "for","and","the","in","of","a","an",
        "with","case","report","tcm"
    }

    return [w for w in words if w not in STOPWORDS and len(w) > 2]

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

    keywords = extract_title_keywords(title)
    print("Keywords:", keywords)

    content_text = extract_main_content(soup)

    meta_description = build_meta_description(content_text, keywords)
    print("\nGenerated description:\n", meta_description)

    update_meta_description(soup, meta_description)

    output_path.write_text(str(soup), encoding="utf-8")

    print("\n✅ Updated page saved:", output_path)


if __name__ == "__main__":
    main()
