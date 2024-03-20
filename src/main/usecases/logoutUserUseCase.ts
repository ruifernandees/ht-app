import { LogoutUserUseCase } from '@/domain/usecases/LogoutUserUseCase';
import { FirebaseUsersRepository } from '@/infra/repositories/FirebaseUsersRepository';

export const logoutUserUseCase = new LogoutUserUseCase(
  new FirebaseUsersRepository()
);
