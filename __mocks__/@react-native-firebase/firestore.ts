const mockAdd = jest.fn(() => Promise.resolve(true));
const PLAYS = [
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
];

const firestore = () => ({
  collection: () => ({
    onSnapshot: (callback: any) => {
      callback({
        docs: PLAYS,
      });
      return () => jest.fn();
    },
    add: mockAdd,
  }),
});

export default firestore;

export class Firestore {
  static mockAdd = mockAdd;
  static PLAYS = PLAYS;
}
