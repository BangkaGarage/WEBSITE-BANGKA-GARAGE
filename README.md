# Carwash Robotic POS

Fondasi aplikasi kasir Bangka Garage Robotic Carwash.

## File awal

- `index.html` — tampilan login, dashboard, transaksi, master kendaraan, master layanan, dan laporan awal.
- `styles.css` — tampilan responsif untuk desktop dan tablet kasir.
- `app.js` — koneksi Supabase, login, role, pembacaan master data, dan rekomendasi harga.

## Supabase

Aplikasi menggunakan project Supabase `carwash-robotic pos`. Publishable key digunakan di browser; jangan pernah menaruh service-role key atau database password di file aplikasi.

## Tahap berikutnya

1. Verifikasi struktur kolom transaksi.
2. Aktifkan penyimpanan transaksi kasir.
3. Tambahkan pencarian plat dan alur selesai cuci.
4. Tambahkan pembayaran, stamp member, dan cetak nota Panda 80mm.
