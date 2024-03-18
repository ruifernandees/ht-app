import React, { useRef, useState } from 'react';
import { ButtonText, Container,  Icon, Input, Modal, ModalContent, OptionButton, Title } from './styles';
import { Header } from '@/presentation/components/Header';
import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { AccessibilityInfo } from 'react-native';

import Snackbar from 'react-native-snackbar';
import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';
import { FormSchema, ObjectLabelsMapper, inputs, options } from './data';
import { IFieldValues } from './props';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modalize } from 'react-native-modalize';
import { EObjectId } from '@/domain/enums/EObjectId';

export const SettingsScreen: React.FC = () => {
	const { user, logout } = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
  const [items, setItems] = useState(options);
	const [selectedObject, setSelectedObject] = useState<EObjectId>()

	const modalizeRef = useRef<Modalize>(null);
	

  const onOpen = () => {
    modalizeRef.current?.open();
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
				<Input placeholder="Cor do Objeto" />
				<Input placeholder="Forma do Objeto" />
				<Input placeholder="Rotação" />
				<OptionButton onPress={() => modalizeRef.current?.open()} color={theme.colors.blue}>	
					<ButtonText color={theme.colors.white}>Salvar</ButtonText>
					<Icon name="send" color={theme.colors.white} />
				</OptionButton>
			</ModalContent>

		</Modal>
		<Header title="Configurações" />
		{isLoading ? <LoadingWithOverlay/>: null}
		<OptionButton onPress={() => {
			setSelectedObject(EObjectId.OBJECT_A)
			modalizeRef.current?.open()
		}} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Objeto A</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={() => {
			setSelectedObject(EObjectId.OBJECT_B)
			modalizeRef.current?.open()
		}} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Objeto B</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={() => {
			setSelectedObject(EObjectId.OBJECT_C)
			modalizeRef.current?.open()
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
