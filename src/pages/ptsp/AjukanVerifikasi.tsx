import {
  CheckCircle2,
  ChevronDown,
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

import { Link } from 'react-router-dom'

import { layananPtsp } from '../../data/ptspData'
import { useVerifikasiStore } from '../../store/verifikasiStore'
import { fileToDataUrl } from '../../utils/fileToDataUrl'

import type {
  BerkasUpload,
} from '../../types/ptsp'

const MAKSIMAL_PER_FILE =
  2 * 1024 * 1024

const TIPE_DIIZINKAN = [
  'application/pdf',
  'image/jpeg',
  'image/png',
]

function formatUkuran(
  bytes: number,
) {
  const kb =
    bytes / 1024

  if (kb < 1024) {
    return `${kb.toFixed(
      2,
    )} KB`
  }

  return `${(
    kb / 1024
  ).toFixed(2)} MB`
}

export default function AjukanVerifikasi() {
  const tambahVerifikasi =
    useVerifikasiStore(
      (state) =>
        state.tambahVerifikasi,
    )

  const fileRef =
    useRef<HTMLInputElement>(
      null,
    )

  const [
    nama,
    setNama,
  ] = useState('')

  const [
    nik,
    setNik,
  ] = useState('')

  const [
    whatsapp,
    setWhatsapp,
  ] = useState('')

  const [
    email,
    setEmail,
  ] = useState('')

  const [
    alamat,
    setAlamat,
  ] = useState('')

  const [
    kota,
    setKota,
  ] = useState('')

  const [
    layananId,
    setLayananId,
  ] = useState('')

  const [
    keperluan,
    setKeperluan,
  ] = useState('')

  const [
    berkas,
    setBerkas,
  ] =
    useState<BerkasUpload[]>(
      [],
    )

  const [
    nomorBerhasil,
    setNomorBerhasil,
  ] = useState<
    string | null
  >(null)

  const [
    errorFile,
    setErrorFile,
  ] = useState('')

  const [
    sedangUpload,
    setSedangUpload,
  ] = useState(false)

  const layananDipilih =
    layananPtsp.find(
      (item) =>
        item.id ===
        layananId,
    )

  const handleFile =
    async (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const files =
        Array.from(
          event.target.files ??
            [],
        )

      event.target.value =
        ''

      setErrorFile('')

      if (
        files.length === 0
      ) {
        return
      }

      setSedangUpload(
        true,
      )

      try {
        const fileBaru: BerkasUpload[] =
          []

        for (const file of files) {
          if (
            !TIPE_DIIZINKAN.includes(
              file.type,
            )
          ) {
            setErrorFile(
              `File ${file.name} tidak didukung. Gunakan PDF, JPG, JPEG, atau PNG.`,
            )

            continue
          }

          if (
            file.size >
            MAKSIMAL_PER_FILE
          ) {
            setErrorFile(
              `File ${file.name} lebih dari 2 MB.`,
            )

            continue
          }

          const sudahAda =
            berkas.some(
              (item) =>
                item.namaFile ===
                  file.name &&
                item.ukuran ===
                  file.size,
            )

          if (sudahAda) {
            continue
          }

          const dataUrl =
            await fileToDataUrl(
              file,
            )

          fileBaru.push({
            id:
              crypto.randomUUID(),

            nama:
              file.name,

            namaFile:
              file.name,

            ukuran:
              file.size,

            tipe:
              file.type,

            dataUrl,
          })
        }

        if (
          fileBaru.length >
          0
        ) {
          setBerkas(
            (current) => [
              ...current,
              ...fileBaru,
            ],
          )
        }
      } catch (
        error
      ) {
        console.error(
          error,
        )

        setErrorFile(
          'File gagal dibaca. Silakan pilih ulang.',
        )
      } finally {
        setSedangUpload(
          false,
        )
      }
    }

  const hapusFile = (
    id: string,
  ) => {
    setBerkas(
      (current) =>
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

    setErrorFile('')

    if (
      !layananDipilih
    ) {
      return
    }

    if (
      berkas.length === 0
    ) {
      setErrorFile(
        'Minimal satu berkas harus diunggah.',
      )

      return
    }

    const hasil =
      tambahVerifikasi({
        nama:
          nama.trim(),

        nik:
          nik.trim(),

        whatsapp:
          whatsapp.trim(),

        email:
          email.trim(),

        alamat:
          alamat.trim(),

        kota:
          kota.trim(),

        layananId:
          layananDipilih.id,

        namaLayanan:
          layananDipilih.nama,

        keperluan:
          keperluan.trim(),

        berkas,
      })

    setNomorBerhasil(
      hasil.nomorPermohonan,
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (
    nomorBerhasil
  ) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle2
            size={56}
            className="mx-auto text-[#116530]"
          />

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Pengajuan Berhasil
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#17201b]">
            Berkas Menunggu Verifikasi
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            Simpan nomor permohonan berikut untuk memeriksa hasil
            verifikasi dari petugas.
          </p>

          <div className="mt-8 border-y border-slate-200 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
              Nomor Permohonan
            </p>

            <p className="mt-3 text-2xl font-extrabold text-[#116530]">
              {
                nomorBerhasil
              }
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
          Verifikasi Berkas Online
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
          Ajukan Pemeriksaan Berkas
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Lengkapi data dan unggah dokumen yang ingin diperiksa.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10"
        >
          <div className="border-y border-slate-200">
            <div className="grid gap-6 py-7 md:grid-cols-2">
              <InputField
                label="Nama Lengkap"
                value={nama}
                setValue={
                  setNama
                }
                placeholder="Nama lengkap"
              />

              <InputField
                label="NIK"
                value={nik}
                setValue={(
                  value,
                ) =>
                  setNik(
                    value
                      .replace(
                        /\D/g,
                        '',
                      )
                      .slice(
                        0,
                        16,
                      ),
                  )
                }
                placeholder="16 digit NIK"
              />
            </div>

            <div className="grid gap-6 border-t border-slate-200 py-7 md:grid-cols-2">
              <InputField
                label="Nomor WhatsApp"
                value={
                  whatsapp
                }
                setValue={
                  setWhatsapp
                }
                placeholder="08xxxxxxxxxx"
              />

              <InputField
                label="Email"
                type="email"
                required={
                  false
                }
                value={email}
                setValue={
                  setEmail
                }
                placeholder="nama@email.com"
              />
            </div>

            <div className="grid gap-6 border-t border-slate-200 py-7 md:grid-cols-2">
              <InputField
                label="Kabupaten / Kota"
                value={kota}
                setValue={
                  setKota
                }
                placeholder="Kabupaten / Kota"
              />

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Jenis Layanan
                </label>

                <div className="relative mt-2">
                  <select
                    required
                    value={
                      layananId
                    }
                    onChange={(
                      event,
                    ) =>
                      setLayananId(
                        event
                          .target
                          .value,
                      )
                    }
                    className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 outline-none focus:border-[#116530]"
                  >
                    <option value="">
                      Pilih layanan
                    </option>

                    {layananPtsp.map(
                      (item) => (
                        <option
                          key={
                            item.id
                          }
                          value={
                            item.id
                          }
                        >
                          {
                            item.nama
                          }
                        </option>
                      ),
                    )}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 py-7">
              <label className="text-sm font-bold text-slate-700">
                Alamat
              </label>

              <textarea
                required
                rows={3}
                value={
                  alamat
                }
                onChange={(
                  event,
                ) =>
                  setAlamat(
                    event
                      .target
                      .value,
                  )
                }
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 p-4 outline-none focus:border-[#116530]"
              />
            </div>

            {layananDipilih && (
              <div className="border-t border-slate-200 bg-[#f7faf8] px-5 py-6">
                <p className="font-bold text-[#17201b]">
                  Persyaratan layanan
                </p>

                <ul className="mt-3 space-y-2">
                  {layananDipilih.persyaratan.map(
                    (item) => (
                      <li
                        key={
                          item
                        }
                        className="flex gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={
                            17
                          }
                          className="mt-0.5 shrink-0 text-[#116530]"
                        />

                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            <div className="border-t border-slate-200 py-7">
              <label className="text-sm font-bold text-slate-700">
                Keperluan
              </label>

              <textarea
                required
                rows={4}
                value={
                  keperluan
                }
                onChange={(
                  event,
                ) =>
                  setKeperluan(
                    event
                      .target
                      .value,
                  )
                }
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 p-4 outline-none focus:border-[#116530]"
              />
            </div>

            {/* ============================== */}
            {/* UPLOAD */}
            {/* ============================== */}

            <div className="border-t border-slate-200 py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">
                    Upload Berkas
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PDF, JPG, JPEG,
                    atau PNG. Maksimal
                    2 MB per file.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={
                    sedangUpload
                  }
                  onClick={() =>
                    fileRef.current?.click()
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#116530] px-4 py-2.5 text-sm font-bold text-[#116530] disabled:opacity-50"
                >
                  <Upload
                    size={17}
                  />

                  {sedangUpload
                    ? 'Memproses...'
                    : 'Pilih Berkas'}
                </button>

                <input
                  ref={
                    fileRef
                  }
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={
                    handleFile
                  }
                  className="hidden"
                />
              </div>

              {errorFile && (
                <div className="mt-5 border-l-4 border-red-500 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-700">
                    {
                      errorFile
                    }
                  </p>
                </div>
              )}

              {berkas.length ===
              0 ? (
                <p className="mt-6 text-sm text-slate-400">
                  Belum ada berkas
                  yang dipilih.
                </p>
              ) : (
                <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
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
                              20
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
                              {formatUkuran(
                                item.ukuran,
                              )}
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
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
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

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              disabled={
                berkas.length ===
                  0 ||
                sedangUpload
              }
              className="rounded-lg bg-[#116530] px-7 py-3.5 text-sm font-bold !text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Kirim untuk
              Verifikasi
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

interface InputFieldProps {
  label: string
  value: string

  setValue: (
    value: string,
  ) => void

  placeholder?: string
  type?: string
  required?: boolean
}

function InputField({
  label,
  value,
  setValue,
  placeholder,
  type = 'text',
  required = true,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        required={
          required
        }
        type={type}
        value={value}
        onChange={(
          event,
        ) =>
          setValue(
            event
              .target
              .value,
          )
        }
        placeholder={
          placeholder
        }
        className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-[#116530]"
      />
    </div>
  )
}