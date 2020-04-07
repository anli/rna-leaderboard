import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';

const LoginScreen = () => {
  const {values, onChangeText, login$} = useLoginScreen();

  const onLogin = async () => {
    const result = await login$(values.email, values.password);

    if (!result.ok && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <>
      <View testID="login-screen">
        <Text>LoginScreen</Text>

        <LoginForm values={values} onChangeText={onChangeText} />
        <TouchableOpacity onPress={onLogin} testID="login-button">
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = ({
  values,
  onChangeText,
}: {
  values: FormValues;
  onChangeText: (key: string, value: string) => any;
}) => {
  return (
    <>
      <TextInput
        placeholder="Email"
        testID="email-input"
        onChangeText={data => onChangeText('email', data)}
        value={values.email}
      />
      <TextInput
        placeholder="Password"
        testID="password-input"
        onChangeText={data => onChangeText('password', data)}
        value={values.password}
      />
    </>
  );
};

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

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

type onChangeTextProps = (
  key: string,
  value: string,
  arrayProp?: 'participants',
) => any;
