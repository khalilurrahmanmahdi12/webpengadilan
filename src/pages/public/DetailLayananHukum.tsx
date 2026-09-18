import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { cariLayananHukum } from '../../data/layananHukumData'

export default function DetailLayananHukum() {
  const { slug } =
    useParams<{
      slug: string
    }>()

  if (!slug) {
    return (
      <Navigate
        to="/layanan"
        replace
      />
    )
  }

  const layanan =
    cariLayananHukum(
      slug,
    )

  if (!layanan) {
    return (
      <Navigate
        to="/layanan"
        replace
      />
    )
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}
        <Link
          to="/layanan"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530] transition hover:text-[#0b4226]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Layanan
        </Link>

        {/* HEADER */}
        <div className="mt-8 grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[100px_1fr]">
          <div>
            <p className="text-5xl font-extrabold text-[#116530]">
              {layanan.nomor}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Layanan Hukum
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#17201b] lg:text-5xl">
              {layanan.judul}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              {layanan.ringkasan}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* MAIN */}
          <div>
            {layanan.bagian.map(
              (
                bagian,
                bagianIndex,
              ) => (
                <section
                  key={`${bagian.judul}-${bagianIndex}`}
                  className="border-b border-slate-200 py-8 first:pt-0 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-sm font-extrabold text-[#116530]">
                      {bagianIndex +
                        1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-extrabold text-[#17201b]">
                        {
                          bagian.judul
                        }
                      </h2>

                      {bagian.deskripsi && (
                        <p className="mt-4 leading-8 text-slate-600">
                          {
                            bagian.deskripsi
                          }
                        </p>
                      )}

                      {bagian.poin &&
                        bagian.poin
                          .length >
                          0 && (
                          <div className="mt-6 space-y-4">
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
                                    size={
                                      19
                                    }
                                    className="mt-1 shrink-0 text-[#116530]"
                                  />

                                  <p className="text-sm leading-7 text-slate-600">
                                    {
                                      poin
                                    }
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

          {/* SIDEBAR */}
          <aside>
            <div className="border-t-2 border-[#116530] bg-[#f8faf9] px-5 py-6">
              <div className="flex items-center gap-2 text-[#116530]">
                <Info
                  size={19}
                />

                <p className="text-sm font-extrabold">
                  Butuh Bantuan?
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Jika masih memiliki
                pertanyaan mengenai
                layanan ini, gunakan
                PTSP Online atau
                datang langsung ke
                Pengadilan Agama
                Polewali.
              </p>

              <Link
                to="/ptsp/verifikasi/ajukan"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
              >
                Buka PTSP Online

                <ArrowRight
                  size={16}
                />
              </Link>
            </div>

            {layanan.slug ===
              'biaya-perkara' && (
              <div className="mt-5 border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
                <p className="text-sm font-bold text-amber-800">
                  Kalkulator segera tersedia
                </p>

                <p className="mt-2 text-xs leading-6 text-amber-700">
                  Pada Step 14C
                  halaman ini akan
                  dilengkapi
                  Panjar
                  Biaya Perkara.
                </p>
              </div>
            )}

            {layanan.slug ===
              'persyaratan-berperkara' && (
              <div className="mt-5 border-l-4 border-[#116530] bg-[#edf7f1] px-5 py-4">
                <p className="text-sm font-bold text-[#116530]">
                  Persyaratan Interaktif
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Pada Step 14D,
                  pengguna dapat
                  memilih jenis
                  perkara dan
                  melihat dokumen
                  yang diperlukan.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}