export interface PengumumanItem {
  id: string
  slug: string
  judul: string
  tanggal: string
  tanggalIso: string
  kategori: string
  ringkasan: string
  isi: string[]
}

export const pengumumanData: PengumumanItem[] = [
  {
    id: 'PNG-001',
    slug: 'jadwal-pelayanan-pengadilan',
    judul:
      'Pengumuman Jadwal Pelayanan Pengadilan',
    tanggal:
      '16 September 2026',
    tanggalIso:
      '2026-09-16',
    kategori:
      'Pelayanan',
    ringkasan:
      'Informasi mengenai jadwal pelayanan Pengadilan .',
    isi: [
      'Pengadilan  menyampaikan informasi mengenai jadwal pelayanan kepada masyarakat.',
      'Masyarakat diharapkan memperhatikan jam pelayanan sebelum datang ke kantor pengadilan.',
      'Informasi perubahan jadwal pelayanan akan disampaikan melalui website resmi dan kanal informasi Pengadilan .',
    ],
  },

  {
    id: 'PNG-002',
    slug:
      'perubahan-jadwal-persidangan',
    judul:
      'Informasi Perubahan Jadwal Persidangan',
    tanggal:
      '14 September 2026',
    tanggalIso:
      '2026-09-14',
    kategori:
      'Persidangan',
    ringkasan:
      'Informasi perubahan jadwal persidangan bagi para pihak yang berkepentingan.',
    isi: [
      'Pengadilan  menyampaikan adanya perubahan jadwal persidangan pada beberapa perkara.',
      'Para pihak diharapkan memeriksa jadwal terbaru melalui layanan informasi pengadilan.',
      'Apabila membutuhkan informasi lebih lanjut, masyarakat dapat menghubungi petugas PTSP.',
    ],
  },

  {
    id: 'PNG-003',
    slug:
      'pelayanan-ptsp-pengadilan-agama-polewali',
    judul:
      'Pengumuman Pelayanan PTSP Pengadilan ',
    tanggal:
      '11 September 2026',
    tanggalIso:
      '2026-09-11',
    kategori:
      'PTSP',
    ringkasan:
      'Informasi pelayanan terpadu satu pintu bagi masyarakat.',
    isi: [
      'Pelayanan Terpadu Satu Pintu Pengadilan  tersedia untuk membantu masyarakat memperoleh informasi dan layanan administrasi.',
      'Masyarakat dapat menggunakan layanan antrean dan verifikasi berkas sebelum datang ke kantor.',
      'Penggunaan layanan digital diharapkan dapat mempercepat proses pelayanan.',
    ],
  },

  {
    id: 'PNG-004',
    slug:
      'hari-libur-dan-pelayanan-pengadilan',
    judul:
      'Informasi Hari Libur dan Pelayanan Pengadilan',
    tanggal:
      '8 September 2026',
    tanggalIso:
      '2026-09-08',
    kategori:
      'Pelayanan',
    ringkasan:
      'Informasi pelayanan pengadilan pada periode hari libur.',
    isi: [
      'Pengadilan  menyampaikan informasi terkait pelayanan pada periode hari libur.',
      'Pelayanan tatap muka menyesuaikan jadwal kerja yang berlaku.',
      'Masyarakat tetap dapat mengakses layanan informasi yang tersedia secara daring melalui website.',
    ],
  },
]

export function cariPengumuman(
  slug: string,
) {
  return pengumumanData.find(
    (item) =>
      item.slug === slug,
  )
}