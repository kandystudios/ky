#!/usr/bin/env bash
# ---------------------------------------------------------------
# K&Y Studios — yeni proje sayfaları oluşturur.
#
# Kullanım (sitenin ana klasöründe):
#   ./tools/new-project.sh proje-slug
#
# Önce data/projects.js içine aynı slug ile projeyi ekle.
# Bu script şu sayfaları oluşturur:
#   projects/<slug>/            → proje sayfası
#   projects/<slug>/privacy/    → gizlilik politikası
#   projects/<slug>/support/    → destek
#   projects/<slug>/terms/      → kullanım koşulları
# Var olan dosyaların üzerine yazar (içerik data/projects.js'ten
# geldiği için güvenlidir).
# ---------------------------------------------------------------
set -e
cd "$(dirname "$0")/.."

SLUG="$1"
if [ -z "$SLUG" ]; then
  echo "Kullanım: ./tools/new-project.sh proje-slug"; exit 1
fi
if ! grep -q "slug: \"$SLUG\"" data/projects.js; then
  echo "⚠️  data/projects.js içinde slug: \"$SLUG\" bulunamadı. Önce projeyi oraya ekle."; exit 1
fi

write_page() { # $1 = alt klasör ("" | privacy | support | terms), $2 = page tipi, $3 = root yolu
  local dir="projects/$SLUG${1:+/$1}"
  mkdir -p "$dir"
  local R="$3"
  cat > "$dir/index.html" <<EOF
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>K&amp;Y Studios</title>
  <meta name="theme-color" content="#0d0d0f" />
  <meta property="og:image" content="${R}assets/og-cover.jpg" />
  <link rel="icon" type="image/png" sizes="32x32" href="${R}assets/favicon-32.png" />
  <link rel="apple-touch-icon" href="${R}assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${R}css/style.css" />
</head>
<body class="subpage" data-root="${R}" data-project="${SLUG}" data-page="$2">
  <div class="trail" aria-hidden="true"></div>

  <header class="nav" id="nav">
    <a href="${R}index.html" class="nav__brand" aria-label="K&Y Studios">
      <img src="${R}assets/logo-white.png" alt="" />
      <span>K<b>&amp;</b>Y</span>
    </a>
    <nav class="nav__links" id="navLinks">
      <a href="${R}index.html#about" data-i18n="nav.about">Hakkımızda</a>
      <a href="${R}index.html#projects" data-i18n="nav.projects">Projeler</a>
      <a href="${R}index.html#process" data-i18n="nav.process">Yaklaşım</a>
      <a href="${R}index.html#contact" data-i18n="nav.contact">İletişim</a>
      <div class="lang lang--menu" role="group" aria-label="Language">
        <button data-lang="tr" aria-pressed="true">TR</button>
        <button data-lang="en" aria-pressed="false">EN</button>
        <button data-lang="ru" aria-pressed="false">RU</button>
        <span class="lang__pill" aria-hidden="true"></span>
      </div>
    </nav>
    <div class="nav__actions">
      <div class="lang lang--nav" role="group" aria-label="Language">
        <button data-lang="tr" aria-pressed="true">TR</button>
        <button data-lang="en" aria-pressed="false">EN</button>
        <button data-lang="ru" aria-pressed="false">RU</button>
        <span class="lang__pill" aria-hidden="true"></span>
      </div>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
    </div>
  </header>

  <main id="app"></main>

  <footer class="footer">
    <div class="container footer__inner">
      <a href="${R}index.html" class="footer__brand">
        <img src="${R}assets/logo-white.png" alt="" />
        <span>K<b>&amp;</b>Y STUDIOS</span>
      </a>
      <div class="footer__mid">
        <p>© <span class="js-year"></span> K&amp;Y Studios. <span data-i18n="footer.rights">Tüm hakları saklıdır.</span></p>
        <nav class="footer__legal"><a href="${R}privacy/" data-i18n="footer.privacy">Gizlilik Politikası</a><a href="${R}terms/" data-i18n="footer.terms">Kullanım Koşulları</a></nav>
      </div>
      <a href="#" class="footer__top" data-i18n="footer.top">Yukarı ↑</a>
    </div>
  </footer>

  <noscript><p style="padding:8rem 2rem;text-align:center">Please enable JavaScript to view this page.</p></noscript>
  <script src="${R}data/projects.js"></script>
  <script src="${R}js/projects.js"></script>
  <script src="${R}js/main.js"></script>
</body>
</html>
EOF
  echo "✓ $dir/index.html"
}

write_page ""        project "../../"
write_page privacy   privacy "../../../"
write_page support   support "../../../"
write_page terms     terms   "../../../"

echo ""
echo "Bitti! Linkler (yayına aldıktan sonra):"
echo "  Proje:    /projects/$SLUG/"
echo "  Gizlilik: /projects/$SLUG/privacy/"
echo "  Destek:   /projects/$SLUG/support/"
echo "  Koşullar: /projects/$SLUG/terms/"
