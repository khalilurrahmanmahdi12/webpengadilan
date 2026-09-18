export type StatusVerifikasi =
  | 'Menunggu Verifikasi'
  | 'Perlu Perbaikan'
  | 'Berkas Terverifikasi'
  | 'Ditolak'

export type StatusAntrean =
  | 'Menunggu'
  | 'Dipanggil'
  | 'Sedang Dilayani'
  | 'Selesai'

export interface LayananPtsp {
  id: string
  nama: string
  deskripsi: string
  persyaratan: string[]
}

export interface BerkasUpload {
  id: string

  // Nama dokumen
  nama: string

  // Nama file asli
  namaFile: string

  // Ukuran file dalam byte
  ukuran: number

  // MIME type
  tipe: string

  // Isi file untuk prototype localStorage
  dataUrl?: string
}

export interface RiwayatVerifikasi {
  id: string
  status: StatusVerifikasi
  tanggal: string
  catatan: string
}

export interface VerifikasiBerkas {
  id: string

  nomorPermohonan: string

  nama: string
  nik: string
  whatsapp: string
  email: string
  alamat: string
  kota: string

  layananId: string
  namaLayanan: string

  keperluan: string

  berkas: BerkasUpload[]

  status: StatusVerifikasi

  tanggalPengajuan: string

  riwayat: RiwayatVerifikasi[]
}

export interface AntreanPtsp {
  id: string

  nomorAntrean: string

  nama: string
  whatsapp: string

  layananId: string
  namaLayanan: string

  tanggal: string

  status: StatusAntrean
}