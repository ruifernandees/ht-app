/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unsafe-assignment */
import React, { useRef, useState } from 'react';
import { Banner, ChevronRight, ErrorText, InputContainer, LoginInput, MainContainer, Title } from './styles';
import {Controller, useForm} from 'react-hook-form'
import { FormSchema, inputs } from './data';
import { AccessibilityInfo } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { IFieldValues } from './props';
import { Button } from '@/presentation/components/Button';
import { zodResolver } from '@hookform/resolvers/zod'
import auth from '@react-native-firebase/auth';
import { theme } from '@/global/theme';


export const AuthenticationScreen: React.FC = () => {
	const [generalError, setGeneralError] = useState<string>()

  const {
    handleSubmit,
		control,
		setError,
    formState: { errors },
  } = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema)
	});

	async function handleLogin(data: IFieldValues){ 
		console.log({data})

		try {
			const result = await auth().signInWithEmailAndPassword(data.email, data.password);
			const user = auth().currentUser;

		
			console.log(JSON.stringify(result, null ,2))
		} catch (error) {
			AccessibilityInfo.announceForAccessibility('Erro ao fazer login. Verifique seu e-mail e senha e tente novamente.');
			Snackbar.show({
				text: 'Erro! Verifique seu e-mail e senha e tente novamente.',
				duration: 3000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.red
			});
		}
	}

	return (
		<MainContainer>
			<Banner
				accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" 
			/>
			<Title>Seja bem-vindo(a)!</Title>
			{generalError ? 									<ErrorText >{generalError}</ErrorText>  : null}
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
								<LoginInput 
									{...input}
									onChangeText={onChange}
									value={value}
									onBlur={onBlur}
								/>
								{errors[inputName]?.message ?
									<ErrorText >{errors[inputName]?.message}</ErrorText> 
									:	null 
								}
							</InputContainer>
						)
					}}
				/>
			})}
			<Button.Root onPress={handleSubmit(handleLogin)} >
				<Button.Text>Fazer Login</Button.Text>
				<ChevronRight name="chevron-right" />
			</Button.Root>
		</MainContainer>
	);
};
