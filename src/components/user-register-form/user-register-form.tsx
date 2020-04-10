import {FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {View} from 'react-native';
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
  passwordConfirmation: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .email('This must be a valid email address'),
  password: Yup.string().required('Password is a required field'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const InnerForm = (props: UserFormProps & FormikProps<FormValues>) => {
  return (
    <>
      <Inputs
        handleChange={props.handleChange}
        values={props.values}
        errors={props.errors}
        handleBlur={props.handleBlur}
        configs={InputConfigs}
      />

      <SubmitButton
        disabled={props.isLoading}
        loading={props.isLoading}
        color="white"
        icon="arrow-right"
        onPress={props.handleSubmit}
        testID="register-button"
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
  right: 0px;
  width: 72px;
  height: 72px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 36px;
  background-color: pink;
`;

const HelperText = styled(PaperHelperText)`
  padding-horizontal: 0px;
`;

interface InputsProps {
  handleChange: (field: string) => any;
  handleBlur: (field: string) => any;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  configs: ConfigProps[];
}

interface ConfigProps {
  key: 'email' | 'password' | 'passwordConfirmation';
  placeholder?: string;
  keyboardType?: string;
  autoCompleteType?: string;
  secureTextEntry?: boolean;
  testID?: string;
}

const InputConfigs: ConfigProps[] = [
  {
    key: 'email',
    placeholder: 'Email Address',
    keyboardType: 'email-address',
    autoCompleteType: 'email',
    testID: 'email-input',
  },
  {
    key: 'password',
    placeholder: 'Password',
    secureTextEntry: true,
    testID: 'password-input',
  },
  {
    key: 'passwordConfirmation',
    placeholder: 'Password again',
    secureTextEntry: true,
    testID: 'password-confirmation-input',
  },
];

const Inputs = ({
  handleChange,
  values,
  errors,
  handleBlur,
  configs,
}: InputsProps) => (
  <>
    {configs.map(({key, ...props}) => (
      <View key={key}>
        <TextInput
          {...props}
          onChangeText={handleChange(key)}
          value={values[key]}
          error={errors[key]}
          onBlur={handleBlur(key)}
        />
        <HelperText type="error">{errors[key]}</HelperText>
      </View>
    ))}
  </>
);
