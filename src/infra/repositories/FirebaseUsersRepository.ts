import auth from '@react-native-firebase/auth';
import { type IAuthenticationDTO } from '@/domain/dtos/IAuthenticationDTO';
import { type User } from '@/domain/entities/User';
import { type IUsersRepository } from '@/domain/repositories/IUsersRepository';
import { FirebaseUserAdapter } from './adapters/FirebaseUserAdapter';

export class FirebaseUsersRepository implements IUsersRepository {
  async authenticate(params: IAuthenticationDTO): Promise<User> {
    const response = await auth().signInWithEmailAndPassword(
      params.email,
      params.password
    );
    return new FirebaseUserAdapter(response);
  }

  async logout(): Promise<void> {
    return auth().signOut();
  }
}
