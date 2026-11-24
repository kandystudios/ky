#!/usr/bin/env bash
# ---------------------------------------------------------------
# K&Y Studios — sitemap.xml üretir (Google Search Console için).
# Kullanım:  ./tools/sitemap.sh
# new-project.sh bunu otomatik çalıştırır.
# ---------------------------------------------------------------
set -e
cd "$(dirname "$0")/.."

BASE="$(grep -o 'siteUrl: *"[^"]*"' js/config.js | sed 's/.*"\(.*\)"/\1/')"
BASE="${BASE%/}/"
TODAY="$(date +%Y-%m-%d)"

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  find . -name index.html -not -path './.git/*' -not -path './tools/*' | sed 's#^\./##; s#index\.html$##' | sort | while read -r path; do
    case "$path" in
      "") prio="1.0" ;;
      projects/*/privacy/|projects/*/terms/|privacy/|terms/) prio="0.3" ;;
      projects/*/support/) prio="0.5" ;;
      *) prio="0.8" ;;
    esac
    echo "  <url><loc>${BASE}${path}</loc><lastmod>${TODAY}</lastmod><priority>${prio}</priority></url>"
  done
  echo '</urlset>'
} > sitemap.xml

echo "✓ sitemap.xml ($(grep -c '<url>' sitemap.xml) sayfa)"
