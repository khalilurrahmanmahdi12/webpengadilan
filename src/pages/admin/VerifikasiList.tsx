import {
  Eye,
  FileCheck2,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import { useVerifikasiStore } from '../../store/verifikasiStore'

export default function VerifikasiList() {
  const verifikasi =
    useVerifikasiStore(
      (state) =>
        state.verifikasi,
    )

  const [
    pencarian,
    setPencarian,
  ] = useState('')

  const [
    status,
    setStatus,
  ] = useState('Semua')

  const hasil =
    useMemo(() => {
      return verifikasi.filter(
        (item) => {
          const cocokPencarian =
            item.nama
              .toLowerCase()
              .includes(
                pencarian.toLowerCase(),
              ) ||
            item.nomorPermohonan
              .toLowerCase()
              .includes(
                pencarian.toLowerCase(),
              )

          const cocokStatus =
            status === 'Semua' ||
            item.status === status

          return (
            cocokPencarian &&
            cocokStatus
          )
        },
      )
    }, [
      verifikasi,
      pencarian,
      status,
    ])

  return (
    <div>
      {/* HEADER */}
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#116530]">
          PTSP Online
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-[#17201b]">
          Verifikasi Berkas
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Periksa pengajuan berkas
          yang dikirim masyarakat.
        </p>
      </div>

      {/* FILTER */}
      <div className="mt-8 flex flex-col gap-3 border-y border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center">
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
            placeholder="Cari nama atau nomor permohonan..."
            className="h-11 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#116530]"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value,
            )
          }
          className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#116530]"
        >
          <option>
            Semua
          </option>

          <option>
            Menunggu Verifikasi
          </option>

          <option>
            Perlu Perbaikan
          </option>

          <option>
            Berkas Terverifikasi
          </option>

          <option>
            Ditolak
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div className="mt-6 overflow-hidden border border-slate-200 bg-white">
        {hasil.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileCheck2
              size={34}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-sm font-semibold text-slate-500">
              Belum ada data verifikasi.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8faf9]">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Nomor
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pemohon
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Layanan
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Tanggal
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {hasil.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#f8faf9]"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#17201b]">
                          {item.nomorPermohonan}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#17201b]">
                          {item.nama}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.whatsapp}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.namaLayanan}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {item.tanggalPengajuan}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/verifikasi/${item.id}`}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 transition hover:border-[#116530] hover:text-[#116530]"
                        >
                          <Eye size={16} />
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  let className =
    'bg-slate-100 text-slate-600'

  if (
    status ===
    'Menunggu Verifikasi'
  ) {
    className =
      'bg-amber-50 text-amber-700'
  }

  if (
    status ===
    'Perlu Perbaikan'
  ) {
    className =
      'bg-orange-50 text-orange-700'
  }

  if (
    status ===
    'Berkas Terverifikasi'
  ) {
    className =
      'bg-emerald-50 text-emerald-700'
  }

  if (
    status ===
    'Ditolak'
  ) {
    className =
      'bg-red-50 text-red-700'
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${className}`}
    >
      {status}
    </span>
  )
}