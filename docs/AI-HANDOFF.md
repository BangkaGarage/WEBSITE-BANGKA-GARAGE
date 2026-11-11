# Catatan Serah Terima Proyek Website Bangka Garage

Dokumen ini menjadi ringkasan konteks untuk melanjutkan proyek dengan AI atau pengembang lain. Baca `docs/PROJECT-BRIEF.md`, `docs/PROJECT-ROADMAP.md`, dan `docs/HOMEPAGE-COPY.md` sebagai sumber keputusan dan konten yang lebih lengkap.

## Prompt siap disalin ke AI berikutnya

> Saya melanjutkan proyek website Bangka Garage di repository `BangkaGarage/WEBSITE-BANGKA-GARAGE`. Sebelum mengubah apa pun, baca `docs/PROJECT-BRIEF.md`, `docs/PROJECT-ROADMAP.md`, `docs/HOMEPAGE-COPY.md`, dan `docs/PUBLIC-CONTENT-CHECKLIST.md`, lalu periksa isi repository saat ini.
>
> Tujuan website adalah memperkenalkan Bangka Garage sebagai **culture & lifestyle hub** di Pangkal Pinang. Arah yang sudah tercatat: website multi-page, brand induk tetap fokus, storyline owner penting dan memiliki halaman tersendiri, serta pengalaman eksplorasi kawasan dengan metafora tur berkeliling menggunakan motor yang dipandu karakter fiktif LYLA. Tur dan 3D harus opsional, dapat dilewati, tidak mengunci navigasi/scroll, dan selalu punya fallback ringan serta aksesibel. Jangan mengarang fakta, copy, aset, kontak, jadwal, hubungan komunitas, atau klaim bisnis.
>
> Saat ini branch `main` memuat prototipe homepage satu halaman di `index.html`, stylesheet `styles.css`, dan navigasi mobile/tahun footer di `site.js`. Homepage ini sudah diterbitkan melalui GitHub Pages dan pemilik berhasil membukanya. `app.js` dan sejumlah dokumen POS lama masih ada; jangan menghapusnya, mengganti nama repository, mengubah data/konfigurasi POS, atau menganggap arsip/rollback sudah beres tanpa audit dan persetujuan.
>
> Implementasi homepage saat ini adalah prototipe editorial bernuansa terang, bukan desain final penuh dan belum mewujudkan semua keputusan roadmap. Belum ada halaman multi-page tersendiri, directory/detail unit, halaman cerita owner lengkap, komunitas, tur LYLA, aset foto asli, atau proof-of-concept 3D. Ilustrasi hero/kartu/peta sebagian besar dibuat dengan CSS. Tautan pencarian Google Maps adalah tautan praktis berbasis alamat, bukan tautan lokasi resmi yang telah diverifikasi. Kisah owner yang ditautkan eksternal harus tetap ditinjau sebelum publikasi final.
>
> Lanjutkan mengikuti fase roadmap, jangan lompat langsung ke produksi/deployment final. Langkah yang disarankan: tinjau status audit dan risiko pergantian aplikasi POS; perbarui sitemap dan user journey dari brief; tandai fakta terverifikasi vs pertanyaan terbuka; buat/validasi wireframe Home, unit directory/detail, Story, Community, dan Visit/Contact; lalu minta persetujuan pemilik sebelum high-fidelity design, implementasi halaman tambahan, produksi LYLA/3D, atau publikasi final. Setiap perubahan harus menjaga mobile-first, aksesibilitas, reduced motion, performa, fallback, lisensi aset, dan navigasi yang berfungsi tanpa 3D.
>
> Saat memberi rekomendasi atau mengubah kode, jelaskan dulu file/tujuan perubahan dan jangan mengklaim pengujian, deployment, atau persetujuan yang belum dilakukan. Jangan meminta pemilik mengulang keputusan yang sudah tertulis; tanyakan hanya untuk keputusan yang memang ditandai belum diputuskan.

## Status singkat repository

- **Repository:** `BangkaGarage/WEBSITE-BANGKA-GARAGE` (repository kerja sementara; brief menyebut nama repository dapat diubah kemudian).
- **Branch implementasi:** `main`.
- **Preview:** GitHub Pages, `https://bangkagarage.github.io/WEBSITE-BANGKA-GARAGE/` (pemilik menyatakan situs berhasil dimuat).
- **File homepage aktif:** `index.html`, `styles.css`, `site.js`.
- **File aplikasi POS lama:** `app.js` masih berada di root dan tidak dipanggil oleh homepage saat ini. Perlakukan sebagai aset lama yang harus diaudit/diarsipkan dengan aman; jangan hapus atau ubah tanpa rencana.
- **Homepage terakhir diperbarui:** commit `8850283bab776cd88df6cac6b574c2e978e48866` — `feat: implement polished Bangka Garage homepage and responsive styling`.
- **Dokumen acuan utama:** `docs/PROJECT-BRIEF.md`, `docs/PROJECT-ROADMAP.md`, `docs/HOMEPAGE-COPY.md`, `docs/PUBLIC-CONTENT-CHECKLIST.md`, dan laporan/template audit repository di `docs/`.

## Fakta konten yang tercatat

Alamat kawasan: Jl. Solihin GP No.7, Melintang, Kec. Rangkui, Kota Pangkal Pinang, Kepulauan Bangka Belitung 33684. Instagram induk: `@bangka_garage86`.

Unit dan data yang terdapat dalam copy kerja:

- **Robotic Carwash** — Carwash & Motorwash; Minggu–Jumat 07.30–20.30, Sabtu 07.30–17.00; WhatsApp `+62 811-7179-892`.
- **Rebel** — Cafe setiap hari 07.30–23.00, Barber setiap hari 10.00–22.00; kontak cafe `+62 811-7113-536`, barber `+62 811-7287-337`. Mini cinema masih dibangun, direncanakan hadir pada 2027, tanggal buka belum diumumkan.
- **Rebel House** — Coffeeshop & Bar; setiap hari 08.00–00.00; Instagram `@rebelhouse86`, WhatsApp `+62 811-7113-536`.
- **Kampoeng Garage** — H-D Specialist & Parts; Senin–Sabtu 08.00–17.00, Minggu tutup; WhatsApp `+62 822-8019-1176`.
- **Scudetto** — Coating & Detailing; Senin–Sabtu 08.00–17.00, Minggu tutup; WhatsApp `+62 853-6333-0633`.
- **REBELLION MC INDONESIA** tercatat sebagai komunitas/club house, bukan unit usaha. Hubungan resmi, logo/patch, kegiatan publik, dan kontak perlu konfirmasi sebelum ditampilkan.

Jam/kontak perlu diverifikasi kembali sebelum publikasi karena bisa berubah. Jangan menambah menu, harga, layanan, reservasi, atau akun media sosial yang belum diberikan. Foto/video/logo dan aset pihak ketiga hanya boleh digunakan setelah hak dan izin pemakaian dipastikan.

## Peringatan untuk kelanjutan

1. Dokumen roadmap menyatakan fase harus menghasilkan artefak yang bisa ditinjau dan persetujuan pemilik diperlukan sebelum beralih fase.
2. Audit aplikasi POS, data, integrasi, aset, backup/arsip, dan rollback adalah prasyarat yang tercatat sebelum penggantian teknis lebih jauh. Jangan mengubah data produksi atau riwayat Git.
3. Arah multi-page dan LYLA sudah tercatat, tetapi sitemap final, alur/rute tur, desain LYLA, stack/pipeline 3D, hosting/domain final, dan sejumlah konten/izin masih perlu keputusan atau verifikasi.
4. Homepage live sekarang adalah prototipe yang dapat ditinjau, bukan tanda bahwa semua halaman dan pengalaman yang direncanakan sudah selesai.
