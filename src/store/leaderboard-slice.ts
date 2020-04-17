import {createSlice} from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    gameNames: ['Scythe', 'Agricola', 'Clank!'],
    gameRank: {
      Scythe: [
        {rank: 1, name: 'John', winCount: 40, lossCount: 10},
        {rank: 2, name: 'Mary', winCount: 10, lossCount: 2},
        {rank: 3, name: 'Jane', winCount: 50, lossCount: 20},
      ],
    },
  },
  reducers: {},
});

export default leaderboardSlice;
