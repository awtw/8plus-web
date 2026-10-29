#!/bin/sh
# 2026-10-29 — copies the film into public/hero/film so the homepage plays it live (?live=1)
# instead of a rendered video. Run `om sound .` first if the score or the timing changed.
set -e
here=$(cd "$(dirname "$0")/.." && pwd)
dest="$here/../../public/hero/film"
rm -rf "$dest"
mkdir -p "$dest/vendor" "$dest/assets/fonts" "$dest/assets/img"
cp "$here/vendor/gsap.min.js" "$here/vendor/GSAP-LICENSE.txt" "$here/vendor/om.js" "$dest/vendor/"
cp "$here"/assets/fonts/*.woff2 "$here/assets/fonts/OFL.txt" "$here/assets/fonts/LICENSES.md" "$dest/assets/fonts/"
cp "$here"/assets/img/*.webp "$dest/assets/img/"
ffmpeg -loglevel error -y -i "$here/assets/sound.wav" -c:a aac -b:a 128k "$dest/assets/sound.m4a"
# the page asks for the small AAC file, and only when sound is switched on
sed -e 's|<audio id="om-sound" src="assets/sound.wav"|<audio id="om-sound" src="assets/sound.m4a" preload="none"|' \
    "$here/index.html" > "$dest/index.html"
du -sh "$dest"
