import React, { useState } from 'react';
import { ButtonText, Container, Icon, OptionButton,  } from './styles';
import { Header } from '@/presentation/components/Header';
import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { EAppStackRoutes } from '@/main/routes/mappers/EAppStackRoutes';
import { useNavigation } from '@react-navigation/native';
import { AccessibilityInfo } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';

export const SettingsScreen: React.FC = () => {
	const { user, logout } = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);

	async function handleLogout() {
		setIsLoading(true);
		try {
			await logout()

			const message = `Até mais, ${user?.name}!`;
			AccessibilityInfo
				.announceForAccessibility(message);
			Snackbar.show({
				text: message,
				duration: 5000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.darkBlue
			});
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(true);
		}
	}

	return <Container>
		<Header title="Configurações" />
		{isLoading ? <LoadingWithOverlay/>: null}
		<OptionButton onPress={handleLogout}>	
			<ButtonText>Sair</ButtonText>
			<Icon name="log-out" />
		</OptionButton>
	</Container>
};
