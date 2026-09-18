interface InformasiPageProps {
  title: string
  subtitle?: string
}

export default function InformasiPage({
  title,
  subtitle,
}: InformasiPageProps) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
          Pengadilan 
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          {subtitle ??
            'Informasi lengkap akan tersedia pada halaman ini.'}
        </p>
      </div>
    </section>
  )
}