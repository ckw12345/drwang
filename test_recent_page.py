from bs4 import BeautifulSoup
import re
from pathlib import Path

INPUT_FILE = "casereports/recent4.html"
OUTPUT_FILE = "casereports/recent4_test.html"


# --------------------------------------------------
# Medical relevance keywords
# (customize freely)
# --------------------------------------------------
MEDICAL_KEYWORDS = [
    "pain", "acupuncture", "treatment", "symptom", "diagnosis",
    "syndrome", "insomnia", "anxiety", "depression",
    "knee", "back", "neck", "shoulder", "sinus",
    "digestive", "fatigue", "headache", "migraine",
    "tcM", "herbal", "therapy", "condition"
]


# --------------------------------------------------
# Split sentences
# --------------------------------------------------
def split_sentences(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return re.split(r'(?<=[.!?])\s+', text)


# --------------------------------------------------
# Check if sentence is medically meaningful
# --------------------------------------------------
def is_medical_sentence(sentence):
    s = sentence.lower()
    return any(keyword.lower() in s for keyword in MEDICAL_KEYWORDS)


# --------------------------------------------------
# Smart meta description builder
# --------------------------------------------------
def build_meta_description(text, max_sentences=3):

    sentences = split_sentences(text)

    # Find first meaningful sentence
    start_index = 0
    for i, s in enumerate(sentences):
        if is_medical_sentence(s):
            start_index = i
            break

    selected = sentences[start_index:start_index + max_sentences]

    description = " ".join(selected).strip()

    # safety length cap (~320 chars)
    return description[:320]


# --------------------------------------------------
# Extract main content
# --------------------------------------------------
def extract_content_text(soup):

    selectors = [
        "article",
        ".content",
        "#content",
        ".post",
        ".entry-content",
        "main"
    ]

    for sel in selectors:
        block = soup.select_one(sel)
        if block:
            return block.get_text(" ", strip=True)

    return soup.body.get_text(" ", strip=True)


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

    html = input_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "lxml")

    content_text = extract_content_text(soup)

    meta_description = build_meta_description(content_text)

    print("Generated meta description:")
    print(meta_description)

    update_meta_description(soup, meta_description)

    output_path.write_text(str(soup), encoding="utf-8")

    print(f"Updated page written to: {output_path}")


if __name__ == "__main__":
    main()
