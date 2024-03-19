import { AppConfig } from "../entities/AppConfig";

export interface IAppConfigRepository {
  getAppConfig(): Promise<AppConfig>;
}