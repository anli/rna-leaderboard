import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const App = () => {
  const {data} = useApp();

  return (
    <>
      <View>
        <Text>Test</Text>
        {data?.map(({id, title, winner, date, participants}) => (
          <View key={id}>
            <Text>{title}</Text>
            <Text>{winner}</Text>
            <Text>{date}</Text>
            {participants?.map(participant => (
              <Text key={participant}>{participant}</Text>
            ))}
          </View>
        ))}
      </View>
    </>
  );
};

export default App;

interface Play {
  id: string;
  title: string;
  winner: string;
  date: string;
  participants: string[];
}

const useApp = () => {
  const [data, setData] = useState<Play[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('plays')
      .onSnapshot(querySnapshot => {
        const mappedData = querySnapshot.docs.map(documentSnapshot => {
          const record: Play = {
            title: documentSnapshot.data().title,
            id: documentSnapshot.id,
            winner: documentSnapshot.data().winner,
            date: documentSnapshot.data().date,
            participants: documentSnapshot.data().participants,
          };

          return record;
        });

        setData(mappedData);
      });

    /* istanbul ignore next */
    return () => unsubscribe();
  }, []);

  return {data};
};
