import {
  ArrowLeft,
  Building2,
  MapPin,
  Scale,
} from 'lucide-react'

import { Link } from 'react-router-dom'

export default function WilayahYurisdiksi() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft size={17} />
          Kembali ke Beranda
        </Link>

        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Pengadilan 
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Wilayah Yurisdiksi
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Wilayah yurisdiksi adalah wilayah hukum tempat
            Pengadilan  melaksanakan kewenangan
            peradilan dan memberikan pelayanan kepada masyarakat.
          </p>
        </div>

        <div className="mt-10 flex gap-4 border-l-4 border-[#116530] bg-[#f8faf9] px-6 py-5">
          <Scale
            size={22}
            className="mt-1 shrink-0 text-[#116530]"
          />

          <p className="text-sm leading-7 text-slate-600">
            Pengadilan  memiliki wilayah hukum yang
            mencakup dua kabupaten di Provinsi Sulawesi Barat.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
              <MapPin size={21} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#116530]">
              Wilayah 01
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#17201b]">
              Kabupaten Polewali Mandar
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Kabupaten Polewali Mandar merupakan salah satu wilayah
              utama yang termasuk dalam yurisdiksi Pengadilan Agama
              Polewali.
            </p>
          </div>

          <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
              <Building2 size={21} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#116530]">
              Wilayah 02
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#17201b]">
              Kabupaten Mamasa
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Kabupaten Mamasa juga termasuk dalam wilayah hukum
              Pengadilan .
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500">
            Untuk memastikan kewenangan berdasarkan alamat para pihak,
            masyarakat dapat menghubungi petugas PTSP Pengadilan Agama
            Polewali.
          </p>
        </div>
      </div>
    </section>
  )
}