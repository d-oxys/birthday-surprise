# 🎁 Birthday Surprise

Website kejutan ulang tahun yang interaktif: countdown (terkunci sampai hari-H) → welcome screen berbintang → kado yang harus diketuk → amplop bersegel & surat bertahap → galeri kenangan → kue dengan lilin yang bisa ditiup → grand finale.

Dibangun dengan Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Lucide React, dan canvas-confetti.

## Menjalankan

```bash
npm install
npm run dev        # buka http://localhost:3000
```

Pemeriksaan & build produksi:

```bash
npm run typecheck
npm run lint
npm run build && npm start
```

## Mengganti isi — cukup edit `birthday.config.ts`

| Yang ingin diganti | Di bagian mana |
| --- | --- |
| Nama penerima & pengirim | `recipient.name`, `sender.name` |
| Tanggal & jam countdown | `birthday.date` (contoh `"2026-10-20T00:00:00+07:00"`), `birthday.timeZone` |
| Kunci halaman countdown sampai hari-H | `birthday.lockUntilBirthday: true` |
| Tanggal tes saat `npm run dev` | `birthday.devDate` |
| Sapaan pembuka & tombol | `welcome` |
| Isi surat (bisa banyak bagian) | `letter.sections`, `letter.closing` |
| Foto kenangan | `memories.items` |
| Pesan penutup | `finale.finalMessage`, `finale.signature` |
| Jumlah lilin | `finale.candles` |
| Warna tema | `theme` (atau pakai preset di `lib/theme-presets.ts`) |
| Musik | `music.src` |
| Animasi (partikel, hati, confetti, kecepatan ketik) | `animation` |
| Teks kecil (label tombol, aria-label) | `ui` |

Di dalam teks bisa dipakai `{name}` dan `{sender}` — otomatis diganti dengan nama di config.

### Foto
1. Taruh file di `public/memories/` (misal `01.jpg`).
2. Di config: `{ src: "/memories/01.jpg", alt: "...", caption: "...", date: "...", orientation: "portrait" }`.
3. `orientation` bisa `"portrait"`, `"landscape"`, atau `"square"`.
Jika `src` kosong atau file tidak ditemukan, otomatis tampil placeholder yang rapi (tidak ada gambar rusak).

### Musik
- `src: ""` → memakai melodi kotak musik "Happy Birthday" bawaan (disintesis di browser, tanpa file).
- Lagu sendiri: taruh di `public/music/` lalu `src: "/music/lagu.mp3"`.
- Musik baru diputar setelah tombol **Open Your Surprise** ditekan (aturan autoplay browser), dan ada tombol mute/unmute di pojok kanan atas.

### Warna
Semua warna berasal dari `theme` di config → dijadikan CSS variables → dipakai token Tailwind (`bg-primary`, `text-accent`, dst.). Ganti satu nilai, seluruh website ikut berubah. Palet siap pakai: `midnightRose`, `lavenderDream`, `oceanGlow`, `goldenHour`.

## Menguji kondisi countdown

Countdown adalah halaman pertama. Dengan `birthday.lockUntilBirthday: true`, tombol lanjut terkunci sampai waktunya tiba.

- **`birthday.devDate`** — tanggal khusus saat `npm run dev` (misalnya hari ini jam 09:00) untuk mengetes kunci & transisinya. Website live (`npm run build` / deploy) selalu memakai `birthday.date`.
- Parameter URL berikut **hanya berlaku saat `npm run dev`** (di website live diabaikan, jadi kunci tidak bisa dibobol):

- `?simulate=soon` — mulai 10 detik sebelum hari-H, untuk melihat transisi ke perayaan
- `?simulate=today` — tampilan "It's your day!"
- `?simulate=after` — tampilan setelah ulang tahun lewat

## Struktur

```
birthday.config.ts            ← satu-satunya file yang perlu diedit
app/                          layout, halaman, favicon & gambar preview link
components/
  experience/                 alur antaradegan + indikator progres
  welcome/WelcomeScreen       adegan pembuka
  gift/GiftBox                kado interaktif
  countdown/                  countdown + digit bergulir
  letter/                     amplop, surat, efek typewriter
  gallery/                    galeri polaroid + lightbox
  final/                      kue, lilin & grand finale
  background/                 bintang, aurora, hati melayang
  audio/                      musik & tombol mute
  theme/ThemeProvider         config → CSS variables
lib/                          tipe config, hitungan countdown, confetti, music box
```

## Deploy

Paling mudah lewat [Vercel](https://vercel.com): push ke GitHub → import project → deploy. Setelah itu isi `meta.siteUrl` dengan URL-nya agar preview link (WhatsApp, dll.) tampil sempurna.

## Aksesibilitas & performa

- Menghormati `prefers-reduced-motion` (animasi gerak, partikel, dan confetti dinonaktifkan/disederhanakan).
- Semua elemen interaktif adalah tombol sungguhan dengan label dan fokus keyboard; lightbox mendukung Esc, panah kiri/kanan, swipe, dan menjaga fokus di dalam dialog.
- Starfield memakai satu canvas dengan DPR dibatasi dan berhenti saat tab tidak aktif.
