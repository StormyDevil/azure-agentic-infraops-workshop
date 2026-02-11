#!/bin/bash

# Script to create the upstream sync PR
# Run this manually after reviewing the changes

echo "Creating draft PR for upstream sync..."

gh pr create \
  --base main \
  --head copilot/upstream-sync-2026-02-11 \
  --title "chore(sync): upstream sync 2026-02-11" \
  --body-file /tmp/pr-body.md \
  --draft \
  --label upstream-sync

echo "PR created successfully!"
