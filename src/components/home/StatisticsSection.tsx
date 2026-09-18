import { statistikPerkara } from '../../data/homeData'

export default function StatisticsSection() {
  return (
    <section className="bg-[#0b4226] py-14 text-white lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e3c568]">
              Statistik
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Statistik Perkara
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
              Ringkasan data perkara Pengadilan 
              sebagai bentuk keterbukaan informasi kepada masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {statistikPerkara.map((item, index) => (
              <div
                key={item.id}
                className={`px-4 ${
                  index !== 0
                    ? 'border-l border-white/15'
                    : ''
                }`}
              >
                <p className="text-3xl font-extrabold text-white sm:text-4xl">
                  {item.value}
                </p>

                <p className="mt-2 text-sm font-medium text-white/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}