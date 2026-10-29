// ============================================================
//  MATERI PEMBELAJARAN (4 tujuan pembelajaran)
// ============================================================
window.MATERI = {

/* ---------------------------------------------------------- TP 1 */
tp1: {
  no: 1, warna: "blue", emoji: "🔌",
  judul: "Cek & Perbaiki Gangguan Driver",
  tujuan: "Mempraktikkan cara mengecek gangguan pada driver dan melakukan perbaikan.",
  sections: [
    { h: "1. Apa itu driver?", html: `
      <p><b>Driver</b> adalah perangkat lunak kecil yang bertugas sebagai <b>penerjemah</b> antara sistem operasi (Windows) dan perangkat keras seperti kartu grafis, printer, Wi-Fi, dan audio. Tanpa driver yang tepat, perangkat bisa tidak terdeteksi, tidak berfungsi penuh, atau bahkan membuat komputer bermasalah.</p>
      <div class="callout tip"><b>💡 Analogi:</b> Windows berbicara dengan “bahasa umum”, sedangkan setiap perangkat punya “bahasa sendiri”. Driver adalah juru bahasa di antara keduanya.</div>
      <p><b>Gejala gangguan driver:</b></p>
      <ul>
        <li>Perangkat tidak terdeteksi (Wi-Fi hilang, suara tidak keluar, printer tidak terbaca).</li>
        <li>Layar berkedip, resolusi tidak bisa diubah, atau tampilan buram.</li>
        <li>Muncul pesan error setelah update Windows atau setelah memasang perangkat baru.</li>
        <li>Komputer sering macet atau muncul layar biru setelah driver tertentu dipasang.</li>
      </ul>` },
    { h: "2. Membuka Device Manager", html: `
      <p><b>Device Manager</b> (Pengelola Perangkat) adalah alat bawaan Windows untuk melihat seluruh perangkat keras beserta statusnya.</p>
      <ol class="steps">
        <li>Klik kanan tombol <b>Start</b> lalu pilih <b>Device Manager</b>. Cara cepat lain: tekan <kbd>Win</kbd> + <kbd>X</kbd> lalu <kbd>M</kbd>, atau <kbd>Win</kbd> + <kbd>R</kbd> lalu ketik <code>devmgmt.msc</code>.</li>
        <li>Perluas kategori perangkat (klik tanda panah), misalnya <i>Display adapters</i>, <i>Network adapters</i>, atau <i>Sound, video and game controllers</i>.</li>
        <li>Perhatikan perangkat yang memiliki <b>ikon khusus</b> (tanda seru, tanda tanya, atau panah ke bawah).</li>
        <li>Klik kanan perangkat → <b>Properties</b> → tab <b>General</b> → baca <b>Device status</b>.</li>
      </ol>` },
    { h: "3. Membaca tanda di Device Manager", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Tanda</th><th>Artinya</th><th>Kemungkinan penyebab</th></tr>
        <tr><td>⚠️ Segitiga kuning + tanda seru</td><td>Perangkat terdeteksi tetapi <b>bermasalah</b></td><td>Driver rusak, tidak cocok, atau gagal dimuat</td></tr>
        <tr><td>❓ “Unknown device” / “Other devices”</td><td>Windows <b>tidak mengenali</b> perangkat</td><td>Driver belum terpasang</td></tr>
        <tr><td>⬇️ Panah ke bawah</td><td>Perangkat <b>dinonaktifkan</b></td><td>Dimatikan manual atau oleh sistem</td></tr>
        <tr><td>Tanpa tanda</td><td>Perangkat normal</td><td>—</td></tr>
      </table></div>
      <p><b>Kode kesalahan yang sering muncul</b> (lihat di Properties → Device status):</p>
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Kode</th><th>Pesan</th><th>Arah perbaikan</th></tr>
        <tr><td><b>Code 10</b></td><td>Perangkat tidak dapat dimulai</td><td>Update driver, bila gagal uninstall lalu pasang ulang</td></tr>
        <tr><td><b>Code 22</b></td><td>Perangkat dinonaktifkan</td><td>Klik kanan → Enable device</td></tr>
        <tr><td><b>Code 28</b></td><td>Driver belum terpasang</td><td>Pasang driver dari situs resmi / Update driver</td></tr>
        <tr><td><b>Code 43</b></td><td>Windows menghentikan perangkat karena melaporkan masalah</td><td>Roll Back bila baru diperbarui; atau pasang ulang driver</td></tr>
      </table></div>` },
    { h: "4. Jurus perbaikan driver", html: `
      <div class="grid-3">
        <div class="mini"><div class="mini-e">🔄</div><b>Update driver</b><p>Untuk driver yang belum terpasang atau terlalu lama. Klik kanan perangkat → <i>Update driver</i> → cari otomatis atau pilih file driver dari komputer.</p></div>
        <div class="mini"><div class="mini-e">⏪</div><b>Roll Back Driver</b><p>Untuk masalah yang muncul <u>setelah</u> driver diperbarui. Properties → tab <i>Driver</i> → <i>Roll Back Driver</i>.</p></div>
        <div class="mini"><div class="mini-e">✅</div><b>Enable device</b><p>Untuk perangkat yang dinonaktifkan (panah ke bawah). Klik kanan → <i>Enable device</i>.</p></div>
        <div class="mini"><div class="mini-e">🗑️</div><b>Uninstall device</b><p>Untuk driver yang rusak dan tidak mempan di-update. Setelah itu restart agar Windows memasang ulang, atau pasang driver resmi.</p></div>
        <div class="mini"><div class="mini-e">🔍</div><b>Scan for hardware changes</b><p>Memancing Windows mendeteksi ulang perangkat yang baru dicolok atau baru dipasang.</p></div>
        <div class="mini"><div class="mini-e">🌐</div><b>Driver dari situs resmi</b><p>Unduh dari situs produsen (Intel, AMD, NVIDIA, Realtek, merek laptop) sesuai tipe perangkat dan versi Windows.</p></div>
      </div>` },
    { h: "5. Alur praktik (SOP) memperbaiki driver", html: `
      <ol class="steps">
        <li><b>Catat gejala</b>: perangkat apa yang bermasalah dan sejak kapan.</li>
        <li><b>Buat System Restore Point</b> agar ada jalan kembali bila perbaikan gagal.</li>
        <li>Buka <b>Device Manager</b> dan temukan perangkat yang bertanda masalah.</li>
        <li>Buka <b>Properties</b>, baca <i>Device status</i> dan kodenya.</li>
        <li>Pilih tindakan <b>paling ringan lebih dulu</b>: Enable → Update → Roll Back → Uninstall.</li>
        <li><b>Restart</b> komputer lalu uji perangkat.</li>
        <li><b>Catat hasilnya</b> (berhasil / belum) untuk dokumentasi.</li>
      </ol>
      <div class="callout warn"><b>⚠️ Hati-hati:</b> unduh driver hanya dari situs resmi produsen. Hindari situs “driver gratis” yang tidak dikenal karena sering disusupi malware.</div>` }
  ],
  terapan: [
    { e: "🖨️", h: "Printer baru tidak mau mencetak", p: "Di sekolah atau rumah, printer yang baru dicolok kadang tidak terbaca. Kamu bisa mengecek Device Manager, memasang driver resmi, lalu mencetak halaman uji." },
    { e: "🎮", h: "Layar berkedip setelah update", p: "Setelah memperbarui driver kartu grafis, tampilan bermasalah. Dengan Roll Back Driver, tampilan bisa pulih tanpa instal ulang Windows." },
    { e: "📶", h: "Wi-Fi hilang setelah instal ulang Windows", p: "Perangkat jaringan sering belum punya driver. Pasang driver dari komputer lain lewat flashdisk, lalu jaringan kembali normal." }
  ],
  tantangan: "Tantangan di rumah: buka Device Manager di komputer atau laptop keluargamu. Ada perangkat bertanda masalah? Catat nama dan kodenya, lalu ceritakan langkah perbaikan yang akan kamu pilih."
},

/* ---------------------------------------------------------- TP 2 */
tp2: {
  no: 2, warna: "mint", emoji: "🧠",
  judul: "Memilih Perangkat Keras: Proses & Simpan Data",
  tujuan: "Menentukan pemilihan perangkat keras untuk pemrosesan dan penyimpanan data berdasarkan keperluan.",
  sections: [
    { h: "1. Dari data ke hasil", html: `
      <p>Setiap komputer menjalankan siklus yang sama:</p>
      <div class="flow"><span>📥 Input</span><i>➜</i><span>⚙️ Proses<br><small>CPU, RAM, GPU</small></span><i>➜</i><span>💾 Simpan<br><small>HDD, SSD</small></span><i>➜</i><span>📤 Output</span></div>
      <p>Memilih perangkat keras berarti memilih <b>komponen yang tepat untuk pekerjaan yang tepat</b>. Komputer untuk mengetik tugas tidak sama dengan komputer untuk mengedit video.</p>` },
    { h: "2. Komponen pemrosesan", html: `
      <div class="grid-3">
        <div class="mini"><div class="mini-e">🧠</div><b>Prosesor (CPU)</b><p>“Otak” komputer yang menjalankan instruksi. Perhatikan <b>jumlah core/thread</b>, <b>kecepatan clock (GHz)</b>, dan <b>cache</b>. Core banyak unggul untuk multitasking dan rendering.</p></div>
        <div class="mini"><div class="mini-e">🧩</div><b>RAM</b><p>“Meja kerja” komputer: penyimpanan <b>sementara</b> yang sangat cepat (bersifat <i>volatile</i>, isinya hilang saat komputer mati). Kapasitas umum 4/8/16/32 GB. RAM kecil membuat komputer lambat atau hang.</p></div>
        <div class="mini"><div class="mini-e">🎨</div><b>GPU (kartu grafis)</b><p><b>Terintegrasi</b> sudah cukup untuk kantor dan sekolah. <b>Dedicated</b> dibutuhkan untuk desain 3D, edit video, dan gaming.</p></div>
      </div>` },
    { h: "3. Komponen penyimpanan", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Media</th><th>Kecepatan (perkiraan)</th><th>Harga per GB</th><th>Cocok untuk</th></tr>
        <tr><td><b>HDD</b> (piringan magnetik)</td><td>Sekitar 100–150 MB/s</td><td>Paling murah</td><td>Arsip, backup, server data berkapasitas besar</td></tr>
        <tr><td><b>SSD SATA</b></td><td>Sekitar 500 MB/s</td><td>Menengah</td><td>Sistem operasi dan aplikasi harian</td></tr>
        <tr><td><b>SSD NVMe</b></td><td>Sekitar 2.000–7.000 MB/s</td><td>Lebih mahal</td><td>Edit video, programming, gaming</td></tr>
        <tr><td><b>Flashdisk / eksternal</b></td><td>Bervariasi</td><td>Menengah</td><td>Memindahkan data, cadangan sementara</td></tr>
        <tr><td><b>Cloud</b></td><td>Tergantung internet</td><td>Langganan</td><td>Berbagi dan cadangan jarak jauh</td></tr>
      </table></div>
      <div class="callout tip"><b>💡 Ingat:</b> SSD tidak punya bagian yang bergerak sehingga lebih cepat dan tahan guncangan. HDD unggul di kapasitas besar dengan harga terjangkau.</div>` },
    { h: "4. Memilih berdasarkan kebutuhan", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Kebutuhan</th><th>Prosesor</th><th>RAM</th><th>Penyimpanan</th><th>Grafis</th></tr>
        <tr><td>📚 Tugas sekolah &amp; Office</td><td>Dual/quad core</td><td>8 GB</td><td>SSD 256 GB</td><td>Terintegrasi</td></tr>
        <tr><td>🎬 Desain grafis &amp; edit video</td><td>6–8 core atau lebih</td><td>16–32 GB</td><td>SSD NVMe 512 GB+</td><td>Dedicated</td></tr>
        <tr><td>💻 Programming</td><td>Quad/6 core</td><td>16 GB</td><td>SSD 512 GB</td><td>Terintegrasi (cukup)</td></tr>
        <tr><td>🎮 Gaming</td><td>6 core+</td><td>16 GB</td><td>SSD NVMe</td><td>Dedicated menengah-atas</td></tr>
        <tr><td>🗄️ Server arsip / data sekolah</td><td>Andal, tidak harus tertinggi</td><td>8–16 GB</td><td>HDD kapasitas besar + backup/RAID</td><td>Terintegrasi</td></tr>
      </table></div>
      <p class="muted">Angka di atas adalah pedoman umum. Kebutuhan software terus berkembang, jadi selalu cek spesifikasi minimum aplikasi yang akan dipakai.</p>` },
    { h: "5. Langkah menentukan pilihan", html: `
      <ol class="steps">
        <li><b>Tentukan kebutuhan</b>: aplikasi apa yang akan dijalankan dan berapa pengguna.</li>
        <li><b>Cari komponen penentu</b> (bottleneck): editing video → CPU, RAM, GPU; server arsip → kapasitas &amp; keandalan penyimpanan.</li>
        <li><b>Tetapkan anggaran</b> dan alokasikan lebih banyak ke komponen prioritas.</li>
        <li><b>Cek kompatibilitas</b>: soket prosesor, jenis RAM (DDR4/DDR5), slot penyimpanan.</li>
        <li><b>Pikirkan masa depan</b>: ruang upgrade RAM/penyimpanan dan kebutuhan cadangan data.</li>
      </ol>
      <div class="callout warn"><b>⚠️ Jebakan umum:</b> membeli komponen super kuat yang tidak terpakai adalah pemborosan, sedangkan kekurangan di komponen penentu membuat seluruh komputer terasa lambat.</div>` }
  ],
  terapan: [
    { e: "🏫", h: "Lab komputer sekolah", p: "Sekolah perlu memilih spesifikasi PC lab: cukup untuk Office dan pemrograman dasar, tetapi hemat anggaran untuk puluhan unit." },
    { e: "🎥", h: "Konten kreator pemula", p: "Mengedit video 1080p lancar jika RAM cukup, SSD cepat, dan prosesor memadai. Memahami ini mencegah salah beli laptop." },
    { e: "📁", h: "Menyimpan foto dan arsip keluarga", p: "Untuk arsip besar, HDD eksternal berkapasitas besar plus cadangan di cloud lebih tepat daripada hanya satu SSD kecil." }
  ],
  tantangan: "Tantangan di rumah: cari tahu spesifikasi (prosesor, RAM, penyimpanan) komputer atau HP di rumahmu. Cocokkah dengan cara penggunaannya? Apa satu komponen yang paling layak di-upgrade?"
},

/* ---------------------------------------------------------- TP 3 */
tp3: {
  no: 3, warna: "coral", emoji: "🌡️",
  judul: "Penyebab Komputer Restart & Macet Total",
  tujuan: "Mengenali penyebab komputer mengalami restart dan macet total, kemudian melakukan tindakan perbaikan.",
  sections: [
    { h: "1. Restart, hang, dan blue screen", html: `
      <div class="grid-3">
        <div class="mini"><div class="mini-e">🔁</div><b>Restart sendiri</b><p>Komputer mati lalu menyala lagi tanpa diperintah, sering saat beban berat.</p></div>
        <div class="mini"><div class="mini-e">🧊</div><b>Macet total (hang/freeze)</b><p>Layar diam, kursor tidak bergerak, keyboard tidak merespons.</p></div>
        <div class="mini"><div class="mini-e">💙</div><b>Blue Screen (BSOD)</b><p>Layar biru dengan pesan kesalahan, lalu komputer restart. Catat <i>stop code</i>-nya.</p></div>
      </div>` },
    { h: "2. Penyebab dari sisi hardware", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Penyebab</th><th>Tanda-tanda</th><th>Tindakan perbaikan</th></tr>
        <tr><td>🔥 <b>Overheating</b> (debu, kipas mati, pasta termal kering)</td><td>Kipas bising atau mati, bodi panas, restart saat beban berat</td><td>Bersihkan debu, cek/ganti kipas, ganti pasta termal, perbaiki sirkulasi udara</td></tr>
        <tr><td>🔌 <b>Catu daya (PSU) lemah</b></td><td>Restart atau mati acak walau tanpa beban</td><td>Uji dengan PSU lain, ganti PSU berkualitas dengan daya cukup (laptop: cek adaptor)</td></tr>
        <tr><td>🧩 <b>RAM bermasalah</b></td><td>BSOD, hang acak, bunyi beep</td><td>Lepas-pasang ulang, bersihkan kontak, uji dengan Windows Memory Diagnostic/MemTest, ganti modul</td></tr>
        <tr><td>💽 <b>Hard disk / SSD rusak</b></td><td>Bunyi klik pada HDD, file korup, disk 100%</td><td>Cek SMART (mis. CrystalDiskInfo), jalankan chkdsk, <b>backup data</b>, ganti media</td></tr>
        <tr><td>🔧 <b>Motherboard / kapasitor</b></td><td>Restart tak menentu, masalah berulang walau komponen lain diganti</td><td>Serahkan ke teknisi</td></tr>
      </table></div>` },
    { h: "3. Penyebab dari sisi software", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Penyebab</th><th>Tanda-tanda</th><th>Tindakan perbaikan</th></tr>
        <tr><td>🦠 <b>Malware / virus</b></td><td>CPU atau disk tinggi tanpa sebab, ada proses asing</td><td>Scan dengan antivirus (offline scan), akhiri dan hapus proses mencurigakan</td></tr>
        <tr><td>🧱 <b>Driver konflik / update gagal</b></td><td>BSOD setelah update atau pasang perangkat</td><td>Roll Back driver, masuk Safe Mode, uninstall update bermasalah</td></tr>
        <tr><td>🗂️ <b>File sistem rusak</b></td><td>Error saat startup, aplikasi sistem crash</td><td>Jalankan <code>sfc /scannow</code>, lalu perbaiki Windows bila perlu</td></tr>
        <tr><td>🚦 <b>Terlalu banyak program startup</b></td><td>Lambat dan hang saat baru menyala</td><td>Nonaktifkan di Task Manager → Startup</td></tr>
        <tr><td>⚙️ <b>Overclock / BIOS tidak stabil</b></td><td>Restart saat beban tinggi</td><td>Reset BIOS ke pengaturan default</td></tr>
      </table></div>` },
    { h: "4. Alat bantu diagnosa", html: `
      <ul>
        <li><b>Task Manager</b> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Esc</kbd>): lihat beban CPU, RAM, disk, dan proses penyebabnya.</li>
        <li><b>Event Viewer / Reliability Monitor</b>: jejak kesalahan dan waktu kejadian.</li>
        <li><b>HWMonitor atau menu BIOS</b>: memantau suhu dan tegangan.</li>
        <li><b>Windows Memory Diagnostic</b>: menguji RAM.</li>
        <li><b>CrystalDiskInfo</b>: kesehatan HDD/SSD (SMART).</li>
        <li><b>Safe Mode</b>: menyalakan Windows dengan driver minimum untuk perbaikan.</li>
      </ul>` },
    { h: "5. Alur diagnosa yang rapi", html: `
      <ol class="steps">
        <li><b>Amati pemicunya</b>: terjadi saat beban berat? setelah update? setelah dipasang perangkat baru?</li>
        <li><b>Cek suhu dan beban</b> lewat Task Manager atau monitor suhu.</li>
        <li><b>Periksa software dulu</b>: scan malware, rollback driver, jalankan <code>sfc /scannow</code>.</li>
        <li><b>Periksa hardware</b>: bersihkan debu, pasang ulang RAM, uji PSU.</li>
        <li><b>Perbaiki, lalu uji</b> dengan beban kerja yang sama seperti saat masalah muncul.</li>
        <li><b>Catat</b> penyebab dan tindakan yang berhasil.</li>
      </ol>
      <div class="callout warn"><b>⚠️ Komputer hang total?</b> Tahan tombol power sekitar 5 detik hanya sebagai <u>pilihan terakhir</u>. Pekerjaan yang belum disimpan bisa hilang.</div>
      <div class="callout tip"><b>🛡️ Pencegahan:</b> bersihkan debu berkala, jaga ventilasi, pakai antivirus, update dengan bijak, dan lakukan backup rutin.</div>` }
  ],
  terapan: [
    { e: "🎒", h: "Laptop panas saat dipakai belajar", p: "Laptop yang diletakkan di kasur menutup lubang udara dan memicu restart. Menggunakan alas keras atau cooling pad adalah solusi sederhana." },
    { e: "🏪", h: "Komputer kasir toko tiba-tiba mati", p: "Penyebabnya bisa adaptor atau PSU lemah, bukan Windows. Diagnosa yang benar menghemat biaya dan waktu." },
    { e: "💾", h: "Tugas hilang karena komputer hang", p: "Kebiasaan menyimpan file berkala dan backup mengurangi kerugian saat komputer macet mendadak." }
  ],
  tantangan: "Tantangan di rumah: lihat Task Manager saat komputer terasa lambat. Mana yang mendekati 100%: CPU, RAM, atau Disk? Apa dugaan penyebab dan langkah perbaikanmu?"
},

/* ---------------------------------------------------------- TP 4 */
tp4: {
  no: 4, warna: "violet", emoji: "🛠️",
  judul: "Temukan Masalah, Lakukan Perbaikan",
  tujuan: "Menemukan berbagai macam permasalahan pada komputer kemudian melakukan tindakan perbaikannya.",
  sections: [
    { h: "1. Metode troubleshooting teknisi", html: `
      <ol class="steps">
        <li><b>Identifikasi masalah</b>: tanyakan gejala, kapan mulai terjadi, apa yang berubah.</li>
        <li><b>Buat dugaan penyebab</b>: mulai dari yang paling sederhana dan paling mungkin.</li>
        <li><b>Uji dugaan</b>: periksa satu per satu tanpa mengubah banyak hal sekaligus.</li>
        <li><b>Rencanakan &amp; lakukan perbaikan</b>: backup dulu bila menyangkut data.</li>
        <li><b>Verifikasi</b>: pastikan masalah benar-benar hilang dan tidak memunculkan masalah baru.</li>
        <li><b>Dokumentasi &amp; pencegahan</b>: catat temuan dan tindakan agar tidak terulang.</li>
      </ol>` },
    { h: "2. Peta masalah umum", html: `
      <div class="tbl-wrap"><table class="tbl">
        <tr><th>Gejala</th><th>Kemungkinan penyebab</th><th>Perbaikan awal</th></tr>
        <tr><td>⚫ Tidak menyala sama sekali</td><td>Kabel/stopkontak, PSU, tombol power</td><td>Cek colokan, kabel, stopkontak; coba kabel lain</td></tr>
        <tr><td>🖥️ Menyala tetapi layar kosong</td><td>Kabel video, sumber input monitor, RAM, GPU</td><td>Cek kabel &amp; input monitor, pasang ulang RAM/GPU</td></tr>
        <tr><td>📢 Bunyi beep berulang</td><td>RAM atau GPU tidak terbaca</td><td>Lepas-pasang ulang, bersihkan kontak</td></tr>
        <tr><td>🐢 Sangat lambat</td><td>Penyimpanan penuh, RAM kurang, malware, startup banyak</td><td>Bersihkan file, nonaktifkan startup, scan malware, upgrade bila perlu</td></tr>
        <tr><td>🌐 Tidak ada internet</td><td>Router/modem, kabel LAN, DNS, driver Wi-Fi</td><td>Cek perangkat lain, restart router, <code>ipconfig /release</code> lalu <code>/renew</code></td></tr>
        <tr><td>🖨️ Printer tidak mencetak</td><td>Offline, antrian macet, driver, kabel</td><td>Hapus antrian, restart Print Spooler/printer, cek printer default</td></tr>
        <tr><td>🖱️ USB / keyboard / mouse mati</td><td>Port USB, kabel, driver</td><td>Pindah port (colok di belakang), cek Device Manager</td></tr>
        <tr><td>🔇 Tidak ada suara</td><td>Mute, perangkat output salah, driver audio</td><td>Cek volume &amp; output device, update driver audio</td></tr>
        <tr><td>🔋 Baterai laptop boros / tidak mengisi</td><td>Adaptor, kabel, baterai menua</td><td>Coba adaptor lain, cek Battery Report, ganti baterai bila aus</td></tr>
      </table></div>` },
    { h: "3. Keselamatan kerja", html: `
      <ul>
        <li>Matikan komputer dan <b>cabut kabel listrik</b> sebelum membuka casing.</li>
        <li>Sentuh logam casing atau gunakan gelang antistatik agar listrik statis tidak merusak komponen.</li>
        <li><b>Jangan membuka power supply</b> karena menyimpan tegangan berbahaya.</li>
        <li><b>Backup data</b> penting sebelum memperbaiki.</li>
        <li>Jangan memaksa konektor. Foto posisi kabel sebelum dilepas.</li>
      </ul>` },
    { h: "4. Kebiasaan teknisi hebat", html: `
      <div class="grid-2">
        <div class="mini"><div class="mini-e">1️⃣</div><b>Ubah satu hal per langkah</b><p>Dengan begitu kamu tahu persis langkah mana yang berhasil.</p></div>
        <div class="mini"><div class="mini-e">🧪</div><b>Uji setelah tiap perubahan</b><p>Jangan menunggu semua selesai baru mengecek.</p></div>
        <div class="mini"><div class="mini-e">📝</div><b>Catat semuanya</b><p>Dokumentasi membantu bila masalah kembali muncul.</p></div>
        <div class="mini"><div class="mini-e">🙋</div><b>Tahu kapan minta bantuan</b><p>Masalah motherboard, PSU, atau data penting sebaiknya diserahkan ke teknisi.</p></div>
      </div>` }
  ],
  terapan: [
    { e: "🏠", h: "Menjadi “teknisi” di rumah", p: "Saat internet mati, kamu tahu harus memeriksa perangkat lain dan router dulu sebelum menyalahkan laptop." },
    { e: "🏫", h: "Membantu teman dan guru", p: "Printer ruang guru offline? Dengan urutan pemeriksaan yang rapi, kamu bisa membantu dengan cepat." },
    { e: "💼", h: "Peluang karier", p: "Keterampilan troubleshooting dasar bermanfaat untuk teknisi komputer, IT support, dan administrator jaringan." }
  ],
  tantangan: "Tantangan di rumah: tanyakan kepada keluargamu, masalah komputer atau HP apa yang paling sering terjadi? Susun rencana perbaikannya dengan 6 langkah metode troubleshooting."
}

};
