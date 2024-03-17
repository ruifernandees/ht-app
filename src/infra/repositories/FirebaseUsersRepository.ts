import auth from '@react-native-firebase/auth';
import { IAuthenticationDTO } from "@/domain/dtos/IAuthenticationDTO";
import { IUser } from "@/domain/entities/IUser";
import { IUsersRepository } from "@/domain/repositories/IUsersRepository";

export class FirebaseUsersRepository implements IUsersRepository {
  async authenticate(params: IAuthenticationDTO): Promise<IUser> {
    const response = await auth().signInWithEmailAndPassword(params.email, params.password)
    if (!response.user.email || !response.user.displayName) throw new Error('Dados inválidos');
    return {
      email: response.user.email,
      name: response.user.displayName,
    };
  }

  async logout(): Promise<void> {
    return auth().signOut();
  }
}