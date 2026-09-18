import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ==============================
// TYPES
// ==============================

export interface JenisPerkaraBiaya {
  id: string
  nama: string
  biayaPendaftaran: number
  biayaProses: number
  pnbp: number
  materai: number
  aktif: boolean
}

export interface TarifWilayah {
  id: string
  nama: string
  radius: string
  biayaPanggilan: number
  aktif: boolean
}

interface TambahWilayahInput {
  nama: string
  radius: string
  biayaPanggilan: number
}

interface BiayaPerkaraStore {
  jenisPerkara: JenisPerkaraBiaya[]
  tarifWilayah: TarifWilayah[]

  updateJenisPerkara: (
    id: string,
    data: Partial<
      Omit<
        JenisPerkaraBiaya,
        'id'
      >
    >,
  ) => void

  updateTarifWilayah: (
    id: string,
    data: Partial<
      Omit<
        TarifWilayah,
        'id'
      >
    >,
  ) => void

  tambahWilayah: (
    data: TambahWilayahInput,
  ) => void

  hapusWilayah: (
    id: string,
  ) => void

  toggleJenisPerkara: (
    id: string,
  ) => void

  toggleWilayah: (
    id: string,
  ) => void

  resetPengaturan: () => void
}

// ==============================
// DEFAULT DATA
// ==============================

const defaultJenisPerkara: JenisPerkaraBiaya[] = [
  {
    id: 'cerai-gugat',
    nama: 'Cerai Gugat',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'cerai-talak',
    nama: 'Cerai Talak',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'isbat-nikah',
    nama: 'Isbat Nikah',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'dispensasi-kawin',
    nama: 'Dispensasi Kawin',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'hak-asuh-anak',
    nama: 'Hak Asuh Anak',
    biayaPendaftaran: 30000,
    biayaProses: 75000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'harta-bersama',
    nama: 'Harta Bersama',
    biayaPendaftaran: 30000,
    biayaProses: 90000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
  {
    id: 'waris',
    nama: 'Waris',
    biayaPendaftaran: 30000,
    biayaProses: 90000,
    pnbp: 20000,
    materai: 10000,
    aktif: true,
  },
]

const defaultTarifWilayah: TarifWilayah[] = [
  {
    id: 'polewali',
    nama: 'Polewali',
    radius: 'Radius I',
    biayaPanggilan: 75000,
    aktif: true,
  },
  {
    id: 'matakali',
    nama: 'Matakali',
    radius: 'Radius II',
    biayaPanggilan: 90000,
    aktif: true,
  },
  {
    id: 'wonomulyo',
    nama: 'Wonomulyo',
    radius: 'Radius II',
    biayaPanggilan: 100000,
    aktif: true,
  },
  {
    id: 'mapilli',
    nama: 'Mapilli',
    radius: 'Radius III',
    biayaPanggilan: 110000,
    aktif: true,
  },
  {
    id: 'campalagian',
    nama: 'Campalagian',
    radius: 'Radius III',
    biayaPanggilan: 120000,
    aktif: true,
  },
  {
    id: 'tinambung',
    nama: 'Tinambung',
    radius: 'Radius IV',
    biayaPanggilan: 130000,
    aktif: true,
  },
  {
    id: 'balanipa',
    nama: 'Balanipa',
    radius: 'Radius IV',
    biayaPanggilan: 140000,
    aktif: true,
  },
  {
    id: 'limboro',
    nama: 'Limboro',
    radius: 'Radius V',
    biayaPanggilan: 150000,
    aktif: true,
  },
]

// ==============================
// HELPERS
// ==============================

function slugify(
  value: string,
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      '-',
    )
    .replace(
      /^-+|-+$/g,
      '',
    )
}

function cloneJenisPerkara() {
  return defaultJenisPerkara.map(
    (item) => ({
      ...item,
    }),
  )
}

function cloneTarifWilayah() {
  return defaultTarifWilayah.map(
    (item) => ({
      ...item,
    }),
  )
}

// ==============================
// STORE
// ==============================

export const useBiayaPerkaraStore =
  create<BiayaPerkaraStore>()(
    persist(
      (set) => ({
        jenisPerkara:
          cloneJenisPerkara(),

        tarifWilayah:
          cloneTarifWilayah(),

        // ==============================
        // UPDATE JENIS PERKARA
        // ==============================

        updateJenisPerkara: (
          id,
          data,
        ) => {
          set((state) => ({
            jenisPerkara:
              state.jenisPerkara.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        ...data,
                      }
                    : item,
              ),
          }))
        },

        // ==============================
        // UPDATE TARIF WILAYAH
        // ==============================

        updateTarifWilayah: (
          id,
          data,
        ) => {
          set((state) => ({
            tarifWilayah:
              state.tarifWilayah.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        ...data,
                      }
                    : item,
              ),
          }))
        },

        // ==============================
        // TAMBAH WILAYAH
        // ==============================

        tambahWilayah: (
          data,
        ) => {
          const nama =
            data.nama.trim()

          if (!nama) {
            return
          }

          const idDasar =
            slugify(nama) ||
            'wilayah'

          const wilayahBaru: TarifWilayah =
            {
              id: `${idDasar}-${Date.now()}`,
              nama,
              radius:
                data.radius.trim() ||
                'Belum Ditentukan',
              biayaPanggilan:
                Math.max(
                  0,
                  data.biayaPanggilan,
                ),
              aktif: true,
            }

          set((state) => ({
            tarifWilayah: [
              ...state.tarifWilayah,
              wilayahBaru,
            ],
          }))
        },

        // ==============================
        // HAPUS WILAYAH
        // ==============================

        hapusWilayah: (
          id,
        ) => {
          set((state) => ({
            tarifWilayah:
              state.tarifWilayah.filter(
                (item) =>
                  item.id !== id,
              ),
          }))
        },

        // ==============================
        // AKTIF / NONAKTIF PERKARA
        // ==============================

        toggleJenisPerkara: (
          id,
        ) => {
          set((state) => ({
            jenisPerkara:
              state.jenisPerkara.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        aktif:
                          !item.aktif,
                      }
                    : item,
              ),
          }))
        },

        // ==============================
        // AKTIF / NONAKTIF WILAYAH
        // ==============================

        toggleWilayah: (
          id,
        ) => {
          set((state) => ({
            tarifWilayah:
              state.tarifWilayah.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        aktif:
                          !item.aktif,
                      }
                    : item,
              ),
          }))
        },

        // ==============================
        // RESET
        // ==============================

        resetPengaturan: () => {
          set({
            jenisPerkara:
              cloneJenisPerkara(),

            tarifWilayah:
              cloneTarifWilayah(),
          })
        },
      }),

      {
        name:
          'pa-polewali-biaya-perkara',

        version: 2,
      },
    ),
  )