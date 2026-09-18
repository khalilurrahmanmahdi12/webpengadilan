import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Info,
  RotateCcw,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { persyaratanPerkara } from '../../data/persyaratanPerkaraData'

export default function PersyaratanBerperkara() {
  const [
    jenisPerkaraId,
    setJenisPerkaraId,
  ] = useState(
    persyaratanPerkara[0].id,
  )

  const [
    dokumenSiap,
    setDokumenSiap,
  ] = useState<number[]>([])

  const perkara =
    useMemo(() => {
      return (
        persyaratanPerkara.find(
          (item) =>
            item.id ===
            jenisPerkaraId,
        ) ??
        persyaratanPerkara[0]
      )
    }, [jenisPerkaraId])

  const totalPersyaratan =
    perkara.persyaratan.length

  const totalSiap =
    dokumenSiap.length

  const persentase =
    totalPersyaratan > 0
      ? Math.round(
          (totalSiap /
            totalPersyaratan) *
            100,
        )
      : 0

  const ubahJenisPerkara = (
    id: string,
  ) => {
    setJenisPerkaraId(id)

    /*
     * Checklist direset setiap
     * pengguna mengganti jenis perkara.
     */
    setDokumenSiap([])
  }

  const toggleDokumen = (
    index: number,
  ) => {
    setDokumenSiap(
      (current) => {
        if (
          current.includes(
            index,
          )
        ) {
          return current.filter(
            (item) =>
              item !== index,
          )
        }

        return [
          ...current,
          index,
        ]
      },
    )
  }

  const resetChecklist =
    () => {
      setDokumenSiap([])
    }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Layanan Hukum
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#17201b] lg:text-5xl">
            Persyaratan Berperkara
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Pilih jenis perkara untuk
            melihat dokumen dan
            persyaratan yang perlu
            dipersiapkan sebelum
            mengajukan perkara.
          </p>
        </div>

        {/* INFO */}
        <div className="mt-8 flex gap-3 border-l-4 border-[#116530] bg-[#f8faf9] px-5 py-4">
          <Info
            size={21}
            className="mt-0.5 shrink-0 text-[#116530]"
          />

          <p className="text-sm leading-7 text-slate-600">
            Informasi pada halaman
            ini digunakan sebagai
            panduan awal. Persyaratan
            dapat menyesuaikan jenis
            dan kondisi perkara.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* ====================== */}
          {/* PILIH PERKARA */}
          {/* ====================== */}

          <aside>
            <div className="border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <ClipboardCheck
                  size={20}
                  className="text-[#116530]"
                />

                <h2 className="font-extrabold text-[#17201b]">
                  Jenis Perkara
                </h2>
              </div>

              <div className="mt-5 space-y-2">
                {persyaratanPerkara.map(
                  (item) => {
                    const aktif =
                      item.id ===
                      jenisPerkaraId

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        onClick={() =>
                          ubahJenisPerkara(
                            item.id,
                          )
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                          aktif
                            ? 'border-[#116530] bg-[#edf7f1] text-[#116530]'
                            : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#17201b]'
                        }`}
                      >
                        {
                          item.nama
                        }
                      </button>
                    )
                  },
                )}
              </div>
            </div>

            {/* MOBILE SELECT */}
            <div className="mt-4 lg:hidden">
              <label
                htmlFor="jenisPerkara"
                className="text-sm font-bold text-slate-700"
              >
                Pilih Jenis
                Perkara
              </label>

              <select
                id="jenisPerkara"
                value={
                  jenisPerkaraId
                }
                onChange={(
                  event,
                ) =>
                  ubahJenisPerkara(
                    event.target
                      .value,
                  )
                }
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#116530]"
              >
                {persyaratanPerkara.map(
                  (item) => (
                    <option
                      key={
                        item.id
                      }
                      value={
                        item.id
                      }
                    >
                      {
                        item.nama
                      }
                    </option>
                  ),
                )}
              </select>
            </div>
          </aside>

          {/* ====================== */}
          {/* CONTENT */}
          {/* ====================== */}

          <div>
            {/* TITLE */}
            <div className="border-b border-slate-200 pb-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#116530]">
                Persyaratan
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-[#17201b]">
                {perkara.nama}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                {
                  perkara.deskripsi
                }
              </p>
            </div>

            {/* PROGRESS */}
            <div className="mt-7 border border-slate-200 bg-[#f8faf9] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Kesiapan Dokumen
                  </p>

                  <p className="mt-2 text-2xl font-extrabold text-[#17201b]">
                    {totalSiap}{' '}
                    dari{' '}
                    {
                      totalPersyaratan
                    }{' '}
                    siap
                  </p>
                </div>

                <p className="text-2xl font-extrabold text-[#116530]">
                  {persentase}%
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#116530] transition-all duration-300"
                  style={{
                    width: `${persentase}%`,
                  }}
                />
              </div>
            </div>

            {/* CHECKLIST */}
            <div className="mt-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold text-[#17201b]">
                  Dokumen yang
                  Dipersiapkan
                </h3>

                {totalSiap >
                  0 && (
                  <button
                    type="button"
                    onClick={
                      resetChecklist
                    }
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#116530]"
                  >
                    <RotateCcw
                      size={15}
                    />

                    Reset
                  </button>
                )}
              </div>

              <div className="mt-5 border-y border-slate-200">
                {perkara.persyaratan.map(
                  (
                    item,
                    index,
                  ) => {
                    const siap =
                      dokumenSiap.includes(
                        index,
                      )

                    return (
                      <button
                        key={`${item}-${index}`}
                        type="button"
                        onClick={() =>
                          toggleDokumen(
                            index,
                          )
                        }
                        className="flex w-full items-start gap-4 border-b border-slate-100 py-5 text-left transition last:border-b-0 hover:bg-[#f8faf9]"
                      >
                        <div
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                            siap
                              ? 'border-[#116530] bg-[#116530] text-white'
                              : 'border-slate-300 bg-white text-transparent'
                          }`}
                        >
                          <Check
                            size={
                              15
                            }
                          />
                        </div>

                        <div>
                          <p
                            className={`text-sm font-semibold leading-7 ${
                              siap
                                ? 'text-slate-400 line-through'
                                : 'text-[#17201b]'
                            }`}
                          >
                            {item}
                          </p>

                          {siap && (
                            <p className="mt-1 text-xs font-bold text-[#116530]">
                              Dokumen
                              siap
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  },
                )}
              </div>
            </div>

            {/* SELESAI */}
            {persentase ===
              100 && (
              <div className="mt-7 border-l-4 border-[#116530] bg-[#edf7f1] px-5 py-5">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-[#116530]"
                  />

                  <div>
                    <p className="font-extrabold text-[#116530]">
                      Dokumen
                      Sudah Siap
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Semua
                      persyaratan
                      pada daftar
                      awal telah
                      Anda tandai
                      sebagai siap.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CATATAN */}
            {perkara.catatan && (
              <div className="mt-7 flex gap-3 border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
                <FileCheck2
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-sm font-bold text-amber-800">
                    Catatan
                  </p>

                  <p className="mt-1 text-sm leading-7 text-amber-700">
                    {
                      perkara.catatan
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}