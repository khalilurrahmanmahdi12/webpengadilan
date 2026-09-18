import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
} from 'lucide-react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import {
  beritaData,
  cariBerita,
} from '../../data/beritaData'

export default function DetailBerita() {
  const { slug } =
    useParams<{
      slug: string
    }>()

  if (!slug) {
    return (
      <Navigate
        to="/berita"
        replace
      />
    )
  }

  const berita =
    cariBerita(slug)

  if (!berita) {
    return (
      <Navigate
        to="/berita"
        replace
      />
    )
  }

  const beritaLain =
    beritaData
      .filter(
        (item) =>
          item.id !==
          berita.id,
      )
      .slice(0, 3)

  return (
    <article className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Berita
        </Link>

        {/* HEADER */}
        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-[#116530]">
              {
                berita.kategori
              }
            </span>

            <span className="text-slate-300">
              •
            </span>

            <span className="inline-flex items-center gap-2 text-slate-500">
              <CalendarDays
                size={16}
              />

              {
                berita.tanggal
              }
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#17201b] lg:text-5xl">
            {berita.judul}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
            {
              berita.ringkasan
            }
          </p>
        </header>

        {/* IMAGE */}
        <div className="mt-10 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={berita.gambar}
            alt={berita.judul}
            className="max-h-[560px] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* ISI */}
          <div className="max-w-3xl">
            {berita.isi.map(
              (
                paragraf,
                index,
              ) => (
                <p
                  key={index}
                  className="mb-6 text-base leading-8 text-slate-600"
                >
                  {paragraf}
                </p>
              ),
            )}
          </div>

          {/* BERITA LAIN */}
          <aside>
            <div className="border-t-2 border-[#116530]">
              <h2 className="py-5 text-lg font-extrabold text-[#17201b]">
                Berita Lainnya
              </h2>

              <div className="divide-y divide-slate-200">
                {beritaLain.map(
                  (item) => (
                    <Link
                      key={item.id}
                      to={`/berita/${item.slug}`}
                      className="group block py-5"
                    >
                      <p className="text-xs font-bold text-[#116530]">
                        {
                          item.tanggal
                        }
                      </p>

                      <h3 className="mt-2 text-sm font-extrabold leading-6 text-[#17201b] transition group-hover:text-[#116530]">
                        {
                          item.judul
                        }
                      </h3>

                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-slate-500">
                        Baca

                        <ArrowRight
                          size={14}
                        />
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}