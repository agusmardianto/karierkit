GENERATOR SURAT LAMARAN KERJA

Cara menjalankan:
1. Ekstrak folder website_lamaran_kerja.zip.
2. Buka foldernya di Visual Studio Code.
3. Klik kanan index.html lalu pilih Open with Live Server (jika ekstensi Live Server terpasang), atau buka index.html langsung di browser.
4. Isi formulir di sisi kiri; pratinjau surat di sisi kanan berubah otomatis.
5. Klik Cetak / Simpan PDF. Pada dialog cetak browser, pilih printer "Save as PDF" / "Simpan sebagai PDF".

Struktur:
- index.html      : formulir dan pratinjau surat
- css/style.css   : tampilan formulir, kertas surat, dan mode cetak A4
- js/app.js       : pembaruan pratinjau dan tombol cetak/reset

Catatan:
- Website ini memakai HTML, CSS, dan JavaScript murni; tidak membutuhkan database atau server.
- Data formulir diproses secara lokal di browser dan tidak dikirim ke server.
- Tanggal surat default mengikuti tanggal perangkat. Kota pada tanggal surat saat ini menggunakan teks "Pasuruan"; ubah langsung pada index.html jika ingin kota lain.
