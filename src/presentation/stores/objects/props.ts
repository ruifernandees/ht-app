/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import { type ShapeObject } from '@/domain/entities/ShapeObject';
import { type User } from '@/domain/entities/User';

export type IObjectsStoreData = {
  objects: ShapeObject[];
  isFetching?: boolean;
};

export type IObjectsStoreProps = {
  setObject: (object: ShapeObject, user: User) => Promise<void>;
  fetchObjects: (user: User) => Promise<ShapeObject[]>;
} & IObjectsStoreData;
