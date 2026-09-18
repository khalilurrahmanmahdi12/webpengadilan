import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  BerkasUpload,
  StatusVerifikasi,
  VerifikasiBerkas,
} from '../types/ptsp'

interface TambahVerifikasiInput {
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
}

interface VerifikasiStore {
  verifikasi: VerifikasiBerkas[]

  tambahVerifikasi: (
    data: TambahVerifikasiInput,
  ) => VerifikasiBerkas

  cariVerifikasi: (
    nomorPermohonan: string,
  ) => VerifikasiBerkas | undefined

  updateStatus: (
    id: string,
    status: StatusVerifikasi,
    catatan: string,
  ) => void

  perbaikiBerkas: (
    nomorPermohonan: string,
    berkasBaru: BerkasUpload[],
  ) => boolean
}

function tanggalSekarang() {
  return new Date().toLocaleString(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  )
}

function generateNomorPermohonan(
  jumlah: number,
) {
  const tahun =
    new Date().getFullYear()

  return `VRF-${tahun}-${String(
    jumlah + 1,
  ).padStart(4, '0')}`
}

export const useVerifikasiStore =
  create<VerifikasiStore>()(
    persist(
      (set, get) => ({
        verifikasi: [],

        tambahVerifikasi: (
          data,
        ) => {
          const sekarang =
            tanggalSekarang()

          const nomorPermohonan =
            generateNomorPermohonan(
              get().verifikasi.length,
            )

          const dataBaru: VerifikasiBerkas =
            {
              id:
                crypto.randomUUID(),

              nomorPermohonan,

              nama: data.nama,
              nik: data.nik,

              whatsapp:
                data.whatsapp,

              email: data.email,

              alamat:
                data.alamat,

              kota: data.kota,

              layananId:
                data.layananId,

              namaLayanan:
                data.namaLayanan,

              keperluan:
                data.keperluan,

              berkas:
                data.berkas,

              status:
                'Menunggu Verifikasi',

              tanggalPengajuan:
                sekarang,

              riwayat: [
                {
                  id:
                    crypto.randomUUID(),

                  status:
                    'Menunggu Verifikasi',

                  tanggal:
                    sekarang,

                  catatan:
                    'Pengajuan berhasil dikirim dan menunggu pemeriksaan petugas.',
                },
              ],
            }

          set((state) => ({
            verifikasi: [
              dataBaru,
              ...state.verifikasi,
            ],
          }))

          return dataBaru
        },

        cariVerifikasi: (
          nomorPermohonan,
        ) => {
          return get().verifikasi.find(
            (item) =>
              item.nomorPermohonan
                .toLowerCase()
                .trim() ===
              nomorPermohonan
                .toLowerCase()
                .trim(),
          )
        },

        updateStatus: (
          id,
          status,
          catatan,
        ) => {
          set((state) => ({
            verifikasi:
              state.verifikasi.map(
                (item) => {
                  if (
                    item.id !== id
                  ) {
                    return item
                  }

                  return {
                    ...item,

                    status,

                    riwayat: [
                      ...item.riwayat,

                      {
                        id:
                          crypto.randomUUID(),

                        status,

                        tanggal:
                          tanggalSekarang(),

                        catatan,
                      },
                    ],
                  }
                },
              ),
          }))
        },

        perbaikiBerkas: (
          nomorPermohonan,
          berkasBaru,
        ) => {
          const data =
            get().verifikasi.find(
              (item) =>
                item.nomorPermohonan ===
                nomorPermohonan,
            )

          if (!data) {
            return false
          }

          if (
            data.status !==
            'Perlu Perbaikan'
          ) {
            return false
          }

          set((state) => ({
            verifikasi:
              state.verifikasi.map(
                (item) => {
                  if (
                    item.nomorPermohonan !==
                    nomorPermohonan
                  ) {
                    return item
                  }

                  return {
                    ...item,

                    berkas:
                      berkasBaru,

                    status:
                      'Menunggu Verifikasi',

                    riwayat: [
                      ...item.riwayat,

                      {
                        id:
                          crypto.randomUUID(),

                        status:
                          'Menunggu Verifikasi',

                        tanggal:
                          tanggalSekarang(),

                        catatan:
                          'Pemohon telah mengunggah ulang berkas perbaikan. Berkas menunggu pemeriksaan ulang oleh petugas.',
                      },
                    ],
                  }
                },
              ),
          }))

          return true
        },
      }),

      {
        name:
          'pa-polewali-verifikasi',
      },
    ),
  )