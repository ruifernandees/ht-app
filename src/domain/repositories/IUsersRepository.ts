import { IAuthenticationDTO } from "../dtos/IAuthenticationDTO";
import { IUser } from "../entities/IUser";

export interface IUsersRepository {
  authenticate(params: IAuthenticationDTO): Promise<IUser>;
}