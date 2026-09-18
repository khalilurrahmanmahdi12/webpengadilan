import {
  ArrowLeft,
  Building2,
  CalendarDays,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const timeline = [
  {
    tahun: '1957',
    judul: 'Dasar Pembentukan Peradilan Agama',
    deskripsi:
      'Peraturan Pemerintah Nomor 45 Tahun 1957 menjadi salah satu dasar pembentukan Pengadilan Agama di luar Jawa dan Madura.',
  },
  {
    tahun: '1960',
    judul: 'Pembentukan di Sulawesi',
    deskripsi:
      'Keputusan Menteri Agama Nomor 23 Tahun 1960 menjadi landasan pembentukan Pengadilan Agama di Sulawesi dan Nusa Tenggara Barat, termasuk Pengadilan .',
  },
  {
    tahun: 'Awal',
    judul: 'Pelayanan dengan Sarana Terbatas',
    deskripsi:
      'Pada masa awal, kegiatan pelayanan masyarakat dilakukan dengan fasilitas yang sangat terbatas dan memanfaatkan tempat sederhana.',
  },
  {
    tahun: '1979',
    judul: 'Memiliki Kantor Permanen',
    deskripsi:
      'Pengadilan  mulai memiliki kantor permanen di Jalan Cenderawasih, Pekkabata, Kecamatan Polewali.',
  },
  {
    tahun: '1983',
    judul: 'Ketua Definitif',
    deskripsi:
      'Pengadilan  mulai dipimpin oleh ketua definitif dan pelayanan peradilan terus berkembang.',
  },
  {
    tahun: '2004',
    judul: 'Sistem Satu Atap',
    deskripsi:
      'Organisasi, administrasi, dan finansial Peradilan Agama beralih ke Mahkamah Agung Republik Indonesia dalam sistem satu atap.',
  },
  {
    tahun: '2012',
    judul: 'Pengembangan Gedung',
    deskripsi:
      'Gedung Pengadilan  mengalami penyesuaian dan rehabilitasi sesuai prototipe Mahkamah Agung.',
  },
]

export default function SejarahPengadilan() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#116530]"
        >
          <ArrowLeft size={17} />
          Kembali ke Beranda
        </Link>

        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
            Pengadilan 
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#17201b] lg:text-5xl">
            Sejarah Pengadilan
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Perjalanan Pengadilan  berkembang dari
            pelayanan dengan sarana yang terbatas hingga menjadi
            lembaga peradilan dengan pelayanan yang semakin modern.
          </p>
        </div>

        <div className="mt-12 flex gap-4 border-l-4 border-[#116530] bg-[#f8faf9] px-6 py-5">
          <Building2
            size={22}
            className="mt-1 shrink-0 text-[#116530]"
          />

          <p className="text-sm leading-7 text-slate-600">
            Sejarah Pengadilan  merupakan bagian dari
            perkembangan Peradilan Agama di Sulawesi setelah
            terbentuknya dasar hukum Peradilan Agama di luar Jawa
            dan Madura.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#17201b]">
            Perjalanan Pengadilan 
          </h2>

          <div className="mt-8">
            {timeline.map((item, index) => (
              <div
                key={`${item.tahun}-${item.judul}`}
                className="grid gap-4 border-b border-slate-200 py-7 md:grid-cols-[130px_1fr]"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-[#116530]">
                    <CalendarDays size={17} />

                    <p className="text-xl font-extrabold">
                      {item.tahun}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tahap {String(index + 1).padStart(2, '0')}
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold text-[#17201b]">
                    {item.judul}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}