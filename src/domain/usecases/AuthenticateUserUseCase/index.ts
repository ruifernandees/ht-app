import { IAuthenticationDTO } from "@/domain/dtos/IAuthenticationDTO";
import { User } from "@/domain/entities/User";
import { IUsersRepository } from "@/domain/repositories/IUsersRepository";

export class AuthenticateUserUseCase {
  constructor(
    private repository: IUsersRepository,
  ) {}

  async execute(params: IAuthenticationDTO): Promise<User> {
    return this.repository.authenticate(params);
  }
}