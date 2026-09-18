import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
} from 'lucide-react'

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { cariAgenda } from '../../data/agendaData'

export default function DetailAgenda() {
  const { slug } =
    useParams<{
      slug: string
    }>()

  if (!slug) {
    return (
      <Navigate
        to="/agenda"
        replace
      />
    )
  }

  const data =
    cariAgenda(slug)

  if (!data) {
    return (
      <Navigate
        to="/agenda"
        replace
      />
    )
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/agenda"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft
            size={17}
          />

          Kembali ke Agenda
        </Link>

        <div className="mt-8 grid gap-8 border-b border-slate-200 pb-10 sm:grid-cols-[130px_1fr]">
          <div>
            <p className="text-6xl font-extrabold text-[#116530]">
              {data.hari}
            </p>

            <p className="mt-1 font-bold text-slate-500">
              {data.bulan}{' '}
              {data.tahun}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#116530]">
              {data.kategori}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#17201b]">
              {data.judul}
            </h1>

            <p className="mt-4 leading-8 text-slate-600">
              {data.deskripsi}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Info
            icon={CalendarDays}
            label="Tanggal"
            value={data.tanggal}
          />

          <Info
            icon={Clock3}
            label="Waktu"
            value={data.waktu}
          />

          <Info
            icon={MapPin}
            label="Lokasi"
            value={data.lokasi}
          />
        </div>
      </div>
    </section>
  )
}

interface InfoProps {
  icon: typeof Clock3
  label: string
  value: string
}

function Info({
  icon: Icon,
  label,
  value,
}: InfoProps) {
  return (
    <div className="border-t-2 border-[#116530] bg-[#f8faf9] p-5">
      <Icon
        size={20}
        className="text-[#116530]"
      />

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold leading-6 text-[#17201b]">
        {value}
      </p>
    </div>
  )
}