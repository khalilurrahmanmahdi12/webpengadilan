import {
  ArrowRight,
  CalendarDays,
  Search,
} from 'lucide-react'

import {
  useState,
} from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

const daftarPencarian = [
  {
    keyword: [
      'ptsp',
      'pelayanan',
      'verifikasi',
      'berkas',
    ],
    path: '/ptsp/verifikasi',
  },
  {
    keyword: [
      'jadwal',
      'sidang',
      'persidangan',
    ],
    path: '/jadwal-sidang',
  },
  {
    keyword: [
      'berita',
      'informasi terbaru',
    ],
    path: '/berita',
  },
  {
    keyword: [
      'pengumuman',
    ],
    path: '/pengumuman',
  },
  {
    keyword: [
      'agenda',
      'kegiatan',
    ],
    path: '/agenda',
  },
  {
    keyword: [
      'ppid',
      'informasi publik',
      'keterbukaan',
    ],
    path: '/ppid',
  },
  {
    keyword: [
      'dokumen',
      'unduhan',
      'formulir',
    ],
    path: '/dokumen',
  },
  {
    keyword: [
      'biaya',
      'panjar',
      'kalkulator',
    ],
    path: '/layanan/biaya-perkara',
  },
  {
    keyword: [
      'persyaratan',
      'syarat',
    ],
    path: '/layanan/persyaratan-berperkara',
  },
  {
    keyword: [
      'layanan hukum',
      'hukum',
    ],
    path: '/layanan',
  },
  {
    keyword: [
      'kontak',
      'alamat',
    ],
    path: '/kontak',
  },
]

export default function HeroSection() {
  const navigate =
    useNavigate()

  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    errorPencarian,
    setErrorPencarian,
  ] = useState('')

  const handleCari = () => {
    const keyword =
      pencarian
        .trim()
        .toLowerCase()

    if (!keyword) {
      setErrorPencarian(
        'Masukkan layanan atau informasi yang ingin dicari.',
      )

      return
    }

    const hasil =
      daftarPencarian.find(
        (item) =>
          item.keyword.some(
            (kata) =>
              keyword.includes(
                kata,
              ) ||
              kata.includes(
                keyword,
              ),
          ),
      )

    if (!hasil) {
      setErrorPencarian(
        'Informasi tidak ditemukan. Coba gunakan kata lain.',
      )

      return
    }

    setErrorPencarian('')

    navigate(
      hasil.path,
    )
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key ===
      'Enter'
    ) {
      handleCari()
    }
  }

  return (
    <section
      id="beranda"
      className="relative overflow-hidden"
    >
      {/* ============================== */}
      {/* BACKGROUND */}
      {/* ============================== */}

      <div className="absolute inset-0">
        <img
          src="/images/gedung.jpg"
          alt="Gedung Pengadilan"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b4226]/95 via-[#0b4226]/82 to-[#0b4226]/45" />
      </div>

      {/* ============================== */}
      {/* HERO CONTENT */}
      {/* ============================== */}

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          {/* LABEL */}
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f1cf69]">
            Website Resmi Pengadilan 
          </p>

          {/* HEADING */}
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Pelayanan Pengadilan

            <span className="block text-white">
              Lebih Mudah dan Terbuka
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
            Akses informasi perkara, jadwal sidang, layanan hukum,
            pengumuman, dan PTSP Online dalam satu portal.
          </p>

          {/* ============================== */}
          {/* BUTTONS */}
          {/* ============================== */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/ptsp/verifikasi"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d4a72c] px-6 py-3.5 text-sm font-bold text-[#17201b] transition hover:bg-[#e3b83b]"
            >
              Akses PTSP Online

              <ArrowRight
                size={17}
              />
            </Link>

            <Link
              to="/jadwal-sidang"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold !text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <CalendarDays
                size={17}
              />

              Jadwal Sidang
            </Link>
          </div>

          {/* ============================== */}
          {/* SEARCH */}
          {/* ============================== */}

          <div className="mt-8 max-w-2xl">
            <div className="flex flex-col gap-2 rounded-xl bg-white p-2 shadow-xl sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={pencarian}
                  onChange={(event) => {
                    setPencarian(
                      event.target.value,
                    )

                    if (
                      errorPencarian
                    ) {
                      setErrorPencarian(
                        '',
                      )
                    }
                  }}
                  onKeyDown={
                    handleKeyDown
                  }
                  placeholder="Cari layanan atau informasi..."
                  className="h-12 w-full rounded-lg bg-[#f8faf9] pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white"
                />
              </div>

              <button
                type="button"
                onClick={
                  handleCari
                }
                className="h-12 rounded-lg bg-[#116530] px-7 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
              >
                Cari
              </button>
            </div>

            {errorPencarian && (
              <p className="mt-2 rounded-lg bg-red-500/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {
                  errorPencarian
                }
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* QUICK MENU BOTTOM */}
      {/* ============================== */}

      <div className="relative border-t border-white/15 bg-[#0b4226]/95">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8">
          {/* PTSP */}
          <Link
            to="/ptsp/verifikasi"
            className="flex min-h-[60px] items-center justify-center border-b border-r border-white/10 px-4 py-4 text-center text-sm font-semibold !text-white transition hover:bg-white/10 md:border-b-0"
          >
            PTSP Online
          </Link>

          {/* SIPP */}
          <a
            href="https://sipp.pa-polewali.go.id/"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[60px] items-center justify-center border-b border-white/10 px-4 py-4 text-center text-sm font-semibold !text-white transition hover:bg-white/10 md:border-b-0 md:border-r"
          >
            Informasi Perkara
          </a>

          {/* JADWAL */}
          <Link
            to="/jadwal-sidang"
            className="flex min-h-[60px] items-center justify-center border-r border-white/10 px-4 py-4 text-center text-sm font-semibold !text-white transition hover:bg-white/10"
          >
            Jadwal Sidang
          </Link>

          {/* PENGADUAN */}
          <a
            href="https://siwas.mahkamahagung.go.id/"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[60px] items-center justify-center px-4 py-4 text-center text-sm font-semibold !text-white transition hover:bg-white/10"
          >
            Pengaduan
          </a>
        </div>
      </div>
    </section>
  )
}