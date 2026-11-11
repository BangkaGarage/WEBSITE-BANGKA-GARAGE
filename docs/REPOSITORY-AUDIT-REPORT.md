# Laporan Audit Repository — POS Bangka Garage

> **Status audit:** tinjauan statis read-only atas file yang terlihat pada branch `main`. Ini bukan audit keamanan penuh dan bukan pemeriksaan langsung database/Supabase atau hosting. Aplikasi dan data belum diubah.
>
> **Repository:** `BangkaGarage/carwash-robotic-pos`  
> **Branch yang diperiksa:** `main`  
> **Commit acuan saat audit statis:** `4d8f7be7abc4b17425903c622aab58f7c51407d0`  
> **Tujuan:** mendokumentasikan aplikasi POS lama sebelum repository dialihkan ke website Bangka Garage. Nama repository akan diubah kemudian.

## Pembaruan dari pemilik

- Pemilik menyatakan aplikasi POS di repository ini **sudah tidak dipakai untuk operasional**.
- Pemilik telah membuat aplikasi POS baru menggunakan Claude dan meng-host-nya di Hostinger.
- Karena itu, ketergantungan operasional terhadap aplikasi POS lama dinyatakan tidak ada menurut pemilik. Status database/proyek Supabase lama, retensi data, backup, dan kebutuhan arsip **belum dikonfirmasi**.
- Keputusan ini mengurangi risiko penghentian aplikasi lama, tetapi tidak dengan sendirinya mengizinkan penghapusan database, data, source, kredensial, atau riwayat Git.

## Ringkasan eksekutif

Repository ini berisi aplikasi kasir carwash berbasis HTML/CSS/JavaScript yang berkomunikasi langsung dari browser dengan Supabase. Kode yang terlihat mencakup login dan role, transaksi, master kendaraan/layanan, data member/kendaraan member, pembayaran, stamp/reward, laporan, ekspor CSV, dan cetak nota 80 mm.

Website baru menggantikan aplikasi POS dalam repository ini merupakan keputusan pemilik. POS lama tidak lagi digunakan operasional menurut pemilik, dan POS baru berada di Hostinger. Sebelum menghapus atau menonaktifkan layanan/data lama, tetap pastikan status Supabase, backup, retensi, serta kebutuhan arsip.

## Inventaris yang terlihat

| File/area | Temuan |
|---|---|
| `README.md` | Menjelaskan POS dan menyebut Supabase. Roadmap POS terdahulu mencantumkan verifikasi skema transaksi, penyimpanan transaksi, pencarian plat, pembayaran, stamp member, dan cetak nota. |
| `index.html` | UI login, dashboard, transaksi, daftar transaksi, master kendaraan dan layanan, laporan, serta navigasi kasir/admin. |
| `styles.css` | Gaya responsif untuk aplikasi kasir. |
| `app.js` | Integrasi Supabase browser-side; autentikasi; role; baca/tulis transaksi, pembayaran, member, kendaraan, layanan, aturan harga, loyalty ledger; CSV dan nota. |
| `docs/` | Brief, roadmap, template audit, kuesioner, serta dokumen konten proyek. |
| Manifest/build/test/deployment/schema | Tidak terlihat pada daftar file yang terinventarisasi saat audit: `package.json`, lockfile, migrasi/schema database, automated tests, dan workflow CI/CD tidak terdaftar. Ini tidak membuktikan bahwa tidak ada konfigurasi di luar repository. |

## Fitur POS yang teridentifikasi dari kode

- Login email/password Supabase dan pembacaan profil/role (`super_admin`/admin-kasir).
- Dashboard ringkasan transaksi dan pendapatan harian.
- Pembuatan transaksi cuci berdasarkan plat, kendaraan, layanan, kondisi kendaraan, harga rekomendasi, serta alasan perubahan harga.
- Perubahan status pencucian dan pembayaran, metode pembayaran, uang diterima dan kembalian.
- Data member, telepon, kendaraan member, pencarian member via plat, stamp dan reward loyalti.
- Master layanan, master kendaraan, aturan harga kendaraan.
- Daftar dan detail transaksi, laporan rentang tanggal, ekspor CSV, dan cetak nota 80 mm.

**Implikasi data:** aplikasi menangani atau dapat menampilkan informasi pribadi/operasional seperti nama dan nomor telepon member, plat kendaraan, serta riwayat/nominal transaksi. Perlakukan database dan ekspor sebagai data sensitif. Jangan salin data nyata ke dokumen ini atau GitHub.

## Temuan keamanan dan batas pemeriksaan

1. Aplikasi menggunakan Supabase secara langsung dari browser. Konfigurasi yang terlihat mencakup URL proyek dan publishable key. Publishable/anon key lazim berada di klien; itu bukan pengganti kebijakan akses database.
2. Kode klien menyembunyikan navigasi owner-only berdasarkan profil, tetapi kontrol UI saja tidak mengamankan data. RLS dan otorisasi harus diverifikasi pada tabel, view, fungsi, storage bucket, serta operasi tulis.
3. Pemeriksaan file ini tidak membuktikan ada/tidaknya service-role key pada seluruh riwayat Git, konfigurasi eksternal, log, atau platform deploy. Jangan memublikasikan secret. Jika dicurigai terpapar, revoke/rotate melalui prosedur penyedia layanan.
4. Karena schema, RLS policy, konfigurasi Supabase, audit log, dan deployment tidak diperiksa, tingkat keamanan database belum dapat dinilai.
5. Tidak ada pemeriksaan dependency otomatis, lockfile, test, workflow, hosting, DNS, backup, atau restore pada repository yang terlihat.
6. UI mengekspor transaksi ke CSV dan membuat nota; pastikan ekspor lama ditangani dengan aman jika masih tersimpan di perangkat atau layanan lain.

## Risiko peralihan

- Menghapus source code tidak menghapus data Supabase secara otomatis. Sebaliknya, menghapus/menonaktifkan database atau project Supabase dapat menyebabkan hilangnya data yang mungkin masih perlu disimpan.
- Pemilik menyatakan POS lama sudah tidak digunakan operasional, tetapi data transaksi/member dan kewajiban retensinya belum dikonfirmasi.
- POS baru berada di Hostinger menurut pemilik; konfigurasi, database, domain, dan backup aplikasi baru berada di luar lingkup audit repository ini.
- Repository ini private saat metadata diperiksa. Jika kelak dibuat publik, tinjau riwayat Git dan seluruh aset/configuration terlebih dahulu; menghapus file pada commit terbaru saja tidak menghilangkan konten dari history.
- Website publik sebaiknya tidak menggunakan akses atau kredensial POS lama/baru kecuali ada kebutuhan integrasi yang dirancang dan diamankan secara terpisah.

## Hal yang masih perlu dikonfirmasi

- Apakah project/database Supabase lama masih aktif dan siapa pemiliknya.
- Data apa yang perlu dipertahankan, retensi yang berlaku, dan siapa yang menyetujui penghapusan.
- Apakah backup POS lama tersedia dan apakah pemulihan pernah diuji.
- Apakah source lama cukup diarsipkan melalui riwayat Git/tag atau perlu cara arsip tambahan.
- Apakah POS baru di Hostinger memiliki data yang perlu dicadangkan atau dokumentasi yang harus dipertahankan (tidak perlu dibagikan di repository ini).

## Gerbang sebelum penggantian teknis

- [x] Pemilik menyatakan POS lama tidak dipakai lagi untuk operasional.
- [x] Pemilik menyatakan POS baru dibuat terpisah menggunakan Claude dan di-host di Hostinger.
- [ ] Pemilik data menetapkan retensi dan keputusan atas database/data Supabase lama.
- [ ] Pemilik teknis mengonfirmasi status project Supabase lama dan RLS/integrasi secara aman tanpa membagikan secret/data pribadi.
- [ ] Backup yang diperlukan dibuat di lokasi terkendali dan pemulihannya diuji.
- [ ] Source POS lama dapat diakses melalui riwayat Git/tag/arsip yang disetujui.
- [ ] Rencana peralihan website tidak memublikasikan data atau kredensial POS.
- [ ] Tidak menonaktifkan database atau menghapus data lama tanpa persetujuan eksplisit.

## Kesimpulan saat ini

**Rekomendasi:** source POS dapat digantikan oleh website setelah pemilik memastikan source lama tetap dapat diakses dari riwayat Git dan keputusan retensi/arsip dibuat. Tidak ada alasan operasional yang diketahui untuk mempertahankan aplikasi lama tetap berjalan, menurut keterangan pemilik. Namun, audit ini tidak menonaktifkan Supabase, tidak menghapus data, tidak mengubah deployment, dan tidak mengubah nama repository.
