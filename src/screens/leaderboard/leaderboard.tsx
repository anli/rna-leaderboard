import React from 'react';
import {FlatList, StatusBar} from 'react-native';
import {Chip as PaperChip, Headline, List} from 'react-native-paper';
import styled from 'styled-components/native';

const LeaderboardScreenComponent = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Screen>
        <Chips data={filters} selected={selectedFilter} />
        <FlatList
          data={playerRanks}
          renderItem={({item}) => (
            <List.Item
              title={item?.name}
              description={`${item?.winCount} Wins ${item?.lossCount} Losses`}
              left={() => <Rank rank={item?.rank} />}
            />
          )}
          keyExtractor={item => String(item.rank)}
        />
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

const playerRanks = [
  {rank: 1, name: 'John', winCount: 40, lossCount: 10},
  {rank: 2, name: 'Mary', winCount: 10, lossCount: 2},
  {rank: 3, name: 'Jane', winCount: 50, lossCount: 20},
];

const Rank = ({rank}: {rank: number}) => {
  return (
    <RankContainer>
      <Headline>{rank}</Headline>
    </RankContainer>
  );
};

const RankContainer = styled.View`
  padding-right: 8px;
`;
