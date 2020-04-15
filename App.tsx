import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LeaderboardScreen} from '@screens';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LeaderboardScreen"
            component={LeaderboardScreen.Component}
            options={LeaderboardScreen.Options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
