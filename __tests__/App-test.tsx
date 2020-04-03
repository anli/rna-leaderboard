/**
 * @format
 */

import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import App from '../App';

const mockUnsubscribe = jest.fn();
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: () => ({
      onSnapshot: (callback: any) => {
        callback({
          docs: [
            {
              id: 'ID_A',
              data: () => ({
                title: 'TITLE_A',
                winner: 'WINNER_A',
                date: '2020-04-01',
                participants: ['PARTICIPANT_A1', 'PARTICIPANT_A2'],
              }),
            },
            {
              id: 'ID_B',
              data: () => ({
                title: 'TITLE_B',
                winner: 'WINNER_B',
                date: '2020-04-02',
                participants: ['PARTICIPANT_B1', 'PARTICIPANT_B2'],
              }),
            },
          ],
        });
        return () => mockUnsubscribe;
      },
    }),
  }),
}));

it('Given data, When I open App, Then I should see plays list', async () => {
  const {getByText} = render(<App />);
  expect(getByText('TITLE_A')).toBeDefined();
  expect(getByText('WINNER_A')).toBeDefined();
  expect(getByText('2020-04-01')).toBeDefined();
  expect(getByText('PARTICIPANT_A1')).toBeDefined();
  expect(getByText('PARTICIPANT_A2')).toBeDefined();

  expect(getByText('TITLE_B')).toBeDefined();
  expect(getByText('WINNER_B')).toBeDefined();
  expect(getByText('2020-04-02')).toBeDefined();
  expect(getByText('PARTICIPANT_B1')).toBeDefined();
  expect(getByText('PARTICIPANT_B2')).toBeDefined();
});
