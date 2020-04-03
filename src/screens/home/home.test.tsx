import {Play} from '@tests/models';
import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import HomeScreen from './home';

it('Given data, When I am at "Home Screen", Then I should see plays list', async () => {
  Play.IShouldSeePlayList(render(<HomeScreen />).getByText, expect);
});
