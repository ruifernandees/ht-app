import {create} from 'zustand';

import {type IObjectsStoreData, type IObjectsStoreProps} from './props';
import {EObjectId} from '@/domain/enums/EObjectId';
import {theme} from '@/global/theme';
import {options} from '@/presentation/screens/settings/data';
import {orderByName} from '@/global/helpers/orderByName';
import {fetchShapeObjectsByUserUseCase} from '@/main/usecases/fetchObjectsByUserUseCase';
import {storeObjectsUseCase} from '@/main/usecases/storeObjectsUseCase';
import {sortObjects} from '@/global/helpers/orderObjects';

const initialData: IObjectsStoreData = {
	objects: [
		{
			id: EObjectId.OBJECT_A,
			name: 'Objeto A',
			color: theme.colors.green,
			rotation: [1, 0, 0],
			shape: options[0].value,
			index: 1,
		},
		{
			id: EObjectId.OBJECT_B,
			name: 'Objeto B',
			color: theme.colors.blue,
			rotation: [1, 0, 0],
			shape: options[1].value,
			index: 2,
		},
		{
			id: EObjectId.OBJECT_C,
			name: 'Objeto C',
			color: theme.colors.red,
			rotation: [0, 0, 0],
			shape: options[2].value,
			index: 3,
		},
	],
};

export const useObjectsStore = create<IObjectsStoreProps>(
	(set, get) => ({
		...initialData,
		async fetchObjects(user) {
			const previousData = get();
			set({...previousData, isFetching: true});
			const objects = await fetchShapeObjectsByUserUseCase.execute(user);
			set({
				objects,
				isFetching: false,
			});
			return objects;
		},
		async setObject(object, user) {
			const {objects} = get();
			const previousObject = objects.findIndex(_object => _object.id === object.id);
			if (previousObject !== -1) {
				const objectsWithoutDesiredObject = objects.filter(_object => _object.id !== object.id);
				const newObjectsRecord = sortObjects([
					...objectsWithoutDesiredObject,
					object,
				]);
				set({
					objects: newObjectsRecord,
				});
				await storeObjectsUseCase.execute(newObjectsRecord, user);
			}
		},
	}),

);
