# DOKUMEN SERAH TERIMA & PANDUAN PENGELOLAAN (HANDOVER)
**KALYA SALON — Hair Design & Treatment**
*Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117*

---

## 1. Ringkasan Proyek & Arsitektur Teknologi

Website **Kalya Salon** dibangun dengan standar industri modern *production-grade*, berkecepatan tinggi, dan dioptimalkan secara mendalam untuk perangkat *mobile* serta mesin pencari (*Search Engine Optimization*).

* **Framework:** Next.js 16+ (App Router, Turbopack, Prerendered Static HTML)
* **Bahasa:** TypeScript (Strict Type Safety)
* **Styling:** Vanilla CSS & Tailwind CSS v4 (Desain estetika Blush Pink, Champagne Gold, Marble White, Dark Brown)
* **Tipografi:** Google Fonts (`Playfair Display` untuk headline editorial, `Manrope` untuk body text)
* **Komponen UI:** Radix UI Primitives (Accessible Sheet, Dialog, Lightbox)
* **Validasi Form:** React Hook Form + Zod Engine
* **Konversi Utama:** WhatsApp Booking Engine (Click-to-Chat dengan pesan otomatis terstruktur)

---

## 2. Informasi Bisnis Terverifikasi (Verified NAP)

Semua data salon telah dipusatkan (*single source of truth*) dalam file:
📂 `data/salon.ts` dan `lib/constants.ts`

* **Nama Bisnis:** KALYA SALON
* **Deskripsi:** Hair Design & Treatment
* **Alamat:** Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117
* **Nomor Telepon / WhatsApp:** `0838-4549-4574` (`+6283845494574`)
* **Jam Operasional:** Buka Setiap Hari (Senin – Minggu), 09:00 – 20:00 WIB
* **Google Review Rating:** 4.8 / 5.0 (284+ Google Reviews)
* **Instagram:** `@kalyasalonmadiun` (https://instagram.com/kalyasalonmadiun)
* **TikTok:** `KALYA SALON BEAUTYBAR` (https://tiktok.com/@kalyasalonmadiun)

---

## 3. Alur Kerja Reservasi WhatsApp (Customer Journey)

Website ini menggunakan sistem reservasi *Frontend $\rightarrow$ WhatsApp Assistant* tanpa database untuk efisiensi operasional maksimal bagi staf salon:

1. **Pelanggan Mengklik "BOOK APPOINTMENT" / "Reservasi Layanan Ini":**
   * Modal interaktif 4 langkah terbuka secara instan.
   * Jika diklik dari kartu layanan tertentu (misal: *Scalp Detox*), layanan tersebut otomatis terpilih (*pre-selected*).
2. **Pengisian Data:**
   * Langkah 1: Pilih Layanan
   * Langkah 2: Nama Lengkap & Nomor WhatsApp Pelanggan (dengan validasi format)
   * Langkah 3: Pilih Tanggal & Pilihan Jam Kedatangan (09:00 – 19:00 WIB)
   * Langkah 4: Ringkasan Detail Reservasi & Catatan Khusus
3. **Penerusan ke WhatsApp Resmi Kalya Salon:**
   * Sistem merangkum data ke dalam format pesan resmi WhatsApp:
     ```text
     Halo Kalya Salon 👋

     Saya ingin melakukan booking appointment di Kalya Salon Madiun.

     DETAIL BOOKING:
     • Nama: [Nama Pelanggan]
     • WhatsApp: [Nomor Pelanggan]
     • Layanan: [Nama Layanan] ([Estimasi Harga])
     • Tanggal yang Diinginkan: [Hari, Tanggal Bulan Tahun]
     • Jam yang Diinginkan: [Jam] WIB
     • Catatan Tambahan: [Catatan / -]

     Mohon informasi dan konfirmasi ketersediaan slotnya. Terima kasih! 🙏
     ```
4. **Konfirmasi Staf Salon:**
   * Staf salon menerima pesan via WhatsApp dan membalas ketersediaan kursi/slot secara personal.

> [!NOTE]
> Website secara transparan mencantumkan *disclaimer* bahwa jadwal yang dipilih pelanggan adalah **waktu yang diinginkan (*preferred time*)** dan booking resmi dikonfirmasi setelah staf salon membalas pesan.

---

## 4. Panduan Pembaruan Konten (Bagi Pengelola / Developer)

Karena website ini dibangun tanpa ketergantungan database (*stateless & ultra-fast*), pembaruan konten dilakukan langsung pada file data terpusat:

### A. Mengubah Nomor WhatsApp / Jam Buka / Alamat Salon
* Buka file: `data/salon.ts` atau `lib/constants.ts`
* Ubah nilai `WHATSAPP_NUMBER`, `PHONE_NUMBER`, `openingHours`, atau `address`. Perubahan otomatis menyebar ke seluruh halaman, footer, navigasi, skema Google, dan tombol booking.

### B. Menambah / Mengubah Menu Layanan & Harga
* Buka file: `data/services.ts`
* Ubah atau tambahkan data pada `servicesData`:
  ```ts
  {
    id: "nama-layanan-id",
    name: "Nama Layanan Baru",
    category: "hair-treatment", // "hair-design" | "hair-treatment" | "hair-coloring" | "hair-styling" | "spa-package"
    description: "Deskripsi manfaat perawatan...",
    price: 150000,
    priceDisplay: "Rp 150.000",
    durationMinutes: 60,
    featured: true,
    bookingMessage: "Nama Layanan Baru",
  }
  ```

### C. Menambah / Mengganti Foto Galeri
* Simpan file foto di folder `public/images/gallery/`
* Buka file: `data/gallery.ts`
* Daftarkan nama file gambar dan alt text pada array `galleryData`.

### D. Mengubah / Menambah Ulasan Pelanggan
* Buka file: `data/reviews.ts`
* Tambahkan ulasan baru pada array `reviewsData`.

---

## 5. Panduan Deployment Produksi

### A. Persyaratan Lingkungan (*Environment Variables*)
Buat file `.env.local` atau atur *Environment Variables* di dashboard hosting (misal: Vercel / Netlify / VPS):

```env
# Domain publik resmi untuk Canonical SEO & Sitemap
NEXT_PUBLIC_SITE_URL=https://kalyasalon.com

# ID Google Analytics 4 (Opsional - isi jika GA4 telah dibuat)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### B. Perintah Build & Eksekusi
```bash
# 1. Pengecekan TypeScript
npm run typecheck

# 2. Pengecekan ESLint
npm run lint

# 3. Kompilasi Build Produksi
npm run build

# 4. Menjalankan Server Produksi
npm run start
```

---

## 6. Integrasi Google Search Console & Google Analytics 4

1. **Google Search Console:**
   * Daftarkan domain di Google Search Console.
   * Masukkan URL sitemap: `https://kalyasalon.com/sitemap.xml`
   * File `robots.txt` otomatis mengarahkan bot Google ke sitemap.
2. **Google Analytics 4:**
   * Buat Property GA4 baru di `analytics.google.com`.
   * Salin Measurement ID (contoh: `G-ABC123XYZ`).
   * Masukkan ke variabel `NEXT_PUBLIC_GA_ID` di platform hosting.
   * Event konversi bisnis (`whatsapp_booking_clicked`, `phone_clicked`, `map_clicked`, `social_clicked`) akan terlacak secara otomatis tanpa membocorkan data pribadi pelanggan (*Privacy First*).

---

*Dokumen ini dibuat sebagai panduan resmi serah terima website Kalya Salon Kota Madiun.*
