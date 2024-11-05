import { TwoFactorResponseModel } from 'app/models/twoFactorResponse.model'
import { UsuarioModel } from 'app/models/usuario.model'
import { create } from 'zustand'

interface SecurityStore {
    user: UsuarioModel | null
    setUser: (user: UsuarioModel) => void
    removeUser: () => void
    sessionData: TwoFactorResponseModel | null
    setSessionData: (sessionData: TwoFactorResponseModel) => void
    removeSessionData: () => void
}

const useSecurityStore = create<SecurityStore>((set) => ({
    user: null,
    setUser: (user: UsuarioModel) => set({ user }),
    removeUser: () => set({ user: null }),
    sessionData: null,
    setSessionData: (sessionData: TwoFactorResponseModel) => set({ sessionData }),
    removeSessionData: () => set({ sessionData: null }),
}))

export default useSecurityStore
