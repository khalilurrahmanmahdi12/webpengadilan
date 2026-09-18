import {
  ArrowRight,
  Download,
  FileText,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { dokumenData } from '../../data/dokumenData'

export default function DocumentSection() {
  const dokumen =
    dokumenData.slice(0, 5)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Dokumen Publik
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b] lg:text-4xl">
              Unduhan Dokumen
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Unduh formulir dan dokumen yang sering dibutuhkan.
            </p>
          </div>

          <Link
            to="/dokumen"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
          >
            Lihat Semua Dokumen

            <ArrowRight
              size={16}
            />
          </Link>
        </div>

        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {dokumen.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
                  <FileText
                    size={19}
                  />
                </div>

                <div>
                  <p className="font-extrabold text-[#17201b]">
                    {item.judul}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.format}
                    {' • '}
                    {item.ukuran}
                  </p>
                </div>
              </div>

              <a
                href={item.file}
                download
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-bold text-slate-600 transition hover:border-[#116530] hover:bg-[#edf7f1] hover:text-[#116530]"
              >
                <Download
                  size={17}
                />

                Unduh
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}