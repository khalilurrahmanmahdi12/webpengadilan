export interface DokumenPublikItem {
  id: string
  judul: string
  kategori: string
  format: string
  ukuran: string
  file: string
}

export const dokumenData: DokumenPublikItem[] = [
  {
    id: 'DOC-001',
    judul: 'Formulir Permohonan Informasi',
    kategori: 'Formulir',
    format: 'PDF',
    ukuran: '245 KB',
    file: '/documents/formulir-permohonan-informasi.pdf',
  },
  {
    id: 'DOC-002',
    judul: 'Formulir Pengaduan Masyarakat',
    kategori: 'Formulir',
    format: 'PDF',
    ukuran: '182 KB',
    file: '/documents/formulir-pengaduan.pdf',
  },
  {
    id: 'DOC-003',
    judul: 'Format Gugatan Cerai',
    kategori: 'Perkara',
    format: 'DOCX',
    ukuran: '96 KB',
    file: '/documents/format-gugatan-cerai.docx',
  },
  {
    id: 'DOC-004',
    judul: 'Format Permohonan Isbat Nikah',
    kategori: 'Perkara',
    format: 'DOCX',
    ukuran: '104 KB',
    file: '/documents/format-isbat-nikah.docx',
  },
  {
    id: 'DOC-005',
    judul: 'Laporan Kinerja Tahunan',
    kategori: 'Laporan',
    format: 'PDF',
    ukuran: '1.8 MB',
    file: '/documents/laporan-kinerja.pdf',
  },
]