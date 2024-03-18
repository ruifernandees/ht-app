import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Container } from './styles';
import { theme } from '@/global/theme';

export const HomeScreen: React.FC = () => {
	return <Container>
		<Canvas>
			<ambientLight />
			<pointLight position={[1, 0.9, 1]} />
			<pointLight position={[1, -2, -2]} />
			<pointLight position={[1, -3, 1]} />
			<mesh position={[0, 2.5, 0]} rotation={[1,0,0]} >
				<boxGeometry />
				<meshStandardMaterial color={theme.colors.green} />
			</mesh> 
			<mesh position={[0, 0, -2]} rotation={[1,0,0]}>
				<torusKnotGeometry />
				<meshStandardMaterial color={theme.colors.blue} />
			</mesh> 
			<mesh position={[0, -2, 0]} rotation={[0,0,0]}>
				<coneGeometry />
				<meshStandardMaterial color={theme.colors.red} />
			</mesh> 
		</Canvas>
	</Container>
};
