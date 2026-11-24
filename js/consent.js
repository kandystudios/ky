/* =========================================================
   K&Y Studios — consent.js
   Çerez onayı + Google Analytics 4.
   GA yalnızca ziyaretçi "Kabul et" derse yüklenir (KVKK / GDPR).
   main.js'ten ÖNCE yüklenmelidir (çeviriler için).
   ========================================================= */
(() => {
  const GA = (window.KY_CONFIG || {}).gaId;
  if (!GA) return; // Analytics kapalı

  const KEY = "ky-consent";
  const ROOT = document.body.dataset.root || "";
  const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const set = (v) => { try { localStorage.setItem(KEY, v); } catch (e) {} };

  /* ---------- Translations (picked up by main.js) ---------- */
  const extra = (window.KY_EXTRA = window.KY_EXTRA || { tr: {}, en: {}, ru: {} });
  const T = {
    "ck.title": { tr: "Çerez tercihi", en: "Cookies", ru: "Файлы cookie" },
    "ck.body": {
      tr: `Sitenin nasıl kullanıldığını anlamak için Google Analytics çerezlerini kullanmak istiyoruz. Reklam için kullanılmaz. <a href="${ROOT}privacy/">Ayrıntılar</a>`,
      en: `We’d like to use Google Analytics cookies to understand how the site is used. They are never used for advertising. <a href="${ROOT}privacy/">Details</a>`,
      ru: `Мы хотели бы использовать cookie Google Analytics, чтобы понимать, как используется сайт. Они не используются для рекламы. <a href="${ROOT}privacy/">Подробнее</a>`,
    },
    "ck.accept": { tr: "Kabul et", en: "Accept", ru: "Принять" },
    "ck.decline": { tr: "Reddet", en: "Decline", ru: "Отклонить" },
    "ck.settings": { tr: "Çerez ayarları", en: "Cookie settings", ru: "Настройки cookie" },
  };
  Object.entries(T).forEach(([k, v]) => ["tr", "en", "ru"].forEach((l) => (extra[l][k] = v[l])));

  /* ---------- Google Analytics ---------- */
  let loaded = false;
  const loadGA = () => {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    const isGTM = /^GTM-/i.test(GA);
    if (isGTM) dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    else gtag("config", GA);
    const s = document.createElement("script");
    s.async = true;
    s.src = isGTM ? `https://www.googletagmanager.com/gtm.js?id=${GA}` : `https://www.googletagmanager.com/gtag/js?id=${GA}`;
    document.head.appendChild(s);
  };
  const clearGACookies = () => {
    document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => /^_ga/.test(n)).forEach((n) => {
      [location.hostname, "." + location.hostname, ""].forEach((d) => {
        document.cookie = `${n}=; Max-Age=0; path=/;${d ? " domain=" + d + ";" : ""}`;
      });
    });
  };

  /* ---------- Banner ---------- */
  const banner = document.createElement("div");
  banner.className = "consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", T["ck.title"].en);
  banner.innerHTML = `
    <span class="consent__paw" aria-hidden="true"></span>
    <strong data-i18n="ck.title">${T["ck.title"].tr}</strong>
    <p data-i18n-html="ck.body">${T["ck.body"].tr}</p>
    <div class="consent__btns">
      <button class="btn btn--gold" data-ck="granted" data-i18n="ck.accept">${T["ck.accept"].tr}</button>
      <button class="btn btn--ghost" data-ck="denied" data-i18n="ck.decline">${T["ck.decline"].tr}</button>
    </div>`;
  document.body.appendChild(banner);

  const show = () => requestAnimationFrame(() => banner.classList.add("is-open"));
  const hide = () => banner.classList.remove("is-open");

  banner.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ck]");
    if (!b) return;
    const prev = get();
    set(b.dataset.ck);
    hide();
    if (b.dataset.ck === "granted") loadGA();
    else if (prev === "granted") { clearGACookies(); location.reload(); }
  });

  /* ---------- Footer "Cookie settings" link ---------- */
  document.querySelectorAll(".footer__legal").forEach((nav) => {
    const a = document.createElement("button");
    a.type = "button";
    a.className = "footer__ck";
    a.dataset.i18n = "ck.settings";
    a.textContent = T["ck.settings"].tr;
    a.addEventListener("click", show);
    nav.appendChild(a);
  });

  /* ---------- Init ---------- */
  const choice = get();
  if (choice === "granted") loadGA();
  else if (choice !== "denied") setTimeout(show, 1800);
})();
