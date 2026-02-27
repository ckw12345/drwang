import re
from transformers import pipeline

# =====================================
# CONFIG
# =====================================

MODEL_NAME = "google/flan-t5-large"

MAX_CHARS_PER_CHUNK = 2200
FINAL_MAX_LEN = 80
FINAL_MIN_LEN = 35

print("Loading FLAN-T5 model (first run downloads model)...")

generator = pipeline(
    "text2text-generation",
    model=MODEL_NAME,
    device=-1   # CPU (GitHub Actions safe)
)

# =====================================
# HTML CLEANING
# =====================================

def clean_html_text(html):
    text = re.sub(r"<script.*?>.*?</script>", "", html, flags=re.DOTALL)
    text = re.sub(r"<style.*?>.*?</style>", "", text, flags=re.DOTALL)
    text = re.sub(r"<.*?>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

# =====================================
# CHUNKING
# =====================================

def chunk_text(text, size=MAX_CHARS_PER_CHUNK):
    return [text[i:i+size] for i in range(0, len(text), size)]

# =====================================
# STEP 1 — SUMMARIZE EACH CHUNK
# =====================================

def summarize_chunks(text):

    chunks = chunk_text(text)
    summaries = []

    for i, chunk in enumerate(chunks):
        print(f"Summarizing section {i+1}/{len(chunks)}")

        prompt = f"""
Summarize the following medical case report section in 2 concise sentences.
Focus on conditions treated, symptoms, and treatment outcomes.

TEXT:
{chunk}
"""

        result = generator(
            prompt,
            max_length=120,
            do_sample=False
        )

        summaries.append(result[0]["generated_text"])

    return summaries

# =====================================
# STEP 2 — BUILD FINAL META DESCRIPTION
# =====================================

def generate_meta_description(section_summaries, title):

    combined = " ".join(section_summaries)

    prompt = f"""
Write an SEO meta description (150–160 characters).

Requirements:
- Summarize ALL content
- Mention acupuncture or Traditional Chinese Medicine
- Clear, professional medical tone
- One sentence only

PAGE TITLE: {title}

CONTENT SUMMARY:
{combined}
"""

    result = generator(
        prompt,
        max_length=FINAL_MAX_LEN,
        min_length=FINAL_MIN_LEN,
        do_sample=False
    )

    return result[0]["generated_text"].strip()

# =====================================
# MAIN
# =====================================

def main():

    filepath = "casereports/recent4.html"
    print("Opening:", filepath)

    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Extract title
    title_match = re.search(r"<title>(.*?)</title>", html, re.I)
    title = title_match.group(1) if title_match else "Untitled"

    print("Detected title:", title)

    content_text = clean_html_text(html)

    # Step 1
    section_summaries = summarize_chunks(content_text)

    print("\nSection summaries:")
    for s in section_summaries:
        print("-", s)

    # Step 2
    meta_description = generate_meta_description(section_summaries, title)

    print("\nFINAL META DESCRIPTION:")
    print(meta_description)

    with open("generated_summary.txt", "w", encoding="utf-8") as f:
        f.write(meta_description)

    print("Saved generated_summary.txt")


if __name__ == "__main__":
    main()
