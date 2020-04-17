import React from 'react';
import {FlatList, StatusBar} from 'react-native';
import {Chip as PaperChip, Headline, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

interface State {
  gameNames: string[];
  gameRank: {
    [key: string]: {
      rank: number;
      name: string;
      winCount: number;
      lossCount: number;
    }[];
  };
}

const LeaderboardScreenComponent = () => {
  const data = useSelector((state: State) => state);
  const selectedFilter = 'Scythe';
  const filters = data.gameNames;
  const ranks = data.gameRank[selectedFilter];

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Screen>
        <Chips data={filters} selected={selectedFilter} />
        <FlatList
          data={ranks}
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

const Chips = ({data, selected}: {data: string[]; selected: string}) => (
  <ChipsContainer>
    {data.map(record => (
      <Chip key={record} selected={record === selected}>
        {record}
      </Chip>
    ))}
  </ChipsContainer>
);

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
