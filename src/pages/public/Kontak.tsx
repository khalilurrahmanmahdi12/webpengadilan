import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function Kontak() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
          Hubungi Kami
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-[#17201b]">
          Kontak
        </h1>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          <div className="flex gap-4 py-5">
            <MapPin className="text-[#116530]" />
            <div>
              <p className="font-bold">Alamat</p>
              <p className="mt-1 text-sm text-slate-500">
                Polewali Mandar, Sulawesi Barat
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-5">
            <Phone className="text-[#116530]" />
            <div>
              <p className="font-bold">Telepon</p>
              <p className="mt-1 text-sm text-slate-500">
                (0428) 21018
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-5">
            <Mail className="text-[#116530]" />
            <div>
              <p className="font-bold">Email</p>
              <p className="mt-1 text-sm text-slate-500">
                pa.polewali@example.go.id
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-5">
            <Clock3 className="text-[#116530]" />
            <div>
              <p className="font-bold">Jam Pelayanan</p>
              <p className="mt-1 text-sm text-slate-500">
                Senin - Jumat, 08.00 - 16.30 WITA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}