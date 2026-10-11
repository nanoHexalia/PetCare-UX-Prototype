#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="petcare-ux-prototype.service"
PORT="${PORT:-4173}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="$ROOT/site"
PYTHON="$(command -v python3)"
UNIT_DIR="$HOME/.config/systemd/user"
UNIT_PATH="$UNIT_DIR/$SERVICE_NAME"

if [[ ! -f "$ROOT/scripts/serve.py" || ! -d "$SITE" ]]; then
  echo "ERROR: estructura PetCare incompleta en $ROOT" >&2
  exit 1
fi

if [[ "$ROOT" != "/mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype" ]]; then
  echo "ERROR: este repositorio debe ejecutarse desde la ruta canónica:" >&2
  echo "/mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype" >&2
  echo "Ruta actual: $ROOT" >&2
  exit 1
fi

# Si el puerto ya está ocupado, solo detenemos un servidor PetCare reconocido.
PIDS="$(ss -ltnp "sport = :$PORT" 2>/dev/null | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' | sort -u || true)"
for pid in $PIDS; do
  cmd="$(tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null || true)"
  cwd="$(readlink -f "/proc/$pid/cwd" 2>/dev/null || true)"
  if [[ "$cmd" == *"scripts/serve.py"* && "$cwd" == "$SITE" ]]; then
    echo "Deteniendo servidor PetCare previo PID=$pid..."
    kill "$pid"
    for _ in {1..20}; do
      kill -0 "$pid" 2>/dev/null || break
      sleep 0.1
    done
  else
    echo "ERROR: el puerto $PORT está ocupado por un proceso que no puedo atribuir con seguridad a PetCare." >&2
    echo "PID=$pid" >&2
    echo "CMD=$cmd" >&2
    echo "CWD=$cwd" >&2
    exit 1
  fi
done

mkdir -p "$UNIT_DIR"

cat > "$UNIT_PATH" <<EOF
[Unit]
Description=PetCare UX Prototype local server
After=network.target

[Service]
Type=simple
WorkingDirectory=$ROOT
Environment=PORT=$PORT
ExecStart=$PYTHON $ROOT/scripts/serve.py
Restart=on-failure
RestartSec=2
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable --now "$SERVICE_NAME"

sleep 1

if curl -fsS "http://127.0.0.1:$PORT/index.html" >/dev/null; then
  echo
  echo "PETCARE_SERVICE_OK=http://127.0.0.1:$PORT"
  echo "SERVICE=$SERVICE_NAME"
  echo "ROOT=$ROOT"
else
  echo "ERROR: el servicio inició pero la comprobación HTTP falló." >&2
  systemctl --user status "$SERVICE_NAME" --no-pager || true
  exit 1
fi
