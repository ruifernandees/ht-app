import { Platform } from 'react-native';

const AppIdMapper: { [key: string]: string | undefined } = {
  android: process.env.FB_ANDROID_APP_ID,
  ios: process.env.FB_IOS_APP_ID,
};

export const firebaseConfig = {
  apiKey: process.env.FB_AUTH_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: AppIdMapper[Platform.OS],
  measurementId: process.env.FB_MEASUREMENT_ID,
};
