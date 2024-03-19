import { ShapeObject } from "@/domain/entities/ShapeObject";

export interface IObjectsStoreData {
  objects: ShapeObject[];
}

export interface IObjectsStoreProps extends IObjectsStoreData {
  setObject: (object: ShapeObject) => void;
}