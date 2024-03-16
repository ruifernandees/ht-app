/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unsafe-assignment */
import React from 'react';
import { Banner, ChevronRight, ErrorText, InputContainer, LoginInput, MainContainer, Title } from './styles';
import {Controller, useForm} from 'react-hook-form'
import { FormSchema, inputs } from './data';

import { IFieldValues } from './props';
import { Button } from '@/presentation/components/Button';
import { zodResolver } from '@hookform/resolvers/zod'

export const AuthenticationScreen: React.FC = () => {
  const {
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema)
	});

	async function handleLogin(data: IFieldValues){ 
		console.log({data})
	}

	return (
		<MainContainer>
			<Banner
				accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" 
			/>
			<Title>Seja bem-vindo(a)!</Title>
			{inputs.map(input => {
				const inputName = input.name as keyof IFieldValues;
				console.log({inputName})
				return <Controller
					control={control}
					name={inputName}
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<InputContainer key={input.name}>
								<LoginInput 
									placeholder={input.placeholder}
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
