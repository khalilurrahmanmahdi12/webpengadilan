import {
  ArrowRight,
  FileCheck2,
  ListOrdered,
  Search,
  Upload,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import {
  formatNomorAntrean,
  useAntreanStore,
} from '../../store/antreanStore'

export default function PtspSection() {
  const nomorSedangDilayani =
    useAntreanStore(
      (state) =>
        state.nomorSedangDilayani,
    )

  const nomorTerakhir =
    useAntreanStore(
      (state) =>
        state.nomorTerakhir,
    )

  const nomorBerikutnya =
    nomorSedangDilayani < nomorTerakhir
      ? nomorSedangDilayani + 1
      : 0

  return (
    <section
      id="ptsp"
      className="bg-[#f7f9f8] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Pelayanan Digital
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17201b] sm:text-4xl lg:text-5xl">
            PTSP Online
            <span className="block text-[#116530]">
              Pengadilan 
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Pilih layanan sesuai kebutuhan Anda.
            Periksa kelengkapan berkas secara online
            sebelum datang ke kantor atau ambil
            nomor antrean untuk pelayanan langsung.
          </p>
        </div>

        {/* DUA LAYANAN UTAMA */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* VERIFIKASI BERKAS */}
          <div className="border-t-2 border-[#116530] pt-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf4ee] text-[#116530]">
              <FileCheck2 size={23} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#116530]">
              Layanan 01
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17201b]">
              Verifikasi Berkas Online
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Kirim dokumen persyaratan terlebih dahulu
              untuk diperiksa petugas. Jika berkas
              lengkap dan sesuai, Anda akan mendapatkan
              informasi untuk datang ke kantor.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>• Upload dokumen secara online</p>
              <p>• Pemeriksaan kelengkapan oleh petugas</p>
              <p>• Catatan perbaikan jika berkas belum sesuai</p>
              <p>• Informasi hasil verifikasi</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/ptsp/verifikasi/ajukan"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#116530] px-6 py-3.5 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
              >
                <Upload size={17} />
                Ajukan Verifikasi
              </Link>

              <Link
                to="/ptsp/verifikasi/lacak"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-[#17201b] transition hover:border-[#116530] hover:text-[#116530]"
              >
                <Search size={17} />
                Lacak Verifikasi
              </Link>
            </div>
          </div>

          {/* ANTREAN */}
          <div className="border-t-2 border-[#d4a72c] pt-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#faf5e6] text-[#9a7218]">
              <ListOrdered size={23} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#9a7218]">
              Layanan 02
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17201b]">
              Antrean PTSP
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Ambil nomor antrean untuk pelayanan
              langsung di kantor dan pantau nomor
              yang sedang dilayani sebelum menuju
              meja pelayanan PTSP.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>• Ambil nomor antrean secara online</p>
              <p>• Lihat nomor yang sedang dilayani</p>
              <p>• Pantau posisi antrean Anda</p>
              <p>• Ketahui jumlah antrean yang tersisa</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/ptsp/antrean/ambil"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d4a72c] px-6 py-3.5 text-sm font-bold text-[#17201b] transition hover:bg-[#e0b53a]"
              >
                <ListOrdered size={17} />
                Ambil Antrean
              </Link>

              <Link
                to="/ptsp/antrean/pantau"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-[#17201b] transition hover:border-[#116530] hover:text-[#116530]"
              >
                Pantau Antrean
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* STATUS ANTREAN */}
        <div className="mt-16">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Antrean PTSP Hari Ini
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-[#17201b]">
                Status Antrean
              </h3>
            </div>

            <Link
              to="/ptsp/antrean/pantau"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
            >
              Pantau Antrean Saya
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid border-y border-slate-200 bg-white md:grid-cols-3">
            {/* SEDANG DILAYANI */}
            <div className="px-6 py-7 md:border-r md:border-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Sedang Dilayani
              </p>

              <p className="mt-3 text-4xl font-extrabold text-[#116530]">
                {nomorSedangDilayani > 0
                  ? formatNomorAntrean(
                      nomorSedangDilayani,
                    )
                  : '--'}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {nomorSedangDilayani > 0
                  ? 'Nomor antrean yang sedang mendapatkan pelayanan.'
                  : 'Belum ada antrean yang dipanggil.'}
              </p>
            </div>

            {/* BERIKUTNYA */}
            <div className="border-t border-slate-200 px-6 py-7 md:border-r md:border-t-0 md:border-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Antrean Berikutnya
              </p>

              <p className="mt-3 text-4xl font-extrabold text-[#17201b]">
                {nomorBerikutnya > 0
                  ? formatNomorAntrean(
                      nomorBerikutnya,
                    )
                  : '--'}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Nomor yang akan dipanggil berikutnya.
              </p>
            </div>

            {/* TOTAL */}
            <div className="border-t border-slate-200 px-6 py-7 md:border-t-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Total Antrean Hari Ini
              </p>

              <p className="mt-3 text-4xl font-extrabold text-[#17201b]">
                {nomorTerakhir}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Jumlah antrean yang telah diambil hari ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}