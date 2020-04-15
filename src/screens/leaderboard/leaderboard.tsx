import React from 'react';
import {StatusBar} from 'react-native';
import {Chip as PaperChip} from 'react-native-paper';
import styled from 'styled-components/native';

const LeaderboardScreenComponent = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Screen>
        <Chips data={filters} selected={selectedFilter} />
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
  padding: 16px 16px 16px 16px;
`;

const ChipsContainer = styled.View`
  flex-direction: row;
`;

const Chip = styled(PaperChip)`
  margin-right: 8px;
`;

const filters: string[] = ['Scythe', 'Agricola', 'Clank!'];
const selectedFilter = 'Scythe';

const Chips = ({data, selected}: {data: string[]; selected: string}) => (
  <ChipsContainer>
    {data.map(record => (
      <Chip key={record} selected={record === selected}>
        {record}
      </Chip>
    ))}
  </ChipsContainer>
);
