import {
  ArrowRight,
  FileText,
  ShieldCheck,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

export default function PublicInformationSection() {
  const layananEksternal = [
    {
      nama: 'SIPP',
      url: 'https://sipp.pa-polewali.go.id/',
    },
    {
      nama: 'E-Court',
      url: 'https://ecourt.mahkamahagung.go.id/',
    },
    {
      nama: 'Direktori Putusan',
      url: 'https://putusan3.mahkamahagung.go.id/',
    },
    {
      nama: 'SIWAS',
      url: 'https://siwas.mahkamahagung.go.id/',
    },
    {
      nama: 'Mahkamah Agung RI',
      url: 'https://www.mahkamahagung.go.id/',
    },
    {
      nama: 'Badilag',
      url: 'https://badilag.mahkamahagung.go.id/',
    },
  ]

  return (
    <section className="bg-[#f7f9f8] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* ============================== */}
          {/* INFORMASI PUBLIK */}
          {/* ============================== */}

          <div className="border-r-0 border-slate-200 lg:border-r lg:pr-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Informasi Publik
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b] sm:text-4xl">
              Keterbukaan Informasi
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Pengadilan  menyediakan akses informasi
              publik secara transparan sesuai ketentuan yang berlaku.
            </p>

            <div className="mt-8 space-y-5">
              {/* PPID */}
              <Link
                to="/ppid"
                className="group flex items-start gap-4"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f3ed] text-[#116530]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#17201b] transition group-hover:text-[#116530]">
                    PPID
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Akses layanan Pejabat Pengelola Informasi dan Dokumentasi.
                  </p>
                </div>
              </Link>

              {/* LAPORAN & TRANSPARANSI */}
              <Link
                to="/ppid"
                className="group flex items-start gap-4"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f3ed] text-[#116530]">
                  <FileText size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#17201b] transition group-hover:text-[#116530]">
                    Laporan dan Transparansi
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Akses laporan kinerja, anggaran, statistik, dan informasi lainnya.
                  </p>
                </div>
              </Link>
            </div>

            <Link
              to="/ppid"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#116530] transition hover:text-[#0b4226]"
            >
              Buka Informasi Publik

              <ArrowRight size={16} />
            </Link>
          </div>

          {/* ============================== */}
          {/* AKSES EKSTERNAL */}
          {/* ============================== */}

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Akses Eksternal
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b]">
              Layanan Peradilan
            </h2>

            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {layananEksternal.map((item) => (
                <a
                  key={item.nama}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4"
                >
                  <span className="text-sm font-bold text-[#17201b] transition group-hover:text-[#116530]">
                    {item.nama}
                  </span>

                  <ArrowRight
                    size={16}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#116530]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}