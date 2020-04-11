import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {
  HelperText as PaperHelperText,
  TextInput as PaperTextInput,
} from 'react-native-paper';
import styled from 'styled-components/native';

const TextInput = ({
  keyboardType = 'default',
  secureTextEntry,
  onChangeText,
  value,
  error,
  onBlur,
  placeholder,
  testID,
}: {
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  onChangeText: (field: string) => any;
  value: string;
  error?: string;
  onBlur: (field: string) => any;
  placeholder: string;
  testID: string;
}) => {
  return (
    <>
      <StyledTextInput
        testID={testID}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        error={error}
        onBlur={onBlur}
      />
      <HelperText type="error">{error}</HelperText>
    </>
  );
};

export default TextInput;

const HelperText = styled(PaperHelperText)`
  padding-horizontal: 0px;
`;

const StyledTextInput = styled(PaperTextInput)`
  background-color: transparent;
  font-size: 18px;
  padding-horizontal: 0px;
`;
