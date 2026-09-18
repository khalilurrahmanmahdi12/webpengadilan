import {
  ArrowLeft,
  Calculator,
  CircleAlert,
  MapPin,
  ReceiptText,
  RotateCcw,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import { useBiayaPerkaraStore } from '../../store/biayaPerkaraStore'

// ==============================
// HELPER
// ==============================

function formatRupiah(
  value: number,
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    },
  ).format(value)
}

export default function KalkulatorBiayaPerkara() {
  // ==============================
  // STORE
  // ==============================

  const jenisPerkara =
    useBiayaPerkaraStore(
      (state) =>
        state.jenisPerkara,
    )

  const tarifWilayah =
    useBiayaPerkaraStore(
      (state) =>
        state.tarifWilayah,
    )

  // ==============================
  // DATA AKTIF
  // ==============================

  const jenisPerkaraAktif =
    useMemo(
      () =>
        jenisPerkara.filter(
          (item) =>
            item.aktif,
        ),
      [jenisPerkara],
    )

  const wilayahAktif =
    useMemo(
      () =>
        tarifWilayah.filter(
          (item) =>
            item.aktif,
        ),
      [tarifWilayah],
    )

  // ==============================
  // STATE
  // ==============================

  const [
    jenisPerkaraId,
    setJenisPerkaraId,
  ] = useState('')

  const [
    wilayahPemohonId,
    setWilayahPemohonId,
  ] = useState('')

  const [
    wilayahTermohonId,
    setWilayahTermohonId,
  ] = useState('')

  const [
    jumlahPanggilanPemohon,
    setJumlahPanggilanPemohon,
  ] = useState(2)

  const [
    jumlahPanggilanTermohon,
    setJumlahPanggilanTermohon,
  ] = useState(2)

  // ==============================
  // SELECTED DATA
  // ==============================

  const perkaraTerpilih =
    useMemo(
      () =>
        jenisPerkaraAktif.find(
          (item) =>
            item.id ===
            jenisPerkaraId,
        ),
      [
        jenisPerkaraAktif,
        jenisPerkaraId,
      ],
    )

  const wilayahPemohon =
    useMemo(
      () =>
        wilayahAktif.find(
          (item) =>
            item.id ===
            wilayahPemohonId,
        ),
      [
        wilayahAktif,
        wilayahPemohonId,
      ],
    )

  const wilayahTermohon =
    useMemo(
      () =>
        wilayahAktif.find(
          (item) =>
            item.id ===
            wilayahTermohonId,
        ),
      [
        wilayahAktif,
        wilayahTermohonId,
      ],
    )

  // ==============================
  // CALCULATION
  // ==============================

  const biayaPendaftaran =
    perkaraTerpilih
      ?.biayaPendaftaran ??
    0

  const biayaProses =
    perkaraTerpilih
      ?.biayaProses ??
    0

  const pnbp =
    perkaraTerpilih?.pnbp ??
    0

  const materai =
    perkaraTerpilih
      ?.materai ??
    0

  const tarifPemohon =
    wilayahPemohon
      ?.biayaPanggilan ??
    0

  const tarifTermohon =
    wilayahTermohon
      ?.biayaPanggilan ??
    0

  const biayaPanggilanPemohon =
    tarifPemohon *
    jumlahPanggilanPemohon

  const biayaPanggilanTermohon =
    tarifTermohon *
    jumlahPanggilanTermohon

  const totalPanjar =
    biayaPendaftaran +
    biayaProses +
    pnbp +
    materai +
    biayaPanggilanPemohon +
    biayaPanggilanTermohon

  const formLengkap =
    Boolean(
      perkaraTerpilih &&
        wilayahPemohon &&
        wilayahTermohon,
    )

  // ==============================
  // RESET
  // ==============================

  const handleReset =
    () => {
      setJenisPerkaraId('')
      setWilayahPemohonId('')
      setWilayahTermohonId('')
      setJumlahPanggilanPemohon(
        2,
      )
      setJumlahPanggilanTermohon(
        2,
      )
    }

  // ==============================
  // RENDER
  // ==============================

  return (
    <section className="bg-[#f7f9f8] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================== */}
        {/* BACK */}
        {/* ============================== */}

        <Link
          to="/layanan"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530] transition hover:text-[#0b4226]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Layanan Hukum
        </Link>

        {/* ============================== */}
        {/* HEADER */}
        {/* ============================== */}

        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Layanan Hukum
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#17201b] lg:text-5xl">
           Panjar
            Biaya Perkara
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Gunakan kalkulator
            untuk memperoleh
            estimasi awal panjar
            biaya perkara berdasarkan
            jenis perkara, wilayah,
            dan jumlah panggilan.
          </p>
        </div>

        {/* ============================== */}
        {/* WARNING */}
        {/* ============================== */}

        <div className="mt-8 flex gap-4 border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <CircleAlert
            size={21}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-sm font-bold text-amber-800">
              Estimasi Panjar
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-700">
              Hasil perhitungan
              merupakan estimasi.
              Besaran biaya yang
              sebenarnya mengikuti
              ketentuan dan penetapan
              resmi Pengadilan Agama
              Polewali.
            </p>
          </div>
        </div>

        {/* ============================== */}
        {/* CONTENT */}
        {/* ============================== */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ============================== */}
          {/* FORM */}
          {/* ============================== */}

          <div className="border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <Calculator
                  size={22}
                  className="text-[#116530]"
                />

                <div>
                  <h2 className="text-lg font-extrabold text-[#17201b]">
                    Data Perhitungan
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Lengkapi data
                    berikut untuk
                    menghitung estimasi
                    biaya.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* JENIS PERKARA */}

              <div>
                <label
                  htmlFor="jenisPerkara"
                  className="text-sm font-bold text-slate-700"
                >
                  Jenis Perkara
                </label>

                <select
                  id="jenisPerkara"
                  value={
                    jenisPerkaraId
                  }
                  onChange={(
                    event,
                  ) =>
                    setJenisPerkaraId(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#116530]"
                >
                  <option value="">
                    Pilih jenis
                    perkara
                  </option>

                  {jenisPerkaraAktif.map(
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
              </div>

              {/* ============================== */}
              {/* PEMOHON */}
              {/* ============================== */}

              <div className="mt-8 border-t border-slate-200 pt-7">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={18}
                    className="text-[#116530]"
                  />

                  <h3 className="font-extrabold text-[#17201b]">
                    Wilayah Pemohon /
                    Penggugat
                  </h3>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_180px]">
                  <div>
                    <label
                      htmlFor="wilayahPemohon"
                      className="text-sm font-bold text-slate-700"
                    >
                      Wilayah
                    </label>

                    <select
                      id="wilayahPemohon"
                      value={
                        wilayahPemohonId
                      }
                      onChange={(
                        event,
                      ) =>
                        setWilayahPemohonId(
                          event.target
                            .value,
                        )
                      }
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#116530]"
                    >
                      <option value="">
                        Pilih wilayah
                      </option>

                      {wilayahAktif.map(
                        (item) => (
                          <option
                            key={
                              item.id
                            }
                            value={
                              item.id
                            }
                          >
                            {item.nama}
                            {' - '}
                            {
                              item.radius
                            }
                          </option>
                        ),
                      )}
                    </select>

                    {wilayahPemohon && (
                      <p className="mt-2 text-xs font-semibold text-[#116530]">
                        Tarif panggilan:{' '}
                        {formatRupiah(
                          wilayahPemohon.biayaPanggilan,
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="panggilanPemohon"
                      className="text-sm font-bold text-slate-700"
                    >
                      Jumlah Panggilan
                    </label>

                    <input
                      id="panggilanPemohon"
                      type="number"
                      min={0}
                      max={20}
                      value={
                        jumlahPanggilanPemohon
                      }
                      onChange={(
                        event,
                      ) => {
                        const value =
                          Number(
                            event
                              .target
                              .value,
                          )

                        setJumlahPanggilanPemohon(
                          Number.isFinite(
                            value,
                          )
                            ? Math.min(
                                20,
                                Math.max(
                                  0,
                                  value,
                                ),
                              )
                            : 0,
                        )
                      }}
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition focus:border-[#116530]"
                    />
                  </div>
                </div>
              </div>

              {/* ============================== */}
              {/* TERMOHON */}
              {/* ============================== */}

              <div className="mt-8 border-t border-slate-200 pt-7">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={18}
                    className="text-[#116530]"
                  />

                  <h3 className="font-extrabold text-[#17201b]">
                    Wilayah Termohon /
                    Tergugat
                  </h3>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_180px]">
                  <div>
                    <label
                      htmlFor="wilayahTermohon"
                      className="text-sm font-bold text-slate-700"
                    >
                      Wilayah
                    </label>

                    <select
                      id="wilayahTermohon"
                      value={
                        wilayahTermohonId
                      }
                      onChange={(
                        event,
                      ) =>
                        setWilayahTermohonId(
                          event.target
                            .value,
                        )
                      }
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#116530]"
                    >
                      <option value="">
                        Pilih wilayah
                      </option>

                      {wilayahAktif.map(
                        (item) => (
                          <option
                            key={
                              item.id
                            }
                            value={
                              item.id
                            }
                          >
                            {item.nama}
                            {' - '}
                            {
                              item.radius
                            }
                          </option>
                        ),
                      )}
                    </select>

                    {wilayahTermohon && (
                      <p className="mt-2 text-xs font-semibold text-[#116530]">
                        Tarif panggilan:{' '}
                        {formatRupiah(
                          wilayahTermohon.biayaPanggilan,
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="panggilanTermohon"
                      className="text-sm font-bold text-slate-700"
                    >
                      Jumlah Panggilan
                    </label>

                    <input
                      id="panggilanTermohon"
                      type="number"
                      min={0}
                      max={20}
                      value={
                        jumlahPanggilanTermohon
                      }
                      onChange={(
                        event,
                      ) => {
                        const value =
                          Number(
                            event
                              .target
                              .value,
                          )

                        setJumlahPanggilanTermohon(
                          Number.isFinite(
                            value,
                          )
                            ? Math.min(
                                20,
                                Math.max(
                                  0,
                                  value,
                                ),
                              )
                            : 0,
                        )
                      }}
                      className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition focus:border-[#116530]"
                    />
                  </div>
                </div>
              </div>

              {/* RESET */}

              <div className="mt-8 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={
                    handleReset
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-[#116530] hover:text-[#116530]"
                >
                  <RotateCcw
                    size={17}
                  />

                  Reset Kalkulator
                </button>
              </div>
            </div>
          </div>

          {/* ============================== */}
          {/* RESULT */}
          {/* ============================== */}

          <div>
            <div className="border border-slate-200 bg-white lg:sticky lg:top-24">
              <div className="border-b border-slate-200 bg-[#0b4226] px-6 py-5">
                <div className="flex items-center gap-3">
                  <ReceiptText
                    size={21}
                    className="text-[#f1cf69]"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#f1cf69]">
                      Estimasi
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold text-white">
                      Rincian Panjar
                      Biaya Perkara
                    </h2>
                  </div>
                </div>
              </div>

              {!formLengkap ? (
                <div className="px-6 py-12 text-center">
                  <Calculator
                    size={38}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-4 font-bold text-slate-600">
                    Lengkapi Data
                    Perhitungan
                  </p>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                    Pilih jenis
                    perkara, wilayah
                    pemohon, dan
                    wilayah termohon
                    untuk melihat
                    estimasi panjar.
                  </p>
                </div>
              ) : (
                <>
                  {/* PERKARA */}

                  <div className="border-b border-slate-200 px-6 py-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Jenis Perkara
                    </p>

                    <p className="mt-2 font-extrabold text-[#17201b]">
                      {
                        perkaraTerpilih?.nama
                      }
                    </p>
                  </div>

                  {/* BREAKDOWN */}

                  <div className="divide-y divide-slate-100 px-6">
                    <RincianItem
                      label="Biaya Pendaftaran"
                      value={
                        biayaPendaftaran
                      }
                    />

                    <RincianItem
                      label="Biaya Proses"
                      value={
                        biayaProses
                      }
                    />

                    <RincianItem
                      label="PNBP"
                      value={
                        pnbp
                      }
                    />

                    <RincianItem
                      label="Materai"
                      value={
                        materai
                      }
                    />

                    <RincianItem
                      label={`Panggilan Pemohon (${jumlahPanggilanPemohon} × ${formatRupiah(
                        tarifPemohon,
                      )})`}
                      value={
                        biayaPanggilanPemohon
                      }
                    />

                    <RincianItem
                      label={`Panggilan Termohon (${jumlahPanggilanTermohon} × ${formatRupiah(
                        tarifTermohon,
                      )})`}
                      value={
                        biayaPanggilanTermohon
                      }
                    />
                  </div>

                  {/* TOTAL */}

                  <div className="border-t-2 border-[#116530] bg-[#f3f8f5] px-6 py-6">
                    <p className="text-sm font-bold text-slate-500">
                      Estimasi Total
                      Panjar
                    </p>

                    <p className="mt-2 break-words text-3xl font-extrabold text-[#116530] lg:text-4xl">
                      {formatRupiah(
                        totalPanjar,
                      )}
                    </p>

                    <p className="mt-4 text-xs leading-6 text-slate-500">
                      Nilai dapat
                      berubah berdasarkan
                      kondisi perkara,
                      jumlah pemanggilan,
                      dan ketentuan
                      resmi yang berlaku.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ============================== */}
        {/* INFORMATION */}
        {/* ============================== */}

        <div className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-extrabold text-[#17201b]">
            Cara Perhitungan
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
            Estimasi dihitung dari
            biaya pendaftaran, biaya
            proses, PNBP, materai,
            serta biaya panggilan
            pemohon dan termohon.
            Tarif panggilan mengikuti
            wilayah yang dipilih dan
            jumlah pemanggilan yang
            dimasukkan.
          </p>
        </div>
      </div>
    </section>
  )
}

// ==============================
// RINCIAN ITEM
// ==============================

function RincianItem({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex items-start justify-between gap-5 py-4">
      <p className="min-w-0 text-sm leading-6 text-slate-500">
        {label}
      </p>

      <p className="shrink-0 text-right text-sm font-bold text-[#17201b]">
        {formatRupiah(
          value,
        )}
      </p>
    </div>
  )
}