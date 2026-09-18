export interface InformasiPublikItem {
  id: string
  slug: string
  judul: string
  deskripsi: string
  kategori:
    | 'Berkala'
    | 'Serta Merta'
    | 'Setiap Saat'
  isi: {
    judul: string
    deskripsi?: string
    poin?: string[]
  }[]
}

export const informasiPublikData: InformasiPublikItem[] = [
  {
    id: 'INF-001',
    slug: 'profil-pengadilan',
    judul: 'Profil Pengadilan',
    deskripsi:
      'Informasi mengenai profil, kedudukan, tugas, fungsi, dan struktur Pengadilan .',
    kategori: 'Berkala',
    isi: [
      {
        judul: 'Profil Singkat',
        deskripsi:
          'Pengadilan  merupakan badan peradilan agama yang memberikan pelayanan hukum kepada masyarakat sesuai dengan kewenangannya.',
      },
      {
        judul: 'Informasi yang Tersedia',
        poin: [
          'Profil dan kedudukan pengadilan.',
          'Tugas dan fungsi.',
          'Struktur organisasi.',
          'Wilayah yurisdiksi.',
          'Informasi pelayanan.',
        ],
      },
    ],
  },

  {
    id: 'INF-002',
    slug: 'laporan-kinerja',
    judul: 'Laporan Kinerja',
    deskripsi:
      'Informasi laporan kinerja dan pelaksanaan program Pengadilan .',
    kategori: 'Berkala',
    isi: [
      {
        judul: 'Informasi Laporan',
        deskripsi:
          'Laporan kinerja memuat informasi mengenai pelaksanaan program, pencapaian sasaran, dan evaluasi kinerja pengadilan.',
      },
      {
        judul: 'Jenis Laporan',
        poin: [
          'Laporan Kinerja Instansi Pemerintah.',
          'Laporan tahunan.',
          'Evaluasi pencapaian kinerja.',
          'Laporan pelaksanaan program.',
        ],
      },
    ],
  },

  {
    id: 'INF-003',
    slug: 'informasi-anggaran',
    judul: 'Informasi Anggaran',
    deskripsi:
      'Informasi mengenai anggaran dan pelaksanaan kegiatan sesuai ketentuan keterbukaan informasi.',
    kategori: 'Berkala',
    isi: [
      {
        judul: 'Informasi Anggaran',
        deskripsi:
          'Informasi anggaran disediakan sebagai bagian dari transparansi pengelolaan keuangan dan pelaksanaan kegiatan.',
      },
      {
        judul: 'Cakupan Informasi',
        poin: [
          'Rencana dan alokasi anggaran.',
          'Pelaksanaan kegiatan.',
          'Realisasi anggaran.',
          'Laporan keuangan sesuai ketentuan.',
        ],
      },
    ],
  },

  {
    id: 'INF-004',
    slug: 'prosedur-pelayanan',
    judul: 'Prosedur Pelayanan',
    deskripsi:
      'Informasi prosedur pelayanan dan mekanisme memperoleh layanan pengadilan.',
    kategori: 'Setiap Saat',
    isi: [
      {
        judul: 'Prosedur Umum',
        poin: [
          'Masyarakat datang atau mengakses layanan yang tersedia.',
          'Pilih jenis pelayanan yang dibutuhkan.',
          'Lengkapi dokumen atau informasi yang diperlukan.',
          'Petugas melakukan pemeriksaan dan pemrosesan.',
          'Masyarakat memperoleh hasil atau informasi layanan.',
        ],
      },
      {
        judul: 'Pelayanan Digital',
        deskripsi:
          'Beberapa layanan dapat diakses melalui PTSP Online untuk mempermudah masyarakat memperoleh pelayanan.',
      },
    ],
  },

  {
    id: 'INF-005',
    slug: 'daftar-informasi-publik',
    judul: 'Daftar Informasi Publik',
    deskripsi:
      'Daftar informasi yang tersedia dan dapat diakses oleh masyarakat.',
    kategori: 'Setiap Saat',
    isi: [
      {
        judul: 'Kategori Informasi',
        poin: [
          'Informasi berkala.',
          'Informasi serta merta.',
          'Informasi yang tersedia setiap saat.',
          'Dokumen publik yang dapat diunduh.',
        ],
      },
      {
        judul: 'Akses Informasi',
        deskripsi:
          'Masyarakat dapat mengakses informasi melalui website atau mengajukan permohonan informasi melalui layanan PPID.',
      },
    ],
  },

  {
    id: 'INF-006',
    slug: 'informasi-keadaan-darurat',
    judul: 'Informasi Keadaan Darurat',
    deskripsi:
      'Informasi yang perlu diumumkan segera apabila berkaitan dengan keselamatan dan pelayanan masyarakat.',
    kategori: 'Serta Merta',
    isi: [
      {
        judul: 'Informasi Serta Merta',
        deskripsi:
          'Informasi ini diumumkan apabila terdapat kondisi yang dapat memengaruhi keselamatan, pelayanan, atau akses masyarakat terhadap pengadilan.',
      },
      {
        judul: 'Contoh Informasi',
        poin: [
          'Perubahan layanan karena keadaan darurat.',
          'Penutupan sementara pelayanan.',
          'Gangguan sistem pelayanan.',
          'Informasi keselamatan masyarakat.',
        ],
      },
    ],
  },
]

export function cariInformasiPublik(
  slug: string,
) {
  return informasiPublikData.find(
    (item) =>
      item.slug === slug,
  )
}