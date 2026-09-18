import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[500px] items-center justify-center bg-white px-4">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-[#116530]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-[#17201b]">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-3 text-slate-500">
          Halaman yang Anda cari tidak tersedia.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-lg bg-[#116530] px-6 py-3 text-sm font-bold !text-white"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}