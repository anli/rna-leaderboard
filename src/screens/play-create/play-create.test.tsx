import {ReactNativeFirebase} from '@mocks';
import React from 'react';
import 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import PlayCreateScreen from './play-create';

it('Given data, and I am at "Play Create Screen", and I fill form with data, When I press "Create Play Button", Then I should go back to previous screen', async () => {
  const {getByTestId} = render(<PlayCreateScreen />);
  const values = {
    title: 'CREATE_TITLE',
    winner: 'CREATE_WINNER',
    date: '2020-01-01',
    participants: ['NEW_PARTICIPANT_A', 'NEW_PARTICIPANT_B'],
  };

  fireEvent(getByTestId('title-input'), 'onChangeText', values.title);
  fireEvent(getByTestId('winner-input'), 'onChangeText', values.winner);
  fireEvent(getByTestId('date-input'), 'onChangeText', values.date);
  fireEvent(
    getByTestId('participants-0-input'),
    'onChangeText',
    values.participants[0],
  );
  fireEvent(
    getByTestId('participants-1-input'),
    'onChangeText',
    values.participants[1],
  );

  fireEvent.press(getByTestId('play-create-button'));
  expect(ReactNativeFirebase.Firestore.mockAdd).toBeCalledWith(values);
  expect(ReactNativeFirebase.Firestore.mockAdd).toBeCalledTimes(1);
});
