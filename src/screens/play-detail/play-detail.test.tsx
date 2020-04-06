import {ReactNativeFirebase, ReactNavigation} from '@mocks';
import React from 'react';
import {Alert} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import PlayDetailScreen from './play-detail';

const play = ReactNativeFirebase.Firestore.PLAYS[0];

describe('Play Detail Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    ReactNavigation.Native.mockUseRoute.mockImplementation(() => {
      return {params: {id: play.id}};
    });
  });

  it('Given id, And data, When I am at "Play Detail Screen", Then I should see data', () => {
    const {getByText} = render(<PlayDetailScreen />);

    expect(getByText(play.title)).toBeDefined();
    expect(getByText(play.winner)).toBeDefined();
    expect(getByText(play.date)).toBeDefined();
    expect(getByText(play.participants[0])).toBeDefined();
    expect(getByText(play.participants[0])).toBeDefined();
  });

  it('Given I am at "Play Detail Screen", When I press "Delete Button", And I press "Confirm Button", Then I should see data deleted, And I go back to previous screen', () => {
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<PlayDetailScreen />);

    fireEvent.press(getByTestId('play-delete-button'));

    expect(Alert.alert).toHaveBeenCalled();
    spy.mock.calls[0][2] &&
      spy.mock.calls[0][2][1] &&
      spy.mock.calls[0][2][1].onPress &&
      spy.mock.calls[0][2][1].onPress();

    expect(ReactNativeFirebase.Firestore.mockDelete).toBeCalledTimes(1);
  });
});
