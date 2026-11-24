/* K&Y Studios — main.js (no dependencies) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- i18n (TR / EN) ---------- */
  const dict = {
    en: {
      "nav.about": "About", "nav.projects": "Projects", "nav.process": "Approach", "nav.contact": "Contact",
      "hero.tag": "Games & Apps · Made with curiosity",
      "hero.cta1": "See our projects", "hero.cta2": "Get in touch",
      "about.eyebrow": "About",
      "about.title": 'Curious like a cat,<br /><span class="gold">precise like one too.</span>',
      "about.p1": "K&Y Studios is an independent studio crafting games that challenge the mind and apps that make everyday life simpler. Every project starts with one question: “Why can’t this be more fun?”",
      "about.p2": "Clean interfaces, fluid animation and mechanics that get deeper the more you play — that’s the balance we look for in everything we build.",
      "about.s1": "Projects live", "about.s2": "Independent", "about.s3": "Curiosity",
      "projects.eyebrow": "Projects",
      "projects.title": 'Things we’re <span class="gold">building</span>',
      "tag.game": "Game", "tag.memory": "Memory", "tag.puzzle": "Puzzle", "tag.soon": "Coming soon",
      "mm.desc": "Flip the cards, find the pairs, push your memory. A matching game built for short sessions that gets harder the more you play.",
      "tw.desc": "Rotate the rings, line up the pieces. A circular puzzle game that rewards spatial thinking and strategy.",
      "card.more": "Details soon →",
      "next.title": "What’s next?",
      "next.desc": "We’re working on new games and apps. Follow us on LinkedIn to hear first.",
      "next.cta": "Follow →",
      "process.eyebrow": "Approach",
      "process.title": 'How we <span class="gold">work</span>',
      "p1.t": "Be curious", "p1.d": "Everything starts with a small “what if?”. We prototype ideas fast.",
      "p2.t": "Simplify", "p2.d": "We strip away everything unnecessary. What’s left is instantly clear and fun.",
      "p3.t": "Polish", "p3.d": "Animation, sound, tiny details. What makes people love a product is often the craft you don’t see.",
      "p4.t": "Ship & listen", "p4.d": "After launch we listen to players and keep improving.",
      "contact.eyebrow": "Contact",
      "contact.title": 'Shall we build<br /><span class="gold">something together?</span>',
      "contact.sub": "Write to us for collaborations, feedback, or just to say hi.",
      "footer.rights": "All rights reserved.", "footer.top": "Back to top ↑",
      "footer.privacy": "Privacy Policy", "footer.terms": "Terms of Use",
    },
    ru: {
      "nav.about": "О нас", "nav.projects": "Проекты", "nav.process": "Подход", "nav.contact": "Контакты",
      "hero.tag": "Игры и приложения · Созданы с любопытством",
      "hero.cta1": "Наши проекты", "hero.cta2": "Связаться с нами",
      "about.eyebrow": "О нас",
      "about.title": 'Любопытны, как кошки,<br /><span class="gold">и так же точны.</span>',
      "about.p1": "K&Y Studios — независимая студия, которая создаёт игры, тренирующие ум, и приложения, упрощающие повседневную жизнь. Каждый проект начинается с одного вопроса: «Почему бы не сделать это интереснее?»",
      "about.p2": "Чистые интерфейсы, плавная анимация и механики, которые раскрываются по мере игры, — именно этот баланс мы ищем во всём, что создаём.",
      "about.s1": "Проекта в релизе", "about.s2": "Независимы", "about.s3": "Любопытство",
      "projects.eyebrow": "Проекты",
      "projects.title": 'Над чем мы <span class="gold">работаем</span>',
      "tag.game": "Игра", "tag.memory": "Память", "tag.puzzle": "Головоломка", "tag.soon": "Скоро",
      "mm.desc": "Переворачивайте карточки, находите пары, тренируйте память. Игра на поиск пар для коротких сессий, которая становится сложнее с каждым уровнем.",
      "tw.desc": "Вращайте кольца, выстраивайте элементы. Круговая головоломка, которая вознаграждает пространственное мышление и стратегию.",
      "card.more": "Подробности скоро →",
      "next.title": "Что дальше?",
      "next.desc": "Мы работаем над новыми играми и приложениями. Подписывайтесь на нас в LinkedIn, чтобы узнать первыми.",
      "next.cta": "Подписаться →",
      "process.eyebrow": "Подход",
      "process.title": 'Как мы <span class="gold">работаем</span>',
      "p1.t": "Любопытство", "p1.d": "Всё начинается с маленького «а что, если?». Мы быстро превращаем идеи в прототипы.",
      "p2.t": "Простота", "p2.d": "Убираем всё лишнее. Остаётся то, что понятно с первого взгляда и приносит удовольствие.",
      "p3.t": "Шлифовка", "p3.d": "Анимация, звук, мелкие детали. Продукт часто любят именно за ту работу, которую не видно.",
      "p4.t": "Релиз и обратная связь", "p4.d": "После запуска мы слушаем игроков и продолжаем улучшать продукт.",
      "contact.eyebrow": "Контакты",
      "contact.title": 'Создадим что-нибудь<br /><span class="gold">вместе?</span>',
      "contact.sub": "Пишите нам по поводу сотрудничества, с отзывами или просто чтобы поздороваться.",
      "footer.rights": "Все права защищены.", "footer.top": "Наверх ↑",
      "footer.privacy": "Политика конфиденциальности", "footer.terms": "Условия использования",
    },
    tr: {},
  };
  const LANGS = ["tr", "en", "ru"];
  // Extra strings registered by other scripts (projects.js / page.js) before this file loads
  const extra = window.KY_EXTRA || {};
  LANGS.forEach((l) => Object.assign((dict[l] = dict[l] || {}), extra[l] || {}));
  // Capture Turkish (default) strings from the DOM
  $$("[data-i18n]").forEach((el) => (dict.tr[el.dataset.i18n] = el.textContent));
  $$("[data-i18n-html]").forEach((el) => (dict.tr[el.dataset.i18nHtml] = el.innerHTML));

  const langSwitches = $$(".lang");
  const langBtns = $$(".lang button[data-lang]");
  const setLang = (lang) => {
    const d = dict[lang];
    $$("[data-i18n]").forEach((el) => d[el.dataset.i18n] && (el.textContent = d[el.dataset.i18n]));
    $$("[data-i18n-html]").forEach((el) => d[el.dataset.i18nHtml] && (el.innerHTML = d[el.dataset.i18nHtml]));
    document.documentElement.lang = lang;
    langBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    langSwitches.forEach((sw) => sw.style.setProperty("--i", LANGS.indexOf(lang)));
    try { localStorage.setItem("ky-lang", lang); } catch (e) {}
  };
  let saved = null;
  try { saved = localStorage.getItem("ky-lang"); } catch (e) {}
  const browser = (navigator.language || "tr").slice(0, 2).toLowerCase();
  const initial = LANGS.includes(saved) ? saved : LANGS.includes(browser) ? browser : "en";
  if (initial !== "tr") setLang(initial);
  langBtns.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* ---------- Preloader ---------- */
  const finishLoading = () => {
    const loader = $(".loader");
    if (loader) loader.classList.add("done");
    body.classList.remove("is-loading");
    body.classList.add("ready");
  };
  const minTime = reduceMotion ? 0 : 1300;
  const start = performance.now();
  window.addEventListener("load", () => {
    setTimeout(finishLoading, Math.max(0, minTime - (performance.now() - start)));
  });
  setTimeout(() => body.classList.contains("ready") || finishLoading(), 4000); // safety

  /* ---------- Nav: scrolled / hide on scroll down ---------- */
  const nav = $("#nav");
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("scrolled", y > 30);
    if (!body.classList.contains("menu-open")) nav.classList.toggle("hidden", y > lastY && y > 400);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const toggleMenu = (open) => {
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => toggleMenu(!body.classList.contains("menu-open")));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && toggleMenu(false));
  addEventListener("resize", () => innerWidth > 820 && toggleMenu(false));

  /* ---------- Active nav link ---------- */
  const links = $$("#navLinks a");
  const sectionObs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => sectionObs.observe(s));

  /* ---------- Scroll reveal (staggered) ---------- */
  const groups = new Map();
  $$(".reveal").forEach((el) => {
    const p = el.parentElement;
    const i = groups.get(p) || 0;
    el.style.setProperty("--d", `${i * 0.12}s`);
    groups.set(p, i + 1);
  });
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------- Counters ---------- */
  const countObs = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
    const dur = reduceMotion ? 1 : 1600, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countObs.observe(el));

  /* ---------- Year ---------- */
  $$(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));

  if (reduceMotion || !finePointer) return; // pointer effects only on desktop

  /* ---------- Hero: glow follows mouse + logo tilt ---------- */
  const hero = $("#hero"), logo = $(".hero__logo");
  if (hero && logo) hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    hero.style.setProperty("--gx", `${x * 100}%`);
    hero.style.setProperty("--gy", `${y * 100}%`);
    logo.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    logo.style.setProperty("--rx", `${(0.5 - y) * 16}deg`);
  });
  if (hero && logo) hero.addEventListener("mouseleave", () => {
    hero.style.removeProperty("--gx"); hero.style.removeProperty("--gy");
    logo.style.setProperty("--rx", "0deg"); logo.style.setProperty("--ry", "0deg");
  });

  /* ---------- Cards: 3D tilt + spotlight ---------- */
  $$(".card").forEach((card) => {
    const tilt = card.classList.contains("tilt");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (tilt) card.style.transform = `perspective(900px) rotateX(${(0.5 - y / r.height) * 7}deg) rotateY(${(x / r.width - 0.5) * 7}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform .7s cubic-bezier(.22,1,.36,1), border-color .5s, box-shadow .5s";
      card.style.transform = "";
      setTimeout(() => (card.style.transition = ""), 700);
    });
  });

  /* ---------- Magnetic buttons ---------- */
  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });

  /* ---------- Paw print cursor trail ---------- */
  const trail = $(".trail");
  let lx = 0, ly = 0, side = 1;
  addEventListener("mousemove", (e) => {
    const dx = e.clientX - lx, dy = e.clientY - ly;
    if (Math.hypot(dx, dy) < 70) return;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    const nx = -dy / Math.hypot(dx, dy), ny = dx / Math.hypot(dx, dy); // perpendicular offset
    side *= -1;
    const p = document.createElement("span");
    p.className = "paw";
    p.style.left = `${e.clientX + nx * 9 * side - 7}px`;
    p.style.top = `${e.clientY + ny * 9 * side - 7}px`;
    p.style.rotate = `${angle}deg`;
    trail.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
    lx = e.clientX; ly = e.clientY;
  }, { passive: true });
})();
