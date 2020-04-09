import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

interface FormValues {
  email: string;
  password: string;
}

const useUserForm = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const login$ = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      setIsLoading(false);
      return {
        ok: true,
      };
    } catch (error) {
      setIsLoading(false);
      return {ok: false, error: error.message};
    }
  };

  return {values, onChangeText, register$, login$, isLoading};
};

type onChangeTextProps = (key: string, value: string) => any;

export default useUserForm;
