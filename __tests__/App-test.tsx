/**
 * @format
 */

import {Play} from '@tests/models';
import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import App from '../App';

it('Given data, When I open App, Then I should see plays list', async () => {
  Play.IShouldSeePlayList(render(<App />).getByText);
});
