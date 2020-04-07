import React from 'react';
import {TextInput} from 'react-native';

interface FormValues {
  email: string;
  password: string;
}

const UserForm = ({
  values,
  onChangeText,
}: {
  values: FormValues;
  onChangeText: (key: string, value: string, arrayProp?: 'participants') => any;
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

export default UserForm;
