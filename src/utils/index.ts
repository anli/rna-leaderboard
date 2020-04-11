import {KeyboardTypeOptions} from 'react-native';
export {default as TextInput} from './text-input';
export {default as useAuth} from './use-auth';
export {default as useUserForm} from './use-user-form';
export interface InputConfigProps<T> {
  key: keyof T;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  testID: string;
}
