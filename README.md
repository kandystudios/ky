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
