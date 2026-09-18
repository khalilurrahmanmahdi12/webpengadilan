import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { jadwalSidangData } from '../../data/jadwalSidangData'

export default function ScheduleSection() {
  const jadwalHariIni =
    jadwalSidangData
      .filter(
        (item) =>
          item.status ===
          'Hari Ini',
      )
      .slice(0, 4)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Informasi Persidangan
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b] lg:text-4xl">
              Jadwal Sidang Hari Ini
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Informasi jadwal
              persidangan Pengadilan
             
            </p>
          </div>

          <Link
            to="/jadwal-sidang"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
          >
            Lihat Semua Jadwal

            <ArrowRight
              size={16}
            />
          </Link>
        </div>

        {/* TABLE */}
        <div className="mt-8 overflow-x-auto border-t border-slate-200">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  No
                </th>

                <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nomor Perkara
                </th>

                <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Agenda
                </th>

                <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Jam
                </th>

                <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ruang
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {jadwalHariIni.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    Tidak ada jadwal
                    sidang hari ini.
                  </td>
                </tr>
              ) : (
                jadwalHariIni.map(
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
                      <td className="px-4 py-5 text-sm text-slate-500">
                        {index +
                          1}
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-extrabold text-[#17201b]">
                          {
                            item.nomorPerkara
                          }
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays
                            size={
                              16
                            }
                            className="text-[#116530]"
                          />

                          {
                            item.agenda
                          }
                        </div>
                      </td>

                      <td className="px-4 py-5">
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

                      <td className="px-4 py-5">
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
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}