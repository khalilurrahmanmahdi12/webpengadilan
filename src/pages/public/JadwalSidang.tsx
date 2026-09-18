import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  RotateCcw,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { jadwalSidangData } from '../../data/jadwalSidangData'

export default function JadwalSidang() {
  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    tanggal,
    setTanggal,
  ] = useState('')

  const [
    ruang,
    setRuang,
  ] = useState('Semua')

  const ruangList =
    useMemo(() => {
      return [
        'Semua',
        ...Array.from(
          new Set(
            jadwalSidangData.map(
              (item) =>
                item.ruang,
            ),
          ),
        ),
      ]
    }, [])

  const hasil =
    useMemo(() => {
      const keyword =
        pencarian
          .toLowerCase()
          .trim()

      return jadwalSidangData.filter(
        (item) => {
          const cocokCari =
            item.nomorPerkara
              .toLowerCase()
              .includes(
                keyword,
              ) ||
            item.agenda
              .toLowerCase()
              .includes(
                keyword,
              )

          const cocokTanggal =
            !tanggal ||
            item.tanggal ===
              tanggal

          const cocokRuang =
            ruang ===
              'Semua' ||
            item.ruang ===
              ruang

          return (
            cocokCari &&
            cocokTanggal &&
            cocokRuang
          )
        },
      )
    }, [
      pencarian,
      tanggal,
      ruang,
    ])

  const resetFilter = () => {
    setPencarian('')
    setTanggal('')
    setRuang('Semua')
  }

  const filterAktif =
    pencarian !== '' ||
    tanggal !== '' ||
    ruang !== 'Semua'

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530] transition hover:text-[#0b4226]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Beranda
        </Link>

        {/* HEADER */}
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Informasi Persidangan
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Jadwal Sidang
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Cari dan lihat jadwal
            persidangan Pengadilan
             berdasarkan
            nomor perkara, tanggal,
            atau ruang sidang.
          </p>
        </div>

        {/* FILTER */}
        <div className="mt-10 border-y border-slate-200 py-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_210px_210px_auto]">
            {/* SEARCH */}
            <div className="relative">
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
                placeholder="Cari nomor perkara atau agenda..."
                className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-[#116530]"
              />
            </div>

            {/* TANGGAL */}
            <input
              type="date"
              value={tanggal}
              onChange={(
                event,
              ) =>
                setTanggal(
                  event.target
                    .value,
                )
              }
              className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#116530]"
            />

            {/* RUANG */}
            <select
              value={ruang}
              onChange={(
                event,
              ) =>
                setRuang(
                  event.target
                    .value,
                )
              }
              className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#116530]"
            >
              {ruangList.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item ===
                    'Semua'
                      ? 'Semua Ruang'
                      : item}
                  </option>
                ),
              )}
            </select>

            {/* RESET */}
            <button
              type="button"
              disabled={
                !filterAktif
              }
              onClick={
                resetFilter
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-600 transition hover:border-[#116530] hover:text-[#116530] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw
                size={16}
              />

              Reset
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Ditemukan{' '}
            <span className="font-extrabold text-[#17201b]">
              {hasil.length}
            </span>{' '}
            jadwal sidang
          </p>

          {tanggal && (
            <p className="text-xs font-semibold text-[#116530]">
              Filter tanggal:{' '}
              {tanggal}
            </p>
          )}
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-7 hidden overflow-hidden border border-slate-200 bg-white md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8faf9]">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    No
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Nomor Perkara
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Tanggal
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Agenda
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Jam
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Ruang
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
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <CalendarDays
                        size={34}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-bold text-[#17201b]">
                        Jadwal tidak ditemukan
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Coba ubah
                        pencarian atau
                        filter jadwal.
                      </p>
                    </td>
                  </tr>
                ) : (
                  hasil.map(
                    (
                      item,
                      index,
                    ) => (
                      <tr
                        key={
                          item.id
                        }
                        className="transition hover:bg-[#f8faf9]"
                      >
                        <td className="px-5 py-5 text-sm text-slate-500">
                          {index +
                            1}
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm font-extrabold text-[#17201b]">
                            {
                              item.nomorPerkara
                            }
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={
                                16
                              }
                              className="text-[#116530]"
                            />

                            {
                              item.tanggalLabel
                            }
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-slate-600">
                            {
                              item.agenda
                            }
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock3
                              size={
                                16
                              }
                              className="text-[#116530]"
                            />

                            {
                              item.jam
                            }
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin
                              size={
                                16
                              }
                              className="text-[#116530]"
                            />

                            {
                              item.ruang
                            }
                          </div>
                        </td>

                        <td className="px-5 py-5">
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

        {/* MOBILE */}
        <div className="mt-7 space-y-4 md:hidden">
          {hasil.length ===
          0 ? (
            <div className="border-y border-slate-200 py-12 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 font-bold text-[#17201b]">
                Jadwal tidak ditemukan
              </p>
            </div>
          ) : (
            hasil.map(
              (item) => (
                <article
                  key={
                    item.id
                  }
                  className="border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Nomor Perkara
                      </p>

                      <p className="mt-2 font-extrabold text-[#17201b]">
                        {
                          item.nomorPerkara
                        }
                      </p>
                    </div>

                    <StatusBadge
                      status={
                        item.status
                      }
                    />
                  </div>

                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                    <MobileInfo
                      icon={
                        CalendarDays
                      }
                      value={
                        item.tanggalLabel
                      }
                    />

                    <MobileInfo
                      icon={
                        Clock3
                      }
                      value={
                        item.jam
                      }
                    />

                    <MobileInfo
                      icon={
                        MapPin
                      }
                      value={
                        item.ruang
                      }
                    />
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Agenda
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {
                        item.agenda
                      }
                    </p>
                  </div>
                </article>
              ),
            )
          )}
        </div>

        {/* INFO */}
        <div className="mt-10 border-l-4 border-[#116530] bg-[#f8faf9] px-5 py-4">
          <p className="text-sm leading-7 text-slate-600">
            Jadwal persidangan dapat
            mengalami perubahan.
            Para pihak disarankan
            memeriksa kembali
            informasi persidangan
            sebelum datang ke
            pengadilan.
          </p>
        </div>
      </div>
    </section>
  )
}

function StatusBadge({
  status,
}: {
  status:
    | 'Hari Ini'
    | 'Akan Datang'
    | 'Selesai'
}) {
  let style =
    'bg-slate-100 text-slate-600'

  if (
    status === 'Hari Ini'
  ) {
    style =
      'bg-[#edf7f1] text-[#116530]'
  }

  if (
    status ===
    'Akan Datang'
  ) {
    style =
      'bg-blue-50 text-blue-700'
  }

  if (
    status === 'Selesai'
  ) {
    style =
      'bg-slate-100 text-slate-500'
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${style}`}
    >
      {status}
    </span>
  )
}

interface MobileInfoProps {
  icon: typeof Clock3
  value: string
}

function MobileInfo({
  icon: Icon,
  value,
}: MobileInfoProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <Icon
        size={16}
        className="shrink-0 text-[#116530]"
      />

      {value}
    </div>
  )
}