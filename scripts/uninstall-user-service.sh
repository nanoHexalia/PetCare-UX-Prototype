#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="petcare-ux-prototype.service"
UNIT_PATH="$HOME/.config/systemd/user/$SERVICE_NAME"

systemctl --user disable --now "$SERVICE_NAME" 2>/dev/null || true
rm -f "$UNIT_PATH"
systemctl --user daemon-reload
systemctl --user reset-failed

echo "PETCARE_USER_SERVICE_REMOVED"
