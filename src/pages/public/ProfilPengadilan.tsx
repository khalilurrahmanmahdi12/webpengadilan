import {
  ArrowLeft,
  Building2,
  Gavel,
  MapPin,
  Scale,
} from 'lucide-react'

import { Link } from 'react-router-dom'

export default function ProfilPengadilan() {
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
            Profil Pengadilan
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Pengadilan  merupakan pengadilan tingkat
            pertama dalam lingkungan Peradilan Agama yang melaksanakan
            tugas kekuasaan kehakiman bagi masyarakat di wilayah
            yurisdiksinya.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <InfoCard
            icon={Building2}
            title="Tentang Pengadilan"
            description="Pengadilan  melaksanakan pelayanan peradilan, administrasi perkara, pelayanan informasi, dan berbagai layanan hukum bagi masyarakat."
          />

          <InfoCard
            icon={Scale}
            title="Lingkungan Peradilan"
            description="Pengadilan  berada dalam lingkungan Peradilan Agama di bawah Mahkamah Agung Republik Indonesia."
          />

          <InfoCard
            icon={Gavel}
            title="Pelayanan Perkara"
            description="Pelayanan meliputi penyelesaian perkara yang menjadi kewenangan Peradilan Agama, pelayanan informasi perkara, mediasi, serta administrasi peradilan."
          />

          <InfoCard
            icon={MapPin}
            title="Wilayah Hukum"
            description="Wilayah yurisdiksi Pengadilan  mencakup Kabupaten Polewali Mandar dan Kabupaten Mamasa."
          />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-extrabold text-[#17201b]">
            Alamat Pengadilan
          </h2>

          <div className="mt-5 border-l-4 border-[#116530] bg-[#f8faf9] px-6 py-5">
            <p className="font-bold text-[#17201b]">
              Pengadilan 
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Jl. Budi Utomo No. 23, Madatte, Polewali,
              Kabupaten Polewali Mandar, Sulawesi Barat 91314.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2
  title: string
  description: string
}) {
  return (
    <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-6">
      <Icon
        size={24}
        className="text-[#116530]"
      />

      <h2 className="mt-4 text-lg font-extrabold text-[#17201b]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </div>
  )
}