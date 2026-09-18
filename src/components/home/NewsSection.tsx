import {
  ArrowRight,
  CalendarDays,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { beritaData } from '../../data/beritaData'

export default function NewsSection() {
  const beritaTerbaru =
    beritaData.slice(0, 3)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Informasi Terkini
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b] lg:text-4xl">
              Berita Terbaru
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Informasi kegiatan dan
              perkembangan terbaru
              Pengadilan 
            </p>
          </div>

          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
          >
            Lihat Semua Berita

            <ArrowRight
              size={16}
            />
          </Link>
        </div>

        {/* LIST */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {beritaTerbaru.map(
            (item) => (
              <article
                key={item.id}
                className="group border-b border-slate-200 pb-7"
              >
                <Link
                  to={`/berita/${item.slug}`}
                  className="block overflow-hidden rounded-xl bg-slate-100"
                >
                  <img
                    src={
                      item.gambar
                    }
                    alt={
                      item.judul
                    }
                    className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </Link>

                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#116530]">
                    {
                      item.kategori
                    }
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-slate-500">
                    <CalendarDays
                      size={14}
                    />

                    {
                      item.tanggal
                    }
                  </span>
                </div>

                <Link
                  to={`/berita/${item.slug}`}
                  className="mt-3 block"
                >
                  <h3 className="text-lg font-extrabold leading-7 text-[#17201b] transition group-hover:text-[#116530]">
                    {
                      item.judul
                    }
                  </h3>
                </Link>

                <Link
                  to={`/berita/${item.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
                >
                  Baca Selengkapnya

                  <ArrowRight
                    size={16}
                  />
                </Link>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}