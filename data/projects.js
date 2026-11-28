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
    visual: "match",              // "match" | "screw" | "turn" | "icon"  (icon → aşağıdaki icon görseli)
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
    slug: "noris-dice-journey",
    name: "Nori's Dice Journey",
    visual: "icon",
    icon: "assets/projects/noris-dice-journey/icon.png",
    status: "soon",
    platforms: ["android", "ios"],
    stores: { appStore: "", googlePlay: "", web: "" },
    // ⚠️ GİZLİLİK AYARLARI — Play Console "Veri güvenliği" ve App Store "App Privacy" beyanıyla aynı olmalı.
    privacy: {
      ads: true,                  // Google AdMob, yalnızca isteğe bağlı ödüllü videolar (UMP onay penceresi var)
      analytics: false,           // Analitik SDK'sı yok
      crashReports: false,        // Crashlytics vb. yok
      purchases: true,            // Google Play / App Store uygulama içi satın alma
      account: false,             // Hesap yok, ilerleme cihazda (JSON)
      gameCenter: false,
      notifications: true,        // İsteğe bağlı yerel hatırlatma (canlar doldu)
    },
    updated: "2026-11-28",
    tags: { tr: ["Zar", "Masa oyunu"], en: ["Dice", "Board"], ru: ["Кости", "Настольная"] },
    tagline: {
      tr: "Zar at, bankala, Nori ile şehir şehir gez.",
      en: "Roll, bank and travel city to city with Nori.",
      ru: "Бросайте кости, фиксируйте очки и путешествуйте с Нори.",
    },
    summary: {
      tr: "Klasik Farkle zar oyunu, internetsiz. Kaşif kedi Nori ile beş şehirde 55 bölüm, akıllı rakipler ve aynı telefonda iki kişilik oyun.",
      en: "The classic Farkle dice game, offline. Join Nori the explorer cat on a journey through five cities and 55 levels, with clever rivals and two-player games on one phone.",
      ru: "Классическая игра в кости Farkle без интернета. Отправляйтесь с котом-путешественником Нори в пять городов: 55 уровней, хитрые соперники и игра вдвоём на одном телефоне.",
    },
    description: {
      tr: "Nori'nin Zar Yolculuğu, Farkle (10000, Zilch, Greed veya Hot Dice olarak da bilinir) zar oyununu bir yolculuğa dönüştürür. Zarları at, puanlı zarları ayır ve karar ver: puanı bankalayacak mısın, yoksa risk alıp tekrar mı atacaksın? Kaşif kedi Nori ile beş şehri gez, her bölümün hedefini tamamla, yıldız topla ve yeni şehirlerin kilidini aç. Güçlendiriciler, şehir zarları ve yolculuk albümü seni bekliyor. Oyun internetsiz oynanır; reklamlar sadece senin seçtiğin ödüllü videolardır.",
      en: "Nori's Dice Journey turns Farkle (also known as 10000, Zilch, Greed or Hot Dice) into a journey. Roll the dice, set aside the scoring ones and decide: bank your points or risk another roll? Travel through five cities with Nori the explorer cat, beat each level's goal, collect stars and unlock new cities. Boosters, city dice and a travel album are waiting. The game plays offline, and the only ads are rewarded videos you choose to watch.",
      ru: "Nori's Dice Journey превращает Farkle (также известную как 10000, Zilch или Greed) в путешествие. Бросайте кости, откладывайте выигрышные и решайте: зафиксировать очки или рискнуть ещё одним броском? Путешествуйте с котом-исследователем Нори по пяти городам, выполняйте цели уровней, собирайте звёзды и открывайте новые города. Вас ждут усилители, кости городов и альбом путешествий. Игра работает без интернета, а реклама — только видео с наградой, которые вы смотрите по желанию.",
    },
    features: {
      tr: [
        ["Klasik Farkle", "Zar at, bankala ya da riske gir. Kolay öğrenilir, her tur yeni bir karar."],
        ["Beş şehir, 55 bölüm", "Her bölümde farklı hedefler, yıldızlar ve şehir patronları."],
        ["Rakipler ve iki kişilik oyun", "Yapay zekâya karşı oyna ya da aynı telefonda bir arkadaşınla."],
        ["Rahat ve internetsiz", "Hesap yok, internet gerekmez; günlük ödüller, görevler ve albüm."],
      ],
      en: [
        ["Classic Farkle", "Roll, bank or push your luck. Easy to learn, a new decision every turn."],
        ["Five cities, 55 levels", "Different goals, stars and city bosses in every level."],
        ["Rivals and two-player games", "Play against the AI or with a friend on the same phone."],
        ["Cosy and offline", "No account, no internet needed; daily rewards, missions and an album."],
      ],
      ru: [
        ["Классический Farkle", "Бросайте, фиксируйте или рискуйте. Легко научиться, каждый ход — новое решение."],
        ["Пять городов, 55 уровней", "Разные цели, звёзды и боссы городов на каждом уровне."],
        ["Соперники и игра вдвоём", "Играйте против ИИ или с другом на одном телефоне."],
        ["Уютно и офлайн", "Без учётной записи и интернета; ежедневные награды, задания и альбом."],
      ],
    },
    faq: {
      tr: [
        ["Hesap açmam gerekiyor mu?", "Hayır. İlerlemen cihazında saklanır."],
        ["İnternet bağlantısı gerekiyor mu?", "Hayır, oyun internetsiz oynanır. Sadece ödüllü video izlemek için internet gerekir."],
        ["Oyun sırasında reklam çıkar mı?", "Hayır. Araya giren reklam yoktur; yalnızca ödül almak için kendi seçtiğin videoları izlersin."],
        ["Canlar nasıl çalışır?", "Bir bölümü kaybedince bir can gider, kazanmak can harcamaz. Canlar zamanla kendiliğinden dolar."],
      ],
      en: [
        ["Do I need an account?", "No. Your progress is saved on your device."],
        ["Do I need an internet connection?", "No, the game plays offline. Internet is only needed to watch rewarded videos."],
        ["Will ads interrupt my game?", "No. There are no interrupting ads; you only watch videos you choose, to earn rewards."],
        ["How do lives work?", "Losing a level costs one life; winning is free. Lives refill on their own over time."],
      ],
      ru: [
        ["Нужна ли учётная запись?", "Нет. Прогресс сохраняется на вашем устройстве."],
        ["Нужен ли интернет?", "Нет, игра работает офлайн. Интернет нужен только для просмотра видео с наградой."],
        ["Будет ли реклама мешать игре?", "Нет. Навязчивой рекламы нет: вы смотрите видео только по желанию, чтобы получить награду."],
        ["Как работают жизни?", "Проигрыш уровня стоит одну жизнь, победа — бесплатна. Жизни восстанавливаются со временем."],
      ],
    },
  },

  {
    slug: "turnwise",
    name: "Turnwise",
    visual: "screw",
    icon: "",
    status: "soon",
    platforms: ["ios", "android"],
    stores: { appStore: "", googlePlay: "", web: "" },
    // ⚠️ GİZLİLİK AYARLARI — yayına çıkmadan önce uygulamanın gerçekte kullandıklarına göre düzelt
    // ve App Store / Play Console'daki veri beyanıyla aynı yap.
    privacy: { ads: false, analytics: false, crashReports: false, purchases: false, account: false, gameCenter: false, notifications: false },
    updated: "2026-11-24",
    tags: { tr: ["Bulmaca", "Strateji"], en: ["Puzzle", "Strategy"], ru: ["Головоломка", "Стратегия"] },
    tagline: {
      tr: "Vidaları sök, plakaları serbest bırak.",
      en: "Unscrew the bolts, free the plates.",
      ru: "Откручивайте болты, освобождайте пластины.",
    },
    summary: {
      tr: "Doğru vidayı doğru sırayla sök, plakaları düşür ve tahtayı temizle. Her hamlenin önemli olduğu, rahatlatıcı ama zorlayıcı bir vida bulmacası.",
      en: "Unscrew the right bolt in the right order, drop the plates and clear the board. A relaxing yet tricky screw puzzle where every move counts.",
      ru: "Откручивайте нужные болты в правильном порядке, роняйте пластины и очищайте поле. Расслабляющая, но хитрая головоломка с болтами, где важен каждый ход.",
    },
    description: {
      tr: "Turnwise’ta tahtadaki plakalar vidalarla birbirine tutturulmuş. Vidalara dokunarak onları sök, plakaları serbest bırak ve tüm tahtayı temizle. Ama dikkat: yer sınırlı ve plakalar üst üste binmiş — hangi vidayı ne zaman sökeceğini planlamazsan sıkışabilirsin. Kısa, tatmin edici ve bir sonraki bölümü merak ettiren bir bulmaca deneyimi.",
      en: "In Turnwise, plates are held together by screws. Tap the screws to unscrew them, set the plates free and clear the whole board. But careful: space is limited and plates overlap — if you don’t plan which screw to take out and when, you can get stuck. Short, satisfying puzzles that keep you coming back for the next level.",
      ru: "В Turnwise пластины скреплены болтами. Нажимайте на болты, чтобы откручивать их, освобождайте пластины и очищайте всё поле. Но будьте внимательны: места мало, а пластины перекрывают друг друга — если не продумать, какой болт и когда откручивать, можно застрять. Короткие головоломки, которые приятно решать и хочется продолжать.",
    },
    features: {
      tr: [
        ["Vida bulmacası", "Vidaları sök, plakaları düşür, tahtayı temizle."],
        ["Sıralama önemli", "Üst üste binen plakalar her hamleyi düşündürür."],
        ["Giderek zorlaşır", "Her bölümde daha fazla plaka ve vida."],
        ["Tatmin edici his", "Akıcı animasyonlar ve rahatlatıcı bir oyun akışı."],
      ],
      en: [
        ["Screw puzzles", "Unscrew, drop the plates, clear the board."],
        ["Order matters", "Overlapping plates make every move a decision."],
        ["Rising challenge", "More plates and screws with every level."],
        ["Satisfying feel", "Smooth animation and a relaxing flow."],
      ],
      ru: [
        ["Головоломки с болтами", "Откручивайте, роняйте пластины, очищайте поле."],
        ["Важен порядок", "Перекрывающиеся пластины заставляют обдумывать каждый ход."],
        ["Растущая сложность", "С каждым уровнем больше пластин и болтов."],
        ["Приятные ощущения", "Плавная анимация и расслабляющий ритм."],
      ],
    },
    faq: {
      tr: [
        ["Turnwise ne zaman çıkacak?", "Çok yakında! Haberdar olmak için LinkedIn’de bizi takip et."],
        ["Bir bölümde sıkıştım, ne yapmalıyım?", "Önce en üstteki plakaları serbest bırakmaya odaklan ve boş yerleri idareli kullan. Hâlâ takılıysan bize yaz."],
      ],
      en: [
        ["When is Turnwise coming out?", "Very soon! Follow us on LinkedIn to hear first."],
        ["I’m stuck on a level. Any tips?", "Focus on freeing the top plates first and use empty spots wisely. Still stuck? Write to us."],
      ],
      ru: [
        ["Когда выйдет Turnwise?", "Совсем скоро! Подписывайтесь на нас в LinkedIn, чтобы узнать первыми."],
        ["Застрял на уровне. Что делать?", "Сначала освобождайте верхние пластины и бережно используйте свободные места. Всё ещё сложно? Напишите нам."],
      ],
    },
  },
];
