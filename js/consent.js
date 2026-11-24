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

  const PAGE_TYPE = document.body.dataset.page || "home";
  const PAGE_PROJECT = document.body.dataset.project || "";
  // "match-mind" → "matchmind" (GA event names: letters, numbers, underscore)
  const PREFIX = (slug) => (slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");

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
    else gtag("config", GA, { content_group: PAGE_PROJECT ? PREFIX(PAGE_PROJECT) : "studio" });
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

  /* =========================================================
     CLICK TRACKING — GA4 events (only sent after consent)
     ---------------------------------------------------------
     Her proje kendi adıyla ayrı olay gönderir (prefix = slug, tiresiz):
       matchmind_app_store_click     MatchMind → App Store butonu
       matchmind_google_play_click   MatchMind → Google Play butonu (status: live / coming_soon)
       matchmind_card_click          Ana sayfadaki MatchMind kartı
       matchmind_support_click       MatchMind destek / privacy / terms linkleri
       matchmind_privacy_click, matchmind_terms_click
       matchmind_email_click         MatchMind sayfalarından e-posta
       matchmind_faq_open            MatchMind SSS
       turnwise_…                    aynı olaylar Turnwise için
     Genel (site) olayları:
       email_click, social_click, cta_click, nav_click, footer_click,
       language_change, menu_toggle, site_privacy_click, site_terms_click,
       outbound_click, internal_click
     Tüm olaylarda: page_type, location; proje sayfalarında project.
     Sayfa görüntülemeleri "content_group" ile ayrılır: matchmind / turnwise / studio.
     ========================================================= */

  const track = (name, params = {}) => {
    if (!loaded || typeof window.gtag !== "function") return;
    gtag("event", name, { page_type: PAGE_TYPE, ...(PAGE_PROJECT && { project: PAGE_PROJECT }), ...params });
  };
  window.kyTrack = track;

  const where = (el) => {
    if (el.closest(".nav")) return "nav";
    if (el.closest(".footer")) return "footer";
    if (el.closest(".consent")) return "cookie_banner";
    const sec = el.closest("section[id], section[class]");
    return (sec && (sec.id || sec.className.split(" ")[0])) || "page";
  };
  const slugFrom = (href) => ((href || "").match(/projects\/([^/]+)\//) || [])[1] || "";
  const text = (el) => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  const STORE = { "App Store": "app_store", "Google Play": "google_play", Web: "web" };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("a, button, .store-btn, summary");
    if (!el || el.closest(".consent")) return;
    const href = el.getAttribute("href") || "";
    const url = href ? new URL(href, location.href) : null;
    const loc = where(el);

    if (el.matches(".store-btn")) {
      const store = STORE[text(el.querySelector("b") || el)] || "unknown";
      const pr = PREFIX(PAGE_PROJECT || slugFrom(href));
      return track(`${pr}_${store}_click`, { store, status: el.classList.contains("is-soon") ? "coming_soon" : "live", link_url: url ? url.href : "", location: loc });
    }
    if (el.matches("summary")) return; // handled by FAQ toggle below
    if (el.matches(".lang button")) return track("language_change", { language: el.dataset.lang, location: loc });
    if (el.matches("#burger")) return track("menu_toggle", { state: document.body.classList.contains("menu-open") ? "close" : "open" });
    if (el.matches(".footer__ck")) return track("footer_click", { link_text: "cookie_settings" });
    if (href.startsWith("mailto:")) return track(PAGE_PROJECT ? `${PREFIX(PAGE_PROJECT)}_email_click` : "email_click", { location: loc });
    if (url && /linkedin\.com$/i.test(url.hostname.replace(/^www\./, ""))) return track("social_click", { network: "linkedin", location: loc });
    if (el.matches("a.card")) return track(`${PREFIX(slugFrom(href))}_card_click`, { project: slugFrom(href), location: loc });
    if (el.matches(".legal-card") || (url && /\/(privacy|terms|support)\/$/.test(url.pathname))) {
      const m = url ? url.pathname.match(/\/(privacy|terms|support)\/$/) : null;
      const page = m ? m[1] : "unknown";
      const slug = slugFrom(href);
      return track(slug ? `${PREFIX(slug)}_${page}_click` : `site_${page}_click`, { legal_page: page, project: slug || "studio", location: loc });
    }
    if (el.closest(".hero__cta") || el.matches(".btn")) return track("cta_click", { cta: (url && url.hash) || text(el), location: loc });
    if (loc === "nav" || el.closest(".crumb")) return track("nav_click", { link_url: url ? url.pathname + url.hash : "", link_text: text(el) });
    if (loc === "footer") return track("footer_click", { link_url: url ? url.pathname + url.hash : "", link_text: text(el) });
    if (url && url.host !== location.host) return track("outbound_click", { link_url: url.href, link_domain: url.hostname, location: loc });
    track("internal_click", { link_url: url ? url.pathname + url.hash : "", link_text: text(el), location: loc });
  }, true);

  // FAQ opens (support pages)
  document.addEventListener("toggle", (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.open) return;
    const all = [...document.querySelectorAll(".faq details")];
    track(`${PREFIX(PAGE_PROJECT) || "site"}_faq_open`, { question_index: all.indexOf(d) + 1, question: text(d.querySelector("summary")) });
  }, true);

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
