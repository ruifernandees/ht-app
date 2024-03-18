import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Container } from './styles';
import { theme } from '@/global/theme';

export const HomeScreen: React.FC = () => {
	const meshRef = useRef();

	useEffect(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x = 0.10;
		}

	}, [meshRef])

	return <Container>
		{/* <Header title={`Olá, ${user?.name}`} /> */}
		<Canvas 
			// style={{
			// 	width: Dimensions.get('window').width,
			// 	height: Dimensions.get('window').height
			// }}
		>
			<ambientLight />
			{/* <pointLight position={[1, 0.1, 0]} /> */}
			<pointLight position={[1, 0.9, 1]} />
			<pointLight position={[1, -2, -2]} />
			<pointLight position={[1, -3, 1]} />
			{/* <pointLight position={[-2, 1, 2]} /> */}
			<mesh position={[0, 2.5, 0]} ref={meshRef}>
				<boxGeometry />
				<meshStandardMaterial color={theme.colors.green} />
			</mesh> 
			<mesh position={[0, 0, -2]} ref={meshRef}>
				<torusKnotGeometry />
				<meshStandardMaterial color={theme.colors.blue} />
			</mesh> 
			<mesh position={[0, -2, 0]} ref={meshRef}>
				<coneGeometry />
				<meshStandardMaterial color={theme.colors.red} />
			</mesh> 
		</Canvas>
	</Container>
};
