#/bin/bash
cd "$(dirname "$0")"

# Get remote changes into local repo
git pull

# Rebuild app
./build.command
