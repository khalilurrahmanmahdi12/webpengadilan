import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Megaphone,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { pengumumanData } from '../../data/pengumumanData'

export default function Pengumuman() {
  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    kategori,
    setKategori,
  ] = useState('Semua')

  const kategoriList =
    useMemo(() => {
      return [
        'Semua',
        ...Array.from(
          new Set(
            pengumumanData.map(
              (item) =>
                item.kategori,
            ),
          ),
        ),
      ]
    }, [])

  const hasil =
    useMemo(() => {
      const keyword =
        pencarian
          .toLowerCase()
          .trim()

      return pengumumanData.filter(
        (item) => {
          const cocokCari =
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
            cocokCari &&
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            Informasi Publik
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Pengumuman
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Informasi dan pengumuman
            terbaru dari Pengadilan
            .
          </p>
        </div>

        {/* FILTER */}
        <div className="mt-10 flex flex-col gap-3 border-y border-slate-200 py-5 sm:flex-row">
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
              placeholder="Cari pengumuman..."
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#116530]"
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
            className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none sm:min-w-[200px]"
          >
            {kategoriList.map(
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

        {/* LIST */}
        <div className="mt-8">
          {hasil.length ===
          0 ? (
            <div className="border-y border-slate-200 py-14 text-center">
              <p className="font-bold text-[#17201b]">
                Pengumuman tidak ditemukan.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border-t border-slate-200">
              {hasil.map(
                (item) => (
                  <Link
                    key={
                      item.id
                    }
                    to={`/pengumuman/${item.slug}`}
                    className="group grid gap-4 py-6 sm:grid-cols-[50px_1fr_25px]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf7f1] text-[#116530]">
                      <Megaphone
                        size={18}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
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

                      <h2 className="mt-2 text-lg font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                        {
                          item.judul
                        }
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {
                          item.ringkasan
                        }
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="mt-1 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#116530]"
                    />
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}