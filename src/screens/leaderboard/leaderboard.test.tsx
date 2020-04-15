import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import LeaderboardScreen from './leaderboard';

describe('Leaderboard Screen', () => {
  it('Given any, When I am at "Leaderboard Screen", Then I should see "Leaderboard Screen"', () => {
    const component = render(<LeaderboardScreen />);
    expect(component.getByText('LeaderboardScreen')).toBeDefined();
  });
});
