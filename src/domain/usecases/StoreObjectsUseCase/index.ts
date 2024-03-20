/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { ShapeObject } from '@/domain/entities/ShapeObject';
import { User } from '@/domain/entities/User';
import { IShapeObjectsRepository } from '@/domain/repositories/IShapeObjectsRepository';

export class StoreObjectsUseCase {
  constructor(private repository: IShapeObjectsRepository) {}

  async execute(objects: ShapeObject[], user: User): Promise<void> {
    return this.repository.storeObjects(objects, user);
  }
}
