export interface JadwalSidangItem {
  id: string
  nomorPerkara: string
  tanggal: string
  tanggalLabel: string
  agenda: string
  jam: string
  ruang: string
  status: 'Hari Ini' | 'Akan Datang' | 'Selesai'
}

export const jadwalSidangData: JadwalSidangItem[] = [
  {
    id: 'JDL-001',
    nomorPerkara:
      '123/Pdt.G/2026/PA.Pwl',
    tanggal: '2026-09-17',
    tanggalLabel:
      '17 September 2026',
    agenda:
      'Sidang Pertama',
    jam: '09.00 WITA',
    ruang:
      'Ruang Sidang I',
    status: 'Hari Ini',
  },
  {
    id: 'JDL-002',
    nomorPerkara:
      '145/Pdt.G/2026/PA.Pwl',
    tanggal: '2026-09-17',
    tanggalLabel:
      '17 September 2026',
    agenda:
      'Pembuktian',
    jam: '09.30 WITA',
    ruang:
      'Ruang Sidang II',
    status: 'Hari Ini',
  },
  {
    id: 'JDL-003',
    nomorPerkara:
      '167/Pdt.P/2026/PA.Pwl',
    tanggal: '2026-09-17',
    tanggalLabel:
      '17 September 2026',
    agenda:
      'Pemeriksaan',
    jam: '10.00 WITA',
    ruang:
      'Ruang Sidang I',
    status: 'Hari Ini',
  },
  {
    id: 'JDL-004',
    nomorPerkara:
      '181/Pdt.G/2026/PA.Pwl',
    tanggal: '2026-09-17',
    tanggalLabel:
      '17 September 2026',
    agenda:
      'Mediasi',
    jam: '10.30 WITA',
    ruang:
      'Ruang Mediasi',
    status: 'Hari Ini',
  },
  {
    id: 'JDL-005',
    nomorPerkara:
      '194/Pdt.G/2026/PA.Pwl',
    tanggal: '2026-09-18',
    tanggalLabel:
      '18 September 2026',
    agenda:
      'Sidang Pertama',
    jam: '09.00 WITA',
    ruang:
      'Ruang Sidang I',
    status:
      'Akan Datang',
  },
  {
    id: 'JDL-006',
    nomorPerkara:
      '202/Pdt.P/2026/PA.Pwl',
    tanggal: '2026-09-18',
    tanggalLabel:
      '18 September 2026',
    agenda:
      'Pemeriksaan Pemohon',
    jam: '10.00 WITA',
    ruang:
      'Ruang Sidang II',
    status:
      'Akan Datang',
  },
  {
    id: 'JDL-007',
    nomorPerkara:
      '115/Pdt.G/2026/PA.Pwl',
    tanggal: '2026-09-15',
    tanggalLabel:
      '15 September 2026',
    agenda:
      'Pembacaan Putusan',
    jam: '09.30 WITA',
    ruang:
      'Ruang Sidang I',
    status: 'Selesai',
  },
]