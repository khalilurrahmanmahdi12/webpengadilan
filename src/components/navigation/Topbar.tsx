import {
  Clock3,
  Mail,
  Phone,
} from 'lucide-react'

export default function Topbar() {
  return (
    <div className="bg-[#0b4226] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              strokeWidth={2}
            />

            <span>
              Senin - Jumat, 08.00 - 16.30 WITA
            </span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Phone
              size={15}
              strokeWidth={2}
            />

            <span>
              (0428) 21018
            </span>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Mail
              size={15}
              strokeWidth={2}
            />

            <span>
              pa@example.go.id
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide">
          <button className="transition hover:text-[#f3d675]">
            Aksesibilitas
          </button>

          <span className="h-4 w-px bg-white/30" />

          <button className="transition hover:text-[#f3d675]">
            Kontak
          </button>
        </div>
      </div>
    </div>
  )
}