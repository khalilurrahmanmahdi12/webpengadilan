import {
  ArrowLeft,
  CalendarDays,
  Megaphone,
} from 'lucide-react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { cariPengumuman } from '../../data/pengumumanData'

export default function DetailPengumuman() {
  const { slug } =
    useParams<{
      slug: string
    }>()

  if (!slug) {
    return (
      <Navigate
        to="/pengumuman"
        replace
      />
    )
  }

  const data =
    cariPengumuman(slug)

  if (!data) {
    return (
      <Navigate
        to="/pengumuman"
        replace
      />
    )
  }

  return (
    <article className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/pengumuman"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Pengumuman
        </Link>

        <header className="mt-8 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 font-bold text-[#116530]">
              <Megaphone
                size={16}
              />

              {data.kategori}
            </span>

            <span className="text-slate-300">
              •
            </span>

            <span className="inline-flex items-center gap-2 text-slate-500">
              <CalendarDays
                size={16}
              />

              {data.tanggal}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#17201b] lg:text-5xl">
            {data.judul}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            {data.ringkasan}
          </p>
        </header>

        <div className="mt-10">
          {data.isi.map(
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
      </div>
    </article>
  )
}