import {
  useState,
} from 'react'

import {
  Outlet,
} from 'react-router-dom'

import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AdminLayout() {
  const [
    sidebarTerbuka,
    setSidebarTerbuka,
  ] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      <AdminSidebar
        terbuka={
          sidebarTerbuka
        }
        tutupSidebar={() =>
          setSidebarTerbuka(
            false,
          )
        }
      />

      <div className="lg:pl-[270px]">
        <AdminNavbar
          bukaSidebar={() =>
            setSidebarTerbuka(
              true,
            )
          }
        />

        <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}