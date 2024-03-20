/* eslint-disable no-unused-vars */
import { User } from '@/domain/entities/User';

export interface IAuthenticationStoreData {
  user?: User;
}

export interface IAuthenticationStoreProps extends IAuthenticationStoreData {
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}
