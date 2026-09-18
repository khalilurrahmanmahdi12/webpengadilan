import {
  BadgeHelp,
  BookOpenCheck,
  FileText,
  Gavel,
  Landmark,
  Scale,
} from 'lucide-react'

const layanan = [
  {
    title: 'PTSP Online',
    description: 'Ajukan layanan dan pantau proses permohonan.',
    icon: Landmark,
    href: '#ptsp',
  },
  {
    title: 'Jadwal Sidang',
    description: 'Lihat jadwal persidangan yang tersedia.',
    icon: Gavel,
    href: '#jadwal-sidang',
  },
  {
    title: 'Informasi Perkara',
    description: 'Akses informasi dan perkembangan perkara.',
    icon: Scale,
    href: '#sipp',
  },
  {
    title: 'Format Gugatan',
    description: 'Unduh format gugatan dan permohonan.',
    icon: FileText,
    href: '#format-gugatan',
  },
  {
    title: 'Direktori Putusan',
    description: 'Akses direktori putusan pengadilan.',
    icon: BookOpenCheck,
    href: '#direktori',
  },
  {
    title: 'Pengaduan',
    description: 'Sampaikan pengaduan atau masukan layanan.',
    icon: BadgeHelp,
    href: '#pengaduan',
  },
]

export default function QuickAccess() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Akses Cepat
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#17201b] sm:text-4xl">
            Layanan Utama
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Temukan layanan dan informasi yang paling sering dibutuhkan.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {layanan.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#116530]/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf4ee] text-[#116530] transition group-hover:bg-[#116530] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#17201b]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}