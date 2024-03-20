/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { AppConfig } from '@/domain/entities/AppConfig';
import { IAppConfigRepository } from '@/domain/repositories/IAppConfigRepository';

export class GetAppConfigUseCase {
  constructor(private repository: IAppConfigRepository) {}

  async execute(): Promise<AppConfig> {
    return this.repository.getAppConfig();
  }
}
