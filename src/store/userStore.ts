import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ user: null, token: null }),
}))
