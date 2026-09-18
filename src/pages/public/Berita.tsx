import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { beritaData } from '../../data/beritaData'

export default function Berita() {
  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    kategori,
    setKategori,
  ] = useState('Semua')

  const kategoriBerita =
    useMemo(() => {
      return [
        'Semua',
        ...Array.from(
          new Set(
            beritaData.map(
              (item) =>
                item.kategori,
            ),
          ),
        ),
      ]
    }, [])

  const hasilBerita =
    useMemo(() => {
      return beritaData.filter(
        (item) => {
          const keyword =
            pencarian
              .toLowerCase()
              .trim()

          const cocokPencarian =
            item.judul
              .toLowerCase()
              .includes(
                keyword,
              ) ||
            item.ringkasan
              .toLowerCase()
              .includes(
                keyword,
              )

          const cocokKategori =
            kategori ===
              'Semua' ||
            item.kategori ===
              kategori

          return (
            cocokPencarian &&
            cocokKategori
          )
        },
      )
    }, [
      pencarian,
      kategori,
    ])

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530] transition hover:text-[#0b4226]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Beranda
        </Link>

        {/* HEADER */}
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Informasi Terkini
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Berita
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Informasi kegiatan,
            pelayanan, dan
            perkembangan terbaru
            Pengadilan Agama
            Polewali.
          </p>
        </div>

        {/* FILTER */}
        <div className="mt-10 flex flex-col gap-3 border-y border-slate-200 py-5 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={
                pencarian
              }
              onChange={(
                event,
              ) =>
                setPencarian(
                  event.target
                    .value,
                )
              }
              placeholder="Cari berita..."
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-[#116530]"
            />
          </div>

          <select
            value={
              kategori
            }
            onChange={(
              event,
            ) =>
              setKategori(
                event.target
                  .value,
              )
            }
            className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#116530] md:min-w-[200px]"
          >
            {kategoriBerita.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>
        </div>

        {/* COUNT */}
        <div className="mt-6">
          <p className="text-sm text-slate-500">
            Menampilkan{' '}
            <span className="font-bold text-[#17201b]">
              {
                hasilBerita.length
              }
            </span>{' '}
            berita
          </p>
        </div>

        {/* BERITA */}
        {hasilBerita.length ===
        0 ? (
          <div className="mt-10 border-y border-slate-200 py-14 text-center">
            <p className="font-bold text-[#17201b]">
              Berita tidak ditemukan.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Coba gunakan kata
              pencarian atau kategori
              lainnya.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {hasilBerita.map(
              (item) => (
                <article
                  key={
                    item.id
                  }
                  className="group"
                >
                  <Link
                    to={`/berita/${item.slug}`}
                    className="block overflow-hidden rounded-xl bg-slate-100"
                  >
                    <img
                      src={
                        item.gambar
                      }
                      alt={
                        item.judul
                      }
                      className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  </Link>

                  <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#116530]">
                      {
                        item.kategori
                      }
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <CalendarDays
                        size={14}
                      />

                      {
                        item.tanggal
                      }
                    </span>
                  </div>

                  <Link
                    to={`/berita/${item.slug}`}
                    className="mt-3 block"
                  >
                    <h2 className="text-xl font-extrabold leading-7 text-[#17201b] transition group-hover:text-[#116530]">
                      {
                        item.judul
                      }
                    </h2>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                    {
                      item.ringkasan
                    }
                  </p>

                  <Link
                    to={`/berita/${item.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#17201b] transition hover:text-[#116530]"
                  >
                    Baca Selengkapnya

                    <ArrowRight
                      size={16}
                    />
                  </Link>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}