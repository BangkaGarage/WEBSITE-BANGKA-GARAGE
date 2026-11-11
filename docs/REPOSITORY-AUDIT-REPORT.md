# Laporan Audit Repository — POS Bangka Garage

> **Status audit:** tinjauan statis read-only atas file yang terlihat pada branch `main`. Ini bukan audit keamanan penuh, bukan pemeriksaan langsung database/Supabase atau hosting, dan tidak mengubah, menonaktifkan, atau menghapus aplikasi.
>
> **Repository:** `BangkaGarage/carwash-robotic-pos`  
> **Branch yang diperiksa:** `main`  
> **Commit acuan:** `4d8f7be7abc4b17425903c622aab58f7c51407d0`  
> **Tujuan:** persiapan peralihan aplikasi POS menjadi website Bangka Garage. Nama repository belum diubah.

## Ringkasan eksekutif

Repository ini berisi aplikasi kasir carwash berbasis HTML/CSS/JavaScript yang berkomunikasi langsung dari browser dengan Supabase. Kode yang terlihat mencakup login dan role, transaksi, master kendaraan/layanan, data member/kendaraan member, pembayaran, stamp/reward, laporan, ekspor CSV, dan cetak nota 80 mm.

Website baru menggantikan aplikasi POS merupakan keputusan pemilik. Namun, audit statis ini **belum cukup untuk menyetujui penghentian POS atau penghapusan data**. Belum ada bukti di file repository tentang skema database, kebijakan Row Level Security (RLS), backup/pemulihan, deployment, penggunaan production, atau retensi data. Sebelum POS digantikan, pemilik operasional perlu memastikan apakah aplikasi/data masih dibutuhkan dan menyetujui arsip serta pemulihan.

## Inventaris yang terlihat

| File/area | Temuan |
|---|---|
| `README.md` | Menjelaskan POS dan menyebut Supabase. Roadmap POS terdahulu mencantumkan verifikasi skema transaksi, penyimpanan transaksi, pencarian plat, pembayaran, stamp member, dan cetak nota. |
| `index.html` | UI login, dashboard, transaksi, daftar transaksi, master kendaraan dan layanan, laporan, serta navigasi kasir/admin. |
| `styles.css` | Gaya responsif untuk aplikasi kasir. |
| `app.js` | Integrasi Supabase browser-side; autentikasi; role; baca/tulis transaksi, pembayaran, member, kendaraan, layanan, aturan harga, loyalty ledger; CSV dan nota. |
| `docs/` | Brief, roadmap, template audit, dan kuesioner proyek. |
| Manifest/build/test/deployment/schema | Tidak terlihat pada daftar file yang terinventarisasi di branch ini: `package.json`, lockfile, migrasi/schema database, automated tests, dan workflow CI/CD tidak terdaftar. Ini tidak membuktikan bahwa tidak ada konfigurasi di luar repository. |

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

1. Aplikasi menggunakan Supabase secara langsung dari browser. Konfigurasi yang terlihat mencakup URL proyek dan publishable key. Publishable/anon key memang lazim berada di klien; itu **bukan** pengganti kebijakan akses. Pastikan RLS aktif dan kebijakan database membatasi akses per role dengan benar.
2. Kode klien menyembunyikan navigasi owner-only berdasarkan profil, tetapi kontrol UI saja tidak mengamankan data. Verifikasi setiap tabel, view, fungsi, storage bucket, dan operasi tulis melalui RLS/otorisasi sisi server.
3. Tidak ditemukan bukti dari pemeriksaan file ini bahwa service-role key ada atau tidak ada pada seluruh riwayat Git, konfigurasi eksternal, log, atau platform deploy. Jangan memublikasikan secret. Jika dicurigai terpapar, revoke/rotate melalui prosedur Supabase dan bersihkan dengan prosedur penanganan secret.
4. Karena schema, RLS policy, konfigurasi Supabase, audit log, dan deployment tidak diperiksa, tingkat keamanan database **belum dapat dinilai**.
5. Tidak ada pemeriksaan dependency otomatis, lockfile, test, workflow, hosting, DNS, backup, atau restore pada repository yang terlihat. Minta pemilik teknis mengonfirmasi apakah berada di luar repo.
6. UI mengekspor transaksi ke CSV dan membuat nota; pastikan akses, penyimpanan, dan distribusi ekspor operasional dikendalikan.

## Risiko penggantian

- Menghapus atau mengganti source code tidak menghapus data Supabase secara otomatis, tetapi memutus akses operasional ke POS jika aplikasi sedang digunakan.
- Menghapus/menonaktifkan database atau project Supabase dapat menyebabkan kehilangan data dan layanan. Jangan lakukan tanpa persetujuan pemilik data, kebijakan retensi, backup, dan uji pemulihan.
- Repository saat ini private menurut metadata yang diperiksa. Jika kelak dibuat publik, lakukan pemeriksaan riwayat Git dan seluruh aset/configuration terlebih dahulu; jangan mengandalkan penghapusan file terbaru saja untuk menghilangkan secret dari history.
- Website publik sebaiknya tidak menggunakan akses/kredensial POS. Pisahkan website publik dari project/data POS kecuali ada kebutuhan integrasi yang dirancang dan diamankan secara terpisah.

## Yang belum diverifikasi — perlu pemilik teknis/operasional

- Apakah POS saat ini aktif dipakai di production, siapa penggunanya, dan kapan aman dihentikan.
- Nama/struktur tabel, RLS policies, trigger, function, storage, integrasi, dan lokasi schema/migrations.
- Data yang harus dipertahankan (transaksi, member, layanan, laporan) dan retensi yang disetujui.
- Status backup, lokasi aman, kapan terakhir diuji restore, dan siapa yang bertanggung jawab.
- Hosting, domain/subdomain, DNS, secrets/configuration, staging, dan prosedur deploy/rollback.
- Apakah ada sumber lain yang menyimpan data POS atau prosedur operasional manual saat POS tidak tersedia.
- Pengarsipan POS: release/tag atau branch yang dipertahankan, tanpa memasukkan dump data atau secret ke GitHub.

## Gerbang sebelum penggantian teknis

- [ ] Pemilik operasional mengonfirmasi POS boleh dihentikan dan tanggalnya.
- [ ] Pemilik data menetapkan data yang harus disimpan serta kebijakan retensi.
- [ ] Pemilik teknis memeriksa schema/RLS/integrasi secara aman dan melaporkan hasil tanpa secret/data pribadi.
- [ ] Backup dibuat di lokasi terkendali dan pemulihan diuji.
- [ ] Source POS diarsipkan pada tag/release/branch yang jelas.
- [ ] Rencana rollback dan penanggung jawab disepakati.
- [ ] Rencana deploy website tidak memublikasikan Supabase POS atau data operasional.
- [ ] Tidak ada perubahan production sampai seluruh gate disetujui.

## Kesimpulan saat ini

**Rekomendasi:** lanjutkan perencanaan website dan audit operasional, tetapi jangan hapus source POS, menonaktifkan Supabase, menghapus data, mengganti konfigurasi production, atau rename repository sebagai bagian dari audit ini. Peralihan repository ke website dilakukan setelah gerbang di atas selesai dan pemilik memberi persetujuan.
