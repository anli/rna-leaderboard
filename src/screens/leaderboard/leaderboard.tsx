import React from 'react';
import {StatusBar, Text} from 'react-native';
import styled from 'styled-components/native';

const LeaderboardScreenComponent = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Screen>
        <Text>LeaderboardScreen</Text>
      </Screen>
    </>
  );
};

const LeaderboardScreenOptions = {title: 'Leaderboard'};

export default class {
  static Component = LeaderboardScreenComponent;
  static Options = LeaderboardScreenOptions;
}

const Screen = styled.View`
  flex: 1;
  background-color: white;
`;
