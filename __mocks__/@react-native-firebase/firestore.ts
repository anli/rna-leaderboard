const mockAdd = jest.fn(() => Promise.resolve(true));
const mockDelete = jest.fn(() => Promise.resolve(true));
const mockUpdate = jest.fn(() => Promise.resolve(true));
const mockSet = jest.fn(() => Promise.resolve(true));

const PLAYS = [
  {
    id: 'ID_A',
    title: 'TITLE_A',
    winner: 'WINNER_A',
    date: '2020-04-01',
    participants: ['PARTICIPANT_A1', 'PARTICIPANT_A2'],
  },
  {
    id: 'ID_B',
    title: 'TITLE_B',
    winner: 'WINNER_B',
    date: '2020-04-02',
    participants: ['PARTICIPANT_B1', 'PARTICIPANT_B2'],
  },
];

const getMockUserPlays = () => {
  return PLAYS.reduce((acc, play) => {
    const value = {
      [play.id]: {
        onSnapshot: (callback: any) => {
          callback({
            id: play.id,
            data: () => play,
          });
          return () => jest.fn();
        },
      },
    };
    return {...acc, ...value};
  }, {});
};

const firestore = () => ({
  collection: () => ({
    onSnapshot: (callback: any) => {
      callback({
        docs: [
          {
            id: PLAYS[0].id,
            data: () => PLAYS[0],
          },
          {
            id: PLAYS[1].id,
            data: () => PLAYS[1],
          },
        ],
      });
      return () => jest.fn();
    },
    add: mockAdd,
  }),
  doc: (path: string) => {
    if (path === 'users/USER_ID') {
      return {
        set: mockSet,
        onSnapshot: (callback: any) => {
          callback({
            data: () => ({
              plays: getMockUserPlays(),
            }),
          });
          return () => jest.fn();
        },
      };
    }
    const play = PLAYS.find(({id}) => id === path.split('/')[1]);

    return {
      set: mockSet,
      update: mockUpdate,
      delete: mockDelete,
      onSnapshot: (callback: any) => {
        callback({
          id: play?.id,
          data: () => play,
        });
        return () => jest.fn();
      },
    };
  },
});

export default firestore;

export class Firestore {
  static mockAdd = mockAdd;
  static PLAYS = PLAYS;
  static mockDelete = mockDelete;
  static mockUpdate = mockUpdate;
  static mockSet = mockSet;
}
