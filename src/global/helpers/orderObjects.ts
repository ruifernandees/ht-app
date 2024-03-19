import { ShapeObject } from "@/domain/entities/ShapeObject";
import { orderByName } from "./orderByName";

export function sortObjects(objects: ShapeObject[]): ShapeObject[] {
  return objects.sort((a: ShapeObject, b: ShapeObject) => orderByName(a.id, b.id));
}