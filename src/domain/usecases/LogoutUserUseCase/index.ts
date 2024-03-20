/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { IUsersRepository } from '@/domain/repositories/IUsersRepository';

export class LogoutUserUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute(): Promise<void> {
    return this.repository.logout();
  }
}
