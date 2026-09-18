import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react'

import {
  useState,
} from 'react'

import type {
  FormEvent,
} from 'react'

import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

interface LocationState {
  from?: string
}

export default function LoginAdmin() {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const login =
    useAuthStore(
      (state) => state.login,
    )

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated,
    )

  const [email, setEmail] =
    useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState('')

  if (isAuthenticated) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    )
  }

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    setError('')

    const berhasil =
      login(
        email.trim(),
        password,
      )

    if (!berhasil) {
      setError(
        'Email atau password tidak sesuai.',
      )

      return
    }

    const state =
      location.state as
        | LocationState
        | null

    navigate(
      state?.from ??
        '/admin',

      {
        replace: true,
      },
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* KIRI */}
        <div className="hidden bg-[#0b4226] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d9bd61]">
              Pengadilan 
            </p>

            <h1 className="mt-6 max-w-lg text-4xl font-extrabold leading-tight">
              Sistem Administrasi
              PTSP Online
            </h1>

            <p className="mt-5 max-w-lg leading-8 text-white/70">
              Kelola verifikasi
              berkas online dan
              pelayanan antrean PTSP
              dalam satu sistem.
            </p>
          </div>

          <div className="border-t border-white/15 pt-6">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={21}
                className="text-[#d9bd61]"
              />

              <p className="text-sm text-white/70">
                Area khusus petugas
                Pengadilan Agama
                Polewali.
              </p>
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
                Pengadilan Agama
                Polewali
              </p>
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#116530]">
              Admin PTSP
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#17201b]">
              Masuk ke Sistem
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Gunakan akun petugas
              yang telah terdaftar
              untuk mengakses
              dashboard.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-5"
            >
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Email
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(
                      event,
                    ) =>
                      setEmail(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="Masukkan email"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#116530]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      password
                    }
                    onChange={(
                      event,
                    ) =>
                      setPassword(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="Masukkan password"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#116530]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={
                          18
                        }
                      />
                    ) : (
                      <Eye
                        size={
                          18
                        }
                      />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="border-l-4 border-red-500 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#116530] py-3.5 text-sm font-bold !text-white transition hover:bg-[#0d4e28]"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}