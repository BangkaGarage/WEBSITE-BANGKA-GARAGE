# Project Brief — Bangka Garage

> Dokumen ini adalah acuan utama proyek. Keputusan yang belum dikonfirmasi ditandai **Belum diputuskan**; rekomendasi bukan fakta tentang bisnis.

## Status

- **Tahap:** discovery dan perumusan arah.
- **Repositori kerja:** `BangkaGarage/carwash-robotic-pos` — dipakai sementara atas persetujuan pemilik proyek.
- **Judul/nama repositori:** akan diubah nanti; jangan ubah nama repositori atau judul proyek GitHub tanpa konfirmasi tersendiri.
- **Bahasa repository saat ini:** JavaScript dan HTML. Struktur saat ini mencakup `index.html`, `styles.css`, dan `app.js`; stack ini belum tentu menjadi pilihan final untuk website baru.

## Tujuan proyek

Membuat website untuk memperkenalkan **Bangka Garage** sebagai tempat usaha dengan beragam pengalaman dan brand di dalamnya. Website diharapkan membawa pengunjung memahami cerita dan karakter Bangka Garage, menemukan brand yang sesuai kebutuhannya, dan mengetahui alasan untuk datang atau memilih layanan yang tersedia.

## Portofolio usaha terkonfirmasi

Informasi berikut berasal dari pemilik usaha dan menjadi dasar konten awal:

1. **Robotic Carwash** — jasa cuci mobil dengan sistem robotic.
2. **Rebel** — brand yang mencakup cafe, barber, dan mini cinema yang akan hadir selanjutnya.
3. **Rebel House** — menu sama dengan Rebel Cafe, dengan tambahan minuman bir dan live music setiap malam.
4. **Kampoeng Garage** — bengkel spesialis Harley-Davidson (H-D) dan motor berkapasitas mesin besar, menjual parts serta apparel seperti kaos, cincin, dan lainnya.
5. **Scudetto Auto Detailing** — perawatan/detailing mobil, termasuk coating, interior, dan layanan terkait lainnya.

> Ejaan dan susunan nama brand di atas mengikuti informasi yang diberikan. Detail seperti alamat, jam buka, daftar layanan lengkap, harga, tautan kontak, dan status operasional mini cinema perlu dikonfirmasi sebelum dipublikasikan. Untuk mini cinema telah disebutkan sebagai layanan yang akan hadir.

## Target pengguna

Calon pelanggan/pengunjung yang ingin mengetahui Bangka Garage, menemukan layanan atau pengalaman yang relevan di antara brand-brandnya, memahami apa yang ditawarkan, dan mendapatkan informasi yang cukup untuk mengambil langkah berikutnya.

**Detail demografi, kebutuhan khusus, serta prioritas target per brand:** Belum diputuskan.

## Pengalaman yang diinginkan

- Storytelling yang terasa khas dan menggambarkan karakter Bangka Garage sebagai destinasi dengan beberapa brand.
- Pengalaman visual yang kuat dan memanjakan, dengan antarmuka serta navigasi yang halus.
- Motion dan efek visual digunakan untuk memperkuat cerita, bukan mengganggu pemahaman atau penggunaan.
- Pengunjung mudah memahami perbedaan tiap brand dan menemukan cara untuk menghubungi, berkunjung, atau menggunakan layanan.

## Rekomendasi awal — perlu persetujuan

### Narasi dan struktur

Rancang alur dari kesan pertama → cerita/karakter Bangka Garage → pilihan brand → pengalaman atau layanan tiap brand → ajakan bertindak yang relevan.

Struktur yang dapat dipertimbangkan:

1. **Beranda Bangka Garage** dengan pesan utama, visual khas, dan pengenalan bahwa terdapat beberapa brand/pengalaman.
2. **Jelajahi brand** — Robotic Carwash, Rebel, Rebel House, Kampoeng Garage, dan Scudetto Auto Detailing; tiap brand memiliki deskripsi singkat dan tautan ke informasi lebih lanjut.
3. **Halaman atau bagian khusus tiap brand** dengan cerita, layanan/menu/produk, foto, informasi kunjungan, dan ajakan bertindak sesuai kebutuhan.
4. **Cerita Bangka Garage** — asal-usul, nilai, dan hubungan antarbrand, setelah informasinya dikonfirmasi.
5. **Lokasi dan kontak** — informasi utama dan petunjuk kunjungan yang terverifikasi.

Ini masih usulan awal. Kita perlu memutuskan apakah setiap brand mendapat halaman tersendiri atau bagian dalam satu halaman, serta bagaimana menampilkan mini cinema yang akan hadir.

### Arah visual dan motion

Arah awal yang disarankan: autentik, berkarakter, dan terasa profesional, menggunakan foto serta materi asli Bangka Garage dan brand-brandnya bila tersedia. Situs induk perlu punya identitas yang menyatukan pengalaman, sementara tiap brand dapat memiliki karakter visual tersendiri tanpa membuat navigasi terasa terpisah-pisah. Warna, tipografi, gaya foto, dan referensi visual belum ditentukan.

Animasi harus mendukung hierarki konten dan navigasi, tetap nyaman di perangkat mobile, menjaga performa, dan menghormati preferensi `prefers-reduced-motion`.

### Prinsip kualitas

- Mobile-first, responsif, dan mudah dinavigasi.
- Aksesibel: kontras yang memadai, fokus keyboard, label yang jelas, dan dukungan reduced motion.
- Performa baik, terutama untuk gambar dan animasi.
- Ajakan bertindak dan informasi penting mudah ditemukan.
- Klaim, layanan, menu, testimoni, alamat, jam operasional, dan harga hanya dipublikasikan setelah dikonfirmasi.

## Batasan dan keputusan teknis

- Pengerjaan serta pencatatan keputusan dilakukan di GitHub pada repository yang telah disepakati.
- Jangan mengganti identitas/nama repository dahulu.
- Framework, deployment/hosting, kebutuhan CMS, analitik, dan integrasi kontak: **Belum diputuskan**.
- Jangan menganggap nama repo `carwash-robotic-pos` sebagai konfirmasi bahwa website baru harus menjadi aplikasi POS. Hubungan website baru dengan aplikasi carwash/POS yang sudah ada masih perlu dikonfirmasi.

## Pertanyaan terbuka — prioritas berikutnya

1. Siapa pelanggan utama dan apa alasan paling kuat mereka memilih Bangka Garage atau masing-masing brand?
2. Apa cerita awal Bangka Garage, nilai, dan hubungan antara kelima brand yang ingin ditonjolkan?
3. Di mana lokasi, bagaimana jam operasional, dan kanal kontak resmi apa yang boleh dipublikasikan untuk tiap brand?
4. Materi apa yang sudah tersedia: logo tiap brand, foto/video asli, warna/identitas merek, testimoni, menu/daftar layanan, atau harga?
5. Apa tindakan utama yang diinginkan dari pengunjung untuk tiap brand: WhatsApp, telepon, petunjuk arah, booking, reservasi, atau lainnya?
6. Apakah website ini terpisah dari aplikasi carwash/POS yang sudah ada di repository, atau nantinya perlu terhubung dengannya?
7. Bagaimana struktur yang diinginkan: situs induk dengan halaman per brand, satu halaman panjang, atau kombinasi keduanya?
8. Adakah referensi website atau kriteria kompetisi tertentu yang perlu diikuti?

## Cara menggunakan brief

Setiap keputusan yang telah disetujui diperbarui di dokumen ini. Jika ada perubahan arah atau ruang lingkup, catat keputusan dan alasannya di sini sebelum implementasi agar pekerjaan tetap terarah.
