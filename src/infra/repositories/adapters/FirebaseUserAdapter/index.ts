import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '@/domain/entities/User';

export class FirebaseUserAdapter extends User {
  constructor(adaptee: FirebaseAuthTypes.UserCredential) {
    if (!adaptee.user.email || !adaptee.user.displayName)
      throw new Error('Dados inválidos');
    super(adaptee.user.uid, adaptee.user.displayName, adaptee.user.email);
  }
}
