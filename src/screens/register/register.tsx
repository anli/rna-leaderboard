import {UserForm} from '@components';
import {useUserForm} from '@utils';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RegisterScreen = () => {
  const {values, onChangeText, register$} = useUserForm();

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
