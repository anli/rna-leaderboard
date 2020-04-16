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

  it('Given any, When I am at "Leaderboard Screen", Then I should see "Filters"', () => {
    const component = render(<Screen />);
    expect(component.getByText('Scythe')).toBeDefined();
    expect(component.getByText('Agricola')).toBeDefined();
    expect(component.getByText('Clank!')).toBeDefined();
  });

  it('Given any, When I am at "Leaderboard Screen", Then I should see "Players Rank List"', () => {
    const component = render(<Screen />);
    expect(component.getByText('1')).toBeDefined();
    expect(component.getByText('John')).toBeDefined();
    expect(component.getByText('40 Wins 10 Losses')).toBeDefined();

    expect(component.getByText('2')).toBeDefined();
    expect(component.getByText('Mary')).toBeDefined();
    expect(component.getByText('10 Wins 2 Losses')).toBeDefined();

    expect(component.getByText('1')).toBeDefined();
    expect(component.getByText('Jane')).toBeDefined();
    expect(component.getByText('50 Wins 20 Losses')).toBeDefined();
  });
});
