const testimoni = [
    {
        "id": 1,
        "gambar": "https://randomuser.me/api/portraits/men/5.jpg",
        "nama": "Fajar Ramadhan",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Belajar di Educo serasa main game. Setiap misi yang saya selesaikan bikin saya makin paham tentang lingkungan tanpa terasa membosankan.",
        "bintang": 5
    },
    {
        "id": 2,
        "gambar": "https://randomuser.me/api/portraits/women/6.jpg",
        "nama": "Aulia Rahma",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Saya suka sistem poin dan level di Educo. Jadi semangat menyelesaikan tugas karena ada tantangannya.",
        "bintang": 5
    },
    {
        "id": 3,
        "gambar": "https://randomuser.me/api/portraits/men/8.jpg",
        "nama": "Bagas Prakoso",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Materinya mudah dipahami dan ada game edukatifnya juga. Jadi belajar tentang lingkungan terasa seru.",
        "bintang": 4
    },
    {
        "id": 4,
        "gambar": "https://randomuser.me/api/portraits/women/9.jpg",
        "nama": "Nadia Putri",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Saya jadi lebih peduli soal sampah dan daur ulang karena misi-misi di Educo ngajarin praktik langsung.",
        "bintang": 5
    },
    {
        "id": 5,
        "gambar": "https://randomuser.me/api/portraits/men/10.jpg",
        "nama": "Rizky Hidayat",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Tugasnya tidak cuma baca materi, tapi ada tantangan dan kuis interaktif. Jadi tidak membosankan seperti kelas biasa.",
        "bintang": 4
    },
    {
        "id": 6,
        "gambar": "https://randomuser.me/api/portraits/women/12.jpg",
        "nama": "Farah Nabila",
        "pekerjaan": "Pengurus Organisasi Siswa",
        "testimoni": "Educo membantu kami membuat program sekolah peduli lingkungan. Fitur misi kelompoknya sangat membantu kerja tim.",
        "bintang": 5
    },
    {
        "id": 7,
        "gambar": "https://randomuser.me/api/portraits/men/14.jpg",
        "nama": "Ilham Maulana",
        "pekerjaan": "Pengurus Organisasi Siswa",
        "testimoni": "Sistem leaderboard membuat siswa jadi lebih kompetitif dalam hal positif, terutama saat mengerjakan proyek lingkungan.",
        "bintang": 5
    },
    {
        "id": 8,
        "gambar": "https://randomuser.me/api/portraits/women/15.jpg",
        "nama": "Putri Lestari",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Game edukatifnya bikin saya cepat mengerti tentang perubahan iklim dan energi terbarukan.",
        "bintang": 5
    },
    {
        "id": 9,
        "gambar": "https://randomuser.me/api/portraits/men/55.jpg",
        "nama": "Andi Kurniawan",
        "pekerjaan": "Guru",
        "testimoni": "Educo memudahkan saya mengelola kelas digital dengan sistem berbasis misi yang lebih menarik untuk siswa SMP.",
        "bintang": 5
    },
    {
        "id": 10,
        "gambar": "https://randomuser.me/api/portraits/women/56.jpg",
        "nama": "Lina Kartika",
        "pekerjaan": "Guru",
        "testimoni": "Siswa saya menjadi lebih aktif dan antusias karena setiap materi dikemas dalam bentuk tantangan dan permainan edukatif.",
        "bintang": 5
    },
    {
        "id": 11,
        "gambar": "https://randomuser.me/api/portraits/men/58.jpg",
        "nama": "Reza Ananda",
        "pekerjaan": "Guru",
        "testimoni": "Fitur evaluasi dan progress misi sangat membantu saya memantau perkembangan siswa secara real-time.",
        "bintang": 4
    },
    {
        "id": 12,
        "gambar": "https://randomuser.me/api/portraits/women/60.jpg",
        "nama": "Indah Permata",
        "pekerjaan": "Orang Tua Murid",
        "testimoni": "Saya senang karena anak saya belajar lewat sistem yang menyenangkan. Dia jadi lebih semangat mengerjakan tugas sekolah.",
        "bintang": 5
    },
    {
        "id": 13,
        "gambar": "https://randomuser.me/api/portraits/men/62.jpg",
        "nama": "Arif Nugroho",
        "pekerjaan": "Orang Tua Murid",
        "testimoni": "Educo membantu anak saya memahami pentingnya menjaga lingkungan dengan cara yang modern dan interaktif.",
        "bintang": 5
    },
    {
        "id": 14,
        "gambar": "https://randomuser.me/api/portraits/women/16.jpg",
        "nama": "Maya Salsabila",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Saya suka karena ada badge dan reward setelah menyelesaikan misi. Jadi terasa seperti naik level di game.",
        "bintang": 5
    },
    {
        "id": 15,
        "gambar": "https://randomuser.me/api/portraits/men/18.jpg",
        "nama": "Yoga Saputra",
        "pekerjaan": "Siswa SMP",
        "testimoni": "Belajar energi terbarukan jadi lebih seru karena ada simulasi dan mini game di dalamnya.",
        "bintang": 4
    },
    {
        "id": 16,
        "gambar": "https://randomuser.me/api/portraits/women/65.jpg",
        "nama": "Dewi Anggraini",
        "pekerjaan": "Guru",
        "testimoni": "Platform ini mempermudah pemberian tugas berbasis proyek dan kolaborasi antar siswa.",
        "bintang": 5
    },
    {
        "id": 17,
        "gambar": "https://randomuser.me/api/portraits/men/17.jpg",
        "nama": "Ahmad Fauzi",
        "pekerjaan": "Pengurus Organisasi Siswa",
        "testimoni": "Kami menggunakan Educo untuk kampanye lingkungan sekolah dan hasilnya sangat positif.",
        "bintang": 5
    },
    {
        "id": 18,
        "gambar": "https://randomuser.me/api/portraits/women/68.jpg",
        "nama": "Siti Aisyah",
        "pekerjaan": "Orang Tua Murid",
        "testimoni": "Saya melihat perubahan sikap anak saya menjadi lebih peduli terhadap lingkungan sekitar rumah.",
        "bintang": 5
    },
    {
        "id": 19,
        "gambar": "https://randomuser.me/api/portraits/men/70.jpg",
        "nama": "Dimas Pratama",
        "pekerjaan": "Guru",
        "testimoni": "Educo seperti kelas digital yang lebih interaktif. Sistem misi dan poin membuat siswa lebih termotivasi.",
        "bintang": 4
    },
    {
        "id": 20,
        "gambar": "https://randomuser.me/api/portraits/women/69.jpg",
        "nama": "Rina Maharani",
        "pekerjaan": "Orang Tua Murid",
        "testimoni": "Anak saya tidak lagi menganggap belajar sebagai beban karena Educo membuatnya terasa seperti petualangan.",
        "bintang": 5
    }
]
export default testimoni;