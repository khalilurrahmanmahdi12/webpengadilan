import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'

import AdminProtectedRoute from './routes/AdminProtectedRoute'

// ==============================
// PUBLIC
// ==============================

import Agenda from './pages/public/Agenda'
import Berita from './pages/public/Berita'
import DetailAgenda from './pages/public/DetailAgenda'
import DetailBerita from './pages/public/DetailBerita'
import DetailLayananHukum from './pages/public/DetailLayananHukum'
import DetailPengumuman from './pages/public/DetailPengumuman'
import DetailPPID from './pages/public/DetailPPID'
import DokumenPublik from './pages/public/DokumenPublik'
import Home from './pages/public/Home'
import JadwalSidang from './pages/public/JadwalSidang'
import KalkulatorBiayaPerkara from './pages/public/KalkulatorBiayaPerkara'
import Kontak from './pages/public/Kontak'
import Layanan from './pages/public/Layanan'
import NotFound from './pages/public/NotFound'
import Pengumuman from './pages/public/Pengumuman'
import PersyaratanBerperkara from './pages/public/PersyaratanBerperkara'
import PPID from './pages/public/PPID'
import ProfilPengadilan from './pages/public/ProfilPengadilan'
import SejarahPengadilan from './pages/public/SejarahPengadilan'
import StrukturOrganisasi from './pages/public/StrukturOrganisasi'
import VisiMisi from './pages/public/VisiMisi'
import WilayahYurisdiksi from './pages/public/WilayahYurisdiksi'

// ==============================
// PTSP - VERIFIKASI
// ==============================

import AjukanVerifikasi from './pages/ptsp/AjukanVerifikasi'
import LacakVerifikasi from './pages/ptsp/LacakVerifikasi'
import PerbaikiVerifikasi from './pages/ptsp/PerbaikiVerifikasi'
import VerifikasiBerkas from './pages/ptsp/VerifikasiBerkas'

// ==============================
// PTSP - ANTREAN
// ==============================

import AmbilAntrean from './pages/ptsp/AmbilAntrean'
import PantauAntrean from './pages/ptsp/PantauAntrean'

// ==============================
// ADMIN
// ==============================

import AdminAntrean from './pages/admin/AdminAntrean'
import AdminBiayaPerkara from './pages/admin/AdminBiayaPerkara'
import AdminDashboard from './pages/admin/AdminDashboard'
import LoginAdmin from './pages/admin/LoginAdmin'
import VerifikasiDetail from './pages/admin/VerifikasiDetail'
import VerifikasiList from './pages/admin/VerifikasiList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================================== */}
        {/* PUBLIC */}
        {/* ======================================== */}

        <Route element={<PublicLayout />}>
          {/* BERANDA */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* ============================== */}
          {/* PENGADILAN */}
          {/* ============================== */}

          <Route
            path="/profil"
            element={<ProfilPengadilan />}
          />

          <Route
            path="/visi-misi"
            element={<VisiMisi />}
          />

          <Route
            path="/sejarah"
            element={<SejarahPengadilan />}
          />

          <Route
            path="/struktur-organisasi"
            element={<StrukturOrganisasi />}
          />

          <Route
            path="/wilayah-yurisdiksi"
            element={<WilayahYurisdiksi />}
          />

          {/* ============================== */}
          {/* LAYANAN HUKUM */}
          {/* ============================== */}

          <Route
            path="/layanan"
            element={<Layanan />}
          />

          <Route
            path="/layanan/biaya-perkara"
            element={<KalkulatorBiayaPerkara />}
          />

          <Route
            path="/layanan/persyaratan-berperkara"
            element={<PersyaratanBerperkara />}
          />

          <Route
            path="/layanan/:slug"
            element={<DetailLayananHukum />}
          />

          {/* ============================== */}
          {/* JADWAL SIDANG */}
          {/* ============================== */}

          <Route
            path="/jadwal-sidang"
            element={<JadwalSidang />}
          />

          {/* ============================== */}
          {/* PTSP - VERIFIKASI */}
          {/* ============================== */}

          <Route
            path="/ptsp/verifikasi"
            element={<VerifikasiBerkas />}
          />

          <Route
            path="/ptsp/verifikasi/ajukan"
            element={<AjukanVerifikasi />}
          />

          <Route
            path="/ptsp/verifikasi/lacak"
            element={<LacakVerifikasi />}
          />

          <Route
            path="/ptsp/verifikasi/perbaiki/:nomorPermohonan"
            element={<PerbaikiVerifikasi />}
          />

          {/* ============================== */}
          {/* PTSP - ANTREAN */}
          {/* ============================== */}

          <Route
            path="/ptsp/antrean/ambil"
            element={<AmbilAntrean />}
          />

          <Route
            path="/ptsp/antrean/pantau"
            element={<PantauAntrean />}
          />

          {/* ============================== */}
          {/* BERITA */}
          {/* ============================== */}

          <Route
            path="/berita"
            element={<Berita />}
          />

          <Route
            path="/berita/:slug"
            element={<DetailBerita />}
          />

          {/* ============================== */}
          {/* PENGUMUMAN */}
          {/* ============================== */}

          <Route
            path="/pengumuman"
            element={<Pengumuman />}
          />

          <Route
            path="/pengumuman/:slug"
            element={<DetailPengumuman />}
          />

          {/* ============================== */}
          {/* AGENDA */}
          {/* ============================== */}

          <Route
            path="/agenda"
            element={<Agenda />}
          />

          <Route
            path="/agenda/:slug"
            element={<DetailAgenda />}
          />

          {/* ============================== */}
          {/* PPID */}
          {/* ============================== */}

          <Route
            path="/ppid"
            element={<PPID />}
          />

          <Route
            path="/ppid/:slug"
            element={<DetailPPID />}
          />

          {/* ============================== */}
          {/* DOKUMEN */}
          {/* ============================== */}

          <Route
            path="/dokumen"
            element={<DokumenPublik />}
          />

          {/* ============================== */}
          {/* KONTAK */}
          {/* ============================== */}

          <Route
            path="/kontak"
            element={<Kontak />}
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>

        {/* ======================================== */}
        {/* LOGIN ADMIN */}
        {/* ======================================== */}

        <Route
          path="/admin/login"
          element={<LoginAdmin />}
        />

        {/* ======================================== */}
        {/* ADMIN */}
        {/* ======================================== */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          {/* DASHBOARD */}

          <Route
            index
            element={<AdminDashboard />}
          />

          {/* VERIFIKASI */}

          <Route
            path="verifikasi"
            element={<VerifikasiList />}
          />

          <Route
            path="verifikasi/:id"
            element={<VerifikasiDetail />}
          />

          {/* ANTREAN */}

          <Route
            path="antrean"
            element={<AdminAntrean />}
          />

          {/* KALKULATOR BIAYA */}

          <Route
            path="biaya-perkara"
            element={<AdminBiayaPerkara />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}