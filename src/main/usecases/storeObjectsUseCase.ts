import { StoreObjectsUseCase } from "@/domain/usecases/StoreObjectsUseCase";
import { FirebaseShapeObjectsRepository } from "@/infra/repositories/FirebaseShapeObjectsRepository";

export const storeObjectsUseCase = new StoreObjectsUseCase(
  new FirebaseShapeObjectsRepository()
);