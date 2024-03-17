import { IAuthenticationDTO } from "@/domain/dtos/IAuthenticationDTO";
import { IUser } from "@/domain/entities/IUser";
import { IUsersRepository } from "@/domain/repositories/IUsersRepository";

export class AuthenticateUserUseCase {
  constructor(
    private repository: IUsersRepository,
  ) {}

  async execute(params: IAuthenticationDTO): Promise<IUser> {
    return this.repository.authenticate(params);
  }
}