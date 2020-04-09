import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
export interface Play {
  id: string;
  title: string;
  winner: string;
  date: string;
  participants: string[];
  users: {[key: string]: FirebaseFirestoreTypes.DocumentReference};
}
