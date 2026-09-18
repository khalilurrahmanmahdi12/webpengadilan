import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  UserRound,
  XCircle,
} from 'lucide-react'

import {
  useState,
} from 'react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { useVerifikasiStore } from '../../store/verifikasiStore'

import type {
  StatusVerifikasi,
} from '../../types/ptsp'

// ==============================
// FORMAT UKURAN FILE
// ==============================

function formatUkuranFile(
  bytes: number,
) {
  if (!bytes) {
    return '0 KB'
  }

  const kb =
    bytes / 1024

  if (kb < 1024) {
    return `${kb.toFixed(
      2,
    )} KB`
  }

  const mb =
    kb / 1024

  return `${mb.toFixed(
    2,
  )} MB`
}

// ==============================
// DATA URL -> BLOB
// ==============================

function dataUrlKeBlob(
  dataUrl: string,
) {
  const bagian =
    dataUrl.split(',')

  if (
    bagian.length < 2
  ) {
    throw new Error(
      'Format file tidak valid.',
    )
  }

  const header =
    bagian[0]

  const base64 =
    bagian.slice(1).join(',')

  const mimeMatch =
    header.match(
      /data:([^;]+);base64/,
    )

  if (!mimeMatch) {
    throw new Error(
      'Tipe file tidak dapat dikenali.',
    )
  }

  const mimeType =
    mimeMatch[1]

  const binary =
    atob(base64)

  const bytes =
    new Uint8Array(
      binary.length,
    )

  for (
    let index = 0;
    index <
    binary.length;
    index += 1
  ) {
    bytes[index] =
      binary.charCodeAt(
        index,
      )
  }

  return new Blob(
    [bytes],
    {
      type: mimeType,
    },
  )
}

// ==============================
// LIHAT FILE
// ==============================

function bukaBerkas(
  dataUrl?: string,
) {
  if (!dataUrl) {
    alert(
      'Isi file tidak tersedia. Berkas ini kemungkinan berasal dari pengajuan lama.',
    )

    return
  }

  try {
    const blob =
      dataUrlKeBlob(
        dataUrl,
      )

    const blobUrl =
      URL.createObjectURL(
        blob,
      )

    const tabBaru =
      window.open(
        blobUrl,
        '_blank',
        'noopener,noreferrer',
      )

    if (!tabBaru) {
      URL.revokeObjectURL(
        blobUrl,
      )

      alert(
        'Browser memblokir tab baru. Izinkan pop-up untuk membuka berkas.',
      )

      return
    }

    // Jangan langsung revoke.
    // Browser masih membutuhkan URL
    // untuk memuat file.
    window.setTimeout(
      () => {
        URL.revokeObjectURL(
          blobUrl,
        )
      },
      60_000,
    )
  } catch (
    error
  ) {
    console.error(
      'Gagal membuka berkas:',
      error,
    )

    alert(
      'Berkas tidak dapat dibuka. Silakan coba unduh file.',
    )
  }
}

// ==============================
// UNDUH FILE
// ==============================

function unduhBerkas(
  dataUrl: string | undefined,
  namaFile: string,
) {
  if (!dataUrl) {
    alert(
      'Isi file tidak tersedia.',
    )

    return
  }

  try {
    const blob =
      dataUrlKeBlob(
        dataUrl,
      )

    const blobUrl =
      URL.createObjectURL(
        blob,
      )

    const link =
      document.createElement(
        'a',
      )

    link.href =
      blobUrl

    link.download =
      namaFile

    document.body.appendChild(
      link,
    )

    link.click()

    document.body.removeChild(
      link,
    )

    window.setTimeout(
      () => {
        URL.revokeObjectURL(
          blobUrl,
        )
      },
      1000,
    )
  } catch (
    error
  ) {
    console.error(
      'Gagal mengunduh berkas:',
      error,
    )

    alert(
      'Berkas gagal diunduh.',
    )
  }
}

// ==============================
// PAGE
// ==============================

export default function VerifikasiDetail() {
  const { id } =
    useParams()

  const verifikasi =
    useVerifikasiStore(
      (state) =>
        state.verifikasi,
    )

  const updateStatus =
    useVerifikasiStore(
      (state) =>
        state.updateStatus,
    )

  const data =
    verifikasi.find(
      (item) =>
        item.id === id,
    )

  const [
    catatan,
    setCatatan,
  ] = useState('')

  const [
    modalStatus,
    setModalStatus,
  ] =
    useState<StatusVerifikasi | null>(
      null,
    )

  if (!data) {
    return (
      <Navigate
        to="/admin/verifikasi"
        replace
      />
    )
  }

  // ==============================
  // UPDATE STATUS
  // ==============================

  const submitStatus = () => {
    if (!modalStatus) {
      return
    }

    if (
      modalStatus !==
        'Berkas Terverifikasi' &&
      !catatan.trim()
    ) {
      return
    }

    const catatanFinal =
      catatan.trim() ||
      'Berkas telah diperiksa dan dinyatakan lengkap. Silakan datang ke Pengadilan  dengan membawa dokumen asli.'

    updateStatus(
      data.id,
      modalStatus,
      catatanFinal,
    )

    setModalStatus(null)
    setCatatan('')
  }

  return (
    <div>
      {/* ============================== */}
      {/* BACK */}
      {/* ============================== */}

      <Link
        to="/admin/verifikasi"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
      >
        <ArrowLeft
          size={17}
        />

        Kembali
      </Link>

      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div className="mt-6 flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#116530]">
            Detail Verifikasi
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
            {
              data.nomorPermohonan
            }
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {
              data.tanggalPengajuan
            }
          </p>
        </div>

        <StatusBadge
          status={
            data.status
          }
        />
      </div>

      {/* ============================== */}
      {/* CONTENT */}
      {/* ============================== */}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {/* ============================== */}
        {/* LEFT */}
        {/* ============================== */}

        <div className="space-y-6">
          {/* ============================== */}
          {/* PEMOHON */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Data Pemohon
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Info
                icon={UserRound}
                label="Nama"
                value={
                  data.nama
                }
              />

              <Info
                icon={UserRound}
                label="NIK"
                value={
                  data.nik
                }
              />

              <Info
                icon={Phone}
                label="WhatsApp"
                value={
                  data.whatsapp
                }
              />

              <Info
                icon={Mail}
                label="Email"
                value={
                  data.email ||
                  '-'
                }
              />

              <Info
                icon={MapPin}
                label="Kabupaten / Kota"
                value={
                  data.kota
                }
              />

              <Info
                icon={MapPin}
                label="Alamat"
                value={
                  data.alamat
                }
              />
            </div>
          </section>

          {/* ============================== */}
          {/* LAYANAN */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Layanan
            </h2>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jenis Layanan
              </p>

              <p className="mt-2 font-bold text-[#17201b]">
                {
                  data.namaLayanan
                }
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Keperluan
              </p>

              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                {
                  data.keperluan
                }
              </p>
            </div>
          </section>

          {/* ============================== */}
          {/* BERKAS */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-extrabold text-[#17201b]">
                Berkas Pemohon
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {
                  data.berkas.length
                }{' '}
                berkas diunggah.
              </p>
            </div>

            {data.berkas.length ===
            0 ? (
              <div className="px-6 py-10 text-center">
                <FileText
                  size={34}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-400">
                  Belum ada berkas.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {data.berkas.map(
                  (file) => (
                    <div
                      key={
                        file.id
                      }
                      className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* INFO FILE */}

                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf7f1]">
                          <FileText
                            size={
                              21
                            }
                            className="text-[#116530]"
                          />
                        </div>

                        <div className="min-w-0">
                          <button
                            type="button"
                            disabled={
                              !file.dataUrl
                            }
                            onClick={() =>
                              bukaBerkas(
                                file.dataUrl,
                              )
                            }
                            className="block max-w-full truncate text-left text-sm font-bold text-[#17201b] transition hover:text-[#116530] hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
                          >
                            {
                              file.namaFile
                            }
                          </button>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatUkuranFile(
                              file.ukuran,
                            )}

                            {' • '}

                            {
                              file.tipe
                            }
                          </p>

                          {!file.dataUrl && (
                            <p className="mt-1 text-xs font-semibold text-amber-600">
                              Isi file tidak tersedia
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ACTION */}

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={
                            !file.dataUrl
                          }
                          onClick={() =>
                            bukaBerkas(
                              file.dataUrl,
                            )
                          }
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#116530] px-4 text-sm font-bold text-[#116530] transition hover:bg-[#edf7f1] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          <Eye
                            size={16}
                          />

                          Lihat
                        </button>

                        <button
                          type="button"
                          disabled={
                            !file.dataUrl
                          }
                          onClick={() =>
                            unduhBerkas(
                              file.dataUrl,
                              file.namaFile,
                            )
                          }
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#116530] px-4 text-sm font-bold !text-white transition hover:bg-[#0d4e28] disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          <Download
                            size={16}
                          />

                          Unduh
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        </div>

        {/* ============================== */}
        {/* RIGHT */}
        {/* ============================== */}

        <div className="space-y-6">
          {/* ============================== */}
          {/* ACTION */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Tindakan Petugas
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tentukan hasil pemeriksaan berkas pemohon.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() =>
                  setModalStatus(
                    'Berkas Terverifikasi',
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#116530] px-4 py-3 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
              >
                <CheckCircle2
                  size={18}
                />

                Berkas Sesuai
              </button>

              <button
                type="button"
                onClick={() =>
                  setModalStatus(
                    'Perlu Perbaikan',
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700"
              >
                Perlu Perbaikan
              </button>

              <button
                type="button"
                onClick={() =>
                  setModalStatus(
                    'Ditolak',
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
              >
                <XCircle
                  size={18}
                />

                Tolak Pengajuan
              </button>
            </div>
          </section>

          {/* ============================== */}
          {/* HISTORY */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Riwayat Verifikasi
            </h2>

            <div className="mt-6">
              {data.riwayat.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={
                      item.id
                    }
                    className="relative flex gap-4 pb-7 last:pb-0"
                  >
                    {index !==
                      data.riwayat
                        .length -
                        1 && (
                      <div className="absolute left-[8px] top-5 h-[calc(100%-10px)] w-px bg-slate-200" />
                    )}

                    <div className="relative z-10 mt-1 h-[17px] w-[17px] shrink-0 rounded-full border-4 border-white bg-[#116530]" />

                    <div>
                      <p className="text-sm font-bold text-[#17201b]">
                        {
                          item.status
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {
                          item.tanggal
                        }
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {
                          item.catatan
                        }
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ============================== */}
      {/* MODAL */}
      {/* ============================== */}

      {modalStatus && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              {
                modalStatus
              }
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tambahkan catatan untuk pemohon.
            </p>

            <textarea
              value={
                catatan
              }
              onChange={(
                event,
              ) =>
                setCatatan(
                  event.target.value,
                )
              }
              rows={5}
              placeholder={
                modalStatus ===
                'Berkas Terverifikasi'
                  ? 'Opsional. Pesan default akan digunakan jika kosong.'
                  : 'Tuliskan alasan atau bagian yang perlu diperbaiki...'
              }
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none focus:border-[#116530]"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalStatus(
                    null,
                  )

                  setCatatan(
                    '',
                  )
                }}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={
                  submitStatus
                }
                className="rounded-lg bg-[#116530] px-5 py-2.5 text-sm font-bold !text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==============================
// INFO
// ==============================

interface InfoProps {
  icon: typeof UserRound
  label: string
  value: string
}

function Info({
  icon: Icon,
  label,
  value,
}: InfoProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={18}
        className="mt-0.5 shrink-0 text-[#116530]"
      />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-[#17201b]">
          {value}
        </p>
      </div>
    </div>
  )
}

// ==============================
// STATUS BADGE
// ==============================

function StatusBadge({
  status,
}: {
  status: string
}) {
  let style =
    'bg-slate-100 text-slate-600'

  if (
    status ===
    'Menunggu Verifikasi'
  ) {
    style =
      'bg-amber-50 text-amber-700'
  }

  if (
    status ===
    'Perlu Perbaikan'
  ) {
    style =
      'bg-orange-50 text-orange-700'
  }

  if (
    status ===
    'Berkas Terverifikasi'
  ) {
    style =
      'bg-emerald-50 text-emerald-700'
  }

  if (
    status ===
    'Ditolak'
  ) {
    style =
      'bg-red-50 text-red-700'
  }

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${style}`}
    >
      {status}
    </span>
  )
}