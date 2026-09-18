import {
  CheckCircle2,
  Clock3,
  ListOrdered,
  Play,
  RotateCcw,
  Search,
  UserRound,
  Volume2,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  formatNomorAntrean,
  useAntreanStore,
} from '../../store/antreanStore'

function bunyikanPanggilan(
  nomorAntrean: string,
) {
  if (!('speechSynthesis' in window)) {
    return
  }

  window.speechSynthesis.cancel()

  const nomor =
    nomorAntrean
      .replace('A-', '')
      .split('')
      .join(' ')

  const pesan =
    `Nomor antrean A ${nomor}, silakan menuju meja pelayanan PTSP.`

  const ucapan =
    new SpeechSynthesisUtterance(
      pesan,
    )

  ucapan.lang = 'id-ID'
  ucapan.rate = 0.85
  ucapan.pitch = 1
  ucapan.volume = 1

  const voices =
    window.speechSynthesis.getVoices()

  const voiceIndonesia =
    voices.find(
      (voice) =>
        voice.lang
          .toLowerCase()
          .includes('id'),
    )

  if (voiceIndonesia) {
    ucapan.voice =
      voiceIndonesia
  }

  window.speechSynthesis.speak(
    ucapan,
  )
}

export default function AdminAntrean() {
  const antrean =
    useAntreanStore(
      (state) =>
        state.antrean,
    )

  const nomorTerakhir =
    useAntreanStore(
      (state) =>
        state.nomorTerakhir,
    )

  const nomorSedangDilayani =
    useAntreanStore(
      (state) =>
        state.nomorSedangDilayani,
    )

  const panggilBerikutnya =
    useAntreanStore(
      (state) =>
        state.panggilBerikutnya,
    )

  const mulaiPelayanan =
    useAntreanStore(
      (state) =>
        state.mulaiPelayanan,
    )

  const selesaikanAntrean =
    useAntreanStore(
      (state) =>
        state.selesaikanAntrean,
    )

  const resetAntrean =
    useAntreanStore(
      (state) =>
        state.resetAntrean,
    )

  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    statusFilter,
    setStatusFilter,
  ] = useState('Semua')

  const [
    konfirmasiReset,
    setKonfirmasiReset,
  ] = useState(false)

  const antreanAktif =
    antrean.find(
      (item) =>
        item.status ===
          'Dipanggil' ||
        item.status ===
          'Sedang Dilayani',
    )

  const antreanMenunggu =
    antrean.filter(
      (item) =>
        item.status ===
        'Menunggu',
    )

  const antreanSelesai =
    antrean.filter(
      (item) =>
        item.status ===
        'Selesai',
    )

  const hasil =
    useMemo(() => {
      return antrean.filter(
        (item) => {
          const cocokCari =
            item.nama
              .toLowerCase()
              .includes(
                pencarian.toLowerCase(),
              ) ||
            item.nomorAntrean
              .toLowerCase()
              .includes(
                pencarian.toLowerCase(),
              ) ||
            item.namaLayanan
              .toLowerCase()
              .includes(
                pencarian.toLowerCase(),
              )

          const cocokStatus =
            statusFilter ===
              'Semua' ||
            item.status ===
              statusFilter

          return (
            cocokCari &&
            cocokStatus
          )
        },
      )
    }, [
      antrean,
      pencarian,
      statusFilter,
    ])

  const handlePanggil =
    () => {
      if (antreanAktif) {
        return
      }

      const dipanggil =
        panggilBerikutnya()

      if (!dipanggil) {
        return
      }

      bunyikanPanggilan(
        dipanggil.nomorAntrean,
      )
    }

  const handleReset =
    () => {
      window.speechSynthesis?.cancel()

      resetAntrean()

      setKonfirmasiReset(
        false,
      )
    }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#116530]">
            PTSP Online
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
            Antrean PTSP
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Kelola panggilan dan
            pelayanan antrean
            masyarakat.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setKonfirmasiReset(
              true,
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-300 hover:text-red-600"
        >
          <RotateCcw
            size={17}
          />

          Reset Antrean
        </button>
      </div>

      {/* RINGKASAN */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Sedang Dilayani"
          value={
            nomorSedangDilayani >
            0
              ? formatNomorAntrean(
                  nomorSedangDilayani,
                )
              : '--'
          }
        />

        <Stat
          label="Total Antrean"
          value={String(
            nomorTerakhir,
          )}
        />

        <Stat
          label="Menunggu"
          value={String(
            antreanMenunggu.length,
          )}
        />

        <Stat
          label="Selesai"
          value={String(
            antreanSelesai.length,
          )}
        />
      </div>

      {/* PELAYANAN */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        {/* PELAYANAN AKTIF */}
        <section className="border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <ListOrdered
              size={21}
              className="text-[#116530]"
            />

            <h2 className="text-lg font-extrabold text-[#17201b]">
              Pelayanan Aktif
            </h2>
          </div>

          {antreanAktif ? (
            <>
              <div className="mt-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Nomor Antrean
                </p>

                <p className="mt-3 text-6xl font-extrabold text-[#116530]">
                  {
                    antreanAktif.nomorAntrean
                  }
                </p>

                <p className="mt-4 font-bold text-[#17201b]">
                  {
                    antreanAktif.nama
                  }
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    antreanAktif.namaLayanan
                  }
                </p>

                <div className="mt-4 inline-flex rounded-full bg-[#edf7f1] px-4 py-2 text-xs font-bold text-[#116530]">
                  {
                    antreanAktif.status
                  }
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {/* PANGGIL ULANG */}
                <button
                  type="button"
                  onClick={() =>
                    bunyikanPanggilan(
                      antreanAktif.nomorAntrean,
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#116530] bg-white px-5 py-3.5 text-sm font-bold text-[#116530] transition hover:bg-[#edf7f1]"
                >
                  <Volume2
                    size={18}
                  />

                  Panggil Ulang
                </button>

                {/* MULAI PELAYANAN */}
                {antreanAktif.status ===
                  'Dipanggil' && (
                  <button
                    type="button"
                    onClick={() =>
                      mulaiPelayanan(
                        antreanAktif.id,
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#116530] px-5 py-3.5 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
                  >
                    <Play
                      size={18}
                    />

                    Mulai Pelayanan
                  </button>
                )}

                {/* SELESAIKAN */}
                {antreanAktif.status ===
                  'Sedang Dilayani' && (
                  <button
                    type="button"
                    onClick={() =>
                      selesaikanAntrean(
                        antreanAktif.id,
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#116530] px-5 py-3.5 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
                  >
                    <CheckCircle2
                      size={18}
                    />

                    Selesaikan Pelayanan
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <Clock3
                size={36}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 font-bold text-[#17201b]">
                Tidak ada antrean aktif
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Panggil antrean
                berikutnya untuk
                memulai pelayanan.
              </p>

              <button
                type="button"
                disabled={
                  antreanMenunggu.length ===
                  0
                }
                onClick={
                  handlePanggil
                }
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#116530] px-6 py-3 text-sm font-bold !text-white transition hover:bg-[#0d4e28] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Volume2
                  size={18}
                />

                Panggil Berikutnya
              </button>
            </div>
          )}
        </section>

        {/* ANTREAN MENUNGGU */}
        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-extrabold text-[#17201b]">
              Antrean Menunggu
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Urutan antrean yang
              belum dilayani.
            </p>
          </div>

          {antreanMenunggu.length ===
          0 ? (
            <div className="px-6 py-12 text-center">
              <UserRound
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                Tidak ada antrean
                menunggu.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {antreanMenunggu
                .slice(0, 5)
                .map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="grid gap-3 px-6 py-4 sm:grid-cols-[85px_1fr_180px] sm:items-center"
                    >
                      <div>
                        <p className="text-lg font-extrabold text-[#116530]">
                          {
                            item.nomorAntrean
                          }
                        </p>

                        {index ===
                          0 && (
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            Berikutnya
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#17201b]">
                          {
                            item.nama
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            item.whatsapp
                          }
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">
                        {
                          item.namaLayanan
                        }
                      </p>
                    </div>
                  ),
                )}
            </div>
          )}
        </section>
      </div>

      {/* FILTER */}
      <div className="mt-8 flex flex-col gap-3 border-y border-slate-200 bg-white px-4 py-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={
              pencarian
            }
            onChange={(
              event,
            ) =>
              setPencarian(
                event.target
                  .value,
              )
            }
            placeholder="Cari nomor, nama atau layanan..."
            className="h-11 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#116530]"
          />
        </div>

        <select
          value={
            statusFilter
          }
          onChange={(
            event,
          ) =>
            setStatusFilter(
              event.target.value,
            )
          }
          className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none"
        >
          <option>
            Semua
          </option>

          <option>
            Menunggu
          </option>

          <option>
            Dipanggil
          </option>

          <option>
            Sedang Dilayani
          </option>

          <option>
            Selesai
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div className="mt-6 overflow-hidden border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-200 bg-[#f8faf9]">
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Antrean
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pemohon
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Layanan
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tanggal
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {hasil.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    Belum ada data antrean.
                  </td>
                </tr>
              ) : (
                hasil.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                      className="hover:bg-[#f8faf9]"
                    >
                      <td className="px-5 py-4 text-lg font-extrabold text-[#116530]">
                        {
                          item.nomorAntrean
                        }
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#17201b]">
                          {
                            item.nama
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            item.whatsapp
                          }
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {
                          item.namaLayanan
                        }
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {
                          item.tanggal
                        }
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={
                            item.status
                          }
                        />
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL RESET */}
      {konfirmasiReset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-[#17201b]">
              Reset Antrean?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Seluruh antrean hari
              ini akan dihapus dan
              nomor kembali ke
              A-001.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setKonfirmasiReset(
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
    </div>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: string
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

function StatusBadge({
  status,
}: {
  status: string
}) {
  let style =
    'bg-slate-100 text-slate-600'

  if (
    status === 'Menunggu'
  ) {
    style =
      'bg-amber-50 text-amber-700'
  }

  if (
    status === 'Dipanggil'
  ) {
    style =
      'bg-blue-50 text-blue-700'
  }

  if (
    status ===
    'Sedang Dilayani'
  ) {
    style =
      'bg-violet-50 text-violet-700'
  }

  if (
    status === 'Selesai'
  ) {
    style =
      'bg-emerald-50 text-emerald-700'
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${style}`}
    >
      {status}
    </span>
  )
}