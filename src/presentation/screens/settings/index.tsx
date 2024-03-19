import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonText, ColorDisplay, Container,  Content,  ErrorText,  Icon, Input, InputContainer, InputHorizontalContainer, Modal, ModalContent, OptionButton, SegmentedButtonsContainer, Subtitle, Title } from './styles';
import { Header } from '@/presentation/components/Header';
import database from '@react-native-firebase/database';

import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { AccessibilityInfo } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import Snackbar from 'react-native-snackbar';
import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';
import { FormSchema, ObjectLabelsMapper, inputs, options } from './data';
import { IFieldValues } from './props';
import {  Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modalize } from 'react-native-modalize';
import { EObjectId } from '@/domain/enums/EObjectId';
import { Divider, RadioButton, SegmentedButtons } from 'react-native-paper';
import { useObjectsStore } from '@/presentation/stores/objects';
import { ShapeObject } from '@/domain/entities/ShapeObject';
import { useFocusEffect } from '@react-navigation/native';
import { validateHexColor } from '@/global/helpers/validateHexColor';

export const SettingsScreen: React.FC = () => {
	const { user, logout } = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
  const [items, setItems] = useState(options);
	
	const modalizeRef = useRef<Modalize>(null);
	
	const { objects, setObject } = useObjectsStore()
	const [selectedObject, setSelectedObject] = useState<ShapeObject>(objects[0])
	const {
    handleSubmit,
		control,
		setValue,
		reset,
    formState: { errors },
  } = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema)
	});
		
  const handleObject = (_selectedObject: string) => {
		const object = objects.find(object => {
			return object.id === _selectedObject
		})
		if (object){ 
			AccessibilityInfo
				.announceForAccessibility(`
					Você selecionou o ${object.name}. Arraste para baixo para configuração.
				`);
			console.log({object})
			setSelectedObject(object);
			setValue('color', object.color);
			setValue('shape', object.shape);
			const [rotationX, rotationY, rotationZ] = object.rotation
			setValue('rotationX', String(rotationX));
			setValue('rotationY', String(rotationY));
			setValue('rotationZ', String(rotationZ));

		}
  };

	useEffect(() => console.log('A ', selectedObject),[selectedObject])

	useFocusEffect(useCallback(() => {
		AccessibilityInfo
			.announceForAccessibility(`
				Você está na tela de configurações. 
				Abaixo do título "Configurações" existem opções de objetos dispostas horizontalmente que você pode selecionar para configurar.
			`);
	}, []));



	async function handleDB() {
		modalizeRef.current?.open()
		return
		// if (user){
		// 	console.log('USER' ,user);
		// 		try {
		// 			console.log('BEFORE REF')
		// 			const reference = database().ref(`/users/${user.id}`);
		// 			const a = await reference.set(user)
		// 			console.log({a, reference})
		// 		} catch (error) {
		// 			console.error('📚', error)
		// 		}

		// 	}
	}

	

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
		<Content>
		{isLoading ? <LoadingWithOverlay/>: null}
		<Header 
			title="Configurações" 
			iconAtEnd={
				<Icon name="log-out" onPress={handleLogout} accessibilityLabel="Botão de deslogar" />
			}
		/>
		<SegmentedButtonsContainer>
			<SegmentedButtons
				value={selectedObject?.id}
				onValueChange={handleObject}
				buttons={objects.map(_object => ({
					value: _object.id,
					label: _object.name
				}))}
			/>
		</SegmentedButtonsContainer>
		{selectedObject ? <Title>{ObjectLabelsMapper[selectedObject.id]}</Title> : null}
				<Divider style={{marginBottom: 24}} />
				<Controller
					control={control}
					name="color"
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer>
								<Subtitle>Cor em Hexadecimal</Subtitle>
								<InputHorizontalContainer>
									<Input 
										placeholder="Cor do Objeto" 
										onChangeText={onChange} 
										value={value} 
										onBlur={onBlur} 
									/>
									<ColorDisplay color={validateHexColor(value) ? value : undefined} />
								</InputHorizontalContainer>
								{errors['color']?.message ?
									<ErrorText >{errors['color']?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>

				<Subtitle>Forma do Objeto</Subtitle>
				<Controller
					control={control}
					name="shape"
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<RadioButton.Group onValueChange={onChange} value={value}>
								{options.map(_option => {
									return <RadioButton.Item key={_option.label} label={_option.label} value={_option.value} />
								})}
								{errors['shape']?.message ?
									<ErrorText >{errors['shape']?.message}</ErrorText> 
									:	null 
								}
							</RadioButton.Group>
						)
					}}
				/>

				<Controller
					control={control}
					name="rotationX"
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer >
								<Subtitle>Rotação em X</Subtitle>
								<Input placeholder="Rotação" onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors['rotationX']?.message ?
									<ErrorText >{errors['rotationX']?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>

				<Controller
					control={control}
					name="rotationY"
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer >
								<Subtitle>Rotação em Y</Subtitle>
								<Input placeholder="Rotação" onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors['rotationY']?.message ?
									<ErrorText >{errors['rotationY']?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>

				<Controller
					control={control}
					name="rotationZ"
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer >
								<Subtitle>Rotação em Z</Subtitle>
								<Input placeholder="Rotação" onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors['rotationZ']?.message ?
									<ErrorText >{errors['rotationZ']?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>

				<OptionButton onPress={handleSubmit(handleDB)} color={theme.colors.blue}>	
					<ButtonText color={theme.colors.white}>Salvar</ButtonText>
					<Icon name="send" color={theme.colors.white} />
				</OptionButton>
		<OptionButton onPress={handleDB}>	
			<ButtonText>DB</ButtonText>
		</OptionButton>
		</Content>
	</Container>
};
