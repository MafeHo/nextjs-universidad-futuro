import { UsuarioModel } from 'app/models/usuario.model'
import { create } from 'zustand'

interface SecurityStore {
    user: UsuarioModel | null
    setUser: (user: UsuarioModel) => void
    removeUser: () => void
}

const useSecurityStore = create<SecurityStore>((set) => ({
    user: null,
    setUser: (user: UsuarioModel) => set({ user }),
    removeUser: () => set({ user: null }),
}))

export default useSecurityStore
