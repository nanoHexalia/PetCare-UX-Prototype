#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:4173}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/artifacts/responsive"
mkdir -p "$OUT"

BROWSER=""
for candidate in brave-browser brave chromium chromium-browser google-chrome google-chrome-stable; do
  if command -v "$candidate" >/dev/null 2>&1; then
    BROWSER="$(command -v "$candidate")"
    break
  fi
done

if [[ -z "$BROWSER" ]]; then
  echo "ERROR: no se encontró un navegador Chromium/Brave compatible con modo headless." >&2
  exit 1
fi

pages=(
  "index.html"
  "dashboard-propietario.html"
  "buscar.html"
  "resultados.html"
  "servicio.html"
  "reservar.html"
  "revisar.html"
  "estado.html"
  "dashboard-proveedor.html"
  "solicitudes.html"
  "solicitud.html"
  "agenda.html"
)

capture() {
  local width="$1"
  local height="$2"
  local page="$3"
  local stem="${page%.html}"
  local out="$OUT/${width}px-${stem}.png"

  "$BROWSER"     --headless=new     --disable-gpu     --hide-scrollbars     --window-size="$width,$height"     --screenshot="$out"     "$BASE_URL/$page" >/dev/null 2>&1

  echo "$out"
}

echo "BROWSER=$BROWSER"
echo "OUT=$OUT"

for page in "${pages[@]}"; do
  capture 768 1000 "$page"
done

for page in "${pages[@]}"; do
  capture 360 900 "$page"
done

echo
echo "RESPONSIVE_CAPTURE_OK"
echo "768px_FILES=$(find "$OUT" -maxdepth 1 -type f -name '768px-*.png' | wc -l)"
echo "360px_FILES=$(find "$OUT" -maxdepth 1 -type f -name '360px-*.png' | wc -l)"
