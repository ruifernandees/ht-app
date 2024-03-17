declare module '*.png'
declare module '*.jpg'
declare module '*.svg'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FB_AUTH_DOMAIN: string;
      FB_AUTH_KEY: string;
      FB_DATABASE_URL: string;
      FB_STORAGE_BUCKET: string;
      FB_MESSAGING_SENDER_ID: string;
      FB_ANDROID_APP_ID: string;
      FB_IOS_APP_ID: string;
      FB_PROJECT_ID: string;
      FB_MEASUREMENT_ID: string;
    }
  }
}