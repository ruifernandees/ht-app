import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IAuthenticationStoreData, IAuthenticationStoreProps } from './props';
import { logoutUserUseCase } from '@/main/usecases/logoutUserUseCase';

const initialData: IAuthenticationStoreData = {
  user: undefined,
};

export const useAuthenticationStore = create(
  persist<IAuthenticationStoreProps>(
    (set) => ({
      ...initialData,
      setUser: (user) => set({ user }),
      logout: async () => {
        await logoutUserUseCase.execute();
        set({ user: undefined });
      },
    }),
    {
      name: 'authentication-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
