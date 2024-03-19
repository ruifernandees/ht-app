import { create }from "zustand"
import database from '@react-native-firebase/database';
import { IObjectsStoreData, IObjectsStoreProps } from './props';
import { EObjectId } from '@/domain/enums/EObjectId';
import { theme } from '@/global/theme';
import { options } from '@/presentation/screens/settings/data';
import { orderByName } from '@/global/helpers/orderByName';

const initialData: IObjectsStoreData = {
  objects: [
    {
      id: EObjectId.OBJECT_A,
      name: 'Objeto A',
      color: theme.colors.green,
      rotation: [1,0,0],
      shape: options[0].value,
      index: 1,
    },
    {
      id: EObjectId.OBJECT_B,
      name: 'Objeto B',
      color: theme.colors.blue,
      rotation: [1,0,0],
      shape: options[1].value,
      index: 2
    },
    {
      id: EObjectId.OBJECT_C,
      name: 'Objeto C',
      color: theme.colors.red,
      rotation: [0,0,0],
      shape: options[2].value,
      index: 3
    }
  ]
};


export const useObjectsStore = create<IObjectsStoreProps>(
  (set, get) => ({
    ...initialData,
    fetchObjects: async (user) => {
      const reference = database().ref(`/users/${user.id}`);
      const result = (await reference.once('value')).val();
      const objects = result.objects.sort((a,b) => orderByName(a.id, b.id));
      set({
        objects
      })
      return  objects;
    },
    setObject: async (object, user) => {
      const objects = get().objects;
      const previousObject = objects.findIndex(_object => _object.id === object.id)
      if (previousObject !== -1) { 
        const objectsWithoutDesiredObject = objects.filter(_object => _object.id !== object.id);
        const newObjectsRecord = [
          ...objectsWithoutDesiredObject,
          object
        ]
        set({
          objects: newObjectsRecord
        });
        console.log('BEFORE REF', newObjectsRecord)
        const reference = database().ref(`/users/${user.id}`);
        const a = await reference.set({
          ...user,
          objects: newObjectsRecord.sort((a,b) => orderByName(a.id, b.id)),
        })
        console.log({a, reference})
      }
    }
  })

);