import {PlayForm} from '@components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '@utils';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PlayCreateScreen = () => {
  const {values, onChangeText, create$} = usePlayCreateScreen();
  const {user} = useAuth();
  const {goBack} = useNavigation();

  const onSave$ = async (saveValues: FormValues, userId) => {
    await create$(saveValues, userId);
    /* istanbul ignore next */
    goBack();
  };

  if (user) {
    return (
      <View testID="play-create-screen">
        <PlayForm values={values} onChangeText={onChangeText} />

        <TouchableOpacity
          testID="play-create-button"
          onPress={() => onSave$(values, user.uid)}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View testID="play-create-error-screen">
      <Text>No User Found</Text>
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

  return {values, onChangeText, create$};
};

type onChangeTextProps = (
  key: string,
  value: string,
  arrayProp?: 'participants',
) => any;

const create$ = async (data: FormValues, userId: string) => {
  const {id: playId} = await firestore()
    .collection('plays')
    .add(data);

  await firestore()
    .doc(`plays/${playId}`)
    .update({users: {[userId]: firestore().doc(`users/${userId}`)}});

  return await firestore()
    .doc(`users/${userId}`)
    .update({
      [`plays.${playId}`]: firestore().doc(`plays/${playId}`),
    });
};
