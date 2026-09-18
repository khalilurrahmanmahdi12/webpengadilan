import {
  ArrowLeft,
  Download,
  FileText,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { dokumenData } from '../../data/dokumenData'

export default function DokumenPublik() {
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
            dokumenData.map(
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
          .trim()
          .toLowerCase()

      return dokumenData.filter(
        (item) => {
          const cocokCari =
            item.judul
              .toLowerCase()
              .includes(keyword)

          const cocokKategori =
            kategori === 'Semua' ||
            item.kategori === kategori

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
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Beranda
        </Link>

        {/* HEADER */}
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Dokumen Publik
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Unduhan Dokumen
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Unduh formulir, format dokumen,
            laporan, dan dokumen publik
            Pengadilan .
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
              value={pencarian}
              onChange={(event) =>
                setPencarian(
                  event.target.value,
                )
              }
              placeholder="Cari dokumen..."
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#116530]"
            />
          </div>

          <select
            value={kategori}
            onChange={(event) =>
              setKategori(
                event.target.value,
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
                  {item === 'Semua'
                    ? 'Semua Kategori'
                    : item}
                </option>
              ),
            )}
          </select>
        </div>

        {/* LIST */}
        <div className="mt-8">
          {hasil.length === 0 ? (
            <div className="border-y border-slate-200 py-14 text-center">
              <p className="font-bold text-[#17201b]">
                Dokumen tidak ditemukan.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {hasil.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7f1] text-[#116530]">
                      <FileText
                        size={19}
                      />
                    </div>

                    <div>
                      <p className="font-extrabold text-[#17201b]">
                        {item.judul}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>
                          {item.kategori}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {item.format}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {item.ukuran}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={item.file}
                    download
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-bold text-slate-600 transition hover:border-[#116530] hover:text-[#116530]"
                  >
                    <Download
                      size={17}
                    />

                    Unduh
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}