import React, {useCallback, useEffect, useState} from 'react';
import {
	ButtonText, ColorDisplay, Container, Content, ErrorText, Icon, Input, InputContainer, InputHorizontalContainer, OptionButton, SegmentedButtonsContainer, Subtitle, Title,
} from './styles';
import {Header} from '@/presentation/components/Header';

import {useAuthenticationStore} from '@/presentation/stores/authentication';
import {AccessibilityInfo} from 'react-native';

import Snackbar from 'react-native-snackbar';
import {theme} from '@/global/theme';
import {LoadingWithOverlay} from '@/presentation/components/LoadingWithOverlay';
import {
	FormSchema, ObjectLabelsMapper, inputs, options,
} from './data';
import {type IFieldValues} from './props';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Divider, RadioButton, SegmentedButtons} from 'react-native-paper';
import {useObjectsStore} from '@/presentation/stores/objects';
import {type ShapeObject} from '@/domain/entities/ShapeObject';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {validateHexColor} from '@/global/helpers/validateHexColor';
import {EAppBottomTabRoutes} from '@/main/routes/mappers/EAppBottomTabRoutes';

export const SettingsScreen: React.FC = () => {
	const {user, logout} = useAuthenticationStore();
	const [isLoading, setIsLoading] = useState(false);

	const {objects, setObject} = useObjectsStore();
	const [selectedObject, setSelectedObject] = useState<ShapeObject>(objects[0]);
	const {
		handleSubmit,
		control,
		setValue,
		reset,
		formState: {errors},
	} = useForm<IFieldValues>({
		resolver: zodResolver(FormSchema),
	});

	const {navigate} = useNavigation();

	const fillFormByObject = (object: ShapeObject) => {
		setValue('color', object.color);
		setValue('shape', object.shape);
		const [rotationX, rotationY, rotationZ] = object.rotation;
		setValue('rotationX', String(rotationX));
		setValue('rotationY', String(rotationY));
		setValue('rotationZ', String(rotationZ));
	};

	const handleObject = (_selectedObject: string) => {
		const object = objects.find(object => object.id === _selectedObject);
		if (!object) {
			return;
		}

		AccessibilityInfo
			.announceForAccessibility(`
				Você selecionou o ${object.name}. Arraste para baixo para configuração.
			`);
		console.log({object});
		setSelectedObject(object);
	};

	useEffect(() => {
		fillFormByObject(selectedObject);
	}, [selectedObject]);

	useFocusEffect(useCallback(() => {
		console.log('A');
		setTimeout(() => {
			AccessibilityInfo
				.announceForAccessibility(`
					Você está na tela de configurações. 
					Abaixo do título "Configurações" existem opções de objetos dispostas horizontalmente que você pode selecionar para configurar.
					Você pode rolar a página e, ao final, terá o botão para salvar as alterações.
				`);
		}, 3000);
	}, []));

	async function handleObjectConfig(data: IFieldValues) {
		if (!selectedObject || !user) {
			return;
		}

		setIsLoading(true);
		try {
			await setObject({
				...selectedObject,
				color: data.color,
				rotation: [Number(data.rotationX), Number(data.rotationY), Number(data.rotationZ)],
				shape: data.shape,
			}, user);
			const message = `${selectedObject.name} atualizado com sucesso!`;
			setTimeout(() => {
				AccessibilityInfo
					.announceForAccessibility(`${message} Você foi redirecionado para a tela de renderização dos objetos.`);
			}, 2000);
			Snackbar.show({
				text: message,
				duration: 5000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.darkGreen,
			});
			navigate(EAppBottomTabRoutes.Home as never);
		} catch (error) {
			const message = 'Erro ao atualizar o objeto';
			AccessibilityInfo.announceForAccessibility(message);
			Snackbar.show({
				text: message,
				duration: 5000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.red,
			});
			console.error('📚', error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleLogout() {
		setIsLoading(true);
		try {
			await logout();

			const message = `Até mais, ${user?.name}!`;
			AccessibilityInfo
				.announceForAccessibility(message);
			Snackbar.show({
				text: message,
				duration: 5000,
				textColor: theme.colors.white,
				fontFamily: theme.typography.fontFamily.inter.bold,
				backgroundColor: theme.colors.darkBlue,
			});
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(true);
		}
	}

	useEffect(() => {
		let message = ' ';
		Object.entries(errors).map(([key, value]) => {
			const _errors = errors as Record<string, {message: string}>;
			if (_errors[key]?.message) {
				message += _errors[key].message + '. ';
			}
		});
		console.log(message);
		if (message) {
			setTimeout(() => {
				AccessibilityInfo
					.announceForAccessibility(`O formulário retornou os seguintes erros: ${message}`);
			}, 2000);
		}
	}, [errors]);

	return <Container>
		{isLoading ? <LoadingWithOverlay/> : null}
		<Content>
			<Header
				title='Configurações'
				iconAtEnd={
					<Icon name='log-out' onPress={handleLogout} accessibilityLabel='Botão de deslogar' />
				}
			/>
			<SegmentedButtonsContainer>
				<SegmentedButtons
					value={selectedObject?.id}
					onValueChange={handleObject}
					buttons={objects.map(_object => ({
						value: _object.id,
						label: _object.name,
					}))}
				/>
			</SegmentedButtonsContainer>
			{selectedObject
				? <>
					<Title>{ObjectLabelsMapper[selectedObject.id]}</Title>
					<Divider style={{marginBottom: 24}} />
					<Controller
						control={control}
						name='color'
						render={({field: {onBlur, onChange, value}}) => (
							<InputContainer>
								<Subtitle>Cor em Hexadecimal</Subtitle>
								<InputHorizontalContainer>
									<Input
										placeholder='Cor do Objeto'
										accessibilityHint='Informe a cor em hexadecimal com um cerquilha no começo'
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
									/>
									<ColorDisplay color={validateHexColor(value) ? value : undefined} />
								</InputHorizontalContainer>
								{errors.color?.message
									? <ErrorText >{errors.color?.message}</ErrorText>
									:	null
								}
							</InputContainer>
						)}
					/>

					<Subtitle>Forma do Objeto</Subtitle>
					<Controller
						control={control}
						name='shape'
						render={({field: {onBlur, onChange, value}}) => (
							<RadioButton.Group onValueChange={onChange} value={value}>
								{options.map(_option => <RadioButton.Item key={_option.label} label={_option.label} value={_option.value} />)}
								{errors.shape?.message
									? <ErrorText >{errors.shape?.message}</ErrorText>
									:	null
								}
							</RadioButton.Group>
						)}
					/>

					<Controller
						control={control}
						name='rotationX'
						render={({field: {onBlur, onChange, value}}) => (
							<InputContainer >
								<Subtitle>Rotação em X</Subtitle>
								<Input placeholder='Rotação em X' onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors.rotationX?.message
									? <ErrorText >{errors.rotationX?.message}</ErrorText>
									:	null
								}
							</InputContainer>
						)}
					/>

					<Controller
						control={control}
						name='rotationY'
						render={({field: {onBlur, onChange, value}}) => (
							<InputContainer >
								<Subtitle>Rotação em Y</Subtitle>
								<Input placeholder='Rotação em Y' onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors.rotationY?.message
									? <ErrorText >{errors.rotationY?.message}</ErrorText>
									:	null
								}
							</InputContainer>
						)}
					/>

					<Controller
						control={control}
						name='rotationZ'
						render={({field: {onBlur, onChange, value}}) => (
							<InputContainer >
								<Subtitle>Rotação em Z</Subtitle>
								<Input placeholder='Rotação em Z' onChangeText={onChange} value={value} onBlur={onBlur} />
								{errors.rotationZ?.message
									? <ErrorText >{errors.rotationZ?.message}</ErrorText>
									:	null
								}
							</InputContainer>
						)}
					/>

					<OptionButton onPress={handleSubmit(handleObjectConfig)} color={theme.colors.blue}>
						<ButtonText color={theme.colors.white}>Salvar</ButtonText>
						<Icon name='send' color={theme.colors.white} />
					</OptionButton>
				</> : null}
		</Content>
	</Container>;
};
