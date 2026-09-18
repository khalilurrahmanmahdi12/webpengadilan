import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  AntreanPtsp,
  StatusAntrean,
} from '../types/ptsp'

interface TambahAntreanInput {
  nama: string
  whatsapp: string
  layananId: string
  namaLayanan: string
}

interface AntreanStore {
  antrean: AntreanPtsp[]

  tanggalAntrean: string

  nomorTerakhir: number

  nomorSedangDilayani: number

  tambahAntrean: (
    data: TambahAntreanInput,
  ) => AntreanPtsp

  cariAntrean: (
    nomorAntrean: string,
  ) => AntreanPtsp | undefined

  panggilBerikutnya: () =>
    | AntreanPtsp
    | undefined

  mulaiPelayanan: (
    id: string,
  ) => void

  selesaikanAntrean: (
    id: string,
  ) => void

  updateStatusAntrean: (
    id: string,
    status: StatusAntrean,
  ) => void

  resetAntrean: () => void

  cekPergantianHari: () => void

  sinkronkanData: () => void
}

export function formatNomorAntrean(
  nomor: number,
) {
  return `A-${String(nomor).padStart(
    3,
    '0',
  )}`
}

function tanggalHariIni() {
  const sekarang =
    new Date()

  const tahun =
    sekarang.getFullYear()

  const bulan =
    String(
      sekarang.getMonth() + 1,
    ).padStart(2, '0')

  const tanggal =
    String(
      sekarang.getDate(),
    ).padStart(2, '0')

  return `${tahun}-${bulan}-${tanggal}`
}

function formatTanggal() {
  return new Date().toLocaleDateString(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  )
}

function ambilNomorTerbesar(
  antrean: AntreanPtsp[],
) {
  if (antrean.length === 0) {
    return 0
  }

  return Math.max(
    ...antrean.map((item) => {
      const bagian =
        item.nomorAntrean.split('-')[1]

      return Number(bagian) || 0
    }),
  )
}

export const useAntreanStore =
  create<AntreanStore>()(
    persist(
      (set, get) => ({
        antrean: [],

        tanggalAntrean:
          tanggalHariIni(),

        nomorTerakhir: 0,

        nomorSedangDilayani: 0,

        /*
         * Cek pergantian hari.
         * Antrean otomatis kembali
         * dari A-001 setiap hari.
         */
        cekPergantianHari: () => {
          const hariIni =
            tanggalHariIni()

          if (
            get().tanggalAntrean !==
            hariIni
          ) {
            set({
              antrean: [],

              tanggalAntrean:
                hariIni,

              nomorTerakhir: 0,

              nomorSedangDilayani:
                0,
            })
          }
        },

        /*
         * Memperbaiki state apabila
         * nomorTerakhir tidak cocok
         * dengan data antrean.
         *
         * Ini mengatasi sisa state
         * localStorage versi lama.
         */
        sinkronkanData: () => {
          const state =
            get()

          if (
            state.antrean.length === 0
          ) {
            if (
              state.nomorTerakhir !==
                0 ||
              state.nomorSedangDilayani !==
                0
            ) {
              set({
                nomorTerakhir: 0,
                nomorSedangDilayani:
                  0,
              })
            }

            return
          }

          const nomorTerbesar =
            ambilNomorTerbesar(
              state.antrean,
            )

          const antreanAktif =
            state.antrean.find(
              (item) =>
                item.status ===
                  'Dipanggil' ||
                item.status ===
                  'Sedang Dilayani',
            )

          let nomorAktif = 0

          if (antreanAktif) {
            nomorAktif =
              Number(
                antreanAktif.nomorAntrean.split(
                  '-',
                )[1],
              ) || 0
          }

          if (
            state.nomorTerakhir !==
              nomorTerbesar ||
            state.nomorSedangDilayani !==
              nomorAktif
          ) {
            set({
              nomorTerakhir:
                nomorTerbesar,

              nomorSedangDilayani:
                nomorAktif,
            })
          }
        },

        tambahAntrean: (
          data,
        ) => {
          get().cekPergantianHari()
          get().sinkronkanData()

          const nomorBaru =
            get().nomorTerakhir +
            1

          const antreanBaru: AntreanPtsp =
            {
              id:
                crypto.randomUUID(),

              nomorAntrean:
                formatNomorAntrean(
                  nomorBaru,
                ),

              nama:
                data.nama,

              whatsapp:
                data.whatsapp,

              layananId:
                data.layananId,

              namaLayanan:
                data.namaLayanan,

              tanggal:
                formatTanggal(),

              status:
                'Menunggu',
            }

          set((state) => ({
            nomorTerakhir:
              nomorBaru,

            antrean: [
              ...state.antrean,
              antreanBaru,
            ],
          }))

          return antreanBaru
        },

        cariAntrean: (
          nomorAntrean,
        ) => {
          return get().antrean.find(
            (item) =>
              item.nomorAntrean
                .toLowerCase()
                .trim() ===
              nomorAntrean
                .toLowerCase()
                .trim(),
          )
        },

        panggilBerikutnya:
          () => {
            get().cekPergantianHari()
            get().sinkronkanData()

            const state =
              get()

            const antreanAktif =
              state.antrean.find(
                (item) =>
                  item.status ===
                    'Dipanggil' ||
                  item.status ===
                    'Sedang Dilayani',
              )

            /*
             * Jangan panggil nomor lain
             * jika masih ada pelayanan aktif.
             */
            if (antreanAktif) {
              return undefined
            }

            const antreanBerikutnya =
              state.antrean.find(
                (item) =>
                  item.status ===
                  'Menunggu',
              )

            if (!antreanBerikutnya) {
              return undefined
            }

            const nomor =
              Number(
                antreanBerikutnya.nomorAntrean.split(
                  '-',
                )[1],
              )

            set((current) => ({
              nomorSedangDilayani:
                nomor,

              antrean:
                current.antrean.map(
                  (item) =>
                    item.id ===
                    antreanBerikutnya.id
                      ? {
                          ...item,
                          status:
                            'Dipanggil',
                        }
                      : item,
                ),
            }))

            return {
              ...antreanBerikutnya,
              status:
                'Dipanggil',
            }
          },

        mulaiPelayanan: (
          id,
        ) => {
          set((state) => ({
            antrean:
              state.antrean.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        status:
                          'Sedang Dilayani',
                      }
                    : item,
              ),
          }))
        },

        selesaikanAntrean: (
          id,
        ) => {
          set((state) => ({
            antrean:
              state.antrean.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        status:
                          'Selesai',
                      }
                    : item,
              ),

            /*
             * Setelah pelayanan selesai,
             * tidak ada nomor aktif lagi.
             */
            nomorSedangDilayani:
              0,
          }))
        },

        updateStatusAntrean: (
          id,
          status,
        ) => {
          set((state) => ({
            antrean:
              state.antrean.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        status,
                      }
                    : item,
              ),
          }))
        },

        resetAntrean: () => {
          set({
            antrean: [],

            tanggalAntrean:
              tanggalHariIni(),

            nomorTerakhir: 0,

            nomorSedangDilayani:
              0,
          })
        },
      }),

      {
        name:
          'pa-polewali-antrean',

        /*
         * Naikkan versi bila struktur
         * antrean berubah.
         */
        version: 2,

        /*
         * Bersihkan state lama yang
         * sebelumnya membuat total 2
         * tetapi antreannya kosong.
         */
        migrate: () => {
          return {
            antrean: [],

            tanggalAntrean:
              tanggalHariIni(),

            nomorTerakhir: 0,

            nomorSedangDilayani:
              0,
          }
        },

        /*
         * Setelah localStorage selesai
         * dibaca, validasi state lagi.
         */
        onRehydrateStorage: () => {
          return (state) => {
            if (!state) {
              return
            }

            state.cekPergantianHari()
            state.sinkronkanData()
          }
        },
      },
    ),
  )