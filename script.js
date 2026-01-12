// Main Logic
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initNavigation();
});

// --- Constants & Data ---
const QUESTIONS = {
    'pendulum': [
        { q: "Jika panjang tali pendulum diperpendek, apa yang terjadi pada periodenya?", options: ["Lebih cepat (singkat)", "Lebih lambat (lama)", "Tetap sama", "Berhenti"], answer: 0, feedback: "Benar! Tali pendek = periode singkat." },
        { q: "Besaran apa yang TIDAK mempengaruhi periode pendulum bandul matematis?", options: ["Panjang Tali", "Gravitasi", "Massa Beban", "Sudut simpangan kecil"], answer: 2, feedback: "Tepat! Massa tidak mempengaruhi periode." },
        { q: "Jika gravitasi bulan 1/6 bumi, bagaimana periode pendulum di bulan?", options: ["Lebih cepat", "Lebih lambat", "Sama saja", "Tidak berayun"], answer: 1, feedback: "Benar! Gravitasi kecil membuat ayunan lebih lambat." },
        { q: "Periode (T) berbanding lurus dengan akar dari...", options: ["Massa (m)", "Gravitasi (g)", "Panjang tali (L)", "Sudut"], answer: 2, feedback: "Betul! T sebanding dengan √L." },
        { q: "Berapa getaran jika bandul bergerak A-B-C-B-A?", options: ["1/4 getaran", "1/2 getaran", "3/4 getaran", "1 getaran penuh"], answer: 3, feedback: "Tepat! Itu adalah satu siklus penuh." },
        { q: "Satuan Internasional untuk periode adalah...", options: ["Hertz", "Meter", "Detik (Sekon)", "Newton"], answer: 2, feedback: "Benar! Periode diukur dalam detik." },
        { q: "Frekuensi adalah kebalikan dari...", options: ["Amplitudo", "Periode", "Panjang gelombang", "Kecepatan"], answer: 1, feedback: "Ya, f = 1/T." },
        { q: "Simpangan terjauh dari titik setimbang disebut...", options: ["Frekuensi", "Amplitudo", "Periode", "Fase"], answer: 1, feedback: "Benar! Amplitudo adalah simpangan maksimum." },
        { q: "Jika panjang tali dijadikan 4x lipat, periode menjadi...", options: ["2x lipat", "4x lipat", "1/2 kali", "Tetap"], answer: 0, feedback: "Tepat! √4 = 2, jadi periode 2x lipat." },
        { q: "Gaya pemulih pada bandul disebabkan oleh komponen...", options: ["Tegangan tali", "Gaya berat", "Gaya gesek", "Gaya sentripetal"], answer: 1, feedback: "Betul! Komponen gaya berat (mg sin θ)." }
    ],
    'projectile': [
        { q: "Sudut elevasi untuk jarak mendatar terjauh adalah...", options: ["30°", "45°", "60°", "90°"], answer: 1, feedback: "Benar! 45° memberikan range maksimum." },
        { q: "Pada titik tertinggi, kecepatan vertikal benda adalah...", options: ["Maksimum", "Minimum", "Nol", "Sama dengan v0"], answer: 2, feedback: "Tepat! Sesaat diam di puncak vertikal." },
        { q: "Gerak parabola adalah perpaduan gerak...", options: ["GLB & GLB", "GLBB & GLBB", "GLB (X) & GLBB (Y)", "Melingkar & Lurus"], answer: 2, feedback: "Benar! Horizontal konstan, Vertikal dipercepat." },
        { q: "Bentuk lintasan gerak parabola disebut...", options: ["Lingkaran", "Hiperbola", "Parabola", "Elips"], answer: 2, feedback: "Tentu saja parabola." },
        { q: "Jika gesekan udara diabaikan, percepatan horizontal adalah...", options: ["9.8 m/s²", "0 m/s²", "Berubah-ubah", "Tergantung massa"], answer: 1, feedback: "Betul! Tidak ada gaya horizontal (ax = 0)." },
        { q: "Dua peluru ditembakkan dengan sudut 30° dan 60°. Jarak jangkauannya...", options: ["Sama", "30° lebih jauh", "60° lebih jauh", "Tidak bisa ditentukan"], answer: 0, feedback: "Tepat! Sudut yang jumlahnya 90° memiliki range sama." },
        { q: "Faktor yang mempercepat jatuhnya benda ke bawah adalah...", options: ["Massa", "Kecepatan awal", "Gravitasi", "Sudut"], answer: 2, feedback: "Benar! Gravitasi menarik benda ke bawah." },
        { q: "Di sumbu Y, gerak benda bersifat...", options: ["Diperlambat saat naik", "Dipercepat saat naik", "Konstan", "Nol"], answer: 0, feedback: "Ya! Diperlambat gravitasi saat naik." },
        { q: "Waktu untuk mencapai titik tertinggi dirumuskan...", options: ["v0/g", "v0 sin θ / g", "v0 cos θ / g", "2 v0 / g"], answer: 1, feedback: "Tepat! t_peak = v0 sin θ / g." },
        { q: "Jarak terjauh peluru bergantung pada, KECUALI...", options: ["Kecepatan awal", "Sudut elevasi", "Gravitasi", "Warna peluru"], answer: 3, feedback: "Benar! Warna tidak berpengaruh." }
    ],
    'circuits': [
        { q: "Hukum Ohm dirumuskan sebagai...", options: ["V = I/R", "R = V/I", "I = V.R", "P = V.I"], answer: 1, feedback: "Benar! V = I.R atau R = V/I." },
        { q: "Satuan dari hambatan listrik adalah...", options: ["Ampere", "Volt", "Ohm (Ω)", "Watt"], answer: 2, feedback: "Tepat! Ohm adalah satuan resistansi." },
        { q: "Pada rangkaian seri, besaran yang sama di setiap komponen adalah...", options: ["Tegangan", "Arus", "Daya", "Hambatan"], answer: 1, feedback: "Benar! Arus mengalir sama di seri." },
        { q: "Pada rangkaian paralel, besaran yang sama adalah...", options: ["Tegangan", "Arus", "Energi", "Resistansi"], answer: 0, feedback: "Tepat! Tegangan sama di paralel." },
        { q: "Apa fungsi resistor dalam rangkaian?", options: ["Menyimpan muatan", "Menghambat arus", "Memutus arus", "Meningkatkan tegangan"], answer: 1, feedback: "Benar! Membatasi/menghambat arus." },
        { q: "Alat untuk mengukur tegangan listrik adalah...", options: ["Amperemeter", "Voltmeter", "Ohmmeter", "Barometer"], answer: 1, feedback: "Tepat! Voltmeter." },
        { q: "Jika lampu dipasang seri dan satu putus, maka...", options: ["Lampu lain tetap nyala", "Semua mati", "Lampu lain makin terang", "Terjadi korsleting"], answer: 1, feedback: "Benar! Rangkaian terbuka, arus berhenti." },
        { q: "Bahan yang TIDAK menghantarkan listrik disebut...", options: ["Konduktor", "Isolator", "Semikonduktor", "Superkonduktor"], answer: 1, feedback: "Tepat! Isolator (plastik, karet)." },
        { q: "Rumus daya listrik adalah...", options: ["P = V.I", "P = I.R", "P = V/R", "P = V+I"], answer: 0, feedback: "Benar! Daya (Watt) = Tegangan x Arus." },
        { q: "Arus listrik mengalir dari potensial...", options: ["Rendah ke Tinggi", "Tinggi ke Rendah", "Sama saja", "Tidak mengalir"], answer: 1, feedback: "Ya! Dari kutub positif (tinggi) ke negatif." }
    ],
    'gravity': [
        { q: "Gaya gravitasi antara dua benda berbanding lurus dengan...", options: ["Jarak", "Massa kedua benda", "Kuadrat jarak", "Volume benda"], answer: 1, feedback: "Benar! F sebanding dengan m1.m2." },
        { q: "Jika jarak antar planet diduakalikan, gaya gravitasi menjadi...", options: ["2x lipat", "4x lipat", "1/2 kali", "1/4 kali"], answer: 3, feedback: "Tepat! 1/(2^2) = 1/4 (Hukum Kuadrat Terbalik)." },
        { q: "Kecepatan orbit satelit agar tidak jatuh bergantung pada...", options: ["Massa satelit", "Massa planet induk", "Warna planet", "Suhu planet"], answer: 1, feedback: "Benar! v = √(GM/r), M massa planet." },
        { q: "Nilai konstanta gravitasi umum (G) adalah...", options: ["9.8", "6.67 x 10^-11", "3.14", "1.6 x 10^-19"], answer: 1, feedback: "Tepat! Konstanta Cavendish." },
        { q: "Hukum yang menjelaskan orbit planet berbentuk elips adalah...", options: ["Hukum Newton", "Hukum Kepler I", "Hukum Kepler II", "Hukum Kepler III"], answer: 1, feedback: "Benar! Hukum Kepler I." },
        { q: "Apa yang menyebabkan pasang surut air laut?", options: ["Angin", "Gravitasi Bulan", "Panas Matahari", "Rotasi Bumi"], answer: 1, feedback: "Tepat! Efek gravitasi bulan dominan." },
        { q: "Percepatan gravitasi di permukaan bumi kira-kira...", options: ["1 m/s²", "9.8 m/s²", "100 m/s²", "5 m/s²"], answer: 1, feedback: "Benar! Rata-rata 9.8 m/s²." },
        { q: "Jika satelit berhenti mengorbit, maka ia akan...", options: ["Melayang diam", "Tergelincir keluar", "Jatuh ke planet", "Menjadi bintang"], answer: 2, feedback: "Ya, ditarik gravitasi jatuh." },
        { q: "Gaya sentripetal pada satelit disediakan oleh...", options: ["Mesin roket", "Gaya gravitasi", "Gaya magnet", "Angin surya"], answer: 1, feedback: "Tepat! Gravitasi berperan sebagai gaya sentripetal." },
        { q: "Berat benda adalah...", options: ["Sama dengan massa", "Massa x Gravitasi", "Volume x Massa jenis", "Konstan di mana saja"], answer: 1, feedback: "Benar! W = m.g." }
    ],
    'pressure': [
        { q: "Tekanan hidrostatis bergantung pada kedalaman dan...", options: ["Luas wadah", "Warna air", "Massa jenis fluida", "Bentuk wadah"], answer: 2, feedback: "Benar! P = ρgh." },
        { q: "Semakin dalam menyelam, tekanan yang dirasakan...", options: ["Semakin kecil", "Semakin besar", "Tetap", "Hilang"], answer: 1, feedback: "Tepat! Tekanan bertambah linear." },
        { q: "Hukum Archimedes menjelaskan tentang...", options: ["Tekanan udara", "Gaya apung", "Tegangan permukaan", "Viskositas"], answer: 1, feedback: "Benar! Gaya apung = berat zat cair dipindah." },
        { q: "Satuan tekanan dalam SI adalah...", options: ["Newton", "Pascal (Pa)", "Joule", "Watt"], answer: 1, feedback: "Tepat! Pascal (N/m²)." },
        { q: "Benda melayang di air jika massa jenisnya...", options: ["Lebih besar dari air", "Lebih kecil dari air", "Sama dengan air", "Nol"], answer: 2, feedback: "Benar! Massa jenis benda = fluida." },
        { q: "Hukum Pascal menyatakan tekanan diteruskan ke...", options: ["Bawah saja", "Atas saja", "Segala arah sama besar", "Dinding wadah"], answer: 2, feedback: "Tepat! Segala arah sama besar (ruang tertutup)." },
        { q: "Apa yang terjadi pada tekanan jika luas penampang ditekan diperkecil (gaya tetap)?", options: ["Mengecil", "Membesar", "Tetap", "Nol"], answer: 1, feedback: "Benar! P = F/A. A kecil, P besar." },
        { q: "Alat hidrolik bekerja berdasarkan hukum...", options: ["Boyle", "Bernoulli", "Pascal", "Archimedes"], answer: 2, feedback: "Tepat! Hukum Pascal." },
        { q: "Tekanan atmosfer di permukaan laut kira-kira...", options: ["0 atm", "1 atm", "10 atm", "100 Pa"], answer: 1, feedback: "Benar! 1 atmosfer." },
        { q: "Mengapa bendungan dibuat makin tebal di bagian bawah?", options: ["Agar indah", "Menahan tekanan air yang besar", "Hemat bahan", "Menahan ombak"], answer: 1, feedback: "Betul! Tekanan terbesar ada di dasar." }
    ],
    'pulley': [
        { q: "Keuntungan mekanis (KM) katrol tetap adalah...", options: ["1", "2", "3", "4"], answer: 0, feedback: "Benar! KM = 1, hanya mengubah arah gaya." },
        { q: "Katrol majemuk (sistem takal) berfungsi untuk...", options: ["Memperbesar beban", "Memperkecil gaya kuasa", "Menambah gaya gesek", "Memperpanjang tali"], answer: 1, feedback: "Tepat! Gaya tarik jadi lebih ringan." },
        { q: "Jika menggunakan 4 katrol (tali penopang), gaya tarik menjadi...", options: ["1/4 beban", "1/2 beban", "4x beban", "Sama dengan beban"], answer: 0, feedback: "Benar! F = W/4." },
        { q: "Katrol bergerak memiliki keuntungan mekanis...", options: ["1", "2", "Setengah", "Nol"], answer: 1, feedback: "Tepat! KM = 2 (tali menopang beban)." },
        { q: "Usaha (Force x Jarak) pada katrol ideal adalah...", options: ["Diperkecil", "Diperbesar", "Tetap sama", "Hilang"], answer: 2, feedback: "Benar! Energi kekal. Gaya kecil tapi tarikan panjang." },
        { q: "Alat yang menggunakan prinsip katrol adalah...", options: ["Gunting", "Eskalator", "Crane/Derek", "Pisau"], answer: 2, feedback: "Tepat! Crane pakai sistem katrol." },
        { q: "Titik tumpu pada katrol tetap berada di...", options: ["Tepi katrol", "Pusat poros katrol", "Tali", "Beban"], answer: 1, feedback: "Benar! Poros pusat." },
        { q: "Gaya yang kita keluarkan untuk menarik beban disebut...", options: ["Gaya Beban", "Gaya Kuasa", "Gaya Gesek", "Gaya Normal"], answer: 1, feedback: "Ya! Gaya Kuasa." },
        { q: "Satuan gaya adalah...", options: ["Joule", "Newton", "Watt", "Kilogram"], answer: 1, feedback: "Tepat! Newton." },
        { q: "Semakin banyak tali penopang pada katrol, maka...", options: ["Gaya tarik makin berat", "Gaya tarik makin ringan", "Tali makin pendek", "Tidak ada efek"], answer: 1, feedback: "Benar! Semakin ringan." }
    ],
    'quantum': [
        { q: "Eksperimen celah ganda membuktikan sifat...", options: ["Partikel cahaya", "Gelombang cahaya", "Pantulan cahaya", "Pembiasan"], answer: 1, feedback: "Benar! Sifat gelombang (Interferensi)." },
        { q: "Pola terang-gelap disebut pola...", options: ["Difraksi", "Interferensi", "Refleksi", "Polarisasi"], answer: 1, feedback: "Tepat! Interferensi konstruktif & destruktif." },
        { q: "Siapa ilmuwan yang melakukan percobaan celah ganda?", options: ["Einstein", "Newton", "Thomas Young", "Bohr"], answer: 2, feedback: "Benar! Thomas Young (1801)." },
        { q: "Cahaya memiliki sifat dualisme, yaitu...", options: ["Padat & Cair", "Gelombang & Partikel", "Panas & Dingin", "Merah & Biru"], answer: 1, feedback: "Tepat! Wave-Particle Duality." },
        { q: "Jika jarak celah dipersempit, jarak antar pola terang akan...", options: ["Melebar (Jauh)", "Menyempit (Dekat)", "Tetap", "Hilang"], answer: 0, feedback: "Benar! Δy berbanding terbalik dengan d." },
        { q: "Interferensi maksimum (Terang) terjadi saat beda lintasan...", options: ["0, 1λ, 2λ", "0.5λ, 1.5λ", "Sembarang", "Tidak ada"], answer: 0, feedback: "Tepat! Kelipatan bulat panjang gelombang." },
        { q: "Interferensi minimum (Gelap) terjadi saat gelombang saling...", options: ["Menguatkan", "Meniadakan", "Sejajar", "Tegak lurus"], answer: 1, feedback: "Benar! Destruktif (saling hapus)." },
        { q: "Warna cahaya dengan panjang gelombang terbesar adalah...", options: ["Ungu", "Biru", "Merah", "Hijau"], answer: 2, feedback: "Tepat! Merah (~700nm)." },
        { q: "Partikel cahaya disebut...", options: ["Elektron", "Proton", "Foton", "Neutron"], answer: 2, feedback: "Benar! Foton." },
        { q: "Prinsip ketidakpastian dikemukakan oleh...", options: ["Heisenberg", "Schrodinger", "Planck", "Einstein"], answer: 0, feedback: "Tepat! Werner Heisenberg." }
    ],
    'mixing': [
        { q: "Gerak acak partikel zat cair/gas disebut...", options: ["Gerak Lurus", "Gerak Brown", "Gerak Melingkar", "Osilasi"], answer: 1, feedback: "Benar! Gerak Brown." },
        { q: "Difusi adalah pergerakan partikel dari konsentrasi...", options: ["Rendah ke Tinggi", "Tinggi ke Rendah", "Tetap", "Bawah ke Atas"], answer: 1, feedback: "Tepat! High to Low." },
        { q: "Kenaikan suhu menyebabkan energi kinetik partikel...", options: ["Turun", "Tetap", "Naik", "Hilang"], answer: 2, feedback: "Benar! Suhu = Derajat energi kinetik rata-rata." },
        { q: "Zat mana yang berdifusi paling cepat?", options: ["Gas", "Cair", "Padat", "Sama saja"], answer: 0, feedback: "Tepat! Gas partikelnya paling bebas." },
        { q: "Contoh peristiwa difusi dalam kehidupan sehari-hari...", options: ["Batu jatuh", "Mencium bau parfum", "Air mengalir", "Lilin meleleh"], answer: 1, feedback: "Benar! Bau parfum menyebar." },
        { q: "Faktor yang BUKAN mempercepat pelarutan gula adalah...", options: ["Air panas", "Pengadukan", "Gula halus", "Dinginkan air"], answer: 3, feedback: "Tepat! Dingin memperlambat." },
        { q: "Dalam simulasi, partikel bertumbukan bersifat...", options: ["Lenting sempurna", "Tidak lenting", "Menempel", "Meledak"], answer: 0, feedback: "Idealnya lenting sempurna." },
        { q: "Pencampuran dua zat tanpa adukan disebut...", options: ["Osmosis", "Difusi", "Filtrasi", "Destilasi"], answer: 1, feedback: "Benar! Difusi pasif." },
        { q: "Warna air berubah merata saat diteteskan pewarna karena...", options: ["Partikel diam", "Partikel menyebar", "Gravitasi", "Reaksi kimia"], answer: 1, feedback: "Tepat! Menyebar (Difusi)." },
        { q: "Jika massa partikel besar, kecepatan geraknya rata-rata...", options: ["Lebih cepat", "Lebih lambat", "Sama", "Nol"], answer: 1, feedback: "Benar! Partikel berat lebih lamban." }
    ],
    'reaction': [
        { q: "Energi minimum untuk memulai reaksi disebut...", options: ["Energi Potensial", "Energi Aktivasi", "Entalpi", "Kalor"], answer: 1, feedback: "Benar! Energi Aktivasi (Ea)." },
        { q: "Teori tumbukan menyatakan reaksi terjadi jika...", options: ["Partikel diam", "Tumbukan memiliki energi cukup & orientasi tepat", "Partikel banyak", "Suhu rendah"], answer: 1, feedback: "Tepat! Tumbukan efektif." },
        { q: "Faktor yang mempercepat laju reaksi, KECUALI...", options: ["Suhu tinggi", "Katalis", "Konsentrasi tinggi", "Volume wadah besar (Gas)"], answer: 3, feedback: "Benar! Volume besar menurunkan tekanan/konsentrasi gas." },
        { q: "Fungsi katalis adalah...", options: ["Menambah produk", "Menurunkan energi aktivasi", "Menaikkan suhu", "Menambah reaktan"], answer: 1, feedback: "Tepat! Jalan pintas energi rendah." },
        { q: "Semakin luas permukaan bidang sentuh (serbuk), reaksi makin...", options: ["Cepat", "Lambat", "Tetap", "Berhenti"], answer: 0, feedback: "Benar! Lebih banyak area tumbukan." },
        { q: "Kenaikan suhu 10°C biasanya membuat laju reaksi...", options: ["2x lebih cepat", "2x lebih lambat", "Tetap", "3x lebih lambat"], answer: 0, feedback: "Aturan praktis (Van't Hoff)." },
        { q: "Konsentrasi tinggi berarti...", options: ["Jarak partikel jauh", "Partikel berdesakan/banyak", "Partikel sedikit", "Suhu dingin"], answer: 1, feedback: "Benar! Tumbukan makin sering." },
        { q: "Orde reaksi menentukan...", options: ["Warna reaksi", "Pengaruh konsentrasi terhadap laju", "Suhu reaksi", "Jenis katalis"], answer: 1, feedback: "Tepat! Pangkat konsentrasi." },
        { q: "Reaksi eksoterm artinya...", options: ["Menyerap panas", "Melepas panas", "Suhu turun", "Tidak ada energi"], answer: 1, feedback: "Benar! Melepas kalor ke lingkungan." },
        { q: "Sumbangan utama suhu tinggi adalah...", options: ["Partikel membesar", "Partikel bergerak lebih cepat (Ek naik)", "Wadah memuai", "Katalis aktif"], answer: 1, feedback: "Ya! Energi kinetik naik." }
    ],
    'amylase': [
        { q: "Enzim adalah...", options: ["Karbohidrat", "Protein biokatalis", "Lemak", "Mineral"], answer: 1, feedback: "Benar! Protein pencepat reaksi." },
        { q: "Substrat untuk enzim amilase adalah...", options: ["Protein", "Amilum (Pati)", "Lemak", "Gula"], answer: 1, feedback: "Tepat! Amilum menjadi maltosa/glukosa." },
        { q: "Suhu optimal enzim tubuh manusia kira-kira...", options: ["0°C", "25°C", "37°C", "100°C"], answer: 2, feedback: "Benar! Suhu tubuh ~37°C." },
        { q: "Jika suhu terlalu panas, enzim mengalami...", options: ["Reproduksi", "Denaturasi", "Hibernasi", "Relaksasi"], answer: 1, feedback: "Tepat! Rusak strukturnya." },
        { q: "Sisi aktif enzim bersifat...", options: ["Fleksibel", "Spesifik (Kunci & Gembok)", "Acak", "Universal"], answer: 1, feedback: "Benar! Lock and Key." },
        { q: "pH optimal untuk enzim pepsin di lambung adalah...", options: ["Basa (pH 8)", "Netral (pH 7)", "Asam (pH 2)", "Sangat Basa"], answer: 2, feedback: "Tepat! Asam lambung." },
        { q: "Inhibitor adalah zat yang...", options: ["Mempercepat reaksi", "Menghambat kerja enzim", "Menjadi produk", "Memperbesar enzim"], answer: 1, feedback: "Benar! Penghambat." },
        { q: "Apakah enzim ikut bereaksi dan habis?", options: ["Ya", "Tidak, enzim kembali utuh", "Kadang-kadang", "Berubah jadi produk"], answer: 1, feedback: "Tepat! Enzim tidak habis dipakai." },
        { q: "Enzim bekerja dengan cara...", options: ["Menaikkan suhu tubuh", "Menurunkan energi aktivasi", "Menambah substrat", "Mengubah pH"], answer: 1, feedback: "Benar! Menurunkan Ea." },
        { q: "Denaturasi enzim bersifat...", options: ["Sementara", "Irreversibel (Permanen)", "Bisa balik", "Menguntungkan"], answer: 1, feedback: "Umumnya permanen/rusak total." }
    ],
    'purification': [
        { q: "Fungsi arang (karbon aktif) adalah...", options: ["Menyaring lumpur", "Mengadsorpsi bau & racun", "Mematikan kuman", "Memberi rasa"], answer: 1, feedback: "Benar! Adsorpsi kimia." },
        { q: "Lapisan paling atas pada penyaringan biasanya...", options: ["Pasir halus", "Kerikil besar/Ijuk", "Arang", "Kapas"], answer: 1, feedback: "Tepat! Menyaring kotoran besar dulu." },
        { q: "Proses pemisahan berdasarkan ukuran partikel disebut...", options: ["Distilasi", "Filtrasi", "Kromatografi", "Sublimasi"], answer: 1, feedback: "Benar! Penyaringan." },
        { q: "Tawas (Alum) berfungsi untuk...", options: ["Membunuh kuman", "Menggumpalkan kotoran (Koagulasi)", "Menyaring", "Memanaskan"], answer: 1, feedback: "Tepat! Flokulasi/Koagulasi." },
        { q: "Klorin/Kaporit ditambahkan untuk...", options: ["Menjernihkan warna", "Desinfektan (bunuh kuman)", "Menghilangkan bau", "Mengendapkan lumpur"], answer: 1, feedback: "Benar! Membunuh bakteri." },
        { q: "Air murni memiliki pH...", options: ["3", "7", "10", "14"], answer: 1, feedback: "Tepat! pH 7 (Netral)." },
        { q: "Metode pemisahan garam dari air laut adalah...", options: ["Filtrasi", "Evaporasi", "Dekantasi", "Kromatografi"], answer: 1, feedback: "Benar! Penguapan." },
        { q: "Fungsi pasir kuarsa/zeolit adalah...", options: ["Menyaring partikel mikro", "Pemanis", "Pewarna", "Pendingin"], answer: 0, feedback: "Tepat! Filter halus." },
        { q: "Aerasi (penambahan oksigen) bertujuan untuk...", options: ["Menambah rasa", "Mengoksidasi besi/mangan & usir gas bau", "Mendinginkan", "Memanaskan"], answer: 1, feedback: "Benar! Oksidasi logam & gas." },
        { q: "Siklus air alami yang memurnikan air adalah...", options: ["Hujan & Evaporasi", "Banjir", "Erosi", "Gempa"], answer: 0, feedback: "Tepat! Siklus hidrologi." }
    ],
    'redox': [
        { q: "Oksidasi adalah peristiwa...", options: ["Penerimaan elektron", "Pelepasan elektron", "Penurunan Biloks", "Pengikatan Hidrogen"], answer: 1, feedback: "Benar! Lepas elektron/Naik biloks." },
        { q: "Reduksi adalah peristiwa...", options: ["Pelepasan Oksigen", "Pelepasan elektron", "Kenaikan Biloks", "Pechah molekul"], answer: 0, feedback: "Benar! Lepas O / Terima e-." },
        { q: "Pada sel Volta, Anoda bermuatan...", options: ["Positif", "Negatif", "Netral", "Ganda"], answer: 1, feedback: "Tepat! Anoda negatif (sumber elektron)." },
        { q: "Pada sel Volta, Katoda bermuatan...", options: ["Positif", "Negatif", "Netral", "Ganda"], answer: 0, feedback: "Benar! Katoda positif." },
        { q: "Jembatan garam berfungsi untuk...", options: ["Menambah listrik", "Menetralkan muatan larutan", "Kawat penghubung", "Hiasan"], answer: 1, feedback: "Tepat! Menjaga netralitas ion." },
        { q: "Aliran elektron bergerak dari...", options: ["Anoda ke Katoda", "Katoda ke Anoda", "Larutan ke Jembatan", "Atas ke Bawah"], answer: 0, feedback: "Benar! Dari oksidasi ke reduksi." },
        { q: "Contoh sel Volta dalam kehidupan adalah...", options: ["Penyepuhan emas", "Baterai", "Fotosintesis", "Pembakaran"], answer: 1, feedback: "Tepat! Baterai/Aki." },
        { q: "Logam yang mengalami korosi (karat) mengalami reaksi...", options: ["Reduksi", "Oksidasi", "Sublimasi", "Hidrolisis"], answer: 1, feedback: "Benar! Oksidasi oleh O2." },
        { q: "Potensial sel standar (E°) harus bernilai ... agar spontan.", options: ["Positif", "Negatif", "Nol", "Tak terhingga"], answer: 0, feedback: "Benar! E° > 0 = Spontan." },
        { q: "Bilangan oksidasi Oksigen umumnya adalah...", options: ["+1", "0", "-2", "+2"], answer: 2, feedback: "Tepat! Kecuali peroksida." }
    ],
    'electrolysis': [
        { q: "Elektrolisis mengubah energi ... menjadi ...", options: ["Kimia ke Listrik", "Listrik ke Kimia", "Panas ke Listrik", "Gerak ke Kimia"], answer: 1, feedback: "Benar! Listrik memicu reaksi kimia." },
        { q: "Pada elektrolisis, katoda adalah kutub...", options: ["Positif", "Negatif", "Netral", "Utara"], answer: 1, feedback: "Tepat! (KNAP: Katoda Negatif Anoda Positif)." },
        { q: "Elektrolisis air menghasilkan gas H2 di...", options: ["Anoda", "Katoda", "Larutan", "Kabel"], answer: 1, feedback: "Benar! 2H+ + 2e -> H2 (Reduksi)." },
        { q: "Elektrolisis air menghasilkan gas O2 di...", options: ["Anoda", "Katoda", "Larutan", "Kabel"], answer: 0, feedback: "Tepat! Oksidasi air di anoda." },
        { q: "Volume gas Hidrogen dibanding Oksigen adalah...", options: ["1 : 1", "2 : 1", "1 : 2", "3 : 1"], answer: 1, feedback: "Benar! H2O -> 2H2 + O2." },
        { q: "Aplikasi elektrolisis di industri adalah...", options: ["Baterai mobil", "Electroplating (Sepuh Logam)", "Pembangkit listrik", "Pembuatan Sabun"], answer: 1, feedback: "Tepat! Melapisi logam." },
        { q: "Hukum Faraday I menyatakan massa endapan sebanding dengan...", options: ["Tegangan", "Muatan Listrik (Q)", "Suhu", "Tekanan"], answer: 1, feedback: "Benar! w ~ Q (atau I.t)." },
        { q: "Satu Faraday setara dengan...", options: ["1 mol elektron", "1 Coulomb", "1 Ampere", "1 Volt"], answer: 0, feedback: "Tepat! ~96500 C." },
        { q: "Ion positif (Kation) bergerak menuju...", options: ["Anoda", "Katoda", "Permukaan", "Dasar"], answer: 1, feedback: "Benar! Kation ke Katoda." },
        { q: "Jika tidak ada listrik, reaksi elektrolisis...", options: ["Berjalan lambat", "Tidak terjadi", "Berbalik arah", "Meledak"], answer: 1, feedback: "Betul! Reaksi non-spontan." }
    ],
    'diffusion': [
        { q: "Hukum Graham menyatakan laju difusi bergantung pada...", options: ["Suhu", "Massa molekul relatif (Mr)", "Warna gas", "Volume gas"], answer: 1, feedback: "Benar! Berbanding terbalik akar Mr." },
        { q: "Gas NH3 (Mr=17) vs HCl (Mr=36.5), mana lebih cepat?", options: ["NH3", "HCl", "Sama saja", "Tergantung wadah"], answer: 0, feedback: "Tepat! NH3 lebih ringan." },
        { q: "Pertemuan NH3 dan HCl membentuk cincin putih...", options: ["Di tengah pipa", "Lebih dekat ke NH3", "Lebih dekat ke HCl", "Tidak terbentuk"], answer: 2, feedback: "Benar! Dekat HCl karena HCl lambat." },
        { q: "Zat cincin putih itu adalah...", options: ["NaCl", "NH4Cl (Amonium Klorida)", "H2O", "Cl2"], answer: 1, feedback: "Tepat! NH4Cl padat." },
        { q: "Difusi gas terjadi karena...", options: ["Kipas angin", "Gerak acak partikel", "Gravitasi", "Reaksi kimia"], answer: 1, feedback: "Benar! Gerak termal acak." },
        { q: "Pada suhu tinggi, laju difusi gas...", options: ["Meningkat", "Menurun", "Tetap", "Berhenti"], answer: 0, feedback: "Tepat! Energi kinetik naik." },
        { q: "Gas ideal diasumsikan...", options: ["Partikel diam", "Tumbukan tidak lenting", "Tidak ada gaya tarik antar partikel", "Volume partikel besar"], answer: 2, feedback: "Benar! Asumsi gas ideal." },
        { q: "Manakah yang BUKAN sifat gas?", options: ["Mengisi seluruh ruangan", "Bentuk berubah", "Volume tetap", "Dapat dimampatkan"], answer: 2, feedback: "Tepat! Volume gas berubah sesuai wadah." },
        { q: "Kecepatan efektif gas (vrms) berbanding lurus dengan...", options: ["Akar Suhu (√T)", "Massa (m)", "Tekanan (P)", "Jumlah mol"], answer: 0, feedback: "Benar! v ~ √T." },
        { q: "Difusi vs Efusi, Efusi adalah...", options: ["Lewat lubang kecil", "Lewat pipa besar", "Dalam cairan", "Dalam padatan"], answer: 0, feedback: "Tepat! Keluar lewat celah sempit." }
    ]
};

const FORMULAS = {
    'pendulum': {
        f: "T = 2π√(L/g)",
        d: "T: Periode (s), L: Panjang (m), g: Gravitasi",
        e: "Tujuan: Membuktikan bahwa periode ayunan hanya dipengaruhi oleh panjang tali dan gravitasi, bukan massa beban."
    },
    'projectile': {
        f: "R = (v₀² sin 2θ) / g",
        d: "R: Jarak, v₀: Kec. Awal, θ: Sudut",
        e: "Tujuan: Menentukan sudut elevasi paling efisien (45°) untuk mencapai jarak terjauh dalam gerak parabola."
    },
    'circuits': {
        f: "V = I × R",
        d: "V: Volt, I: Ampere, R: Ohm",
        e: "Tujuan: Memahami Hukum Ohm, di mana arus berbanding lurus dengan tegangan dan berbanding terbalik dengan hambatan."
    },
    'gravity': {
        f: "F = G(mM)/r²",
        d: "F: Gaya, G: Konstanta, r: Jarak",
        e: "Tujuan: Mensimulasikan bagaimana kecepatan orbit mencegah satelit jatuh kembali ke planet (keseimbangan gaya)."
    },
    'pressure': {
        f: "P = ρ × g × h",
        d: "P: Tekanan, h: Kedalaman",
        e: "Tujuan: Menunjukkan bahwa tekanan hidrostatis meningkat seiring bertambahnya kedalaman air."
    },
    'pulley': {
        f: "F = W / n",
        d: "F: Gaya Kuasa, n: Jumlah Tali",
        e: "Tujuan: Mendemonstrasikan keuntungan mekanis katrol majemuk dalam mengangkat beban berat dengan gaya kecil."
    },
    'quantum': {
        f: "Δy = (λL) / d",
        d: "Δy: Pola Terang, d: Celah",
        e: "Tujuan: Membuktikan sifat dualisme gelombang-partikel cahaya melalui pola interferensi (gelap-terang)."
    },
    'mixing': {
        f: "Eₖ ∝ T",
        d: "Energi Kinetik ~ Suhu",
        e: "Tujuan: Mengamati efek suhu terhadap pergerakan partikel (Gerak Brown) dan kecepatan difusi zat cair."
    },
    'reaction': {
        f: "v = k[A][B]",
        d: "v: Laju Reaksi",
        e: "Tujuan: Menunjukkan teori tumbukan, di mana suhu tinggi meningkatkan energi partikel sehingga reaksi lebih cepat terjadi."
    },
    'amylase': {
        f: "Enzim + Substrat",
        d: "Lock and Key",
        e: "Tujuan: Menunjukkan spesifisitas enzim dan bagaimana suhu ekstrem merusak (denaturasi) bentuk aktif enzim."
    },
    'purification': {
        f: "Filtrasi Fisik",
        d: "Adsorpsi Karbon",
        e: "Tujuan: Memahami prinsip pemisahan campuran menggunakan lapisan dengan kerapatan berbeda (pasir, arang, kerikil)."
    },
    'redox': {
        f: "E°sel = E°Red - E°Oks",
        d: "Sel Volta",
        e: "Tujuan: Mengamati perubahan energi kimia menjadi listrik melalui aliran elektron dari anoda (Zn) ke katoda (Cu)."
    },
    'electrolysis': {
        f: "2H₂O → 2H₂ + O₂",
        d: "Penguraian Air",
        e: "Tujuan: Menggunakan listrik untuk memecah molekul air menjadi gas hidrogen dan oksigen (Reaksi non-spontan)."
    },
    'diffusion': {
        f: "v₁/v₂ = √(M₂/M₁)",
        d: "Hukum Graham",
        e: "Tujuan: Membandingkan laju difusi gas ringan vs berat. Gas ringan (NH3) bergerak lebih cepat dari gas berat (HCl)."
    }
};

let currentLabType = '';
let animationFrameId = null;

// --- Hero Animation ---
function initHeroAnimation() {
    const container = document.getElementById('atom-visual');
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400; canvas.height = 400;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    for (let i = 0; i < 20; i++) particles.push({ angle: Math.random() * Math.PI * 2, radius: 50 + Math.random() * 100, speed: 0.02 + Math.random() * 0.03, size: 3 + Math.random() * 3, color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8' });
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 15; ctx.shadowColor = '#4ade80'; ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(200, 200, 15, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        particles.forEach(p => {
            p.angle += p.speed;
            const x = 200 + Math.cos(p.angle) * p.radius;
            const y = 200 + Math.sin(p.angle) * p.radius * 0.5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; ctx.beginPath(); ctx.ellipse(200, 200, p.radius, p.radius * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// --- Lab Management ---
window.openLab = function (type) {
    currentLabType = type;
    const overlay = document.getElementById('simulation-overlay');
    const title = document.getElementById('sim-title');
    const controls = document.getElementById('sim-controls');
    const canvas = document.getElementById('sim-canvas');

    // 1. Show overlay FIRST so dimensions are calc-able
    overlay.classList.remove('hidden');

    // 2. Set Canvas Size (Based on its allocated flex space)
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // 3. Clear Controls
    controls.innerHTML = '';

    // 4. Map & Start
    const simMap = {
        'pendulum': { t: 'Lab Pendulum', f: startPendulumSim },
        'projectile': { t: 'Lab Gerak Parabola', f: startProjectileSim },
        'circuits': { t: 'Lab Rangkaian Listrik', f: startCircuitSim },
        'gravity': { t: 'Lab Gravitasi Planet', f: startGravitySim },
        'pressure': { t: 'Lab Tekanan Hidrostatis', f: startPressureSim },
        'pulley': { t: 'Lab Sistem Katrol', f: startPulleySim },
        'quantum': { t: 'Lab Mekanika Kuantum', f: startQuantumSim },
        'mixing': { t: 'Lab Difusi Zat', f: startMixingSim },
        'reaction': { t: 'Lab Laju Reaksi', f: startReactionSim },
        'amylase': { t: 'Lab Enzim (Amilase)', f: startEnzymeSim },
        'purification': { t: 'Lab Pemurnian Air', f: startPurificationSim },
        'redox': { t: 'Lab Reaksi Redoks', f: startRedoxSim },
        'electrolysis': { t: 'Lab Elektrolisis', f: startElectrolysisSim },
        'diffusion': { t: 'Lab Difusi Gas', f: startGasDiffusionSim }
    };

    if (simMap[type]) {
        title.innerText = simMap[type].t;
        // Stop any previous loop
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // --- INJECT FORMULA CARD ---
        const formula = FORMULAS[type];
        if (formula) {
            const card = document.createElement('div');
            card.style.background = 'rgba(255,255,255,0.05)';
            card.style.padding = '1rem';
            card.style.borderRadius = '10px';
            card.style.marginBottom = '1.5rem';
            card.style.borderLeft = '4px solid var(--accent-green)';

            const mathEl = document.createElement('h3');
            mathEl.innerText = formula.f;
            mathEl.style.color = '#fff';
            mathEl.style.marginBottom = '0.5rem';
            mathEl.style.fontFamily = 'monospace';

            const descEl = document.createElement('p');
            descEl.innerHTML = `<strong>Keterangan:</strong> ${formula.d}<br><br><em style="color:#38bdf8">${formula.e}</em>`;
            descEl.style.color = '#94a3b8';
            descEl.style.fontSize = '0.9rem';
            descEl.style.lineHeight = '1.4';

            card.appendChild(mathEl);
            card.appendChild(descEl);
            controls.appendChild(card);
        }

        simMap[type].f(canvas, controls);
    }
}

window.closeLab = function () {
    document.getElementById('simulation-overlay').classList.add('hidden');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// --- Quiz System ---
window.startQuiz = function () {
    const modal = document.getElementById('quiz-modal');
    const qEl = document.getElementById('quiz-question');
    const optsEl = document.getElementById('quiz-options');
    const fbEl = document.getElementById('quiz-feedback');
    const dataList = QUESTIONS[currentLabType];

    if (!dataList || dataList.length === 0) return alert("Kuis belum tersedia.");

    // Pick random question
    const data = dataList[Math.floor(Math.random() * dataList.length)];

    qEl.innerText = data.q;
    optsEl.innerHTML = '';
    fbEl.innerText = '';

    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = opt;
        btn.onclick = () => {
            if (idx === data.answer) {
                btn.classList.add('correct');
                fbEl.innerText = data.feedback;
                fbEl.style.color = '#4ade80';
            } else {
                btn.classList.add('wrong');
                fbEl.innerText = "Jawaban salah, coba lagi.";
                fbEl.style.color = '#ef4444';
            }
        };
        optsEl.appendChild(btn);
    });

    // Add Next Question Button
    const nextBtn = document.createElement('button');
    nextBtn.innerText = "Soal Selanjutnya ➜";
    nextBtn.className = "btn-lab";
    nextBtn.style.marginTop = "1rem";
    nextBtn.style.width = "100%";
    nextBtn.onclick = startQuiz; // Simply re-roll
    optsEl.appendChild(nextBtn);

    modal.classList.remove('hidden');
}

window.closeQuiz = function () { document.getElementById('quiz-modal').classList.add('hidden'); }

// ================= SIMULATIONS =================

// Utility: Robust Slider Creator
function createSlider(parent, label, min, max, value, callback) {
    const wrapper = document.createElement('div');
    wrapper.className = 'control-group';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';

    const labelEl = document.createElement('label'); labelEl.innerText = label;
    const valEl = document.createElement('span'); valEl.innerText = value; valEl.style.color = 'var(--accent-blue)';

    header.appendChild(labelEl);
    header.appendChild(valEl);

    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.step = (max - min) / 100;
    if (input.step === 0) input.step = 1; // Prevent div by zero issue
    input.value = value;

    input.oninput = (e) => {
        e.stopPropagation(); // Stop bubbling
        const val = e.target.value;
        valEl.innerText = val;
        callback(val);
    };

    wrapper.appendChild(header);
    wrapper.appendChild(input);
    parent.appendChild(wrapper);
}

function addResetBtn(parent, callback) {
    const btn = document.createElement('button');
    btn.innerText = "Mulai Ulang / Reset";
    btn.className = "btn primary";
    btn.style.marginTop = "15px";
    btn.style.width = "100%";
    btn.onclick = callback;
    parent.appendChild(btn);
}

// 1. Pendulum
function startPendulumSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let state = { angle: Math.PI / 4, angleV: 0, length: 200, gravity: 0.5, mass: 20 };
    createSlider(controls, 'Panjang Tali', 50, 400, state.length, val => state.length = parseInt(val));
    createSlider(controls, 'Gravitasi', 0.1, 2.0, state.gravity, val => state.gravity = parseFloat(val));
    addResetBtn(controls, () => { state.angle = Math.PI / 4; state.angleV = 0; });

    function loop() {
        let force = -1 * state.gravity * Math.sin(state.angle) / (state.length / 1500);
        state.angleV += force; state.angleV *= 0.995; state.angle += state.angleV;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const originX = canvas.width / 2, originY = 50;

        // DECORATION: Ceiling
        ctx.fillStyle = '#475569'; ctx.fillRect(originX - 100, 0, 200, 50);

        const bobX = originX + Math.sin(state.angle) * state.length;
        const bobY = originY + Math.cos(state.angle) * state.length;

        // String
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(bobX, bobY); ctx.stroke();

        // Bob
        ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(bobX, bobY, state.mass, 0, Math.PI * 2); ctx.fill();

        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 2. Projectile
function startProjectileSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let state = { angle: 45, v0: 15, gravity: 0.5, balls: [] };
    createSlider(controls, 'Sudut (°)', 0, 90, state.angle, val => state.angle = parseInt(val));
    createSlider(controls, 'Kec. Awal', 5, 25, state.v0, val => state.v0 = parseInt(val));

    const fireBtn = document.createElement('button');
    fireBtn.innerText = "TEMBAK!";
    fireBtn.className = "btn primary";
    fireBtn.style.marginTop = "10px";
    fireBtn.onclick = () => {
        const rad = state.angle * Math.PI / 180;
        state.balls.push({ x: 50, y: canvas.height - 50, vx: Math.cos(rad) * state.v0, vy: -Math.sin(rad) * state.v0, life: 300 });
    };
    controls.appendChild(fireBtn);
    addResetBtn(controls, () => state.balls = []);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DECORATION: Grid & Ground
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
        for (let i = 0; i < canvas.height; i += 50) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
        ctx.stroke();

        // TRAJECTORY PREDICTION (Dashed Line)
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
        ctx.lineWidth = 2;

        let simX = 50, simY = canvas.height - 50;
        const rad = state.angle * Math.PI / 180;
        let simVx = Math.cos(rad) * state.v0;
        let simVy = -Math.sin(rad) * state.v0;

        ctx.moveTo(simX, simY);
        for (let i = 0; i < 300; i++) {
            simX += simVx;
            simY += simVy;
            simVy += state.gravity;
            ctx.lineTo(simX, simY);
            if (simY > canvas.height - 20) break;
        }
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#22c55e'; ctx.fillRect(0, canvas.height - 20, canvas.width, 20); // Grass

        // Cannon
        ctx.save(); ctx.translate(50, canvas.height - 50); ctx.rotate(-state.angle * Math.PI / 180);
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, -10, 60, 20); ctx.restore();

        state.balls.forEach(b => {
            b.x += b.vx; b.y += b.vy; b.vy += state.gravity;
            if (b.y > canvas.height - 20) { b.y = canvas.height - 20; b.vy *= -0.6; b.vx *= 0.8; }
            ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(b.x, b.y, 8, 0, Math.PI * 2); ctx.fill(); b.life--;
        });
        state.balls = state.balls.filter(b => b.life > 0);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 3. Circuits
function startCircuitSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let state = { voltage: 9, resistance: 10 };
    createSlider(controls, 'Tegangan (V)', 1, 24, state.voltage, val => state.voltage = parseInt(val));
    createSlider(controls, 'Hambatan (Ω)', 1, 100, state.resistance, val => state.resistance = parseInt(val));

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const current = state.voltage / state.resistance;
        const brightness = Math.min(current * 50, 255);

        // Draw Circuit
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);

        // Battery Symbol
        ctx.fillStyle = '#0f172a'; ctx.fillRect(70, canvas.height / 2 - 30, 60, 60); // Mask wire
        ctx.fillStyle = '#ef4444'; ctx.fillRect(80, canvas.height / 2 - 20, 10, 40); // +
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(100, canvas.height / 2 - 10, 10, 20); // -

        ctx.fillStyle = '#fff'; ctx.font = "20px Arial"; ctx.fillText(`${state.voltage}V`, 50, canvas.height / 2 + 5);
        const bulbX = canvas.width - 100, bulbY = canvas.height / 2;
        ctx.shadowColor = 'yellow'; ctx.shadowBlur = brightness; ctx.fillStyle = `rgba(255, 255, 0, ${Math.min(current, 1)})`;
        ctx.beginPath(); ctx.arc(bulbX, bulbY, 20, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff'; ctx.fillText(`I = ${current.toFixed(2)}A`, canvas.width / 2 - 40, canvas.height / 2);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 4. Gravity (Orbits)
function startGravitySim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let sat = { x: canvas.width / 2, y: 150, vx: 3, vy: 0 };
    let mass = 50;

    // Improved UX: Slider updates CURRENT velocity too if it makes sense
    createSlider(controls, 'Kecepatan', 1, 6, sat.vx, val => {
        sat.vx = parseFloat(val); // Instant feedback
    });

    addResetBtn(controls, () => {
        sat.x = canvas.width / 2; sat.y = 150; sat.vx = 3; sat.vy = 0;
    });

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // DECORATION: Stars
        if (Math.random() < 0.1) ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);

        const cx = canvas.width / 2, cy = canvas.height / 2;
        // Planet
        ctx.fillStyle = '#38bdf8'; ctx.shadowBlur = 20; ctx.shadowColor = '#38bdf8';
        ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        // Gravity Logic
        const dx = cx - sat.x, dy = cy - sat.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 20) {
            const force = mass * 100 / (dist * dist);
            const ax = force * dx / dist, ay = force * dy / dist;
            sat.vx += ax; sat.vy += ay; sat.x += sat.vx; sat.y += sat.vy;
        }
        // Sat
        ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(sat.x, sat.y, 8, 0, Math.PI * 2); ctx.fill();
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 5. Hydrostatic
function startPressureSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let depth = 50;
    createSlider(controls, 'Kedalaman', 0, 300, depth, val => depth = parseInt(val));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DECORATION: Ruler ticks
        ctx.fillStyle = '#fff';
        for (let i = 0; i <= 300; i += 50) {
            ctx.fillRect(90, 100 + i, 10, 1);
            ctx.fillText(i + "m", 60, 105 + i);
        }

        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)'; ctx.fillRect(100, 100, canvas.width - 200, 300);
        const objY = 100 + depth;
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(canvas.width / 2, objY, 15, 0, Math.PI * 2); ctx.fill();
        const pressure = Math.round(depth * 10);
        ctx.fillStyle = '#fff'; ctx.font = "20px Arial"; ctx.fillText(`Tekanan: ${pressure} Pa`, canvas.width / 2 + 50, objY);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 6. Pulley
function startPulleySim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let pulleys = 1; let lift = 0;
    createSlider(controls, 'Jumlah Katrol', 1, 4, pulleys, val => pulleys = parseInt(val));
    createSlider(controls, 'Tarik Tali', 0, 200, lift, val => lift = parseInt(val));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DECORATION: Ceiling Support
        ctx.fillStyle = '#475569'; ctx.fillRect(canvas.width / 2 - 50, 0, 100, 10);
        ctx.beginPath(); ctx.moveTo(canvas.width / 2, 10); ctx.lineTo(canvas.width / 2, 50); ctx.stroke();

        const loadY = 300 - (lift / pulleys);
        const force = 100 / pulleys;
        ctx.fillStyle = '#fff'; ctx.fillText(`Gaya Tarik: ${force.toFixed(0)} N`, 20, 50);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(canvas.width / 2 - 25, loadY, 50, 50);
        ctx.fillStyle = '#fff'; ctx.fillText("100N", canvas.width / 2 - 15, loadY + 30);
        ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(canvas.width / 2, 50); ctx.lineTo(canvas.width / 2, loadY); ctx.stroke();
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 7. Quantum
function startQuantumSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let t = 0; let slitGap = 20;
    createSlider(controls, 'Jarak Celah', 10, 60, slitGap, val => slitGap = parseInt(val));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        ctx.fillStyle = '#fff'; ctx.fillRect(cx - 50 - slitGap, 200, 50, 10); ctx.fillRect(cx + slitGap, 200, 50, 10);
        t += 0.2;
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)';
        for (let i = 0; i < 10; i++) {
            let r = (t + i * 20) % 200;
            ctx.beginPath(); ctx.arc(cx - slitGap, 200, r, 0, Math.PI, false); ctx.stroke();
            ctx.beginPath(); ctx.arc(cx + slitGap, 200, r, 0, Math.PI, false); ctx.stroke();
        }
        const gradient = ctx.createLinearGradient(100, 350, canvas.width - 100, 350);
        for (let i = 0; i < 20; i++) gradient.addColorStop(i / 20, i % 2 === 0 ? 'rgba(129,140,248,0.8)' : 'rgba(0,0,0,0.1)');
        ctx.fillStyle = gradient; ctx.fillRect(100, 350, canvas.width - 200, 20);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 8. Mixing
function startMixingSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let particles = []; let pCount = 20;
    createSlider(controls, 'Jumlah Partikel', 5, 50, pCount, val => pCount = parseInt(val));
    const btn = document.createElement('button'); btn.className = "btn primary"; btn.innerText = "+ Tuang";
    btn.onclick = () => {
        for (let i = 0; i < pCount; i++) particles.push({ x: Math.random() * canvas.width, y: 0, vx: (Math.random() - 0.5) * 2, vy: Math.random() * 2 + 1 });
    };
    controls.appendChild(btn);
    addResetBtn(controls, () => particles = []);
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#10b981';
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) p.vx *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
        });
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 9. Reaction
function startReactionSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let temp = 20, particles = [];
    createSlider(controls, 'Suhu Reaksi', 0, 100, temp, val => temp = parseInt(val));
    addResetBtn(controls, init);
    function init() {
        particles = [];
        for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, c: '#ef4444' });
        for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, c: '#3b82f6' });
    }
    init();
    function loop() {
        const speed = (temp + 10) / 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += (Math.random() - 0.5) * speed; p.y += (Math.random() - 0.5) * speed;
            ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
        });
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 10. Enzyme
function startEnzymeSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let temp = 37, enzymes = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 100 }, { x: 150, y: 300 }, { x: 250, y: 150 }];
    createSlider(controls, 'Suhu Tubuh (°C)', 0, 80, temp, val => temp = parseInt(val));

    // Add Characteristics Legend
    const info = document.createElement('div');
    info.style.marginTop = "10px";
    info.style.fontSize = "0.85rem";
    info.style.color = "#cbd5e1";
    controls.appendChild(info);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let status = "";
        let color = "";
        let vibration = 0;

        if (temp < 10) {
            status = "TIDAK AKTIF (Beku)";
            color = "#94a3b8"; // Grey
            vibration = 0.5; // Slow
            info.innerHTML = "<strong>Ciri-ciri:</strong><br>• Enzim kaku<br>• Energi kinetik rendah<br>• Tidak bisa mengikat substrat";
        } else if (temp >= 10 && temp <= 45) {
            status = "ENZIM AKTIF (Optimal)";
            color = "#f472b6"; // Pink active
            vibration = 2; // Active shaking
            info.innerHTML = "<strong style='color:#f472b6'>Ciri-ciri Enzim Aktif:</strong><br>• Bentuk Lock & Key sempurna<br>• Partikel bergerak dinamis<br>• Tumbukan dengan substrat efektif";
        } else {
            status = "RUSAK (Denaturasi)";
            color = "#475569"; // Dark grey/burned
            vibration = 0; // Dead
            info.innerHTML = "<strong>Ciri-ciri:</strong><br>• Ikatan kimia putus<br>• Bentuk situs aktif berubah<br>• Tidak bisa kembali (Irreversibel)";
        }

        ctx.fillStyle = color;
        enzymes.forEach(e => {
            // Visual vibration based on state
            const dx = (Math.random() - 0.5) * vibration;
            const dy = (Math.random() - 0.5) * vibration;

            ctx.beginPath();

            if (temp > 45) { // Denatured shape (shriveled)
                ctx.moveTo(e.x + dx, e.y + dy);
                ctx.lineTo(e.x + 20, e.y + 10);
                ctx.lineTo(e.x, e.y + 20);
                ctx.fill();
            } else { // Active shape (Pacman-ish)
                ctx.arc(e.x + dx, e.y + dy, 20, 0.2 * Math.PI, 1.8 * Math.PI);
                ctx.lineTo(e.x + dx, e.y + dy); // Center
                ctx.fill();
            }
        });

        ctx.fillStyle = '#fff';
        ctx.font = "bold 16px Arial";
        ctx.fillText(`Kondisi: ${status}`, 10, 30);
        ctx.font = "14px Arial";
        ctx.fillText(`Suhu: ${temp}°C`, 10, 50);

        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 11. Purification
function startPurificationSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let dirt = []; let dirtIntensity = 20;
    createSlider(controls, 'Kekeruhan', 10, 100, dirtIntensity, val => dirtIntensity = parseInt(val));
    const btn = document.createElement('button'); btn.className = "btn primary"; btn.innerText = "+ Air Kotor";
    btn.onclick = () => { for (let i = 0; i < dirtIntensity; i++) dirt.push({ y: 0, x: 100 + Math.random() * 200, r: Math.random() * 10 }); };
    controls.appendChild(btn);
    addResetBtn(controls, () => dirt = []);
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#78716c'; ctx.fillRect(100, 100, 200, 50);
        ctx.fillStyle = '#1c1917'; ctx.fillRect(100, 150, 200, 50);
        ctx.fillStyle = '#fde047'; ctx.fillRect(100, 200, 200, 50);
        ctx.fillStyle = '#57534e';
        dirt.forEach(d => {
            d.y += 1;
            if (d.y > 100 && d.r > 8) d.y = 100; else if (d.y > 150 && d.r > 5) d.y = 150; else if (d.y > 200 && d.r > 2) d.y = 200; else if (d.y > 300) d.y = 300;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        });
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 12. Redox
function startRedoxSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let eFlow = 0; let voltage = 1.10;
    createSlider(controls, 'Potensial (V)', 0.1, 5, voltage, val => voltage = parseFloat(val));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(50, 150, 100, 150); ctx.strokeRect(250, 150, 100, 150);
        ctx.fillStyle = '#9ca3af'; ctx.fillRect(80, 100, 40, 150); ctx.fillStyle = '#b45309'; ctx.fillRect(280, 100, 40, 150);
        ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(100, 50); ctx.lineTo(300, 50); ctx.lineTo(300, 100); ctx.stroke();
        eFlow += voltage * 2; if (eFlow > 200) eFlow = 0;
        ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(100 + eFlow, 50, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(`V = ${voltage} Volt`, 170, 40);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 13. Electrolysis
function startElectrolysisSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let bubbles = []; let power = 12;
    createSlider(controls, 'Tegangan', 0, 24, power, val => power = parseInt(val));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)'; ctx.fillRect(100, 100, 200, 200);
        ctx.fillStyle = '#555'; ctx.fillRect(130, 80, 20, 150); ctx.fillRect(250, 80, 20, 150);
        const rate = power / 100;
        if (Math.random() < rate) { bubbles.push({ x: 140, y: 220 }); bubbles.push({ x: 260, y: 220 }); }
        bubbles.forEach(b => { b.y -= (1 + power / 10); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x + (Math.random() - 0.5) * 5, b.y, 3, 0, Math.PI * 2); ctx.fill(); });
        bubbles = bubbles.filter(b => b.y > 100);
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// 14. Diffusion
function startGasDiffusionSim(canvas, controls) {
    const ctx = canvas.getContext('2d');
    let temp = 50; let p1 = { x: 50 }, p2 = { x: 350 };
    createSlider(controls, 'Suhu', 0, 100, temp, val => temp = parseInt(val));
    function reset() { p1 = { x: 50 }; p2 = { x: 350 }; }
    reset();
    addResetBtn(controls, reset);
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#fff'; ctx.strokeRect(50, 150, 300, 50);
        const speedFactor = (temp + 20) / 40;
        if (p1.x < p2.x) { p1.x += 2 * speedFactor; p2.x -= 1 * speedFactor; }
        else { ctx.fillStyle = '#fff'; ctx.fillText("Bertemu!", 180, 120); ctx.fillRect(p1.x, 150, 5, 50); }
        ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(p1.x, 175, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(p2.x, 175, 10, 0, Math.PI * 2); ctx.fill();
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}
