import {
  Calculator,
  CircleAlert,
  MapPin,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { useBiayaPerkaraStore } from '../../store/biayaPerkaraStore'

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

export default function AdminBiayaPerkara() {
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

  const updateJenisPerkara =
    useBiayaPerkaraStore(
      (state) =>
        state.updateJenisPerkara,
    )

  const updateTarifWilayah =
    useBiayaPerkaraStore(
      (state) =>
        state.updateTarifWilayah,
    )

  const tambahWilayah =
    useBiayaPerkaraStore(
      (state) =>
        state.tambahWilayah,
    )

  const hapusWilayah =
    useBiayaPerkaraStore(
      (state) =>
        state.hapusWilayah,
    )

  const toggleJenisPerkara =
    useBiayaPerkaraStore(
      (state) =>
        state.toggleJenisPerkara,
    )

  const toggleWilayah =
    useBiayaPerkaraStore(
      (state) =>
        state.toggleWilayah,
    )

  const resetPengaturan =
    useBiayaPerkaraStore(
      (state) =>
        state.resetPengaturan,
    )

  const [
    tabAktif,
    setTabAktif,
  ] = useState<
    'perkara' | 'wilayah'
  >('perkara')

  const [
    namaWilayahBaru,
    setNamaWilayahBaru,
  ] = useState('')

  const [
    radiusBaru,
    setRadiusBaru,
  ] = useState('')

  const [
    tarifBaru,
    setTarifBaru,
  ] = useState('')

  const [
    pesan,
    setPesan,
  ] = useState('')

  const [
    resetModal,
    setResetModal,
  ] = useState(false)

  const [
    hapusId,
    setHapusId,
  ] = useState<
    string | null
  >(null)

  const jumlahPerkaraAktif =
    useMemo(
      () =>
        jenisPerkara.filter(
          (item) =>
            item.aktif,
        ).length,
      [jenisPerkara],
    )

  const jumlahWilayahAktif =
    useMemo(
      () =>
        tarifWilayah.filter(
          (item) =>
            item.aktif,
        ).length,
      [tarifWilayah],
    )

  const tampilkanPesan = (
    value: string,
  ) => {
    setPesan(value)

    window.setTimeout(
      () => {
        setPesan('')
      },
      2500,
    )
  }

  const handleTambahWilayah =
    () => {
      const nama =
        namaWilayahBaru.trim()

      const radius =
        radiusBaru.trim()

      const biaya =
        Number(tarifBaru)

      if (!nama) {
        tampilkanPesan(
          'Nama wilayah wajib diisi.',
        )
        return
      }

      if (!radius) {
        tampilkanPesan(
          'Radius wajib diisi.',
        )
        return
      }

      if (
        !Number.isFinite(
          biaya,
        ) ||
        biaya < 0
      ) {
        tampilkanPesan(
          'Tarif panggilan tidak valid.',
        )
        return
      }

      tambahWilayah({
        nama,
        radius,
        biayaPanggilan:
          biaya,
      })

      setNamaWilayahBaru('')
      setRadiusBaru('')
      setTarifBaru('')

      tampilkanPesan(
        'Wilayah berhasil ditambahkan.',
      )
    }

  const handleReset =
    () => {
      resetPengaturan()

      setResetModal(false)

      tampilkanPesan(
        'Pengaturan berhasil dikembalikan ke data awal.',
      )
    }

  const handleHapus =
    () => {
      if (!hapusId) {
        return
      }

      hapusWilayah(
        hapusId,
      )

      setHapusId(null)

      tampilkanPesan(
        'Wilayah berhasil dihapus.',
      )
    }

  return (
    <div>
      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#116530]">
            Kalkulator
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
            Pengaturan Biaya Perkara
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola komponen biaya perkara serta tarif
            panggilan berdasarkan wilayah dan radius.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setResetModal(
              true,
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-300 hover:text-red-600"
        >
          <RotateCcw
            size={17}
          />

          Reset Pengaturan
        </button>
      </div>

      {/* ============================== */}
      {/* WARNING */}
      {/* ============================== */}

      <div className="mt-7 flex gap-3 border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
        <CircleAlert
          size={20}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <div>
          <p className="text-sm font-bold text-amber-800">
            Data Prototype
          </p>

          <p className="mt-1 text-sm leading-6 text-amber-700">
            Nominal pada halaman ini masih berupa data
            prototype. Sebelum digunakan untuk pelayanan
            publik, sesuaikan dengan ketentuan resmi yang
            berlaku.
          </p>
        </div>
      </div>

      {/* ============================== */}
      {/* SUCCESS / INFO */}
      {/* ============================== */}

      {pesan && (
        <div className="mt-5 border-l-4 border-[#116530] bg-[#edf7f1] px-5 py-4">
          <p className="text-sm font-bold text-[#116530]">
            {pesan}
          </p>
        </div>
      )}

      {/* ============================== */}
      {/* SUMMARY */}
      {/* ============================== */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Jenis Perkara"
          value={
            jenisPerkara.length
          }
        />

        <SummaryCard
          label="Perkara Aktif"
          value={
            jumlahPerkaraAktif
          }
        />

        <SummaryCard
          label="Wilayah"
          value={
            tarifWilayah.length
          }
        />

        <SummaryCard
          label="Wilayah Aktif"
          value={
            jumlahWilayahAktif
          }
        />
      </div>

      {/* ============================== */}
      {/* TABS */}
      {/* ============================== */}

      <div className="mt-8 flex overflow-x-auto border-b border-slate-200">
        <button
          type="button"
          onClick={() =>
            setTabAktif(
              'perkara',
            )
          }
          className={`flex min-w-max items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition ${
            tabAktif ===
            'perkara'
              ? 'border-[#116530] text-[#116530]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calculator
            size={17}
          />

          Jenis Perkara
        </button>

        <button
          type="button"
          onClick={() =>
            setTabAktif(
              'wilayah',
            )
          }
          className={`flex min-w-max items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition ${
            tabAktif ===
            'wilayah'
              ? 'border-[#116530] text-[#116530]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <MapPin
            size={17}
          />

          Tarif / Radius Wilayah
        </button>
      </div>

      {/* ============================== */}
      {/* TAB JENIS PERKARA */}
      {/* ============================== */}

      {tabAktif ===
        'perkara' && (
        <section className="mt-6 overflow-hidden border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-5">
            <h2 className="font-extrabold text-[#17201b]">
              Komponen Biaya per Jenis Perkara
            </h2>

            <p className="mt-1 text-xs leading-6 text-slate-400">
              Perubahan nilai akan disimpan pada browser
              dan digunakan oleh kalkulator publik.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8faf9]">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Jenis Perkara
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pendaftaran
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Proses
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    PNBP
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Materai
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {jenisPerkara.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                      className={`transition ${
                        item.aktif
                          ? 'hover:bg-[#f8faf9]'
                          : 'bg-slate-50/70'
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-[#17201b]">
                            {
                              item.nama
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {
                              item.id
                            }
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <CurrencyInput
                          value={
                            item.biayaPendaftaran
                          }
                          disabled={
                            !item.aktif
                          }
                          onChange={(
                            value,
                          ) =>
                            updateJenisPerkara(
                              item.id,
                              {
                                biayaPendaftaran:
                                  value,
                              },
                            )
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <CurrencyInput
                          value={
                            item.biayaProses
                          }
                          disabled={
                            !item.aktif
                          }
                          onChange={(
                            value,
                          ) =>
                            updateJenisPerkara(
                              item.id,
                              {
                                biayaProses:
                                  value,
                              },
                            )
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <CurrencyInput
                          value={
                            item.pnbp
                          }
                          disabled={
                            !item.aktif
                          }
                          onChange={(
                            value,
                          ) =>
                            updateJenisPerkara(
                              item.id,
                              {
                                pnbp:
                                  value,
                              },
                            )
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <CurrencyInput
                          value={
                            item.materai
                          }
                          disabled={
                            !item.aktif
                          }
                          onChange={(
                            value,
                          ) =>
                            updateJenisPerkara(
                              item.id,
                              {
                                materai:
                                  value,
                              },
                            )
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          <StatusToggle
                            aktif={
                              item.aktif
                            }
                            onClick={() =>
                              toggleJenisPerkara(
                                item.id,
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              Perubahan nilai tersimpan otomatis.
            </p>

            <button
              type="button"
              onClick={() =>
                tampilkanPesan(
                  'Pengaturan jenis perkara berhasil disimpan.',
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#116530] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
            >
              <Save
                size={17}
              />

              Simpan Perubahan
            </button>
          </div>
        </section>
      )}

      {/* ============================== */}
      {/* TAB WILAYAH */}
      {/* ============================== */}

      {tabAktif ===
        'wilayah' && (
        <div className="mt-6">
          {/* TAMBAH WILAYAH */}
          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <div>
              <h2 className="font-extrabold text-[#17201b]">
                Tambah Wilayah
              </h2>

              <p className="mt-1 text-xs leading-6 text-slate-400">
                Tambahkan wilayah dan tarif panggilan
                yang nantinya muncul pada kalkulator.
              </p>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_220px_220px_auto]">
              <div>
                <label className="text-xs font-bold text-slate-500">
                  Nama Wilayah
                </label>

                <input
                  value={
                    namaWilayahBaru
                  }
                  onChange={(
                    event,
                  ) =>
                    setNamaWilayahBaru(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Contoh: Anreapi"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#116530]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">
                  Radius
                </label>

                <input
                  value={
                    radiusBaru
                  }
                  onChange={(
                    event,
                  ) =>
                    setRadiusBaru(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Contoh: Radius II"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#116530]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">
                  Tarif Panggilan
                </label>

                <input
                  type="number"
                  min={0}
                  value={
                    tarifBaru
                  }
                  onChange={(
                    event,
                  ) =>
                    setTarifBaru(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Contoh: 100000"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#116530]"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={
                    handleTambahWilayah
                  }
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#116530] px-5 text-sm font-bold !text-white transition hover:bg-[#0d4e28] xl:w-auto"
                >
                  <Plus
                    size={17}
                  />

                  Tambah
                </button>
              </div>
            </div>
          </section>

          {/* DATA WILAYAH */}
          <section className="mt-6 overflow-hidden border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-5">
              <h2 className="font-extrabold text-[#17201b]">
                Tarif / Radius Wilayah
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Kelola nama wilayah, radius, tarif, dan
                status tampilan di kalkulator publik.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#f8faf9]">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Wilayah
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Radius
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Tarif Panggilan
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {tarifWilayah.map(
                    (item) => (
                      <tr
                        key={
                          item.id
                        }
                        className={`transition ${
                          item.aktif
                            ? 'hover:bg-[#f8faf9]'
                            : 'bg-slate-50/70'
                        }`}
                      >
                        <td className="px-5 py-4">
                          <input
                            value={
                              item.nama
                            }
                            disabled={
                              !item.aktif
                            }
                            onChange={(
                              event,
                            ) =>
                              updateTarifWilayah(
                                item.id,
                                {
                                  nama:
                                    event
                                      .target
                                      .value,
                                },
                              )
                            }
                            className="h-10 min-w-[180px] rounded-lg border border-slate-300 px-3 text-sm font-semibold text-[#17201b] outline-none focus:border-[#116530] disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </td>

                        <td className="px-5 py-4">
                          <input
                            value={
                              item.radius
                            }
                            disabled={
                              !item.aktif
                            }
                            onChange={(
                              event,
                            ) =>
                              updateTarifWilayah(
                                item.id,
                                {
                                  radius:
                                    event
                                      .target
                                      .value,
                                },
                              )
                            }
                            className="h-10 min-w-[150px] rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#116530] disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <CurrencyInput
                              value={
                                item.biayaPanggilan
                              }
                              disabled={
                                !item.aktif
                              }
                              onChange={(
                                value,
                              ) =>
                                updateTarifWilayah(
                                  item.id,
                                  {
                                    biayaPanggilan:
                                      value,
                                  },
                                )
                              }
                            />

                            <p className="mt-1 text-xs text-slate-400">
                              {formatRupiah(
                                item.biayaPanggilan,
                              )}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center">
                            <StatusToggle
                              aktif={
                                item.aktif
                              }
                              onClick={() =>
                                toggleWilayah(
                                  item.id,
                                )
                              }
                            />
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setHapusId(
                                  item.id,
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              aria-label={`Hapus ${item.nama}`}
                            >
                              <Trash2
                                size={17}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400">
                Wilayah nonaktif tidak ditampilkan pada
                kalkulator publik.
              </p>

              <button
                type="button"
                onClick={() =>
                  tampilkanPesan(
                    'Pengaturan tarif wilayah berhasil disimpan.',
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#116530] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
              >
                <Save
                  size={17}
                />

                Simpan Perubahan
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ============================== */}
      {/* MODAL RESET */}
      {/* ============================== */}

      {resetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              Reset Pengaturan?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Seluruh perubahan jenis perkara dan tarif
              wilayah akan dikembalikan ke data awal
              prototype.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setResetModal(
                    false,
                  )
                }
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={
                  handleReset
                }
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold !text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================== */}
      {/* MODAL HAPUS */}
      {/* ============================== */}

      {hapusId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              Hapus Wilayah?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Wilayah ini akan dihapus dari pengaturan
              dan tidak lagi tersedia pada kalkulator.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setHapusId(
                    null,
                  )
                }
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={
                  handleHapus
                }
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold !text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==============================
// SUMMARY CARD
// ==============================

function SummaryCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-extrabold text-[#17201b]">
        {value}
      </p>
    </div>
  )
}

// ==============================
// CURRENCY INPUT
// ==============================

function CurrencyInput({
  value,
  onChange,
  disabled = false,
}: {
  value: number
  onChange: (
    value: number,
  ) => void
  disabled?: boolean
}) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      disabled={disabled}
      onChange={(event) => {
        const valueBaru =
          Number(
            event.target.value,
          )

        onChange(
          Number.isFinite(
            valueBaru,
          )
            ? Math.max(
                0,
                valueBaru,
              )
            : 0,
        )
      }}
      className="h-10 w-full min-w-[130px] rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#116530] disabled:bg-slate-100 disabled:text-slate-400"
    />
  )
}

// ==============================
// STATUS TOGGLE
// ==============================

function StatusToggle({
  aktif,
  onClick,
}: {
  aktif: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-7 w-12 rounded-full transition ${
        aktif
          ? 'bg-[#116530]'
          : 'bg-slate-300'
      }`}
      aria-label={
        aktif
          ? 'Nonaktifkan'
          : 'Aktifkan'
      }
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          aktif
            ? 'left-6'
            : 'left-1'
        }`}
      />
    </button>
  )
}