import auth from '@react-native-firebase/auth';
import {useState} from 'react';

interface FormValues {
  email: string;
  password: string;
}

const useUserForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return {register$, login$, isLoading};
};

export default useUserForm;
