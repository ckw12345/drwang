import re
import os
from bs4 import BeautifulSoup
from transformers import pipeline

# =========================
# CONFIG
# =========================

INPUT_FILE = "casereports/recent4.html"
META_DESC_LIMIT = 155

# =========================
# LOAD AI SUMMARIZER
# =========================
print("Loading AI summarizer (first run downloads model)...")

summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

# =========================
# HELPERS
# =========================

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()


def truncate(text, limit):
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0] + "..."


def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text


# =========================
# SMART CONTENT DETECTION
# =========================

def extract_main_content(soup, page_title):

    paragraphs = soup.find_all("p")
    candidates = []

    for p in paragraphs:
        txt = clean_text(p.get_text())

        if len(txt) < 40:
            continue

        # skip repeated title
        if page_title.lower() in txt.lower():
            continue

        candidates.append(txt)

    if not candidates:
        return ""

    # join multiple paragraphs for AI context
    return " ".join(candidates[:5])  # limit size for speed


# =========================
# AI SUMMARY
# =========================

def generate_ai_summary(content_text):

    prompt_text = (
        "Summarize the following acupuncture case report in one clear "
        "medical sentence describing the condition treated and outcome:\n\n"
        + content_text
    )

    result = summarizer(
        prompt_text,
        max_length=50,
        min_length=20,
        do_sample=False
    )[0]["summary_text"]

    return truncate(clean_text(result), META_DESC_LIMIT)


# =========================
# MAIN
# =========================

def main():

    print(f"Opening: {INPUT_FILE}")

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # -------------------------
    # TITLE PROCESSING
    # -------------------------

    title_tag = soup.find("title")
    full_title = clean_text(title_tag.text)

    # take only before vertical divider |
    main_title = full_title.split("|")[0].strip()

    print("Detected title:", main_title)

    # -------------------------
    # CONTENT EXTRACTION
    # -------------------------

    content_text = extract_main_content(soup, main_title)

    if not content_text:
        raise Exception("No valid content paragraphs found.")

    # -------------------------
    # AI META DESCRIPTION
    # -------------------------

    print("Generating AI summary...")
    meta_description = generate_ai_summary(content_text)

    print("Meta description:", meta_description)

    # -------------------------
    # UPDATE META DESCRIPTION
    # -------------------------

    meta_desc_tag = soup.find("meta", attrs={"name": "description"})
    if meta_desc_tag:
        meta_desc_tag["content"] = meta_description

    # -------------------------
    # UPDATE META KEYWORDS
    # -------------------------

    meta_keywords = soup.find("meta", attrs={"name": "keywords"})
    if meta_keywords:
        existing = meta_keywords.get("content", "")
        meta_keywords["content"] = f"{main_title}, {existing}"

    # -------------------------
    # OUTPUT NEW FILE
    # -------------------------

    new_filename = slugify(main_title) + ".html"

    with open(new_filename, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print("✅ Output file created:", new_filename)


if __name__ == "__main__":
    main()
