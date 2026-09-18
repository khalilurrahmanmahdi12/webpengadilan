import type { LayananPtsp } from '../types/ptsp'

export const layananPtsp: LayananPtsp[] = [
  {
    id: 'LYN-001',
    nama: 'Permohonan Informasi',
    deskripsi:
      'Layanan permohonan informasi publik Pengadilan .',
    persyaratan: [
      'Kartu identitas pemohon',
      'Formulir permohonan informasi',
    ],
  },
  {
    id: 'LYN-002',
    nama: 'Pengaduan Masyarakat',
    deskripsi:
      'Layanan penyampaian pengaduan terkait pelayanan pengadilan.',
    persyaratan: [
      'Identitas pelapor',
      'Uraian pengaduan',
      'Dokumen pendukung apabila tersedia',
    ],
  },
  {
    id: 'LYN-003',
    nama: 'Informasi Akta Cerai',
    deskripsi:
      'Permohonan informasi terkait ketersediaan dan pengambilan akta cerai.',
    persyaratan: [
      'Nomor perkara',
      'Kartu identitas',
    ],
  },
  {
    id: 'LYN-004',
    nama: 'Permohonan Salinan Putusan',
    deskripsi:
      'Pengajuan permohonan salinan putusan perkara.',
    persyaratan: [
      'Nomor perkara',
      'Kartu identitas pemohon',
    ],
  },
  {
    id: 'LYN-005',
    nama: 'Informasi Perkara',
    deskripsi:
      'Layanan permohonan informasi mengenai perkara yang sedang berjalan.',
    persyaratan: [
      'Nomor perkara',
      'Identitas pemohon',
    ],
  },
]