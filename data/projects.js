/* =========================================================
   K&Y Studios — PROJE VERİLERİ
   ---------------------------------------------------------
   Yeni proje eklemek için:
   1) Aşağıya yeni bir blok ekle (en kolayı mevcut birini kopyalamak).
   2) Terminalde:  ./tools/new-project.sh yeni-proje-slug
      (projects/<slug>/ klasörünü ve 4 sayfayı otomatik oluşturur)
   3) Commit + push. Ana sayfadaki kart ve tüm alt sayfalar kendiliğinden oluşur.

   Metinler { tr, en, ru } şeklinde. Bir dil boş kalırsa İngilizce gösterilir.
   ========================================================= */

window.KY_PROJECTS = [
  {
    slug: "match-mind",
    name: "Match Mind",
    visual: "match",              // "match" | "turn" | "icon"  (icon → aşağıdaki icon görseli)
    icon: "",                     // örn. "assets/projects/match-mind/icon.png"
    status: "live",               // "live" | "soon"
    platforms: ["ios", "android"],
    stores: {
      appStore: "",               // App Store linki gelince buraya
      googlePlay: "",             // Google Play linki gelince buraya
      web: "",
    },
    // ⚠️ GİZLİLİK AYARLARI — uygulamanın gerçekte kullandıklarına göre düzelt.
    // Gizlilik politikası bu değerlerden otomatik yazılır.
    privacy: {
      ads: false,                 // Google AdMob vb. reklam SDK'sı var mı?
      analytics: false,           // Firebase Analytics vb. var mı?
      crashReports: false,        // Crashlytics vb. var mı?
      purchases: false,           // Uygulama içi satın alma var mı?
      account: false,             // Kullanıcı hesabı / giriş var mı?
    },
    updated: "2026-11-24",        // Yasal sayfaların "son güncelleme" tarihi
    tags: { tr: ["Oyun", "Hafıza"], en: ["Game", "Memory"], ru: ["Игра", "Память"] },
    tagline: {
      tr: "Kartları çevir, eşleri bul, hafızanı zorla.",
      en: "Flip the cards, find the pairs, push your memory.",
      ru: "Переворачивайте карточки, находите пары, тренируйте память.",
    },
    summary: {
      tr: "Kartları çevir, eşleri bul, hafızanı zorla. Kısa oturumlar için tasarlanmış, oynadıkça zorlaşan bir eşleştirme oyunu.",
      en: "Flip the cards, find the pairs, push your memory. A matching game built for short sessions that gets harder the more you play.",
      ru: "Переворачивайте карточки, находите пары, тренируйте память. Игра на поиск пар для коротких сессий, которая становится сложнее с каждым уровнем.",
    },
    description: {
      tr: "Match Mind, hafızanı ve dikkatini eğlenceli bir şekilde çalıştıran sade bir kart eşleştirme oyunu. Kartları çevir, yerlerini aklında tut ve tüm eşleri en az hamlede bulmaya çalış. Birkaç dakikalık molalar için ideal; ama bir kere başlayınca bırakmak zor.",
      en: "Match Mind is a clean card-matching game that trains your memory and focus in a fun way. Flip the cards, remember where they are and try to find every pair in as few moves as possible. Perfect for a few minutes’ break — but hard to put down once you start.",
      ru: "Match Mind — лаконичная игра на поиск пар, которая в увлекательной форме тренирует память и внимание. Переворачивайте карточки, запоминайте их расположение и старайтесь найти все пары за минимальное число ходов. Идеально для коротких перерывов — но оторваться сложно.",
    },
    features: {
      tr: [
        ["Zorlaşan seviyeler", "Her seviyede daha fazla kart, daha fazla meydan okuma."],
        ["Kısa oturumlar", "Birkaç dakikada bir tur; molalar için birebir."],
        ["Sade tasarım", "Dikkat dağıtmayan, akıcı animasyonlu arayüz."],
        ["Çevrimdışı oyna", "İnternet bağlantısı gerekmez."],
      ],
      en: [
        ["Growing challenge", "More cards and a bigger challenge with every level."],
        ["Short sessions", "A round takes a few minutes — perfect for breaks."],
        ["Clean design", "A distraction-free interface with smooth animation."],
        ["Play offline", "No internet connection required."],
      ],
      ru: [
        ["Растущая сложность", "С каждым уровнем больше карточек и интереснее задачи."],
        ["Короткие сессии", "Раунд занимает пару минут — идеально для перерыва."],
        ["Чистый дизайн", "Интерфейс без лишнего, с плавной анимацией."],
        ["Играйте офлайн", "Подключение к интернету не требуется."],
      ],
    },
    faq: {
      tr: [
        ["İnternet bağlantısı gerekiyor mu?", "Hayır, Match Mind tamamen çevrimdışı oynanabilir."],
        ["İlerlememi nasıl sıfırlarım?", "Uygulamayı silip yeniden yüklediğinde tüm ilerleme sıfırlanır."],
      ],
      en: [
        ["Do I need an internet connection?", "No, Match Mind can be played completely offline."],
        ["How do I reset my progress?", "Deleting and reinstalling the app resets all progress."],
      ],
      ru: [
        ["Нужен ли интернет?", "Нет, в Match Mind можно играть полностью офлайн."],
        ["Как сбросить прогресс?", "Удалите и заново установите приложение — весь прогресс будет сброшен."],
      ],
    },
  },

  {
    slug: "turnwise",
    name: "Turnwise",
    visual: "turn",
    icon: "",
    status: "live",
    platforms: ["ios", "android"],
    stores: { appStore: "", googlePlay: "", web: "" },
    // ⚠️ GİZLİLİK AYARLARI — uygulamanın gerçekte kullandıklarına göre düzelt.
    privacy: { ads: false, analytics: false, crashReports: false, purchases: false, account: false },
    updated: "2026-11-24",
    tags: { tr: ["Oyun", "Bulmaca"], en: ["Game", "Puzzle"], ru: ["Игра", "Головоломка"] },
    tagline: {
      tr: "Halkaları döndür, parçaları hizala.",
      en: "Rotate the rings, line up the pieces.",
      ru: "Вращайте кольца, выстраивайте элементы.",
    },
    summary: {
      tr: "Halkaları döndür, parçaları hizala. Uzamsal düşünmeyi ve stratejiyi ödüllendiren dairesel bir bulmaca oyunu.",
      en: "Rotate the rings, line up the pieces. A circular puzzle game that rewards spatial thinking and strategy.",
      ru: "Вращайте кольца, выстраивайте элементы. Круговая головоломка, которая вознаграждает пространственное мышление и стратегию.",
    },
    description: {
      tr: "Turnwise, iç içe geçmiş halkaları döndürerek parçaları doğru yere oturttuğun dairesel bir bulmaca oyunu. Her hamle diğer halkaları da etkiler; bu yüzden birkaç adım önünü düşünmen gerekir. Basit kurallar, derinleşen bulmacalar.",
      en: "Turnwise is a circular puzzle game where you rotate nested rings to slot every piece into place. Each move affects the others, so you need to think a few steps ahead. Simple rules, ever-deeper puzzles.",
      ru: "Turnwise — круговая головоломка, в которой нужно вращать вложенные кольца, чтобы поставить каждый элемент на место. Каждый ход влияет на остальные, поэтому думать приходится на несколько шагов вперёд. Простые правила, всё более глубокие задачи.",
    },
    features: {
      tr: [
        ["Dairesel bulmacalar", "Halkaları döndür, deseni tamamla."],
        ["Strateji gerektirir", "Her hamle tüm tahtayı etkiler."],
        ["Elle hazırlanmış seviyeler", "Yavaş yavaş zorlaşan, özenle tasarlanmış bölümler."],
        ["Çevrimdışı oyna", "İnternet bağlantısı gerekmez."],
      ],
      en: [
        ["Circular puzzles", "Rotate the rings and complete the pattern."],
        ["Strategic thinking", "Every move changes the whole board."],
        ["Hand-crafted levels", "Carefully designed stages that ramp up gradually."],
        ["Play offline", "No internet connection required."],
      ],
      ru: [
        ["Круговые головоломки", "Вращайте кольца и собирайте узор."],
        ["Стратегия", "Каждый ход меняет всё поле."],
        ["Уровни ручной работы", "Тщательно продуманные этапы с плавным ростом сложности."],
        ["Играйте офлайн", "Подключение к интернету не требуется."],
      ],
    },
    faq: {
      tr: [
        ["Bir bölümde takıldım, ne yapmalıyım?", "Halkaları tek tek değil, birlikte nasıl etkilendiklerini düşünerek dene. Hâlâ takılıysan bize yaz."],
        ["İnternet bağlantısı gerekiyor mu?", "Hayır, Turnwise tamamen çevrimdışı oynanabilir."],
      ],
      en: [
        ["I’m stuck on a level. Any tips?", "Think about how the rings affect each other rather than one at a time. Still stuck? Write to us."],
        ["Do I need an internet connection?", "No, Turnwise can be played completely offline."],
      ],
      ru: [
        ["Застрял на уровне. Что делать?", "Думайте о том, как кольца влияют друг на друга, а не о каждом по отдельности. Всё ещё сложно? Напишите нам."],
        ["Нужен ли интернет?", "Нет, в Turnwise можно играть полностью офлайн."],
      ],
    },
  },
];
