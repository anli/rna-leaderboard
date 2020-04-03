import {GetByAPI} from 'react-native-testing-library';

const IShouldSeePlayList = (getByText: GetByAPI['getByText']) => {
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
};

class Play {
  static IShouldSeePlayList = IShouldSeePlayList;
}

export default Play;
