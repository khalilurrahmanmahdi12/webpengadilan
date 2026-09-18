import {
  ArrowRight,
  BadgeHelp,
  Calculator,
  FileCheck2,
  Handshake,
  Scale,
  ShieldCheck,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import { layananHukum } from '../../data/layananHukumData'

function getIcon(slug: string) {
  switch (slug) {
    case 'prosedur-berperkara':
      return Scale

    case 'persyaratan-berperkara':
      return FileCheck2

    case 'biaya-perkara':
      return Calculator

    case 'posbakum':
      return BadgeHelp

    case 'perkara-prodeo':
      return ShieldCheck

    case 'mediasi':
      return Handshake

    default:
      return Scale
  }
}

export default function Layanan() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Pelayanan Pengadilan
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
            Layanan Hukum
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Temukan informasi layanan hukum dan prosedur
            pelayanan Pengadilan .
          </p>
        </div>

        {/* LIST */}
        <div className="mt-10 border-t border-slate-200">
          {layananHukum.map((item) => {
            const Icon =
              getIcon(item.slug)

            return (
              <Link
                key={item.slug}
                to={`/layanan/${item.slug}`}
                className="group flex items-center gap-5 border-b border-slate-200 py-6 transition hover:bg-[#f8faf9]"
              >
                {/* ICON */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530] transition group-hover:bg-[#116530] group-hover:text-white">
                  <Icon size={19} />
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                    {item.judul}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.deskripsi}
                  </p>
                </div>

                {/* ARROW */}
                <ArrowRight
                  size={18}
                  className="shrink-0 text-slate-400 transition duration-200 group-hover:translate-x-1 group-hover:text-[#116530]"
                />
              </Link>
            )
          })}
        </div>

        {/* INFO */}
        <div className="mt-10 flex items-start gap-3 border-l-4 border-[#116530] bg-[#f8faf9] px-5 py-4">
          <Scale
            size={21}
            className="mt-0.5 shrink-0 text-[#116530]"
          />

          <p className="text-sm leading-6 text-slate-600">
            Pilih salah satu layanan di atas untuk melihat
            informasi dan prosedur secara lengkap.
          </p>
        </div>
      </div>
    </section>
  )
}