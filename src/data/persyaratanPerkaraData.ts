export interface PersyaratanPerkara {
  id: string
  nama: string
  deskripsi: string
  persyaratan: string[]
  catatan?: string
}

export const persyaratanPerkara: PersyaratanPerkara[] = [
  {
    id: 'cerai-gugat',
    nama: 'Cerai Gugat',
    deskripsi:
      'Persyaratan umum bagi pihak istri yang mengajukan gugatan perceraian.',
    persyaratan: [
      'Kartu Tanda Penduduk atau identitas pemohon.',
      'Buku nikah atau kutipan akta nikah.',
      'Fotokopi dokumen yang diperlukan sesuai ketentuan.',
      'Surat gugatan perceraian.',
      'Alamat lengkap pihak tergugat.',
      'Dokumen pendukung lain apabila diperlukan.',
    ],
    catatan:
      'Dokumen asli dapat diminta untuk diperlihatkan pada saat pemeriksaan atau sesuai kebutuhan pelayanan.',
  },

  {
    id: 'cerai-talak',
    nama: 'Cerai Talak',
    deskripsi:
      'Persyaratan umum bagi pihak suami yang mengajukan permohonan cerai talak.',
    persyaratan: [
      'Kartu Tanda Penduduk atau identitas pemohon.',
      'Buku nikah atau kutipan akta nikah.',
      'Fotokopi dokumen yang diperlukan sesuai ketentuan.',
      'Surat permohonan cerai talak.',
      'Alamat lengkap pihak termohon.',
      'Dokumen pendukung lain apabila diperlukan.',
    ],
    catatan:
      'Pastikan identitas dan alamat para pihak ditulis secara lengkap agar proses administrasi dan pemanggilan dapat dilakukan.',
  },

  {
    id: 'isbat-nikah',
    nama: 'Isbat Nikah',
    deskripsi:
      'Persyaratan umum permohonan penetapan atau pengesahan perkawinan.',
    persyaratan: [
      'Kartu Tanda Penduduk para pihak.',
      'Kartu Keluarga.',
      'Surat permohonan isbat nikah.',
      'Dokumen atau keterangan mengenai perkawinan.',
      'Identitas saksi apabila diperlukan.',
      'Dokumen pendukung lainnya sesuai kondisi permohonan.',
    ],
    catatan:
      'Jenis dokumen yang diperlukan dapat berbeda berdasarkan kondisi perkawinan dan tujuan pengajuan isbat nikah.',
  },

  {
    id: 'dispensasi-kawin',
    nama: 'Dispensasi Kawin',
    deskripsi:
      'Persyaratan umum untuk permohonan dispensasi kawin.',
    persyaratan: [
      'Kartu Tanda Penduduk orang tua atau wali.',
      'Kartu Keluarga.',
      'Akta kelahiran anak.',
      'Identitas calon suami dan calon istri.',
      'Surat permohonan dispensasi kawin.',
      'Dokumen pendukung yang berkaitan dengan permohonan.',
    ],
    catatan:
      'Pemohon perlu memastikan seluruh identitas dan dokumen pendukung sesuai dengan pihak yang dimohonkan dispensasi.',
  },

  {
    id: 'hak-asuh-anak',
    nama: 'Hak Asuh Anak',
    deskripsi:
      'Persyaratan umum untuk perkara mengenai pemeliharaan atau hak asuh anak.',
    persyaratan: [
      'Kartu Tanda Penduduk pemohon atau penggugat.',
      'Kartu Keluarga.',
      'Akta kelahiran anak.',
      'Dokumen perkawinan atau perceraian apabila berkaitan.',
      'Surat gugatan atau permohonan.',
      'Dokumen pendukung mengenai kondisi anak apabila diperlukan.',
    ],
  },

  {
    id: 'perwalian',
    nama: 'Perwalian',
    deskripsi:
      'Persyaratan umum pengajuan permohonan penetapan perwalian.',
    persyaratan: [
      'Kartu Tanda Penduduk pemohon.',
      'Kartu Keluarga.',
      'Akta kelahiran anak.',
      'Surat permohonan perwalian.',
      'Dokumen yang menjelaskan hubungan pemohon dengan anak.',
      'Dokumen pendukung lainnya jika diperlukan.',
    ],
  },

  {
    id: 'penetapan-ahli-waris',
    nama: 'Penetapan Ahli Waris',
    deskripsi:
      'Persyaratan umum permohonan penetapan ahli waris.',
    persyaratan: [
      'Kartu Tanda Penduduk para pemohon.',
      'Kartu Keluarga.',
      'Surat atau akta kematian pewaris.',
      'Dokumen yang menunjukkan hubungan keluarga dengan pewaris.',
      'Surat permohonan penetapan ahli waris.',
      'Dokumen pendukung lain yang berkaitan dengan ahli waris.',
    ],
    catatan:
      'Jumlah dan jenis dokumen dapat menyesuaikan jumlah ahli waris serta keadaan keluarga.',
  },
]