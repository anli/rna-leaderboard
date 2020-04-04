import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PlayCreateScreen = () => {
  const {values, onChangeText, create$} = usePlayCreateScreen();

  const {goBack} = useNavigation();

  const onSave$ = async () => {
    console.log({values});
    await create$(values);
    goBack();
  };

  return (
    <View testID="play-create-screen">
      <TextInput
        placeholder="Title"
        testID="title-input"
        onChangeText={data => onChangeText('title', data)}
        value={values.title}
      />
      <TextInput
        placeholder="Winner"
        testID="winner-input"
        onChangeText={data => onChangeText('winner', data)}
        value={values.winner}
      />
      <TextInput
        placeholder="Date Played"
        testID="date-input"
        onChangeText={data => onChangeText('date', data)}
        value={values.date}
      />
      <TextInput
        placeholder="Participants A"
        testID="participants-0-input"
        onChangeText={data => onChangeText('0', data, 'participants')}
        value={values.participants[0]}
      />
      <TextInput
        placeholder="Participants B"
        testID="participants-1-input"
        onChangeText={data => onChangeText('1', data, 'participants')}
        value={values.participants[1]}
      />

      <TouchableOpacity testID="play-create-button" onPress={onSave$}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayCreateScreen;

const usePlayCreateScreen = () => {
  const [values, setValues] = useState<{
    title: string;
    winner: string;
    date: string;
    participants: string[];
  }>({
    title: '',
    winner: '',
    date: '',
    participants: [],
  });

  const onChangeText = (
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

  const create$ = async (data: {
    title: string;
    winner: string;
    date: string;
    participants: string[];
  }) => {
    await firestore()
      .collection('plays')
      .add(data);
  };

  return {values, onChangeText, create$};
};
