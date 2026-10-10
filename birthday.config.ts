/**
 * ============================================================================
 *  BIRTHDAY SURPRISE — FILE KONFIGURASI UTAMA
 * ============================================================================
 *  Semua teks, tanggal, foto, warna, musik, dan pengaturan animasi ada di sini.
 *  Kamu TIDAK perlu mengedit komponen apa pun untuk membuat kejutan baru.
 *
 *  Placeholder yang bisa dipakai di dalam teks:
 *    {name}   → otomatis diganti dengan recipient.name
 *    {sender} → otomatis diganti dengan sender.name
 *    {days}   → (khusus countdown.pastTitle) jumlah hari sejak ulang tahun
 *
 *  Bagian bertanda  ✏️ GANTI  adalah contoh isi yang sebaiknya kamu ubah.
 * ============================================================================
 */
import type { BirthdayConfig } from "@/lib/types";
// import { themePresets } from "@/lib/theme-presets"; // ← opsional, lihat bagian "theme"

export const birthdayConfig = {
  // ---------------------------------------------------------------------------
  // INFO HALAMAN (judul tab browser & preview saat link dibagikan)
  // ---------------------------------------------------------------------------
  meta: {
    title: "A little surprise for {name} ✨",
    description: "Someone made something special for you. Open it when you're ready.",
    lang: "en",
    locale: "en-US", // format tanggal, contoh: "id-ID" untuk Bahasa Indonesia
    siteUrl: "https://a-little-surprise-2026.web.app", // URL website setelah deploy
  },

  // ✏️ GANTI — nama penerima & pengirim
  recipient: { name: "Simiju" },
  sender: { name: "Pinji" },

  // ---------------------------------------------------------------------------
  // TANGGAL ULANG TAHUN (countdown)
  // ---------------------------------------------------------------------------
  birthday: {
    // ✏️ GANTI — format: "YYYY-MM-DDTHH:mm:ss+ZONA"
    // +07:00 = WIB, +08:00 = WITA, +09:00 = WIT
    date: "2026-10-13T00:00:00+07:00",
    timeZone: "Asia/Jakarta",
    clock: "24h", // "24h" → 00:00, "12h" → 12:00 AM
    celebrationHours: 24, // berapa jam status "It's your day!" ditampilkan
    lockUntilBirthday: false, // true = surat & sisanya terkunci sampai hari-H
  },

  // ---------------------------------------------------------------------------
  // 1. WELCOME SCREEN
  // ---------------------------------------------------------------------------
  welcome: {
    eyebrow: "Someone has a little surprise for you",
    greeting: "Hey, {name}…",
    subtitle: "Take a breath, find a quiet corner, and open this slowly. It was made just for you.",
    button: "Open Your Surprise",
    hint: "Best with sound on 🎧",
  },

  // ---------------------------------------------------------------------------
  // 2. KADO INTERAKTIF (ketuk beberapa kali sampai terbuka)
  // ---------------------------------------------------------------------------
  gift: {
    title: "A gift, wrapped in starlight",
    subtitle: "It seems a little shy. Maybe it needs some encouragement…",
    hints: ["Tap the gift", "Hmm… it moved! Tap again", "Almost there — one more time!"],
    openedTitle: "There's a whole little world inside",
    openedSubtitle: "And every piece of it is about you.",
    button: "Let's see",
  },

  // ---------------------------------------------------------------------------
  // 3. COUNTDOWN
  // ---------------------------------------------------------------------------
  countdown: {
    eyebrow: "Counting down to",
    title: "Your special day",
    subtitle: "Every second brings us closer to celebrating you.",
    labels: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    todayTitle: "It's your day!",
    todayMessage: "The wait is over — today the whole sky is celebrating you.",
    pastTitleOneDay: "The big day was yesterday",
    pastTitle: "The big day was {days} days ago",
    pastMessage: "…but celebrating you never really ends.",
    lockedMessage: "Patience ✨ The rest unlocks the moment your birthday begins.",
    button: "Open your letter",
  },

  // ---------------------------------------------------------------------------
  // 4. SURAT / BIRTHDAY MESSAGE
  // ---------------------------------------------------------------------------
  letter: {
    envelopeTitle: "A letter, sealed with love",
    envelopeHint: "Tap the seal to open it",
    sealButtonLabel: "Break the seal and open the letter",
    envelopeLabel: "For {name}", // tulisan tangan di amplop
    sealInitial: "S", // huruf di segel lilin
    heading: "Happy Birthday, Simijuu.",
    greeting: "Dear {name},",
    // ✏️ GANTI — tambah/kurangi bagian sesukamu. Tiap bagian dibuka berurutan.
    sections: [
      {
        body: "Kuucapkan sekali lagi, selamat ulang tahun yah. Maaf yah aku gabisa hadir di Bandung untuk ucapin langsung, atau sekedar kasi langsung hadiahnya. But I hope you understand it, hehe...",
      },
      {
        body: "Rib, di hari ulang tahunmu hari ini, aku berharap apa yang kamu cita citakan, impikan, dan rencanakan untuk kedepannya selalu berjalan lancer dan penuh dengan kemudahan. Aku berharap semakin bertambah usia kamu, semakin bijak dan luas juga hatimu. Aku berharap, rezeki melimpah, orang orang baik dan segala bentuk keberuntungan selalu menyertaimu. Dan yang terpenting, aku berharap akan Kesehatan dan umur Panjang mu. Entah kenapa, saat aku menyadari tak ada orang di sisiku selain kamu, satu hal yang kutakutkan adalah kehilangan kamu. Aku selama ini bertahan, kuat dan tetap menjalani semuanya karena ada kamu di hidupku. Jadi aku mohon jaga kesehatanmu ya rib. Hiduplah lebih lama, dan aku juga akan berusaha hidup lebih lama, hehehe.",
      },
      {
        body: "Rib, hal yang mau aku sampaikan adalah permohonan maaf. Atas segala hal hal yang menyakiti perasaan kamu selama ini. Mengingat seberapa sering aku nyakitin kamu, dan menyadari seberapa sering kamu bersabar menghadapinya dan memilih tetep milih aku, bikin aku ngerasa sakit :) Karena kamu ga seharusnya ngerasain rasa sakit itu semua, dan kamu malah tetep milih aku. Aku sadar seberapa jahat aku ke kamu, dan lebih jahatnya lagi, setelah apa yang aku lakuin ke kamu, aku lega kamu tetep milih aku. Tetep nemenin aku. Tetep ngebantu aku. Dan tetep memprioritaskan aku. Makasih ya rib :)\n\nAku tau, makasih dan maaf aja ga cukup, tapi kuharap untuk saat ini kamu bisa menerima itu.",
      },
      {
        body: "Permohonan maaf ku berikutnya adalah, maaf karena kamu harus mencintai orang yang bahkan ga ngerti maksud cinta dan perasaan. Maaf kamu harus berkali kali ngerasain sakit hanya karena mencoba mengerti aku. Maaf karena kamu harus bertemu Wanita gila yang bahkan gatau cara pake perasaannya dan mengungkapkan perasaannya. Percayalah, aku juga sedang belajar, jadi, yoroshiku ne… hehe",
      },
      {
        body: "Rib, aku gatau apakah gelang yang kukirimkan ke kamu sudah sampai di tanganmu, tapi itu adalah gelang ku dan gelang kamu.\n\nIngat kamu juga ingin ke Jepang untuk bangun karir pake visa gijinkoku kan? Kamu harus kasi langsung gelang itu ke aku di Jepang ya hehehe. Aku tungguin. Kamu harus janji. Aku gabakal nunggu atau kasi batas waktu tertentu lagi seperti tahun lalu. Karena aku tau betapa sulitnya proses Visa Gijinkoku. Tapi kalo kamu memang serius dan kamu mau, kamu bisa buktiin dengan datang kesini di depan aku langsung. Dan aku bakal certain semua perjalanan kita ke orang tua aku. Itu satu satunya cara buat buktiin ke mereka, Rib.",
      },
      {
        body: "Jadi, aku Cuma mau bilang, semangat yaa. Aku yakin kamu bisa. Bukan hanya demi aku, tapi demi kamu juga.\n\nNanti kita ke tempat pohon wisteria nya Ubuyashiki, taman bunga nya Himel, dan tempat tempat lainnya. Kita rasis in balik Orang Jepang. Jadi, semangat yaa, Rib. Jalan kita masih sangat Panjang. GANBAROUU!!",
      },
    ],
    closing: "", // kosong = tidak ada kalimat penutup terpisah
    signOff: "Until the wisterias bloom again,",
    tapToSkip: "Tap the letter to reveal it instantly",
    nextButton: "Keep reading",
    finishButton: "See our moments",
  },

  // ---------------------------------------------------------------------------
  // 5. GALERI KENANGAN
  // ---------------------------------------------------------------------------
  memories: {
    eyebrow: "Special moments",
    title: "Little pieces of us",
    subtitle: "Tap any photo to see it up close.",
    // ✏️ GANTI — taruh foto di folder public/memories/ lalu isi src-nya,
    // contoh: src: "/memories/01.jpg". Jika src kosong, tampil placeholder.
    // caption & date opsional; orientation: portrait | landscape | square | tall (9:16) | wide (16:9)
    items: [
      { src: "/memories/01.jpg", alt: "Memory photo 1", orientation: "tall" },
      { src: "/memories/02.jpg", alt: "Memory photo 2", orientation: "portrait" },
      { src: "/memories/03.jpg", alt: "Memory photo 3", orientation: "landscape" },
      { src: "/memories/04.jpg", alt: "Memory photo 4", orientation: "landscape" },
      { src: "/memories/05.jpg", alt: "Memory photo 5", orientation: "wide" },
      { src: "/memories/06.jpg", alt: "Memory photo 6", orientation: "portrait" },
      { src: "/memories/07.jpg", alt: "Memory photo 7", orientation: "tall" },
      { src: "/memories/08.jpg", alt: "Memory photo 8", orientation: "landscape" },
      { src: "/memories/09.jpg", alt: "Memory photo 9", orientation: "portrait" },
    ],
    button: "One last surprise",
  },

  // ---------------------------------------------------------------------------
  // 6. FINAL SURPRISE (kue & lilin)
  // ---------------------------------------------------------------------------
  finale: {
    eyebrow: "The grand finale",
    title: "Make a wish",
    instruction: "Close your eyes, make a wish, then tap each flame to blow it out.",
    blowAllButton: "Blow them all",
    candles: 5,
    wishMade: "Your wish is on its way",
    finalTitle: "Happy Birthday, {name}",
    finalMessage: [
      "Another year older, but we're still not done making memories together. Here's to more adventures, more laughter, more flower gardens, and all the crazy little things we still have waiting for us.",
      "So stay healthy, keep dreaming, and live a long, long life, okay? We still have places to go and memories to make!",
    ],
    signature: "Your {sender}, always.",
    moreConfettiButton: "More confetti!",
    replayButton: "Relive the surprise",
    rereadButton: "Read the letter again",
  },

  // ---------------------------------------------------------------------------
  // TEKS KECIL ANTARMUKA
  // ---------------------------------------------------------------------------
  ui: {
    musicOn: "Mute music",
    musicOff: "Play music",
    close: "Close",
    previous: "Previous",
    next: "Next",
    progressLabel: "Surprise progress",
    stepLabels: ["Welcome", "Gift", "Countdown", "Letter", "Memories", "Finale"],
  },

  // ---------------------------------------------------------------------------
  // WARNA TEMA — ubah di sini, seluruh website ikut berubah.
  // Mau palet siap pakai? Uncomment import di atas lalu tulis:
  //   theme: themePresets.lavenderDream   (atau oceanGlow / goldenHour)
  // ---------------------------------------------------------------------------
  theme: {
    background: "#120a1f", // latar utama
    backgroundAlt: "#2b1340", // gradasi latar bagian atas
    surface: "#1f1333", // kartu kaca
    primary: "#f4a6c1", // warna utama: tombol, kado, highlight
    secondary: "#b89cff", // warna pendukung: gradasi, aurora
    accent: "#f6d38b", // aksen emas: kilau, tanggal, fokus
    text: "#fbf3f7", // teks utama
    textMuted: "#c9b8d4", // teks sekunder
    decoration: "#fde7f1", // bintang, partikel, hati
    glow: "#ff8fbf", // efek cahaya
    buttonText: "#2a0f24", // teks di atas tombol utama
    paper: "#fdf6ee", // kertas surat & bingkai foto
    paperText: "#3d2436", // tinta di kertas
  },

  // ---------------------------------------------------------------------------
  // MUSIK — diputar hanya setelah tombol pertama ditekan (aturan autoplay browser)
  // ---------------------------------------------------------------------------
  music: {
    enabled: true,
    // Kosong = melodi kotak musik "Happy Birthday" bawaan (tanpa file).
    // Untuk lagu sendiri: taruh file di public/music/ lalu tulis "/music/nama-lagu.mp3"
    src: "/music/music.mp3",
    volume: 0.5,
  },

  // ---------------------------------------------------------------------------
  // ANIMASI
  // ---------------------------------------------------------------------------
  animation: {
    particles: true,
    particleDensity: 1, // 0.3 – 1.5
    floatingHearts: true,
    confetti: true,
    typingSpeed: 24, // ms per huruf (lebih kecil = lebih cepat)
  },
} satisfies BirthdayConfig;
