import {InputConfigProps, TextInput} from '@utils';
import {FormikProps, withFormik} from 'formik';
import React from 'react';
import {FAB} from 'react-native-paper';
import styled from 'styled-components/native';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const InnerForm = (props: UserFormProps & FormikProps<FormValues>) => (
  <>
    {inputConfigs.map(
      ({key, placeholder, keyboardType, secureTextEntry = false, testID}) => (
        <TextInput
          key={key}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          testID={testID}
          onChangeText={props.handleChange(key)}
          value={props.values[key]}
          error={props.errors[key]}
          onBlur={props.handleBlur(key)}
        />
      ),
    )}
    <SubmitButton
      disabled={props.isLoading}
      loading={props.isLoading}
      color="white"
      icon="arrow-right"
      onPress={props.handleSubmit}
      testID="login-button"
    />
  </>
);

interface UserFormProps {
  onSubmit: (values: FormValues) => any;
  isLoading: boolean;
}

const UserForm = withFormik<UserFormProps, FormValues>({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .email('This must be a valid email address'),
    password: Yup.string().required('Password is a required field'),
  }),
  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerForm);

export default UserForm;

const SubmitButton = styled(FAB)`
  position: absolute;
  bottom: 0px;
  margin-bottom: 36px;
  right: 0px;
  width: 72px;
  height: 72px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const inputConfigs: InputConfigProps<FormValues>[] = [
  {
    key: 'email',
    placeholder: 'Email Address',
    keyboardType: 'email-address',
    testID: 'email-input',
  },
  {
    key: 'password',
    placeholder: 'Password',
    secureTextEntry: true,
    testID: 'password-input',
  },
];
