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
    slug: "match-mind",           // URL'de kullanılan ad (değiştirme: linkler bozulur)
    name: "MatchMind",
    visual: "match",              // "match" | "turn" | "icon"  (icon → aşağıdaki icon görseli)
    icon: "",                     // örn. "assets/projects/match-mind/icon.png"
    status: "live",               // "live" (yayında) | "soon" (yakında)
    platforms: ["ios", "android"], // "ios" | "android" | "web"  (store linki boşsa "Yakında" görünür)
    stores: {
      appStore: "https://apps.apple.com/tr/app/matchmind-matching-card-game/id6803246135",
      googlePlay: "",             // Play Store linki gelince buraya yapıştır
      web: "",
    },
    // ⚠️ GİZLİLİK AYARLARI — App Store'daki "App Privacy" beyanıyla aynı olmalı.
    // Gizlilik politikası bu değerlerden otomatik yazılır.
    privacy: {
      ads: true,                  // Reklam SDK'sı (ör. Google AdMob) — App Store: "Contains Advertising"
      analytics: true,            // Kullanım verisi (Product Interaction) — App Store beyanında var
      crashReports: true,         // Diagnostics (Crash / Performance Data) — App Store beyanında var
      purchases: false,           // Uygulama içi satın alma yok
      account: false,             // Hesap yok, ilerleme cihazda
      gameCenter: true,           // Game Center liderlik tabloları ve başarımlar
      notifications: true,        // İsteğe bağlı günlük hatırlatıcı (yerel bildirim)
    },
    updated: "2026-11-24",        // Yasal sayfaların "son güncelleme" tarihi
    tags: { tr: ["Bulmaca", "Hafıza"], en: ["Puzzle", "Memory"], ru: ["Головоломка", "Память"] },
    tagline: {
      tr: "Eşleri bul, hafızanı zorla — her gün yeni bir görev.",
      en: "Find the pairs, train your memory — a new challenge every day.",
      ru: "Находите пары, тренируйте память — новое испытание каждый день.",
    },
    summary: {
      tr: "Her gün yeni bir Günlük Görev, dört dünyada 60 bölüm ve sürpriz kurallar. Hafızanı zorlayan, sade ve akıcı bir kart eşleştirme oyunu.",
      en: "A new Daily Challenge every day, 60 levels across four worlds and surprising twists. A clean, smooth card-matching game that pushes your memory.",
      ru: "Новое ежедневное испытание, 60 уровней в четырёх мирах и неожиданные повороты. Лаконичная и плавная игра на поиск пар, которая тренирует память.",
    },
    description: {
      tr: "MatchMind, kartları çevirip eşlerini bulduğun, sade ama derinleşen bir hafıza oyunu. Her gün tüm oyuncular için aynı olan Günlük Görev’i çöz ve serini koru ya da dört dünyaya yayılmış 60 bölümde ilerle. Karıştırma ve birbirine benzeyen kartlar gibi sürprizler işleri ilginç tutar; takıldığında Peek ile tüm tahtaya göz atabilir, Rahat modda süre ve hamle sınırı olmadan oynayabilirsin.",
      en: "MatchMind is a clean but surprisingly deep memory game: flip the cards and find the pairs. Solve the Daily Challenge — the same puzzle for every player — and keep your streak alive, or work through 60 levels across four worlds. Twists like shuffles and look-alike cards keep things interesting; when you’re stuck, use Peek to see the whole board, or switch to Relaxed mode to play without a timer or move limit.",
      ru: "MatchMind — лаконичная, но удивительно глубокая игра на память: переворачивайте карточки и находите пары. Решайте Ежедневное испытание — одну и ту же головоломку для всех игроков — и сохраняйте серию или проходите 60 уровней в четырёх мирах. Перемешивание и похожие карточки не дают заскучать, а если застряли — используйте Peek, чтобы увидеть всё поле, или включите спокойный режим без таймера и лимита ходов.",
    },
    features: {
      tr: [
        ["Günlük Görev", "Herkes için aynı bulmaca; skorunu paylaş, serini koru."],
        ["60 bölüm, 4 dünya", "Meyve & Sebze, Hayvanlar, İkonlar ve Desenler; 6’dan 12 çifte büyüyen tahtalar."],
        ["Sürpriz kurallar", "Karıştırma ve birbirine benzeyen kartlarla yeni zorluklar."],
        ["Rahat ve erişilebilir", "Rahat mod, Peek, çevrimdışı oyun, VoiceOver ve Dynamic Type desteği."],
      ],
      en: [
        ["Daily Challenge", "The same puzzle for everyone — share your score and keep your streak."],
        ["60 levels, 4 worlds", "Fruit & Veg, Animals, Icons and Patterns, with boards growing from 6 to 12 pairs."],
        ["Twists", "Shuffles and look-alike cards add fresh challenges."],
        ["Relaxed & accessible", "Relaxed mode, Peek, offline play, VoiceOver and Dynamic Type support."],
      ],
      ru: [
        ["Ежедневное испытание", "Одна головоломка для всех — делитесь результатом и сохраняйте серию."],
        ["60 уровней, 4 мира", "Фрукты и овощи, Животные, Иконки и Узоры — поля от 6 до 12 пар."],
        ["Неожиданные правила", "Перемешивание и похожие карточки добавляют новых задач."],
        ["Спокойно и доступно", "Спокойный режим, Peek, игра офлайн, поддержка VoiceOver и Dynamic Type."],
      ],
    },
    faq: {
      tr: [
        ["Hesap açmam gerekiyor mu?", "Hayır. İlerlemen cihazında saklanır."],
        ["Peek nedir, nasıl kazanırım?", "Peek, takıldığında tüm tahtayı gösterir. Günlük çarktan veya isteğe bağlı ödüllü videolardan kazanabilirsin."],
        ["Serimi nasıl korurum?", "Her beş Günlük Görev’de bir seri dondurucu kazanırsın; böylece bir günü kaçırdığında serin bozulmaz."],
        ["Oyun sırasında reklam çıkar mı?", "Hayır. Kısa reklamlar yalnızca bazen bölümler arasında gösterilir; oyun sırasında, eğitimde ve Günlük Görev’de asla çıkmaz."],
        ["İnternet bağlantısı gerekiyor mu?", "Hayır, MatchMind çevrimdışı oynanabilir."],
      ],
      en: [
        ["Do I need an account?", "No. Your progress is saved on your device."],
        ["What is Peek and how do I get more?", "Peek reveals the whole board when you’re stuck. You can earn more from the daily wheel or optional rewarded videos."],
        ["How do I protect my streak?", "Every five Daily Challenges you complete earns a streak freeze, so missing a day won’t break your streak."],
        ["Will ads interrupt my game?", "No. Short ads occasionally appear between levels — never during play, in the tutorial or in the Daily Challenge."],
        ["Do I need an internet connection?", "No, MatchMind can be played offline."],
      ],
      ru: [
        ["Нужна ли учётная запись?", "Нет. Прогресс сохраняется на вашем устройстве."],
        ["Что такое Peek и как получить больше?", "Peek показывает всё поле, если вы застряли. Его можно получить в ежедневном колесе или за просмотр необязательного рекламного ролика."],
        ["Как сохранить серию?", "За каждые пять ежедневных испытаний вы получаете «заморозку» серии, и пропущенный день не прервёт её."],
        ["Будет ли реклама мешать игре?", "Нет. Короткая реклама иногда показывается между уровнями — но никогда во время игры, обучения или ежедневного испытания."],
        ["Нужен ли интернет?", "Нет, в MatchMind можно играть офлайн."],
      ],
    },
  },

  {
    slug: "turnwise",
    name: "Turnwise",
    visual: "turn",
    icon: "",
    status: "soon",
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
