import {UserLoginForm, UserRegisterForm} from '@components';
import {useUserForm} from '@utils';
import React, {useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import styled from 'styled-components/native';

const LoginScreen = () => {
  const props = useLoginScreen();
  return (
    <>
      <Screen testID="login-screen">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {props.isLoginTab && (
          <LoginTab onLogin={props.onLogin} isLoading={props.isLoading} />
        )}
        {props.isRegisterTab && (
          <RegisterTab
            onRegister={props.onRegister}
            isLoading={props.isLoading}
          />
        )}
        <Header
          onShowLogin={props.onShowLogin}
          isLoginTab={props.isLoginTab}
          onShowRegister={props.onShowRegister}
          isRegisterTab={props.isRegisterTab}
        />
      </Screen>
    </>
  );
};

export default LoginScreen;
type ProcessProps = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => any;

const LoginTab = ({
  onLogin,
  isLoading,
}: {
  onLogin: ProcessProps;
  isLoading: boolean;
}) => (
  <TabView testID="login-tab">
    <GreetingView>
      <TitleText>Welcome back,</TitleText>
    </GreetingView>

    <UserLoginForm onSubmit={onLogin} isLoading={isLoading} />
  </TabView>
);

const RegisterTab = ({
  onRegister,
  isLoading,
}: {
  onRegister: ProcessProps;
  isLoading: boolean;
}) => (
  <TabView testID="register-tab">
    <GreetingView>
      <TitleText>
        Hello <StrongText>Beautiful,</StrongText>
      </TitleText>
      <SubtitleText>
        Enter your information below{'\n'}
        or login with a social account
      </SubtitleText>
    </GreetingView>

    <UserRegisterForm onSubmit={onRegister} isLoading={isLoading} />
  </TabView>
);

const Header = ({
  onShowLogin,
  isLoginTab,
  onShowRegister,
  isRegisterTab,
}: {
  onShowLogin: () => any;
  isLoginTab: boolean;
  onShowRegister: () => any;
  isRegisterTab: boolean;
}) => (
  <HeaderView>
    <ButtonsView>
      <TabButton onPress={onShowLogin} testID="login-tab-button">
        <TabButtonText focused={isLoginTab}>Sign In</TabButtonText>
      </TabButton>
      <TabButton onPress={onShowRegister} testID="register-tab-button">
        <TabButtonText focused={isRegisterTab}>Sign Up</TabButtonText>
      </TabButton>
    </ButtonsView>
  </HeaderView>
);

const useTab = () => {
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const onShowLogin = () => setTab('LOGIN');
  const onShowRegister = () => setTab('REGISTER');
  const isLoginTab = tab === 'LOGIN';
  const isRegisterTab = tab === 'REGISTER';

  return {onShowLogin, onShowRegister, isLoginTab, isRegisterTab};
};

const useLoginScreen = () => {
  const {login$, isLoading, register$} = useUserForm();
  const {onShowLogin, onShowRegister, isLoginTab, isRegisterTab} = useTab();

  const onLogin = action('LOGIN', login$, register$);

  const onRegister = action('REGISTER', login$, register$);

  return {
    onLogin,
    onRegister,
    onShowLogin,
    onShowRegister,
    isLoginTab,
    isRegisterTab,
    isLoading,
  };
};

const TitleText = styled.Text`
  font-size: 36px;
  margin-bottom: 12px;
`;

const Screen = styled.View`
  background-color: white;
  flex: 1;
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
  border-bottom-width: ${({focused}) => (focused ? '2px' : '0px')};
  padding-bottom: 15px;
  padding-top: 15px;
`;

const TabView = styled.View`
  flex: 1;
  justify-content: center;
`;

const StrongText = styled.Text`
  font-weight: bold;
`;

const SubtitleText = styled.Text`
  font-size: 18px;
`;

const action = (
  type: 'LOGIN' | 'REGISTER',
  login$,
  register$,
) => async (values: {email: string; password: string}) => {
  const result =
    type === 'LOGIN'
      ? await login$(values.email, values.password)
      : await register$(values.email, values.password);

  if (!result.ok && result.error) {
    Alert.alert('Error', result.error);
  }
};
