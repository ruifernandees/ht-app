import { IUser } from "@/domain/entities/IUser";

export interface IAuthenticationStoreData {
  user?: IUser;
}

export interface IAuthenticationStoreProps extends IAuthenticationStoreData {
  setUser: (user: IUser) => void;
}