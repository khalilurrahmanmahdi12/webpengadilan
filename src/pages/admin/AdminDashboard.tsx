import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileWarning,
  ListOrdered,
  Users,
} from 'lucide-react'

import { useAntreanStore } from '../../store/antreanStore'
import { useVerifikasiStore } from '../../store/verifikasiStore'

export default function AdminDashboard() {
  const verifikasi =
    useVerifikasiStore(
      (state) =>
        state.verifikasi,
    )

  const antrean =
    useAntreanStore(
      (state) =>
        state.antrean,
    )

  const nomorSedangDilayani =
    useAntreanStore(
      (state) =>
        state.nomorSedangDilayani,
    )

  const menungguVerifikasi =
    verifikasi.filter(
      (item) =>
        item.status ===
        'Menunggu Verifikasi',
    ).length

  const perluPerbaikan =
    verifikasi.filter(
      (item) =>
        item.status ===
        'Perlu Perbaikan',
    ).length

  const terverifikasi =
    verifikasi.filter(
      (item) =>
        item.status ===
        'Berkas Terverifikasi',
    ).length

  const antreanMenunggu =
    antrean.filter(
      (item) =>
        item.status ===
        'Menunggu',
    ).length

  const statCards = [
    {
      title:
        'Menunggu Verifikasi',

      value:
        menungguVerifikasi,

      description:
        'Pengajuan belum diperiksa.',

      icon:
        ClipboardCheck,
    },
    {
      title:
        'Perlu Perbaikan',

      value:
        perluPerbaikan,

      description:
        'Berkas perlu diperbaiki pemohon.',

      icon:
        FileWarning,
    },
    {
      title:
        'Berkas Terverifikasi',

      value:
        terverifikasi,

      description:
        'Berkas telah dinyatakan sesuai.',

      icon:
        CheckCircle2,
    },
    {
      title:
        'Antrean Menunggu',

      value:
        antreanMenunggu,

      description:
        'Antrean yang belum dilayani.',

      icon:
        Users,
    },
  ]

  const verifikasiTerbaru =
    verifikasi.slice(
      0,
      5,
    )

  return (
    <div>
      {/* HEADER */}
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#116530]">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
          Ringkasan PTSP
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Pantau verifikasi
          berkas dan pelayanan
          antrean PTSP.
        </p>
      </div>

      {/* STAT */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(
          (item) => {
            const Icon =
              item.icon

            return (
              <div
                key={
                  item.title
                }
                className="border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {
                        item.title
                      }
                    </p>

                    <p className="mt-3 text-3xl font-extrabold text-[#17201b]">
                      {
                        item.value
                      }
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf7f1] text-[#116530]">
                    <Icon
                      size={
                        20
                      }
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-400">
                  {
                    item.description
                  }
                </p>
              </div>
            )
          },
        )}
      </div>

      {/* ANTREAN */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <ListOrdered
              size={21}
              className="text-[#116530]"
            />

            <h2 className="font-extrabold text-[#17201b]">
              Antrean Hari Ini
            </h2>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Sedang Dilayani
            </p>

            <p className="mt-3 text-5xl font-extrabold text-[#116530]">
              {nomorSedangDilayani >
              0
                ? `A-${String(
                    nomorSedangDilayani,
                  ).padStart(
                    3,
                    '0',
                  )}`
                : '--'}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 border-t border-slate-200 pt-5">
            <div>
              <p className="text-xs text-slate-400">
                Total
              </p>

              <p className="mt-1 text-xl font-extrabold">
                {
                  antrean.length
                }
              </p>
            </div>

            <div className="border-l border-slate-200 pl-5">
              <p className="text-xs text-slate-400">
                Menunggu
              </p>

              <p className="mt-1 text-xl font-extrabold">
                {
                  antreanMenunggu
                }
              </p>
            </div>
          </div>
        </div>

        {/* VERIFIKASI TERBARU */}
        <div className="border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="font-extrabold text-[#17201b]">
                Verifikasi Terbaru
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Lima pengajuan terbaru.
              </p>
            </div>
          </div>

          {verifikasiTerbaru.length ===
          0 ? (
            <div className="px-6 py-12 text-center">
              <Clock3
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                Belum ada pengajuan.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {verifikasiTerbaru.map(
                (item) => (
                  <div
                    key={
                      item.id
                    }
                    className="grid gap-3 px-6 py-4 sm:grid-cols-[1fr_170px_150px] sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#17201b]">
                        {
                          item.nama
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {
                          item.nomorPermohonan
                        }
                      </p>
                    </div>

                    <p className="text-sm text-slate-500">
                      {
                        item.namaLayanan
                      }
                    </p>

                    <p className="text-sm font-semibold text-[#116530]">
                      {
                        item.status
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}