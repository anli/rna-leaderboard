import {Play} from '@models';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '@utils';
import * as R from 'ramda';
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
        {data?.map((docRef, index) => (
          <PlayItem
            key={index}
            docRef={docRef}
            index={index}
            onPress={onDetail}
          />
        ))}
        <TouchableOpacity testID="play-create-button" onPress={onCreate}>
          <Text>Button</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const PlayItem = ({
  index,
  docRef,
  onPress,
}: {
  index: number;
  docRef: FirebaseFirestoreTypes.DocumentReference;
  onPress: (id: string) => any;
}) => {
  const {data} = useDocRef(docRef);

  if (data) {
    return (
      <View>
        <TouchableOpacity
          testID={`play-detail-button-${index}`}
          onPress={() => onPress(data.id)}>
          <Text>{data?.title}</Text>
          <Text>{data?.winner}</Text>
          <Text>{data?.date}</Text>
          {data?.participants?.map((participant: string) => (
            <Text key={participant}>{participant}</Text>
          ))}
        </TouchableOpacity>
      </View>
    );
  }

  return <Text>No Data</Text>;
};

const useDocRef = (docRef: FirebaseFirestoreTypes.DocumentReference) => {
  const [data, setData] = useState<Play | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = docRef.onSnapshot(docSnapshot => {
      const record: Play = {
        title: docSnapshot.data()?.title,
        id: docSnapshot.id,
        winner: docSnapshot.data()?.winner,
        date: docSnapshot.data()?.date,
        participants: docSnapshot.data()?.participants,
      };

      setData(record);
    });
    return unsubscribe;
  }, [docRef]);

  return {data};
};

const useHomeScreen = () => {
  const [data, setData] = useState<
    FirebaseFirestoreTypes.DocumentReference[] | undefined
  >(undefined);
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .doc(`users/${user.uid}`)
        .onSnapshot(userSnapshot => {
          const playRefs: FirebaseFirestoreTypes.DocumentReference[] = R.values(
            userSnapshot?.data()?.plays,
          );

          setData(playRefs);
        });

      return unsubscribe;
    }
  }, [user]);

  return {data};
};
