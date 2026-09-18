import {
  ArrowLeft,
  CheckCircle2,
  Target,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const misi = [
  'Mewujudkan peradilan yang sederhana, cepat, biaya ringan dan transparan.',
  'Meningkatkan kualitas Sumber Daya Aparatur Peradilan dalam rangka peningkatan pelayanan pada masyarakat.',
  'Melaksanakan pengawasan dan pembinaan yang efektif dan efisien.',
  'Melaksanakan tertib administrasi dan manajemen peradilan yang efektif dan efisien.',
  'Mengupayakan tersedianya sarana dan prasarana peradilan sesuai dengan kebutuhan dan ketentuan yang berlaku.',
]

export default function VisiMisi() {
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
            Visi dan Misi
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Visi dan misi menjadi arah pelaksanaan tugas dan pelayanan
            Pengadilan  kepada masyarakat.
          </p>
        </div>

        <div className="mt-12 border-l-4 border-[#d4a72c] bg-[#f8faf9] px-7 py-8">
          <div className="flex items-center gap-3">
            <Target
              size={24}
              className="text-[#116530]"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Visi
            </p>
          </div>

          <p className="mt-5 text-2xl font-extrabold leading-10 text-[#17201b] lg:text-3xl">
            “Terwujudnya Pengadilan  yang Agung”
          </p>
        </div>

        <div className="mt-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Misi
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#17201b]">
            Upaya Mewujudkan Visi
          </h2>

          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {misi.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 py-5"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#116530]">
                    MISI {String(index + 1).padStart(2, '0')}
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}