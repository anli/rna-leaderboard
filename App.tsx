import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  PlayCreateScreen,
  PlayDetailScreen,
  PlayUpdateScreen,
} from '@screens';
import React from 'react';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
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
