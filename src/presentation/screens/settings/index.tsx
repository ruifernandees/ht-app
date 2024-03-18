import React, { useState } from 'react';
import { ButtonText, Container, ErrorText, Icon, Input, InputContainer, OptionButton,  } from './styles';
import { Header } from '@/presentation/components/Header';
import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { AccessibilityInfo } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Snackbar from 'react-native-snackbar';
import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';
import { FormSchema, inputs, options } from './data';
import { IFieldValues } from './props';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const SettingsScreen: React.FC = () => {
	const { user, logout } = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
  const [items, setItems] = useState(options);

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
		<Header title="Configurações" />
		{isLoading ? <LoadingWithOverlay/>: null}
		<Controller
			control={control}
			name="shape1"
			render={({ field: { onBlur, onChange, value } }) => {
				return <DropDownPicker
					open={open1}
					value={value}
					items={items}
					setOpen={setOpen1}
					setValue={onChange}
					setItems={setItems}
				/>
			}}
		/>
		<Controller
			control={control}
			name="shape2"
			render={({ field: { onBlur, onChange, value } }) => {
				return <DropDownPicker
					open={open2}
					value={value}
					items={items}
					setOpen={setOpen2}
					setValue={onChange}
					setItems={setItems}
				/>
			}}
		/>
		<Controller
			control={control}
			name="shape3"
			render={({ field: { onBlur, onChange, value } }) => {
				return <DropDownPicker
					open={open3}
					value={value}
					items={items}
					setOpen={setOpen3}
					setValue={onChange}
					setItems={setItems}
				/>
			}}
		/>
			{inputs.map(({name, ...input})=> {
				const inputName = name as keyof IFieldValues;
				console.log({inputName})
				return <Controller
					control={control}
					name={inputName}
					key={inputName}
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer key={inputName}>
								<Input 
									{...input}
									onChangeText={onChange}
									value={value}
									onBlur={onBlur}
								/>
								{errors[inputName]?.message ?
									<ErrorText>{errors[inputName]?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>
			})}
		<OptionButton onPress={handleLogout} color={theme.colors.blue}>	
			<ButtonText color={theme.colors.white}>Salvar alterações</ButtonText>
			<Icon name="chevron-right" color={theme.colors.white} />
		</OptionButton>
		<OptionButton onPress={handleLogout}>	
			<ButtonText>Sair</ButtonText>
			<Icon name="log-out" />
		</OptionButton>
	</Container>
};
