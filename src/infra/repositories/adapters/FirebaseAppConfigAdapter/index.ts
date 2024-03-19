import { AppConfig } from "@/domain/entities/AppConfig";
import { FirebaseRemoteConfigTypes } from "@react-native-firebase/remote-config";

export class FirebaseAppConfigAdapter extends AppConfig {
  constructor(adaptee: FirebaseRemoteConfigTypes.ConfigValues) {
    super(adaptee.backgroundHomeColor.asString());
  }
}