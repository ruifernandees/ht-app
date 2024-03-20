/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioButton, SegmentedButtons } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  ButtonText,
  ColorDisplay,
  Container,
  Content,
  ErrorText,
  Icon,
  Input,
  InputContainer,
  InputHorizontalContainer,
  OptionButton,
  SegmentedButtonsContainer,
  Subtitle,
  Title,
  Divider,
} from './styles';
import { Header } from '@/presentation/components/Header';

import { useAuthenticationStore } from '@/presentation/stores/authentication';

import { theme } from '@/global/theme';
import { LoadingWithOverlay } from '@/presentation/components/LoadingWithOverlay';
import { FormSchema, ObjectLabelsMapper, inputs, options } from './data';
import { type IFieldValues } from './props';
import { useObjectsStore } from '@/presentation/stores/objects';
import { type ShapeObject } from '@/domain/entities/ShapeObject';
import { validateHexColor } from '@/global/helpers/validateHexColor';
import { EAppBottomTabRoutes } from '@/main/routes/mappers/EAppBottomTabRoutes';

export const SettingsScreen: React.FC = () => {
  const { user, logout } = useAuthenticationStore();
  const [isLoading, setIsLoading] = useState(false);

  const { objects, setObject } = useObjectsStore();
  const [selectedObject, setSelectedObject] = useState<ShapeObject>(objects[0]);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFieldValues>({
    resolver: zodResolver(FormSchema),
  });

  const { navigate } = useNavigation();

  const fillFormByObject = (object: ShapeObject) => {
    setValue('color', object.color);
    setValue('shape', object.shape);
    const [rotationX, rotationY, rotationZ] = object.rotation;
    setValue('rotationX', String(rotationX));
    setValue('rotationY', String(rotationY));
    setValue('rotationZ', String(rotationZ));
  };

  const handleObject = (_selectedObject: string) => {
    const object = objects.find((_object) => _object.id === _selectedObject);
    if (!object) {
      return;
    }

    AccessibilityInfo.announceForAccessibility(`
				Você selecionou o ${object.name}. Arraste para baixo para configuração.
			`);
    setSelectedObject(object);
  };

  useEffect(() => {
    fillFormByObject(selectedObject);
  }, [selectedObject]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility(`
					Você está na tela de configurações. 
					Abaixo do título "Configurações" existem opções de objetos dispostas horizontalmente que você pode selecionar para configurar.
					Você pode rolar a página e, ao final, terá o botão para salvar as alterações.
				`);
      }, 3000);
    }, [])
  );

  async function handleObjectConfig(data: IFieldValues) {
    if (!selectedObject || !user) {
      return;
    }

    setIsLoading(true);
    try {
      await setObject(
        {
          ...selectedObject,
          color: data.color,
          rotation: [
            Number(data.rotationX),
            Number(data.rotationY),
            Number(data.rotationZ),
          ],
          shape: data.shape,
        },
        user
      );
      const message = `${selectedObject.name} atualizado com sucesso!`;
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility(
          `${message} Você foi redirecionado para a tela de renderização dos objetos.`
        );
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
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    setIsLoading(true);
    try {
      await logout();

      const message = `Até mais, ${user?.name}!`;
      AccessibilityInfo.announceForAccessibility(message);
      Snackbar.show({
        text: message,
        duration: 5000,
        textColor: theme.colors.white,
        fontFamily: theme.typography.fontFamily.inter.bold,
        backgroundColor: theme.colors.darkBlue,
      });
    } finally {
      setIsLoading(true);
    }
  }

  useEffect(() => {
    let message = '';
    Object.entries(errors).forEach(([key]) => {
      const _errors = errors as Record<string, { message: string }>;
      if (_errors[key]?.message) {
        message += `${_errors[key].message  }. `;
      }
    });
    if (message) {
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility(
          `O formulário retornou os seguintes erros: ${message}`
        );
      }, 2000);
    }
  }, [errors]);

  return (
    <Container>
      {isLoading ? <LoadingWithOverlay /> : null}
      <Content>
        <Header
          title="Configurações"
          iconAtEnd={
            <Icon
              name="log-out"
              onPress={handleLogout}
              accessibilityLabel="Botão de deslogar"
            />
          }
        />
        <SegmentedButtonsContainer>
          <SegmentedButtons
            value={selectedObject?.id}
            onValueChange={handleObject}
            buttons={objects.map((_object) => ({
              value: _object.id,
              label: _object.name,
            }))}
          />
        </SegmentedButtonsContainer>
        {selectedObject ? (
          <>
            <Title>{ObjectLabelsMapper[selectedObject.id]}</Title>
            <Divider />
            <Controller
              control={control}
              name="color"
              render={({ field: { onBlur, onChange, value } }) => (
                <InputContainer>
                  <Subtitle>Cor em Hexadecimal</Subtitle>
                  <InputHorizontalContainer>
                    <Input
                      placeholder="Cor do Objeto"
                      accessibilityHint="Informe a cor em hexadecimal com um cerquilha no começo"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                    <ColorDisplay
                      color={validateHexColor(value) ? value : undefined}
                    />
                  </InputHorizontalContainer>
                  {errors.color?.message ? (
                    <ErrorText>{errors.color?.message}</ErrorText>
                  ) : null}
                </InputContainer>
              )}
            />

            <Subtitle>Forma do Objeto</Subtitle>
            <Controller
              control={control}
              name="shape"
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  {options.map((_option) => (
                    <RadioButton.Item
                      key={_option.label}
                      label={_option.label}
                      value={_option.value}
                    />
                  ))}
                  {errors.shape?.message ? (
                    <ErrorText>{errors.shape?.message}</ErrorText>
                  ) : null}
                </RadioButton.Group>
              )}
            />

            {inputs.map(({ name, ...input }) => {
              const inputName = name as keyof IFieldValues;
              return (
                <Controller
                  control={control}
                  name={inputName}
                  key={inputName}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <InputContainer>
                      <Subtitle>{input.placeholder}</Subtitle>
                      <Input
                        {...input}
                        onChangeText={(_value) => {
                          onChange(_value.replace(/\s+/g, '').replace(',', '.'));
                        }}
                        value={value}
                        onBlur={onBlur}
                      />
                      {errors[inputName]?.message ? (
                        <ErrorText>{errors[inputName]?.message}</ErrorText>
                      ) : null}
                    </InputContainer>
                  )}
                />
              );
            })}
            <OptionButton
              onPress={handleSubmit(handleObjectConfig)}
              color={theme.colors.blue}
            >
              <ButtonText color={theme.colors.white}>Salvar</ButtonText>
              <Icon name="send" color={theme.colors.white} />
            </OptionButton>
          </>
        ) : null}
      </Content>
    </Container>
  );
};
