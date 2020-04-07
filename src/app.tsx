import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoginScreen,
  PlayCreateScreen,
  PlayDetailScreen,
  PlayUpdateScreen,
} from '@screens';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="PlayCreateScreen" component={PlayCreateScreen} />
        <Stack.Screen name="PlayDetailScreen" component={PlayDetailScreen} />
        <Stack.Screen name="PlayUpdateScreen" component={PlayUpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const useAuth = () => {
  const [user, setUser] = useState<any>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const onAuthStateChanged = (res: any) => {
      setUser(res);
      setIsAuthenticated(res ? true : false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {user, isAuthenticated};
};
