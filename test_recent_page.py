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
# SMART CONTENT DETECTION ⭐⭐⭐
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

    print("Detected content container:", best_block.name)

    paragraphs = best_block.find_all("p")

    texts = []
    for p in paragraphs:
        t = p.get_text(" ", strip=True)

        # ignore ultra short lines (menus etc)
        if len(t) > 60:
            texts.append(t)

    return " ".join(texts)


# --------------------------------------------------
# Sentence relevance
# --------------------------------------------------
def is_relevant(sentence, keywords):
    s = sentence.lower()
    return any(k in s for k in keywords)


# --------------------------------------------------
# Build meta description (3 sentences)
# --------------------------------------------------
def build_meta_description(text, keywords):

    sentences = split_sentences(text)

    start = 0
    for i, s in enumerate(sentences):
        if is_relevant(s, keywords):
            start = i
            break

    selected = sentences[start:start+3]

    return " ".join(selected)[:320]


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
