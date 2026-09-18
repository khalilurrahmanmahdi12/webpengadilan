import {
  CheckCircle2,
  CircleAlert,
  Search,
  Upload,
  XCircle,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import type {
  FormEvent,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { useVerifikasiStore } from '../../store/verifikasiStore'

import type {
  VerifikasiBerkas,
} from '../../types/ptsp'

export default function LacakVerifikasi() {
  const verifikasi =
    useVerifikasiStore(
      (state) =>
        state.verifikasi,
    )

  const cariVerifikasi =
    useVerifikasiStore(
      (state) =>
        state.cariVerifikasi,
    )

  const [
    nomor,
    setNomor,
  ] = useState('')

  const [
    nomorDicari,
    setNomorDicari,
  ] = useState('')

  const [
    hasil,
    setHasil,
  ] =
    useState<VerifikasiBerkas | null>(
      null,
    )

  const [
    sudahCari,
    setSudahCari,
  ] = useState(false)

  /*
   * Perbarui hasil apabila
   * store berubah.
   */
  useEffect(() => {
    if (!nomorDicari) {
      return
    }

    const data =
      verifikasi.find(
        (item) =>
          item.nomorPermohonan
            .toLowerCase()
            .trim() ===
          nomorDicari
            .toLowerCase()
            .trim(),
      )

    setHasil(
      data ?? null,
    )
  }, [
    verifikasi,
    nomorDicari,
  ])

  /*
   * Sinkronisasi antar tab.
   */
  useEffect(() => {
    const sinkronkan =
      (
        event: StorageEvent,
      ) => {
        if (
          event.key ===
          'pa-polewali-verifikasi'
        ) {
          useVerifikasiStore
            .persist
            .rehydrate()
        }
      }

    window.addEventListener(
      'storage',
      sinkronkan,
    )

    return () => {
      window.removeEventListener(
        'storage',
        sinkronkan,
      )
    }
  }, [])

  /*
   * Refresh Zustand ketika
   * kembali ke tab.
   */
  useEffect(() => {
    const handleFocus = () => {
      useVerifikasiStore
        .persist
        .rehydrate()
    }

    window.addEventListener(
      'focus',
      handleFocus,
    )

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus,
      )
    }
  }, [])

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    const nomorBersih =
      nomor
        .trim()
        .toUpperCase()

    const data =
      cariVerifikasi(
        nomorBersih,
      )

    setNomorDicari(
      nomorBersih,
    )

    setHasil(
      data ?? null,
    )

    setSudahCari(true)
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
          Verifikasi Berkas
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
          Lacak Verifikasi
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Masukkan nomor permohonan
          untuk melihat hasil
          pemeriksaan berkas.
        </p>

        {/* SEARCH */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              required
              value={nomor}
              onChange={(event) =>
                setNomor(
                  event.target.value.toUpperCase(),
                )
              }
              placeholder="Contoh: VRF-2026-0001"
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 font-medium outline-none transition focus:border-[#116530]"
            />
          </div>

          <button
            type="submit"
            className="h-12 rounded-lg bg-[#116530] px-7 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
          >
            Lacak
          </button>
        </form>

        {/* NOT FOUND */}
        {sudahCari &&
          !hasil && (
            <div className="mt-9 max-w-2xl border-y border-slate-200 py-7">
              <p className="font-bold text-[#17201b]">
                Permohonan tidak ditemukan.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Periksa kembali nomor
                permohonan yang Anda
                masukkan.
              </p>
            </div>
          )}

        {/* RESULT */}
        {hasil && (
          <div className="mt-10">
            <div className="grid gap-7 border-y border-slate-200 py-7 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nomor Permohonan
                </p>

                <p className="mt-2 font-extrabold text-[#17201b]">
                  {
                    hasil.nomorPermohonan
                  }
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Layanan
                </p>

                <p className="mt-2 font-extrabold text-[#17201b]">
                  {
                    hasil.namaLayanan
                  }
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>

                <StatusText
                  status={
                    hasil.status
                  }
                />
              </div>
            </div>

            {/* STATUS MESSAGE */}
            <StatusMessage
              data={hasil}
            />

            {/* HISTORY */}
            <div className="mt-10">
              <h2 className="text-2xl font-extrabold text-[#17201b]">
                Riwayat Pemeriksaan
              </h2>

              <div className="mt-6">
                {hasil.riwayat.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="relative flex gap-4 pb-8 last:pb-0"
                    >
                      {index !==
                        hasil
                          .riwayat
                          .length -
                          1 && (
                        <div className="absolute left-[9px] top-6 h-[calc(100%-12px)] w-px bg-slate-200" />
                      )}

                      <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                        <CheckCircle2
                          size={
                            18
                          }
                          className="text-[#116530]"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-[#17201b]">
                          {
                            item.status
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            item.tanggal
                          }
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                          {
                            item.catatan
                          }
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function StatusText({
  status,
}: {
  status: string
}) {
  let className =
    'text-slate-700'

  if (
    status ===
    'Menunggu Verifikasi'
  ) {
    className =
      'text-amber-700'
  }

  if (
    status ===
    'Perlu Perbaikan'
  ) {
    className =
      'text-orange-700'
  }

  if (
    status ===
    'Berkas Terverifikasi'
  ) {
    className =
      'text-[#116530]'
  }

  if (
    status ===
    'Ditolak'
  ) {
    className =
      'text-red-700'
  }

  return (
    <p
      className={`mt-2 font-extrabold ${className}`}
    >
      {status}
    </p>
  )
}

function StatusMessage({
  data,
}: {
  data: VerifikasiBerkas
}) {
  const riwayatTerakhir =
    data.riwayat[
      data.riwayat.length - 1
    ]

  /*
   * PERLU PERBAIKAN
   */
  if (
    data.status ===
    'Perlu Perbaikan'
  ) {
    return (
      <div className="mt-8 border-l-4 border-orange-500 bg-orange-50 px-5 py-5">
        <div className="flex gap-3">
          <CircleAlert
            size={21}
            className="mt-0.5 shrink-0 text-orange-600"
          />

          <div className="flex-1">
            <p className="font-bold text-orange-800">
              Berkas perlu diperbaiki
            </p>

            <p className="mt-2 text-sm leading-7 text-orange-700">
              {
                riwayatTerakhir?.catatan
              }
            </p>

            <p className="mt-3 text-xs text-orange-600">
              Perbaiki dokumen sesuai
              catatan petugas kemudian
              kirim ulang untuk
              diperiksa kembali.
            </p>

            <Link
              to={`/ptsp/verifikasi/perbaiki/${data.nomorPermohonan}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#116530] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
            >
              <Upload
                size={17}
              />

              Unggah Ulang Berkas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /*
   * TERVERIFIKASI
   */
  if (
    data.status ===
    'Berkas Terverifikasi'
  ) {
    return (
      <div className="mt-8 border-l-4 border-[#116530] bg-[#edf7f1] px-5 py-5">
        <div className="flex gap-3">
          <CheckCircle2
            size={21}
            className="mt-0.5 shrink-0 text-[#116530]"
          />

          <div>
            <p className="font-bold text-[#116530]">
              Berkas telah terverifikasi
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {
                riwayatTerakhir?.catatan
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  /*
   * DITOLAK
   */
  if (
    data.status ===
    'Ditolak'
  ) {
    return (
      <div className="mt-8 border-l-4 border-red-500 bg-red-50 px-5 py-5">
        <div className="flex gap-3">
          <XCircle
            size={21}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <p className="font-bold text-red-800">
              Pengajuan ditolak
            </p>

            <p className="mt-2 text-sm leading-7 text-red-700">
              {
                riwayatTerakhir?.catatan
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}