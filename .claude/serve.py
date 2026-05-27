#!/usr/bin/env python3
"""Tiny static file server that doesn't rely on os.getcwd() at import time."""
import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from functools import partial

ROOT = os.environ.get("SERVE_ROOT", "/Users/xihuang/Desktop/Websites Files/Logistique")
PORT = int(os.environ.get("PORT", "8766"))

# SimpleHTTPRequestHandler reads its directory from a constructor kwarg in 3.7+
Handler = partial(SimpleHTTPRequestHandler, directory=ROOT)

httpd = HTTPServer(("127.0.0.1", PORT), Handler)
print(f"Serving {ROOT} at http://127.0.0.1:{PORT}/")
sys.stdout.flush()
httpd.serve_forever()
