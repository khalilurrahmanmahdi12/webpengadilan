import {
  ArrowRight,
  Scale,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { layananHukum } from '../../data/layananHukumData'

export default function LegalServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        {/* KIRI */}
        <div className="lg:border-r lg:border-slate-200 lg:pr-12">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
            <Scale size={21} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Layanan Hukum
          </p>

          <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight text-[#17201b] lg:text-4xl">
            Informasi Hukum yang Mudah Diakses
          </h2>

          <p className="mt-5 max-w-md leading-7 text-slate-600">
            Temukan informasi prosedur, persyaratan,
            biaya, serta layanan bantuan hukum yang
            tersedia bagi masyarakat.
          </p>

          <Link
            to="/layanan"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
          >
            Lihat Semua Layanan

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* KANAN */}
        <div>
          {layananHukum.map((item) => (
            <Link
              key={item.slug}
              to={`/layanan/${item.slug}`}
              className="group grid grid-cols-[45px_1fr_25px] gap-4 border-b border-slate-200 py-6 first:pt-3"
            >
              <p className="text-sm font-extrabold text-[#116530]">
                {item.nomor}
              </p>

              <div>
                <h3 className="font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                  {item.judul}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.deskripsi}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="mt-1 text-slate-400 transition duration-200 group-hover:translate-x-1 group-hover:text-[#116530]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}