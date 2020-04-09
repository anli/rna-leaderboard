import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

interface User {
  uid: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User>({uid: 'NULL'});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const onAuthStateChanged = (res: any) => {
      setUser(res);
      /* istanbul ignore next */
      setIsAuthenticated(res ? true : false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {user, isAuthenticated};
};

export default useAuth;
