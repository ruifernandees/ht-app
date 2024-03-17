import { useAuthenticationStore } from '@/presentation/stores/authentication';
import React from 'react';
import { Container } from './styles';
import { Header } from '@/presentation/components/Header';

export const HomeScreen: React.FC = () => {
	const {user} = useAuthenticationStore()
	return <Container>
		<Header title={`Olá, ${user?.name}`} />
	</Container>
};
