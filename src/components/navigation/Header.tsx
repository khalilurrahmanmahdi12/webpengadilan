import {
  Search,
  ShieldCheck,
} from 'lucide-react'

import logoMA from '../../assets/logo-ma.png'

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={logoMA}
            alt="Logo Pengadilan"
            className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
          />

          <div className="min-w-0">
       
            <h1 className="text-xl font-extrabold leading-tight text-[#17201b] sm:text-2xl md:text-3xl">
              Pengadilan 
            </h1>

            <div className="mt-2 hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
              <ShieldCheck
                size={16}
                className="text-[#b88a1f]"
              />

              <span>
                Melayani dengan Profesional, Transparan dan Akuntabel
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#116530] hover:bg-[#f1f8f4] hover:text-[#116530] md:flex"
          aria-label="Cari"
        >
          <Search size={20} />
        </button>
      </div>
    </header>
  )
}