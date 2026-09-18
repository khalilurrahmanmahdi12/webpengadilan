import {
  CheckCircle2,
  Clock3,
  Search,
  Users,
  Volume2,
} from 'lucide-react'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import type {
  FormEvent,
} from 'react'

import {
  formatNomorAntrean,
  useAntreanStore,
} from '../../store/antreanStore'

import type {
  AntreanPtsp,
} from '../../types/ptsp'

export default function PantauAntrean() {
  const antrean =
    useAntreanStore(
      (state) => state.antrean,
    )

  const nomorTerakhir =
    useAntreanStore(
      (state) =>
        state.nomorTerakhir,
    )

  const nomorSedangDilayani =
    useAntreanStore(
      (state) =>
        state.nomorSedangDilayani,
    )

  const cariAntrean =
    useAntreanStore(
      (state) =>
        state.cariAntrean,
    )

  const cekPergantianHari =
    useAntreanStore(
      (state) =>
        state.cekPergantianHari,
    )

  const [
    nomor,
    setNomor,
  ] = useState('')

  const [
    nomorDicari,
    setNomorDicari,
  ] = useState('')

  const [
    antreanSaya,
    setAntreanSaya,
  ] =
    useState<AntreanPtsp | null>(
      null,
    )

  const [
    sudahCari,
    setSudahCari,
  ] = useState(false)

  /*
   * Cek apakah hari sudah berganti.
   * Kalau iya, antrean lama direset.
   */
  useEffect(() => {
    cekPergantianHari()
  }, [
    cekPergantianHari,
  ])

  /*
   * Update hasil pencarian
   * ketika state antrean berubah.
   */
  useEffect(() => {
    if (!nomorDicari) {
      return
    }

    const data =
      antrean.find(
        (item) =>
          item.nomorAntrean
            .toLowerCase()
            .trim() ===
          nomorDicari
            .toLowerCase()
            .trim(),
      )

    setAntreanSaya(
      data ?? null,
    )
  }, [
    antrean,
    nomorDicari,
  ])

  /*
   * Sinkronisasi antar tab.
   *
   * Misalnya admin memanggil antrean
   * di tab lain, halaman masyarakat
   * akan membaca ulang localStorage.
   */
  useEffect(() => {
    const sinkronkanAntrean = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        'pa-polewali-antrean'
      ) {
        useAntreanStore
          .persist
          .rehydrate()
      }
    }

    window.addEventListener(
      'storage',
      sinkronkanAntrean,
    )

    return () => {
      window.removeEventListener(
        'storage',
        sinkronkanAntrean,
      )
    }
  }, [])

  /*
   * Saat pengguna kembali ke tab,
   * baca ulang state terbaru.
   */
  useEffect(() => {
    const handleFocus = () => {
      useAntreanStore
        .persist
        .rehydrate()

      cekPergantianHari()
    }

    window.addEventListener(
      'focus',
      handleFocus,
    )

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus,
      )
    }
  }, [
    cekPergantianHari,
  ])

  const antreanMenunggu =
    useMemo(() => {
      return antrean.filter(
        (item) =>
          item.status ===
          'Menunggu',
      )
    }, [antrean])

  const nomorBerikutnya =
    useMemo(() => {
      const berikutnya =
        antrean.find(
          (item) =>
            item.status ===
            'Menunggu',
        )

      return berikutnya
        ? berikutnya.nomorAntrean
        : '--'
    }, [antrean])

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    const nomorBersih =
      nomor
        .trim()
        .toUpperCase()

    const data =
      cariAntrean(
        nomorBersih,
      )

    setNomorDicari(
      nomorBersih,
    )

    setAntreanSaya(
      data ?? null,
    )

    setSudahCari(true)
  }

  const posisiSaya =
    useMemo(() => {
      if (!antreanSaya) {
        return 0
      }

      if (
        antreanSaya.status !==
        'Menunggu'
      ) {
        return 0
      }

      const index =
        antreanMenunggu.findIndex(
          (item) =>
            item.id ===
            antreanSaya.id,
        )

      return index >= 0
        ? index + 1
        : 0
    }, [
      antreanSaya,
      antreanMenunggu,
    ])

  const antreanSebelumSaya =
    posisiSaya > 0
      ? posisiSaya - 1
      : 0

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Antrean PTSP
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
            Pantau Antrean
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Pantau nomor yang sedang
            dilayani dan cek posisi
            antrean Anda secara
            berkala.
          </p>
        </div>

        {/* STATUS UTAMA */}
        <div className="mt-10 grid border-y border-slate-200 bg-white md:grid-cols-3">
          {/* SEDANG DILAYANI */}
          <div className="px-6 py-7 md:border-r md:border-slate-200">
            <div className="flex items-center gap-2 text-[#116530]">
              <Volume2 size={18} />

              <p className="text-xs font-bold uppercase tracking-[0.14em]">
                Sedang Dilayani
              </p>
            </div>

            <p className="mt-4 text-4xl font-extrabold text-[#116530]">
              {nomorSedangDilayani > 0
                ? formatNomorAntrean(
                    nomorSedangDilayani,
                  )
                : '--'}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Nomor antrean yang sedang
              dipanggil atau dilayani
              petugas.
            </p>
          </div>

          {/* BERIKUTNYA */}
          <div className="border-t border-slate-200 px-6 py-7 md:border-r md:border-t-0 md:border-slate-200">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock3 size={18} />

              <p className="text-xs font-bold uppercase tracking-[0.14em]">
                Antrean Berikutnya
              </p>
            </div>

            <p className="mt-4 text-4xl font-extrabold text-[#17201b]">
              {nomorBerikutnya}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Nomor yang menunggu untuk
              dipanggil berikutnya.
            </p>
          </div>

          {/* MENUNGGU */}
          <div className="border-t border-slate-200 px-6 py-7 md:border-t-0">
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={18} />

              <p className="text-xs font-bold uppercase tracking-[0.14em]">
                Menunggu
              </p>
            </div>

            <p className="mt-4 text-4xl font-extrabold text-[#17201b]">
              {antreanMenunggu.length}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Total antrean yang masih
              menunggu pelayanan.
            </p>
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-4 text-sm text-slate-400">
          Total nomor antrean yang telah
          diambil hari ini:{' '}
          <span className="font-bold text-[#17201b]">
            {nomorTerakhir}
          </span>
        </div>

        {/* CARI ANTREAN */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-[#17201b]">
            Cek Antrean Saya
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Masukkan nomor antrean yang
            Anda dapatkan saat mengambil
            antrean.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                required
                value={nomor}
                onChange={(event) =>
                  setNomor(
                    event.target.value.toUpperCase(),
                  )
                }
                placeholder="Contoh: A-003"
                className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 font-medium outline-none transition focus:border-[#116530]"
              />
            </div>

            <button
              type="submit"
              className="h-12 rounded-lg bg-[#116530] px-7 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
            >
              Cek Antrean
            </button>
          </form>
        </div>

        {/* TIDAK DITEMUKAN */}
        {sudahCari &&
          !antreanSaya && (
            <div className="mt-8 max-w-3xl border-l-4 border-red-500 bg-red-50 px-5 py-5">
              <p className="font-bold text-red-700">
                Nomor antrean tidak
                ditemukan.
              </p>

              <p className="mt-2 text-sm leading-6 text-red-600">
                Periksa kembali nomor
                antrean yang Anda
                masukkan.
              </p>
            </div>
          )}

        {/* ANTREAN SAYA */}
        {antreanSaya && (
          <div className="mt-10 max-w-4xl">
            <div className="border border-slate-200 bg-[#f8faf9] p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    Nomor Antrean Anda
                  </p>

                  <p className="mt-3 text-5xl font-extrabold text-[#116530]">
                    {
                      antreanSaya.nomorAntrean
                    }
                  </p>

                  <p className="mt-4 font-bold text-[#17201b]">
                    {
                      antreanSaya.nama
                    }
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      antreanSaya.namaLayanan
                    }
                  </p>
                </div>

                <StatusBadge
                  status={
                    antreanSaya.status
                  }
                />
              </div>

              {/* MENUNGGU */}
              {antreanSaya.status ===
                'Menunggu' && (
                <div className="mt-7 border-t border-slate-200 pt-6">
                  <p className="text-sm text-slate-500">
                    Posisi antrean Anda
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-[#17201b]">
                    {posisiSaya}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {antreanSebelumSaya >
                    0
                      ? `Masih ada ${antreanSebelumSaya} antrean sebelum giliran Anda.`
                      : 'Anda adalah antrean berikutnya.'}
                  </p>
                </div>
              )}

              {/* DIPANGGIL */}
              {antreanSaya.status ===
                'Dipanggil' && (
                <div className="mt-7 border-l-4 border-[#116530] bg-[#edf7f1] px-5 py-5">
                  <div className="flex gap-3">
                    <Volume2
                      size={22}
                      className="mt-0.5 shrink-0 text-[#116530]"
                    />

                    <div>
                      <p className="font-extrabold text-[#116530]">
                        Nomor Anda
                        Dipanggil
                      </p>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Silakan menuju
                        meja pelayanan
                        PTSP dan siapkan
                        dokumen yang
                        diperlukan.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SEDANG DILAYANI */}
              {antreanSaya.status ===
                'Sedang Dilayani' && (
                <div className="mt-7 border-l-4 border-blue-500 bg-blue-50 px-5 py-5">
                  <p className="font-extrabold text-blue-700">
                    Sedang Dilayani
                  </p>

                  <p className="mt-2 text-sm leading-7 text-blue-600">
                    Antrean Anda sedang
                    dalam proses
                    pelayanan oleh
                    petugas PTSP.
                  </p>
                </div>
              )}

              {/* SELESAI */}
              {antreanSaya.status ===
                'Selesai' && (
                <div className="mt-7 border-l-4 border-emerald-500 bg-emerald-50 px-5 py-5">
                  <div className="flex gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="font-extrabold text-emerald-700">
                        Pelayanan Selesai
                      </p>

                      <p className="mt-2 text-sm leading-7 text-emerald-600">
                        Pelayanan antrean
                        Anda telah selesai.
                        Terima kasih telah
                        menggunakan layanan
                        PTSP Pengadilan
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  let style =
    'bg-slate-100 text-slate-600'

  if (
    status === 'Menunggu'
  ) {
    style =
      'bg-amber-50 text-amber-700'
  }

  if (
    status === 'Dipanggil'
  ) {
    style =
      'bg-[#edf7f1] text-[#116530]'
  }

  if (
    status ===
    'Sedang Dilayani'
  ) {
    style =
      'bg-blue-50 text-blue-700'
  }

  if (
    status === 'Selesai'
  ) {
    style =
      'bg-emerald-50 text-emerald-700'
  }

  return (
    <span
      className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold ${style}`}
    >
      {status}
    </span>
  )
}