import os
import re
from transformers import pipeline

# ===============================
# CONFIG
# ===============================

MAX_INPUT_CHARS = 3000     # safe size per chunk (~900 tokens)
SUMMARY_MAX_LEN = 120
SUMMARY_MIN_LEN = 40

# ===============================
# LOAD SUMMARIZER
# ===============================

print("Loading AI summarizer (first run downloads model)...")

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn",
    device=-1   # CPU (GitHub runner safe)
)

# ===============================
# HELPERS
# ===============================

def clean_html_text(html):
    """Remove tags and compress whitespace"""
    text = re.sub(r"<script.*?>.*?</script>", "", html, flags=re.DOTALL)
    text = re.sub(r"<style.*?>.*?</style>", "", text, flags=re.DOTALL)
    text = re.sub(r"<.*?>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def chunk_text(text, max_chars=MAX_INPUT_CHARS):
    """Split long text into safe chunks"""
    chunks = []
    start = 0

    while start < len(text):
        chunks.append(text[start:start + max_chars])
        start += max_chars

    return chunks


def generate_ai_summary(text):
    """Chunk-safe summarization"""

    print("Generating AI summary...")

    chunks = chunk_text(text)

    summaries = []

    for i, chunk in enumerate(chunks):
        print(f"Summarizing chunk {i+1}/{len(chunks)}")

        try:
            result = summarizer(
                chunk,
                max_length=SUMMARY_MAX_LEN,
                min_length=SUMMARY_MIN_LEN,
                do_sample=False,
                truncation=True
            )

            summaries.append(result[0]["summary_text"])

        except Exception as e:
            print("Chunk failed:", e)

    # Combine summaries
    combined = " ".join(summaries)

    # Final compression pass if multiple chunks
    if len(summaries) > 1:
        print("Compressing combined summary...")
        combined = summarizer(
            combined,
            max_length=SUMMARY_MAX_LEN,
            min_length=SUMMARY_MIN_LEN,
            do_sample=False,
            truncation=True
        )[0]["summary_text"]

    return combined


# ===============================
# MAIN
# ===============================

def main():

    filepath = "casereports/recent4.html"

    print(f"Opening: {filepath}")

    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Extract title
    title_match = re.search(r"<title>(.*?)</title>", html, re.I)
    title = title_match.group(1) if title_match else "Untitled"

    print("Detected title:", title)

    content_text = clean_html_text(html)

    meta_description = generate_ai_summary(content_text)

    print("\n=== GENERATED META DESCRIPTION ===")
    print(meta_description)

    # Save output
    output_file = "generated_summary.txt"

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(meta_description)

    print(f"\nSaved → {output_file}")


if __name__ == "__main__":
    main()
