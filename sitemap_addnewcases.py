import os
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, ElementTree

# Configuration
SITE_URL = "https://drwang.ca"
CASE_REPORTS_DIR = "./casereports"  # path to local casereports folder
OUTPUT_FILE = "sitemap.xml"

# Static pages (existing main pages)
pages = [
    ("/", "2025-07-30", "monthly"),
    ("/treatments.html", "2025-07-30", "monthly"),
    ("/acupuncture.html", "2025-07-30", "monthly"),
    ("/medicine.html", "2025-07-30", "monthly"),
    ("/patient.html", "2025-07-30", "monthly"),
    ("/case-reports.html", "2025-07-30", "monthly"),
    ("/fees.html", "2025-07-30", "monthly"),
    ("/testimonial.html", "2025-07-30", "yearly"),
    ("/publications.html", "2025-07-30", "yearly"),
    ("/about.html", "2025-07-30", "monthly"),
    ("/contact.html", "2025-07-30", "monthly"),
]

# Create root
urlset = Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

# Add static pages
for path, lastmod, freq in pages:
    url = SubElement(urlset, 'url')
    SubElement(url, 'loc').text = SITE_URL + path
    SubElement(url, 'lastmod').text = lastmod
    SubElement(url, 'changefreq').text = freq

# Add all casereports files with today's date
today = datetime.now().strftime("%Y-%m-%d")
if os.path.isdir(CASE_REPORTS_DIR):
    for filename in sorted(os.listdir(CASE_REPORTS_DIR)):
        if filename.endswith(".html"):
            url = SubElement(urlset, 'url')
            SubElement(url, 'loc').text = f"{SITE_URL}/casereports/{filename}"
            SubElement(url, 'lastmod').text = today
            SubElement(url, 'changefreq').text = "weekly"

# Write XML file
tree = ElementTree(urlset)
tree.write(OUTPUT_FILE, encoding='utf-8', xml_declaration=True)

print(f"Sitemap generated: {OUTPUT_FILE}")
