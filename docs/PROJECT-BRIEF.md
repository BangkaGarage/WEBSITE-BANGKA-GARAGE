# Project Brief — Bangka Garage

> Dokumen ini adalah acuan utama proyek. Keputusan yang belum dikonfirmasi ditandai **Belum diputuskan**; rekomendasi bukan fakta tentang bisnis.

## Status

- **Tahap:** discovery dan perumusan arah; cerita owner dan portfolio usaha sudah memiliki sumber awal.
- **Repositori kerja:** `BangkaGarage/carwash-robotic-pos` — digunakan sementara untuk proyek website ini.
- **Rencana repository:** aplikasi POS yang sekarang ada akan digantikan oleh website Bangka Garage. Nama repository akan diubah kemudian; jangan mengubah nama repository sekarang.
- **Bahasa repository saat ini:** JavaScript dan HTML. Struktur saat ini mencakup `index.html`, `styles.css`, dan `app.js`; stack ini belum tentu menjadi pilihan final.

## Tujuan proyek

Memperkenalkan **Bangka Garage** sebagai **culture and lifestyle hub** dengan beragam pengalaman, unit usaha, dan komunitas di dalamnya. Website membawa pengunjung memahami cerita dan karakter Bangka Garage, menemukan unit yang relevan, dan mengetahui alasan untuk datang atau terlibat.

## Struktur brand, unit usaha, dan komunitas

**Brand induk:** BANGKA GARAGE.

Unit usaha di kawasan Bangka Garage:
1. **Robotic Carwash** — jasa cuci mobil dengan sistem robotic.
2. **Rebel** — cafe, barber, dan mini cinema yang masih dalam pembangunan.
3. **Rebel House** — menu sama dengan Rebel Cafe, dengan tambahan minuman bir dan live music setiap malam.
4. **Kampoeng Garage** — H-D specialist & parts; bengkel motor Harley-Davidson dan motor berkapasitas mesin besar, parts, serta apparel seperti kaos, cincin, dan lainnya.
5. **Scudetto Auto Detailing** — perawatan/detailing mobil, termasuk coating, interior, dan layanan terkait lainnya.

Komunitas, bukan unit usaha:
- **REBELLION MC INDONESIA** — club house/club lokal Bangka Belitung di Kota Pangkal Pinang. Detail hubungan formal dan informasi yang boleh ditampilkan perlu dikonfirmasi.

> Gunakan susunan brand terbaru yang dikonfirmasi pemilik. Nama Barbertopia dari versi cerita lama tidak dianggap unit brand terpisah dalam struktur saat ini kecuali dikonfirmasi lagi. Lokasi rinci, jam buka, layanan/menu lengkap, harga, tautan kontak, dan status operasional tiap unit harus diverifikasi sebelum diterbitkan.

## Target pengguna

Calon pelanggan, pengunjung, dan komunitas yang ingin mengetahui Bangka Garage, menemukan unit usaha atau pengalaman yang relevan, memahami karakter kawasan dan komunitas, lalu mengambil langkah berikutnya.

## Pengalaman dan karakter

- Bangka Garage diposisikan sebagai **culture & lifestyle hub**, bukan sekadar tempat usaha otomotif.
- Website multi-page; brand induk tetap fokus utama. Storyline owner penting dan memiliki halaman khusus.
- Pengalaman utama terasa seperti pengunjung diajak tour guide berkeliling kawasan Bangka Garage dengan motor, berhenti di destinasi/unit yang berbeda.
- Motion memberi rasa perjalanan dan memperkuat cerita, tetapi tidak menghalangi navigasi, keterbacaan, aksesibilitas, atau performa.
- Ambisi desain: pengalaman berkesan dan khas, tidak meniru template umum. Keunikan tetap seimbang dengan usability, aksesibilitas, dan performa.

## Konsep tur dan karakter LYLA

- **LYLA** adalah rider perempuan fiktif, pemandu virtual 3D yang terasa hidup, dengan suara perempuan.
- LYLA mengantar pengunjung menjelajahi area, menjadi penghubung antarcerita dan unit. Karakter, desain, dan aset harus orisinal.
- Suara tidak diputar otomatis; sediakan kontrol dan teks/subtitel. Seluruh konten dan navigasi dapat diakses tanpa LYLA.
- Tur tetap dapat dilewati; jangan mengunci scroll. Sediakan pengalaman ringan/non-3D untuk mobile/perangkat lemah, WebGL yang tidak tersedia, koneksi lambat, atau preferensi reduced motion.
- Rupa detail, bahasa, kepribadian, busana, model/rig, pipeline, dan tingkat interaktivitas: **Belum diputuskan**.

## Storyline owner — sumber dan persetujuan

- **Sumber utama:** cerita owner yang diberikan pemilik pada percakapan proyek dan halaman [bangkagarage.com/baru/cerita/](https://bangkagarage.com/baru/cerita/).
- Pemilik menyatakan cerita yang ada **sudah sesuai permintaan dan disetujui untuk digunakan kembali di website baru**.
- Pemilik meminta kisah pribadi yang disebutkan—termasuk masa sulit terkait kesehatan dan pemulihan, penggunaan obat-obatan terlarang, utang, pengalaman kerja, usaha yang tutup, dan persoalan kemitraan—ditampilkan apa adanya, tidak disensor. Penulisan tetap setia pada sumber dan tidak menambahkan fakta atau tuduhan baru.
- Detail mengenai kesehatan, pemulihan, utang, dan pengalaman personal harus ditulis sebagai kisah/penuturan owner, dengan nada hormat dan tanpa sensasionalisme. Pernyataan mengenai pihak lain atau kemitraan harus diatribusikan dengan jelas sebagai pengalaman/penuturan owner; jangan menyajikan tuduhan sebagai fakta independen atau memperluasnya.
- Sebelum publikasi final, owner meninjau naskah akhir dan penggunaan nama/foto pihak lain. Jangan menerbitkan detail sensitif tambahan yang tidak terdapat dalam sumber tanpa persetujuan.
- Struktur bab/timeline awal:
  1. **Sebuah Film, Sebuah Motor, dan Mimpi Masa Muda** — *The Legend of Speed*, Honda NSR Repsol sebagai motor idaman, ketertarikan pada Harley-Davidson.
  2. **Jakarta, Masa Sulit, dan Orang Tua yang Terus Mendukung** — sekolah di Jakarta, periode kesehatan dan pemulihan yang berat, utang sekitar Rp80 jutaan menurut cerita owner, dukungan orang tua, serta tekad memperbaiki kepercayaan.
  3. **Malaysia dan Shanghai: Belajar Melalui Kehidupan Sehari-hari** — pendidikan dan pengalaman kerja di Malaysia selama enam tahun; pendidikan di Shanghai selama tiga tahun; pekerjaan dan usaha restoran Padang bersama sepupu yang akhirnya tutup; kembali ke Belinyu.
  4. **Tahun 2013: Harley Pertama dan Inspirasi di Sepanjang Jalan** — Sportster Forty-Eight, touring Eropa Barat dari Munich ke Paris, inspirasi workshop motor besar dengan kafe, dan gagasan garasi/tempat berkumpul.
  5. **Modal Sudah Ada, Rencana Kembali Diuji** — rencana 2020, kemitraan yang menurut owner menyimpang dari tujuan, pembubaran kerja sama, keputusan melanjutkan mandiri, pandemi, pembangunan tertunda hampir dua tahun dan mulai sekitar pertengahan 2022.
  6. **Nama yang Menyatukan Perjalanan dan Kampung Halaman** — penataan lahan bekas bengkel las/cuci truk, sumur tua, dan arti nama Bangka Garage.
  7. **Satu demi Satu, Kawasan Ini Mulai Hidup** — kesepakatan SATO Robotic Carwash, operasional unit pertama pada 2023, lalu pengembangan barber, cafe/Rebel, Rebel House, Kampoeng Garage, dan Scudetto Auto Detailing.
  8. **Belajar Membangun Orang-orang di Dalamnya** — tim, pembelajaran sambil bekerja, dan warga lokal yang tumbuh bersama kawasan.
  9. **Jejak Pribadi yang Menjadi Bagian dari Tempat Ini** — lencana, Jeep Rubicon oranye, V-twin, angka 86, semangat One For All, acara/komunitas, motor custom Iron Man pada 2026, dan pembelian NSR pada 2026.
  10. **Perjalanan yang Masih Terbuka** — kawasan dan komunitas yang terus berkembang; mini cinema masih dibangun, disebut direncanakan hadir pada 2027 tanpa tanggal resmi; visi memperkenalkan nama Pulau Bangka lebih luas.
- Tahun, angka, nama, klaim keunikan (misalnya “pertama di Pangkal Pinang”), dan detail kronologi harus dicocokkan dengan sumber/owner sebelum publikasi. Jangan menyimpulkan bahwa kondisi pembangunan atau rencana tahun 2027 sudah berubah.

## Aset cerita dan hak penggunaan

- Tidak tersedia foto arsip Honda NSR milik owner. Pemilik meminta memakai gambar dari sumber film *The Legend of Speed* sebagai referensi visual.
- Gambar/frame film dan foto dari situs sumber tetap dapat memiliki hak cipta. **Jangan mengambil atau menerbitkannya sebelum sumber dan izin/lisensi penggunaan website (termasuk penggunaan komersial) diverifikasi.** Bila izin tidak tersedia, gunakan alternatif legal—misalnya ilustrasi orisinal yang terinspirasi secara umum dari motor/era tersebut, bukan salinan frame atau materi berhak cipta—dan beri label yang jujur sebagai ilustrasi/referensi, bukan motor milik owner.
- Aset Bangka Garage, foto orang/tim, font, musik, suara, logo, dan aset pihak ketiga juga perlu izin/atribusi yang sesuai.

## Arah visual dan motion

Autentik, berkarakter, profesional, culture & lifestyle-led. Identitas Bangka Garage menyatukan kawasan; tiap unit tetap dapat memiliki karakter visual. Foto/video asli diutamakan bila tersedia dan berizin. Palet, tipografi, art direction, dan referensi visual final belum ditentukan. Motion terasa pada perjalanan dan interaksi, tetapi mendukung konten, tidak mengganggu navigasi, dan menghormati `prefers-reduced-motion`.

## Prinsip kualitas

- Mobile-first, responsif, mudah dinavigasi.
- Aksesibel: kontras, keyboard/focus, label, narasi opsional dengan teks/subtitel, dan reduced motion.
- Performa baik terutama untuk gambar, aset 3D, dan animasi; informasi penting tetap tersedia tanpa WebGL.
- CTA dan informasi kunjungan mudah ditemukan.
- Klaim, layanan, menu, jadwal, harga, kontak, kisah personal, dan aset hanya diterbitkan setelah verifikasi/izin yang relevan.

## Batasan dan keputusan teknis

- Repository ini akan beralih dari aplikasi POS ke website; audit, arsip, backup, retensi data, dan rollback harus dilakukan sebelum perubahan teknis. Jangan memasukkan secret atau data pelanggan/transaksi ke GitHub.
- Nama repository akan diubah kemudian, bukan sekarang.
- Framework, hosting, CMS, analytics, integrasi kontak, serta pipeline 3D/suara LYLA: **Belum diputuskan**. Evaluasi lisensi, keamanan, performa, pemeliharaan, dan biaya sebelum memilih library/engine/plugin.

## Pertanyaan terbuka

1. Lokasi/alamat, jam, kontak, link peta/sosial, dan CTA resmi tiap unit?
2. Aset logo/foto/video tiap unit apa yang tersedia dan siapa pemegang haknya?
3. Apakah klaim angka/tanggal/“pertama di Pangkal Pinang” dan detail sensitif dalam cerita sudah final serta dapat diverifikasi?
4. Siapa yang meninjau final copy dan izin untuk foto/nama orang lain?
5. Hubungan resmi REBELLION MC INDONESIA dengan Bangka Garage dan konten club yang boleh dipublikasikan?
6. Rute fisik area untuk tur LYLA dan aset lokasi yang dapat direkam?
7. Hubungan website baru dengan data/aplikasi POS lama dan metode arsip yang aman?

## Pengelolaan brief

Setiap keputusan yang disetujui diperbarui di dokumen ini. Catat perubahan arah dan alasannya sebelum implementasi agar proyek tetap terarah.
