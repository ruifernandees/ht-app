import { ShapeObject } from "@/domain/entities/ShapeObject";
import { User } from "@/domain/entities/User";
import { IShapeObjectsRepository } from "@/domain/repositories/IShapeObjectsRepository";

export class FetchShapeObjectsByUserUseCase {
  constructor(
    private repository: IShapeObjectsRepository,
  ) {}

  async execute(user: User): Promise<ShapeObject[]> {
    return this.repository.fetchObjectsByUser(user);
  }
}