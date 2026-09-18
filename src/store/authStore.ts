import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
  nama: string
  email: string
  role: 'Admin'
}

interface AuthStore {
  user: AdminUser | null
  isAuthenticated: boolean

  login: (
    email: string,
    password: string,
  ) => boolean

  logout: () => void
}

export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set) => ({
        user: null,

        isAuthenticated: false,

        login: (
          email,
          password,
        ) => {
          const emailAdmin =
            'admin@pa-polewali.go.id'

          const passwordAdmin =
            'admin123'

          if (
            email === emailAdmin &&
            password === passwordAdmin
          ) {
            set({
              isAuthenticated:
                true,

              user: {
                nama:
                  'Administrator PTSP',

                email:
                  emailAdmin,

                role:
                  'Admin',
              },
            })

            return true
          }

          return false
        },

        logout: () => {
          set({
            user: null,
            isAuthenticated:
              false,
          })
        },
      }),

      {
        name:
          'pa-polewali-admin-auth',
      },
    ),
  )