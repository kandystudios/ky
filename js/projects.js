/* =========================================================
   K&Y Studios — projects.js
   Ana sayfa proje kartlarını ve her projenin alt sayfalarını
   (proje, gizlilik, destek, koşullar) data/projects.js'ten üretir.
   Metinler TR/EN/RU; dil değişimi main.js'teki sistemle çalışır.
   main.js'ten ÖNCE yüklenmelidir.
   ========================================================= */
(() => {
  const EMAIL = "studios.kyras@gmail.com";
  const LANGS = ["tr", "en", "ru"];
  const projects = window.KY_PROJECTS || [];
  const body = document.body;
  const ROOT = body.dataset.root || "";
  const PAGE = body.dataset.page || "home";

  /* ---------- i18n helpers ---------- */
  const extra = (window.KY_EXTRA = window.KY_EXTRA || { tr: {}, en: {}, ru: {} });
  let n = 0;
  const pick = (o, l) => (o && (o[l] || o.en || o.tr)) || "";
  const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
  // Register a {tr,en,ru} text → returns key
  const reg = (obj, vars = {}) => {
    const key = `x${++n}`;
    LANGS.forEach((l) => (extra[l][key] = fill(typeof obj === "string" ? obj : pick(obj, l), typeof vars === "function" ? vars(l) : vars)));
    return key;
  };
  // Translatable element
  const t = (obj, tag = "span", attrs = "", vars = {}) => {
    const k = reg(obj, vars);
    return `<${tag} ${attrs} data-i18n-html="${k}">${extra.tr[k]}</${tag}>`;
  };

  /* ---------- Shared strings ---------- */
  const S = {
    viewProject: { tr: "Projeyi incele →", en: "View project →", ru: "Подробнее →" },
    projects: { tr: "Projeler", en: "Projects", ru: "Проекты" },
    about: { tr: "Hakkında", en: "About", ru: "Об игре" },
    features: { tr: "Özellikler", en: "Features", ru: "Возможности" },
    helpLegal: { tr: "Yardım ve yasal", en: "Help & legal", ru: "Помощь и документы" },
    download: { tr: "Şimdi indir", en: "Download on", ru: "Скачать в" },
    play: { tr: "Web'de oyna", en: "Play on the", ru: "Играть в" },
    soon: { tr: "Yakında", en: "Coming soon", ru: "Скоро" },
    privacy: { tr: "Gizlilik Politikası", en: "Privacy Policy", ru: "Политика конфиденциальности" },
    support: { tr: "Destek", en: "Support", ru: "Поддержка" },
    terms: { tr: "Kullanım Koşulları", en: "Terms of Use", ru: "Условия использования" },
    privacyD: { tr: "Hangi verilerin toplandığı ve nasıl kullanıldığı.", en: "What data is collected and how it’s used.", ru: "Какие данные собираются и как используются." },
    supportD: { tr: "Sorular, hata bildirimi ve SSS.", en: "Questions, bug reports and FAQ.", ru: "Вопросы, сообщения об ошибках и FAQ." },
    termsD: { tr: "Uygulamayı kullanım kuralları.", en: "The rules for using the app.", ru: "Правила использования приложения." },
    updated: { tr: "Son güncelleme: {date}", en: "Last updated: {date}", ru: "Последнее обновление: {date}" },
  };
  const fmtDate = (iso) => (l) => ({ date: new Date(iso + "T12:00:00").toLocaleDateString({ tr: "tr-TR", en: "en-GB", ru: "ru-RU" }[l], { year: "numeric", month: "long", day: "numeric" }) });
  const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

  /* ---------- Visuals ---------- */
  const visual = (p) => {
    if (p.visual === "match")
      return `<div class="mm-grid">${["◆", "●", "▲", "◆", "▲", "●"].map((s) => `<div class="mm-card"><div class="mm-front"></div><div class="mm-back">${s}</div></div>`).join("")}</div>`;
    if (p.visual === "screw")
      return `<div class="sc">${[1, 2, 3].map((i) => `<div class="sc__plate sc__plate--${i}"><span class="sc__screw"></span><span class="sc__screw"></span></div>`).join("")}</div>`;
    if (p.visual === "turn")
      return `<div class="tw"><div class="tw__ring tw__ring--1"><i></i></div><div class="tw__ring tw__ring--2"><i></i></div><div class="tw__ring tw__ring--3"><i></i></div><div class="tw__core"></div></div>`;
    return `<img class="visual-icon" src="${ROOT}${p.icon || "assets/logo-white.png"}" alt="" />`;
  };
  const pills = (p) =>
    (p.status === "soon" ? `<span class="pill pill--soon">${t(S.soon)}</span>` : "") +
    (p.tags.en || []).map((_, i) => `<span class="pill${i ? " pill--dim" : ""}" data-i18n-html="${reg({ tr: p.tags.tr?.[i], en: p.tags.en[i], ru: p.tags.ru?.[i] })}">${pick({ tr: p.tags.tr?.[i] }, "tr") || p.tags.en[i]}</span>`).join("");

  /* =========================================================
     HOME — project cards
     ========================================================= */
  const cards = document.getElementById("projectCards");
  if (cards) {
    cards.insertAdjacentHTML(
      "afterbegin",
      projects
        .map(
          (p) => `
      <a class="card reveal tilt" href="projects/${p.slug}/">
        <div class="card__visual card__visual--${p.visual}" aria-hidden="true">${visual(p)}</div>
        <div class="card__body">
          <div class="card__meta">${pills(p)}</div>
          <h3>${p.name}</h3>
          ${t(p.summary, "p")}
          ${t(S.viewProject, "span", 'class="card__link"')}
        </div>
      </a>`
        )
        .join("")
    );
    // The row snapped to the static "next" card before the project cards were inserted in front of it,
    // and the browser keeps that snap target, which scrolled the row to its end. Start at the first card.
    const toStart = () => { cards.scrollLeft = 0; };
    toStart();
    requestAnimationFrame(toStart);
    window.addEventListener("load", toStart, { once: true });

    const bar = document.querySelector(".cards-bar");
    const markEnd = () => cards.classList.toggle("at-end", cards.scrollLeft >= cards.scrollWidth - cards.clientWidth - 2);
    cards.addEventListener("scroll", markEnd, { passive: true });
    window.addEventListener("resize", markEnd);
    markEnd();
    if (bar) {
      const [prev, next] = bar.querySelectorAll(".cards-nav");
      const update = () => {
        const max = cards.scrollWidth - cards.clientWidth;
        bar.hidden = max <= 2;
        prev.disabled = cards.scrollLeft <= 2;
        next.disabled = cards.scrollLeft >= max - 2;
      };
      bar.querySelectorAll(".cards-nav").forEach((b) =>
        b.addEventListener("click", () => {
          const step = cards.querySelector(".card")?.getBoundingClientRect().width || cards.clientWidth;
          cards.scrollBy({ left: Number(b.dataset.dir) * (step + 24), behavior: "smooth" });
        })
      );
      cards.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
    const live = document.querySelector("[data-count-projects]");
    if (live) live.dataset.count = projects.filter((p) => p.status !== "soon").length;
  }

  /* =========================================================
     PROJECT SUB-PAGES
     ========================================================= */
  const app = document.getElementById("app");

  /* =========================================================
     STUDIO (website) LEGAL PAGES — /privacy/ and /terms/
     ========================================================= */
  if (app && (PAGE === "site-privacy" || PAGE === "site-terms")) {
    const SITE_UPDATED = "2026-11-24";
    const GA = (window.KY_CONFIG || {}).gaId;
    const v = { email: mail };
    const isPriv = PAGE === "site-privacy";
    const titleObj = isPriv ? S.privacy : S.terms;
    const k = reg({ tr: `${titleObj.tr} | K&Y Studios`, en: `${titleObj.en} | K&Y Studios`, ru: `${titleObj.ru} | K&Y Studios` });
    document.title = extra.tr[k];
    document.querySelector("title").setAttribute("data-i18n", k);

    const appLinks = (kind) =>
      `<ul>${projects.map((x) => `<li><a href="${ROOT}projects/${x.slug}/${kind}/">${x.name}</a></li>`).join("")}</ul>`;
    const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;

    const secs = isPriv
      ? [
          [{ tr: "Topladığımız bilgiler", en: "What we collect", ru: "Какие данные мы собираем" }, [
            GA
              ? { tr: "Bu web sitesinde hesap, form veya reklam çerezi yoktur ve sizden kişisel bilgi istemeyiz. Yalnızca izin verirseniz, aşağıda açıklandığı şekilde Google Analytics kullanırız.", en: "This website has no accounts, forms or advertising cookies, and we do not ask you for personal information. Only if you allow it, we use Google Analytics as described below.", ru: "На этом сайте нет учётных записей, форм или рекламных cookie, и мы не запрашиваем у вас персональные данные. Только с вашего согласия мы используем Google Analytics, как описано ниже." }
              : { tr: "Bu web sitesinde hesap, form, analitik veya reklam çerezi yoktur ve sizden kişisel bilgi istemeyiz.", en: "This website has no accounts, forms, analytics or advertising cookies, and we do not ask you for personal information.", ru: "На этом сайте нет учётных записей, форм, аналитики или рекламных cookie, и мы не запрашиваем у вас персональные данные." },
            { tr: "Bize e-posta gönderirseniz, e-posta adresinizi ve mesajınızın içeriğini yalnızca size yanıt vermek için kullanırız.", en: "If you email us, we use your email address and the content of your message only to reply to you.", ru: "Если вы пишете нам на email, мы используем ваш адрес и содержание письма только для ответа вам." },
          ]],
          [{ tr: "Barındırma", en: "Hosting", ru: "Хостинг" }, [
            { tr: `Site ${ext("https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement", "GitHub Pages")} üzerinde barındırılır. GitHub, güvenlik amacıyla ziyaretçilerin IP adresini kaydedebilir.`, en: `The site is hosted on ${ext("https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement", "GitHub Pages")}. GitHub may log visitors’ IP addresses for security purposes.`, ru: `Сайт размещён на ${ext("https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement", "GitHub Pages")}. GitHub может записывать IP-адреса посетителей в целях безопасности.` },
          ]],
          [{ tr: "Yazı tipleri", en: "Fonts", ru: "Шрифты" }, [
            { tr: `Yazı tipleri ${ext("https://policies.google.com/privacy", "Google Fonts")} üzerinden yüklenir. Bu sırada tarayıcınız IP adresinizi Google’a iletir.`, en: `Fonts are loaded from ${ext("https://policies.google.com/privacy", "Google Fonts")}. When this happens, your browser sends your IP address to Google.`, ru: `Шрифты загружаются через ${ext("https://policies.google.com/privacy", "Google Fonts")}. При этом ваш браузер передаёт ваш IP-адрес Google.` },
          ]],
          GA && [{ tr: "Analitik ve çerezler", en: "Analytics and cookies", ru: "Аналитика и cookie" }, [
            { tr: `Çerez bandında “Kabul et”i seçerseniz, ziyaretçilerin siteyi nasıl kullandığını anlamak için ${ext("https://policies.google.com/privacy", "Google Analytics 4")} kullanırız: görüntülenen sayfalar, tıklanan butonlar ve bağlantılar (ör. App Store butonu), yaklaşık konum (ülke/şehir), cihaz ve tarayıcı türü ve siteye nereden geldiğiniz gibi. Google Analytics, 2 yıla kadar saklanan çerezler (<code>_ga</code>, <code>_ga_*</code>) kullanır.`, en: `If you choose “Accept” in the cookie banner, we use ${ext("https://policies.google.com/privacy", "Google Analytics 4")} to understand how visitors use the site — for example pages viewed, buttons and links clicked (such as the App Store button), approximate location (country/city), device and browser type, and how you arrived. Google Analytics uses cookies (<code>_ga</code>, <code>_ga_*</code>) stored for up to 2 years.`, ru: `Если вы нажмёте «Принять» в баннере cookie, мы используем ${ext("https://policies.google.com/privacy", "Google Analytics 4")}, чтобы понимать, как посетители пользуются сайтом: просмотренные страницы, нажатые кнопки и ссылки (например, кнопка App Store), приблизительное местоположение (страна/город), тип устройства и браузера, а также откуда вы пришли. Google Analytics использует cookie (<code>_ga</code>, <code>_ga_*</code>), которые хранятся до 2 лет.` },
            { tr: "Bu verileri sizi tanımlamak veya reklam için kullanmayız. Reddederseniz Google Analytics hiç yüklenmez. Tercihinizi istediğiniz zaman sayfanın altındaki “Çerez ayarları” bağlantısından değiştirebilirsiniz.", en: "We do not use this data to identify you or for advertising. If you decline, Google Analytics is not loaded at all. You can change your choice at any time via the “Cookie settings” link at the bottom of the page.", ru: "Мы не используем эти данные для вашей идентификации или рекламы. Если вы откажетесь, Google Analytics вообще не загружается. Изменить выбор можно в любой момент по ссылке «Настройки cookie» внизу страницы." },
          ]],
          [{ tr: "Tarayıcı depolaması", en: "Browser storage", ru: "Хранилище браузера" }, [
            GA
              ? { tr: "Seçtiğiniz dili ve çerez tercihinizi hatırlamak için tarayıcınızın yerel depolamasına (localStorage) küçük kayıtlar yazarız. Bunlar çerez değildir, bize gönderilmez ve tarayıcı ayarlarınızdan silebilirsiniz.", en: "We save your chosen language and your cookie choice in your browser’s local storage (localStorage). These are not cookies, are never sent to us, and you can clear them in your browser settings.", ru: "Мы сохраняем выбранный язык и ваш выбор по cookie в локальном хранилище браузера (localStorage). Это не cookie, данные не передаются нам, и их можно удалить в настройках браузера." }
              : { tr: "Seçtiğiniz dili hatırlamak için tarayıcınızın yerel depolamasına (localStorage) küçük bir kayıt yazarız. Bu bir çerez değildir, bize gönderilmez ve tarayıcı ayarlarınızdan silebilirsiniz.", en: "We save your chosen language in your browser’s local storage (localStorage). This is not a cookie, is never sent to us, and you can clear it in your browser settings.", ru: "Мы сохраняем выбранный язык в локальном хранилище браузера (localStorage). Это не cookie, данные не передаются нам, и их можно удалить в настройках браузера." },
          ]],
          [{ tr: "Uygulamalarımız", en: "Our apps", ru: "Наши приложения" }, [
            { tr: "Her uygulamamızın kendi gizlilik politikası vardır:", en: "Each of our apps has its own privacy policy:", ru: "У каждого нашего приложения есть своя политика конфиденциальности:" },
            appLinks("privacy"),
          ]],
          [{ tr: "Dış bağlantılar", en: "External links", ru: "Внешние ссылки" }, [
            { tr: "Site, LinkedIn, App Store ve Google Play gibi başka sitelere bağlantılar içerir. Bu sitelerin kendi gizlilik politikaları geçerlidir.", en: "The site links to other websites such as LinkedIn, the App Store and Google Play. Their own privacy policies apply.", ru: "Сайт содержит ссылки на другие ресурсы, например LinkedIn, App Store и Google Play. На них действуют их собственные политики конфиденциальности." },
          ]],
          [{ tr: "Haklarınız", en: "Your rights", ru: "Ваши права" }, [
            { tr: "KVKK, GDPR ve benzeri düzenlemeler kapsamında kişisel verilerinize erişme, bunları düzeltme veya silme haklarınızı kullanmak için {email} adresine yazın.", en: "To exercise your rights to access, correct or delete your personal data under KVKK, the GDPR or similar laws, email us at {email}.", ru: "Чтобы воспользоваться правом на доступ, исправление или удаление персональных данных согласно KVKK, GDPR или аналогичным законам, напишите нам на {email}." },
          ]],
          [{ tr: "Değişiklikler", en: "Changes", ru: "Изменения" }, [
            { tr: "Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler, yeni bir “Son güncelleme” tarihiyle bu sayfada yayımlanır.", en: "We may update this policy from time to time. Changes are posted on this page with a new “Last updated” date.", ru: "Мы можем время от времени обновлять эту политику. Изменения публикуются на этой странице с новой датой «Последнее обновление»." },
          ]],
          [{ tr: "İletişim", en: "Contact", ru: "Контакты" }, [
            { tr: "Sorularınız için: {email}", en: "Questions? Email us at {email}.", ru: "Вопросы? Напишите нам на {email}." },
          ]],
        ]
      : [
          [{ tr: "Sitenin kullanımı", en: "Use of the site", ru: "Использование сайта" }, [
            { tr: "Bu web sitesi K&amp;Y Studios’u ve projelerini tanıtmak için hazırlanmıştır. Siteyi yalnızca hukuka uygun amaçlarla ve işleyişini bozmayacak şekilde kullanmayı kabul edersiniz.", en: "This website introduces K&amp;Y Studios and its projects. You agree to use it only for lawful purposes and in a way that does not interfere with its operation.", ru: "Этот сайт представляет K&amp;Y Studios и её проекты. Вы обязуетесь использовать его только в законных целях и не нарушать его работу." },
          ]],
          [{ tr: "Fikri mülkiyet", en: "Intellectual property", ru: "Интеллектуальная собственность" }, [
            { tr: "Sitedeki tasarım, metinler, görseller ile K&amp;Y Studios adı ve logosu K&amp;Y Studios’a aittir. Yazılı iznimiz olmadan kopyalanamaz veya ticari amaçla kullanılamaz.", en: "The design, text, images and the K&amp;Y Studios name and logo on this site belong to K&amp;Y Studios. They may not be copied or used commercially without our written permission.", ru: "Дизайн, тексты, изображения, а также название и логотип K&amp;Y Studios на этом сайте принадлежат K&amp;Y Studios. Их нельзя копировать или использовать в коммерческих целях без нашего письменного разрешения." },
          ]],
          [{ tr: "Uygulamalarımız", en: "Our apps", ru: "Наши приложения" }, [
            { tr: "Uygulamalarımızın kullanımı, her birinin kendi kullanım koşullarına tabidir:", en: "Use of our apps is governed by each app’s own terms:", ru: "Использование наших приложений регулируется их собственными условиями:" },
            appLinks("terms"),
          ]],
          [{ tr: "Dış bağlantılar", en: "External links", ru: "Внешние ссылки" }, [
            { tr: "Sitedeki üçüncü taraf bağlantılarının içeriğinden sorumlu değiliz.", en: "We are not responsible for the content of third-party websites linked from this site.", ru: "Мы не несём ответственности за содержание сторонних сайтов, на которые ведут ссылки." },
          ]],
          [{ tr: "Sorumluluk reddi", en: "Disclaimer", ru: "Отказ от гарантий" }, [
            { tr: "Site “olduğu gibi” sunulur. Bilgilerin doğru ve güncel olması için çaba gösteririz ancak bunu garanti etmeyiz. Yasaların izin verdiği ölçüde, sitenin kullanımından doğan zararlardan sorumlu değiliz.", en: "The site is provided “as is”. We try to keep information accurate and up to date but do not guarantee it. To the extent permitted by law, we are not liable for any damages arising from use of the site.", ru: "Сайт предоставляется «как есть». Мы стараемся поддерживать информацию точной и актуальной, но не гарантируем этого. В пределах, допускаемых законом, мы не несём ответственности за ущерб, связанный с использованием сайта." },
          ]],
          [{ tr: "Değişiklikler", en: "Changes", ru: "Изменения" }, [
            { tr: "Bu koşulları dilediğimiz zaman güncelleyebiliriz. Güncel sürüm her zaman bu sayfadadır.", en: "We may update these terms at any time. The current version is always on this page.", ru: "Мы можем в любое время обновить эти условия. Актуальная версия всегда находится на этой странице." },
          ]],
          [{ tr: "İletişim", en: "Contact", ru: "Контакты" }, [
            { tr: "Sorularınız için: {email}", en: "Questions? Email us at {email}.", ru: "Вопросы? Напишите нам на {email}." },
          ]],
        ];

    const intro = isPriv
      ? { tr: "Bu politika, K&amp;Y Studios web sitesini (“Site”) ziyaret ettiğinizde bilgilerin nasıl ele alındığını açıklar. Uygulamalarımızın her birinin ayrı bir gizlilik politikası vardır.", en: "This policy explains how information is handled when you visit the K&amp;Y Studios website (the “Site”). Each of our apps has its own separate privacy policy.", ru: "Эта политика описывает, как обрабатывается информация при посещении сайта K&amp;Y Studios («Сайт»). У каждого нашего приложения есть отдельная политика конфиденциальности." }
      : { tr: "Bu koşullar, K&amp;Y Studios web sitesini (“Site”) kullanımınızı düzenler. Siteyi kullanarak bu koşulları kabul etmiş olursunuz.", en: "These terms govern your use of the K&amp;Y Studios website (the “Site”). By using the Site, you agree to them.", ru: "Эти условия регулируют использование сайта K&amp;Y Studios («Сайт»). Пользуясь Сайтом, вы соглашаетесь с ними." };

    app.innerHTML = `
      <section class="legal">
        <div class="container legal__inner">
          <nav class="crumb reveal" aria-label="Breadcrumb"><a href="${ROOT}index.html">K&amp;Y Studios</a><span>/</span>${t(titleObj, "span", 'aria-current="page"')}</nav>
          <header class="legal__head reveal">${t(titleObj, "h1")}${t(S.updated, "p", 'class="legal__date"', fmtDate(SITE_UPDATED))}</header>
          ${t(intro, "p", 'class="lead reveal"', v)}
          ${secs.filter(Boolean).map(([h, parts], i) => `
            <section class="legal__sec reveal">
              <h2><span class="num">${String(i + 1).padStart(2, "0")}</span>${t(h)}</h2>
              ${parts.map((x) => (typeof x === "string" ? x : t(x, "p", "", v))).join("")}
            </section>`).join("")}
          <div class="legal-links legal-links--2 reveal">
            <a class="legal-card${isPriv ? " is-active" : ""}" href="${ROOT}privacy/">${t(S.privacy, "strong")}<i>→</i></a>
            <a class="legal-card${!isPriv ? " is-active" : ""}" href="${ROOT}terms/">${t(S.terms, "strong")}<i>→</i></a>
          </div>
        </div>
      </section>`;
    return;
  }

  const p = projects.find((x) => x.slug === body.dataset.project);
  if (!app || !p) return;

  const P = p.privacy || {};
  const anyData = P.ads || P.analytics || P.crashReports || P.account || P.gameCenter;
  const projUrl = `${ROOT}projects/${p.slug}/`;
  const titles = { project: null, privacy: S.privacy, support: S.support, terms: S.terms };

  // <title>
  const titleKey = reg(titles[PAGE] ? { tr: `${pick(titles[PAGE], "tr")} — ${p.name}`, en: `${pick(titles[PAGE], "en")} — ${p.name}`, ru: `${pick(titles[PAGE], "ru")} — ${p.name}` } : { tr: `${p.name} — ${pick(p.tagline, "tr")}`, en: `${p.name} — ${pick(p.tagline, "en")}`, ru: `${p.name} — ${pick(p.tagline, "ru")}` });
  document.title = extra.tr[titleKey] + " | K&Y Studios";
  LANGS.forEach((l) => (extra[l][titleKey] += " | K&Y Studios"));
  document.querySelector("title").setAttribute("data-i18n", titleKey);

  const crumb = (current) => `
    <nav class="crumb reveal" aria-label="Breadcrumb">
      <a href="${ROOT}index.html#projects">${t(S.projects)}</a><span>/</span>
      ${current ? `<a href="${projUrl}">${p.name}</a><span>/</span>${t(current, "span", 'aria-current="page"')}` : `<span aria-current="page">${p.name}</span>`}
    </nav>`;

  const legalNav = (active) => `
    <div class="legal-links reveal">
      ${[["support", S.support, S.supportD], ["privacy", S.privacy, S.privacyD], ["terms", S.terms, S.termsD]]
        .map(([k, title, desc]) => `<a class="legal-card${k === active ? " is-active" : ""}" href="${projUrl}${k}/">${t(title, "strong")}${t(desc, "span")}<i>→</i></a>`)
        .join("")}
    </div>`;

  /* ---------- Project page ---------- */
  const storeBtn = (url, small, big, soon) =>
    url
      ? `<a class="store-btn magnetic" href="${url}" target="_blank" rel="noopener">${t(small, "small")}<b>${big}</b></a>`
      : `<span class="store-btn is-soon">${t(soon, "small")}<b>${big}</b></span>`;

  const renderProject = () => {
    const s = p.stores || {};
    const btns = [
      p.platforms.includes("ios") && storeBtn(s.appStore, S.download, "App Store", S.soon),
      p.platforms.includes("android") && storeBtn(s.googlePlay, S.download, "Google Play", S.soon),
      (p.platforms.includes("web") || s.web) && storeBtn(s.web, S.play, "Web", S.soon),
    ].filter(Boolean).join("");
    const feats = (p.features.en || []).map((_, i) => {
      const f = (l) => (p.features[l] || p.features.en)[i];
      return `<li class="feature reveal"><span class="feature__n">0${i + 1}</span>${t({ tr: f("tr")[0], en: f("en")[0], ru: f("ru")[0] }, "h3")}${t({ tr: f("tr")[1], en: f("en")[1], ru: f("ru")[1] }, "p")}</li>`;
    }).join("");
    return `
      <section class="phero">
        <div class="container">
          ${crumb()}
          <div class="phero__grid">
            <div class="phero__text">
              <div class="card__meta reveal">${pills(p)}</div>
              <h1 class="phero__title reveal">${p.name}</h1>
              ${t(p.tagline, "p", 'class="phero__tag reveal"')}
              <div class="phero__stores reveal">${btns}</div>
            </div>
            <div class="phero__visual card__visual--${p.visual} reveal" aria-hidden="true">${visual(p)}</div>
          </div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container pabout">
          <div class="reveal"><p class="eyebrow">${t(S.about)}</p></div>
          ${t(p.description, "p", 'class="lead reveal"')}
        </div>
      </section>
      <section class="section section--tight">
        <div class="container">
          <p class="eyebrow reveal">${t(S.features)}</p>
          <ul class="features">${feats}</ul>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container">
          <p class="eyebrow reveal">${t(S.helpLegal)}</p>
          ${legalNav()}
        </div>
      </section>`;
  };

  /* ---------- Legal layout ---------- */
  const legal = (titleObj, intro, sections) => `
    <section class="legal">
      <div class="container legal__inner">
        ${crumb(titleObj)}
        <header class="legal__head reveal">
          ${t(titleObj, "h1")}
          ${t(S.updated, "p", 'class="legal__date"', fmtDate(p.updated))}
        </header>
        ${intro ? t(intro, "p", 'class="lead reveal"', { app: p.name, email: mail }) : ""}
        ${sections
          .filter(Boolean)
          .map(
            ([h, parts], i) => `
          <section class="legal__sec reveal">
            <h2><span class="num">${String(i + 1).padStart(2, "0")}</span>${t(h)}</h2>
            ${parts.filter(Boolean).map((x) => (typeof x === "string" ? x : t(x, "p", "", { app: p.name, email: mail }))).join("")}
          </section>`
          )
          .join("")}
        ${legalNav(PAGE)}
      </div>
    </section>`;

  const li = (items) => `<ul>${items.filter(Boolean).map((x) => t(x, "li", "", { app: p.name, email: mail })).join("")}</ul>`;

  /* ---------- Privacy ---------- */
  const renderPrivacy = () => {
    const third = [
      P.ads && `<li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google AdMob</a></li>`,
      (P.analytics || P.crashReports) && `<li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener">Google Firebase</a></li>`,
      (P.purchases || P.gameCenter) && `<li><a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener">Apple${P.gameCenter ? " (Game Center)" : " App Store"}</a></li>`,
      P.purchases && `<li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Play</a></li>`,
    ].filter(Boolean);

    return legal(
      S.privacy,
      {
        tr: "Bu Gizlilik Politikası, {app} uygulamasını (“Uygulama”) kullandığınızda K&amp;Y Studios’un (“biz”) bilgileri nasıl ele aldığını açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş olursunuz.",
        en: "This Privacy Policy explains how K&amp;Y Studios (“we”, “us”) handles information when you use {app} (the “App”). By using the App, you agree to this policy.",
        ru: "Настоящая Политика конфиденциальности описывает, как K&amp;Y Studios («мы») обращается с информацией при использовании вами приложения {app} («Приложение»). Используя Приложение, вы соглашаетесь с этой политикой.",
      },
      [
        [
          { tr: "Topladığımız bilgiler", en: "What we collect", ru: "Какие данные мы собираем" },
          anyData
            ? [
                li([
                  { tr: "<b>Cihazınızda.</b> İlerlemeniz ve ayarlarınız cihazınızda yerel olarak saklanır.", en: "<b>On your device.</b> Your progress and settings are stored locally on your device.", ru: "<b>На вашем устройстве.</b> Ваш прогресс и настройки хранятся локально на устройстве." },
                  P.ads && {
                    tr: "<b>Reklam.</b> Uygulama, üçüncü taraf reklam servisleri (ör. Google AdMob) aracılığıyla reklam gösterir. Bu servisler reklamları göstermek ve ölçmek amacıyla cihaz tanımlayıcılarını (ör. reklam kimliği), IP adresini, yaklaşık konumu ve reklamlarla etkileşiminize dair bilgileri toplayabilir. iOS’ta kişiselleştirilmiş reklamlar yalnızca Apple’ın Uygulama Takip Şeffaflığı izninde takibe izin verirseniz gösterilir. Reklam kimliğinizi cihaz ayarlarından dilediğiniz zaman sıfırlayabilir veya sınırlayabilirsiniz.",
                    en: "<b>Advertising.</b> The App shows ads through third-party advertising services (such as Google AdMob). These services may collect device identifiers (such as the advertising ID), IP address, approximate location and information about how you interact with ads, in order to show and measure ads. On iOS, personalised ads are only shown if you allow tracking via Apple’s App Tracking Transparency prompt. You can reset or limit your advertising ID in your device settings at any time.",
                    ru: "<b>Реклама.</b> Приложение показывает рекламу через сторонние рекламные сервисы (например, Google AdMob). Эти сервисы могут собирать идентификаторы устройства (например, рекламный идентификатор), IP-адрес, приблизительное местоположение и сведения о взаимодействии с рекламой, чтобы показывать и оценивать её. На iOS персонализированная реклама показывается, только если вы разрешили отслеживание в запросе Apple App Tracking Transparency. Рекламный идентификатор можно в любой момент сбросить или ограничить в настройках устройства.",
                  },
                  P.analytics && {
                    tr: "<b>Analitik.</b> Uygulamanın nasıl kullanıldığını anlamak için bir analitik servisi (ör. Google Analytics for Firebase) kullanırız — örneğin hangi bölümlerin oynandığı ve oturumların ne kadar sürdüğü. Bu veriler cihaz tanımlayıcılarıyla ilişkilendirilebilir ancak adınız veya iletişim bilgilerinizle ilişkilendirilmez.",
                    en: "<b>Analytics.</b> We use an analytics service (such as Google Analytics for Firebase) to understand how the App is used — for example which levels are played and how long sessions last. This data may be associated with device identifiers but is not linked to your name or contact details.",
                    ru: "<b>Аналитика.</b> Мы используем сервис аналитики (например, Google Analytics for Firebase), чтобы понимать, как используется Приложение, — например, какие уровни проходят и сколько длятся сессии. Эти данные могут быть связаны с идентификаторами устройства, но не с вашим именем или контактами.",
                  },
                  P.crashReports && {
                    tr: "<b>Hata raporları.</b> Uygulama çökerse, bir hata raporlama servisi (ör. Firebase Crashlytics) bize cihaz modeli, işletim sistemi sürümü ve çökme anındaki uygulama durumu gibi teknik bilgiler gönderebilir. Bu bilgileri yalnızca hataları bulup düzeltmek için kullanırız.",
                    en: "<b>Crash reports.</b> If the App crashes, a crash-reporting service (such as Firebase Crashlytics) may send us technical information such as device model, operating system version and the state of the App at the time of the crash. We use this only to find and fix bugs.",
                    ru: "<b>Отчёты о сбоях.</b> Если Приложение аварийно завершится, сервис отчётов о сбоях (например, Firebase Crashlytics) может передать нам технические данные: модель устройства, версию ОС и состояние Приложения в момент сбоя. Мы используем их только для поиска и исправления ошибок.",
                  },
                  P.account && {
                    tr: "<b>Hesap.</b> Hesap oluşturursanız, giriş yapabilmeniz ve ilerlemenizi senkronize edebilmeniz için verdiğiniz bilgileri (ör. e-posta adresi veya kullanıcı adı) saklarız. Hesabınızın silinmesini dilediğiniz zaman talep edebilirsiniz (bkz. “Haklarınız”).",
                    en: "<b>Account.</b> If you create an account, we store the information you provide (such as your email address or username) so you can sign in and sync your progress. You can ask us to delete your account at any time (see “Your rights”).",
                    ru: "<b>Учётная запись.</b> Если вы создаёте учётную запись, мы храним предоставленные вами данные (например, email или имя пользователя), чтобы вы могли входить и синхронизировать прогресс. Вы можете в любой момент запросить удаление учётной записи (см. «Ваши права»).",
                  },
                  P.purchases && {
                    tr: "<b>Uygulama içi satın almalar.</b> Satın almalar tamamen Apple (App Store) veya Google (Google Play) tarafından işlenir. Ödeme bilgilerinizi hiçbir zaman almayız veya saklamayız; yalnızca içeriği açabilmek için satın alma yapıldığına dair onay alırız.",
                    en: "<b>In-app purchases.</b> Purchases are processed entirely by Apple (App Store) or Google (Google Play). We never receive or store your payment details; we only receive confirmation that a purchase was made so we can unlock content.",
                    ru: "<b>Встроенные покупки.</b> Покупки полностью обрабатываются Apple (App Store) или Google (Google Play). Мы никогда не получаем и не храним ваши платёжные данные — только подтверждение покупки, чтобы открыть контент.",
                  },
                  P.gameCenter && {
                    tr: "<b>Game Center.</b> Apple Game Center’a giriş yaptıysanız, liderlik tablolarını göstermek için skorlarınız, yıldızlarınız ve başarımlarınız Apple’a gönderilir. Game Center profiliniz Apple tarafından kendi gizlilik politikasına göre yönetilir.",
                    en: "<b>Game Center.</b> If you are signed in to Apple Game Center, your scores, stars and achievements are sent to Apple to show leaderboards. Your Game Center profile is handled by Apple under its own privacy policy.",
                    ru: "<b>Game Center.</b> Если вы вошли в Apple Game Center, ваши очки, звёзды и достижения передаются Apple для отображения таблиц лидеров. Ваш профиль Game Center обрабатывается Apple в соответствии с её политикой конфиденциальности.",
                  },
                  P.notifications && {
                    tr: "<b>Bildirimler.</b> İsteğe bağlı günlük hatırlatıcı cihazınızda yerel olarak planlanır. Uygulamadan veya cihaz ayarlarından dilediğiniz zaman kapatabilirsiniz.",
                    en: "<b>Notifications.</b> The optional daily reminder is scheduled locally on your device. You can turn it off at any time in the App or in your device settings.",
                    ru: "<b>Уведомления.</b> Необязательное ежедневное напоминание планируется локально на вашем устройстве. Его можно отключить в любой момент в Приложении или в настройках устройства.",
                  },
                ]),
                { tr: "Kişisel verilerinizi satmayız.", en: "We do not sell your personal data.", ru: "Мы не продаём ваши персональные данные." },
              ]
            : [
                {
                  tr: "<b>{app} hiçbir kişisel veri toplamaz, saklamaz veya paylaşmaz.</b> Reklam, analitik ya da takip araçları kullanmıyoruz; oynamak için hesap açmanıza gerek yoktur.",
                  en: "<b>{app} does not collect, store or share any personal data.</b> We do not use advertising, analytics or tracking tools, and you do not need an account to play.",
                  ru: "<b>{app} не собирает, не хранит и не передаёт никакие персональные данные.</b> Мы не используем рекламу, аналитику или средства отслеживания, а для игры не нужна учётная запись.",
                },
                { tr: "İlerlemeniz ve ayarlarınız yalnızca cihazınızda saklanır ve cihazınızdan çıkmaz.", en: "Your progress and settings are stored only on your device and never leave it.", ru: "Ваш прогресс и настройки хранятся только на вашем устройстве и никуда не передаются." },
                P.purchases && {
                  tr: "Uygulama içi satın almalar tamamen Apple veya Google tarafından işlenir; ödeme bilgilerinizi hiçbir zaman almayız.",
                  en: "In-app purchases are processed entirely by Apple or Google; we never receive your payment details.",
                  ru: "Встроенные покупки полностью обрабатываются Apple или Google; мы никогда не получаем ваши платёжные данные.",
                },
              ],
        ],
        third.length && [
          { tr: "Üçüncü taraf servisler", en: "Third-party services", ru: "Сторонние сервисы" },
          [{ tr: "Bu servislerin kendi gizlilik politikaları vardır:", en: "These services have their own privacy policies:", ru: "У этих сервисов есть собственные политики конфиденциальности:" }, `<ul>${third.join("")}</ul>`],
        ],
        [
          { tr: "Çocukların gizliliği", en: "Children’s privacy", ru: "Конфиденциальность детей" },
          [{
            tr: "Uygulama genel kitleye uygundur. 13 yaşın (veya ülkenizdeki eşdeğer asgari yaşın) altındaki çocuklardan bilerek kişisel bilgi toplamayız. Bir çocuğun bize kişisel bilgi verdiğini düşünüyorsanız lütfen bizimle iletişime geçin; bu bilgileri sileriz.",
            en: "The App is suitable for a general audience. We do not knowingly collect personal information from children under 13 (or the equivalent minimum age in your country). If you believe a child has provided us with personal information, please contact us and we will delete it.",
            ru: "Приложение подходит для широкой аудитории. Мы сознательно не собираем персональные данные детей младше 13 лет (или иного минимального возраста, установленного в вашей стране). Если вы считаете, что ребёнок передал нам персональные данные, свяжитесь с нами, и мы их удалим.",
          }],
        ],
        [
          { tr: "Verilerin saklanması ve silinmesi", en: "Data retention and deletion", ru: "Хранение и удаление данных" },
          [anyData
            ? {
                tr: "Yerel veriler Uygulamayı kaldırdığınızda silinir. Üçüncü taraf servislerin topladığı veriler, bu servislerin kendi saklama politikalarına göre tutulur. Sizinle ilgili verilerin silinmesini talep etmek için {email} adresine de yazabilirsiniz.",
                en: "Local data is deleted when you uninstall the App. Data collected by third-party services is kept according to their own retention policies. You can also email {email} to request deletion of any data related to you.",
                ru: "Локальные данные удаляются при удалении Приложения. Данные, собранные сторонними сервисами, хранятся в соответствии с их собственными правилами. Вы также можете написать на {email} и запросить удаление относящихся к вам данных.",
              }
            : {
                tr: "Tüm veriler cihazınızda kaldığı için, Uygulamayı kaldırarak bunları dilediğiniz zaman silebilirsiniz.",
                en: "Because all data stays on your device, you can delete it at any time by uninstalling the App.",
                ru: "Поскольку все данные остаются на вашем устройстве, вы можете удалить их в любой момент, удалив Приложение.",
              }],
        ],
        [
          { tr: "Haklarınız", en: "Your rights", ru: "Ваши права" },
          [{
            tr: "Yaşadığınız yere bağlı olarak (ör. Türkiye’de KVKK veya AB’de GDPR kapsamında) kişisel verilerinize erişme, bunları düzeltme veya silme ya da işlenmesine itiraz etme hakkına sahip olabilirsiniz. Bu haklarınızı kullanmak için {email} adresine e-posta gönderin.",
            en: "Depending on where you live (for example under KVKK in Türkiye or the GDPR in the EU), you may have the right to access, correct or delete your personal data, or to object to its processing. To exercise these rights, email us at {email}.",
            ru: "В зависимости от места проживания (например, согласно KVKK в Турции или GDPR в ЕС) вы можете иметь право на доступ к своим персональным данным, их исправление или удаление, а также возражать против их обработки. Чтобы воспользоваться этими правами, напишите нам на {email}.",
          }],
        ],
        [
          { tr: "Güvenlik", en: "Security", ru: "Безопасность" },
          [{ tr: "Bilgileri korumak için makul önlemler alırız. Ancak hiçbir elektronik saklama veya iletim yöntemi %100 güvenli değildir.", en: "We take reasonable measures to protect information. However, no method of electronic storage or transmission is 100% secure.", ru: "Мы принимаем разумные меры для защиты информации. Однако ни один способ электронного хранения или передачи данных не является абсолютно безопасным." }],
        ],
        [
          { tr: "Politikadaki değişiklikler", en: "Changes to this policy", ru: "Изменения политики" },
          [{ tr: "Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler, yeni bir “Son güncelleme” tarihiyle bu sayfada yayımlanır.", en: "We may update this policy from time to time. Changes are posted on this page with a new “Last updated” date.", ru: "Мы можем время от времени обновлять эту политику. Изменения публикуются на этой странице с новой датой «Последнее обновление»." }],
        ],
        [
          { tr: "İletişim", en: "Contact", ru: "Контакты" },
          [{ tr: "Bu politika hakkında sorularınız mı var? {email} adresine yazın.", en: "Questions about this policy? Email us at {email}.", ru: "Есть вопросы об этой политике? Напишите нам на {email}." }],
        ],
      ]
    );
  };

  /* ---------- Terms ---------- */
  const renderTerms = () =>
    legal(
      S.terms,
      {
        tr: "Bu Kullanım Koşulları (“Koşullar”), K&amp;Y Studios tarafından geliştirilen {app} uygulamasını (“Uygulama”) kullanımınızı düzenler. Uygulamayı indirerek veya kullanarak bu Koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen Uygulamayı kullanmayın.",
        en: "These Terms of Use (“Terms”) govern your use of {app} (the “App”), developed by K&amp;Y Studios. By downloading or using the App, you agree to these Terms. If you do not agree, please do not use the App.",
        ru: "Настоящие Условия использования («Условия») регулируют использование приложения {app} («Приложение»), разработанного K&amp;Y Studios. Скачивая или используя Приложение, вы соглашаетесь с этими Условиями. Если вы не согласны, пожалуйста, не используйте Приложение.",
      },
      [
        [
          { tr: "Lisans", en: "License", ru: "Лицензия" },
          [
            {
              tr: "Size, Uygulamayı sahip olduğunuz veya kontrol ettiğiniz cihazlarda kişisel ve ticari olmayan amaçlarla, bu Koşullara ve Uygulamayı indirdiğiniz mağazanın (Apple App Store veya Google Play) kurallarına uygun şekilde kullanmanız için kişisel, münhasır olmayan, devredilemez ve geri alınabilir bir lisans veririz.",
              en: "We grant you a personal, non-exclusive, non-transferable, revocable licence to use the App on devices you own or control, for personal and non-commercial purposes, in line with these Terms and the rules of the store you downloaded it from (Apple App Store or Google Play).",
              ru: "Мы предоставляем вам личную, неисключительную, непередаваемую и отзывную лицензию на использование Приложения на принадлежащих вам или контролируемых вами устройствах в личных некоммерческих целях в соответствии с настоящими Условиями и правилами магазина, из которого вы его скачали (Apple App Store или Google Play).",
            },
            p.platforms.includes("ios") && {
              tr: 'Uygulamayı Apple App Store’dan indirdiyseniz, Apple’ın <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener">Lisanslı Uygulama Son Kullanıcı Lisans Sözleşmesi</a> de geçerlidir.',
              en: 'If you downloaded the App from the Apple App Store, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener">Licensed Application End User License Agreement</a> also applies.',
              ru: 'Если вы скачали Приложение из Apple App Store, также применяется <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener">Лицензионное соглашение Apple с конечным пользователем</a>.',
            },
          ],
        ],
        [
          { tr: "Kabul edilebilir kullanım", en: "Acceptable use", ru: "Допустимое использование" },
          [{
            tr: "Uygulamayı kopyalamamayı, değiştirmemeyi, tersine mühendislik yapmamayı, kaynak koda dönüştürmemeyi veya yeniden dağıtmamayı; Uygulamanın işleyişini bozan hile, açık veya otomasyon kullanmamayı ve Uygulamayı hukuka aykırı amaçlarla kullanmamayı kabul edersiniz.",
            en: "You agree not to copy, modify, reverse-engineer, decompile or redistribute the App; not to use cheats, exploits or automation that interfere with the App; and not to use the App for any unlawful purpose.",
            ru: "Вы обязуетесь не копировать, не изменять, не декомпилировать, не подвергать обратной разработке и не распространять Приложение; не использовать читы, эксплойты или автоматизацию, нарушающие работу Приложения; и не использовать Приложение в незаконных целях.",
          }],
        ],
        [
          { tr: "Fikri mülkiyet", en: "Intellectual property", ru: "Интеллектуальная собственность" },
          [{
            tr: "Uygulama ve tasarım, grafikler, kod, bölümler, sesler ile K&amp;Y Studios adı ve logosu dahil tüm içeriği K&amp;Y Studios’a aittir ve fikri mülkiyet mevzuatıyla korunur.",
            en: "The App and all of its content — including design, graphics, code, levels, sounds and the K&amp;Y Studios name and logo — are owned by K&amp;Y Studios and protected by intellectual property laws.",
            ru: "Приложение и весь его контент — включая дизайн, графику, код, уровни, звуки, а также название и логотип K&amp;Y Studios — принадлежат K&amp;Y Studios и охраняются законодательством об интеллектуальной собственности.",
          }],
        ],
        P.purchases && [
          { tr: "Uygulama içi satın almalar", en: "In-app purchases", ru: "Встроенные покупки" },
          [{
            tr: "Uygulama içi satın almalar Apple veya Google tarafından işlenir ve bu şirketlerin koşullarına tabidir. İade talepleri ilgili mağaza üzerinden yapılmalıdır. Satın alınan dijital içeriğin nakdi değeri yoktur.",
            en: "In-app purchases are processed by Apple or Google and are subject to their terms. Refund requests must be made through the relevant store. Purchased digital content has no cash value.",
            ru: "Встроенные покупки обрабатываются Apple или Google и регулируются их условиями. Запросы на возврат средств подаются через соответствующий магазин. Приобретённый цифровой контент не имеет денежной стоимости.",
          }],
        ],
        P.ads && [
          { tr: "Reklamlar", en: "Advertising", ru: "Реклама" },
          [{
            tr: "Uygulama, üçüncü taraflarca sağlanan reklamlar gösterebilir. Üçüncü taraf reklamların içeriğinden veya sundukları ürün ve hizmetlerden sorumlu değiliz.",
            en: "The App may display advertisements provided by third parties. We are not responsible for the content of third-party ads or for any products or services they offer.",
            ru: "Приложение может показывать рекламу третьих лиц. Мы не несём ответственности за содержание такой рекламы и за предлагаемые в ней товары или услуги.",
          }],
        ],
        [
          { tr: "Gizlilik", en: "Privacy", ru: "Конфиденциальность" },
          [{
            tr: `Uygulamayı kullanımınız ayrıca <a href="${projUrl}privacy/">Gizlilik Politikamıza</a> tabidir.`,
            en: `Your use of the App is also governed by our <a href="${projUrl}privacy/">Privacy Policy</a>.`,
            ru: `Использование Приложения также регулируется нашей <a href="${projUrl}privacy/">Политикой конфиденциальности</a>.`,
          }],
        ],
        [
          { tr: "Sorumluluk reddi", en: "Disclaimer", ru: "Отказ от гарантий" },
          [{
            tr: "Uygulama, herhangi bir garanti verilmeksizin “olduğu gibi” ve “mevcut olduğu şekilde” sunulur. Uygulamanın kesintisiz, hatasız veya her cihazla uyumlu olacağını garanti etmeyiz.",
            en: "The App is provided “as is” and “as available”, without warranties of any kind. We do not guarantee that the App will be uninterrupted, error-free or compatible with every device.",
            ru: "Приложение предоставляется «как есть» и «по мере доступности», без каких-либо гарантий. Мы не гарантируем, что Приложение будет работать бесперебойно, без ошибок или на любом устройстве.",
          }],
        ],
        [
          { tr: "Sorumluluğun sınırlandırılması", en: "Limitation of liability", ru: "Ограничение ответственности" },
          [{
            tr: "Yasaların izin verdiği azami ölçüde K&amp;Y Studios, Uygulamayı kullanımınızdan doğan dolaylı, arızi veya sonuç niteliğindeki zararlardan ya da veri veya ilerleme kaybından sorumlu değildir.",
            en: "To the maximum extent permitted by law, K&amp;Y Studios is not liable for any indirect, incidental or consequential damages, or for any loss of data or progress, arising from your use of the App.",
            ru: "В максимальной степени, допускаемой законом, K&amp;Y Studios не несёт ответственности за косвенные, случайные или последующие убытки, а также за потерю данных или прогресса, возникшие в связи с использованием Приложения.",
          }],
        ],
        [
          { tr: "Değişiklikler ve fesih", en: "Changes and termination", ru: "Изменения и прекращение" },
          [{
            tr: "Uygulamayı veya bu Koşulları dilediğimiz zaman güncelleyebiliriz. Değişikliklerden sonra Uygulamayı kullanmaya devam etmeniz yeni Koşulları kabul ettiğiniz anlamına gelir. Bu Koşulların ihlali halinde Uygulamaya erişimi askıya alabilir veya sonlandırabiliriz.",
            en: "We may update the App or these Terms at any time. Continued use after changes means you accept the new Terms. We may suspend or end access to the App if these Terms are violated.",
            ru: "Мы можем в любое время обновлять Приложение или настоящие Условия. Продолжая пользоваться Приложением после изменений, вы принимаете новые Условия. При нарушении Условий мы можем приостановить или прекратить доступ к Приложению.",
          }],
        ],
        [
          { tr: "İletişim", en: "Contact", ru: "Контакты" },
          [{ tr: "Bu Koşullar hakkında sorularınız için {email} adresine yazın.", en: "Questions about these Terms? Email us at {email}.", ru: "Вопросы об этих Условиях? Напишите нам на {email}." }],
        ],
      ]
    );

  /* ---------- Support ---------- */
  const renderSupport = () => {
    const subject = encodeURIComponent(`${p.name} — Support`);
    const faqs = [
      ...(p.faq.en || []).map((_, i) => [0, 1].map((j) => ({ tr: (p.faq.tr || p.faq.en)[i][j], en: p.faq.en[i][j], ru: (p.faq.ru || p.faq.en)[i][j] }))),
      [
        { tr: "Hangi cihazlar destekleniyor?", en: "Which devices are supported?", ru: "Какие устройства поддерживаются?" },
        { tr: "{app} güncel telefon ve tabletlerin çoğunda çalışır. En iyi deneyim için işletim sisteminizi güncel tutmanızı öneririz.", en: "{app} works on most recent phones and tablets. Keeping your operating system up to date gives the best experience.", ru: "{app} работает на большинстве современных смартфонов и планшетов. Для лучшей работы рекомендуем обновлять операционную систему." },
      ],
      P.purchases && [
        { tr: "Satın alımlarımı nasıl geri yüklerim?", en: "How do I restore my purchases?", ru: "Как восстановить покупки?" },
        { tr: "Satın alırken kullandığınız Apple ID veya Google hesabıyla giriş yapmış olarak Uygulamadaki “Satın alımları geri yükle” seçeneğini kullanın.", en: "Use the “Restore purchases” option in the App while signed in with the same Apple ID or Google account you used to buy.", ru: "Воспользуйтесь пунктом «Восстановить покупки» в Приложении, войдя в тот же Apple ID или аккаунт Google, с которого совершалась покупка." },
      ],
      [
        { tr: "{app} verilerimi topluyor mu?", en: "Does {app} collect my data?", ru: "Собирает ли {app} мои данные?" },
        anyData
          ? { tr: `Yalnızca <a href="${projUrl}privacy/">Gizlilik Politikamızda</a> açıklanan veriler.`, en: `Only what is described in our <a href="${projUrl}privacy/">Privacy Policy</a>.`, ru: `Только то, что описано в нашей <a href="${projUrl}privacy/">Политике конфиденциальности</a>.` }
          : { tr: `Hayır. Tüm veriler cihazınızda kalır. Ayrıntılar için <a href="${projUrl}privacy/">Gizlilik Politikamıza</a> bakın.`, en: `No. Everything stays on your device. See our <a href="${projUrl}privacy/">Privacy Policy</a> for details.`, ru: `Нет. Все данные остаются на вашем устройстве. Подробнее — в нашей <a href="${projUrl}privacy/">Политике конфиденциальности</a>.` },
      ],
    ].filter(Boolean);
    const v = { app: p.name, email: mail };
    return `
      <section class="legal">
        <div class="container legal__inner">
          ${crumb(S.support)}
          <header class="legal__head reveal">${t(S.support, "h1")}</header>
          ${t({ tr: "{app} hakkında bir sorun mu var, bir hata mı buldun ya da bir fikrin mi var? Duymak isteriz.", en: "Have a question, found a bug or have an idea for {app}? We’d love to hear from you.", ru: "Есть вопрос, нашли ошибку или есть идея для {app}? Будем рады услышать вас." }, "p", 'class="lead reveal"', v)}
          <div class="support-box reveal">
            <div>
              <a class="btn btn--gold magnetic" href="mailto:${EMAIL}?subject=${subject}">${t({ tr: "Destek ekibine yaz", en: "Email support", ru: "Написать в поддержку" })}</a>
              <p class="support-box__mail">${mail}</p>
              ${t({ tr: "Genellikle 2 iş günü içinde yanıt veririz.", en: "We usually reply within 2 business days.", ru: "Обычно мы отвечаем в течение 2 рабочих дней." }, "p", 'class="support-box__note"')}
            </div>
            <div>
              ${t({ tr: "Hata bildirirken lütfen şunları ekle:", en: "When reporting a bug, please include:", ru: "Сообщая об ошибке, укажите, пожалуйста:" }, "h3")}
              ${li([
                { tr: "Cihaz modeli", en: "Device model", ru: "Модель устройства" },
                { tr: "İşletim sistemi sürümü", en: "Operating system version", ru: "Версию ОС" },
                { tr: "Uygulama sürümü", en: "App version", ru: "Версию приложения" },
                { tr: "Ne olduğu ve nasıl tekrarlanabileceği", en: "What happened and how to reproduce it", ru: "Что произошло и как это воспроизвести" },
                { tr: "Mümkünse ekran görüntüsü", en: "A screenshot, if possible", ru: "Скриншот, если возможно" },
              ])}
            </div>
          </div>
          <section class="faq">
            <h2 class="reveal"><span class="num">?</span>${t({ tr: "Sık sorulan sorular", en: "Frequently asked questions", ru: "Частые вопросы" })}</h2>
            ${faqs.map(([q, a]) => `<details class="reveal"><summary>${t(q, "span", "", v)}<i aria-hidden="true"></i></summary><div class="faq__a">${t(a, "p", "", v)}</div></details>`).join("")}
          </section>
          ${legalNav("support")}
        </div>
      </section>`;
  };

  app.innerHTML = { project: renderProject, privacy: renderPrivacy, terms: renderTerms, support: renderSupport }[PAGE]();
})();
