import { FetchShapeObjectsByUserUseCase } from "@/domain/usecases/FetchShapeObjectsByUserUseCase";
import { FirebaseShapeObjectsRepository } from "@/infra/repositories/FirebaseShapeObjectsRepository";

export const fetchShapeObjectsByUserUseCase = new FetchShapeObjectsByUserUseCase(
  new FirebaseShapeObjectsRepository()
);