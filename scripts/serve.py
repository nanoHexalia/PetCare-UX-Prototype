#!/usr/bin/env python3
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

PORT=int(os.environ.get("PORT","4173"))
ROOT=Path(__file__).resolve().parents[1]/"site"
os.chdir(ROOT)
print(f"PetCare UX/UI disponible en http://127.0.0.1:{PORT}")
ThreadingHTTPServer(("0.0.0.0",PORT),SimpleHTTPRequestHandler).serve_forever()
