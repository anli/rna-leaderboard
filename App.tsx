import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, PlayCreateScreen} from '@screens';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
