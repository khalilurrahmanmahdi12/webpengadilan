import {
  Menu,
  UserRound,
} from 'lucide-react'

import { useAuthStore } from '../../store/authStore'

interface Props {
  bukaSidebar: () => void
}

export default function AdminNavbar({
  bukaSidebar,
}: Props) {
  const user =
    useAuthStore(
      (state) => state.user,
    )

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={
            bukaSidebar
          }
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-sm font-bold text-[#17201b]">
            Administrasi PTSP
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            Pengadilan 
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold text-[#17201b]">
            {user?.nama}
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
          <UserRound
            size={20}
          />
        </div>
      </div>
    </header>
  )
}