# K&Y Studios — Website

Statik site (HTML + CSS + JS, bağımlılık yok). GitHub Pages ile doğrudan yayınlanır.

## Yayınlama (GitHub Pages)
1. Bu klasördeki tüm dosyaları reponun köküne yükle (`index.html` kökte olmalı).
2. Repo → **Settings → Pages** → *Source: Deploy from a branch* → `main` / `/ (root)` → Save.
3. Birkaç dakika içinde `https://<kullanici-adi>.github.io/<repo>/` adresinde yayında olur.
   - Repo adı `<kullanici-adi>.github.io` ise adres direkt `https://<kullanici-adi>.github.io/` olur.
   - Kendi domainini bağlamak için Settings → Pages → Custom domain.

## Yapı
```
index.html        Tüm sayfa içeriği
css/style.css     Renkler, tipografi, animasyonlar, responsive kurallar
js/main.js        Preloader, menü, scroll animasyonları, TR/EN dil, mouse efektleri
assets/           Logo (beyaz/koyu, şeffaf), favicon, sosyal medya kapak görseli
```

## Düzenleme ipuçları
- **Renkler:** `css/style.css` en üstteki `:root` değişkenleri.
- **Proje linkleri:** `index.html` içindeki `card__link` öğelerinin `href="#"` kısmına App Store / Play Store linklerini yaz.
- **Metinler:** Türkçe metinler `index.html`'de; İngilizce ve Rusça metinler `js/main.js` içindeki `dict.en` ve `dict.ru` nesnelerinde. (Poppins Kiril harf desteklemediği için Rusçada otomatik olarak Montserrat kullanılır.)
- **Yeni proje kartı:** `<article class="card reveal tilt">` bloğunu kopyala.

## Sitenin yasal sayfaları
- `/privacy/` — web sitesinin gizlilik politikası
- `/terms/` — web sitesinin kullanım koşulları
Her sayfanın footer'ında bağlantıları var. Metinler `js/projects.js` içindeki "STUDIO (website) LEGAL PAGES" bölümünde.

## Projeler ve yasal sayfalar
Her projenin kendi sayfası, **gizlilik politikası**, **destek** ve **kullanım koşulları** sayfası vardır:

| Sayfa | Adres |
|---|---|
| Proje | `/projects/<slug>/` |
| Gizlilik | `/projects/<slug>/privacy/` |
| Destek | `/projects/<slug>/support/` |
| Koşullar | `/projects/<slug>/terms/` |

Bu adresleri App Store Connect'te (Privacy Policy URL, Support URL) ve Google Play Console'da kullanabilirsin.

**Tüm içerik tek dosyada:** `data/projects.js`. İsim, açıklama, özellikler, SSS, store linkleri ve
gizlilik ayarları (`ads`, `analytics`, `crashReports`, `purchases`, `account`) burada.
Gizlilik politikası ve koşullar bu ayarlara göre **otomatik** yazılır; bir ayarı `true` yapınca ilgili bölüm eklenir.

### Yeni proje eklemek
1. `data/projects.js` içine yeni bir blok ekle (mevcut birini kopyala, `slug`'ı değiştir).
2. Terminalde: `./tools/new-project.sh yeni-slug`
3. Commit + push. Ana sayfadaki kart ve 4 sayfa kendiliğinden oluşur.
