import React, { ReactNode, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Container } from './styles';
import { useObjectsStore } from '@/presentation/stores/objects';
import { useAuthenticationStore } from '@/presentation/stores/authentication';

export const HomeScreen: React.FC = () => {

	const {user} = useAuthenticationStore()
	const {fetchObjects, objects} = useObjectsStore()

	useEffect(() => {
		if (user) {
			(async () => {
				const a = await fetchObjects(user);
				console.log({fetch: a})

			})()

		}
	}, [user]);
	const options: {[key: string]: ReactNode} = {
		'cone': <coneGeometry />,
		'tetrahedron': <tetrahedronGeometry />,
		'dodecahedron': <dodecahedronGeometry />,
		'box': <boxGeometry />,
		'torusKnot': <torusKnotGeometry />
	};
	return <Container>
		<Canvas>
			<ambientLight />
			<pointLight position={[1, 0.9, 1]} />
			<pointLight position={[1, -2, -2]} />
			<pointLight position={[1, -3, 1]} />
			{objects.map((_object, index)=> {
				console.log('👽', _object)
				const positions = [
					[0, 2.5, 0],
					[0, 0, -2],
					[0, -2, 0]
				];
				return <mesh 
					position={positions[index]} 
					rotation={_object.rotation}
					key={_object.id}
				>
					{options[_object.shape]}
					<meshStandardMaterial color={_object.color} />
				</mesh> 
			})}
		</Canvas>
	</Container>
};
