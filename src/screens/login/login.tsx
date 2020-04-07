import {UserForm} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useUserForm} from '@utils';
import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

const LoginScreen = () => {
  const {values, onChangeText, login$} = useUserForm();
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
      <View testID="login-screen">
        <Text>LoginScreen</Text>

        <UserForm values={values} onChangeText={onChangeText} />
        <TouchableOpacity onPress={onLogin} testID="login-button">
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRegister} testID="register-button">
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;
