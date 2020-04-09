import React from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';
import styled from 'styled-components/native';

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
        keyboardType="email-address"
        autoCompleteType="email"
        placeholder="Email Address"
        testID="email-input"
        onChangeText={(data: string) => onChangeText('email', data)}
        value={values.email}
      />
      <TextInput
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        testID="password-input"
        onChangeText={(data: string) => onChangeText('password', data)}
        value={values.password}
      />
    </>
  );
};

export default UserForm;

const TextInput = styled(PaperTextInput)`
  background-color: transparent;
  font-size: 18px;
  padding-horizontal: 0px;
  margin-bottom: 12px;
`;
