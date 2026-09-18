import {
  CheckCircle2,
  ChevronDown,
} from 'lucide-react'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { Link } from 'react-router-dom'

import { layananPtsp } from '../../data/ptspData'
import { useAntreanStore } from '../../store/antreanStore'

export default function AmbilAntrean() {
  const tambahAntrean =
    useAntreanStore(
      (state) =>
        state.tambahAntrean,
    )

  const [nama, setNama] =
    useState('')

  const [
    whatsapp,
    setWhatsapp,
  ] = useState('')

  const [
    layananId,
    setLayananId,
  ] = useState('')

  const [
    nomorAntrean,
    setNomorAntrean,
  ] = useState<string | null>(
    null,
  )

  const layananDipilih =
    layananPtsp.find(
      (item) =>
        item.id === layananId,
    )

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    if (!layananDipilih) {
      return
    }

    const hasil =
      tambahAntrean({
        nama,
        whatsapp,

        layananId:
          layananDipilih.id,

        namaLayanan:
          layananDipilih.nama,
      })

    setNomorAntrean(
      hasil.nomorAntrean,
    )
  }

  if (nomorAntrean) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <CheckCircle2
            size={54}
            className="mx-auto text-[#116530]"
          />

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Antrean Berhasil Diambil
          </p>

          <h1 className="mt-3 text-3xl font-extrabold">
            Nomor Antrean Anda
          </h1>

          <p className="mt-7 text-6xl font-extrabold text-[#116530]">
            {nomorAntrean}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Simpan nomor ini dan pantau antrean sebelum menuju meja pelayanan.
          </p>

          <Link
            to="/ptsp/antrean/pantau"
            className="mt-8 inline-flex rounded-lg bg-[#116530] px-6 py-3 text-sm font-bold !text-white"
          >
            Pantau Antrean
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
          Antrean PTSP
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">
          Ambil Nomor Antrean
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="text-sm font-bold">
              Nama Lengkap
            </label>

            <input
              required
              value={nama}
              onChange={(event) =>
                setNama(
                  event.target.value,
                )
              }
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-[#116530]"
            />
          </div>

          <div>
            <label className="text-sm font-bold">
              Nomor WhatsApp
            </label>

            <input
              required
              value={whatsapp}
              onChange={(event) =>
                setWhatsapp(
                  event.target.value,
                )
              }
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-[#116530]"
            />
          </div>

          <div>
            <label className="text-sm font-bold">
              Jenis Layanan
            </label>

            <div className="relative mt-2">
              <select
                required
                value={layananId}
                onChange={(event) =>
                  setLayananId(
                    event.target.value,
                  )
                }
                className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-10 outline-none"
              >
                <option value="">
                  Pilih layanan
                </option>

                {layananPtsp.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.nama}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#116530] py-3.5 text-sm font-bold !text-white"
          >
            Ambil Nomor Antrean
          </button>
        </form>
      </div>
    </section>
  )
}