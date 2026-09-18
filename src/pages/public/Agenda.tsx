import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { agendaData } from '../../data/agendaData'

export default function Agenda() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
        <div className="mt-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Kegiatan
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Agenda
          </h1>

          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            Agenda kegiatan
            Pengadilan Agama
            Polewali.
          </p>
        </div>

        {/* LIST */}
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {agendaData.map(
            (item) => (
              <Link
                key={
                  item.id
                }
                to={`/agenda/${item.slug}`}
                className="group grid gap-5 py-7 sm:grid-cols-[100px_1fr_25px]"
              >
                <div>
                  <p className="text-4xl font-extrabold text-[#116530]">
                    {
                      item.hari
                    }
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                    {
                      item.bulan
                    }{' '}
                    {
                      item.tahun
                    }
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                    {
                      item.judul
                    }
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {
                      item.deskripsi
                    }
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3
                        size={14}
                      />

                      {
                        item.waktu
                      }
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin
                        size={14}
                      />

                      {
                        item.lokasi
                      }
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={17}
                  className="mt-1 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#116530]"
                />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}