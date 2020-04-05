import {ReactNavigation} from '@mocks';
import {Play} from '@tests/models';
import React from 'react';
import 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import HomeScreen from './home';

it('Given data, When I am at "Home Screen", Then I should see plays list', async () => {
  Play.IShouldSeePlayList(render(<HomeScreen />).getByText);
});

it('Given I am at "Home Screen", When I press the "Create Play Button", Then I should see "Create Play Screen', async () => {
  const {getByTestId} = render(<HomeScreen />);

  fireEvent.press(getByTestId('play-create-button'));
  expect(ReactNavigation.Native.mockNavigate).toBeCalledTimes(1);
  expect(ReactNavigation.Native.mockNavigate).toBeCalledWith(
    'PlayCreateScreen',
  );
});
