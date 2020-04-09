import {FormikProps, withFormik} from 'formik';
import React from 'react';
import {
  FAB,
  HelperText as PaperHelperText,
  TextInput as PaperTextInput,
} from 'react-native-paper';
import styled from 'styled-components/native';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .email('This must be a valid email address'),
  password: Yup.string().required('Password is a required field'),
});

const InnerForm = (props: UserFormProps & FormikProps<FormValues>) => {
  const {
    values,
    handleChange,
    isLoading,
    handleSubmit,
    errors,
    handleBlur,
  } = props;
  return (
    <>
      <TextInput
        keyboardType="email-address"
        autoCompleteType="email"
        placeholder="Email Address"
        testID="email-input"
        onChangeText={handleChange('email')}
        value={values.email}
        error={errors.email}
        onBlur={handleBlur('email')}
      />
      <HelperText type="error">{errors.email}</HelperText>
      <TextInput
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        testID="password-input"
        onChangeText={handleChange('password')}
        value={values.password}
        error={errors.password}
        onBlur={handleBlur('password')}
      />
      <HelperText type="error">{errors.password}</HelperText>

      <SubmitButton
        disabled={isLoading}
        loading={isLoading}
        color="white"
        icon="arrow-right"
        onPress={handleSubmit}
        testID="login-button"
      />
    </>
  );
};

interface UserFormProps {
  onSubmit: (values: FormValues) => any;
  isLoading: boolean;
}

const UserForm = withFormik<UserFormProps, FormValues>({
  validationSchema,
  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerForm);

export default UserForm;

const TextInput = styled(PaperTextInput)`
  background-color: transparent;
  font-size: 18px;
  padding-horizontal: 0px;
`;

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

const HelperText = styled(PaperHelperText)`
  padding-horizontal: 0px;
`;
