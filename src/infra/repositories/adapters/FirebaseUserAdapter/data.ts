import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const firebaseMockData: FirebaseAuthTypes.UserCredential = {
  additionalUserInfo: {
    isNewUser: false,
    providerId: '-',
  },
  user: {
    multiFactor: {
      enrolledFactors: [],
    },
    metadata: {
      lastSignInTime: '1710804678143',
      creationTime: '1710690968095',
    },
    photoURL: null,
    phoneNumber: null,
    displayName: 'John Doe',
    emailVerified: false,
    isAnonymous: false,
    uid: 'RmCwEpg7YMeU4ihCKTTNYcK1zfN2',
    email: 'john.doe@handtalk.com',
    providerData: [
      {
        email: 'john.doe@handtalk.com',
        providerId: 'password',
        displayName: 'John Doe',
        uid: 'john.doe@handtalk.com',
      },
    ],
    providerId: 'firebase',
  } as unknown as FirebaseAuthTypes.User,
};
