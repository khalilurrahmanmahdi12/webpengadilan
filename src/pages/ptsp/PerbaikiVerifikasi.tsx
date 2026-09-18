import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Upload,
  X,
} from 'lucide-react'

import {
  useRef,
  useState,
} from 'react'

import type {
  ChangeEvent,
  FormEvent,
} from 'react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { useVerifikasiStore } from '../../store/verifikasiStore'

import type {
  BerkasUpload,
} from '../../types/ptsp'

export default function PerbaikiVerifikasi() {
  const {
    nomorPermohonan,
  } = useParams()

  const fileRef =
    useRef<HTMLInputElement>(
      null,
    )

  const verifikasi =
    useVerifikasiStore(
      (state) =>
        state.verifikasi,
    )

  const perbaikiBerkas =
    useVerifikasiStore(
      (state) =>
        state.perbaikiBerkas,
    )

  const data =
    verifikasi.find(
      (item) =>
        item.nomorPermohonan ===
        nomorPermohonan,
    )

  const [
    berkas,
    setBerkas,
  ] =
    useState<BerkasUpload[]>(
      data?.berkas ?? [],
    )

  const [
    berhasil,
    setBerhasil,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState('')

  if (!data) {
    return (
      <Navigate
        to="/ptsp/verifikasi/lacak"
        replace
      />
    )
  }

  if (
    data.status !==
      'Perlu Perbaikan' &&
    !berhasil
  ) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="border-y border-slate-200 py-10">
            <AlertCircle
              size={42}
              className="text-amber-600"
            />

            <h1 className="mt-5 text-2xl font-extrabold text-[#17201b]">
              Berkas Tidak Dapat Diperbaiki
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              Pengajuan ini tidak sedang
              berstatus Perlu Perbaikan.
            </p>

            <Link
              to="/ptsp/verifikasi/lacak"
              className="mt-6 inline-flex rounded-lg bg-[#116530] px-5 py-3 text-sm font-bold !text-white"
            >
              Kembali ke Pelacakan
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const riwayatTerakhir =
    data.riwayat[
      data.riwayat.length - 1
    ]

  const handleFile = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files =
      Array.from(
        event.target.files ??
          [],
      )

    const fileBaru =
      files.map((file) => ({
        id:
          crypto.randomUUID(),

        nama:
          file.name,

        namaFile:
          file.name,

        ukuran:
          file.size,

        tipe:
          file.type ||
          'application/octet-stream',
      }))

    setBerkas((current) => [
      ...current,
      ...fileBaru,
    ])

    event.target.value = ''
  }

  const hapusFile = (
    id: string,
  ) => {
    setBerkas((current) =>
      current.filter(
        (item) =>
          item.id !== id,
      ),
    )
  }

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    setError('')

    if (
      berkas.length === 0
    ) {
      setError(
        'Minimal satu berkas harus diunggah.',
      )

      return
    }

    const sukses =
      perbaikiBerkas(
        data.nomorPermohonan,
        berkas,
      )

    if (!sukses) {
      setError(
        'Berkas tidak dapat dikirim ulang.',
      )

      return
    }

    setBerhasil(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (berhasil) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle2
            size={56}
            className="mx-auto text-[#116530]"
          />

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Berkas Berhasil Dikirim
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#17201b]">
            Perbaikan Berhasil Diunggah
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            Berkas Anda telah
            dikirim ulang dan
            sekarang menunggu
            pemeriksaan kembali
            oleh petugas.
          </p>

          <div className="mt-8 border-y border-slate-200 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Nomor Permohonan
            </p>

            <p className="mt-3 text-2xl font-extrabold text-[#116530]">
              {
                data.nomorPermohonan
              }
            </p>

            <p className="mt-3 text-sm font-bold text-amber-700">
              Menunggu Verifikasi
            </p>
          </div>

          <Link
            to="/ptsp/verifikasi/lacak"
            className="mt-8 inline-flex rounded-lg bg-[#116530] px-6 py-3 text-sm font-bold !text-white"
          >
            Lacak Verifikasi
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/ptsp/verifikasi/lacak"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft size={17} />

          Kembali
        </Link>

        <div className="mt-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Perbaikan Berkas
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
            Unggah Ulang Berkas
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Perbaiki berkas sesuai
            catatan yang diberikan
            oleh petugas.
          </p>
        </div>

        {/* INFO */}
        <div className="mt-9 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nomor Permohonan
            </p>

            <p className="mt-2 font-extrabold text-[#17201b]">
              {
                data.nomorPermohonan
              }
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Layanan
            </p>

            <p className="mt-2 font-extrabold text-[#17201b]">
              {
                data.namaLayanan
              }
            </p>
          </div>
        </div>

        {/* CATATAN ADMIN */}
        <div className="mt-8 border-l-4 border-orange-500 bg-orange-50 px-5 py-5">
          <div className="flex gap-3">
            <AlertCircle
              size={21}
              className="mt-0.5 shrink-0 text-orange-600"
            />

            <div>
              <p className="font-bold text-orange-800">
                Catatan Petugas
              </p>

              <p className="mt-2 text-sm leading-7 text-orange-700">
                {
                  riwayatTerakhir?.catatan
                }
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10"
        >
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#17201b]">
                  Berkas
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Hapus berkas yang
                  salah lalu unggah
                  dokumen penggantinya.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  fileRef.current?.click()
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#116530] px-4 py-2.5 text-sm font-bold text-[#116530]"
              >
                <Upload size={17} />

                Tambah Berkas
              </button>

              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={
                  handleFile
                }
                className="hidden"
              />
            </div>

            {/* FILE LIST */}
            <div className="mt-6 border-y border-slate-200">
              {berkas.length === 0 ? (
                <div className="py-10 text-center">
                  <FileText
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    Belum ada berkas.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {berkas.map(
                    (item) => (
                      <div
                        key={
                          item.id
                        }
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <FileText
                            size={
                              21
                            }
                            className="shrink-0 text-[#116530]"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#17201b]">
                              {
                                item.namaFile
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {(
                                item.ukuran /
                                1024 /
                                1024
                              ).toFixed(
                                2,
                              )}{' '}
                              MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            hapusFile(
                              item.id,
                            )
                          }
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Hapus berkas"
                        >
                          <X
                            size={
                              18
                            }
                          />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-5 border-l-4 border-red-500 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              disabled={
                berkas.length === 0
              }
              className="rounded-lg bg-[#116530] px-7 py-3.5 text-sm font-bold !text-white transition hover:bg-[#0d4e28] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Kirim Ulang Berkas
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}