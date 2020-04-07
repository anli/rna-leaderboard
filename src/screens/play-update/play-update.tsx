import {PlayForm} from '@components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PlayUpdateScreen = () => {
  const route = useRoute<any>();
  const formValues = {
    title: route?.params?.data?.title,
    winner: route?.params?.data?.winner,
    date: route?.params?.data?.date,
    participants: route?.params?.data?.participants,
  };

  const {values, onChangeText, update$} = usePlayUpdateScreen(
    route?.params?.id,
    formValues,
  );

  const {goBack} = useNavigation();

  const onSave$ = async () => {
    await update$(values);
    goBack();
  };

  return (
    <View testID="play-update-screen">
      <PlayForm values={values} onChangeText={onChangeText} />

      <TouchableOpacity testID="play-update-button" onPress={onSave$}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayUpdateScreen;

interface FormValues {
  title: string;
  winner: string;
  date: string;
  participants: string[];
}

const usePlayUpdateScreen = (id: string, initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);

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

  const update$ = async (data: FormValues) => {
    await firestore()
      .doc(`plays/${id}`)
      .update(data);
  };

  return {values, onChangeText, update$};
};

type onChangeTextProps = (
  key: string,
  value: string,
  arrayProp?: 'participants',
) => any;
