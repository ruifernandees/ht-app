import { AppConfig } from "@/domain/entities/AppConfig";
import { IAppConfigRepository } from "@/domain/repositories/IAppConfigRepository";
import remoteConfig from '@react-native-firebase/remote-config';
import { FirebaseAppConfigAdapter } from "./adapters/FirebaseAppConfigAdapter";

export class FirebaseAppConfigRepository implements IAppConfigRepository {
  async getAppConfig(): Promise<AppConfig> {
    await remoteConfig().setDefaults({
      isApplicationOn: true,
      backgroundHomeColor: '#000',
    });
    await remoteConfig().fetch(60);
    const wasFetched = await remoteConfig().fetchAndActivate();
    return new FirebaseAppConfigAdapter(remoteConfig().getAll());
  }
}