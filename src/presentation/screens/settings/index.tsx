import React, { useMemo, useRef, useState } from 'react';
import { ButtonText, Container,  Icon, Input, Modal, ModalContent, OptionButton, Subtitle, Title } from './styles';
import { Header } from '@/presentation/components/Header';
import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { AccessibilityInfo } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import Snackbar from 'react-native-snackbar';
import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';
import { FormSchema, ObjectLabelsMapper, inputs, options } from './data';
import { IFieldValues } from './props';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modalize } from 'react-native-modalize';
import { EObjectId } from '@/domain/enums/EObjectId';
import { Divider, RadioButton } from 'react-native-paper';

export const SettingsScreen: React.FC = () => {
	const { user, logout } = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
  const [items, setItems] = useState(options);
	const [selectedObject, setSelectedObject] = useState<EObjectId>()
  const [value, setValue] = React.useState('first');

	const modalizeRef = useRef<Modalize>(null);
	
  const onOpen = (_selectedObject: EObjectId) => {
		AccessibilityInfo
			.announceForAccessibility(`Modal aberto para configurar ${ObjectLabelsMapper[_selectedObject]}`);
    modalizeRef.current?.open();
		setSelectedObject(_selectedObject);
  };




	const {
    handleSubmit,
		control,
		reset,
    formState: { errors },
  } = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema)
	});

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
		<Modal ref={modalizeRef} adjustToContentHeight>
			<ModalContent>
				{selectedObject ? <Title>{ObjectLabelsMapper[selectedObject]}</Title> : null}
				<Divider style={{marginBottom: 24}} />
				<Input placeholder="Cor do Objeto" />
				<Subtitle>Forma do Objeto</Subtitle>
				<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
					{options.map(_option => {
						return <RadioButton.Item label={_option.label} value={_option.value} />
					})}
				</RadioButton.Group>
				<Input placeholder="Rotação" keyboardType="numeric" />
				<OptionButton onPress={() => modalizeRef.current?.open()} color={theme.colors.blue}>	
					<ButtonText color={theme.colors.white}>Salvar</ButtonText>
					<Icon name="send" color={theme.colors.white} />
				</OptionButton>
			</ModalContent>

		</Modal>
		<Header title="Configurações" />
		{isLoading ? <LoadingWithOverlay/>: null}
		<OptionButton onPress={() => {
			onOpen(EObjectId.OBJECT_A)
		}} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Objeto A</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={() => {
			onOpen(EObjectId.OBJECT_B)
		}} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Objeto B</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={() => {
			onOpen(EObjectId.OBJECT_C)
		}} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Objeto C</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={handleLogout}>	
			<ButtonText>Sair</ButtonText>
			<Icon name="log-out" />
		</OptionButton>
	</Container>
};
