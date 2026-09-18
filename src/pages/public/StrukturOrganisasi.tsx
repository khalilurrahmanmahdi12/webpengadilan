import {
  ArrowLeft,
  BriefcaseBusiness,
  Gavel,
  Network,
  Scale,
  Users,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const bagian = [
  {
    title: 'Pimpinan',
    icon: Scale,
    items: [
      'Ketua',
      'Wakil Ketua',
    ],
  },
  {
    title: 'Hakim',
    icon: Gavel,
    items: [
      'Hakim Pengadilan Agama',
    ],
  },
  {
    title: 'Kepaniteraan',
    icon: Users,
    items: [
      'Panitera',
      'Panitera Muda Gugatan',
      'Panitera Muda Permohonan',
      'Panitera Muda Hukum',
      'Panitera Pengganti',
      'Jurusita',
    ],
  },
  {
    title: 'Kesekretariatan',
    icon: BriefcaseBusiness,
    items: [
      'Sekretaris',
      'Kasubbag Perencanaan, Teknologi Informasi dan Pelaporan',
      'Kasubbag Umum dan Keuangan',
      'Kasubbag Kepegawaian dan Organisasi Tata Laksana',
    ],
  },
]

export default function StrukturOrganisasi() {
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
            Struktur Organisasi
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Struktur organisasi Pengadilan  terdiri
            dari unsur pimpinan, hakim, kepaniteraan, dan
            kesekretariatan yang menjalankan fungsi peradilan serta
            administrasi pengadilan.
          </p>
        </div>

        <div className="mt-10 flex items-start gap-4 border-l-4 border-[#116530] bg-[#f8faf9] px-6 py-5">
          <Network
            size={22}
            className="mt-1 shrink-0 text-[#116530]"
          />

          <p className="text-sm leading-7 text-slate-600">
            Setiap unsur organisasi memiliki fungsi yang saling
            mendukung untuk memastikan proses persidangan, pelayanan
            masyarakat, administrasi perkara, dan pengelolaan kantor
            berjalan dengan baik.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {bagian.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="border-t-2 border-[#116530] bg-[#f8faf9] p-6"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={22}
                    className="text-[#116530]"
                  />

                  <h2 className="text-xl font-extrabold text-[#17201b]">
                    {item.title}
                  </h2>
                </div>

                <div className="mt-5 divide-y divide-slate-200">
                  {item.items.map((jabatan) => (
                    <div
                      key={jabatan}
                      className="py-3 text-sm font-semibold leading-6 text-slate-600"
                    >
                      {jabatan}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}