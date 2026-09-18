import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-[#083a21] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
           

            <h2 className="mt-3 text-2xl font-extrabold text-white">
              Pengadilan 
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              Website resmi Pengadilan  sebagai media informasi,
              transparansi, dan pelayanan kepada masyarakat.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Tautan
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/65">
              <a
                href="#beranda"
                className="block transition hover:text-white"
              >
                Beranda
              </a>

              <a
                href="#ptsp"
                className="block transition hover:text-white"
              >
                PTSP Online
              </a>

              <a
                href="#jadwal-sidang"
                className="block transition hover:text-white"
              >
                Jadwal Sidang
              </a>

              <a
                href="#berita"
                className="block transition hover:text-white"
              >
                Berita
              </a>

              <a
                href="#ppid"
                className="block transition hover:text-white"
              >
                PPID
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Kontak
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/65">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#e0c467]"
                />

                <span>
                  Polewali Mandar, Sulawesi Barat
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  className="shrink-0 text-[#e0c467]"
                />

                <span>
                  (0428) 21018
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  className="shrink-0 text-[#e0c467]"
                />

                <span>
                  pa@example.go.id
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Clock3
                  size={17}
                  className="mt-0.5 shrink-0 text-[#e0c467]"
                />

                <span>
                  Senin - Jumat
                  <br />
                  08.00 - 16.30 WITA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Pengadilan 
            </p>

            <p>
              Portal Pelayanan dan Informasi Publik
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}