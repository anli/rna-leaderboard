const mockAdd = jest.fn(() => Promise.resolve(true));
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
    const play = PLAYS.find(({id}) => id === path.split('/')[1]);

    return {
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
}
