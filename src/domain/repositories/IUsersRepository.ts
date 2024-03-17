import { IAuthenticationDTO } from "../dtos/IAuthenticationDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  authenticate(params: IAuthenticationDTO): Promise<User>;
  logout(): Promise<void>;
}