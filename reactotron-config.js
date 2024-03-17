import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "HT App",
    host: "192.168.0.13"
  }) 
  .useReactNative()
  .connect();