export interface AgendaItem {
  id: string
  slug: string
  judul: string
  tanggal: string
  hari: string
  bulan: string
  tahun: string
  waktu: string
  lokasi: string
  kategori: string
  deskripsi: string
}

export const agendaData: AgendaItem[] = [
  {
    id: 'AGD-001',
    slug:
      'rapat-koordinasi-bulanan',
    judul:
      'Rapat Koordinasi Bulanan',
    tanggal:
      '18 September 2026',
    hari: '18',
    bulan: 'SEP',
    tahun: '2026',
    waktu:
      '09.00 WITA',
    lokasi:
      'Ruang Rapat Pengadilan ',
    kategori:
      'Rapat',
    deskripsi:
      'Rapat koordinasi bulanan untuk evaluasi pelaksanaan tugas dan pelayanan.',
  },

  {
    id: 'AGD-002',
    slug:
      'pembinaan-aparatur-pengadilan',
    judul:
      'Pembinaan Aparatur Pengadilan',
    tanggal:
      '21 September 2026',
    hari: '21',
    bulan: 'SEP',
    tahun: '2026',
    waktu:
      '08.30 WITA',
    lokasi:
      'Aula Pengadilan ',
    kategori:
      'Pembinaan',
    deskripsi:
      'Kegiatan pembinaan aparatur dalam rangka peningkatan disiplin dan profesionalisme.',
  },

  {
    id: 'AGD-003',
    slug:
      'evaluasi-pelayanan-ptsp',
    judul:
      'Evaluasi Pelayanan PTSP',
    tanggal:
      '24 September 2026',
    hari: '24',
    bulan: 'SEP',
    tahun: '2026',
    waktu:
      '10.00 WITA',
    lokasi:
      'Ruang Rapat Pengadilan ',
    kategori:
      'Evaluasi',
    deskripsi:
      'Evaluasi pelaksanaan layanan PTSP dan peningkatan kualitas pelayanan masyarakat.',
  },

  {
    id: 'AGD-004',
    slug:
      'monitoring-kinerja-aparatur',
    judul:
      'Monitoring Kinerja Aparatur',
    tanggal:
      '28 September 2026',
    hari: '28',
    bulan: 'SEP',
    tahun: '2026',
    waktu:
      '09.00 WITA',
    lokasi:
      'Ruang Rapat Pengadilan',
    kategori:
      'Monitoring',
    deskripsi:
      'Monitoring pelaksanaan pekerjaan dan pencapaian kinerja aparatur.',
  },
]

export function cariAgenda(
  slug: string,
) {
  return agendaData.find(
    (item) =>
      item.slug === slug,
  )
}