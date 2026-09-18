import {
  Calculator,
  ClipboardCheck,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  X,
} from 'lucide-react'

import {
  NavLink,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

interface Props {
  terbuka: boolean
  tutupSidebar: () => void
}

const menu = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Verifikasi Berkas',
    path: '/admin/verifikasi',
    icon: ClipboardCheck,
    end: false,
  },
  {
    label: 'Antrean PTSP',
    path: '/admin/antrean',
    icon: ListOrdered,
    end: false,
  },
  {
    label: 'Kalkulator Biaya',
    path: '/admin/biaya-perkara',
    icon: Calculator,
    end: false,
  },
]

export default function AdminSidebar({
  terbuka,
  tutupSidebar,
}: Props) {
  const navigate =
    useNavigate()

  const logout =
    useAuthStore(
      (state) => state.logout,
    )

  const handleLogout = () => {
    logout()

    navigate(
      '/admin/login',
      {
        replace: true,
      },
    )
  }

  return (
    <>
      {terbuka && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={tutupSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#083a21] text-white transition-transform duration-200 lg:translate-x-0 ${
          terbuka
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        {/* BRAND */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1c96f]">
              Admin
            </p>

            <p className="mt-1 text-base font-extrabold text-white">
              PTSP Online
            </p>
          </div>

          <button
            type="button"
            onClick={tutupSidebar}
            className="text-white/70 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-5">
          <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
            Menu Utama
          </p>

          <div className="space-y-1.5">
            {menu.map((item) => {
              const Icon =
                item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={tutupSidebar}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#116530] text-white before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-full before:bg-[#d4a72c]'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={19} />

                  <span>
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={19} />

            Keluar
          </button>
        </div>
      </aside>
    </>
  )
}