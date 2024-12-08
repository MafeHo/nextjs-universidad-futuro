import { TwoFactorResponseModel } from 'app/models/twoFactorResponse.model'
import { UsuarioModel } from 'app/models/usuario.model'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SecurityStore {
    user: UsuarioModel | null
    setUser: (user: UsuarioModel) => void
    removeUser: () => void
    sessionData: TwoFactorResponseModel | null
    setSessionData: (sessionData: TwoFactorResponseModel) => void
    removeSessionData: () => void
}

const useSecurityStore = create<SecurityStore>()(
    persist(
        (set) => ({
            user: localStorage.getItem('securityStore')
                ? JSON.parse(localStorage.getItem('securityStore') as string).user
                : null,
            setUser: (user: UsuarioModel) => set({ user }),
            removeUser: () => set({ user: null }),
            sessionData: localStorage.getItem('securityStore')
                ? JSON.parse(localStorage.getItem('securityStore') as string)
                      .sessionData
                : null,
            setSessionData: (sessionData: TwoFactorResponseModel) =>
                set({ sessionData }),
            removeSessionData: () => set({ sessionData: null }),
        }),
        {
            name: 'securityStore',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

export default useSecurityStore
