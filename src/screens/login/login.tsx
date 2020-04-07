import {UserForm} from '@components';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

const LoginScreen = () => {
  const {values, onChangeText, login$} = useLoginScreen();
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

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

interface FormValues {
  email: string;
  password: string;
}

const useLoginScreen = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);

  const onChangeText: onChangeTextProps = (key: string, value: string) => {
    return setValues({...values, [key]: value});
  };

  const login$ = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return {
        ok: true,
      };
    } catch (error) {
      return {ok: false, error: error.message};
    }
  };

  return {values, onChangeText, login$};
};

type onChangeTextProps = (key: string, value: string) => any;
