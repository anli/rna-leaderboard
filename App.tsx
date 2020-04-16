import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LeaderboardScreen} from '@screens';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Stack = createStackNavigator();

const LeaderboardStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LeaderboardScreen"
      component={LeaderboardScreen.Component}
      options={LeaderboardScreen.Options}
    />
  </Stack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="LeaderboardTab"
      labeled={false}
      activeColor="#000"
      barStyle={WHITE_BACKGROUND_STYLE}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => <Icon name="poll" color={color} size={24} />,
        }}
        name="LeaderboardTab"
        component={LeaderboardStackScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;

const Icon = styled(RNIcon)`
  bottom: -8px;
`;

const WHITE_BACKGROUND_STYLE = {backgroundColor: '#fff'};
