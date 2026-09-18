import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Info,
  Search,
  ShieldCheck,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { informasiPublikData } from '../../data/ppidData'

export default function PPID() {
  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    kategori,
    setKategori,
  ] = useState('Semua')

  const hasil =
    useMemo(() => {
      const keyword =
        pencarian
          .trim()
          .toLowerCase()

      return informasiPublikData.filter(
        (item) => {
          const cocokCari =
            item.judul
              .toLowerCase()
              .includes(keyword) ||
            item.deskripsi
              .toLowerCase()
              .includes(keyword)

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
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft size={17} />
          Kembali ke Beranda
        </Link>

        {/* HEADER */}
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Informasi Publik
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            PPID
          </h1>

          <p className="mt-4 leading-8 text-slate-600">
            Layanan Pejabat Pengelola Informasi dan
            Dokumentasi Pengadilan  untuk
            memberikan akses informasi publik secara
            transparan dan mudah.
          </p>
        </div>

        {/* INTRO */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-6">
            <ShieldCheck
              size={24}
              className="text-[#116530]"
            />

            <h2 className="mt-4 text-lg font-extrabold text-[#17201b]">
              Hak Memperoleh Informasi
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Masyarakat dapat memperoleh informasi publik
              sesuai dengan ketentuan yang berlaku.
            </p>
          </div>

          <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-6">
            <Info
              size={24}
              className="text-[#116530]"
            />

            <h2 className="mt-4 text-lg font-extrabold text-[#17201b]">
              Pelayanan Informasi
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Informasi tersedia melalui website maupun
              pelayanan informasi di Pengadilan .
            </p>
          </div>
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
              placeholder="Cari informasi publik..."
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
            className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none sm:min-w-[210px]"
          >
            <option value="Semua">
              Semua Informasi
            </option>

            <option value="Berkala">
              Informasi Berkala
            </option>

            <option value="Serta Merta">
              Informasi Serta Merta
            </option>

            <option value="Setiap Saat">
              Informasi Setiap Saat
            </option>
          </select>
        </div>

        {/* LIST */}
        <div className="mt-8">
          {hasil.length === 0 ? (
            <div className="border-y border-slate-200 py-14 text-center">
              <p className="font-bold text-[#17201b]">
                Informasi tidak ditemukan.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border-t border-slate-200">
              {hasil.map(
                (item) => (
                  <Link
                    key={item.id}
                    to={`/ppid/${item.slug}`}
                    className="group grid gap-4 py-6 sm:grid-cols-[50px_1fr_30px]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf7f1] text-[#116530]">
                      <FileText size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#116530]">
                        {item.kategori}
                      </p>

                      <h2 className="mt-2 text-lg font-extrabold text-[#17201b] transition group-hover:text-[#116530]">
                        {item.judul}
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {item.deskripsi}
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

        {/* DOKUMEN */}
        <div className="mt-10 border-l-4 border-[#116530] bg-[#f8faf9] px-5 py-5">
          <p className="font-bold text-[#17201b]">
            Dokumen Publik
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            Formulir, laporan, dan dokumen yang dapat diunduh
            tersedia pada halaman Dokumen Publik.
          </p>

          <Link
            to="/dokumen"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
          >
            Buka Dokumen Publik

            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}