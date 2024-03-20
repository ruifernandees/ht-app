import React, {type ReactNode, useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {Container} from './styles';
import {useObjectsStore} from '@/presentation/stores/objects';
import {useAuthenticationStore} from '@/presentation/stores/authentication';
import {getAppConfigUseCase} from '@/main/usecases/getAppConfigUseCase';
import {type AppConfig} from '@/domain/entities/AppConfig';

export const HomeScreen: React.FC = () => {
	const {objects} = useObjectsStore();
	const [appConfig, setAppConfig] = useState<AppConfig>();

	useEffect(() => {
		(async () => {
			setAppConfig(await getAppConfigUseCase.execute());
		})();
	}, []);

	const options: Record<string, ReactNode> = {
		cone: <coneGeometry />,
		tetrahedron: <tetrahedronGeometry />,
		dodecahedron: <dodecahedronGeometry />,
		box: <boxGeometry />,
		torusKnot: <torusKnotGeometry />,
	};
	const positions = [
		[0, 2.5, 0],
		[0, 0, -2],
		[0, -2, 0],
	];
	return <Container backgroundColor={appConfig?.backgroundHomeColor}>
		<Canvas>
			<ambientLight />
			<pointLight position={[1, 0.9, 1]} />
			<pointLight position={[1, -2, -2]} />
			<pointLight position={[1, -3, 1]} />
			{objects.map((_object, index) => {
				console.log('👽', _object);
				return <mesh
					position={positions[index]}
					rotation={_object.rotation}
					key={_object.id}
				>
					{options[_object.shape]}
					<meshStandardMaterial color={_object.color} />
				</mesh>;
			})}
		</Canvas>
	</Container>;
};
