import AsyncStorage from '@react-native-async-storage/async-storage';
import { create }from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { IAuthenticationStoreData, IAuthenticationStoreProps } from './props';

const initialData: IAuthenticationStoreData = {
  user: undefined,
};

export const useAuthenticationStore = create(persist<IAuthenticationStoreProps>(
  (set) => ({
    ...initialData,
    setUser: (user) => set({ user })
  }),
  {
    name: "authentication-storage",
    storage: createJSONStorage(() => AsyncStorage),
  }
));