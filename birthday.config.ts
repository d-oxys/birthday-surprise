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
    siteUrl: "", // isi setelah deploy, contoh: "https://untuk-nadia.vercel.app"
  },

  // ✏️ GANTI — nama penerima & pengirim
  recipient: { name: "Nadia" },
  sender: { name: "Raka" },

  // ---------------------------------------------------------------------------
  // TANGGAL ULANG TAHUN (countdown)
  // ---------------------------------------------------------------------------
  birthday: {
    // ✏️ GANTI — format: "YYYY-MM-DDTHH:mm:ss+ZONA"
    // +07:00 = WIB, +08:00 = WITA, +09:00 = WIT
    date: "2026-10-20T00:00:00+07:00",
    timeZone: "Asia/Jakarta",
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
    heading: "Happy Birthday, {name}",
    greeting: "Dear {name},",
    // ✏️ GANTI — tambah/kurangi bagian sesukamu. Tiap bagian dibuka berurutan.
    sections: [
      {
        title: "First, a confession",
        body: "I've been planning this little surprise for a while now, and keeping it a secret was harder than I expected. Every time you smiled at me, I almost told you everything.",
      },
      {
        title: "About you",
        body: "You have this rare way of making people feel seen. You laugh with your whole heart, you care in quiet little ways, and you make the most ordinary days feel like something worth remembering.",
      },
      {
        title: "This past year",
        body: "We collected so many moments — the late-night talks, the spontaneous trips, the inside jokes nobody else understands. Thank you for every single one of them.",
      },
      {
        title: "For the year ahead",
        body: "I hope this new chapter brings you calm mornings, brave adventures, and dreams that finally come true. And on the heavy days, I hope you remember you're never facing them alone.",
      },
    ],
    closing: "Happy birthday. I'm so, so glad you were born.",
    signOff: "With all my love,",
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
    items: [
      { src: "", alt: "Our first photo together", caption: "Where it all started", date: "Spring 2024", orientation: "portrait" },
      { src: "", alt: "Watching the sunset", caption: "That sunset we didn't want to end", date: "Bali", orientation: "landscape" },
      { src: "", alt: "Coffee at our favorite café", caption: "Our favorite little café", date: "Every Sunday", orientation: "square" },
      { src: "", alt: "Laughing together", caption: "Laughing until it hurt", date: "Summer", orientation: "portrait" },
      { src: "", alt: "On a road trip", caption: "Adventures, always", date: "Road trip", orientation: "landscape" },
      { src: "", alt: "Birthday last year", caption: "And many more to come", date: "Last year", orientation: "portrait" },
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
    wishMade: "Your wish is on its way ✨",
    finalTitle: "Happy Birthday, {name}",
    finalMessage: [
      "Here's to another year of you — your laughter, your kindness, your beautiful chaos.",
      "May every wish you made today find its way back to you.",
    ],
    signature: "— {sender}",
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
    src: "",
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
    typingSpeed: 32, // ms per huruf (lebih kecil = lebih cepat)
  },
} satisfies BirthdayConfig;
