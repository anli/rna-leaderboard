import {ReactNativeFirebase, ReactNavigation} from '@mocks';
import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import PlayUpdateScreen from './play-update';

const play = ReactNativeFirebase.Firestore.PLAYS[0];

describe('Play Update Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    ReactNavigation.Native.mockUseRoute.mockImplementation(() => {
      return {params: {id: play.id, data: play}};
    });
  });

  it('Given data, and I am at "Play Update Screen", and I fill form with data, When I press "Update Play Button", Then I should go back to previous screen', async () => {
    const {getByTestId} = render(<PlayUpdateScreen />);

    const values = {
      title: 'UPDATE_TITLE',
      winner: 'UPDATE_WINNER',
      date: '2020-02-02',
      participants: ['UPDATE_PARTICIPANT_A', 'UPDATE_PARTICIPANT_B'],
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

    fireEvent.press(getByTestId('play-update-button'));
    expect(ReactNativeFirebase.Firestore.mockUpdate).toBeCalledWith(values);
    expect(ReactNativeFirebase.Firestore.mockUpdate).toBeCalledTimes(1);
  });
});
