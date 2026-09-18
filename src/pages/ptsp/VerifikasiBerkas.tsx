import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
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

// ==============================
// HELPERS
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

function formatTanggal(
  value: string,
) {
  try {
    return new Intl.DateTimeFormat(
      'id-ID',
      {
        dateStyle:
          'long',
        timeStyle:
          'short',
      },
    ).format(
      new Date(
        value,
      ),
    )
  } catch {
    return value
  }
}

function bukaBerkas(
  dataUrl?: string,
) {
  if (!dataUrl) {
    alert(
      'Isi file tidak tersedia. Berkas ini kemungkinan berasal dari pengajuan lama.',
    )

    return
  }

  const tabBaru =
    window.open(
      '',
      '_blank',
    )

  if (!tabBaru) {
    alert(
      'Browser memblokir tab baru. Izinkan pop-up untuk membuka berkas.',
    )

    return
  }

  tabBaru.location.href =
    dataUrl
}

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

  const link =
    document.createElement(
      'a',
    )

  link.href =
    dataUrl

  link.download =
    namaFile

  document.body.appendChild(
    link,
  )

  link.click()

  document.body.removeChild(
    link,
  )
}

// ==============================
// PAGE
// ==============================

export default function VerifikasiDetail() {
  const {
    id,
  } = useParams()

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
    modalPerbaikan,
    setModalPerbaikan,
  ] = useState(false)

  const [
    modalTolak,
    setModalTolak,
  ] = useState(false)

  const [
    catatan,
    setCatatan,
  ] = useState('')

  if (!data) {
    return (
      <Navigate
        to="/admin/verifikasi"
        replace
      />
    )
  }

  // ==============================
  // STATUS ACTION
  // ==============================

  const handleSesuai =
    () => {
      updateStatus(
        data.id,
        'Berkas Terverifikasi',
        'Berkas telah diperiksa dan dinyatakan lengkap. Silakan datang ke Pengadilan  dengan membawa dokumen asli.',
      )
    }

  const handlePerbaikan =
    () => {
      if (
        !catatan.trim()
      ) {
        return
      }

      updateStatus(
        data.id,
        'Perlu Perbaikan',
        catatan.trim(),
      )

      setCatatan('')
      setModalPerbaikan(
        false,
      )
    }

  const handleTolak =
    () => {
      if (
        !catatan.trim()
      ) {
        return
      }

      updateStatus(
        data.id,
        'Ditolak',
        catatan.trim(),
      )

      setCatatan('')
      setModalTolak(
        false,
      )
    }

  // ==============================
  // RENDER
  // ==============================

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

      <div className="mt-5 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#116530]">
            Detail Verifikasi
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
            {
              data.nomorPermohonan
            }
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {formatTanggal(
              data.tanggalPengajuan,
            )}
          </p>
        </div>

        <StatusBadge
          status={
            data.status
          }
        />
      </div>

      {/* ============================== */}
      {/* GRID */}
      {/* ============================== */}

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        {/* ============================== */}
        {/* LEFT */}
        {/* ============================== */}

        <div className="space-y-6">
          {/* ============================== */}
          {/* DATA PEMOHON */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Data Pemohon
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <InfoItem
                icon={User}
                label="Nama"
                value={
                  data.nama
                }
              />

              <InfoItem
                icon={User}
                label="NIK"
                value={
                  data.nik
                }
              />

              <InfoItem
                icon={Phone}
                label="WhatsApp"
                value={
                  data.whatsapp
                }
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value={
                  data.email ||
                  '-'
                }
              />

              <InfoItem
                icon={MapPin}
                label="Kabupaten / Kota"
                value={
                  data.kota
                }
              />

              <InfoItem
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

          <section className="border border-slate-200 bg-white p-5">
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

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {
                  data.keperluan
                }
              </p>
            </div>
          </section>

          {/* ============================== */}
          {/* BERKAS PEMOHON */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-5">
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
              <div className="px-5 py-10 text-center">
                <FileText
                  size={34}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-400">
                  Belum ada
                  berkas.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {data.berkas.map(
                  (berkas) => (
                    <div
                      key={
                        berkas.id
                      }
                      className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* FILE INFO */}

                      <button
                        type="button"
                        onClick={() =>
                          bukaBerkas(
                            berkas.dataUrl,
                          )
                        }
                        disabled={
                          !berkas.dataUrl
                        }
                        className="group flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-not-allowed"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf7f1]">
                          <FileText
                            size={20}
                            className="text-[#116530]"
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm font-bold transition ${
                              berkas.dataUrl
                                ? 'text-[#17201b] group-hover:text-[#116530] group-hover:underline'
                                : 'text-slate-400'
                            }`}
                          >
                            {
                              berkas.namaFile
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatUkuranFile(
                              berkas.ukuran,
                            )}

                            {' • '}

                            {
                              berkas.tipe
                            }
                          </p>

                          {!berkas.dataUrl && (
                            <p className="mt-1 text-xs font-semibold text-amber-600">
                              Isi file
                              tidak
                              tersedia
                            </p>
                          )}
                        </div>
                      </button>

                      {/* ACTION */}

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            bukaBerkas(
                              berkas.dataUrl,
                            )
                          }
                          disabled={
                            !berkas.dataUrl
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
                          onClick={() =>
                            unduhBerkas(
                              berkas.dataUrl,
                              berkas.namaFile,
                            )
                          }
                          disabled={
                            !berkas.dataUrl
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
          {/* TINDAKAN PETUGAS */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Tindakan Petugas
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tentukan hasil
              pemeriksaan berkas
              pemohon.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={
                  handleSesuai
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
                onClick={() => {
                  setCatatan(
                    '',
                  )

                  setModalPerbaikan(
                    true,
                  )
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-400 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
              >
                <AlertCircle
                  size={18}
                />

                Perlu Perbaikan
              </button>

              <button
                type="button"
                onClick={() => {
                  setCatatan(
                    '',
                  )

                  setModalTolak(
                    true,
                  )
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <XCircle
                  size={18}
                />

                Tolak Pengajuan
              </button>
            </div>
          </section>

          {/* ============================== */}
          {/* RIWAYAT */}
          {/* ============================== */}

          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-extrabold text-[#17201b]">
              Riwayat Verifikasi
            </h2>

            <div className="mt-6">
              {data.riwayat.length ===
              0 ? (
                <p className="text-sm text-slate-400">
                  Belum ada
                  riwayat.
                </p>
              ) : (
                <div className="space-y-0">
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
                        {index <
                          data
                            .riwayat
                            .length -
                            1 && (
                          <div className="absolute left-[5px] top-4 h-full w-px bg-slate-200" />
                        )}

                        <div className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#116530]" />

                        <div>
                          <p className="text-sm font-bold text-[#17201b]">
                            {
                              item.status
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatTanggal(
                              item.tanggal,
                            )}
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-500">
                            {
                              item.catatan
                            }
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ============================== */}
      {/* MODAL PERBAIKAN */}
      {/* ============================== */}

      {modalPerbaikan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              Berkas Perlu
              Perbaikan
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tuliskan bagian
              berkas yang harus
              diperbaiki oleh
              pemohon.
            </p>

            <textarea
              value={
                catatan
              }
              onChange={(
                event,
              ) =>
                setCatatan(
                  event
                    .target
                    .value,
                )
              }
              rows={5}
              placeholder="Contoh: Mohon unggah ulang KTP dengan gambar yang lebih jelas."
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none focus:border-orange-500"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalPerbaikan(
                    false,
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
                disabled={
                  !catatan.trim()
                }
                onClick={
                  handlePerbaikan
                }
                className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold !text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Kirim Catatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================== */}
      {/* MODAL TOLAK */}
      {/* ============================== */}

      {modalTolak && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              Tolak Pengajuan
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tuliskan alasan
              penolakan agar dapat
              diketahui pemohon.
            </p>

            <textarea
              value={
                catatan
              }
              onChange={(
                event,
              ) =>
                setCatatan(
                  event
                    .target
                    .value,
                )
              }
              rows={5}
              placeholder="Masukkan alasan penolakan..."
              className="mt-5 w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none focus:border-red-500"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalTolak(
                    false,
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
                disabled={
                  !catatan.trim()
                }
                onClick={
                  handleTolak
                }
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold !text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Tolak Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==============================
// INFO ITEM
// ==============================

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <Icon
        size={18}
        className="mt-1 shrink-0 text-[#116530]"
      />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-[#17201b]">
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
    'Berkas Terverifikasi'
  ) {
    style =
      'bg-emerald-50 text-emerald-700'
  }

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
    'Ditolak'
  ) {
    style =
      'bg-red-50 text-red-700'
  }

  return (
    <span
      className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold ${style}`}
    >
      {status}
    </span>
  )
}