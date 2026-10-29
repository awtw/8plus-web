#!/bin/sh
# 2026-10-29 — builds the 4:5 phone cut (../hero-brand-tall) from this composition.
# The layout switches on the root size, so only data-width/data-height change.
set -e
here=$(cd "$(dirname "$0")/.." && pwd)
dest="$here/../hero-brand-tall"
mkdir -p "$dest/assets"
cp -R "$here/vendor" "$dest/"
cp -R "$here/assets/fonts" "$here/assets/img" "$here/assets/sound.wav" "$dest/assets/"
cp "$here/materials.md" "$dest/"
sed -e 's/data-width="1920" data-height="1080"/data-width="1080" data-height="1350"/' \
    -e 's/<title>8plus · Manifesto<\/title>/<title>8plus · Manifesto (4:5)<\/title>/' \
    "$here/index.html" > "$dest/index.html"
printf 'out/\n.om/\nstills/\n' > "$dest/.gitignore"
echo "$dest"
