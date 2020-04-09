import {Play} from '@models';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PlayDetailScreen = () => {
  const route = useRoute<any>();

  const {data, delete$} = usePlayDetailScreen(route?.params?.id);

  const {navigate, goBack} = useNavigation();

  const onDelete = (
    playId: string,
    users: {[key: string]: FirebaseFirestoreTypes.DocumentReference},
  ) => {
    Alert.alert('Confirm Delete', undefined, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => onDeleteConfirm$(playId, users),
      },
    ]);
  };

  const onDeleteConfirm$ = async (
    playId: string,
    users: {[key: string]: FirebaseFirestoreTypes.DocumentReference},
  ) => {
    const userRefs = Object.keys(users);
    await delete$(playId, userRefs);
    /* istanbul ignore next */
    goBack();
  };

  const onUpdate = async () => {
    const updateData = {
      title: data?.title,
      id: data?.id,
      winner: data?.winner,
      date: data?.date,
      participants: data?.participants,
    };

    navigate('PlayUpdateScreen', {id: route?.params?.id, data: updateData});
  };

  if (data) {
    return (
      <View testID="play-detail-screen">
        <Text>{data?.title}</Text>
        <Text>{data?.winner}</Text>
        <Text>{data?.date}</Text>
        {data?.participants?.map((participant: string) => (
          <Text key={participant}>{participant}</Text>
        ))}
        <TouchableOpacity
          testID="play-delete-button"
          onPress={() => onDelete(data.id, data.users)}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="play-update-button" onPress={onUpdate}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View testID="play-detail-error-screen">
      <Text>No Data Found</Text>
    </View>
  );
};

export default PlayDetailScreen;

const usePlayDetailScreen = (id: string) => {
  const [data, setData] = useState<Play | undefined>(undefined);

  const delete$ = async (playId: string, userRefs: string[]) => {
    userRefs.forEach(async (path: string) => {
      await firestore()
        .doc(`users/${path}`)
        .update({
          [`plays.${playId}`]: firestore.FieldValue.delete(),
        });
    });

    return await firestore()
      .doc(`plays/${playId}`)
      .delete();
  };

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
          users: documentSnapshot.data()?.users,
        };

        setData(mappedData);
      });

    return unsubscribe;
  }, [id]);

  return {data, delete$};
};
