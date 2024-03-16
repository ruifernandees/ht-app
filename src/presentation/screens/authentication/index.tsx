import React from 'react';
import { Banner, MainContainer, Title } from './styles';

export const AuthenticationScreen: React.FC = () => {
	return (
		<MainContainer>
			<Banner
				accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" 
			/>
			<Title>Seja bem-vindo(a)!</Title>
		</MainContainer>
	);
};
