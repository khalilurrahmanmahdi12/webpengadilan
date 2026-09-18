export interface BeritaItem {
  id: string
  slug: string
  judul: string
  ringkasan: string
  kategori: string
  tanggal: string
  tanggalIso: string
  gambar: string
  isi: string[]
}

export const beritaData: BeritaItem[] = [
  {
    id: 'BR-001',
    slug: 'rapat-evaluasi-pelayanan',
    judul:
      'Pengadilan  Gelar Rapat Evaluasi Pelayanan',
    ringkasan:
      'Pengadilan  melaksanakan rapat evaluasi untuk meningkatkan kualitas pelayanan kepada masyarakat.',
    kategori: 'Kegiatan',
    tanggal: '15 September 2026',
    tanggalIso: '2026-09-15',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pengadilan  melaksanakan rapat evaluasi pelayanan sebagai bagian dari upaya peningkatan kualitas pelayanan kepada masyarakat.',
      'Kegiatan ini membahas pelaksanaan pelayanan yang telah berjalan, kendala yang dihadapi, serta langkah perbaikan yang dapat dilakukan oleh seluruh aparatur.',
      'Evaluasi juga diarahkan pada peningkatan kecepatan, ketepatan, transparansi, dan kenyamanan pelayanan bagi para pencari keadilan.',
      'Melalui kegiatan ini, Pengadilan  berkomitmen untuk terus melakukan perbaikan dan meningkatkan kualitas pelayanan publik.',
    ],
  },

  {
    id: 'BR-002',
    slug:
      'peningkatan-kualitas-pelayanan-publik',
    judul:
      'Peningkatan Kualitas Pelayanan Publik Pengadilan',
    ringkasan:
      'Upaya peningkatan kualitas pelayanan terus dilakukan melalui evaluasi dan pengembangan layanan publik.',
    kategori: 'Pelayanan',
    tanggal: '12 September 2026',
    tanggalIso: '2026-09-12',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pengadilan terus melakukan berbagai upaya untuk meningkatkan kualitas pelayanan publik.',
      'Peningkatan dilakukan melalui penyederhanaan proses pelayanan, pemanfaatan teknologi informasi, serta peningkatan kompetensi aparatur.',
      'Masyarakat diharapkan dapat memperoleh layanan yang semakin mudah diakses, cepat, transparan, dan akuntabel.',
      'Pengadilan juga terus melakukan evaluasi terhadap layanan yang diberikan sebagai bagian dari komitmen peningkatan kualitas secara berkelanjutan.',
    ],
  },

  {
    id: 'BR-003',
    slug:
      'monitoring-evaluasi-kinerja-aparatur',
    judul:
      'Monitoring dan Evaluasi Kinerja Aparatur Pengadilan',
    ringkasan:
      'Monitoring dan evaluasi dilakukan untuk memastikan pelaksanaan tugas berjalan sesuai standar yang ditetapkan.',
    kategori: 'Kegiatan',
    tanggal: '10 September 2026',
    tanggalIso: '2026-09-10',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pengadilan melaksanakan kegiatan monitoring dan evaluasi terhadap kinerja aparatur.',
      'Kegiatan tersebut dilakukan untuk mengetahui pencapaian kinerja serta mengidentifikasi berbagai hal yang masih memerlukan perbaikan.',
      'Evaluasi mencakup pelaksanaan tugas, pelayanan kepada masyarakat, disiplin kerja, serta efektivitas proses administrasi.',
      'Hasil evaluasi selanjutnya menjadi bahan untuk menentukan langkah peningkatan kinerja pada periode berikutnya.',
    ],
  },

  {
    id: 'BR-004',
    slug:
      'sosialisasi-layanan-ptsp-online',
    judul:
      'Sosialisasi Layanan PTSP Online kepada Masyarakat',
    ringkasan:
      'Layanan PTSP Online diperkenalkan sebagai sarana untuk mempermudah masyarakat memperoleh pelayanan pengadilan.',
    kategori: 'PTSP',
    tanggal: '8 September 2026',
    tanggalIso: '2026-09-08',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pengadilan memperkenalkan layanan PTSP Online sebagai bagian dari pengembangan pelayanan berbasis digital.',
      'Melalui layanan tersebut, masyarakat dapat memperoleh informasi, melakukan verifikasi berkas, serta memantau antrean pelayanan.',
      'Pemanfaatan teknologi diharapkan dapat mengurangi waktu tunggu dan mempermudah masyarakat sebelum datang ke kantor pengadilan.',
    ],
  },

  {
    id: 'BR-005',
    slug:
      'pembinaan-aparatur-pengadilan',
    judul:
      'Pembinaan Aparatur Pengadilan ',
    ringkasan:
      'Pembinaan aparatur dilakukan dalam rangka meningkatkan profesionalisme dan kualitas pelaksanaan tugas.',
    kategori: 'Pembinaan',
    tanggal: '5 September 2026',
    tanggalIso: '2026-09-05',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pengadilan  melaksanakan pembinaan aparatur dalam rangka meningkatkan profesionalisme dan kualitas pelaksanaan tugas.',
      'Pembinaan menekankan pentingnya integritas, kedisiplinan, tanggung jawab, serta pelayanan yang berorientasi kepada masyarakat.',
      'Seluruh aparatur diharapkan dapat menjalankan tugas secara profesional sesuai dengan ketentuan yang berlaku.',
    ],
  },

  {
    id: 'BR-006',
    slug:
      'pengembangan-layanan-informasi-digital',
    judul:
      'Pengembangan Layanan Informasi Digital Pengadilan',
    ringkasan:
      'Pengadilan  terus mengembangkan layanan informasi digital untuk mempermudah masyarakat.',
    kategori: 'Teknologi',
    tanggal: '2 September 2026',
    tanggalIso: '2026-09-02',
    gambar:
      '/images/gedung-pa-polewali.jpg',
    isi: [
      'Pemanfaatan teknologi informasi terus dikembangkan oleh Pengadilan  untuk mendukung pelayanan publik.',
      'Informasi mengenai layanan, jadwal persidangan, persyaratan, biaya perkara, dan informasi publik dapat diakses melalui website pengadilan.',
      'Pengembangan layanan digital diharapkan dapat meningkatkan akses masyarakat terhadap informasi secara cepat dan transparan.',
    ],
  },
]

export function cariBerita(
  slug: string,
) {
  return beritaData.find(
    (item) =>
      item.slug === slug,
  )
}