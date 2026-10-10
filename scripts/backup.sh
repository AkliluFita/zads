#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
BACKUP_DIR=${BACKUP_DIR:-"$ROOT/backups"}
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
DB_FILE=${ZADS_DATA_FILE:-"$ROOT/data/zads.json"}

mkdir -p "$BACKUP_DIR/daily"
if [ -f "$DB_FILE" ]; then
  cp "$DB_FILE" "$BACKUP_DIR/daily/zads-$STAMP.json"
fi

# Weekly application archive; credentials and dependency folders are excluded.
if [ "$(date +%u)" = "7" ]; then
  mkdir -p "$BACKUP_DIR/weekly"
  tar -czf "$BACKUP_DIR/weekly/zads-site-$STAMP.tar.gz" \
    --exclude='./.git' --exclude='./node_modules' --exclude='./backups' \
    --exclude='./.env' --exclude='./data' -C "$ROOT" .
fi
