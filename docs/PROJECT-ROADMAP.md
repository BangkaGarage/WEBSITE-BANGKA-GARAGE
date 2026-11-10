# Roadmap Proyek — Website Bangka Garage

Dokumen ini mengubah visi proyek menjadi tahapan kerja yang dapat ditinjau dan disetujui. **Jangan melompat ke produksi sebelum tahap sebelumnya memiliki keluaran dan persetujuan yang diperlukan.** Brief utama tetap berada di `docs/PROJECT-BRIEF.md`.

## Prinsip kerja

- Bangka Garage diposisikan sebagai **culture & lifestyle hub**; brand induk tetap fokus utama.
- Website **multi-page**, dengan storyline owner sebagai bagian penting dan halaman khusus.
- Pengalaman utama mengambil metafora tur berkeliling area Bangka Garage dengan motor, dipandu karakter 3D fiktif **LYLA** (rider perempuan, suara perempuan).
- Referensi digunakan untuk mempelajari pola, bukan menyalin identitas, aset, tulisan, atau source code tanpa hak yang sesuai.
- Tiap fase menghasilkan artefak yang bisa diperiksa. Pemilik proyek menyetujui keputusan sebelum fase berikutnya dimulai.
- Motion harus bermakna, mudah dikendalikan, nyaman di mobile, aksesibel, dan memiliki fallback. Efek tidak boleh mengunci scroll atau menyembunyikan informasi.
- Fakta tentang usaha dan kisah personal hanya dipublikasikan setelah diverifikasi dan disetujui.

## Tahapan pengerjaan

### Fase 0 — Amankan ruang lingkup dan repository

**Pekerjaan**
- Pastikan repository saat ini memang boleh dipakai untuk website publik, dan tentukan apakah aplikasi carwash/POS yang ada tetap dipertahankan atau dipisahkan.
- Tinjau struktur, dependency, lisensi, deployment saat ini, serta apa yang sudah dipakai aplikasi.
- Buat daftar risiko, batasan, dan keputusan teknis yang belum diketahui.

**Keluaran**
- Catatan kondisi repository dan rekomendasi apakah website baru hidup berdampingan atau dipisahkan.
- Keputusan batas proyek dan pendekatan branch/deployment.

**Gerbang persetujuan:** tidak mengubah, menghapus, atau mengganti aplikasi yang ada sebelum pemilik menyetujui batas pekerjaan.

### Fase 1 — Discovery bisnis, pengguna, dan tujuan

**Pekerjaan**
- Validasi brand, hubungan antarbrand, audiens utama, kebutuhan pengunjung, serta tindakan yang ingin dilakukan pengunjung.
- Kumpulkan lokasi, jam, layanan/menu, kontak, kanal sosial, reservasi/booking, dan informasi yang boleh dipublikasikan.
- Tentukan prioritas peluncuran: informasi mana wajib ada di versi pertama dan mana dapat menyusul.

**Keluaran**
- Brief final yang faktual.
- Ringkasan audiens, kebutuhan, tujuan bisnis, dan kriteria keberhasilan.
- Daftar fakta terverifikasi vs. pertanyaan terbuka.

**Gerbang persetujuan:** pemilik mengonfirmasi konten bisnis serta prioritas MVP.

### Fase 2 — Wawancara dan materi storyline owner

**Pekerjaan**
- Kumpulkan timeline dari masa kecil sampai saat ini melalui wawancara atau formulir terpandu.
- Tandai momen penting, tantangan, titik balik, pembelajaran, awal tiap usaha, dan visi ke depan.
- Catat bukti pendukung (foto, tanggal, dokumen) serta batas privasi dan persetujuan pihak terkait.

**Keluaran**
- Timeline faktual dan daftar bab.
- Draft narasi per bab untuk ditinjau owner.
- Daftar aset dan izin pemakaian.

**Gerbang persetujuan:** owner menyetujui fakta, nada, foto, dan bagian yang bersifat pribadi sebelum copy ditulis final.

### Fase 3 — Information architecture dan customer journeys

**Pekerjaan**
- Tetapkan sitemap dan navigasi multi-page.
- Petakan rute tur digital: titik mulai, pemberhentian, hubungan ke halaman detail, pilihan lewati, serta akhir tur.
- Susun perjalanan pengguna untuk kebutuhan praktis (mis. menemukan layanan, lokasi, kontak) dan perjalanan eksplorasi/storytelling.
- Tentukan cara LYLA muncul dan tidak menghalangi navigasi.

**Keluaran**
- Sitemap final.
- Diagram user journey/rute tur.
- Daftar kebutuhan konten dan CTA per halaman/brand.

**Gerbang persetujuan:** struktur dapat dipahami tanpa animasi dan mendukung tujuan pengunjung.

### Fase 4 — Creative direction dan desain karakter LYLA

**Pekerjaan**
- Buat moodboard untuk identitas Bangka Garage sebagai culture & lifestyle hub dan bahasa visual untuk tiap brand.
- Tentukan warna, tipografi, art direction foto/video, ikonografi, tekstur, serta prinsip motion.
- Rancang LYLA secara orisinal: silhouette, wajah, usia dewasa, outfit rider, helm/atribut, kepribadian, pose, gestur, dan batas penggunaan simbol klub/brand.
- Pilih pendekatan produksi 3D dan suara berdasarkan kebutuhan, anggaran, aset, performa, dan lisensi.

**Keluaran**
- Moodboard dan visual direction yang disetujui.
- Character sheet LYLA dan daftar ekspresi/aksi.
- Naskah suara contoh serta arahan suara perempuan; suara hanya diputar setelah tindakan pengguna.
- Inventaris foto/video, model, font, musik, suara, dan hak penggunaannya.

**Gerbang persetujuan:** owner menyetujui tampilan LYLA dan identitas sebelum produksi aset penuh.

### Fase 5 — UX wireframe dan prototype pengalaman

**Pekerjaan**
- Buat wireframe low-fidelity untuk Home, About, directory/detail brand, Community, Owner Story, dan Visit/Contact.
- Prototipe hero/start tour, satu contoh pemberhentian brand, navigasi, skip tour, dan satu bab owner story.
- Uji prototipe dengan pengguna/perwakilan target; cek apakah mereka paham Bangka Garage dan menemukan informasi penting.

**Keluaran**
- Wireframe per halaman.
- Prototype alur inti.
- Catatan usability dan daftar revisi.

**Gerbang persetujuan:** alur utama mudah dipahami sebelum visual high-fidelity dan implementasi.

### Fase 6 — Motion design dan proof of concept 3D

**Pekerjaan**
- Uji satu adegan LYLA dan satu transisi scroll pada perangkat desktop dan mobile sasaran.
- Pilih apakah adegan LYLA menggunakan 3D real-time atau animasi 3D ter-render; uji kualitas visual, ukuran aset, waktu muat, kontrol pengguna, dan fallback.
- Tetapkan motion specification: durasi, easing, trigger, transisi halaman, reduced-motion alternative, dan perilaku saat tab tidak aktif.

**Keluaran**
- Proof of concept berjalan di browser.
- Rekomendasi pipeline 3D/suara berdasarkan pengujian.
- Panduan motion dan target performa awal.

**Gerbang persetujuan:** jangan produksi penuh sebelum proof of concept layak di perangkat sasaran dan fallback tersedia.

### Fase 7 — UI design system dan desain high-fidelity

**Pekerjaan**
- Buat token desain (warna, tipografi, spacing, grid, radius, elevation) serta komponen dasar.
- Rancang halaman desktop dan mobile; definisikan state normal, hover, focus, active, loading, error, dan reduced motion.
- Pastikan tiap brand punya karakter, namun masih terasa sebagai satu ekosistem Bangka Garage.

**Keluaran**
- UI kit/design system.
- Desain high-fidelity seluruh halaman dan state penting.
- Spesifikasi aset dan motion untuk implementasi.

**Gerbang persetujuan:** desain dan konten penting ditinjau sebelum pengembangan penuh.

### Fase 8 — Fondasi teknis dan implementasi bertahap

**Pekerjaan**
- Pilih stack setelah Fase 0 dan proof of concept; jangan memilih library hanya karena populer.
- Siapkan arsitektur multi-page, routing, komponen, pengelolaan aset, metadata/SEO, analitik bila disetujui, serta workflow build/test.
- Implementasikan bertahap: fondasi konten → navigasi/responsif → halaman brand → owner story → LYLA dan motion → kontak/lokasi.
- Pisahkan scene 3D dari konten sehingga website tetap berfungsi ketika WebGL tidak tersedia.

**Keluaran**
- Website staging yang berjalan.
- Komponen reusable dan instruksi menjalankan proyek.
- Konten terhubung ke sumber data yang mudah diperbarui.

**Gerbang persetujuan:** review pemilik pada milestone Home, brand pages, owner story, dan tur sebelum lanjut.

### Fase 9 — QA, aksesibilitas, performa, dan keamanan

**Pekerjaan**
- Uji browser dan ukuran layar utama, keyboard-only, screen reader dasar, kontras, fokus, reduced motion, dan narasi bersubtitel/teks.
- Uji WebGL/3D pada perangkat menengah dan rendah; ukur ukuran halaman, waktu muat, frame rate, dan fallback koneksi lambat.
- Periksa tautan, formulir/kontak, metadata, SEO, error console, dependency, lisensi aset, privasi, dan izin konten.

**Keluaran**
- Laporan QA dan daftar perbaikan.
- Daftar aset/lisensi dan persetujuan final.
- Checklist rilis yang ditandatangani pemilik.

**Gerbang persetujuan:** tidak rilis jika informasi bisnis salah, navigasi inti gagal, atau fallback aksesibilitas/performa belum tersedia.

### Fase 10 — Peluncuran dan evaluasi

**Pekerjaan**
- Konfirmasi domain, hosting, keamanan, analytics/consent jika digunakan, dan prosedur rollback.
- Rilis ke staging untuk persetujuan akhir; setelah itu deploy production.
- Pantau error, performa, perilaku pengunjung, dan feedback; rencanakan iterasi berikutnya.

**Keluaran**
- Website live, catatan deployment, dan panduan pemeliharaan.
- Daftar backlog pascarilis berdasarkan data/feedback.

## Rekomendasi urutan MVP

Agar lingkup tetap terkontrol, rilis pertama sebaiknya memprioritaskan:

1. Home Bangka Garage dan navigasi yang jelas.
2. Halaman directory + detail untuk brand yang informasi dan asetnya siap.
3. Halaman Visit/Contact dengan data terverifikasi.
4. Halaman owner story setelah timeline dan narasi disetujui.
5. LYLA dengan satu rute/adegan 3D terukur sebagai proof-of-concept yang dapat diperluas.
6. Halaman Community dan detail tambahan setelah cakupan informasi serta izin dikonfirmasi.

Ini urutan rekomendasi, bukan penghapusan fitur yang telah dibahas. Pemilik menentukan prioritas akhir dan kapan mini cinema/community ditampilkan.

## Papan status proyek

| Area | Status | Catatan |
|---|---|---|
| Tujuan culture & lifestyle hub | Disepakati | Tercatat dalam brief proyek |
| Multi-page, Bangka Garage fokus utama | Disepakati | Storyline owner penting dengan halaman khusus |
| Tur berkeliling dengan motor | Arah pengalaman disepakati | Rute dan materi lokasi belum dikumpulkan |
| LYLA, rider fiktif 3D, suara perempuan | Konsep karakter disepakati | Desain, produksi, suara, dan implementasi perlu keputusan |
| Storyline owner | Kebutuhan disepakati | Timeline faktual dan persetujuan belum tersedia |
| Sitemap final dan prioritas MVP | Belum diputuskan | Tahap 1–3 |
| Identitas visual/karakter LYLA | Belum diputuskan | Tahap 4 |
| Stack dan pipeline 3D | Belum diputuskan | Tahap 0 dan 6 |
| Hosting/domain/tanggal rilis | Belum diputuskan | Tahap 10 |

## Inspirasi dan sumber GitHub

Semua sumber di bawah merupakan **referensi untuk dipelajari**, bukan aset atau kode yang otomatis bebas disalin. Sebelum memakai kode/aset, periksa lisensi file/repository, lisensi dependency, atribusi, dan syarat komersial yang berlaku. Metadata repository dapat berubah.

### Fondasi/library yang layak dievaluasi

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) — renderer React untuk Three.js; repository menggunakan MIT. Kandidat bila stack React dipilih.
- [Drei](https://github.com/pmndrs/drei) — helper untuk React Three Fiber; repository menggunakan MIT. Dipakai hanya jika benar-benar dibutuhkan.
- [GSAP](https://github.com/greensock/GSAP) — animasi dan scroll orchestration. Metadata GitHub yang ditinjau tidak mencantumkan lisensi; periksa syarat lisensi resmi/versi yang akan dipakai sebelum keputusan, khususnya untuk penggunaan komersial.
- [Lenis](https://github.com/darkroomengineering/lenis) — helper smooth-scroll; repository menggunakan MIT. Opsional; jangan memaksa smooth scroll atau merusak aksesibilitas/navigasi native.

### Contoh implementasi untuk dipelajari

- [SRCarlo/ThreeJS_Animation_Scroll](https://github.com/SRCarlo/ThreeJS_Animation_Scroll) — contoh Three.js yang merespons scroll; pelajari hubungan progres scroll dan adegan.
- [MIRACULOUS65/A-bit-animated](https://github.com/MIRACULOUS65/A-bit-animated) — contoh situs storytelling dengan motion/WebGL; pelajari cara menyatukan narasi dan adegan.
- [MDJAmin/Portfolio](https://github.com/MDJAmin/Portfolio) — contoh portfolio 3D dengan React Three Fiber dan scroll animation; metadata menunjukkan lisensi “Other”, jadi jangan salin kode/aset sebelum membaca ketentuan lisensinya.
- [LucaMueller1/minecraft3Dwebapp](https://github.com/LucaMueller1/minecraft3Dwebapp) — contoh Three.js, pencahayaan, dunia 3D, dan animasi karakter; menggunakan MIT, tetapi aset/komponen pihak ketiga tetap perlu diperiksa.
- [grep-many/perspecta](https://github.com/grep-many/perspecta) — playground kontrol karakter 3D web dengan GLTF; cocok untuk mengevaluasi kontrol dan state animasi, bukan untuk menyalin identitas visual.

### Referensi pengalaman

- [Casa di Solare](https://casadisolare.com/) — referensi yang diberikan pemilik untuk rasa pengalaman yang menyatu. Amati prinsip seperti konsep yang konsisten, narasi bertahap, dan hubungan interaksi dengan visual. Bangka Garage harus membangun metafora, aset, naskah, dan identitasnya sendiri; jangan menjiplak desain.

### Cara menggunakan referensi

1. Catat satu hal yang dipelajari dari tiap sumber (misalnya pergantian adegan, navigasi, animasi karakter, atau fallback).
2. Uji hanya pola yang relevan dalam prototipe kecil.
3. Catat lisensi dan atribusi sebelum dependency/kode/aset masuk ke repository.
4. Buat karakter LYLA, naskah, foto, visual, dan pengalaman final yang orisinal untuk Bangka Garage.

## Keputusan berikutnya yang dibutuhkan

Untuk memulai tahapan tanpa melompat ke desain/implementasi, prioritas pertama adalah **Fase 0 dan Fase 1**:

1. Apakah website baru akan menggantikan aplikasi di repository, berdampingan dengannya, atau dibuat sebagai proyek terpisah?
2. Informasi mana yang sudah siap dipublikasikan untuk setiap brand (alamat, jam, kontak, menu/layanan, foto/logo)?
3. Apa tindakan utama yang paling diinginkan dari pengunjung: datang ke lokasi, WhatsApp, booking/reservasi, mengikuti media sosial, atau yang lain?
4. Siapa yang akan diwawancarai/menyetujui storyline owner, dan adakah foto/dokumen lama yang bisa dipakai?

Jawaban dicatat ke brief sebelum sitemap final dan desain dibuat.
