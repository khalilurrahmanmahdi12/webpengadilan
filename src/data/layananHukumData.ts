export interface BagianLayanan {
  judul: string
  deskripsi?: string
  poin?: string[]
}

export interface LayananHukum {
  slug: string
  nomor: string
  judul: string
  deskripsi: string
  ringkasan: string
  bagian: BagianLayanan[]
}

export const layananHukum: LayananHukum[] = [
  {
    slug: 'prosedur-berperkara',
    nomor: '01',
    judul: 'Prosedur Berperkara',
    deskripsi:
      'Informasi tahapan dan prosedur pengajuan perkara di Pengadilan .',
    ringkasan:
      'Panduan umum bagi masyarakat mengenai proses pengajuan perkara mulai dari persiapan dokumen, pendaftaran, pembayaran panjar biaya perkara, hingga proses persidangan.',
    bagian: [
      {
        judul: 'Tahapan Pengajuan Perkara',
        deskripsi:
          'Secara umum, masyarakat yang ingin mengajukan perkara perlu melalui beberapa tahapan pelayanan.',
        poin: [
          'Menyiapkan dokumen persyaratan sesuai jenis perkara.',
          'Datang ke Pengadilan  atau menggunakan layanan pendaftaran yang tersedia.',
          'Menyerahkan dokumen kepada petugas untuk dilakukan pemeriksaan awal.',
          'Membayar panjar biaya perkara sesuai perhitungan yang ditetapkan.',
          'Menerima nomor perkara setelah proses pendaftaran selesai.',
          'Menunggu surat panggilan sidang.',
          'Mengikuti proses persidangan sesuai jadwal.',
          'Menerima putusan atau penetapan setelah perkara selesai.',
        ],
      },
      {
        judul: 'Dokumen yang Perlu Disiapkan',
        poin: [
          'Kartu Tanda Penduduk atau identitas pemohon.',
          'Dokumen pendukung sesuai jenis perkara.',
          'Surat gugatan atau permohonan jika telah tersedia.',
          'Dokumen tambahan yang diminta berdasarkan kebutuhan perkara.',
        ],
      },
      {
        judul: 'Informasi Penting',
        deskripsi:
          'Jenis dokumen dan tahapan tertentu dapat berbeda berdasarkan perkara yang diajukan. Pastikan memeriksa persyaratan sesuai jenis perkara sebelum melakukan pendaftaran.',
      },
    ],
  },

  {
    slug: 'persyaratan-berperkara',
    nomor: '02',
    judul: 'Persyaratan Berperkara',
    deskripsi:
      'Informasi dokumen dan persyaratan yang dibutuhkan untuk setiap jenis perkara.',
    ringkasan:
      'Setiap jenis perkara memiliki persyaratan yang berbeda. Pada tahap berikutnya halaman ini akan dibuat interaktif sehingga masyarakat dapat memilih jenis perkara dan langsung melihat dokumen yang harus disiapkan.',
    bagian: [
      {
        judul: 'Jenis Perkara',
        poin: [
          'Cerai Gugat',
          'Cerai Talak',
          'Isbat Nikah',
          'Dispensasi Kawin',
          'Hak Asuh Anak',
          'Perwalian',
          'Penetapan Ahli Waris',
        ],
      },
      {
        judul: 'Persyaratan Umum',
        poin: [
          'Identitas pemohon atau para pihak.',
          'Dokumen pendukung sesuai jenis perkara.',
          'Dokumen asli dibawa saat diperlukan untuk proses pemeriksaan.',
        ],
      },
      {
        judul: 'Catatan',
        deskripsi:
          'Persyaratan dapat berbeda berdasarkan kondisi perkara. Pada Step 14D kita akan membuat pilihan jenis perkara dan menampilkan persyaratan secara otomatis.',
      },
    ],
  },

  {
    slug: 'biaya-perkara',
    nomor: '03',
    judul: 'Biaya Perkara',
    deskripsi:
      'Informasi mengenai panjar biaya perkara dan komponen biaya lainnya.',
    ringkasan:
      'Panjar biaya perkara dipengaruhi oleh jenis perkara, lokasi para pihak, jumlah panggilan, dan komponen biaya lainnya.',
    bagian: [
      {
        judul: 'Komponen Biaya',
        poin: [
          'Biaya pendaftaran perkara.',
          'Biaya proses.',
          'Biaya pemanggilan para pihak.',
          'Penerimaan Negara Bukan Pajak jika berlaku.',
          'Biaya materai.',
          'Komponen lainnya sesuai ketentuan.',
        ],
      },
      {
        judul: 'Kalkulator Biaya',
        deskripsi:
          'Pada Step 14C halaman ini akan diubah menjadi Kalkulator Panjar Biaya Perkara sehingga masyarakat dapat menghitung estimasi biaya secara langsung.',
      },
      {
        judul: 'Catatan',
        deskripsi:
          'Nilai akhir panjar biaya perkara mengikuti perhitungan dan ketentuan resmi Pengadilan .',
      },
    ],
  },

  {
    slug: 'posbakum',
    nomor: '04',
    judul: 'Posbakum',
    deskripsi:
      'Informasi layanan Pos Bantuan Hukum bagi masyarakat yang membutuhkan bantuan hukum.',
    ringkasan:
      'Pos Bantuan Hukum atau Posbakum memberikan layanan hukum kepada masyarakat yang membutuhkan informasi, konsultasi, dan bantuan dalam pembuatan dokumen hukum.',
    bagian: [
      {
        judul: 'Layanan Posbakum',
        poin: [
          'Pemberian informasi hukum.',
          'Konsultasi dan advis hukum.',
          'Bantuan pembuatan dokumen hukum.',
          'Informasi mengenai prosedur berperkara.',
        ],
      },
      {
        judul: 'Siapa yang Dapat Menggunakan',
        deskripsi:
          'Layanan Posbakum ditujukan kepada masyarakat yang membutuhkan bantuan hukum sesuai dengan ketentuan pelayanan yang berlaku.',
      },
      {
        judul: 'Cara Mendapatkan Layanan',
        poin: [
          'Datang ke Pengadilan .',
          'Menghubungi petugas PTSP.',
          'Menyampaikan kebutuhan bantuan hukum.',
          'Melengkapi persyaratan apabila diperlukan.',
          'Mendapatkan pelayanan dari petugas Posbakum.',
        ],
      },
    ],
  },

  {
    slug: 'perkara-prodeo',
    nomor: '05',
    judul: 'Perkara Prodeo',
    deskripsi:
      'Informasi pengajuan perkara secara cuma-cuma bagi masyarakat yang memenuhi persyaratan.',
    ringkasan:
      'Prodeo merupakan layanan pembebasan biaya perkara bagi masyarakat yang tidak mampu secara ekonomi dan memenuhi persyaratan.',
    bagian: [
      {
        judul: 'Persyaratan Umum',
        poin: [
          'Mengajukan permohonan berperkara secara prodeo.',
          'Menyertakan dokumen yang menunjukkan kondisi tidak mampu.',
          'Memenuhi ketentuan yang berlaku mengenai pembebasan biaya perkara.',
        ],
      },
      {
        judul: 'Dokumen Pendukung',
        poin: [
          'Surat Keterangan Tidak Mampu apabila tersedia.',
          'Kartu program bantuan sosial apabila dimiliki.',
          'Dokumen pendukung lain yang menunjukkan kondisi ekonomi.',
        ],
      },
      {
        judul: 'Proses Pengajuan',
        poin: [
          'Pemohon menyerahkan permohonan dan dokumen pendukung.',
          'Petugas melakukan pemeriksaan kelengkapan.',
          'Permohonan diproses sesuai mekanisme yang berlaku.',
          'Pemohon memperoleh informasi mengenai hasil pengajuan prodeo.',
        ],
      },
    ],
  },

  {
    slug: 'mediasi',
    nomor: '06',
    judul: 'Mediasi',
    deskripsi:
      'Informasi proses mediasi dalam penyelesaian perkara di pengadilan.',
    ringkasan:
      'Mediasi merupakan proses penyelesaian sengketa melalui perundingan para pihak dengan bantuan mediator sebelum pemeriksaan perkara dilanjutkan.',
    bagian: [
      {
        judul: 'Tahapan Mediasi',
        poin: [
          'Hakim menjelaskan kewajiban dan prosedur mediasi kepada para pihak.',
          'Para pihak memilih atau mendapatkan mediator.',
          'Mediator mengatur jadwal pertemuan.',
          'Para pihak menyampaikan permasalahan dan kemungkinan penyelesaian.',
          'Mediator membantu proses perundingan.',
          'Hasil mediasi dilaporkan kepada hakim pemeriksa perkara.',
        ],
      },
      {
        judul: 'Jika Mediasi Berhasil',
        deskripsi:
          'Apabila tercapai kesepakatan, para pihak dapat menuangkan hasilnya dalam kesepakatan perdamaian sesuai ketentuan yang berlaku.',
      },
      {
        judul: 'Jika Mediasi Tidak Berhasil',
        deskripsi:
          'Apabila tidak tercapai kesepakatan, proses pemeriksaan perkara dilanjutkan sesuai prosedur persidangan.',
      },
    ],
  },
]

export function cariLayananHukum(
  slug: string,
) {
  return layananHukum.find(
    (item) =>
      item.slug === slug,
  )
}