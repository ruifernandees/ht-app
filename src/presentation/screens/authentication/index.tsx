/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unsafe-assignment */
import React from 'react';
import {Text} from 'react-native';
import { Banner, LoginInput, MainContainer, Title } from './styles';
import {Controller, useForm} from 'react-hook-form'
import { inputs } from './data';
import { TouchableOpacity } from 'react-native';
import { IFieldValues } from './props';

export const AuthenticationScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<IFieldValues>();

	async function handleLogin(data: IFieldValues){ }

	return (
		<MainContainer>
			<Banner
				accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" 
			/>
			<Title>Seja bem-vindo(a)!</Title>
			{inputs.map(input => {
				return <Controller
					control={control}
					name={input.name as any}
					render={({ field: { onBlur, onChange, value } }) => {
						return <LoginInput 
							placeholder={input.placeholder}
							onChange={onChange}
							value={value}
							onBlur={onBlur}
						/>
					}}
				/>
			})}
			<TouchableOpacity  onPress={handleSubmit(handleLogin)} >

				<Text>Fazer Login</Text>
			</TouchableOpacity>
		</MainContainer>
	);
};
