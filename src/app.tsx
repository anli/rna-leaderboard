import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoginScreen,
  OnboardingScreen,
  PlayCreateScreen,
  PlayDetailScreen,
  PlayUpdateScreen,
} from '@screens';
import {useAuth} from '@utils';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

const AuthenticatedStacks = () => (
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
);

const UnauthenticatedStacks = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const OnboardingStacks = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="OnboardingScreen"
      component={OnboardingScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const App = () => {
  const {isAuthenticated, user: authUser} = useAuth();

  const {data: user} = useUser(authUser?.uid);

  switch (true) {
    case !isAuthenticated:
      return (
        <NavigationContainer>
          <UnauthenticatedStacks />
        </NavigationContainer>
      );
    case !(user && user.isOnboarded):
      return (
        <NavigationContainer>
          <OnboardingStacks />
        </NavigationContainer>
      );
    default:
      return (
        <NavigationContainer>
          <AuthenticatedStacks />
        </NavigationContainer>
      );
  }
};
export default () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

export interface User {
  id: string;
  name?: string;
  isOnboarded: boolean;
}

const useUser = (id?: string) => {
  const [data, setData] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const unsubscribe = firestore()
        .doc(`users/${id}`)
        .onSnapshot(documentSnapshot => {
          const mappedData: User = {
            id: documentSnapshot.id,
            name: documentSnapshot.data()?.name,
            isOnboarded: documentSnapshot.data()?.isOnboarded || false,
          };

          setData(mappedData);
        });

      return unsubscribe;
    } else {
      setData(undefined);
    }
  }, [id]);

  return {data};
};
