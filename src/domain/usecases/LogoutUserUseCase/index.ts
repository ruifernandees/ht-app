import { IUsersRepository } from "@/domain/repositories/IUsersRepository";

export class LogoutUserUseCase {
  constructor(
    private repository: IUsersRepository,
  ) {}

  async execute(): Promise<void> {
    return this.repository.logout();
  }
}