import { GetAppConfigUseCase } from '@/domain/usecases/GetAppConfigUseCase';
import { FirebaseAppConfigRepository } from '@/infra/repositories/FirebaseAppConfigRepository';

export const getAppConfigUseCase = new GetAppConfigUseCase(
  new FirebaseAppConfigRepository()
);
