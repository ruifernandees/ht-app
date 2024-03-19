import { ShapeObject } from "@/domain/entities/ShapeObject";
import { User } from "@/domain/entities/User";
import { IShapeObjectsRepository } from "@/domain/repositories/IShapeObjectsRepository";
import { sortObjects } from "@/global/helpers/orderObjects";
import database from '@react-native-firebase/database';

export class FirebaseShapeObjectsRepository implements IShapeObjectsRepository {
  async storeObjects(objects: ShapeObject[], user: User): Promise<void> {
    console.log('BEFORE REF', objects)
    const reference = database().ref(`/users/${user.id}`);
    await reference.set({
      ...user,
      objects: objects,
    })
  }

  async fetchObjectsByUser(user: User): Promise<ShapeObject[]> {
    const reference = database().ref(`/users/${user.id}`);
    const result = (await reference.once('value')).val();
    return sortObjects(result.objects);
  }
}