import { ShapeObject } from "@/domain/entities/ShapeObject";
import { User } from "@/domain/entities/User";

export interface IObjectsStoreData {
  objects: ShapeObject[];
}

export interface IObjectsStoreProps extends IObjectsStoreData {
  setObject: (object: ShapeObject, user: User) => Promise<void>;
  fetchObjects: (user: User) => Promise<ShapeObject[]>;
}