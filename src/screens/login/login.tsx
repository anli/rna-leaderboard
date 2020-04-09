import {UserForm} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useUserForm} from '@utils';
import React from 'react';
import {Alert, StatusBar} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {FAB} from 'react-native-paper';
import styled from 'styled-components/native';

const LoginScreen = () => {
  const {values, onChangeText, login$, isLoading} = useUserForm();
  const {navigate} = useNavigation();

  const onLogin = async () => {
    const result = await login$(values.email, values.password);

    if (!result.ok && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  const onRegister = () => {
    navigate('RegisterScreen');
  };

  return (
    <>
      <Screen testID="login-screen">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <HeaderView>
          <ButtonsView>
            <TabButton onPress={onLogin} testID="tab-login-button">
              <TabButtonText focused>Sign In</TabButtonText>
            </TabButton>
            <TabButton onPress={onRegister} testID="register-button">
              <TabButtonText>Sign Up</TabButtonText>
            </TabButton>
          </ButtonsView>
        </HeaderView>
        <GreetingView>
          <GreetingText>Welcome back,</GreetingText>
        </GreetingView>

        <UserForm values={values} onChangeText={onChangeText} />

        <LoginButton
          disabled={isLoading}
          loading={isLoading}
          color="white"
          icon="arrow-right"
          onPress={onLogin}
          testID="login-button"
        />
      </Screen>
    </>
  );
};

export default LoginScreen;

const GreetingText = styled.Text`
  font-size: 36px;
`;

const Screen = styled.View`
  background-color: white;
  flex: 1;
  justify-content: center;
  padding-left: 36px;
  padding-right: 36px;
`;

const GreetingView = styled(HideWithKeyboard)`
  padding-bottom: 72px;
`;

const HeaderView = styled.View`
  height: 81px;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 36px;
`;

const ButtonsView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const TabButton = styled.TouchableOpacity`
  padding-left: 15px;
  padding-right: 15px;
`;

const TabButtonText = styled.Text<{focused?: boolean}>`
  font-size: 15px;
  font-weight: ${({focused}) => (focused ? 'bold' : 'normal')};
  border-bottom-width: ${({focused}) => (focused ? '1px' : '0px')};
  padding-bottom: 15px;
  padding-top: 15px;
`;

const LoginButton = styled(FAB)`
  position: absolute;
  bottom: 0px;
  margin: 36px;
  right: 0px;
  width: 72px;
  height: 72px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
