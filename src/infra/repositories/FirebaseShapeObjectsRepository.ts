/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import database from '@react-native-firebase/database';
import { type ShapeObject } from '@/domain/entities/ShapeObject';
import { type User } from '@/domain/entities/User';
import { type IShapeObjectsRepository } from '@/domain/repositories/IShapeObjectsRepository';
import { sortObjects } from '@/global/helpers/orderObjects';

export class FirebaseShapeObjectsRepository implements IShapeObjectsRepository {
  async storeObjects(objects: ShapeObject[], user: User): Promise<void> {
    const reference = database().ref(`/users/${user.id}`);
    await reference.set({
      ...user,
      objects,
    });
  }

  async fetchObjectsByUser(user: User): Promise<ShapeObject[]> {
    const reference = database().ref(`/users/${user.id}`);
    const result = (await reference.once('value')).val();
    return sortObjects(result.objects);
  }
}
