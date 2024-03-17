/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unsafe-assignment */
import React, { useRef, useState } from 'react';
import { Banner, ChevronRight, ErrorText, InputContainer, LoadingOverlayContainer, LoginInput, MainContainer, Title } from './styles';
import {Controller, useForm} from 'react-hook-form'
import { FormSchema, inputs } from './data';
import { AccessibilityInfo } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { IFieldValues } from './props';
import { Button } from '@/presentation/components/Button';
import { zodResolver } from '@hookform/resolvers/zod'
import auth from '@react-native-firebase/auth';
import { theme } from '@/global/theme';
import { authenticateUserUseCase } from '@/main/usecases/authenticateUserUseCase';
import LottieView from 'lottie-react-native';

import PaperPlane from '@/assets/animations/paper.json';
import { useAuthenticationStore } from '@/presentation/stores/authentication';
import { useNavigation } from '@react-navigation/native';
import { EAppStackRoutes } from '@/main/routes/mappers/EAppStackRoutes';


export const AuthenticationScreen: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const animation = useRef<LottieView>(null);


  const {
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema)
	});

	const { setUser } = useAuthenticationStore();

	async function handleLogin(data: IFieldValues){ 
		console.log({data})

		setIsLoading(true);
		try {
			const user = await authenticateUserUseCase.execute(data);
			console.log(JSON.stringify(user, null ,2))
			setUser(user);

		} catch (error) {
			AccessibilityInfo
				.announceForAccessibility('Erro ao fazer login. Verifique seu e-mail e senha e tente novamente.');
			Snackbar.show({
				text: 'Erro! Verifique seu e-mail e senha e tente novamente.',
				duration: 3000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.red
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<MainContainer>
			<Banner
				accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" 
			/>
			{
				isLoading ?
					<LoadingOverlayContainer>
						<LottieView
							autoPlay
							ref={animation}
							loop	
							style={{
								width: 400,
								height: 400,
							}}
							source={PaperPlane}
						/>
					</LoadingOverlayContainer>
				:null
			}
			
			<Title>Seja bem-vindo(a)!</Title>
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
