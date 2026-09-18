import {
  ChevronDown,
  Menu,
  Search,
  X,
} from 'lucide-react'

import {
  useState,
} from 'react'

import {
  Link,
  NavLink,
} from 'react-router-dom'

interface SubMenuItem {
  label: string
  path: string
}

interface MenuItem {
  label: string
  path?: string
  children?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    label: 'Beranda',
    path: '/',
  },

  {
    label: 'Pengadilan',
    children: [
      {
        label: 'Profil Pengadilan',
        path: '/profil',
      },
      {
        label: 'Visi & Misi',
        path: '/visi-misi',
      },
      {
        label: 'Sejarah',
        path: '/sejarah',
      },
      {
        label: 'Struktur Organisasi',
        path: '/struktur-organisasi',
      },
      {
        label: 'Wilayah Yurisdiksi',
        path: '/wilayah-yurisdiksi',
      },
    ],
  },

  {
    label: 'Layanan Hukum',
    children: [
      {
        label: 'Semua Layanan',
        path: '/layanan',
      },
      {
        label: 'Prosedur Berperkara',
        path: '/layanan/prosedur-berperkara',
      },
      {
        label: 'Persyaratan Berperkara',
        path: '/layanan/persyaratan-berperkara',
      },
      {
        label: 'Biaya Perkara',
        path: '/layanan/biaya-perkara',
      },
      {
        label: 'Posbakum',
        path: '/layanan/posbakum',
      },
      {
        label: 'Perkara Prodeo',
        path: '/layanan/perkara-prodeo',
      },
      {
        label: 'Mediasi',
        path: '/layanan/mediasi',
      },
      {
        label: 'Jadwal Sidang',
        path: '/jadwal-sidang',
      },
    ],
  },

  {
    label: 'PTSP Online',
    children: [
      {
        label: 'Verifikasi Berkas Online',
        path: '/ptsp/verifikasi',
      },
      {
        label: 'Ajukan Verifikasi',
        path: '/ptsp/verifikasi/ajukan',
      },
      {
        label: 'Lacak Verifikasi',
        path: '/ptsp/verifikasi/lacak',
      },
      {
        label: 'Ambil Antrean',
        path: '/ptsp/antrean/ambil',
      },
      {
        label: 'Pantau Antrean',
        path: '/ptsp/antrean/pantau',
      },
    ],
  },

  {
    label: 'Informasi Publik',
    children: [
      {
        label: 'PPID',
        path: '/ppid',
      },
      {
        label: 'Pengumuman',
        path: '/pengumuman',
      },
      {
        label: 'Agenda',
        path: '/agenda',
      },
      {
        label: 'Berita',
        path: '/berita',
      },
      {
        label: 'Dokumen Publik',
        path: '/dokumen',
      },
    ],
  },

  {
    label: 'Kontak',
    path: '/kontak',
  },
]

export default function Navbar() {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false)

  const [
    mobileDropdown,
    setMobileDropdown,
  ] = useState<string | null>(
    null,
  )

  const [
    desktopDropdown,
    setDesktopDropdown,
  ] = useState<string | null>(
    null,
  )

  const closeMobileMenu =
    () => {
      setMobileOpen(false)
      setMobileDropdown(null)
    }

  const toggleMobileDropdown =
    (label: string) => {
      setMobileDropdown(
        (
          current,
        ) =>
          current === label
            ? null
            : label,
      )
    }

  return (
    <nav className="sticky top-0 z-50 bg-[#116530] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[58px] items-center justify-between">
          {/* ============================== */}
          {/* DESKTOP MENU */}
          {/* ============================== */}

          <div className="hidden h-[58px] items-stretch lg:flex">
            {menuItems.map(
              (item) => {
                const hasChildren =
                  !!item.children

                if (
                  !hasChildren &&
                  item.path
                ) {
                  return (
                    <NavLink
                      key={
                        item.label
                      }
                      to={
                        item.path
                      }
                      end={
                        item.path ===
                        '/'
                      }
                      className={({
                        isActive,
                      }) =>
                        `flex items-center px-5 text-sm font-bold !text-white transition ${
                          isActive
                            ? 'bg-[#0b4d2d]'
                            : 'hover:bg-[#0d5a32]'
                        }`
                      }
                    >
                      {
                        item.label
                      }
                    </NavLink>
                  )
                }

                return (
                  <div
                    key={
                      item.label
                    }
                    className="relative"
                    onMouseEnter={() =>
                      setDesktopDropdown(
                        item.label,
                      )
                    }
                    onMouseLeave={() =>
                      setDesktopDropdown(
                        null,
                      )
                    }
                  >
                    <button
                      type="button"
                      className={`flex h-[58px] items-center gap-2 px-5 text-sm font-bold !text-white transition ${
                        desktopDropdown ===
                        item.label
                          ? 'bg-[#0b4d2d]'
                          : 'hover:bg-[#0d5a32]'
                      }`}
                    >
                      {
                        item.label
                      }

                      <ChevronDown
                        size={15}
                        className={`transition-transform ${
                          desktopDropdown ===
                          item.label
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    {desktopDropdown ===
                      item.label && (
                      <div className="absolute left-0 top-full min-w-[250px] border border-slate-200 bg-white shadow-xl">
                        {item.children?.map(
                          (
                            child,
                          ) => (
                            <Link
                              key={
                                child.path
                              }
                              to={
                                child.path
                              }
                              className="block border-b border-slate-100 px-5 py-3.5 text-sm font-semibold text-slate-700 transition last:border-b-0 hover:bg-[#f3f7f4] hover:text-[#116530]"
                            >
                              {
                                child.label
                              }
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                )
              },
            )}
          </div>

          {/* ============================== */}
          {/* SEARCH DESKTOP */}
          {/* ============================== */}

          <div className="hidden lg:flex">
            <button
              type="button"
              aria-label="Cari"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10"
            >
              <Search
                size={18}
              />
            </button>
          </div>

          {/* ============================== */}
          {/* MOBILE TITLE */}
          {/* ============================== */}

          <Link
            to="/"
            onClick={
              closeMobileMenu
            }
            className="font-extrabold !text-white lg:hidden"
          >
            PENGADILAN 
          </Link>

          {/* ============================== */}
          {/* MOBILE BUTTON */}
          {/* ============================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (
                  current,
                ) =>
                  !current,
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Buka menu"
          >
            {mobileOpen ? (
              <X
                size={22}
              />
            ) : (
              <Menu
                size={22}
              />
            )}
          </button>
        </div>
      </div>

      {/* ============================== */}
      {/* MOBILE MENU */}
      {/* ============================== */}

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0b4d2d] lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {menuItems.map(
              (item) => {
                const hasChildren =
                  !!item.children

                if (
                  !hasChildren &&
                  item.path
                ) {
                  return (
                    <NavLink
                      key={
                        item.label
                      }
                      to={
                        item.path
                      }
                      end={
                        item.path ===
                        '/'
                      }
                      onClick={
                        closeMobileMenu
                      }
                      className={({
                        isActive,
                      }) =>
                        `block rounded-lg px-4 py-3 text-sm font-bold !text-white transition ${
                          isActive
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        }`
                      }
                    >
                      {
                        item.label
                      }
                    </NavLink>
                  )
                }

                const isOpen =
                  mobileDropdown ===
                  item.label

                return (
                  <div
                    key={
                      item.label
                    }
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileDropdown(
                          item.label,
                        )
                      }
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold !text-white"
                    >
                      {
                        item.label
                      }

                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isOpen
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mb-2 overflow-hidden rounded-lg bg-white">
                        {item.children?.map(
                          (
                            child,
                          ) => (
                            <Link
                              key={
                                child.path
                              }
                              to={
                                child.path
                              }
                              onClick={
                                closeMobileMenu
                              }
                              className="block border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition last:border-b-0 hover:bg-[#f3f7f4] hover:text-[#116530]"
                            >
                              {
                                child.label
                              }
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                )
              },
            )}

            {/* MOBILE SEARCH */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold !text-white"
              >
                <Search
                  size={17}
                />

                Cari Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}