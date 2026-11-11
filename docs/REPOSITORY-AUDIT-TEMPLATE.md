# Template Audit Repository — Penggantian POS ke Website Bangka Garage

> **Tujuan:** memahami kondisi repository dan risiko sebelum aplikasi POS digantikan website Bangka Garage.
>
> **Peringatan:** jangan menuliskan password, token, API key, credential, data pelanggan, transaksi, atau data pribadi ke dokumen ini atau GitHub. Catat hanya apakah suatu item ada, lokasinya secara umum, pemiliknya, serta langkah aman yang diperlukan. Jika menemukan secret di repository, jangan menyalin nilainya; laporkan lokasi dan lakukan rotasi/pencabutan melalui prosedur aman.

## 1. Informasi audit

- Tanggal audit: **Belum diisi**
- Auditor: **Belum diisi**
- Repository/branch/commit yang diperiksa: **Belum diisi**
- Pemilik teknis yang dapat menjelaskan POS: **Belum diisi**
- Status website: **Rencana menggantikan aplikasi POS dalam repository ini**
- Status nama repository: **Akan diubah kemudian; jangan rename sekarang**

## 2. Aturan sebelum audit

- [ ] Pastikan akses audit hanya baca sampai rencana perubahan disetujui.
- [ ] Jangan menghapus, menimpa, atau deploy perubahan ke production selama audit.
- [ ] Jangan mengunggah backup database, file `.env`, credential, data pelanggan, atau transaksi ke repository.
- [ ] Catat nama dan fungsi file/folder secara umum; jangan salin nilai rahasia.
- [ ] Verifikasi apakah branch, release, backup, dan prosedur pemulihan tersedia.
- [ ] Bila menemukan kemungkinan credential terpublikasi, beri tahu pemilik repository dan rotasi/revoke; jangan mengutip credential di issue, commit, atau chat.

## 3. Peta repository dan aplikasi

| Area | Ada? | Lokasi umum / catatan aman | Pemilik / tindak lanjut |
|---|---|---|---|
| Entry point frontend | Belum diperiksa |  |  |
| Backend/API | Belum diperiksa |  |  |
| Database/schema/migrations | Belum diperiksa | Jangan masukkan isi/data produksi |  |
| File konfigurasi/environment | Belum diperiksa | Catat nama file/jenis konfigurasi saja, tanpa nilai |  |
| Gambar, logo, font, dan aset | Belum diperiksa | Periksa asal dan izin pakai |  |
| Dokumentasi pengguna/admin | Belum diperiksa |  |  |
| Tes otomatis | Belum diperiksa |  |  |
| Build/deployment workflow | Belum diperiksa | Jangan ungkap secret |  |
| Integrasi eksternal | Belum diperiksa | Catat nama layanan dan tujuan, bukan token |  |

### Fungsi POS saat ini

Lengkapi bersama pemilik/operator. Jangan sertakan data transaksi nyata.

- Pengguna/peran aplikasi: **Belum diisi**
- Alur kerja utama: **Belum diisi**
- Fitur yang masih dibutuhkan oleh operasional: **Belum diisi**
- Integrasi perangkat/layanan eksternal: **Belum diisi**
- Apakah aplikasi sedang digunakan di production? **Belum dikonfirmasi**
- Apakah ada pelanggan/transaksi aktif atau ketergantungan operasional? **Belum dikonfirmasi**

## 4. Data dan kewajiban operasional

Tandai keberadaan dan tanggung jawab saja. Jangan menyalin atau menyimpan data tersebut di sini.

| Jenis data/layanan | Ada? | Lokasi penyimpanan secara umum | Pemilik data | Retensi/backup/pemulihan diketahui? |
|---|---|---|---|---|
| Data transaksi | Belum diperiksa |  |  |  |
| Data pelanggan | Belum diperiksa |  |  |  |
| Data produk/layanan | Belum diperiksa |  |  |  |
| Data akun/admin | Belum diperiksa |  |  |  |
| Data laporan/ekspor | Belum diperiksa |  |  |  |
| Backup | Belum diperiksa | Jangan tautkan file sensitif publik |  |  |

- Persyaratan hukum/privasi yang berlaku: **Belum dikonfirmasi**
- Siapa yang berwenang memutuskan retensi/penghapusan data: **Belum diisi**
- Prosedur permintaan salinan/penghapusan data (jika berlaku): **Belum dikonfirmasi**

**Aturan:** jangan menghapus data produksi atau menonaktifkan layanan yang dipakai sebelum pemilik data menyetujui rencana, backup, retensi, dan pemulihan.

## 5. Keamanan dan dependency

- [ ] Periksa `.gitignore` dan kebijakan secret scanning.
- [ ] Periksa file konfigurasi yang berpotensi berisi secret; catat keberadaan/jenisnya tanpa nilainya.
- [ ] Periksa workflow CI/CD agar secret tidak tercetak di log.
- [ ] Inventaris dependency langsung dan tidak langsung.
- [ ] Catat dependency yang usang/tidak dipelihara atau punya advisori keamanan untuk ditinjau.
- [ ] Catat lisensi dependency dan aset; tidak menganggap semua kode GitHub bebas dipakai komersial.
- [ ] Jangan memasang plugin/engine baru sebelum kebutuhan, lisensi, keamanan, ukuran, dan pemeliharaannya ditinjau.

Temuan (tanpa rahasia atau data pribadi):

- Severity: **Belum dinilai**
- Area/file umum: **Belum diisi**
- Dampak: **Belum diisi**
- Rekomendasi penanganan: **Belum diisi**
- Penanggung jawab dan status: **Belum diisi**

## 6. Build dan deployment

- Cara menjalankan secara lokal: **Belum diverifikasi**
- Perintah build/test/lint: **Belum diverifikasi**
- Hosting/target deployment: **Belum dikonfirmasi**
- Domain dan DNS owner: **Belum dikonfirmasi**
- Environment staging tersedia? **Belum dikonfirmasi**
- Siapa yang menyetujui production deploy? **Belum diisi**
- Cara rollback yang sudah diuji: **Belum dikonfirmasi**
- Integrasi yang tidak boleh putus: **Belum diisi**

## 7. Arsip, migrasi, dan rollback

Isi keputusan sebelum perubahan besar.

- Bentuk arsip aplikasi POS (tag/release/branch/backup terkontrol): **Belum diputuskan**
- Lokasi backup aman dan aksesnya: **Belum diputuskan**
- Verifikasi bahwa backup bisa dipulihkan: **Belum dilakukan**
- Data yang harus dipertahankan dan dasar persetujuannya: **Belum diputuskan**
- Fitur/komponen yang dipertahankan untuk referensi: **Belum diputuskan**
- Rencana mengganti isi repository: **Belum diputuskan**
- Syarat untuk rollback: **Belum diputuskan**
- Pemilik yang menyetujui arsip/migrasi dan deploy: **Belum diisi**

### Gate sebelum POS digantikan

- [ ] Audit repository ditinjau pemilik teknis dan pemilik bisnis.
- [ ] Ketergantungan operasional POS diketahui.
- [ ] Data yang harus disimpan/retensi disetujui oleh pihak berwenang.
- [ ] Backup tidak memuat file sensitif secara tidak aman dan pemulihannya diuji.
- [ ] Aplikasi lama dapat diakses dari arsip/tag/backup yang disetujui.
- [ ] Rencana rollback dan penanggung jawab disepakati.
- [ ] Tidak ada perubahan production tanpa persetujuan eksplisit.

## 8. Ringkasan dan keputusan

- Risiko tertinggi: **Belum diisi**
- Hal yang harus diselesaikan sebelum desain/penggantian: **Belum diisi**
- Rekomendasi arsitektur awal: **Belum diisi**
- Keputusan yang disetujui pemilik: **Belum diisi**
- Tanggal review berikutnya: **Belum diisi**

## Log keputusan

| Tanggal | Keputusan | Alasan | Disetujui oleh |
|---|---|---|---|
|  |  |  |  |
