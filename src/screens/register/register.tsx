import {UserForm} from '@components';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RegisterScreen = () => {
  const {values, onChangeText, register$} = useRegisterScreen();

  const onRegister = async () => {
    const result = await register$(values.email, values.password);

    if (!result.ok && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <>
      <View testID="register-screen">
        <Text>RegisterScreen</Text>

        <UserForm values={values} onChangeText={onChangeText} />
        <TouchableOpacity onPress={onRegister} testID="register-button">
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterScreen;

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

interface FormValues {
  email: string;
  password: string;
}

const useRegisterScreen = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);

  const onChangeText: onChangeTextProps = (key: string, value: string) => {
    return setValues({...values, [key]: value});
  };

  const register$ = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      return {
        ok: true,
      };
    } catch (error) {
      return {ok: false, error: error.message};
    }
  };

  return {values, onChangeText, register$};
};

type onChangeTextProps = (key: string, value: string) => any;
