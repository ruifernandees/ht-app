import { User } from "@/domain/entities/User";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export class FirebaseUserAdapter extends User {
  constructor(adaptee: FirebaseAuthTypes.UserCredential) {
    if (!adaptee.user.email || !adaptee.user.displayName) throw new Error('Dados inválidos');
    super(adaptee.user.email, adaptee.user.displayName);
  }
}