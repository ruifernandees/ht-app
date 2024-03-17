import { AuthenticateUserUseCase } from "@/domain/usecases/AuthenticateUserUseCase";
import { FirebaseUsersRepository } from "@/infra/repositories/FirebaseUsersRepository";

export const authenticateUserUseCase = new AuthenticateUserUseCase(
  new FirebaseUsersRepository()
);