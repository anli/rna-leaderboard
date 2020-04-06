import {Play} from '@models';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = () => {
  const {data} = useHomeScreen();

  const {navigate} = useNavigation();

  const onCreate = () => {
    navigate('PlayCreateScreen');
  };

  const onDetail = (id: string) => {
    navigate('PlayDetailScreen', {id});
  };

  return (
    <>
      <View testID="home-screen">
        <Text>Test</Text>
        {data?.map(({id, title, winner, date, participants}, index) => (
          <View key={id}>
            <TouchableOpacity
              testID={`play-detail-button-${index}`}
              onPress={() => onDetail(id)}>
              <Text>{title}</Text>
              <Text>{winner}</Text>
              <Text>{date}</Text>
              {participants?.map((participant: string) => (
                <Text key={participant}>{participant}</Text>
              ))}
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity testID="play-create-button" onPress={onCreate}>
          <Text>Button</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const useHomeScreen = () => {
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
