import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import LeaderboardScreen from './leaderboard';

const Stack = createStackNavigator();
const Screen = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen.Component}
        options={LeaderboardScreen.Options}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('Leaderboard Screen', () => {
  it('Given any, When I am at "Leaderboard Screen", Then I should see "Leaderboard"', () => {
    const component = render(<Screen />);
    expect(component.getByText('Leaderboard')).toBeDefined();
  });
});
