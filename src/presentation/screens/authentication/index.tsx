/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AccessibilityInfo, Keyboard } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Banner,
  ChevronRight,
  ErrorText,
  InputContainer,
  LoadingOverlayContainer,
  LoginInput,
  MainContainer,
  Title,
} from './styles';
import { FormSchema, inputs } from './data';

import { type IFieldValues } from './props';
import { Button } from '@/presentation/components/Button';
import { theme } from '@/global/theme';
import { authenticateUserUseCase } from '@/main/usecases/authenticateUserUseCase';

import PaperPlane from '@/assets/animations/paper.json';
import { useAuthenticationStore } from '@/presentation/stores/authentication';

export const AuthenticationScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const animation = useRef<LottieView>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFieldValues>({
    resolver: zodResolver(FormSchema),
  });

  const { setUser } = useAuthenticationStore();

  async function handleLogin(data: IFieldValues) {
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      const user = await authenticateUserUseCase.execute(data);
      AccessibilityInfo.announceForAccessibility(
        `Seja bem-vindo(a) ${user.name}`
      );
      setUser(user);
    } catch (error) {
      AccessibilityInfo.announceForAccessibility(
        'Erro ao fazer login. Verifique seu e-mail e senha e tente novamente.'
      );
      Snackbar.show({
        text: 'Erro! Verifique seu e-mail e senha e tente novamente.',
        duration: 3000,
        textColor: theme.colors.white,
        fontFamily: theme.typography.fontFamily.inter.bold,
        backgroundColor: theme.colors.red,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );

  return (
    <MainContainer>
      <Banner accessibilityLabel="Imagem de duas pessoas se comunicando em LIBRAS" />
      {isLoading ? (
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
      ) : null}

      <Title>Seja bem-vindo(a)!</Title>
      {inputs.map(({ name, ...input }) => {
        const inputName = name as keyof IFieldValues;
        return (
          <Controller
            control={control}
            name={inputName}
            key={inputName}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputContainer key={inputName}>
                <LoginInput
                  {...input}
                  onChangeText={onChange}
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
      <Button.Root onPress={handleSubmit(handleLogin)}>
        <Button.Text>Fazer Login</Button.Text>
        <ChevronRight name="chevron-right" />
      </Button.Root>
    </MainContainer>
  );
};
