import {PlayForm} from '@components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '@utils';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PlayCreateScreen = () => {
  const {values, onChangeText, create$} = usePlayCreateScreen();

  const {goBack} = useNavigation();

  const onSave$ = async () => {
    await create$(values);
    goBack();
  };

  return (
    <View testID="play-create-screen">
      <PlayForm values={values} onChangeText={onChangeText} />

      <TouchableOpacity testID="play-create-button" onPress={onSave$}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayCreateScreen;

const INITIAL_FORM_VALUES = {
  title: '',
  winner: '',
  date: '',
  participants: [],
};

interface FormValues {
  title: string;
  winner: string;
  date: string;
  participants: string[];
}

const usePlayCreateScreen = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const {user} = useAuth();

  const onChangeText: onChangeTextProps = (
    key: string,
    value: string,
    arrayProp?: 'participants',
  ) => {
    if (!arrayProp) {
      return setValues({...values, [key]: value});
    }

    const participants = [...values[arrayProp]];
    participants[Number(key)] = value;

    return setValues({...values, participants});
  };

  const create$ = async (data: FormValues) => {
    const userId = user?.uid || 'NULL';
    const {id: playId} = await firestore()
      .collection('plays')
      .add(data);

    await firestore()
      .doc(`plays/${playId}`)
      .update({users: {[userId]: firestore().doc(`users/${userId}`)}});

    await firestore()
      .doc(`users/${userId}`)
      .update({[`plays.${playId}`]: firestore().doc(`plays/${playId}`)});
  };

  return {values, onChangeText, create$};
};

type onChangeTextProps = (
  key: string,
  value: string,
  arrayProp?: 'participants',
) => any;
