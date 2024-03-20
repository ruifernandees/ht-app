import { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';
import { AppConfig } from '@/domain/entities/AppConfig';

export class FirebaseAppConfigAdapter extends AppConfig {
  constructor(adaptee: FirebaseRemoteConfigTypes.ConfigValues) {
    super(adaptee.backgroundHomeColor.asString());
  }
}
