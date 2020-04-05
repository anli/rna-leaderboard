import {ReactNativeFirebase, ReactNavigation} from '@mocks';
import React from 'react';
import {render} from 'react-native-testing-library';
import PlayDetailScreen from './play-detail';

const play = {
  ...ReactNativeFirebase.Firestore.PLAYS[0].data(),
  id: ReactNativeFirebase.Firestore.PLAYS[0].id,
};

describe('Play Detail Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    ReactNavigation.Native.mockUseRoute.mockImplementation(() => {
      return {params: {id: play.id}};
    });
    ReactNativeFirebase.Firestore.mockDoc.mockImplementation(() => ({
      onSnapshot: (callback: any) => {
        callback(ReactNativeFirebase.Firestore.PLAYS[0]);
        return () => jest.fn();
      },
    }));
  });

  it('Given id, And data, When I am at "Play Detail Screen", Then I should see data', () => {
    const {getByText} = render(<PlayDetailScreen />);

    expect(getByText(play.title)).toBeDefined();
    expect(getByText(play.winner)).toBeDefined();
    expect(getByText(play.date)).toBeDefined();
    expect(getByText(play.participants[0])).toBeDefined();
    expect(getByText(play.participants[0])).toBeDefined();
  });
});
