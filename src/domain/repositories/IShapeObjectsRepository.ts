/* eslint-disable no-unused-vars */
import { ShapeObject } from '../entities/ShapeObject';
import { User } from '../entities/User';

export interface IShapeObjectsRepository {
  storeObjects: (objects: ShapeObject[], user: User) => Promise<void>;
  fetchObjectsByUser: (user: User) => Promise<ShapeObject[]>;
}
