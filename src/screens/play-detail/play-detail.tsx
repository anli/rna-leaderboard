import {Play} from '@models';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const PlayDetailScreen = () => {
  const route = useRoute<any>();

  const {data} = usePlayDetailScreen(route?.params?.id);

  return (
    <View testID="play-detail-screen">
      <Text>{data?.title}</Text>
      <Text>{data?.winner}</Text>
      <Text>{data?.date}</Text>
      {data?.participants.map(participant => (
        <Text key={participant}>{participant}</Text>
      ))}
    </View>
  );
};

export default PlayDetailScreen;

const usePlayDetailScreen = (id: string) => {
  const [data, setData] = useState<Play | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = firestore()
      .doc(`plays/${id}`)
      .onSnapshot(documentSnapshot => {
        const mappedData: Play = {
          title: documentSnapshot.data()?.title,
          id: documentSnapshot.id,
          winner: documentSnapshot.data()?.winner,
          date: documentSnapshot.data()?.date,
          participants: documentSnapshot.data()?.participants,
        };

        setData(mappedData);
      });

    /* istanbul ignore next */
    return () => unsubscribe();
  }, [id]);

  return {data};
};
