// ============================================================
//  BANK SOAL, DATA SIMULASI, DAN REFLEKSI
//  (guru dapat mengubah soal di berkas ini)
// ============================================================
window.DATA = {

/* ================= PRE-TEST: 5 PG (5 opsi) ================= */
prePG: [
  { q: "Pada Device Manager, sebuah perangkat tampil dengan segitiga kuning bertanda seru. Hal ini berarti ...",
    o: ["Perangkat dinonaktifkan secara manual", "Perangkat terdeteksi tetapi bermasalah, biasanya pada drivernya", "Perangkat bekerja dengan sangat baik", "Perangkat baru saja dilepas dari komputer", "Perangkat tidak membutuhkan driver"], k: 1 },
  { q: "Anto ingin komputernya cepat saat booting dan membuka aplikasi. Media penyimpanan yang paling tepat adalah ...",
    o: ["HDD 5400 RPM", "Disket", "DVD-RW", "SSD", "Pita magnetik (tape)"], k: 3 },
  { q: "Sebuah komputer sering restart sendiri ketika dipakai merender video, dan kipasnya terdengar sangat bising. Penyebab yang paling mungkin adalah ...",
    o: ["Panas berlebih (overheating) pada prosesor", "Keyboard rusak", "Resolusi layar terlalu tinggi", "Volume speaker terlalu besar", "Wallpaper terlalu berat"], k: 0 },
  { q: "Komputer tidak menyala sama sekali: tidak ada lampu maupun suara kipas. Langkah pemeriksaan pertama yang paling tepat adalah ...",
    o: ["Menginstal ulang Windows", "Mengganti prosesor", "Memeriksa kabel daya dan sumber listrik", "Mengganti RAM", "Memperbarui BIOS"], k: 2 },
  { q: "Setelah memperbarui driver kartu grafis, layar menjadi berkedip. Fitur di Device Manager untuk mengembalikan driver ke versi sebelumnya adalah ...",
    o: ["Disable device", "Scan for hardware changes", "Properties > Events", "Format hard disk", "Roll Back Driver"], k: 4 }
],

/* ============ PRE-TEST: 5 PG kompleks (5 opsi, jawaban benar > 1) ============ */
prePGK: [
  { q: "Pilih SEMUA langkah yang tepat untuk menangani driver yang bermasalah.",
    o: ["Membuka Device Manager dan memeriksa perangkat yang bertanda peringatan", "Mengunduh driver dari situs resmi produsen perangkat", "Mengunduh driver dari situs tidak dikenal agar gratis", "Menggunakan Roll Back Driver jika masalah muncul setelah pembaruan", "Menghapus folder Windows agar driver terpasang ulang"], k: [0, 1, 3] },
  { q: "Pilih SEMUA faktor yang perlu dipertimbangkan saat memilih komputer untuk mengedit video.",
    o: ["Warna casing yang menarik", "Prosesor dengan banyak core", "Penyimpanan SSD yang cepat", "Merek mouse pad", "RAM berkapasitas besar"], k: [1, 2, 4] },
  { q: "Pilih SEMUA kemungkinan penyebab komputer hang atau macet total.",
    o: ["Wallpaper desktop terlalu terang", "RAM hampir penuh karena terlalu banyak program berjalan", "Ukuran font terlalu besar", "Hard disk mengalami bad sector", "Malware yang menghabiskan sumber daya komputer"], k: [1, 3, 4] },
  { q: "Pilih SEMUA kemungkinan penyebab komputer restart sendiri.",
    o: ["Prosesor terlalu panas", "Baterai mouse nirkabel habis", "Catu daya (PSU) tidak stabil", "Volume speaker terlalu kecil", "Modul RAM rusak atau longgar"], k: [0, 2, 4] },
  { q: "Pilih SEMUA langkah yang benar dalam proses troubleshooting.",
    o: ["Mengidentifikasi gejala dan kapan masalah terjadi", "Langsung mengganti semua komponen", "Menduga penyebab dari yang paling sederhana lebih dulu", "Mencatat tindakan dan menguji hasilnya", "Mengabaikan pesan error yang muncul"], k: [0, 2, 3] }
],

/* ============ POST-TEST: 8 soal uraian (tiap tujuan: 1 biasa + 1 HOTS) ============
   konsep = kata kunci untuk ESTIMASI skor otomatis (awalan kata dicocokkan).
   perlu  = jumlah konsep yang harus muncul untuk nilai penuh (bobot 12,5 per soal). */
post: [
  { id: "u1", tp: "tp1", tipe: "Biasa",
    soal: "Jelaskan langkah-langkah memeriksa gangguan driver menggunakan Device Manager, beserta cara memperbaikinya!",
    perlu: 4,
    konsep: [
      { l: "Membuka Device Manager", kata: ["device manager", "devmgmt", "pengelola perangkat", "manajer perangkat"] },
      { l: "Mengenali tanda masalah", kata: ["tanda seru", "segitiga kuning", "tanda kuning", "unknown", "tanda tanya", "peringatan", "warning"] },
      { l: "Membaca status / kode di Properties", kata: ["properties", "properti", "device status", "status perangkat", "kode"] },
      { l: "Update driver", kata: ["update driver", "perbarui driver", "memperbarui driver", "pembaruan driver", "update"] },
      { l: "Roll back / uninstall & pasang ulang", kata: ["roll back", "rollback", "kembalikan driver", "versi sebelumnya", "uninstall", "hapus driver", "instal ulang", "install ulang", "pasang ulang"] },
      { l: "Driver resmi / restart & uji", kata: ["situs resmi", "website resmi", "produsen", "vendor", "restart", "mulai ulang", "nyalakan ulang"] }
    ] },
  { id: "u2", tp: "tp1", tipe: "HOTS",
    soal: "Setelah memperbarui driver kartu grafis, layar laptop Rina berkedip dan resolusinya turun. Laptop itu sedang tidak terhubung ke internet. Analisislah kemungkinan penyebabnya, susunlah strategi perbaikan secara berurutan, dan jelaskan cara agar kejadian serupa tidak terulang!",
    perlu: 5,
    konsep: [
      { l: "Penyebab: driver baru tidak kompatibel/rusak", kata: ["tidak kompatibel", "tidak cocok", "korup", "rusak", "bermasalah", "bug", "tidak sesuai"] },
      { l: "Roll Back ke versi sebelumnya", kata: ["roll back", "rollback", "versi sebelumnya", "kembalikan"] },
      { l: "Safe Mode / driver dasar", kata: ["safe mode", "mode aman", "basic display", "driver bawaan", "driver standar", "microsoft basic"] },
      { l: "Uninstall dan pasang ulang driver", kata: ["uninstall", "hapus driver", "instal ulang", "install ulang", "pasang ulang"] },
      { l: "Unduh di perangkat lain & pindahkan (flashdisk)", kata: ["flashdisk", "flash disk", "usb", "komputer lain", "perangkat lain", "hp", "offline"] },
      { l: "Driver resmi sesuai tipe/versi", kata: ["situs resmi", "website resmi", "produsen", "nvidia", "amd", "intel", "versi yang sesuai", "tipe"] },
      { l: "Pencegahan: restore point / backup", kata: ["restore point", "titik pemulihan", "backup", "cadangan", "pencegahan", "sebelum update", "sebelum memperbarui"] }
    ] },

  { id: "u3", tp: "tp2", tipe: "Biasa",
    soal: "Jelaskan perbedaan fungsi prosesor, RAM, dan media penyimpanan (HDD/SSD) dalam pemrosesan dan penyimpanan data!",
    perlu: 4,
    konsep: [
      { l: "Prosesor menjalankan/mengolah instruksi", kata: ["otak", "eksekusi", "menjalankan instruksi", "mengolah", "memproses", "menghitung", "instruksi"] },
      { l: "RAM penyimpanan sementara", kata: ["sementara", "volatile", "hilang saat", "hilang jika", "memori utama", "multitasking"] },
      { l: "RAM sangat cepat diakses", kata: ["cepat diakses", "sangat cepat", "lebih cepat dari", "kecepatan tinggi"] },
      { l: "Penyimpanan bersifat permanen", kata: ["permanen", "tetap tersimpan", "tidak hilang", "jangka panjang", "menyimpan data", "menyimpan file"] },
      { l: "SSD lebih cepat (tanpa bagian bergerak)", kata: ["tanpa bagian bergerak", "lebih cepat", "kecepatan", "booting", "flash"] },
      { l: "HDD murah & berkapasitas besar", kata: ["kapasitas besar", "murah", "piringan", "magnetik", "terjangkau", "lebih lambat"] }
    ] },
  { id: "u4", tp: "tp2", tipe: "HOTS",
    soal: "Sebuah sekolah akan membeli 10 komputer untuk lab desain grafis dengan anggaran terbatas, dan 1 komputer server untuk menyimpan data nilai serta arsip. Rekomendasikan spesifikasi prosesor, RAM, dan penyimpanan untuk kedua kebutuhan tersebut, lalu berikan alasan pemilihannya!",
    perlu: 5,
    konsep: [
      { l: "Lab desain: prosesor multi-core/kuat", kata: ["multi core", "multicore", "banyak core", "core i5", "core i7", "ryzen 5", "ryzen 7", "6 core", "8 core", "prosesor kuat", "prosesor tinggi"] },
      { l: "Lab desain: RAM besar (16 GB+)", kata: ["16 gb", "16gb", "32 gb", "32gb", "ram besar", "ram 16"] },
      { l: "Penyimpanan SSD/NVMe untuk lab", kata: ["ssd", "nvme"] },
      { l: "GPU / kartu grafis untuk desain", kata: ["gpu", "vga", "kartu grafis", "grafis dedicated", "grafis khusus"] },
      { l: "Server: kapasitas besar + backup/RAID", kata: ["raid", "backup", "cadangan", "redundan", "kapasitas besar", "terabyte", "tb", "hdd"] },
      { l: "Justifikasi: kebutuhan, prioritas, anggaran", kata: ["anggaran", "biaya", "prioritas", "terbatas", "efisien", "hemat", "sesuai kebutuhan", "kebutuhan"] },
      { l: "Kompatibilitas / keandalan / upgrade", kata: ["kompatibel", "upgrade", "ups", "handal", "andal", "keandalan", "awet"] }
    ] },

  { id: "u5", tp: "tp3", tipe: "Biasa",
    soal: "Sebutkan minimal tiga penyebab komputer restart sendiri atau macet total, beserta tindakan perbaikan untuk masing-masing penyebab!",
    perlu: 4,
    konsep: [
      { l: "Overheating (debu/kipas/pasta termal)", kata: ["overheat", "panas", "suhu", "kipas", "debu", "pasta termal", "thermal"] },
      { l: "PSU / catu daya / listrik", kata: ["psu", "power supply", "catu daya", "tegangan", "listrik tidak stabil", "adaptor"] },
      { l: "RAM bermasalah", kata: ["ram"] },
      { l: "Hard disk / SSD rusak", kata: ["bad sector", "hard disk", "harddisk", "hdd", "ssd rusak", "penyimpanan rusak", "storage"] },
      { l: "Malware / virus", kata: ["malware", "virus", "antivirus", "scan"] },
      { l: "Driver / sistem operasi bermasalah", kata: ["driver", "windows rusak", "file sistem", "sfc", "update gagal", "sistem operasi"] },
      { l: "Menyebut tindakan perbaikan", kata: ["bersihkan", "ganti", "pasang ulang", "lepas", "chkdsk", "memtest", "instal ulang", "install ulang", "uji"] }
    ] },
  { id: "u6", tp: "tp3", tipe: "HOTS",
    soal: "Komputer lab sering hang setelah dipakai ± 30 menit dan kadang restart sendiri. Saat diperiksa: suhu CPU 95 °C, penggunaan Disk di Task Manager 100%, dan RAM terpakai 95%. Analisislah kemungkinan penyebab dari data tersebut, susun urutan diagnosa, serta berikan solusi jangka pendek dan jangka panjang!",
    perlu: 5,
    konsep: [
      { l: "Suhu tinggi = overheating / throttling", kata: ["overheat", "panas", "suhu tinggi", "terlalu tinggi", "thermal throttling", "95"] },
      { l: "Solusi pendingin: debu, kipas, pasta termal", kata: ["bersihkan", "debu", "pasta", "kipas", "heatsink", "pendingin"] },
      { l: "Disk 100%: storage lambat/rusak", kata: ["disk 100", "hard disk", "hdd", "bad sector", "smart", "crystaldisk", "chkdsk", "ssd", "penyimpanan"] },
      { l: "RAM 95%: kapasitas kurang / program berat", kata: ["ram penuh", "ram kurang", "tambah ram", "upgrade ram", "kapasitas ram", "kurang ram", "ram terpakai", "startup"] },
      { l: "Cek malware / proses berat", kata: ["malware", "virus", "antivirus", "task manager", "proses", "program berat"] },
      { l: "Urutan diagnosa dari mudah ke sulit", kata: ["urutan", "langkah pertama", "pertama", "kemudian", "selanjutnya", "lalu", "tahap"] },
      { l: "Solusi jangka panjang / perawatan", kata: ["jangka panjang", "perawatan", "berkala", "rutin", "preventif", "upgrade", "ganti ssd"] }
    ] },

  { id: "u7", tp: "tp4", tipe: "Biasa",
    soal: "Sebuah komputer menyala (kipas berputar) tetapi layar monitor tidak menampilkan gambar. Sebutkan langkah-langkah pemeriksaan yang akan kamu lakukan secara berurutan!",
    perlu: 4,
    konsep: [
      { l: "Cek kabel daya / monitor menyala", kata: ["kabel daya", "kabel power", "colokan", "listrik", "tombol power", "monitor menyala", "lampu indikator", "indikator"] },
      { l: "Cek kabel video & sumber input", kata: ["kabel hdmi", "kabel vga", "kabel video", "hdmi", "vga", "input", "sumber input", "displayport"] },
      { l: "Amati bunyi beep / kode", kata: ["beep", "bunyi", "kode"] },
      { l: "Lepas-pasang ulang RAM", kata: ["ram", "lepas pasang", "pasang ulang", "bersihkan kontak", "kontak"] },
      { l: "Periksa kartu grafis", kata: ["gpu", "vga card", "kartu grafis", "grafis"] },
      { l: "Uji dengan monitor/komponen lain", kata: ["monitor lain", "komputer lain", "coba dengan", "uji", "tes", "bergantian"] }
    ] },
  { id: "u8", tp: "tp4", tipe: "HOTS",
    soal: "Dalam satu hari, seorang guru melaporkan tiga masalah: komputernya sangat lambat, internet tidak bisa diakses, dan printer tidak mencetak. Buatlah peta masalahnya, tentukan apakah masalah-masalah itu saling berkaitan atau terpisah, susun prioritas, tuliskan langkah perbaikan, dan jelaskan bagaimana kamu memastikan semuanya sudah teratasi!",
    perlu: 5,
    konsep: [
      { l: "Memetakan / memisahkan masalah", kata: ["satu per satu", "terpisah", "sendiri-sendiri", "dipisah", "masing masing", "tidak saling", "berkaitan", "saling terkait", "hubungan"] },
      { l: "Menentukan prioritas", kata: ["prioritas", "paling penting", "dampak", "mendesak", "urgensi"] },
      { l: "Komputer lambat: resource/malware/storage", kata: ["task manager", "malware", "virus", "storage", "penuh", "startup", "disk cleanup", "ram"] },
      { l: "Internet: router, kabel, DNS", kata: ["router", "modem", "wifi", "wi fi", "kabel lan", "dns", "ipconfig", "isp"] },
      { l: "Printer: spooler, antrian, driver, kabel", kata: ["spooler", "antrian", "queue", "driver printer", "kabel usb", "offline", "tinta", "kertas", "restart printer"] },
      { l: "Menguji / verifikasi hasil", kata: ["uji", "verifikasi", "pastikan", "cetak ulang", "coba lagi", "tes", "berhasil"] },
      { l: "Dokumentasi / pencegahan", kata: ["catat", "dokumentasi", "laporan", "pencegahan", "perawatan", "tindak lanjut"] }
    ] }
],

/* =================== SIMULASI 1: Device Manager =================== */
sim1: {
  aksi: [
    { id: "update",   e: "🔄", n: "Update driver" },
    { id: "rollback", e: "⏪", n: "Roll Back Driver" },
    { id: "enable",   e: "✅", n: "Enable device" },
    { id: "disable",  e: "⛔", n: "Disable device" },
    { id: "uninstall",e: "🗑️", n: "Uninstall device lalu restart" },
    { id: "scan",     e: "🔍", n: "Scan for hardware changes" }
  ],
  kasus: [
    { judul: "Wi-Fi Menghilang",
      cerita: "Setelah Rani menginstal ulang Windows, ikon Wi-Fi tidak muncul sama sekali di taskbar. Periksa Device Manager!",
      hint: "Cari perangkat di kategori “Other devices” (belum dikenali Windows).",
      dev: [
        { id: "a1", cat: "Display adapters", n: "Intel(R) UHD Graphics 620", st: "ok" },
        { id: "a2", cat: "Other devices", n: "Network Controller", st: "unknown", s: "Windows tidak dapat memuat driver untuk perangkat ini karena driver belum terpasang. (Code 28)" },
        { id: "a3", cat: "Sound, video and game controllers", n: "Realtek High Definition Audio", st: "ok" },
        { id: "a4", cat: "Keyboards", n: "Standard PS/2 Keyboard", st: "ok" },
        { id: "a5", cat: "Mice and other pointing devices", n: "HID-compliant mouse", st: "ok" }
      ],
      target: "a2", aksi: "update",
      salah: { rollback: "Roll Back butuh driver lama. Di sini driver belum pernah terpasang.", enable: "Perangkat tidak dalam keadaan nonaktif.", disable: "Menonaktifkan tidak akan memunculkan Wi-Fi.", uninstall: "Menghapus perangkat yang belum punya driver tidak menyelesaikan masalah.", scan: "Pemindaian ulang tidak memasang driver yang belum ada." },
      why: "Code 28 berarti driver belum terpasang. Solusinya memasang atau memperbarui driver (Update driver) dari sumber resmi produsen, misalnya lewat flashdisk bila belum ada internet." },
    { judul: "Layar Berkedip Setelah Update",
      cerita: "Dimas memperbarui driver kartu grafis kemarin. Hari ini layarnya berkedip-kedip dan resolusi tidak bisa diubah.",
      hint: "Masalah muncul setelah pembaruan, jadi cari fitur untuk kembali ke versi sebelumnya.",
      dev: [
        { id: "b1", cat: "Display adapters", n: "NVIDIA GeForce GTX 1650", st: "warn", s: "Windows telah menghentikan perangkat ini karena melaporkan adanya masalah. (Code 43)", info: "Tanggal driver: kemarin. Driver baru saja diperbarui." },
        { id: "b2", cat: "Network adapters", n: "Realtek PCIe GbE Family Controller", st: "ok" },
        { id: "b3", cat: "Sound, video and game controllers", n: "NVIDIA High Definition Audio", st: "ok" },
        { id: "b4", cat: "Monitors", n: "Generic PnP Monitor", st: "ok" },
        { id: "b5", cat: "Disk drives", n: "Samsung SSD 870 EVO", st: "ok" }
      ],
      target: "b1", aksi: "rollback",
      salah: { update: "Memperbarui lagi bisa menambah masalah. Masalah justru muncul setelah pembaruan.", enable: "Perangkat tidak dinonaktifkan.", disable: "Menonaktifkan GPU tidak memperbaiki tampilan.", uninstall: "Bisa membantu, tetapi ada cara yang lebih ringan dan lebih tepat terlebih dahulu.", scan: "Pemindaian ulang tidak mengubah driver yang bermasalah." },
      why: "Masalah baru muncul setelah pembaruan driver, jadi tindakan paling ringan dan tepat adalah Roll Back Driver ke versi sebelumnya yang stabil." },
    { judul: "Speaker Bisu",
      cerita: "Komputer Sari menyala normal, tetapi tidak ada suara sama sekali. Volume sudah dinaikkan.",
      hint: "Perhatikan ikon panah ke bawah pada perangkat audio.",
      dev: [
        { id: "c1", cat: "Display adapters", n: "Intel(R) UHD Graphics", st: "ok" },
        { id: "c2", cat: "Network adapters", n: "Intel(R) Wi-Fi 6 AX201", st: "ok" },
        { id: "c3", cat: "Sound, video and game controllers", n: "Realtek High Definition Audio", st: "disabled", s: "Perangkat ini dinonaktifkan. (Code 22)" },
        { id: "c4", cat: "Keyboards", n: "HID Keyboard Device", st: "ok" },
        { id: "c5", cat: "Monitors", n: "Generic PnP Monitor", st: "ok" }
      ],
      target: "c3", aksi: "enable",
      salah: { update: "Driver sudah ada. Perangkat hanya sedang dinonaktifkan.", rollback: "Tidak ada pembaruan driver yang perlu dibatalkan.", disable: "Perangkat sudah nonaktif.", uninstall: "Terlalu berlebihan untuk perangkat yang hanya dinonaktifkan.", scan: "Pemindaian ulang tidak mengaktifkan perangkat yang dinonaktifkan." },
      why: "Code 22 dan ikon panah ke bawah berarti perangkat dinonaktifkan. Cukup klik kanan lalu pilih Enable device." },
    { judul: "Printer USB Tidak Terbaca",
      cerita: "Printer USB baru dipasang di ruang guru, tetapi tidak terbaca. Pembaruan driver otomatis sudah dicoba, hasilnya “driver terbaik sudah terpasang”, namun masalah tetap ada.",
      hint: "Update tidak membantu, jadi driver kemungkinan korup. Hapus dan biarkan Windows memasang ulang.",
      dev: [
        { id: "d1", cat: "Universal Serial Bus controllers", n: "USB Printing Support", st: "warn", s: "Perangkat ini tidak dapat dimulai. (Code 10)", info: "Update driver otomatis sudah dicoba. Hasil: driver terbaik sudah terpasang." },
        { id: "d2", cat: "Universal Serial Bus controllers", n: "USB Root Hub (USB 3.0)", st: "ok" },
        { id: "d3", cat: "Print queues", n: "Microsoft Print to PDF", st: "ok" },
        { id: "d4", cat: "Disk drives", n: "WDC WD10EZEX Hard Drive", st: "ok" },
        { id: "d5", cat: "Network adapters", n: "Realtek PCIe GbE Family Controller", st: "ok" }
      ],
      target: "d1", aksi: "uninstall",
      salah: { update: "Pembaruan sudah dicoba dan tidak membantu.", rollback: "Tidak ada riwayat pembaruan yang menyebabkan masalah.", enable: "Perangkat tidak dinonaktifkan.", disable: "Menonaktifkan tidak memperbaiki apa pun.", scan: "Pemindaian ulang saja tidak akan membersihkan driver yang korup." },
      why: "Code 10 yang tetap muncul setelah update menandakan driver kemungkinan korup. Uninstall device, restart, lalu biarkan Windows (atau driver resmi) memasangnya ulang dengan bersih." }
  ]
},

/* =================== SIMULASI 2: Rakit Komputer =================== */
sim2: {
  opsi: {
    cpu: [
      { id: "c1", n: "Dual-core, 2 core / 4 thread", d: "Hemat, untuk pekerjaan ringan", h: 700 },
      { id: "c2", n: "Hexa-core, 6 core / 12 thread", d: "Seimbang untuk penggunaan umum", h: 1600 },
      { id: "c3", n: "Octa-core, 8 core / 16 thread (kelas tinggi)", d: "Sangat kuat untuk render dan multitasking", h: 3500 }
    ],
    ram: [
      { id: "r1", n: "4 GB", d: "Sangat terbatas", h: 250 },
      { id: "r2", n: "8 GB", d: "Cukup untuk penggunaan harian", h: 500 },
      { id: "r3", n: "16 GB", d: "Lega untuk multitasking dan kerja kreatif", h: 1000 },
      { id: "r4", n: "32 GB", d: "Untuk beban kerja berat", h: 2000 }
    ],
    sto: [
      { id: "s1", n: "HDD 1 TB", d: "Murah, kapasitas besar, lambat", h: 550 },
      { id: "s2", n: "SSD SATA 256 GB", d: "Cepat, kapasitas kecil", h: 450 },
      { id: "s3", n: "SSD NVMe 512 GB", d: "Sangat cepat, kapasitas menengah", h: 750 },
      { id: "s4", n: "HDD 4 TB", d: "Kapasitas sangat besar untuk arsip", h: 1300 }
    ],
    gpu: [
      { id: "g1", n: "Grafis terintegrasi (menyatu dengan prosesor)", d: "Tanpa biaya tambahan", h: 0 },
      { id: "g2", n: "GPU dedicated menengah (4–6 GB)", d: "Mampu untuk desain dan game ringan", h: 2000 },
      { id: "g3", n: "GPU dedicated high-end (12 GB+)", d: "Performa grafis tertinggi", h: 6000 }
    ]
  },
  nama: { cpu: "Prosesor", ram: "RAM", sto: "Penyimpanan", gpu: "Kartu Grafis" },
  sc: [
    { n: "Tugas Sekolah & Office", e: "📚", budget: 4000,
      cerita: "Siswa SMA mengerjakan tugas Word, Excel, PowerPoint, browsing, dan Zoom. Anggaran komponen maksimal Rp 4.000.000.",
      poin: { cpu: { c1: 2, c2: 3, c3: 1 }, ram: { r1: 1, r2: 3, r3: 2, r4: 0 }, sto: { s1: 1, s2: 3, s3: 2, s4: 0 }, gpu: { g1: 3, g2: 1, g3: 0 } },
      why: {
        cpu: "Pekerjaan Office cukup dengan 4–6 core. Prosesor kelas tinggi membuang anggaran.",
        ram: "8 GB sudah lega untuk Office dan browser. 32 GB berlebihan.",
        sto: "SSD membuat komputer cepat menyala dan membuka aplikasi. Kapasitas 256 GB cukup untuk dokumen.",
        gpu: "Grafis terintegrasi sudah memadai. GPU dedicated tidak diperlukan dan menguras anggaran." } },
    { n: "Edit Video & Desain Grafis", e: "🎬", budget: 12000,
      cerita: "Kreator konten mengedit video 1080p–4K dan mendesain dengan aplikasi grafis. Anggaran komponen maksimal Rp 12.000.000.",
      poin: { cpu: { c1: 0, c2: 2, c3: 3 }, ram: { r1: 0, r2: 1, r3: 3, r4: 3 }, sto: { s1: 0, s2: 2, s3: 3, s4: 1 }, gpu: { g1: 1, g2: 3, g3: 2 } },
      why: {
        cpu: "Rendering sangat terbantu jumlah core yang banyak.",
        ram: "Edit video butuh RAM besar (16 GB ke atas) agar tidak patah-patah.",
        sto: "SSD NVMe mempercepat pembacaan file video dan cache proyek.",
        gpu: "GPU dedicated mempercepat efek dan render. Tipe menengah sering paling seimbang dengan anggaran." } },
    { n: "Server Arsip Data Sekolah", e: "🗄️", budget: 6000,
      cerita: "Sekolah butuh satu komputer server untuk menyimpan data nilai, dokumen, dan arsip, dan diakses banyak guru. Anggaran maksimal Rp 6.000.000.",
      poin: { cpu: { c1: 2, c2: 3, c3: 2 }, ram: { r1: 0, r2: 3, r3: 3, r4: 1 }, sto: { s1: 2, s2: 0, s3: 1, s4: 3 }, gpu: { g1: 3, g2: 0, g3: 0 } },
      why: {
        cpu: "Server arsip butuh prosesor yang andal, bukan yang paling tinggi.",
        ram: "8–16 GB cukup untuk melayani akses file bersama.",
        sto: "Prioritas utama adalah kapasitas besar dengan harga terjangkau, seperti HDD 4 TB (dan sebaiknya ada backup).",
        gpu: "Server tidak menampilkan grafis berat, jadi grafis terintegrasi sudah cukup." } },
    { n: "Programming & Gaming Ringan", e: "💻", budget: 8000,
      cerita: "Siswa belajar programming, menjalankan beberapa aplikasi sekaligus, dan sesekali bermain game ringan. Anggaran maksimal Rp 8.000.000.",
      poin: { cpu: { c1: 0, c2: 3, c3: 2 }, ram: { r1: 0, r2: 2, r3: 3, r4: 2 }, sto: { s1: 0, s2: 2, s3: 3, s4: 0 }, gpu: { g1: 1, g2: 3, g3: 1 } },
      why: {
        cpu: "Prosesor 6 core seimbang untuk compile kode, banyak tab, dan game ringan.",
        ram: "16 GB nyaman untuk IDE, browser, dan emulator sekaligus.",
        sto: "SSD NVMe membuat proyek, compile, dan game dimuat dengan cepat.",
        gpu: "GPU menengah cukup untuk game ringan. High-end akan melebihi anggaran." } }
  ]
},

/* ================ SIMULASI 3: Dokter Komputer (restart & macet) ================ */
sim3: [
  { judul: "Restart Saat Bermain Game",
    cerita: "Komputer Dimas restart sendiri sekitar 10 menit setelah bermain game berat. Bodi casing terasa sangat panas.",
    panel: [
      { l: "Suhu CPU", v: "98 °C", pct: 98, lv: "bad" },
      { l: "Kecepatan kipas CPU", v: "0 RPM", pct: 2, lv: "bad" },
      { l: "Penggunaan CPU", v: "100%", pct: 100, lv: "warn" },
      { l: "Tegangan jalur 12V", v: "12,1 V", pct: 92, lv: "ok" }
    ],
    q1: { t: "Apa penyebab paling mungkin?", o: ["Keyboard rusak", "Catu daya (PSU) lemah", "Virus pada flashdisk", "Overheating: pendingin tidak bekerja baik karena kipas mati/tersumbat debu", "Layar kurang terang"], k: 3,
          why: "Suhu 98 °C dengan kipas 0 RPM berarti pendingin gagal. Prosesor memutus sistem (restart) untuk melindungi dirinya." },
    q2: { t: "Tindakan perbaikan yang paling tepat?", o: ["Instal ulang Windows", "Bersihkan debu, periksa atau ganti kipas, dan ganti pasta termal", "Ganti keyboard", "Turunkan kecerahan layar", "Tambah RAM"], k: 1,
          why: "Memulihkan pendinginan (bersih debu, kipas berfungsi, pasta termal baru) langsung menyasar penyebabnya." } },
  { judul: "Mati-Hidup Sendiri Tanpa Beban",
    cerita: "Komputer kantor Bu Wati mati dan menyala sendiri walau hanya dipakai mengetik. Suhu tidak tinggi.",
    panel: [
      { l: "Suhu CPU", v: "41 °C", pct: 41, lv: "ok" },
      { l: "Beban CPU", v: "6%", pct: 6, lv: "ok" },
      { l: "Tegangan jalur 12V", v: "10,4 V (naik-turun)", pct: 78, lv: "bad" },
      { l: "Usia power supply", v: "7 tahun, merek tidak jelas", lv: "warn" }
    ],
    q1: { t: "Apa penyebab paling mungkin?", o: ["Overheating prosesor", "Malware", "Resolusi layar salah", "Mouse rusak", "Catu daya (PSU) tidak stabil dan sudah menua"], k: 4,
          why: "Suhu dan beban normal, tetapi tegangan 12V tidak stabil. Itu tanda PSU bermasalah." },
    q2: { t: "Tindakan perbaikan yang paling tepat?", o: ["Menambah RAM", "Mengganti pasta termal", "Menguji dengan PSU lain, lalu ganti dengan PSU berkualitas berdaya cukup", "Menginstal antivirus baru", "Mengganti monitor"], k: 2,
          why: "Menguji dengan PSU pengganti memastikan dugaan, lalu penggantian dengan PSU yang layak menyelesaikan masalah." } },
  { judul: "Macet Total Setelah Dinyalakan",
    cerita: "Beberapa menit setelah menyala, komputer lab hang. Kursor bergerak patah-patah dan aplikasi tidak merespons.",
    panel: [
      { l: "Penggunaan CPU", v: "99%", pct: 99, lv: "bad" },
      { l: "Penggunaan Disk", v: "100%", pct: 100, lv: "bad" },
      { l: "Penggunaan RAM", v: "96%", pct: 96, lv: "bad" },
      { l: "Proses tidak dikenal", v: "winminer32.exe", lv: "bad" }
    ],
    q1: { t: "Apa penyebab paling mungkin?", o: ["Kabel monitor longgar", "Printer offline", "Malware yang menghabiskan sumber daya komputer", "Speaker rusak", "Baterai CMOS lemah"], k: 2,
          why: "Seluruh sumber daya terkuras oleh proses asing. Ini ciri khas malware (mis. penambang kripto)." },
    q2: { t: "Tindakan perbaikan yang paling tepat?", o: ["Scan dengan antivirus (offline scan), akhiri dan hapus proses mencurigakan, lalu perbarui keamanan", "Mengganti keyboard", "Menambah kipas", "Mengganti kabel LAN", "Menurunkan resolusi layar"], k: 0,
          why: "Membersihkan malware menghilangkan sumber beban. Setelah itu lakukan update keamanan dan edukasi pengguna." } },
  { judul: "Layar Biru Setelah Tambah RAM",
    cerita: "Roni menambah satu modul RAM. Sejak itu komputernya sering menampilkan layar biru lalu restart.",
    panel: [
      { l: "Stop code", v: "MEMORY_MANAGEMENT", lv: "bad" },
      { l: "Kejadian sebelum masalah", v: "Memasang RAM baru", lv: "warn" },
      { l: "Windows Memory Diagnostic", v: "Ditemukan kesalahan", lv: "bad" },
      { l: "Suhu CPU", v: "45 °C", pct: 45, lv: "ok" }
    ],
    q1: { t: "Apa penyebab paling mungkin?", o: ["Keyboard tidak kompatibel", "Layar terlalu besar", "Hard disk penuh", "Modul RAM baru tidak terpasang sempurna, rusak, atau tidak kompatibel", "Wallpaper rusak"], k: 3,
          why: "Masalah muncul setelah RAM dipasang, stop code terkait memori, dan uji memori menemukan kesalahan." },
    q2: { t: "Tindakan perbaikan yang paling tepat?", o: ["Lepas modul baru, bersihkan kontak, pasang ulang, uji ulang; ganti modul bila tetap error", "Instal ulang Windows", "Mengganti prosesor", "Mengganti kabel daya", "Mengganti mouse"], k: 0,
          why: "Langkah sederhana lebih dulu: pasang ulang dan uji. Bila tetap error, modul perlu diganti atau dicocokkan spesifikasinya." } }
],

/* ============ SIMULASI 4: Klinik Masalah Komputer (+ urutan langkah) ============ */
sim4: {
  kasus: [
    { judul: "Layar Kosong dan Bunyi Beep",
      cerita: "Setelah dibersihkan dari debu, komputer menyala tetapi layar kosong. Terdengar beep panjang berulang.",
      panel: [
        { l: "Lampu power", v: "Menyala", lv: "ok" },
        { l: "Kipas", v: "Berputar normal", lv: "ok" },
        { l: "Layar monitor", v: "Tidak ada gambar", lv: "bad" },
        { l: "Bunyi dari casing", v: "Beep panjang berulang", lv: "warn" }
      ],
      q1: { t: "Apa dugaan penyebab paling tepat?", o: ["Hard disk penuh", "Windows belum diaktivasi", "Mouse rusak", "Modul RAM tidak terbaca (kurang terpasang atau kontak kotor)", "Wallpaper terlalu besar"], k: 3,
            why: "Beep berulang dengan layar kosong sering menandakan RAM tidak terbaca, apalagi setelah komputer dibersihkan." },
      q2: { t: "Perbaikan awal yang tepat?", o: ["Instal ulang Windows", "Ganti keyboard", "Format flashdisk", "Ganti layar monitor", "Lepas RAM, bersihkan kontak, lalu pasang ulang sampai terkunci"], k: 4,
            why: "Perbaikan paling sederhana dan paling mungkin berhasil adalah memasang ulang RAM dengan benar." } },
    { judul: "Komputer Sangat Lambat",
      cerita: "Komputer perpustakaan terasa sangat lambat sejak beberapa minggu terakhir, bahkan untuk membuka folder.",
      panel: [
        { l: "Drive C:", v: "99% terisi", pct: 99, lv: "bad" },
        { l: "Penggunaan RAM", v: "70%", pct: 70, lv: "warn" },
        { l: "Penggunaan CPU", v: "25%", pct: 25, lv: "ok" },
        { l: "Program startup", v: "23 program aktif", lv: "warn" }
      ],
      q1: { t: "Apa dugaan penyebab paling tepat?", o: ["Kabel HDMI longgar", "Printer offline", "Penyimpanan C: hampir penuh dan terlalu banyak program startup", "Router mati", "Speaker rusak"], k: 2,
            why: "Drive sistem hampir penuh dan banyak program berjalan saat startup adalah penyebab umum komputer lambat." },
      q2: { t: "Perbaikan awal yang tepat?", o: ["Ganti keyboard", "Naikkan kecerahan layar", "Hapus file tak perlu (Disk Cleanup), uninstall aplikasi, nonaktifkan startup, pindahkan data", "Matikan router", "Ganti kabel listrik"], k: 2,
            why: "Mengosongkan ruang dan mengurangi program startup memulihkan performa tanpa biaya." } },
    { judul: "Internet Tidak Bisa Diakses",
      cerita: "Laptop Bu Dina terhubung ke Wi-Fi, tetapi halaman web tidak terbuka. Anak-anaknya juga mengeluh internet mati.",
      panel: [
        { l: "Status Wi-Fi", v: "Terhubung", lv: "ok" },
        { l: "Ikon jaringan", v: "Tanda seru (tanpa akses internet)", lv: "warn" },
        { l: "Perangkat lain di rumah", v: "Juga tidak bisa internet", lv: "bad" },
        { l: "Lampu internet pada router", v: "Merah / mati", lv: "bad" }
      ],
      q1: { t: "Apa dugaan penyebab paling tepat?", o: ["Driver keyboard rusak", "Masalah pada router/modem atau layanan penyedia internet (bukan pada laptop)", "RAM laptop kurang", "Layar laptop rusak", "Baterai menua"], k: 1,
            why: "Karena semua perangkat terdampak dan lampu internet router bermasalah, sumber masalah ada di luar laptop." },
      q2: { t: "Perbaikan awal yang tepat?", o: ["Instal ulang Windows laptop", "Restart router/modem, cek kabel, lalu hubungi penyedia internet bila belum pulih", "Ganti baterai laptop", "Hapus semua aplikasi", "Ganti mouse"], k: 1,
            why: "Mulai dari langkah termudah (restart router dan cek kabel), lalu eskalasi ke penyedia layanan." } },
    { judul: "Printer Tidak Mencetak",
      cerita: "Guru mengirim dokumen ke printer, tetapi tidak ada yang tercetak. Kertas dan tinta tersedia.",
      panel: [
        { l: "Status printer", v: "Offline", lv: "warn" },
        { l: "Antrian cetak", v: "1 dokumen macet (Error)", lv: "bad" },
        { l: "Kabel USB", v: "Terpasang", lv: "ok" },
        { l: "Kertas dan tinta", v: "Tersedia", lv: "ok" }
      ],
      q1: { t: "Apa dugaan penyebab paling tepat?", o: ["Antrian cetak macet atau layanan Print Spooler bermasalah", "RAM komputer rusak", "Monitor mati", "Mouse rusak", "Kipas CPU mati"], k: 0,
            why: "Dokumen macet pada antrian dan status Offline menunjukkan masalah pada antrian atau layanan pencetakan." },
      q2: { t: "Perbaikan awal yang tepat?", o: ["Ganti monitor", "Format hard disk", "Beli komputer baru", "Ganti keyboard", "Batalkan antrian, restart Print Spooler atau printer, lalu cetak halaman uji"], k: 4,
            why: "Membersihkan antrian dan memulai ulang layanan atau printer adalah perbaikan awal yang tepat, lalu uji hasilnya." } },
    { judul: "Keyboard dan Mouse Mati",
      cerita: "Keyboard dan mouse USB tiba-tiba tidak merespons. Keduanya dicolokkan di dua port USB depan casing.",
      panel: [
        { l: "Keyboard USB", v: "Tidak merespons", lv: "bad" },
        { l: "Mouse USB", v: "Tidak merespons", lv: "bad" },
        { l: "Lokasi colokan", v: "Port USB depan", lv: "warn" },
        { l: "Flashdisk di port belakang", v: "Terbaca normal", lv: "ok" }
      ],
      q1: { t: "Apa dugaan penyebab paling tepat?", o: ["Hard disk rusak", "Windows kehabisan lisensi", "Port USB depan bermasalah (port atau kabel internalnya)", "Printer macet", "Router mati"], k: 2,
            why: "Port belakang berfungsi normal, jadi masalah mengarah ke port USB depan." },
      q2: { t: "Perbaikan awal yang tepat?", o: ["Pindahkan keyboard dan mouse ke port USB belakang, uji, lalu cek Device Manager bila perlu", "Ganti prosesor", "Instal ulang Windows", "Ganti RAM", "Ganti monitor"], k: 0,
            why: "Menguji dengan port lain adalah langkah termurah dan paling cepat untuk membuktikan dugaan." } }
  ],
  urut: {
    judul: "Susun Urutan Langkah: Komputer Menyala tapi Layar Kosong",
    cerita: "Urutkan langkah pemeriksaan berikut dari yang pertama dilakukan hingga yang terakhir. Gunakan tombol ▲ dan ▼.",
    steps: [
      { id: 1, t: "Pastikan kabel daya terpasang dan monitor dalam keadaan menyala" },
      { id: 2, t: "Periksa kabel video (HDMI/VGA) dan pilih sumber input monitor yang benar" },
      { id: 3, t: "Amati lampu indikator dan dengarkan kode beep dari komputer" },
      { id: 4, t: "Lepas dan pasang ulang RAM serta kartu grafis, bersihkan kontaknya" },
      { id: 5, t: "Uji dengan monitor atau komponen cadangan yang pasti berfungsi" },
      { id: 6, t: "Catat hasilnya; bila belum teratasi, serahkan ke teknisi" }
    ],
    awal: [4, 1, 6, 3, 5, 2]
  }
},

/* ============================ REFLEKSI ============================ */
refl: {
  skala: ["Sangat tidak setuju", "Tidak setuju", "Ragu-ragu", "Setuju", "Sangat setuju"],
  likert: [
    "Sebelum mulai belajar, aku menentukan apa yang ingin aku kuasai hari ini.",
    "Aku menyusun urutan langkah belajar sebelum mengerjakan simulasi.",
    "Saat belajar, aku berhenti sejenak untuk mengecek apakah aku benar-benar paham.",
    "Aku menyadari ketika jawabanku sebenarnya hanya tebakan.",
    "Ketika bingung, aku mencoba cara lain (membaca ulang, mengulang simulasi, atau bertanya).",
    "Aku mengaitkan materi dengan komputer yang pernah aku pakai atau lihat.",
    "Setelah selesai, aku memeriksa kesalahanku dan memikirkan penyebabnya.",
    "Aku tetap bertahan dan tidak mudah menyerah saat simulasi terasa sulit.",
    "Aku tahu cara belajar yang paling cocok untukku.",
    "Aku bisa menyebutkan bagian materi yang sudah dan belum aku kuasai."
  ],
  dims: [
    { n: "Perencanaan", idx: [0, 1], tip: "Coba tulis 1 target kecil sebelum belajar, misalnya “hari ini aku mau bisa membaca kode di Device Manager”." },
    { n: "Pemantauan", idx: [2, 3], tip: "Setelah tiap bagian, tanyakan pada diri sendiri: “Bisakah aku menjelaskannya ke teman tanpa melihat catatan?”" },
    { n: "Strategi", idx: [4, 5], tip: "Kaitkan materi dengan benda nyata: komputer di rumah, laptop sekolah, atau printer di ruang guru." },
    { n: "Evaluasi & Ketekunan", idx: [6, 7], tip: "Saat salah, tulis “salahnya di mana” dan “lain kali aku akan…”. Kesalahan adalah data untuk belajar." },
    { n: "Kesadaran Cara Belajar", idx: [8, 9], tip: "Coba catat strategi belajar yang paling efektif bagimu, lalu pakai lagi di pelajaran lain." }
  ],
  moods: [
    { e: "😄", n: "Semangat" }, { e: "🙂", n: "Nyaman" }, { e: "😐", n: "Biasa saja" },
    { e: "😕", n: "Bingung" }, { e: "😫", n: "Lelah" }
  ],
  stems: [
    "Ketika komputer tiba-tiba error, hal pertama yang muncul di pikiranku adalah …",
    "Saat aku salah menjawab soal atau simulasi, biasanya aku merasa … dan kemudian aku …",
    "Cara belajar yang diam-diam paling membantuku memahami materi ini adalah …",
    "Bagian yang membuatku merasa kurang yakin, tetapi jarang aku akui, adalah …",
    "Kalau komputer di rumah bermasalah, aku akan menerapkan … dan target belajarku berikutnya adalah …"
  ]
}

};
