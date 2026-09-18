import {
  ArrowRight,
  CalendarDays,
  Megaphone,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { agendaData } from '../../data/agendaData'
import { pengumumanData } from '../../data/pengumumanData'

export default function AnnouncementSection() {
  const pengumuman =
    pengumumanData.slice(
      0,
      4,
    )

  const agenda =
    agendaData.slice(
      0,
      3,
    )

  return (
    <section className="bg-[#f7f9f8] py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        {/* ====================== */}
        {/* PENGUMUMAN */}
        {/* ====================== */}

        <div>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
                Informasi Publik
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#17201b]">
                Pengumuman
              </h2>
            </div>

            <Link
              to="/pengumuman"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#17201b] hover:text-[#116530]"
            >
              Lihat Semua

              <ArrowRight
                size={16}
              />
            </Link>
          </div>

          <div className="mt-7 border-t border-slate-200">
            {pengumuman.map(
              (item) => (
                <Link
                  key={item.id}
                  to={`/pengumuman/${item.slug}`}
                  className="group flex gap-4 border-b border-slate-200 py-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e9f4ed] text-[#116530]">
                    <Megaphone
                      size={18}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                      {
                        item.judul
                      }
                    </h3>

                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays
                        size={13}
                      />

                      {
                        item.tanggal
                      }
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>

        {/* ====================== */}
        {/* AGENDA */}
        {/* ====================== */}

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Kegiatan
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#17201b]">
            Agenda
          </h2>

          <div className="mt-7 border-t border-slate-200">
            {agenda.map(
              (item) => (
                <Link
                  key={item.id}
                  to={`/agenda/${item.slug}`}
                  className="group grid grid-cols-[65px_1fr] gap-4 border-b border-slate-200 py-5"
                >
                  <div className="border-r border-slate-200">
                    <p className="text-3xl font-extrabold text-[#116530]">
                      {
                        item.hari
                      }
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                      {
                        item.bulan
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                      {
                        item.judul
                      }
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {
                        item.waktu
                      }
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>

          <Link
            to="/agenda"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
          >
            Lihat Semua Agenda

            <ArrowRight
              size={16}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}