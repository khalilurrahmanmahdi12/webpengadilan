import {
  ArrowLeft,
  CheckCircle2,
  Info,
} from 'lucide-react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { cariInformasiPublik } from '../../data/ppidData'

export default function DetailPPID() {
  const { slug } =
    useParams<{
      slug: string
    }>()

  if (!slug) {
    return (
      <Navigate
        to="/ppid"
        replace
      />
    )
  }

  const data =
    cariInformasiPublik(
      slug,
    )

  if (!data) {
    return (
      <Navigate
        to="/ppid"
        replace
      />
    )
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/ppid"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft size={17} />
          Kembali ke PPID
        </Link>

        <div className="mt-8 border-b border-slate-200 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            {data.kategori}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            {data.judul}
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            {data.deskripsi}
          </p>
        </div>

        <div className="mt-10">
          {data.isi.map(
            (bagian, index) => (
              <section
                key={`${bagian.judul}-${index}`}
                className="border-b border-slate-200 py-8 first:pt-0 last:border-b-0"
              >
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
                    <Info size={17} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-extrabold text-[#17201b]">
                      {bagian.judul}
                    </h2>

                    {bagian.deskripsi && (
                      <p className="mt-4 leading-8 text-slate-600">
                        {bagian.deskripsi}
                      </p>
                    )}

                    {bagian.poin && (
                      <div className="mt-5 space-y-4">
                        {bagian.poin.map(
                          (
                            poin,
                            poinIndex,
                          ) => (
                            <div
                              key={`${poin}-${poinIndex}`}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2
                                size={18}
                                className="mt-1 shrink-0 text-[#116530]"
                              />

                              <p className="text-sm leading-7 text-slate-600">
                                {poin}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ),
          )}
        </div>

        <div className="mt-10 border-l-4 border-[#116530] bg-[#f8faf9] px-5 py-5">
          <p className="font-bold text-[#17201b]">
            Membutuhkan dokumen?
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            Dokumen dan formulir publik dapat diakses melalui halaman Unduhan Dokumen.
          </p>

          <Link
            to="/dokumen"
            className="mt-4 inline-flex text-sm font-bold text-[#116530]"
          >
            Buka Dokumen Publik
          </Link>
        </div>
      </div>
    </section>
  )
}