#!/usr/bin/env python3
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.viewport = False
        self.title = False
        self.h1 = 0
        self.main_ids = set()
        self.hrefs = []
        self.srcs = []
        self.labels_for = set()
        self.controls = []
        self.skip_links = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "meta" and a.get("name") == "viewport":
            self.viewport = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "main" and a.get("id"):
            self.main_ids.add(a["id"])
        elif tag == "a":
            href = a.get("href")
            if href:
                self.hrefs.append(href)
                if "skip-link" in a.get("class", "").split():
                    self.skip_links += 1
        elif tag in {"img", "script"} and a.get("src"):
            self.srcs.append(a["src"])
        elif tag == "link" and a.get("href"):
            self.hrefs.append(a["href"])
        elif tag == "label" and a.get("for"):
            self.labels_for.add(a["for"])
        elif tag in {"input", "select", "textarea"}:
            ctype = a.get("type", "").lower()
            if ctype not in {"hidden", "submit", "button", "radio", "checkbox"}:
                self.controls.append((tag, a.get("id"), a.get("aria-label")))

    def handle_data(self, data):
        if getattr(self, "_in_title", False) and data.strip():
            self.title = True

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self._in_title = True
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "meta" and a.get("name") == "viewport":
            self.viewport = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "main" and a.get("id"):
            self.main_ids.add(a["id"])
        elif tag == "a":
            href = a.get("href")
            if href:
                self.hrefs.append(href)
                if "skip-link" in a.get("class", "").split():
                    self.skip_links += 1
        elif tag in {"img", "script"} and a.get("src"):
            self.srcs.append(a["src"])
        elif tag == "link" and a.get("href"):
            self.hrefs.append(a["href"])
        elif tag == "label" and a.get("for"):
            self.labels_for.add(a["for"])
        elif tag in {"input", "select", "textarea"}:
            ctype = a.get("type", "").lower()
            if ctype not in {"hidden", "submit", "button", "radio", "checkbox"}:
                self.controls.append((tag, a.get("id"), a.get("aria-label")))

def local_target(page: Path, ref: str):
    if not ref or ref.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    u = urlparse(ref)
    if u.scheme or u.netloc:
        return None
    target = (page.parent / u.path).resolve()
    return target

def check_page(page: Path):
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    issues = []

    if parser.lang != "es":
        issues.append("html lang debe ser 'es'")
    if not parser.viewport:
        issues.append("falta meta viewport")
    if not parser.title:
        issues.append("title vacío o ausente")
    if parser.h1 != 1:
        issues.append(f"se esperaba 1 h1 y hay {parser.h1}")
    if "main" not in parser.main_ids:
        issues.append("falta <main id='main'>")
    if parser.skip_links < 1:
        issues.append("falta skip-link")

    for tag, cid, aria in parser.controls:
        if not aria and (not cid or cid not in parser.labels_for):
            issues.append(f"{tag} sin label accesible (id={cid!r})")

    for ref in parser.hrefs + parser.srcs:
        target = local_target(page, ref)
        if target is not None and not target.exists():
            issues.append(f"recurso/enlace interno inexistente: {ref}")

    return issues

def main():
    pages = sorted(SITE.glob("*.html"))
    if not pages:
        print("FAIL: no se encontraron páginas HTML")
        return 1

    failures = {}
    for page in pages:
        issues = check_page(page)
        if issues:
            failures[page.name] = issues

    css = (SITE / "assets/css/app.css").read_text(encoding="utf-8")
    responsive_checks = {
        "breakpoint_900": "@media (max-width:900px)" in css,
        "breakpoint_640": "@media (max-width:640px)" in css,
        "focus_visible": ":focus-visible" in css,
        "reduced_motion": "prefers-reduced-motion" in css,
        "min_360": "min-width:360px" in css,
    }
    missing_css = [k for k,v in responsive_checks.items() if not v]

    print(f"HTML_PAGES={len(pages)}")
    print(f"HTML_FAILURES={len(failures)}")
    for name, issues in failures.items():
        print(f"FAIL {name}")
        for issue in issues:
            print(f"  - {issue}")

    if missing_css:
        print("FAIL CSS_STATIC")
        for item in missing_css:
            print(f"  - missing:{item}")

    if failures or missing_css:
        print("QA_STATIC=FAIL")
        return 1

    print("QA_STATIC=PASS")
    print("NOTE: este control es estructural. El QA visual y responsive físico sigue requiriendo revisión en navegador.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
