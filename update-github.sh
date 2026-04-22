#!/bin/bash
# Runs every 30 minutes via launchd — updates dashboard metadata and pushes to GitHub

set -e

WORKSPACE="/Users/jarvishstark/.openclaw/workspace"
LOG="$WORKSPACE/update.log"
NOW=$(date '+%Y-%m-%d %H:%M:%S')

log() { echo "[$NOW] $1" >> "$LOG"; }

log "Starting dashboard update..."

cd "$WORKSPACE"

# Regenerate data.json from all OpenClaw source files
log "Running generate-data.py..."
python3 "$WORKSPACE/generate-data.py" >> "$LOG" 2>&1 && log "data.json generated OK." || log "WARNING: generate-data.py failed, using existing data.json"

# Commit and push if there are changes
if ! git diff --quiet || git ls-files --others --exclude-standard | grep -q .; then
  git add index.html data.json generate-data.py
  git commit -m "Auto-sync: dashboard update $NOW" 2>/dev/null || true
  git push origin main
  log "Pushed update to GitHub successfully."
else
  log "No changes detected — skipping push."
fi

log "Done."
