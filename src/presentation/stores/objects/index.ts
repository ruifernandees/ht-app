import AsyncStorage from '@react-native-async-storage/async-storage';
import { create }from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { IObjectsStoreData, IObjectsStoreProps } from './props';
import { logoutUserUseCase } from '@/main/usecases/logoutUserUseCase';
import { EObjectId } from '@/domain/enums/EObjectId';
import { theme } from '@/global/theme';
import { options } from '@/presentation/screens/settings/data';

const initialData: IObjectsStoreData = {
  objects: [
    {
      id: EObjectId.OBJECT_A,
      name: 'Objeto A',
      color: theme.colors.green,
      rotation: [1,0,0],
      shape: options[0].value,
    },
    {
      id: EObjectId.OBJECT_B,
      name: 'Objeto B',
      color: theme.colors.blue,
      rotation: [1,0,0],
      shape: options[1].value,
    },
    {
      id: EObjectId.OBJECT_C,
      name: 'Objeto C',
      color: theme.colors.red,
      rotation: [0,0,0],
      shape: options[2].value,
    }
  ]
};


export const useObjectsStore = create<IObjectsStoreProps>(
  (set, get) => ({
    ...initialData,
    
    setObject: (object) => {
      const objects = get().objects;
      const previousObject = objects.findIndex(_object => _object.id === object.id)
      if (previousObject !== -1) { 
        const objectsWithoutDesiredObject = objects.filter(_object => _object.id === object.id);
        set({
          objects: [
            ...objectsWithoutDesiredObject,
            object
          ]
        });
      }
    }
  })

);