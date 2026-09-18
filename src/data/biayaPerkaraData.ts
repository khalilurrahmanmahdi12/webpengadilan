export interface TarifWilayah {
  id: string
  nama: string
  biayaPanggilan: number
}

export interface JenisPerkaraBiaya {
  id: string
  nama: string
  biayaPendaftaran: number
  biayaProses: number
  pnbp: number
  materai: number
}

export const jenisPerkaraBiaya: JenisPerkaraBiaya[] = [
  {
    id: 'cerai-gugat',
    nama: 'Cerai Gugat',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'cerai-talak',
    nama: 'Cerai Talak',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'isbat-nikah',
    nama: 'Isbat Nikah',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'dispensasi-kawin',
    nama: 'Dispensasi Kawin',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'hak-asuh-anak',
    nama: 'Hak Asuh Anak',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'harta-bersama',
    nama: 'Harta Bersama',
    biayaPendaftaran: 30000,
    biayaProses: 90000,
    pnbp: 20000,
    materai: 10000,
  },
  {
    id: 'waris',
    nama: 'Waris',
    biayaPendaftaran: 30000,
    biayaProses: 90000,
    pnbp: 20000,
    materai: 10000,
  },
]

export const tarifWilayah: TarifWilayah[] = [
  {
    id: 'polewali',
    nama: 'Polewali',
    biayaPanggilan: 75000,
  },
  {
    id: 'matakali',
    nama: 'Matakali',
    biayaPanggilan: 90000,
  },
  {
    id: 'wonomulyo',
    nama: 'Wonomulyo',
    biayaPanggilan: 100000,
  },
  {
    id: 'mapilli',
    nama: 'Mapilli',
    biayaPanggilan: 110000,
  },
  {
    id: 'campalagian',
    nama: 'Campalagian',
    biayaPanggilan: 120000,
  },
  {
    id: 'tinambung',
    nama: 'Tinambung',
    biayaPanggilan: 130000,
  },
  {
    id: 'balanipa',
    nama: 'Balanipa',
    biayaPanggilan: 140000,
  },
  {
    id: 'limboro',
    nama: 'Limboro',
    biayaPanggilan: 150000,
  },
]