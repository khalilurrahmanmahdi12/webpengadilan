import { Outlet } from 'react-router-dom'

import Footer from '../components/layout/Footer'
import Header from '../components/navigation/Header'
import Navbar from '../components/navigation/Navbar'
import Topbar from '../components/navigation/Topbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9f8]">
      <Topbar />

      <Header />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}